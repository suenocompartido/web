import { getConfig, getAllowedImage, downloadImage } from './_drive.js';

// GET /api/carousel-image?id=<Drive file id>
// Serves a carousel image through our own domain (direct Drive links are unreliable).
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const id = String(req.query.id || '');
  if (!/^[A-Za-z0-9_-]{10,}$/.test(id)) {
    return res.status(400).json({ error: 'Identificador no válido' });
  }

  const config = getConfig();
  if (!config) {
    return res.status(503).json({ error: 'Google Drive no está configurado' });
  }

  try {
    const file = await getAllowedImage(config, id);
    if (!file) {
      return res.status(404).json({ error: 'Imagen no encontrada' });
    }

    const image = await downloadImage(config, file);

    // Uploading a new file creates a new id, so images can be cached for a day.
    res.setHeader('Content-Type', image.contentType);
    res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400');
    return res.status(200).send(image.body);
  } catch (error) {
    console.error('Error descargando imagen de Google Drive:', error);
    return res.status(502).json({ error: 'No se pudo descargar la imagen' });
  }
}
