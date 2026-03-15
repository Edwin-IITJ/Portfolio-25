import React, { useState, useRef, useEffect, MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent } from 'react';
import Image from 'next/image';

interface ImageCompareProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel: string;
  afterLabel: string;
}

export default function ImageCompare({ beforeImage, afterImage, beforeLabel, afterLabel }: ImageCompareProps) {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const [beforeError, setBeforeError] = useState(false);
  const [afterError, setAfterError] = useState(false);

  const handleMove = (clientX: number) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  };

  const handleMouseMove = (e: globalThis.MouseEvent) => handleMove(e.clientX);
  const handleTouchMove = (e: globalThis.TouchEvent) => handleMove(e.touches[0].clientX);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', () => setIsDragging(false));
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', () => setIsDragging(false));
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', () => setIsDragging(false));
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', () => setIsDragging(false));
    };
  }, [isDragging]);

  return (
    <div 
      className="relative w-full aspect-[3/4] md:aspect-[4/5] select-none touch-none overflow-hidden bg-[#D4C4A8] my-12 cursor-ew-resize rounded-sm"
      ref={containerRef}
      onMouseDown={(e: ReactMouseEvent) => {
        setIsDragging(true);
        handleMove(e.clientX);
      }}
      onTouchStart={(e: ReactTouchEvent) => {
        setIsDragging(true);
        handleMove(e.touches[0].clientX);
      }}
    >
      {/* After Image (Background) */}
      <div className="absolute inset-0">
        {!afterError && (
          <Image 
            src={afterImage} 
            alt={afterLabel} 
            fill 
            className="object-contain"
            onError={() => setAfterError(true)}
          />
        )}
        <div className="absolute top-4 right-4 bg-[#0F0B07]/80 text-[#F5F0E8] px-3 py-1 text-[10px] font-sans font-black tracking-widest uppercase rounded">
          {afterLabel}
        </div>
      </div>

      {/* Before Image (Foreground/Clipped) */}
      <div 
        className="absolute inset-0 z-10"
        style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
      >
        {!beforeError && (
          <Image 
            src={beforeImage} 
            alt={beforeLabel} 
            fill 
            className="object-contain"
            onError={() => setBeforeError(true)}
          />
        )}
        <div className="absolute top-4 left-4 bg-[#0F0B07]/80 text-[#F5F0E8] px-3 py-1 text-[10px] font-sans font-black tracking-widest uppercase rounded">
          {beforeLabel}
        </div>
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute inset-y-0 w-1 bg-[#8B6F47] flex items-center justify-center z-20 pointer-events-none"
        style={{ left: `calc(${sliderPos}% - 2px)` }}
      >
        <div className="w-8 h-8 bg-[#8B6F47] rounded-full flex items-center justify-center shadow-lg">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F5F0E8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F5F0E8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="rotate-180 -ml-1">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </div>
      </div>
    </div>
  );
}
