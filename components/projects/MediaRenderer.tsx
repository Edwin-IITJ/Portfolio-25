// components/projects/MediaRenderer.tsx
'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import type { ProjectMedia } from '@/data/projects';

const BLUR_DATA_URL =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iOSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTYiIGhlaWdodD0iOSIgcng9IjIiIGZpbGw9IiNlZWVlZWUiLz48L3N2Zz4=';

export default function MediaRenderer({ items }: { items: ProjectMedia[] }) {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10">
      {items.map((m, idx) => {
        if (m.type === 'image') {
          return (
            <figure key={idx} className="w-full">
              <Image
                src={m.src}
                alt={m.alt ?? ''}
                className="h-auto w-full rounded-lg"
                width={2400}
                height={1350}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 92vw, 1000px"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                priority={m.priority ?? false}
              />
              {m.caption ? (
                <figcaption className="mt-2 text-sm text-neutral-500">
                  {m.caption}
                </figcaption>
              ) : null}
            </figure>
          );
        }

        if (m.type === 'gif') {
          return (
            <figure key={idx} className="w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={m.src}
                alt={m.alt ?? ''}
                className="h-auto w-full rounded-lg"
                loading="lazy"
              />
              {m.caption ? (
                <figcaption className="mt-2 text-sm text-neutral-500">
                  {m.caption}
                </figcaption>
              ) : null}
            </figure>
          );
        }

        if (m.type === 'video') {
          return <VideoBlock key={idx} {...m} />;
        }

        if (m.type === 'youtube') {
          return <YouTubeEmbed key={idx} {...m} />;
        }

        return null;
      })}
    </div>
  );
}

// Self-hosted video component with lazy loading
function VideoBlock({
  src,
  poster,
  alt,
  controls = true,
  loop,
  muted,
  caption,
}: Extract<ProjectMedia, { type: 'video' }>) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { margin: '200px', once: true });

  return (
    <figure ref={ref} className="w-full">
      {inView ? (
        <video
          className="h-auto w-full rounded-lg"
          src={src}
          poster={poster}
          controls={controls}
          preload="metadata"
          playsInline
          loop={loop}
          muted={muted}
        >
          {alt && <track kind="descriptions" label={alt} />}
        </video>
      ) : (
        <div className="aspect-video w-full rounded-lg bg-neutral-100" />
      )}
      {caption ? (
        <figcaption className="mt-2 text-sm text-neutral-500">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

// YouTube embed component with lazy loading and privacy-enhanced mode
function YouTubeEmbed({
  videoId,
  title,
  caption,
}: Extract<ProjectMedia, { type: 'youtube' }>) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { margin: '200px', once: true });

  return (
    <figure ref={ref} className="w-full">
      {inView ? (
        <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-neutral-900 shadow-lg">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`}
            title={title || 'Project video'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
          />
        </div>
      ) : (
        <div className="aspect-video w-full rounded-lg bg-neutral-100 animate-pulse" />
      )}
      {caption ? (
        <figcaption className="mt-2 text-sm text-neutral-500">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
