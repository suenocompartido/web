import { useEffect, useState } from 'react';
import { Calendar, Euro, FileCheck, FileText, Scale, type LucideIcon } from 'lucide-react';

/*
 * NAMING CONVENTION FOR TRANSPARENCY DOCUMENTS
 * (the same rules apply to Google Drive and to the local fallback folder)
 *
 * transparencia/  ->  AAAA_tipo.pdf
 *    2025_balance.pdf
 *    2025_memoria-actividades.pdf
 *
 * Each type is shown as one card with its most recent year; older years appear
 * as "Años anteriores" links. Types not listed in DOCUMENT_TYPES are also shown,
 * with a generic icon and the title taken from the filename.
 */

export interface DocumentType {
  title: string;
  description: string;
  icon: LucideIcon;
}

// The order here is the order of the cards on the page.
export const DOCUMENT_TYPES: Record<string, DocumentType> = {
  'junta-directiva': {
    title: 'Junta Directiva',
    description: 'Junta Directiva de la asociación.',
    icon: FileText,
  },
  estatutos: {
    title: 'Estatutos',
    description: 'Resolución oficial de la modificación de los estatutos de la asociación.',
    icon: FileCheck,
  },
  'memoria-actividades': {
    title: 'Memoria de Actividades',
    description: 'Resumen completo de todas las actividades realizadas durante el año.',
    icon: Calendar,
  },
  balance: {
    title: 'Balance',
    description: 'Estado patrimonial y financiero de la asociación al cierre del ejercicio.',
    icon: Scale,
  },
  'cuenta-perdidas-ganancias': {
    title: 'Cuenta de Pérdidas y Ganancias',
    description: 'Detalle de ingresos, gastos y resultado económico del ejercicio.',
    icon: Euro,
  },
};

export interface DocumentVersion {
  year: number;
  url: string;
  filename: string;
}

export interface TransparencyDocument extends DocumentType {
  type: string;
  latest: DocumentVersion;
  /** Older years, most recent first */
  previous: DocumentVersion[];
}

interface RawDocument {
  url: string;
  name: string;
}

const DOCUMENT_PATTERN = /^(\d{4})_(.+)\.pdf$/i;

function slugify(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function titleFromSlug(slug: string): string {
  const text = slug.replace(/-+/g, ' ').trim();
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function buildTransparencyDocuments(raw: RawDocument[]): TransparencyDocument[] {
  const byType = new Map<string, DocumentVersion[]>();

  for (const file of raw) {
    const match = file.name.match(DOCUMENT_PATTERN);
    if (!match) {
      console.warn(
        `[transparencia] Se ignora "${file.name}": el nombre debe ser AAAA_tipo.pdf (ej. 2025_balance.pdf)`
      );
      continue;
    }
    // Drive adds " (1)" when a file with the same name is uploaded again
    const type = slugify(match[2].replace(/\s*\(\d+\)\s*$/, ''));
    const versions = byType.get(type) ?? [];
    if (versions.some((version) => version.year === Number(match[1]))) {
      console.warn(`[transparencia] Se ignora "${file.name}": ya hay un documento "${type}" de ese año`);
      continue;
    }
    versions.push({ year: Number(match[1]), url: file.url, filename: file.name });
    byType.set(type, versions);
  }

  const knownOrder = Object.keys(DOCUMENT_TYPES);
  const types = [...byType.keys()].sort((a, b) => {
    const ia = knownOrder.indexOf(a);
    const ib = knownOrder.indexOf(b);
    if (ia !== -1 || ib !== -1) return (ia === -1 ? Infinity : ia) - (ib === -1 ? Infinity : ib);
    return a.localeCompare(b);
  });

  return types.map((type) => {
    const [latest, ...previous] = byType.get(type)!.sort((a, b) => b.year - a.year);
    const info = DOCUMENT_TYPES[type] ?? {
      title: titleFromSlug(type),
      description: '',
      icon: FileText,
    };
    return { type, ...info, latest, previous };
  });
}

// PDFs bundled with the website, used when Google Drive is not available or empty.
const localModules = import.meta.glob<{ default: string }>('../../imports/transparencia/*.pdf', {
  eager: true,
});

function getLocalDocuments(): RawDocument[] {
  return Object.entries(localModules).map(([path, module]) => ({
    url: module.default,
    name: path.split('/').pop() || '',
  }));
}

async function fetchDriveDocuments(): Promise<RawDocument[]> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch('/api/transparencia', { signal: controller.signal });
    const isJson = response.headers.get('content-type')?.includes('application/json');
    if (!response.ok || !isJson) throw new Error(`HTTP ${response.status}`);
    const data = (await response.json()) as { documents?: RawDocument[] };
    if (!Array.isArray(data.documents)) throw new Error('Respuesta no válida');
    // An empty transparency page is never intended: treat it as "Drive not ready yet"
    if (data.documents.length === 0) throw new Error('La carpeta de Drive está vacía');
    return data.documents;
  } finally {
    clearTimeout(timeout);
  }
}

/** Loads the transparency documents from Google Drive, falling back to the bundled ones. */
export function useTransparencyDocuments() {
  const [documents, setDocuments] = useState<TransparencyDocument[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchDriveDocuments()
      .catch((error) => {
        console.info(`[transparencia] Usando documentos locales (${error.message || error})`);
        return getLocalDocuments();
      })
      .then((raw) => {
        if (!cancelled) setDocuments(buildTransparencyDocuments(raw));
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { documents: documents ?? [], loading: documents === null };
}
