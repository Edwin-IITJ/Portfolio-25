/**
 * components/projects/NdaGate.tsx
 *
 * Password gate for NDA-protected case studies.
 *
 * Flow:
 *   1. On mount: checks /api/case-studies/status to restore auth from existing cookie
 *   2. If not authenticated: shows NDA acknowledgment + password form
 *   3. On correct password: fetches protected content from /api/case-studies/[slug]
 *   4. On success: renders children with the loaded protected content injected via onUnlock()
 *
 * UI design is intentionally minimal/structural — visual polish to be added later
 * when case study UI design is finalized.
 */

import { useState, useEffect, useCallback, type ReactNode } from 'react';
import type { Project } from '../../data/projects';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface NdaGateProps {
  slug: string;
  /** Called once when auth succeeds. Receives the protected content. */
  onUnlock: (protectedContent: NonNullable<Project['protectedContent']>) => void;
  children: ReactNode;
}

type GateState = 'checking' | 'locked' | 'verifying' | 'fetching' | 'unlocked' | 'error';

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function NdaGate({ slug, onUnlock, children }: NdaGateProps) {
  const [state, setState] = useState<GateState>('checking');
  const [password, setPassword] = useState('');
  const [ndaAccepted, setNdaAccepted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // ── On mount: check if session already exists ──────────────────────────
  useEffect(() => {
    async function checkStatus() {
      try {
        const res = await fetch('/api/case-studies/status');
        const data = await res.json() as { authenticated: boolean };
        if (data.authenticated) {
          // Session exists — skip password, go straight to fetch
          await fetchProtectedContent();
        } else {
          setState('locked');
        }
      } catch {
        setState('locked');
      }
    }
    checkStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Fetch protected content (after auth) ───────────────────────────────
  const fetchProtectedContent = useCallback(async () => {
    setState('fetching');
    try {
      const res = await fetch(`/api/case-studies/${slug}`);
      if (!res.ok) {
        const data = await res.json() as { error: string };
        throw new Error(data.error ?? 'Failed to load content');
      }
      const data = await res.json() as {
        protectedContent: NonNullable<Project['protectedContent']>;
      };
      onUnlock(data.protectedContent);
      setState('unlocked');
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Failed to load content. Please try again.');
      setState('locked');
    }
  }, [slug, onUnlock]);

  // ── Password submit ────────────────────────────────────────────────────
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ndaAccepted) {
      setErrorMessage('Please acknowledge the NDA terms before continuing.');
      return;
    }
    if (!password.trim()) {
      setErrorMessage('Please enter the presentation password.');
      return;
    }
    setState('verifying');
    setErrorMessage('');
    try {
      const res = await fetch('/api/case-studies/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json() as { authenticated: boolean; error?: string };
      if (!data.authenticated) {
        setErrorMessage(data.error ?? 'Incorrect password.');
        setState('locked');
        return;
      }
      // Cookie is now set — fetch the protected content
      await fetchProtectedContent();
    } catch {
      setErrorMessage('Network error. Please check your connection and try again.');
      setState('locked');
    }
  }, [ndaAccepted, password, fetchProtectedContent]);

  // ── If unlocked, render children (page component handles the rest) ─────
  if (state === 'unlocked') {
    return <>{children}</>;
  }

  // ── Checking / fetching state ──────────────────────────────────────────
  if (state === 'checking' || state === 'fetching') {
    return (
      <div className="nda-gate-loading" aria-live="polite" aria-busy="true">
        <div className="nda-gate-spinner" aria-hidden="true" />
        <p>{state === 'checking' ? 'Checking session...' : 'Loading protected content...'}</p>
      </div>
    );
  }

  // ── Locked / verifying: show the gate UI ──────────────────────────────
  return (
    <div className="nda-gate" role="main" aria-label="Protected content — authentication required">
      {/* Lock icon */}
      <div className="nda-gate-icon" aria-hidden="true">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          width={40}
          height={40}
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      </div>

      <h2 className="nda-gate-title">Confidential Case Study</h2>

      <p className="nda-gate-description">
        This project was completed under an NDA during employment.
        It is shown exclusively during presentations with prior consent.
      </p>

      <form className="nda-gate-form" onSubmit={handleSubmit} noValidate>
        {/* NDA acknowledgment */}
        <label className="nda-gate-checkbox-label">
          <input
            type="checkbox"
            className="nda-gate-checkbox"
            checked={ndaAccepted}
            onChange={(e) => {
              setNdaAccepted(e.target.checked);
              if (errorMessage) setErrorMessage('');
            }}
            disabled={state === 'verifying'}
            id="nda-accept"
          />
          <span>
            I acknowledge that this content is confidential. I will not screenshot,
            record, or share it, and I am viewing it as part of an authorised presentation.
          </span>
        </label>

        {/* Password input */}
        <div className="nda-gate-input-group">
          <label htmlFor="nda-password" className="nda-gate-input-label">
            Presentation Password
          </label>
          <input
            id="nda-password"
            type="password"
            className="nda-gate-input"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errorMessage) setErrorMessage('');
            }}
            placeholder="Enter password"
            disabled={state === 'verifying'}
            autoComplete="current-password"
            required
          />
        </div>

        {/* Error message */}
        {errorMessage && (
          <p className="nda-gate-error" role="alert" aria-live="assertive">
            {errorMessage}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="nda-gate-submit"
          disabled={state === 'verifying'}
          aria-disabled={state === 'verifying'}
        >
          {state === 'verifying' ? 'Verifying…' : 'Unlock Case Study'}
        </button>
      </form>
    </div>
  );
}
