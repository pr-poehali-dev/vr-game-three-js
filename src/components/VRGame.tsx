import { Canvas } from '@react-three/fiber';
import { VRButton, XR } from '@react-three/xr';
import { Sky, Stars } from '@react-three/drei';
import { Suspense, useState } from 'react';
import GameScene from './GameScene';
import MainMenu from './MainMenu';

export default function VRGame() {
  const [gameStarted, setGameStarted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  if (!gameStarted) {
    return (
      <MainMenu
        onStart={() => setGameStarted(true)}
        onInstructions={() => setShowInstructions(true)}
        showInstructions={showInstructions}
        onCloseInstructions={() => setShowInstructions(false)}
      />
    );
  }

  return (
    <div className="relative w-full h-screen">
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
        <VRButton />
      </div>
      
      <Canvas
        camera={{ position: [0, 2, 5], fov: 75 }}
        gl={{ antialias: true, alpha: false }}
      >
        <XR>
          <Suspense fallback={null}>
            <GameScene />
            <Sky
              distance={450000}
              sunPosition={[0, 1, 0]}
              inclination={0}
              azimuth={0.25}
            />
            <Stars
              radius={100}
              depth={50}
              count={5000}
              factor={4}
              saturation={0}
              fade
              speed={1}
            />
          </Suspense>
        </XR>
      </Canvas>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-4">
        <button
          onClick={() => setGameStarted(false)}
          className="px-6 py-3 bg-card/80 backdrop-blur-sm border-2 border-primary text-primary rounded-lg font-bold hover:bg-primary hover:text-background transition-all duration-300 glow-cyan"
        >
          МЕНЮ
        </button>
      </div>
    </div>
  );
}
