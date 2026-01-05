'use client'
import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

// Animated particle field component
function StarField() {
  const ref = useRef<THREE.Points>(null)

  // Generate random positions for particles
  const particles = useMemo(() => {
    const positions = new Float32Array(5000 * 3)
    for (let i = 0; i < 5000; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 10
      positions[i3 + 1] = (Math.random() - 0.5) * 10
      positions[i3 + 2] = (Math.random() - 0.5) * 10
    }
    return positions
  }, [])

  // Animate rotation
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10
      ref.current.rotation.y -= delta / 15
    }
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#3b82f6"
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  )
}

// Floating sphere component
function FloatingSphere() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial
        color="#2563eb"
        wireframe
        transparent
        opacity={0.3}
      />
    </mesh>
  )
}

const BackgroundCanvas = ({ onLoaded }: { onLoaded?: () => void }) => {
  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-br from-white via-primary-50/30 to-accent-50/30">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
        onCreated={() => onLoaded?.()}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />

        <StarField />
        <FloatingSphere />

        {/* Optional: Enable user interaction */}
        {/* <OrbitControls enableZoom={false} enablePan={false} /> */}
      </Canvas>
    </div>
  )
}

export default BackgroundCanvas
