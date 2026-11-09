import { useEffect, useState } from 'react';

/*
 * NAMING CONVENTION FOR CAROUSEL FILES
 * (the same rules apply to Google Drive and to the local fallback folders)
 *
 * servicios/  ->  NN_titulo.ext
 *    01_nadie-se-queda-atras.jpg
 *    02_talleres-de-psicologia.jpg
 *    NN = display order (two or more digits).
 *
 * eventos/    ->  AAAA-MM-DD_titulo.ext               (one-day event)
 *                 AAAA-MM-DD_AAAA-MM-DD_titulo.ext    (event spanning several days)
 *    2026-12-05_mercadillo-solidario.jpg
 *    2026-12-19_2026-12-21_belen-viviente.jpg
 *    The event is shown until 23:59 of its (last) day, sorted by date.
 *
 * In "titulo", hyphens become spaces and it is used as the image description.
 * If the file has a "Descripción" in Google Drive, that text is used instead.
 * Files that do not follow the convention are ignored (a warning appears in the console).
 */

export type CarouselSection = 'servicios' | 'eventos';

export interface CarouselImage {
  url: string;
  filename: string;
  title: string;
  alt: string;
  /** Only for events */
  startDate?: Date;
  endDate?: Date;
  dateFormatted?: string;
}

interface RawImage {
  url: string;
  name: string;
  description?: string;
}

const SERVICE_PATTERN = /^(\d{2,})_(.+)\.[a-z0-9]+$/i;
const EVENT_PATTERN = /^(\d{4}-\d{2}-\d{2})(?:_(\d{4}-\d{2}-\d{2}))?_(.+)\.[a-z0-9]+$/i;

function titleFromSlug(slug: string): string {
  const text = slug.replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim();
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function parseDate(value: string): Date | null {
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  // Rejects impossible dates such as 2026-02-30
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return null;
  }
  return date;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
}

function formatRange(start: Date, end: Date): string {
  if (start.getTime() === end.getTime()) return formatDate(start);
  if (start.getFullYear() === end.getFullYear() && start.getMonth() === end.getMonth()) {
    return `${start.getDate()} – ${formatDate(end)}`;
  }
  return `${formatDate(start)} – ${formatDate(end)}`;
}

function warnIgnored(section: CarouselSection, name: string, reason: string) {
  console.warn(`[carrusel ${section}] Se ignora "${name}": ${reason}`);
}

export function buildServiceImages(raw: RawImage[]): CarouselImage[] {
  const items: { order: number; image: CarouselImage }[] = [];
  for (const file of raw) {
    const match = file.name.match(SERVICE_PATTERN);
    if (!match) {
      warnIgnored('servicios', file.name, 'el nombre debe ser NN_titulo (ej. 01_talleres.jpg)');
      continue;
    }
    const title = titleFromSlug(match[2]);
    items.push({
      order: Number(match[1]),
      image: {
        url: file.url,
        filename: file.name,
        title,
        alt: file.description?.trim() || title,
      },
    });
  }
  return items
    .sort((a, b) => a.order - b.order || a.image.filename.localeCompare(b.image.filename))
    .map((item) => item.image);
}

export function buildEventImages(raw: RawImage[], now = new Date()): CarouselImage[] {
  const events: CarouselImage[] = [];
  for (const file of raw) {
    const match = file.name.match(EVENT_PATTERN);
    if (!match) {
      warnIgnored('eventos', file.name, 'el nombre debe ser AAAA-MM-DD_titulo (ej. 2026-12-05_mercadillo.jpg)');
      continue;
    }
    const startDate = parseDate(match[1]);
    const endDate = match[2] ? parseDate(match[2]) : startDate;
    if (!startDate || !endDate || endDate < startDate) {
      warnIgnored('eventos', file.name, 'la fecha no es válida');
      continue;
    }

    // Event remains visible until the end of its last day (23:59:59)
    const visibleUntil = new Date(endDate);
    visibleUntil.setHours(23, 59, 59, 999);
    if (now > visibleUntil) continue;

    const title = titleFromSlug(match[3]);
    const dateFormatted = formatRange(startDate, endDate);
    events.push({
      url: file.url,
      filename: file.name,
      title,
      alt: file.description?.trim() || `Cartel del evento ${title} - ${dateFormatted}`,
      startDate,
      endDate,
      dateFormatted,
    });
  }
  return events.sort((a, b) => a.startDate!.getTime() - b.startDate!.getTime());
}

// Local images bundled with the website, used when Google Drive is not available
// (local development, Drive not configured yet, or a Drive error).
const localModules: Record<CarouselSection, Record<string, { default: string }>> = {
  servicios: import.meta.glob<{ default: string }>(
    '../../imports/servicios/*.{jpg,jpeg,png,webp,avif,gif}',
    { eager: true }
  ),
  eventos: import.meta.glob<{ default: string }>(
    '../../imports/eventos/*.{jpg,jpeg,png,webp,avif,gif}',
    { eager: true }
  ),
};

function getLocalImages(section: CarouselSection): RawImage[] {
  return Object.entries(localModules[section]).map(([path, module]) => ({
    url: module.default,
    name: path.split('/').pop() || '',
  }));
}

async function fetchDriveImages(section: CarouselSection): Promise<RawImage[]> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch(`/api/carousel?seccion=${section}`, { signal: controller.signal });
    const isJson = response.headers.get('content-type')?.includes('application/json');
    if (!response.ok || !isJson) throw new Error(`HTTP ${response.status}`);
    const data = (await response.json()) as { images?: RawImage[] };
    if (!Array.isArray(data.images)) throw new Error('Respuesta no válida');
    return data.images;
  } finally {
    clearTimeout(timeout);
  }
}

function build(section: CarouselSection, raw: RawImage[]): CarouselImage[] {
  return section === 'eventos' ? buildEventImages(raw) : buildServiceImages(raw);
}

/** Loads the carousel images from Google Drive, falling back to the bundled ones. */
export function useCarouselImages(section: CarouselSection) {
  const [images, setImages] = useState<CarouselImage[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchDriveImages(section)
      .then((raw) => build(section, raw))
      .catch((error) => {
        console.info(`[carrusel ${section}] Usando imágenes locales (${error.message || error})`);
        return build(section, getLocalImages(section));
      })
      .then((result) => {
        if (!cancelled) setImages(result);
      });
    return () => {
      cancelled = true;
    };
  }, [section]);

  return { images: images ?? [], loading: images === null };
}
