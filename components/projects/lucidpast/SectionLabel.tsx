import React from 'react';

interface SectionLabelProps {
  number?: string;
  title?: string;
  isDark?: boolean;
}

export default function SectionLabel({ number, title, isDark = false }: SectionLabelProps) {
  return (
    <div className="relative mb-12 flex items-end">
      {number && (
        <span
          className={`absolute -top-6 -left-4 text-9xl font-black opacity-10 select-none pointer-events-none ${
            isDark ? 'text-[#2d1a08] opacity-100' : 'text-[#8B6F47]'
          }`}
        >
          {number}
        </span>
      )}
      <div className="relative z-10 w-full pt-6">
        {title && (
          <h2
            className={`font-sans font-black text-[10px] tracking-[0.35em] uppercase mb-4 ${
              isDark ? 'text-[#8B6F47]' : 'text-[#8B6F47]'
            }`}
          >
            {title}
          </h2>
        )}
        <div className={`h-[1px] w-full max-w-[200px] ${isDark ? 'bg-[#8B6F47]/30' : 'bg-[#8B6F47]'}`} />
      </div>
    </div>
  );
}
