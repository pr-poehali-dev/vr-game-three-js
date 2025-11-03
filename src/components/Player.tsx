import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface PlayerProps {
  position: [number, number, number];
}

export default function Player({ position }: PlayerProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const trailRef = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 2;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef} castShadow>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#0EA5E9"
          emissiveIntensity={0.8}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshBasicMaterial
          color="#0EA5E9"
          transparent
          opacity={0.3}
          wireframe
        />
      </mesh>

      <pointLight
        position={[0, 0, 0]}
        color="#0EA5E9"
        intensity={3}
        distance={3}
      />

      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 0.5;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        return (
          <mesh key={i} position={[x, 0, z]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshBasicMaterial
              color="#D946EF"
              transparent
              opacity={0.6}
            />
          </mesh>
        );
      })}
    </group>
  );
}
