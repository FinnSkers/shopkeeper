'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, OrbitControls, Sphere, Torus, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedShape() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);
  const outerRingRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.sin(t / 2) * 0.3;
    meshRef.current.rotation.y = Math.cos(t / 1.5) * 0.5;
    ringRef.current.rotation.z = t * 0.4;
    ringRef.current.rotation.x = t * 0.2;
    outerRingRef.current.rotation.y = -t * 0.3;
  });

  return (
    <group scale={1.2}>
      {/* Central Morphing Orb */}
      <Sphere ref={meshRef} args={[1, 64, 64]} scale={1.4}>
        <MeshDistortMaterial
          color="#7c3aed"
          attach="material"
          distort={0.4}
          speed={2.5}
          roughness={0.1}
          metalness={0.8}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </Sphere>

      {/* Inner Neon Ring */}
      <Torus ref={ringRef} args={[2.2, 0.06, 16, 100]}>
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={2}
          roughness={0.2}
          metalness={0.9}
        />
      </Torus>

      {/* Outer Magenta Ring */}
      <Torus ref={outerRingRef} args={[2.8, 0.04, 16, 100]}>
        <MeshWobbleMaterial
          color="#ec4899"
          emissive="#ec4899"
          emissiveIntensity={1.5}
          factor={0.3}
          speed={2}
        />
      </Torus>

      {/* Floating Satellites */}
      <Float speed={3} rotationIntensity={2} floatIntensity={3}>
        <mesh position={[2.5, 1.5, -1]}>
          <octahedronGeometry args={[0.35]} />
          <meshStandardMaterial color="#38bdf8" metalness={0.9} roughness={0.1} />
        </mesh>
      </Float>

      <Float speed={4} rotationIntensity={3} floatIntensity={2}>
        <mesh position={[-2.2, -1.8, 1]}>
          <icosahedronGeometry args={[0.3]} />
          <meshStandardMaterial color="#a855f7" metalness={0.9} roughness={0.1} />
        </mesh>
      </Float>
    </group>
  );
}

export default function HeroScene() {
  return (
    <div className="w-full h-full min-h-[450px] relative">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={1} color="#06b6d4" />
        <pointLight position={[10, -10, 5]} intensity={1.5} color="#ec4899" />
        <AnimatedShape />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} enablePan={false} />
      </Canvas>
    </div>
  );
}
