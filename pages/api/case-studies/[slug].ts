/**
 * pages/api/case-studies/[slug].ts
 *
 * GET /api/case-studies/:slug
 *
 * Returns the protected content for an NDA case study.
 * Requires a valid session cookie (issued by /api/case-studies/verify).
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import {
  getTokenFromCookies,
  verifyToken,
} from '../../../lib/case-study-auth';
import { projectsData } from '../../../data/projects';
import type { Project } from '../../../data/projects';

type SuccessResponse = {
  slug: string;
  protectedContent: NonNullable<Project['protectedContent']>;
};

type ErrorResponse = {
  error: string;
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getAllProjects(): Project[] {
  return [
    ...projectsData.majorProjects,
    ...projectsData.otherWorks,
    ...projectsData.labWorks,
  ];
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 1. Validate session cookie
  const secret = process.env.CASE_STUDY_SECRET;
  if (!secret) {
    console.error('[case-study/slug] Missing env var: CASE_STUDY_SECRET');
    return res.status(500).json({ error: 'Server configuration error.' });
  }

  const token = getTokenFromCookies(req.headers.cookie);
  if (!token) {
    return res.status(401).json({ error: 'Authentication required.' });
  }

  const { valid, reason } = verifyToken(token, secret);
  if (!valid) {
    return res.status(401).json({
      error: reason === 'expired'
        ? 'Session expired. Please re-authenticate.'
        : 'Invalid session. Please re-authenticate.',
    });
  }

  // 2. Find the project
  const slug = req.query.slug as string;
  const project = getAllProjects().find((p) => p.id === slug);

  if (!project) {
    return res.status(404).json({ error: 'Case study not found.' });
  }

  if (!project.isNdaProtected) {
    return res.status(404).json({ error: 'This project is not NDA-protected.' });
  }

  if (!project.protectedContent) {
    return res.status(404).json({ error: 'Protected content not available yet.' });
  }

  // 3. Return protected content (never served during SSG)
  return res.status(200).json({
    slug,
    protectedContent: project.protectedContent,
  });
}
