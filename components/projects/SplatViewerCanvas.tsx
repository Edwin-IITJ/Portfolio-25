/**
 * SplatViewerCanvas — R3F scene for Gaussian Splat (.splat) files.
 * Imported dynamically (ssr: false) via SplatViewer.tsx.
 * Do NOT import this directly in a server-rendered context.
 */
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Splat, Environment } from '@react-three/drei';

interface SplatViewerCanvasProps {
  src: string;
}

export default function SplatViewerCanvas({ src }: SplatViewerCanvasProps) {
  return (
    <Canvas
      frameloop="demand"
      camera={{ position: [0, 1, 3.5], fov: 45, near: 0.01, far: 1000 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 4]} intensity={1.2} />
      <directionalLight position={[-4, 2, -4]} intensity={0.4} />
      <Suspense fallback={null}>
        <Splat src={src} />
        <Environment preset="city" environmentIntensity={0.3} />
      </Suspense>
      <OrbitControls
        makeDefault
        enablePan
        enableZoom
        enableRotate
        minDistance={0.5}
        maxDistance={20}
        dampingFactor={0.08}
        enableDamping
      />
    </Canvas>
  );
}
