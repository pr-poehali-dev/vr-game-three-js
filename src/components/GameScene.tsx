import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useXR } from '@react-three/xr';
import * as THREE from 'three';
import Platform from './Platform';
import Player from './Player';

const PLATFORMS_DATA = [
  { position: [0, 0, 0] as [number, number, number], color: '#0EA5E9' },
  { position: [3, 0.5, -2] as [number, number, number], color: '#D946EF' },
  { position: [-3, 1, -4] as [number, number, number], color: '#F97316' },
  { position: [0, 1.5, -6] as [number, number, number], color: '#0EA5E9' },
  { position: [4, 2, -8] as [number, number, number], color: '#EC4899' },
  { position: [-2, 2.5, -10] as [number, number, number], color: '#D946EF' },
  { position: [2, 3, -12] as [number, number, number], color: '#F97316' },
  { position: [-4, 3.5, -14] as [number, number, number], color: '#0EA5E9' },
];

export default function GameScene() {
  const { isPresenting } = useXR();
  const [playerPos, setPlayerPos] = useState<[number, number, number]>([0, 2, 0]);
  const [velocity, setVelocity] = useState(0);
  const [currentPlatform, setCurrentPlatform] = useState(0);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' && velocity === 0) {
        setVelocity(0.15);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [velocity]);

  useFrame(() => {
    if (velocity !== 0) {
      setPlayerPos((prev) => {
        const newY = prev[1] + velocity;
        setVelocity((v) => v - 0.01);

        const nextPlatform = PLATFORMS_DATA[currentPlatform + 1];
        if (nextPlatform && Math.abs(newY - nextPlatform.position[1] - 1) < 0.3) {
          setCurrentPlatform((p) => p + 1);
          return [
            nextPlatform.position[0],
            nextPlatform.position[1] + 1,
            nextPlatform.position[2],
          ];
        }

        if (newY < PLATFORMS_DATA[currentPlatform].position[1] + 1) {
          setVelocity(0);
          return [prev[0], PLATFORMS_DATA[currentPlatform].position[1] + 1, prev[2]];
        }

        return [prev[0], newY, prev[2]];
      });
    }
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#0EA5E9" />
      <pointLight position={[-10, 10, -10]} intensity={0.5} color="#D946EF" />
      <pointLight position={[0, 15, -15]} intensity={0.5} color="#F97316" />

      <Player position={playerPos} />

      {PLATFORMS_DATA.map((platform, index) => (
        <Platform
          key={index}
          position={platform.position}
          color={platform.color}
          isActive={index === currentPlatform}
        />
      ))}

      <fog attach="fog" args={['#1A1F2C', 10, 50]} />
    </>
  );
}
