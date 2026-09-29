/**
 * pages/api/case-studies/status.ts
 *
 * GET /api/case-studies/status
 *
 * Returns whether the current visitor has a valid session.
 * Used by the NdaGate component to restore auth state on page load.
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { getTokenFromCookies, verifyToken } from '../../../lib/case-study-auth';

type ResponseData = {
  authenticated: boolean;
  expiresAt?: string; // ISO string if authenticated
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ authenticated: false });
  }

  const secret = process.env.CASE_STUDY_SECRET;
  if (!secret) {
    return res.status(200).json({ authenticated: false });
  }

  const token = getTokenFromCookies(req.headers.cookie);
  if (!token) {
    return res.status(200).json({ authenticated: false });
  }

  const result = verifyToken(token, secret);

  if (!result.valid || !result.payload) {
    return res.status(200).json({ authenticated: false });
  }

  const expiresAt = new Date(result.payload.exp * 1000).toISOString();
  return res.status(200).json({ authenticated: true, expiresAt });
}
