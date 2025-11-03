import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface PlatformProps {
  position: [number, number, number];
  color: string;
  isActive?: boolean;
}

export default function Platform({ position, color, isActive }: PlatformProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current && isActive) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
    
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.1);
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <boxGeometry args={[2, 0.3, 2]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isActive ? 0.8 : 0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      <mesh ref={glowRef} position={[0, -0.15, 0]}>
        <boxGeometry args={[2.2, 0.05, 2.2]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={isActive ? 0.6 : 0.3}
        />
      </mesh>

      <pointLight
        position={[0, 1, 0]}
        color={color}
        intensity={isActive ? 2 : 0.5}
        distance={5}
      />

      {Array.from({ length: 4 }).map((_, i) => {
        const angle = (i / 4) * Math.PI * 2;
        const x = Math.cos(angle) * 1.2;
        const z = Math.sin(angle) * 1.2;
        
        return (
          <mesh key={i} position={[x, -0.15, z]}>
            <cylinderGeometry args={[0.05, 0.05, 0.5, 8]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.5}
            />
          </mesh>
        );
      })}
    </group>
  );
}
