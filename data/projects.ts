// data/projects.ts

// Typed schema for projects and rich media blocks.
// This file migrates the existing JSON data and future-proofs media handling.

export type ProjectMedia =
  | {
    type: 'image';
    src: string;
    alt?: string;
    width?: number;
    height?: number;
    priority?: boolean;
    caption?: string;
  }
  | {
    type: 'gif';
    src: string;
    alt?: string;
    caption?: string;
  }
  | {
    type: 'video';
    // Current: MP4/H.264 with controls; future: HLS/DASH optional fields.
    src: string;
    poster?: string;
    alt?: string;
    controls?: boolean;
    loop?: boolean;
    muted?: boolean;
    hlsSrc?: string; // future streaming
    dashSrc?: string; // future streaming
    caption?: string;
  }
  | {
    type: 'youtube';
    videoId: string; // e.g., "dQw4w9WgXcQ"
    title?: string;
    caption?: string;
  };

export type Project = {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  category: string;
  year: string;
  technologies: string[];
  coverImage: string;

  // Optional legacy fields preserved:
  images?: string[];
  projectUrl?: string;
  behanceUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  challenges?: string;
  solution?: string;
  results?: string;

  // Live project fields (for embedded interactive projects):
  isLiveProject?: boolean;
  liveProjectPath?: string;

  // Behance-style long-form documentation sequence:
  contentMedia?: ProjectMedia[];
};

export type ProjectsData = {
  majorProjects: Project[];
  otherWorks: Project[];
  labWorks: Project[];
};

// Import your existing JSON so all current projects are preserved.
import raw from './projects.json';

// ---------- Utilities ----------

// Remove keys that are strictly undefined (shallow) to keep props JSON-safe.
function pruneUndefinedShallow<T extends Record<string, unknown>>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined)
  ) as T;
}

function ensureString(v: unknown, fallback = ''): string {
  return typeof v === 'string' ? v : fallback;
}

function ensureStringArray(v: unknown): string[] {
  return Array.isArray(v) ? v.map((x) => String(x)) : [];
}

// Map legacy public/projects/<slug>/... to public/assets/projects/<slug>/...
// Cover files -> cover/, gallery images -> gallery/, docs are provided via contentMedia.
function migrateAssetPath(path: string, slug: string): string {
  if (!path || !path.startsWith('/projects/')) return path;
  const filename = path.split('/').pop() || '';
  const lower = filename.toLowerCase();

  if (lower.startsWith('cover.')) {
    return `/assets/projects/${slug}/cover/${filename}`;
  }
  return `/assets/projects/${slug}/gallery/${filename}`;
}

function rewritePaths(p: Project): Project {
  const slug = p.id;

  const newCover = migrateAssetPath(p.coverImage, slug);
  const newImages = Array.isArray(p.images)
    ? p.images.map((img) => migrateAssetPath(img, slug))
    : undefined;

  // Build and prune to omit undefined keys
  return pruneUndefinedShallow({
    ...p,
    coverImage: newCover,
    images: newImages,
  });
}

// Build a typed, JSON-safe project from arbitrary input.
function ensureProject(p: any): Project {
  const base = {
    id: ensureString(p.id),
    title: ensureString(p.title),
    description: ensureString(p.description),
    fullDescription: ensureString(p.fullDescription),
    category: ensureString(p.category),
    year: ensureString(p.year),
    technologies: ensureStringArray(p.technologies),
    coverImage: ensureString(p.coverImage),

    // Optional legacy fields (omit if not present)
    images: Array.isArray(p.images) ? p.images.map(String) : undefined,
    projectUrl: p.projectUrl ? String(p.projectUrl) : undefined,
    behanceUrl: p.behanceUrl ? String(p.behanceUrl) : undefined,
    githubUrl: p.githubUrl ? String(p.githubUrl) : undefined,
    featured: typeof p.featured === 'boolean' ? p.featured : undefined,
    challenges: p.challenges ? String(p.challenges) : undefined,
    solution: p.solution ? String(p.solution) : undefined,
    results: p.results ? String(p.results) : undefined,

    // Live project fields
    isLiveProject: typeof p.isLiveProject === 'boolean' ? p.isLiveProject : undefined,
    liveProjectPath: p.liveProjectPath ? String(p.liveProjectPath) : undefined,

    // ContentMedia now comes directly from JSON
    contentMedia: Array.isArray(p.contentMedia)
      ? (p.contentMedia as ProjectMedia[])
      : undefined,
  } as const;

  // Prune undefined keys so getStaticProps never sees undefined values.
  return pruneUndefinedShallow(base);
}

// OPTIONAL: Use this function only for projects needing programmatic logic
// Most projects should define contentMedia directly in projects.json
function augmentContentMedia(p: Project): Project {
  // Example: Add special logic for specific projects if needed
  // For most projects, contentMedia is already in JSON, so just return as-is

  // Uncomment below if you want to add special handling for specific projects:
  /*
  if (p.id === 'special-project') {
    const specialDocs: ProjectMedia[] = [
      {
        type: 'youtube',
        videoId: 'dQw4w9WgXcQ',
        title: 'Project Demo',
        caption: 'Full walkthrough video'
      },
    ];

    return pruneUndefinedShallow({
      ...p,
      contentMedia: [...(p.contentMedia || []), ...specialDocs],
    });
  }
  */

  return p;
}

function normalizeData(input: any): ProjectsData {
  const majors = Array.isArray(input?.majorProjects) ? input.majorProjects : [];
  const others = Array.isArray(input?.otherWorks) ? input.otherWorks : [];
  const labs = Array.isArray(input?.labWorks) ? input.labWorks : []; // NEW

  const majorProjects: Project[] = majors
    .map(ensureProject)
    .map(rewritePaths)
    .map(augmentContentMedia);

  const otherWorks: Project[] = others
    .map(ensureProject)
    .map(rewritePaths)
    .map(augmentContentMedia);

  const labWorks: Project[] = labs
    .map(ensureProject)
    .map(rewritePaths)
    .map(augmentContentMedia);

  return { majorProjects, otherWorks, labWorks };
}

// Export the fully normalized, JSON-safe data.
// - All optional undefined keys are omitted at source.
// - Legacy paths are migrated to /assets/projects/<slug>/... for Vercel-friendly static serving.
// - contentMedia is now primarily managed in projects.json for easier updates.
export const projectsData: ProjectsData = normalizeData(raw);

// Convenience helpers (optional)
export const getAllProjects = (): Project[] => [
  ...projectsData.majorProjects,
  ...projectsData.otherWorks,
  ...projectsData.labWorks,
];

export const getProjectById = (id: string): Project | undefined =>
  getAllProjects().find((p) => p.id === id);
