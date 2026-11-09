// Helpers to read the carousel images from a public Google Drive folder.
//
// Expected structure in Drive (folder shared as "Anyone with the link can view"):
//   <root folder>            -> GOOGLE_DRIVE_FOLDER_ID
//     ├── servicios/         -> images for the "¿Qué ofrecemos?" carousel
//     └── eventos/           -> posters for the "Próximos eventos" carousel
//
// Required environment variables (Vercel):
//   GOOGLE_DRIVE_API_KEY     -> API key restricted to the Google Drive API
//   GOOGLE_DRIVE_FOLDER_ID   -> ID of the root folder (the part after /folders/ in its link)
//
// Files whose name starts with "_" are not routed by Vercel, so this module is private.

const DRIVE_API = 'https://www.googleapis.com/drive/v3/files';

export const SECTIONS = ['servicios', 'eventos'];

export function getConfig() {
  const apiKey = process.env.GOOGLE_DRIVE_API_KEY;
  const rootId = process.env.GOOGLE_DRIVE_FOLDER_ID;
  if (!apiKey || !rootId) return null;
  return { apiKey, rootId };
}

async function driveGet(url, apiKey) {
  const separator = url.includes('?') ? '&' : '?';
  const response = await fetch(`${url}${separator}key=${encodeURIComponent(apiKey)}`);
  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(`Google Drive respondió ${response.status}: ${text.slice(0, 300)}`);
  }
  return response;
}

async function listChildren(folderId, mimeFilter, fields, apiKey) {
  const files = [];
  let pageToken = '';
  do {
    const q = `'${folderId}' in parents and trashed = false and ${mimeFilter}`;
    const params = new URLSearchParams({
      q,
      fields: `nextPageToken, files(${fields})`,
      pageSize: '200',
      supportsAllDrives: 'true',
      includeItemsFromAllDrives: 'true',
    });
    if (pageToken) params.set('pageToken', pageToken);
    const response = await driveGet(`${DRIVE_API}?${params}`, apiKey);
    const data = await response.json();
    files.push(...(data.files || []));
    pageToken = data.nextPageToken || '';
  } while (pageToken);
  return files;
}

function normalizeName(name) {
  return name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim()
    .toLowerCase();
}

/** Returns { servicios: folderId, eventos: folderId } for the subfolders that exist. */
export async function getSectionFolders({ apiKey, rootId }) {
  const folders = await listChildren(
    rootId,
    "mimeType = 'application/vnd.google-apps.folder'",
    'id, name',
    apiKey
  );
  const result = {};
  for (const folder of folders) {
    const key = normalizeName(folder.name);
    if (SECTIONS.includes(key) && !result[key]) result[key] = folder.id;
  }
  return result;
}

/** Lists the images inside one section subfolder. */
export async function listSectionImages(config, section) {
  const folders = await getSectionFolders(config);
  const folderId = folders[section];
  if (!folderId) return [];

  const files = await listChildren(
    folderId,
    "mimeType contains 'image/'",
    'id, name, description',
    config.apiKey
  );

  return files.map((file) => ({
    id: file.id,
    name: file.name,
    description: file.description || '',
  }));
}

/**
 * Checks that the file is an image inside one of the carousel subfolders,
 * so the image endpoint cannot be used to serve any other Drive file.
 */
export async function getAllowedImage(config, fileId) {
  const folders = await getSectionFolders(config);
  const allowedParents = new Set(Object.values(folders));

  const params = new URLSearchParams({
    fields: 'id, mimeType, parents, thumbnailLink',
    supportsAllDrives: 'true',
  });
  const response = await driveGet(`${DRIVE_API}/${encodeURIComponent(fileId)}?${params}`, config.apiKey);
  const file = await response.json();

  const isImage = typeof file.mimeType === 'string' && file.mimeType.startsWith('image/');
  const inCarousel = (file.parents || []).some((parent) => allowedParents.has(parent));
  return isImage && inCarousel ? file : null;
}

/** Downloads the image, preferring a resized version to keep it light. */
export async function downloadImage(config, file, size = 2000) {
  if (file.thumbnailLink) {
    try {
      const resized = file.thumbnailLink.replace(/=s\d+(-[a-z0-9-]+)?$/i, `=s${size}`);
      const response = await fetch(resized);
      if (response.ok) {
        return {
          contentType: response.headers.get('content-type') || file.mimeType,
          body: Buffer.from(await response.arrayBuffer()),
        };
      }
    } catch {
      // Fall back to the original file below
    }
  }

  const response = await driveGet(
    `${DRIVE_API}/${encodeURIComponent(file.id)}?alt=media&supportsAllDrives=true`,
    config.apiKey
  );
  return {
    contentType: response.headers.get('content-type') || file.mimeType,
    body: Buffer.from(await response.arrayBuffer()),
  };
}
