/**
 * SplatViewer — shared component for displaying Gaussian Splat (.splat) files.
 * Same lazy-init and error-handling approach as ModelViewer.
 * Lazy-initialises the R3F canvas only when scrolled into view.
 * Uses frameloop="demand" for page performance.
 *
 * Usage:
 *   <SplatViewer src="/path/to/model.splat" height={400} />
 */
import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import ErrorBoundary from './ErrorBoundary';

// ── helpers ────────────────────────────────────────────────────────────────

/** Detect WebGL support before mounting any Canvas. */
function isWebGLAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')
    );
  } catch {
    return false;
  }
}

// ── dynamic import ──────────────────────────────────────────────────────────

const SplatViewerCanvas = dynamic(
  () => import('./SplatViewerCanvas'),
  {
    ssr: false,
    loading: () => <StatusState label="Loading splat..." />,
  }
);

// ── sub-components ──────────────────────────────────────────────────────────

function StatusState({ label }: { label: string }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-transparent">
      <div className="w-8 h-8 rounded-full border border-[#8B6F47]/20 border-t-[#8B6F47] animate-spin" />
      <span className="text-[#F5F0E8]/40 text-[9px] font-sans uppercase tracking-widest">
        {label}
      </span>
    </div>
  );
}

function UnavailableFallback({ height }: { height: number }) {
  return (
    <div
      className="w-full flex flex-col items-center justify-center gap-3 bg-[#0F0B07] border border-[#8B6F47]/20"
      style={{ height }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-[#8B6F47]/50"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      <span className="text-[#F5F0E8]/30 text-[9px] font-sans uppercase tracking-widest">
        3D preview unavailable
      </span>
    </div>
  );
}

// ── main component ──────────────────────────────────────────────────────────

interface SplatViewerProps {
  src: string;
  /** Canvas height in pixels. Defaults to 400. */
  height?: number;
  className?: string;
  label?: string;
}

export default function SplatViewer({
  src,
  height = 400,
  className = '',
  label = 'Drag to rotate / Scroll to zoom',
}: SplatViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [webGLOk, setWebGLOk] = useState<boolean | null>(null);

  // Check WebGL on mount (client-only).
  useEffect(() => {
    setWebGLOk(isWebGLAvailable());
  }, []);

  // Lazy-init: mount canvas only when scrolled into view.
  useEffect(() => {
    const el = containerRef.current;
    if (!el || webGLOk === false) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [webGLOk]);

  // Hint fade-in after load.
  useEffect(() => {
    if (!isVisible) return;
    const t = setTimeout(() => setIsLoaded(true), 800);
    return () => clearTimeout(t);
  }, [isVisible]);

  // WebGL unavailable — show static fallback immediately, no canvas.
  if (webGLOk === false) {
    return <UnavailableFallback height={height} />;
  }

  return (
    <ErrorBoundary fallback={<UnavailableFallback height={height} />}>
      <div
        ref={containerRef}
        className={`relative w-full overflow-hidden bg-[#0F0B07] border border-[#8B6F47]/25 ${className}`}
        style={{ height }}
        aria-label={`Interactive Gaussian Splat viewer. ${label}`}
      >
        {/* Canvas — mounts only after scroll into view */}
        {isVisible && (
          <div className="absolute inset-0">
            <SplatViewerCanvas src={src} />
          </div>
        )}

        {/* Pre-load placeholder */}
        {!isVisible && <StatusState label="Scroll to load splat" />}

        {/* Interaction hint */}
        <div
          className="absolute bottom-0 inset-x-0 flex items-end justify-center pb-3 pointer-events-none transition-opacity duration-700"
          style={{ opacity: isLoaded ? 1 : 0 }}
        >
          <span className="bg-[#0F0B07]/70 px-3 py-1 text-[#F5F0E8]/50 text-[9px] font-sans uppercase tracking-widest">
            {label}
          </span>
        </div>

        {/* Splat badge */}
        <div className="absolute top-3 left-3 pointer-events-none">
          <span className="bg-[#1A1410]/80 text-[#8B6F47] text-[8px] font-sans font-black uppercase tracking-[0.2em] px-2 py-0.5 border border-[#8B6F47]/30">
            SPLAT
          </span>
        </div>
      </div>
    </ErrorBoundary>
  );
}
