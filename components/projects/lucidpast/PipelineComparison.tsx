import React from 'react';

export default function PipelineComparison() {
  return (
    <div className="grid md:grid-cols-2 gap-8 my-12 items-stretch">
      {/* Pipeline A */}
      <div className="border border-[#8B6F47]/20 bg-white/50 p-6 md:p-8 flex flex-col">
        <h3 className="font-sans font-black text-xs tracking-widest uppercase text-[#8B6F47] mb-6">
          Pipeline A — Depth Pro + Mesh
        </h3>
        
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex items-start gap-4">
            <div className="font-display font-light text-[#8B6F47] text-xl">1</div>
            <div>
              <p className="font-bold text-[#1A1410]">Depth Pro depth estimation</p>
              <p className="text-sm opacity-60">~8s/image</p>
            </div>
          </div>
          
          <div className="w-[2px] h-4 bg-[#8B6F47]/20 ml-[7px]" />
          
          <div className="flex items-start gap-4">
            <div className="font-display font-light text-[#8B6F47] text-xl">2</div>
            <div>
              <p className="font-bold text-[#1A1410]">Point cloud generation</p>
              <p className="text-sm opacity-60">~2 min/image</p>
            </div>
          </div>
          
          <div className="w-[2px] h-4 bg-[#8B6F47]/20 ml-[7px]" />
          
          <div className="flex items-start gap-4">
            <div className="font-display font-light text-[#8B6F47] text-xl">3</div>
            <div>
              <p className="font-bold text-[#1A1410]">Poisson surface reconstruction</p>
              <p className="text-sm opacity-60">~15 min/image</p>
            </div>
          </div>
          
          <div className="w-[2px] h-4 bg-[#8B6F47]/20 ml-[7px]" />
          
          <div className="flex items-start gap-4">
            <div className="font-display font-light text-[#8B6F47] text-xl">4</div>
            <div>
              <p className="font-bold text-[#1A1410]">Texture mapping</p>
              <p className="text-sm opacity-60">~3 min/image</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#8B6F47]/20">
          <p className="text-sm text-[#1A1410]">
            <span className="font-bold uppercase text-[#8B6F47] text-[10px] tracking-widest block mb-1">Total:</span> 
            ~20 minutes per image
          </p>
          <p className="text-sm text-[#1A1410] mt-3">
            <span className="font-bold uppercase text-[#8B6F47] text-[10px] tracking-widest block mb-1">Output:</span> 
            textured polygon mesh (.glb)
          </p>
        </div>
      </div>

      {/* Pipeline B */}
      <div className="border border-[#8B6F47]/30 bg-[#0F0B07] p-6 md:p-8 flex flex-col relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <div className="font-sans font-black text-9xl text-[#8B6F47]">B</div>
        </div>
        
        <h3 className="font-sans font-black text-xs tracking-widest uppercase text-[#8B6F47] mb-6 relative z-10">
          Pipeline B — Apple SHARP Splatting
        </h3>
        
        <div className="flex-1 flex flex-col justify-center relative z-10 px-4">
          <div className="bg-[#1A1410] border border-[#8B6F47]/30 p-8 rounded-sm text-center shadow-lg shadow-[#1A1410]/50 relative z-10">
            <div className="absolute -top-3 -left-3 font-display font-light text-[#8B6F47] text-xl bg-[#0F0B07] w-8 h-8 flex items-center justify-center border border-[#8B6F47]/30 rounded-full">1</div>
            <div>
              <p className="font-bold text-[#F5F0E8] text-xl mb-2">SHARP inference</p>
              <p className="text-[#8B6F47] text-sm">&lt;1s/image</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#8B6F47]/20 relative z-10">
          <p className="text-sm text-[#F5F0E8]">
            <span className="font-bold uppercase text-[#8B6F47] text-[10px] tracking-widest block mb-1">Total:</span> 
            under 1 second per image
          </p>
          <p className="text-sm text-[#F5F0E8] mt-3">
            <span className="font-bold uppercase text-[#8B6F47] text-[10px] tracking-widest block mb-1">Output:</span> 
            Gaussian Splat (.ply)
          </p>
        </div>
      </div>
    </div>
  );
}
