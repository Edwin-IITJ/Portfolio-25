import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export interface StripImage {
  src: string;
  alt: string;
  label?: string;
}

interface HorizontalScrollStripProps {
  images: StripImage[];
  imageWidth?: number;        // px, default 280
  imageHeight?: number;       // px, default 210
  caption?: string;           // italic text above the strip
  scrollHint?: boolean;       // default true
  theme?: 'light' | 'dark';   // default 'dark'
  className?: string;
}

const HorizontalScrollStrip = ({
  images,
  imageWidth = 280,
  imageHeight,
  caption,
  scrollHint = true,
  theme = 'dark',
  className,
}: HorizontalScrollStripProps) => {
  const [showHint, setShowHint] = useState(scrollHint);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (showHint) {
      setShowHint(false);
    }
  }, [showHint]);

  const tokens = {
    dark: {
      thumb: '#b8976a',
      hint: '#7a7060',
      caption: '#7a7060',
      placeholder: '#111009',
    },
    light: {
      thumb: '#8B6F47',
      hint: '#8B6F47',
      caption: '#8B6F47',
      placeholder: '#D4C4A8',
    },
  }[theme];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn("w-full my-16", className)}
    >
      {caption && (
        <p className="font-garamond italic text-[0.95rem] mb-4 px-1" style={{ color: tokens.caption }}>
          {caption}
        </p>
      )}

      {showHint && (
        <div 
          className="font-mono text-[10px] uppercase tracking-widest text-right mb-2 transition-opacity duration-500 pr-1"
          style={{ color: tokens.hint }}
        >
          scroll to see all →
        </div>
      )}

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="hs-strip flex overflow-x-auto gap-3 pb-4 snap-x snap-mandatory"
      >
        {images.map((img, i) => (
          <div
            key={i}
            className="flex-shrink-0 snap-start group relative overflow-hidden flex flex-col"
            style={{ width: imageWidth }}
          >
            <ImageCell img={img} theme={theme} tokens={tokens} imageWidth={imageWidth} />
          </div>
        ))}
      </div>

      <style jsx>{`
        .hs-strip::-webkit-scrollbar {
          height: 2px;
        }
        .hs-strip::-webkit-scrollbar-track {
          background: transparent;
        }
        .hs-strip::-webkit-scrollbar-thumb {
          background: ${tokens.thumb};
        }
        .hs-strip {
          -ms-overflow-style: none;
          scrollbar-width: thin;
          scrollbar-color: ${tokens.thumb} transparent;
          -webkit-overflow-scrolling: touch;
        }
      `}</style>
    </motion.div>
  );
};

const ImageCell = ({ img, theme, tokens, imageWidth }: { img: StripImage; theme: string; tokens: any; imageWidth: number }) => {
  const [error, setError] = useState(false);

  return (
    <>
      {!error && img.src ? (
        <Image
          src={img.src}
          alt={img.alt}
          width={imageWidth}
          height={imageWidth}
          style={{ height: 'auto', width: '100%' }}
          className="transition-transform duration-700 group-hover:scale-105"
          onError={() => setError(true)}
        />
      ) : (
        <div 
          className="flex items-center justify-center border border-dashed border-white/5 relative"
          style={{ backgroundColor: tokens.placeholder, width: imageWidth, aspectRatio: '4/3' }}
        >
           <div className="absolute top-0 left-0 w-full h-[1px] bg-[#b8976a]/20 animate-scanline" />
           <span className="font-mono text-[9px] uppercase tracking-widest text-[#7a6045] px-4 text-center">
             [ Missing Archival Material ]
           </span>
        </div>
      )}

      {img.label && !error && (
        <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="font-mono text-[10px] uppercase tracking-widest text-white leading-none">
            {img.label}
          </span>
        </div>
      )}
    </>
  );
};

export default HorizontalScrollStrip;
