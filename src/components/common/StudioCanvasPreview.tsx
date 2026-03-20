"use client";

import { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Grid, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { BoxModel } from "@/three/BoxModel";
import { useBoxStore } from "@/store/useBoxStore";
import PresentationBar from "../PresentationBar";

function TransparentPreviewCanvas() {
  return (
    <div className="w-full h-full min-h-[400px] rounded-xl overflow-hidden">
      <Canvas
        shadows
        gl={{
          alpha: true,
          preserveDrawingBuffer: true,
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
        onCreated={({ gl, scene }) => {
          gl.setClearColor(0x000000, 0);
          scene.background = null;
          scene.fog = null;
        }}
        camera={{
          position: [2.5, 1.8, 2.5],
          fov: 45,
          near: 0.1,
          far: 100,
        }}
      >
        <ambientLight intensity={0.35} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.2}
          color="#eef2ff"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <directionalLight position={[-3, 4, -3]} intensity={0.35} />
        <pointLight position={[0, 5, -5]} intensity={0.25} color="#b8c4ff" />

        <ContactShadows position={[0, -0.6, 0]} opacity={0.28} scale={8} blur={2.5} far={4} />

        <Grid
          position={[0, -0.6, 0]}
          args={[20, 20]}
          cellSize={0.5}
          cellThickness={0.5}
          cellColor="#4a4a6a"
          sectionSize={2}
          sectionThickness={1}
          sectionColor="#5a5a7a"
          fadeDistance={15}
          fadeStrength={1}
          infiniteGrid
        />

        <BoxModel />

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

export default function StudioCanvasPreview() {
  useEffect(() => {
    const state = useBoxStore.getState();

    const previous = {
      length: state.length,
      width: state.width,
      height: state.height,
      boxType: state.boxType,
      isUnfolded: state.isUnfolded,
      isLidOpen: state.isLidOpen,
      autoSpin: state.autoSpin,
      ghostMode: state.ghostMode,
    };

    // Showcase-friendly defaults so the box occupies the viewport better.
    state.setLength(34);
    state.setWidth(24);
    state.setHeight(16);
    state.setBoxType("mailer");
    state.setIsUnfolded(false);
    state.setIsLidOpen(false);
    state.setAutoSpin(true);
    state.setGhostMode(false);

    return () => {
      const current = useBoxStore.getState();
      current.setLength(previous.length);
      current.setWidth(previous.width);
      current.setHeight(previous.height);
      current.setBoxType(previous.boxType);
      current.setIsUnfolded(previous.isUnfolded);
      current.setIsLidOpen(previous.isLidOpen);
      current.setAutoSpin(previous.autoSpin);
      current.setGhostMode(previous.ghostMode);
    };
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <div className="aspect-[16/9] relative">
        <TransparentPreviewCanvas />
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[10px] text-gray-500 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full pointer-events-none">
          <svg
            className="w-3 h-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
            />
          </svg>
          Drag to rotate &middot; Scroll to zoom &middot; Right-click to pan
        </div>
      </div>
      <PresentationBar/>
    </div>
  );
}
