import { IMAGE_SECTIONS, getConfig, listSectionFiles } from './_drive.js';

// GET /api/carousel?seccion=servicios|eventos
// Returns the images of that Drive subfolder. The filename rules (order, dates)
// are applied in the browser, see src/app/lib/carouselImages.ts.
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const section = String(req.query.seccion || '').toLowerCase();
  if (!IMAGE_SECTIONS.includes(section)) {
    return res.status(400).json({ error: `Sección no válida. Usa: ${IMAGE_SECTIONS.join(', ')}` });
  }

  const config = getConfig();
  if (!config) {
    return res.status(503).json({ error: 'Google Drive no está configurado' });
  }

  try {
    const files = await listSectionFiles(config, section);
    const images = files.map((file) => ({
      name: file.name,
      description: file.description,
      url: `/api/carousel-image?id=${encodeURIComponent(file.id)}`,
    }));

    // Cached on Vercel's CDN for 10 minutes; a stale copy is served while it refreshes.
    res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=86400');
    return res.status(200).json({ images });
  } catch (error) {
    console.error('Error leyendo el carrusel de Google Drive:', error);
    return res.status(502).json({ error: 'No se pudo leer la carpeta de Google Drive' });
  }
}
