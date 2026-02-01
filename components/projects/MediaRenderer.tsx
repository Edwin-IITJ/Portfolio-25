// components/projects/MediaRenderer.tsx
'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import type { ProjectMedia } from '@/data/projects';
import ImageSkeleton from '@/components/ui/ImageSkeleton';

const BLUR_DATA_URL =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iOSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTYiIGhlaWdodD0iOSIgcng9IjIiIGZpbGw9IiNlZWVlZWUiLz48L3N2Zz4=';

export default function MediaRenderer({ items }: { items: ProjectMedia[] }) {
  const containerClassName = 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8';

  return (
    <div className="w-full space-y-10">
      {items.map((m, idx) => {
        if (m.type === 'image') {
          return <ImageBlock key={idx} {...m} />;
        }

        if (m.type === 'gif') {
          return <GifBlock key={idx} {...m} />;
        }

        if (m.type === 'video') {
          return <VideoBlock key={idx} {...m} />;
        }

        if (m.type === 'youtube') {
          return <YouTubeEmbed key={idx} {...m} />;
        }

        if (m.type === 'collage') {
          return <CollageBlock key={idx} {...m} />;
        }

        return null;
      })}
    </div>
  );
}

// Image component with lazy loading and loading state
function ImageBlock({
  src,
  alt,
  priority,
  caption,
}: Extract<ProjectMedia, { type: 'image' }>) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { margin: '200px', once: true });
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <figure ref={ref} className="w-full">
      <div className="w-full">
        {inView || priority ? (
          <>
            {!isLoaded && <ImageSkeleton className="absolute inset-0" />}
            <Image
              src={src}
              alt={alt ?? ''}
              className={`h-auto w-full transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              width={2400}
              height={1350}
              sizes="100vw"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              priority={priority ?? false}
              onLoad={() => setIsLoaded(true)}
            />
          </>
        ) : (
          <ImageSkeleton />
        )}
      </div>
      {caption ? (
        <figcaption className="mt-2 text-center text-sm text-neutral-500">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

// GIF component with lazy loading and skeleton state
function GifBlock({
  src,
  alt,
  caption,
}: Extract<ProjectMedia, { type: 'gif' }>) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { margin: '200px', once: true });
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <figure ref={ref} className="w-full">
      <div className="w-full">
        {inView ? (
          <>
            {!isLoaded && <ImageSkeleton className="absolute inset-0" />}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt ?? ''}
              className={`h-auto w-full rounded-lg transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              loading="lazy"
              onLoad={() => setIsLoaded(true)}
            />
          </>
        ) : (
          <ImageSkeleton />
        )}
      </div>
      {caption ? (
        <figcaption className="mt-2 text-center text-sm text-neutral-500">
          {caption}
        </figcaption>
      ) : null}
    </figure>
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
      <div className="w-full">
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
      </div>
      {caption ? (
        <figcaption className="mt-2 text-sm text-neutral-500">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

// Collage component for multiple images/GIFs in a row with lazy loading
function CollageBlock({
  items,
  caption,
}: Extract<ProjectMedia, { type: 'collage' }>) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { margin: '200px', once: true });

  return (
    <figure ref={ref} className="w-full">
      <div className="w-full">
        <div
          className="grid gap-2 sm:gap-4 w-full"
          style={{
            gridTemplateColumns: `repeat(${items.length}, 1fr)`,
          }}
        >
          {items.map((item, idx) => (
            <div key={idx} className="w-full h-full">
              {inView ? (
                item.mediaType === 'image' ? (
                  <Image
                    src={item.src}
                    alt={item.alt ?? ''}
                    className="h-auto w-full rounded-lg"
                    width={1200}
                    height={900}
                    sizes={`${Math.floor(100 / items.length)}vw`}
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.src}
                    alt={item.alt ?? ''}
                    className="h-auto w-full rounded-lg"
                    loading="lazy"
                  />
                )
              ) : (
                <div className="aspect-video w-full rounded-lg bg-neutral-100 animate-pulse" />
              )}
            </div>
          ))}
        </div>
      </div>
      {caption ? (
        <figcaption className="mt-2 text-center text-sm text-neutral-500">
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
      <div className="w-full">
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
      </div>
      {caption ? (
        <figcaption className="mt-2 text-sm text-neutral-500">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
