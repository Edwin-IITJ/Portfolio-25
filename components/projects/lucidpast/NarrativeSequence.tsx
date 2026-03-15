import React from 'react';
import Image from 'next/image';

const sequence = [
  { id: 1, act: 1, title: 'Migrant Mother (1936)', gaze: "child's worried face" },
  { id: 2, act: 1, title: 'Textile mill child laborer', gaze: 'machinery' },
  { id: 3, act: 1, title: 'Ford assembly line workers', gaze: "workers' flat caps" },
  { id: 4, act: 2, title: 'Newsboys selling papers', gaze: 'economic systems forcing child labor' },
  { id: 5, act: 2, title: 'Depression breadline', gaze: 'department store mannequins in background' },
  { id: 6, act: 2, title: 'Store window display', gaze: "mannequin's painted smile" },
  { id: 7, act: 3, title: 'Mannequins with artificial happiness', gaze: 'smile itself' },
  { id: 8, act: 3, title: 'Beauty cream advertisement', gaze: 'manufacturing process' },
  { id: 9, act: 3, title: 'Makeup application behind-the-scenes', gaze: 'Final reveal' },
];

export default function NarrativeSequence() {
  return (
    <div className="w-full overflow-x-auto pb-8 relative z-10 custom-scrollbar mt-12">
      <div className="flex gap-6 px-4 md:px-8 min-w-max pb-4">
        {sequence.map((item, idx) => (
          <div key={item.id} className="flex flex-col w-[300px] shrink-0">
            {idx === 0 && <div className="text-[10px] tracking-[0.2em] uppercase text-[#8B6F47] mb-4">Act 1: Observation</div>}
            {idx === 3 && <div className="text-[10px] tracking-[0.2em] uppercase text-[#8B6F47] mb-4">Act 2: Narrowing</div>}
            {idx === 6 && <div className="text-[10px] tracking-[0.2em] uppercase text-[#8B6F47] mb-4">Act 3: Synthesis</div>}
            {(idx !== 0 && idx !== 3 && idx !== 6) && <div className="h-[26px]" />}
            
            <div className="relative w-full aspect-[4/5] bg-[#D4C4A8] mb-4 overflow-hidden border border-[#8B6F47]/20">
              <Image 
                src={`/assets/projects/lucid-past/sequence/${item.id}.webp`}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
            
            <h4 className="font-display text-[#F5F0E8] text-lg mb-2">{item.title}</h4>
            <div className="flex items-start gap-2 text-sm text-[#8B6F47]">
              <span>Gaze:</span>
              <span className="italic opacity-80">{item.gaze}</span>
            </div>
          </div>
        ))}

        <div className="flex flex-col w-[300px] shrink-0 justify-center items-center border border-[#8B6F47]/50 bg-[#1A1410] p-6 text-center mt-[26px]">
          <span className="font-sans font-black text-[10px] tracking-[0.3em] uppercase text-[#8B6F47] mb-4">Emergent Theme</span>
          <p className="font-display italic text-[#F5F0E8] text-lg">
            Commodification of authenticity—society manufacturing happiness during Depression while real suffering exists steps away.
          </p>
        </div>
      </div>
    </div>
  );
}
