/**
 * lib/case-study-auth.ts
 *
 * Auth utilities for the NDA case-study gate.
 * Uses Node.js built-in `crypto` only — zero new npm dependencies.
 *
 * Security model:
 *   - Password stored as SHA-256 hex hash in CASE_STUDY_PASSWORD_HASH env var
 *   - Compared with crypto.timingSafeEqual to prevent timing attacks
 *   - Sessions issued as HS256-style JWTs signed with CASE_STUDY_SECRET
 *   - JWTs stored in httpOnly, Secure, SameSite=Strict cookies
 */

import crypto from 'crypto';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface TokenPayload {
  iat: number; // issued-at (unix seconds)
  exp: number; // expiry (unix seconds)
}

export interface VerifyResult {
  valid: boolean;
  payload?: TokenPayload;
  reason?: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

export const COOKIE_NAME = 'cs_session';
const TOKEN_EXPIRY_HOURS = 24;

// ---------------------------------------------------------------------------
// JWT (HS256 using Node crypto — no jsonwebtoken package needed)
// ---------------------------------------------------------------------------

function b64urlEncode(buf: Buffer | string): string {
  const b = typeof buf === 'string' ? Buffer.from(buf, 'utf8') : buf;
  return b.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

function b64urlDecode(str: string): Buffer {
  const padded = str + '==='.slice((str.length + 3) % 4);
  return Buffer.from(padded.replace(/-/g, '+').replace(/_/g, '/'), 'base64');
}

/** Signs a minimal JWT payload with HMAC-SHA256. */
export function signToken(secret: string, expiresInHours = TOKEN_EXPIRY_HOURS): string {
  const now = Math.floor(Date.now() / 1000);
  const payload: TokenPayload = { iat: now, exp: now + expiresInHours * 3600 };
  const header = b64urlEncode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = b64urlEncode(JSON.stringify(payload));
  const signingInput = `${header}.${body}`;
  const sig = crypto.createHmac('sha256', secret).update(signingInput).digest();
  return `${signingInput}.${b64urlEncode(sig)}`;
}

/** Verifies a JWT and returns the payload if valid. */
export function verifyToken(token: string, secret: string): VerifyResult {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return { valid: false, reason: 'malformed' };
    const [header, body, sig] = parts;
    const signingInput = `${header}.${body}`;
    const expectedSig = b64urlEncode(
      crypto.createHmac('sha256', secret).update(signingInput).digest()
    );
    const expectedBuf = Buffer.from(expectedSig, 'utf8');
    const actualBuf = Buffer.from(sig, 'utf8');
    if (
      expectedBuf.length !== actualBuf.length ||
      !crypto.timingSafeEqual(expectedBuf, actualBuf)
    ) {
      return { valid: false, reason: 'invalid_signature' };
    }
    const payload = JSON.parse(b64urlDecode(body).toString('utf8')) as TokenPayload;
    if (Math.floor(Date.now() / 1000) > payload.exp) return { valid: false, reason: 'expired' };
    return { valid: true, payload };
  } catch {
    return { valid: false, reason: 'parse_error' };
  }
}

// ---------------------------------------------------------------------------
// Password verification (SHA-256, timing-safe)
// ---------------------------------------------------------------------------

/** Hashes a plaintext password with SHA-256. */
export function hashPassword(plaintext: string): string {
  return crypto.createHash('sha256').update(plaintext, 'utf8').digest('hex');
}

/**
 * Compares a plaintext attempt against the stored SHA-256 hash.
 * Uses timingSafeEqual to prevent timing-based password discovery.
 */
export function verifyPassword(attempt: string, storedHash: string): boolean {
  try {
    const attemptHash = hashPassword(attempt);
    const a = Buffer.from(attemptHash, 'hex');
    const b = Buffer.from(storedHash, 'hex');
    if (a.length !== b.length) return false;
    return crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

// ---------------------------------------------------------------------------
// Cookie utilities
// ---------------------------------------------------------------------------

/** Extracts the session token value from a raw Cookie header string. */
export function getTokenFromCookies(cookieHeader: string | undefined): string | null {
  if (!cookieHeader) return null;
  const match = cookieHeader
    .split(';')
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${COOKIE_NAME}=`));
  return match ? match.slice(COOKIE_NAME.length + 1) : null;
}

/** Builds a Set-Cookie header string for the session cookie. */
export function buildSessionCookie(token: string, expiresInHours = TOKEN_EXPIRY_HOURS): string {
  const expires = new Date(Date.now() + expiresInHours * 3600 * 1000).toUTCString();
  const isProduction = process.env.NODE_ENV === 'production';
  return [
    `${COOKIE_NAME}=${token}`,
    `Expires=${expires}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Strict',
    ...(isProduction ? ['Secure'] : []),
  ].join('; ');
}

/** Builds a Set-Cookie header that clears the session cookie. */
export function clearSessionCookie(): string {
  return `${COOKIE_NAME}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Strict`;
}
