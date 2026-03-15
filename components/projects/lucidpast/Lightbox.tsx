import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface LightboxProps {
  src: string;
  alt: string;
  children: React.ReactNode;
}

export default function Lightbox({ src, alt, children }: LightboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <div 
        className="cursor-zoom-in relative" 
        onClick={() => setIsOpen(true)}
      >
        {children}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#0F0B07]/90 backdrop-blur-sm p-4 md:p-8 cursor-zoom-out"
            onClick={() => setIsOpen(false)}
          >
            <div className="absolute top-6 right-6 z-10">
              <button 
                className="text-[#F5F0E8] bg-[#1A1410]/50 hover:bg-[#8B6F47] transition-colors rounded-full p-3 font-sans font-bold flex items-center justify-center w-12 h-12"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                aria-label="Close Lightbox"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              {!error && (
                <Image
                  src={src}
                  alt={alt}
                  fill
                  className="object-contain"
                  quality={100}
                  onError={() => setError(true)}
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
