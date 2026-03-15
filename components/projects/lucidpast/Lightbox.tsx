import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TransformWrapper, TransformComponent, ReactZoomPanPinchRef } from 'react-zoom-pan-pinch';

interface LightboxProps {
  src: string;
  alt: string;
  children: React.ReactNode;
}

export default function Lightbox({ src, alt, children }: LightboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const transformRef = useRef<ReactZoomPanPinchRef>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };

    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollY);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const close = () => setIsOpen(false);
  const resetZoom = () => transformRef.current?.resetTransform();

  return (
    <>
      <div
        className="cursor-zoom-in relative"
        onClick={() => setIsOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setIsOpen(true); }}
        aria-label={`Expand image: ${alt}`}
      >
        {children}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            // z-[200000] ensures we paint above the navbar stacking context
            className="fixed inset-0 z-[200000] flex items-center justify-center bg-[#0F0B07]/92 backdrop-blur-sm"
            onClick={close}
            aria-modal="true"
            role="dialog"
            aria-label={alt}
          >
            {/* Hint text — bottom centre, outside content area */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
              <p className="text-[#F5F0E8]/50 text-[10px] font-sans uppercase tracking-widest hidden md:block">
                Scroll to zoom &nbsp;&bull;&nbsp; Drag to pan &nbsp;&bull;&nbsp; Double-click to reset
              </p>
              <p className="text-[#F5F0E8]/50 text-[10px] font-sans uppercase tracking-widest md:hidden">
                Pinch to zoom &nbsp;&bull;&nbsp; Swipe to pan &nbsp;&bull;&nbsp; Double-tap to reset
              </p>
            </div>

            {/*
              Content panel — flex column layout:
              1. Controls bar (buttons) rendered FIRST, always visible above image
              2. Zoom/pan area fills remaining height
              This avoids any overlap with the navbar (desktop) or hamburger (mobile)
              because the controls are part of the content flow, not fixed to the viewport corner.
            */}
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col"
              style={{ width: '90vw', maxHeight: '92vh' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Controls bar — first row, sits directly above the image */}
              <div className="flex justify-end gap-2 mb-2 pr-1 shrink-0">
                {/* Reset zoom */}
                <button
                  className="text-[#F5F0E8] bg-[#1A1410]/60 hover:bg-[#8B6F47] transition-colors rounded-full flex items-center justify-center w-10 h-10"
                  onClick={(e) => { e.stopPropagation(); resetZoom(); }}
                  aria-label="Reset zoom"
                  title="Reset zoom"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                    <path d="M3 3v5h5" />
                  </svg>
                </button>
                {/* Close */}
                <button
                  className="text-[#F5F0E8] bg-[#1A1410]/60 hover:bg-[#8B6F47] transition-colors rounded-full flex items-center justify-center w-10 h-10"
                  onClick={(e) => { e.stopPropagation(); close(); }}
                  aria-label="Close"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Zoom/pan area — fills remaining height */}
              <div style={{ flex: 1, minHeight: 0 }}>
                <TransformWrapper
                  ref={transformRef}
                  initialScale={1}
                  minScale={0.5}
                  maxScale={6}
                  doubleClick={{ mode: 'reset' }}
                  wheel={{ step: 0.08 }}
                  centerOnInit
                >
                  <TransformComponent
                    wrapperStyle={{ width: '100%', height: '100%' }}
                    contentStyle={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={alt}
                      style={{
                        maxWidth: '90vw',
                        maxHeight: '80vh',
                        width: 'auto',
                        height: 'auto',
                        objectFit: 'contain',
                        display: 'block',
                        boxShadow: '0 25px 80px rgba(0,0,0,0.7)',
                        userSelect: 'none',
                        WebkitUserSelect: 'none',
                      }}
                      draggable={false}
                    />
                  </TransformComponent>
                </TransformWrapper>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
