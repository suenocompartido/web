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
 * Returns the image if it is inside one of the carousel subfolders, so the image
 * endpoint cannot be used to serve any other Drive file. It reuses the folder
 * listing because the "parents" field is not always returned for API key requests.
 */
export async function getAllowedImage(config, fileId) {
  const folders = await getSectionFolders(config);
  for (const folderId of Object.values(folders)) {
    const files = await listChildren(
      folderId,
      "mimeType contains 'image/'",
      'id, mimeType, thumbnailLink',
      config.apiKey
    );
    const file = files.find((item) => item.id === fileId);
    if (file) return file;
  }
  return null;
}

async function fetchImage(url) {
  const response = await fetch(url);
  const contentType = response.headers.get('content-type') || '';
  if (!response.ok || !contentType.startsWith('image/')) {
    const text = contentType.startsWith('image/') ? '' : await response.text().catch(() => '');
    throw new Error(`Descarga fallida (${response.status}, ${contentType}): ${text.slice(0, 200)}`);
  }
  return { contentType, body: Buffer.from(await response.arrayBuffer()) };
}

/** Downloads the original image; if that fails, tries Drive's resized thumbnail. */
export async function downloadImage(config, file, size = 2000) {
  const original =
    `${DRIVE_API}/${encodeURIComponent(file.id)}?alt=media&supportsAllDrives=true` +
    `&key=${encodeURIComponent(config.apiKey)}`;
  try {
    return await fetchImage(original);
  } catch (error) {
    if (!file.thumbnailLink) throw error;
    const resized = file.thumbnailLink.replace(/=s\d+(-[a-z0-9-]+)?$/i, `=s${size}`);
    try {
      return await fetchImage(resized);
    } catch (thumbnailError) {
      throw new Error(`${error.message} | Miniatura: ${thumbnailError.message}`);
    }
  }
}
