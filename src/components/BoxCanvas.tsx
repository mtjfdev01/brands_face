'use client';

import { useEffect, useMemo } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Grid } from '@react-three/drei';
import * as THREE from 'three';
import { BoxModel } from '@/three/BoxModel';
import { useBoxStore } from '@/store/useBoxStore';
import type { LightingPreset } from '@/types/box';

/* ------------------------------------------------------------------ */
/*  Lighting preset configs                                            */
/* ------------------------------------------------------------------ */
interface LightConfig {
  ambient: number;
  keyColor: string;
  keyIntensity: number;
  fillIntensity: number;
  rimColor: string;
  bgColor: string;
  gridCell: string;
  gridSection: string;
  shadowOpacity: number;
}

const LIGHT_CONFIGS: Record<LightingPreset, LightConfig> = {
  dark: {
    ambient: 0.25,
    keyColor: '#dde4ff',
    keyIntensity: 1.1,
    fillIntensity: 0.35,
    rimColor: '#b8c4ff',
    bgColor: '#1a1a2e',
    gridCell: '#4a4a6a',
    gridSection: '#5a5a7a',
    shadowOpacity: 0.4,
  },
  day: {
    ambient: 0.65,
    keyColor: '#ffffff',
    keyIntensity: 1.6,
    fillIntensity: 0.55,
    rimColor: '#fff5e0',
    bgColor: '#d8d8e6',
    gridCell: '#b0b0c0',
    gridSection: '#9090a0',
    shadowOpacity: 0.25,
  },
  warm: {
    ambient: 0.35,
    keyColor: '#ffe0a0',
    keyIntensity: 1.3,
    fillIntensity: 0.3,
    rimColor: '#ff9944',
    bgColor: '#1a150e',
    gridCell: '#5a4a3a',
    gridSection: '#6a5a4a',
    shadowOpacity: 0.35,
  },
};

/* ------------------------------------------------------------------ */
/*  CameraController: responds to view changes for export              */
/* ------------------------------------------------------------------ */
function CameraController() {
  const { camera } = useThree();
  const cameraView = useBoxStore((s) => s.cameraView);
  const setCameraView = useBoxStore((s) => s.setCameraView);

  useEffect(() => {
    if (cameraView === 'default') return;
    const cam = camera as THREE.PerspectiveCamera;

    if (cameraView === 'front') {
      cam.position.set(0, 0, 3);
      cam.lookAt(0, 0, 0);
    } else if (cameraView === 'perspective') {
      cam.position.set(2.5, 1.8, 2.5);
      cam.lookAt(0, 0, 0);
    }

    cam.updateProjectionMatrix();
    const timeout = setTimeout(() => setCameraView('default'), 200);
    return () => clearTimeout(timeout);
  }, [cameraView, camera, setCameraView]);

  return null;
}

/* ------------------------------------------------------------------ */
/*  Scene: dynamic lighting based on preset                            */
/* ------------------------------------------------------------------ */
function Scene() {
  const lightingPreset = useBoxStore((s) => s.lightingPreset);
  const { scene } = useThree();

  const cfg = useMemo(() => LIGHT_CONFIGS[lightingPreset], [lightingPreset]);

  // Update scene background and fog
  useEffect(() => {
    scene.background = new THREE.Color(cfg.bgColor);
    if (scene.fog instanceof THREE.Fog) {
      scene.fog.color.set(cfg.bgColor);
    } else {
      scene.fog = new THREE.Fog(cfg.bgColor, 8, 20);
    }
  }, [cfg.bgColor, scene]);

  return (
    <>
      <ambientLight intensity={cfg.ambient} />

      {/* Key light */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={cfg.keyIntensity}
        color={cfg.keyColor}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={20}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
      />

      {/* Fill light */}
      <directionalLight
        position={[-3, 4, -3]}
        intensity={cfg.fillIntensity}
      />

      {/* Rim light */}
      <pointLight
        position={[0, 5, -5]}
        intensity={0.3}
        color={cfg.rimColor}
      />

      <ContactShadows
        position={[0, -0.6, 0]}
        opacity={cfg.shadowOpacity}
        scale={8}
        blur={2.5}
        far={4}
      />

      <Grid
        position={[0, -0.6, 0]}
        args={[20, 20]}
        cellSize={0.5}
        cellThickness={0.5}
        cellColor={cfg.gridCell}
        sectionSize={2}
        sectionThickness={1}
        sectionColor={cfg.gridSection}
        fadeDistance={15}
        fadeStrength={1}
        infiniteGrid
      />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  BoxCanvas                                                          */
/* ------------------------------------------------------------------ */
export default function BoxCanvas() {
  const lightingPreset = useBoxStore((s) => s.lightingPreset);

  const bgClass =
    lightingPreset === 'day'
      ? 'bg-gradient-to-b from-[#dddde8] to-[#c8c8d8]'
      : lightingPreset === 'warm'
        ? 'bg-gradient-to-b from-[#1f1810] to-[#151008]'
        : 'bg-gradient-to-b from-[#1a1a2e] to-[#16162a]';

  return (
    <div
      className={`w-full h-full min-h-[400px] rounded-xl overflow-hidden ${bgClass} transition-colors duration-500`}
    >
      <Canvas
        shadows
        gl={{
          preserveDrawingBuffer: true,
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
        camera={{
          position: [2.5, 1.8, 2.5],
          fov: 45,
          near: 0.1,
          far: 100,
        }}
        id="box-canvas"
      >
        <Scene />
        <BoxModel />
        <CameraController />

        <OrbitControls
          makeDefault
          enablePan
          enableZoom
          enableRotate
          minDistance={1.5}
          maxDistance={8}
          minPolarAngle={Math.PI * 0.1}
          maxPolarAngle={Math.PI * 0.85}
          dampingFactor={0.05}
          enableDamping
        />
      </Canvas>
    </div>
  );
}
