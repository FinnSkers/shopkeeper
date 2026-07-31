'use client';

import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stage, Float, MeshDistortMaterial, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

function ProductMesh({ color }: { color: string }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
      <group ref={meshRef}>
        {/* Main Sleek Gadget Body */}
        <RoundedBox args={[2, 2.5, 0.4]} radius={0.15} smoothness={8}>
          <meshPhysicalMaterial
            color={color}
            metalness={0.8}
            roughness={0.15}
            clearcoat={1}
            clearcoatRoughness={0.1}
            reflectivity={1}
          />
        </RoundedBox>

        {/* Camera Lens Element */}
        <mesh position={[0, 0.6, 0.25]}>
          <cylinderGeometry args={[0.4, 0.4, 0.1, 32]} />
          <meshStandardMaterial color="#111" metalness={0.9} roughness={0.1} />
        </mesh>
        
        {/* Glowing Lens Ring */}
        <mesh position={[0, 0.6, 0.31]}>
          <ringGeometry args={[0.3, 0.38, 32]} />
          <meshBasicMaterial color="#06b6d4" />
        </mesh>

        {/* Futuristic Glowing Brand Bar */}
        <mesh position={[0, -0.6, 0.22]}>
          <boxGeometry args={[1.2, 0.08, 0.02]} />
          <meshBasicMaterial color="#ec4899" />
        </mesh>
      </group>
    </Float>
  );
}

export default function ProductViewer({ color = '#7c3aed' }: { color?: string }) {
  const [autoRotate, setAutoRotate] = useState(true);

  return (
    <div className="w-full h-[400px] md:h-[500px] relative rounded-3xl overflow-hidden bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10 backdrop-blur-2xl">
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className="px-3 py-1.5 text-xs font-semibold rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-gray-200 backdrop-blur-md transition-all"
        >
          {autoRotate ? '⏸ Pause Spin' : '▶ Auto Spin'}
        </button>
        <span className="text-xs px-3 py-1.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
          3D Interactive
        </span>
      </div>

      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#06b6d4" />
        <ProductMesh color={color} />
        <OrbitControls enableZoom={true} minDistance={3} maxDistance={8} autoRotate={autoRotate} autoRotateSpeed={2} />
      </Canvas>

      <div className="absolute bottom-4 left-4 text-xs text-gray-400 pointer-events-none flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        Drag to rotate • Scroll to zoom
      </div>
    </div>
  );
}
