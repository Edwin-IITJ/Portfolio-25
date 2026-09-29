/**
 * pages/api/case-studies/verify.ts
 *
 * POST /api/case-studies/verify
 *
 * Validates the presentation password and issues a signed session cookie.
 * Basic in-memory rate limiting: 5 attempts per IP per minute.
 * (Resets on Vercel cold-starts — acceptable for presentation-only use.)
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import {
  verifyPassword,
  signToken,
  buildSessionCookie,
} from '../../../lib/case-study-auth';

type ResponseData = {
  authenticated: boolean;
  error?: string;
};

// ---------------------------------------------------------------------------
// In-memory rate limiter
// ---------------------------------------------------------------------------

interface RateRecord {
  count: number;
  resetAt: number; // unix ms
}

const rateLimitMap = new Map<string, RateRecord>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute

function getIp(req: NextApiRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') return forwarded.split(',')[0].trim();
  return req.socket.remoteAddress ?? 'unknown';
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (record.count >= RATE_LIMIT_MAX) return true;

  record.count += 1;
  return false;
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ authenticated: false, error: 'Method not allowed' });
  }

  const ip = getIp(req);
  if (isRateLimited(ip)) {
    return res.status(429).json({
      authenticated: false,
      error: 'Too many attempts. Please wait a minute before trying again.',
    });
  }

  const { password } = req.body as { password?: string };

  if (!password || typeof password !== 'string') {
    return res.status(400).json({ authenticated: false, error: 'Password is required.' });
  }

  const storedHash = process.env.CASE_STUDY_PASSWORD_HASH;
  const secret = process.env.CASE_STUDY_SECRET;

  if (!storedHash || !secret) {
    console.error('[case-study/verify] Missing env vars: CASE_STUDY_PASSWORD_HASH or CASE_STUDY_SECRET');
    return res.status(500).json({ authenticated: false, error: 'Server configuration error.' });
  }

  const isValid = verifyPassword(password, storedHash);

  if (!isValid) {
    return res.status(401).json({ authenticated: false, error: 'Incorrect password.' });
  }

  const token = signToken(secret);
  res.setHeader('Set-Cookie', buildSessionCookie(token));
  return res.status(200).json({ authenticated: true });
}
