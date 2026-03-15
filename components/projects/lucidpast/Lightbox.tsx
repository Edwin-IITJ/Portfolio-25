import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LightboxProps {
  src: string;
  alt: string;
  children: React.ReactNode;
}

export default function Lightbox({ src, alt, children }: LightboxProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    // Save original scroll position and lock body
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      // Restore scroll position exactly
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  const close = () => setIsOpen(false);

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
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#0F0B07]/90 backdrop-blur-sm p-4 md:p-8"
            style={{ cursor: 'zoom-out' }}
            onClick={close}
            aria-modal="true"
            role="dialog"
            aria-label={alt}
          >
            {/* Close button */}
            <button
              className="absolute top-4 right-4 z-10 text-[#F5F0E8] bg-[#1A1410]/60 hover:bg-[#8B6F47] transition-colors rounded-full flex items-center justify-center w-12 h-12"
              onClick={(e) => { e.stopPropagation(); close(); }}
              aria-label="Close"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Image container — stops backdrop click from firing inside */}
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex items-center justify-center"
              style={{ maxWidth: '95vw', maxHeight: '90vh', cursor: 'default' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Plain img so dimensions are determined by the image itself */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={alt}
                style={{
                  maxWidth: '90vw',
                  maxHeight: '88vh',
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                  boxShadow: '0 25px 80px rgba(0,0,0,0.7)',
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
