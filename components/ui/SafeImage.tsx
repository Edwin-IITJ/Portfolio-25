// components/ui/SafeImage.tsx
// Unified image component with graceful error fallback.
// Replaces the 3 duplicated SafeImage definitions across project pages.

'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface SafeImageProps {
  src: string;
  alt: string;
  /** Text or image src shown when the image fails to load */
  fallback?: string;
  className?: string;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
  priority?: boolean;
  /**
   * Rendering mode:
   * - 'nextjs': Uses Next.js <Image> with width/height (default for optimized images)
   * - 'native': Uses native <img> with 100% width (for CSS-driven layouts)
   */
  mode?: 'nextjs' | 'native';
  /** Aspect ratio class to wrap the image (e.g. '16/9', '4/3') */
  aspect?: string;
}

/**
 * Image with graceful error handling.
 * Falls back to a placeholder div showing `fallback` text (or `alt` if no fallback).
 */
export default function SafeImage({
  src,
  alt,
  fallback,
  className = '',
  width = 800,
  height = 500,
  style,
  priority = false,
  mode = 'native',
  aspect,
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  const aspectClass = aspect === '16/9' ? 'aspect-[16/9]' : aspect === '4/3' ? 'aspect-[4/3]' : aspect === 'aspect-video' ? 'aspect-video' : '';
  const wrapperStyle = aspect ? { overflow: 'hidden', borderRadius: '12px' } : {};

  if (hasError) {
    return (
      <div
        className={`bg-gray-100 flex items-center justify-center rounded-xl ${className}`}
        style={{ minHeight: 160, ...style }}
      >
        <span className="text-gray-400 text-sm">{fallback || alt}</span>
      </div>
    );
  }

  if (mode === 'nextjs') {
    return (
      <div className={aspectClass} style={wrapperStyle}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={className}
          style={style}
          priority={priority}
          onError={() => setHasError(true)}
        />
      </div>
    );
  }

  // Native <img> — used by FairSplit, AAM, and layout-driven pages
  return (
    <div className={aspectClass} style={wrapperStyle}>
      <img
        src={src}
        alt={alt}
        className={className}
        style={{ width: '100%', height: 'auto', display: 'block', ...style }}
        loading={priority ? 'eager' : 'lazy'}
        onError={() => setHasError(true)}
      />
    </div>
  );
}
