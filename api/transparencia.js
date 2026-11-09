import { getConfig, listSectionFiles } from './_drive.js';

// GET /api/transparencia
// Returns the PDFs of the "transparencia" Drive subfolder. The filename rules
// (year and document type) are applied in the browser, see src/app/lib/transparencyDocuments.ts.
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const config = getConfig();
  if (!config) {
    return res.status(503).json({ error: 'Google Drive no está configurado' });
  }

  try {
    const files = await listSectionFiles(config, 'transparencia');
    const documents = files.map((file) => ({
      name: file.name,
      // Google Drive's own viewer: works for large PDFs and lets people download them
      url: `https://drive.google.com/file/d/${encodeURIComponent(file.id)}/view`,
    }));

    res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=86400');
    return res.status(200).json({ documents });
  } catch (error) {
    console.error('Error leyendo transparencia de Google Drive:', error);
    return res.status(502).json({ error: 'No se pudo leer la carpeta de Google Drive' });
  }
}
