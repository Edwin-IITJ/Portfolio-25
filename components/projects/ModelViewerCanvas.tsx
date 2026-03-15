/**
 * ModelViewerCanvas — the actual R3F / Three.js scene.
 * Imported dynamically (ssr: false) via ModelViewer.tsx.
 * Do NOT export or import this file directly in a server-rendered context.
 */
import React, { Suspense } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Center, Environment } from '@react-three/drei';

// Preload nothing — we let the lazy-load shell control when this mounts.

function Model({ src }: { src: string }) {
  const { invalidate } = useThree();
  const { scene } = useGLTF(src);

  // Trigger a re-render after the model loads so frameloop="demand" shows it.
  React.useEffect(() => {
    invalidate();
  }, [invalidate]);

  return (
    <Center>
      <primitive object={scene} />
    </Center>
  );
}

function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 4]} intensity={1.2} castShadow />
      <directionalLight position={[-4, 2, -4]} intensity={0.4} />
    </>
  );
}

interface ModelViewerCanvasProps {
  src: string;
}

export default function ModelViewerCanvas({ src }: ModelViewerCanvasProps) {
  return (
    <Canvas
      frameloop="demand"
      camera={{ position: [0, 1, 3.5], fov: 45, near: 0.01, far: 1000 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <SceneLighting />
      <Suspense fallback={null}>
        <Model src={src} />
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
