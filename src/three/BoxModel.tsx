'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Edges } from '@react-three/drei';
import * as THREE from 'three';
import { useBoxStore } from '@/store/useBoxStore';
import type { FinishType } from '@/types/box';

const SCALE = 0.04;

/* ================================================================== */
/*  SHARED HOOKS & HELPERS                                             */
/* ================================================================== */

function useTextureFromDataUrl(dataUrl: string | null) {
  return useMemo(() => {
    if (!dataUrl) return null;
    const tex = new THREE.TextureLoader().load(dataUrl);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.wrapS = THREE.ClampToEdgeWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    return tex;
  }, [dataUrl]);
}

interface FinishProps {
  color: THREE.Color;
  roughness: number;
  metalness: number;
  clearcoat?: number;
  clearcoatRoughness?: number;
}

function getFinishProps(baseColor: string, finish: FinishType): FinishProps {
  const base = new THREE.Color(baseColor);
  switch (finish) {
    case 'gold':
      return { color: base.clone().lerp(new THREE.Color('#FFD700'), 0.55), roughness: 0.28, metalness: 0.92 };
    case 'silver':
      return { color: base.clone().lerp(new THREE.Color('#C0C0C0'), 0.5), roughness: 0.22, metalness: 0.95 };
    case 'uv':
      return { color: base, roughness: 0.05, metalness: 0.25, clearcoat: 1.0, clearcoatRoughness: 0.04 };
    default:
      return { color: base, roughness: 0.7, metalness: 0.05 };
  }
}

function useBoxMaterials() {
  const color = useBoxStore((s) => s.color);
  const finishType = useBoxStore((s) => s.finishType);
  const texture = useBoxStore((s) => s.texture);
  const cloneToAllSides = useBoxStore((s) => s.cloneToAllSides);
  const cloneWithFinish = useBoxStore((s) => s.cloneWithFinish);
  const ghostMode = useBoxStore((s) => s.ghostMode);
  const textureMap = useTextureFromDataUrl(texture);

  return useMemo(() => {
    if (ghostMode) {
      const g = new THREE.MeshPhysicalMaterial({
        color: '#4488ff', emissive: '#223366', emissiveIntensity: 0.4,
        transparent: true, opacity: 0.1, roughness: 0.1, metalness: 0.6, side: THREE.DoubleSide,
      });
      return Array(6).fill(g) as THREE.MeshPhysicalMaterial[];
    }
    const fp = getFinishProps(color, finishType);
    const baseMat = new THREE.MeshPhysicalMaterial({
      color: fp.color, roughness: fp.roughness, metalness: fp.metalness,
      clearcoat: fp.clearcoat ?? 0, clearcoatRoughness: fp.clearcoatRoughness ?? 0, side: THREE.DoubleSide,
    });
    if (!textureMap) return Array(6).fill(baseMat) as THREE.MeshPhysicalMaterial[];

    const tFp = cloneWithFinish ? fp : getFinishProps(color, 'ink');
    const texMat = new THREE.MeshPhysicalMaterial({
      map: textureMap, color: cloneWithFinish ? fp.color : new THREE.Color('#ffffff'),
      roughness: tFp.roughness, metalness: tFp.metalness,
      clearcoat: tFp.clearcoat ?? 0, clearcoatRoughness: tFp.clearcoatRoughness ?? 0, side: THREE.DoubleSide,
    });
    if (cloneToAllSides || cloneWithFinish) return Array(6).fill(texMat) as THREE.MeshPhysicalMaterial[];
    return [baseMat, baseMat, baseMat, baseMat, texMat, baseMat];
  }, [color, finishType, textureMap, cloneToAllSides, cloneWithFinish, ghostMode]);
}

function getEdgeColor(color: string, finish: FinishType): string {
  if (finish === 'gold') return '#b89840';
  if (finish === 'silver') return '#a0a0a8';
  if (finish === 'uv') return color === '#1a1a1a' ? '#555' : '#ddd';
  return color === '#1a1a1a' ? '#333' : '#a08050';
}

function GhostWireframe({ l, w, h }: { l: number; w: number; h: number }) {
  return (
    <mesh>
      <boxGeometry args={[l, h, w]} />
      <meshBasicMaterial color="#4488ff" wireframe transparent opacity={0.2} />
    </mesh>
  );
}

/* Reusable transparent material for open faces */
const INVIS_MAT = new THREE.MeshBasicMaterial({ visible: false });

interface BoxTypeProps {
  l: number; w: number; h: number;
  materials: THREE.MeshPhysicalMaterial[];
  edgeColor: string;
  ghostMode: boolean;
}

/** Shared box body + edges */
function BoxBody({ l, w, h, materials, edgeColor, ghostMode }: BoxTypeProps) {
  return (
    <>
      <mesh material={materials} castShadow receiveShadow>
        <boxGeometry args={[l, h, w]} />
      </mesh>
      {!ghostMode && (
        <mesh><boxGeometry args={[l, h, w]} /><Edges threshold={15} color={edgeColor} /></mesh>
      )}
      {ghostMode && <GhostWireframe l={l} w={w} h={h} />}
    </>
  );
}

/* ================================================================== */
/*  1. MAILER BOX                                                      */
/* ================================================================== */
function MailerBox(p: BoxTypeProps) {
  const lidRef = useRef<THREE.Group>(null);
  const tuckRef = useRef<THREE.Mesh>(null);
  const isLidOpen = useBoxStore((s) => s.isLidOpen);
  const a = useRef(0);

  useFrame((st, dt) => {
    if (!lidRef.current) return;
    a.current += ((isLidOpen ? 1 : 0) - a.current) * Math.min(1, dt * 4);
    const idle = -Math.PI * 0.12 + Math.sin(st.clock.elapsedTime * 0.5) * 0.02;
    lidRef.current.rotation.x = THREE.MathUtils.lerp(idle, -Math.PI * 0.78, a.current);
    if (tuckRef.current) tuckRef.current.rotation.x = THREE.MathUtils.lerp(Math.PI * 0.4, Math.PI * 0.08, a.current);
  });

  return (
    <group>
      <BoxBody {...p} />
      <group ref={lidRef} position={[0, p.h / 2, -p.w / 2]}>
        <mesh position={[0, 0, p.w / 2]} castShadow material={p.materials[2]}>
          <boxGeometry args={[p.l, 0.008, p.w]} />
        </mesh>
        <mesh ref={tuckRef} position={[0, 0, p.w + 0.008]} rotation={[Math.PI * 0.4, 0, 0]} castShadow material={p.materials[2]}>
          <boxGeometry args={[p.l, 0.008, p.h * 0.38]} />
        </mesh>
      </group>
    </group>
  );
}

/* ================================================================== */
/*  2. SHIPPING BOX                                                    */
/* ================================================================== */
function ShippingBox(p: BoxTypeProps) {
  const isLidOpen = useBoxStore((s) => s.isLidOpen);
  const a = useRef(0);
  const refs = [useRef<THREE.Mesh>(null), useRef<THREE.Mesh>(null), useRef<THREE.Mesh>(null), useRef<THREE.Mesh>(null)];

  useFrame((_, dt) => {
    a.current += ((isLidOpen ? 1 : 0) - a.current) * Math.min(1, dt * 4);
    const ang = THREE.MathUtils.lerp(-Math.PI * 0.25, -Math.PI * 0.02, a.current);
    if (refs[0].current) refs[0].current.rotation.x = ang;
    if (refs[1].current) refs[1].current.rotation.x = -ang;
    if (refs[2].current) refs[2].current.rotation.z = -ang;
    if (refs[3].current) refs[3].current.rotation.z = ang;
  });

  const fm = p.materials[0];
  return (
    <group>
      <BoxBody {...p} />
      <group position={[0, p.h / 2, p.w / 2]}>
        <mesh ref={refs[0]} position={[0, 0, -p.w * 0.2]} rotation={[-Math.PI * 0.25, 0, 0]} material={fm} castShadow>
          <boxGeometry args={[p.l, 0.006, p.w * 0.4]} /></mesh>
      </group>
      <group position={[0, p.h / 2, -p.w / 2]}>
        <mesh ref={refs[1]} position={[0, 0, p.w * 0.2]} rotation={[Math.PI * 0.25, 0, 0]} material={fm} castShadow>
          <boxGeometry args={[p.l, 0.006, p.w * 0.4]} /></mesh>
      </group>
      <group position={[-p.l / 2, p.h / 2, 0]}>
        <mesh ref={refs[2]} position={[p.l * 0.15, 0, 0]} rotation={[0, 0, Math.PI * 0.25]} material={fm} castShadow>
          <boxGeometry args={[p.l * 0.3, 0.006, p.w]} /></mesh>
      </group>
      <group position={[p.l / 2, p.h / 2, 0]}>
        <mesh ref={refs[3]} position={[-p.l * 0.15, 0, 0]} rotation={[0, 0, -Math.PI * 0.25]} material={fm} castShadow>
          <boxGeometry args={[p.l * 0.3, 0.006, p.w]} /></mesh>
      </group>
      {!p.ghostMode && (
        <mesh position={[0, p.h / 2 + 0.004, 0]}>
          <boxGeometry args={[p.l * 0.12, 0.003, p.w * 1.1]} />
          <meshStandardMaterial color="#d4a84b" roughness={0.4} transparent opacity={0.55} />
        </mesh>
      )}
    </group>
  );
}

/* ================================================================== */
/*  3. PRODUCT BOX (two-piece)                                         */
/* ================================================================== */
function ProductBox(p: BoxTypeProps) {
  const isLidOpen = useBoxStore((s) => s.isLidOpen);
  const lidRef = useRef<THREE.Group>(null);
  const a = useRef(0);
  const baseH = p.h * 0.7, lidH = p.h * 0.3;
  const baseY = -p.h / 2 + baseH / 2, lidY = -p.h / 2 + baseH + lidH / 2;

  useFrame((_, dt) => {
    a.current += ((isLidOpen ? 1 : 0) - a.current) * Math.min(1, dt * 4);
    if (lidRef.current) {
      lidRef.current.position.y = a.current * p.h * 0.45;
      lidRef.current.rotation.z = a.current * -0.12;
      lidRef.current.position.x = a.current * p.l * 0.05;
    }
  });

  return (
    <group>
      <mesh position={[0, baseY, 0]} material={p.materials} castShadow receiveShadow>
        <boxGeometry args={[p.l, baseH, p.w]} /></mesh>
      {!p.ghostMode && <mesh position={[0, baseY, 0]}><boxGeometry args={[p.l, baseH, p.w]} /><Edges threshold={15} color={p.edgeColor} /></mesh>}
      <group ref={lidRef}>
        <mesh position={[0, lidY, 0]} material={p.materials} castShadow receiveShadow>
          <boxGeometry args={[p.l + 0.012, lidH, p.w + 0.012]} /></mesh>
        {!p.ghostMode && <>
          <mesh position={[0, lidY, 0]}><boxGeometry args={[p.l + 0.012, lidH, p.w + 0.012]} /><Edges threshold={15} color={p.edgeColor} /></mesh>
          <mesh position={[0, lidY - lidH / 2, 0]}><boxGeometry args={[p.l + 0.018, 0.003, p.w + 0.018]} /><meshStandardMaterial color={p.edgeColor} roughness={0.5} /></mesh>
        </>}
      </group>
      {p.ghostMode && <GhostWireframe l={p.l} w={p.w} h={p.h} />}
    </group>
  );
}

/* ================================================================== */
/*  4. TUCK END BOX                                                    */
/* ================================================================== */
function TuckEndBox(p: BoxTypeProps) {
  const isLidOpen = useBoxStore((s) => s.isLidOpen);
  const topRef = useRef<THREE.Group>(null);
  const botRef = useRef<THREE.Group>(null);
  const a = useRef(0);

  useFrame((st, dt) => {
    a.current += ((isLidOpen ? 1 : 0) - a.current) * Math.min(1, dt * 4);
    const idle = -Math.PI * 0.1 + Math.sin(st.clock.elapsedTime * 0.5) * 0.015;
    if (topRef.current) topRef.current.rotation.x = THREE.MathUtils.lerp(idle, -Math.PI * 0.7, a.current);
    if (botRef.current) botRef.current.rotation.x = THREE.MathUtils.lerp(-idle * 0.5, Math.PI * 0.5, a.current);
  });

  return (
    <group>
      <BoxBody {...p} />
      {/* Top tuck */}
      <group ref={topRef} position={[0, p.h / 2, -p.w / 2]}>
        <mesh position={[0, 0, p.w / 2]} castShadow material={p.materials[2]}>
          <boxGeometry args={[p.l, 0.007, p.w]} /></mesh>
        <mesh position={[0, 0, p.w + 0.006]} rotation={[Math.PI * 0.35, 0, 0]} castShadow material={p.materials[2]}>
          <boxGeometry args={[p.l, 0.007, p.h * 0.3]} /></mesh>
      </group>
      {/* Bottom tuck */}
      <group ref={botRef} position={[0, -p.h / 2, p.w / 2]}>
        <mesh position={[0, 0, -p.w / 2]} castShadow material={p.materials[3]}>
          <boxGeometry args={[p.l, 0.007, p.w]} /></mesh>
      </group>
    </group>
  );
}

/* ================================================================== */
/*  5. RIGID BOX (thick-wall premium two-piece)                        */
/* ================================================================== */
function RigidBox(p: BoxTypeProps) {
  const isLidOpen = useBoxStore((s) => s.isLidOpen);
  const lidRef = useRef<THREE.Group>(null);
  const a = useRef(0);
  const wall = 0.018;
  const baseH = p.h * 0.65, lidH = p.h * 0.38;
  const baseY = -p.h / 2 + baseH / 2, lidY = -p.h / 2 + baseH + lidH / 2;

  useFrame((_, dt) => {
    a.current += ((isLidOpen ? 1 : 0) - a.current) * Math.min(1, dt * 3.5);
    if (lidRef.current) {
      lidRef.current.position.y = a.current * p.h * 0.5;
      lidRef.current.rotation.z = a.current * -0.08;
    }
  });

  return (
    <group>
      <mesh position={[0, baseY, 0]} material={p.materials} castShadow receiveShadow>
        <boxGeometry args={[p.l, baseH, p.w]} /></mesh>
      {!p.ghostMode && <mesh position={[0, baseY, 0]}><boxGeometry args={[p.l, baseH, p.w]} /><Edges threshold={15} color={p.edgeColor} /></mesh>}
      <group ref={lidRef}>
        <mesh position={[0, lidY, 0]} material={p.materials} castShadow receiveShadow>
          <boxGeometry args={[p.l + wall, lidH, p.w + wall]} /></mesh>
        {!p.ghostMode && <mesh position={[0, lidY, 0]}><boxGeometry args={[p.l + wall, lidH, p.w + wall]} /><Edges threshold={15} color={p.edgeColor} /></mesh>}
        {/* Thick rim at base of lid */}
        {!p.ghostMode && <mesh position={[0, lidY - lidH / 2, 0]}>
          <boxGeometry args={[p.l + wall * 1.5, 0.006, p.w + wall * 1.5]} />
          <meshStandardMaterial color={p.edgeColor} roughness={0.4} metalness={0.15} />
        </mesh>}
      </group>
      {p.ghostMode && <GhostWireframe l={p.l} w={p.w} h={p.h} />}
    </group>
  );
}

/* ================================================================== */
/*  6. SLEEVE BOX (open top & bottom)                                  */
/* ================================================================== */
function SleeveBox(p: BoxTypeProps) {
  const sleeveMats = useMemo(
    () => [p.materials[0], p.materials[1], INVIS_MAT, INVIS_MAT, p.materials[4], p.materials[5]],
    [p.materials]
  );

  return (
    <group>
      <mesh material={sleeveMats as THREE.Material[]} castShadow receiveShadow>
        <boxGeometry args={[p.l, p.h, p.w]} />
      </mesh>
      {!p.ghostMode && (
        <mesh><boxGeometry args={[p.l, p.h, p.w]} /><Edges threshold={15} color={p.edgeColor} /></mesh>
      )}
      {p.ghostMode && <GhostWireframe l={p.l} w={p.w} h={p.h} />}
    </group>
  );
}

/* ================================================================== */
/*  7. DRAWER BOX (sleeve + sliding tray)                              */
/* ================================================================== */
function DrawerBox(p: BoxTypeProps) {
  const isLidOpen = useBoxStore((s) => s.isLidOpen);
  const trayRef = useRef<THREE.Group>(null);
  const a = useRef(0);

  useFrame((_, dt) => {
    a.current += ((isLidOpen ? 1 : 0) - a.current) * Math.min(1, dt * 4);
    if (trayRef.current) trayRef.current.position.z = a.current * p.w * 0.55;
  });

  const sleeveMats = useMemo(
    () => [p.materials[0], p.materials[1], p.materials[2], p.materials[3], INVIS_MAT, p.materials[5]],
    [p.materials]
  );

  return (
    <group>
      {/* Outer sleeve (open front) */}
      <mesh material={sleeveMats as THREE.Material[]} castShadow receiveShadow>
        <boxGeometry args={[p.l, p.h, p.w]} />
      </mesh>
      {!p.ghostMode && (
        <mesh><boxGeometry args={[p.l, p.h, p.w]} /><Edges threshold={15} color={p.edgeColor} /></mesh>
      )}
      {/* Inner tray */}
      <group ref={trayRef}>
        <mesh material={p.materials} castShadow receiveShadow>
          <boxGeometry args={[p.l * 0.92, p.h * 0.88, p.w * 0.92]} />
        </mesh>
        {!p.ghostMode && (
          <mesh><boxGeometry args={[p.l * 0.92, p.h * 0.88, p.w * 0.92]} /><Edges threshold={15} color={p.edgeColor} /></mesh>
        )}
        {/* Pull tab */}
        <mesh position={[0, 0, p.w * 0.46 + 0.003]} material={p.materials[4]}>
          <boxGeometry args={[p.l * 0.25, p.h * 0.15, 0.005]} />
        </mesh>
      </group>
      {p.ghostMode && <GhostWireframe l={p.l} w={p.w} h={p.h} />}
    </group>
  );
}

/* ================================================================== */
/*  8. DISPLAY BOX (low-front open display)                            */
/* ================================================================== */
function DisplayBox(p: BoxTypeProps) {
  const backH = p.h;
  const frontH = p.h * 0.45;

  return (
    <group>
      {/* Back section (full height) */}
      <mesh position={[0, 0, -p.w * 0.2]} material={p.materials} castShadow receiveShadow>
        <boxGeometry args={[p.l, backH, p.w * 0.6]} />
      </mesh>
      {/* Front section (short) */}
      <mesh position={[0, -(backH - frontH) / 2, p.w * 0.3]} material={p.materials} castShadow receiveShadow>
        <boxGeometry args={[p.l, frontH, p.w * 0.4]} />
      </mesh>
      {/* Bottom shelf */}
      <mesh position={[0, -backH / 2 + 0.003, 0]} material={p.materials[3]} receiveShadow>
        <boxGeometry args={[p.l, 0.006, p.w]} />
      </mesh>
      {!p.ghostMode && <>
        <mesh position={[0, 0, -p.w * 0.2]}><boxGeometry args={[p.l, backH, p.w * 0.6]} /><Edges threshold={15} color={p.edgeColor} /></mesh>
        <mesh position={[0, -(backH - frontH) / 2, p.w * 0.3]}><boxGeometry args={[p.l, frontH, p.w * 0.4]} /><Edges threshold={15} color={p.edgeColor} /></mesh>
      </>}
      {p.ghostMode && <GhostWireframe l={p.l} w={p.w} h={p.h} />}
    </group>
  );
}

/* ================================================================== */
/*  9. GABLE BOX (peaked carry-top)                                    */
/* ================================================================== */
function GableBox(p: BoxTypeProps) {
  const isLidOpen = useBoxStore((s) => s.isLidOpen);
  const roofRef = useRef<THREE.Group>(null);
  const a = useRef(0);
  const bodyH = p.h * 0.7;
  const peakH = p.h * 0.3;

  useFrame((_, dt) => {
    a.current += ((isLidOpen ? 1 : 0) - a.current) * Math.min(1, dt * 4);
    if (roofRef.current) {
      roofRef.current.position.y = a.current * peakH * 0.3;
    }
  });

  const gableGeo = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-p.l / 2, 0);
    shape.lineTo(0, peakH);
    shape.lineTo(p.l / 2, 0);
    shape.closePath();
    const geo = new THREE.ExtrudeGeometry(shape, { depth: p.w, bevelEnabled: false });
    geo.translate(0, 0, -p.w / 2);
    return geo;
  }, [p.l, p.w, peakH]);

  return (
    <group>
      {/* Body */}
      <mesh position={[0, -peakH / 2, 0]} material={p.materials} castShadow receiveShadow>
        <boxGeometry args={[p.l, bodyH, p.w]} /></mesh>
      {!p.ghostMode && <mesh position={[0, -peakH / 2, 0]}><boxGeometry args={[p.l, bodyH, p.w]} /><Edges threshold={15} color={p.edgeColor} /></mesh>}
      {/* Gable peak */}
      <group ref={roofRef} position={[0, bodyH / 2 - peakH / 2, 0]}>
        <mesh geometry={gableGeo} material={p.materials[0]} castShadow />
        {!p.ghostMode && <mesh geometry={gableGeo}><Edges threshold={10} color={p.edgeColor} /></mesh>}
      </group>
      {/* Handle slit */}
      <mesh position={[0, bodyH / 2 - peakH / 2 + peakH * 0.65, 0]}>
        <boxGeometry args={[p.l * 0.2, 0.005, p.w + 0.01]} />
        <meshStandardMaterial color={p.edgeColor} roughness={0.5} />
      </mesh>
      {p.ghostMode && <GhostWireframe l={p.l} w={p.w} h={p.h} />}
    </group>
  );
}

/* ================================================================== */
/*  10. HEXAGONAL BOX                                                  */
/* ================================================================== */
function HexagonalBox(p: BoxTypeProps) {
  const isLidOpen = useBoxStore((s) => s.isLidOpen);
  const lidRef = useRef<THREE.Group>(null);
  const a = useRef(0);
  const radius = Math.min(p.l, p.w) / 2;
  const lidH = p.h * 0.2;
  const bodyH = p.h * 0.8;

  useFrame((_, dt) => {
    a.current += ((isLidOpen ? 1 : 0) - a.current) * Math.min(1, dt * 4);
    if (lidRef.current) lidRef.current.position.y = a.current * p.h * 0.4;
  });

  return (
    <group>
      {/* Body */}
      <mesh position={[0, -lidH / 2, 0]} material={p.materials[0]} castShadow receiveShadow>
        <cylinderGeometry args={[radius, radius, bodyH, 6]} />
      </mesh>
      {!p.ghostMode && <mesh position={[0, -lidH / 2, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[radius, radius, bodyH, 6]} /><Edges threshold={15} color={p.edgeColor} />
      </mesh>}
      {/* Lid */}
      <group ref={lidRef}>
        <mesh position={[0, bodyH / 2 - lidH / 2, 0]} material={p.materials[2]} castShadow receiveShadow>
          <cylinderGeometry args={[radius + 0.008, radius + 0.008, lidH, 6]} />
        </mesh>
        {!p.ghostMode && <mesh position={[0, bodyH / 2 - lidH / 2, 0]}>
          <cylinderGeometry args={[radius + 0.008, radius + 0.008, lidH, 6]} /><Edges threshold={15} color={p.edgeColor} />
        </mesh>}
      </group>
      {p.ghostMode && <mesh>
        <cylinderGeometry args={[radius, radius, p.h, 6]} />
        <meshBasicMaterial color="#4488ff" wireframe transparent opacity={0.2} />
      </mesh>}
    </group>
  );
}

/* ================================================================== */
/*  11. PILLOW BOX (curved shape)                                      */
/* ================================================================== */
function PillowBox(p: BoxTypeProps) {
  const geo = useMemo(() => {
    const r = Math.min(p.l, p.h) * 0.15;
    const shape = new THREE.Shape();
    shape.moveTo(-p.l / 2 + r, -p.h / 2);
    shape.lineTo(p.l / 2 - r, -p.h / 2);
    shape.quadraticCurveTo(p.l / 2, -p.h / 2, p.l / 2, -p.h / 2 + r);
    shape.lineTo(p.l / 2, p.h / 2 - r);
    shape.quadraticCurveTo(p.l / 2, p.h / 2, p.l / 2 - r, p.h / 2);
    shape.lineTo(-p.l / 2 + r, p.h / 2);
    shape.quadraticCurveTo(-p.l / 2, p.h / 2, -p.l / 2, p.h / 2 - r);
    shape.lineTo(-p.l / 2, -p.h / 2 + r);
    shape.quadraticCurveTo(-p.l / 2, -p.h / 2, -p.l / 2 + r, -p.h / 2);
    const g = new THREE.ExtrudeGeometry(shape, {
      depth: p.w, bevelEnabled: true,
      bevelThickness: p.w * 0.18, bevelSize: p.w * 0.12, bevelSegments: 12,
    });
    g.center();
    return g;
  }, [p.l, p.w, p.h]);

  return (
    <group>
      <mesh geometry={geo} material={p.materials[4]} castShadow receiveShadow />
      {p.ghostMode && <mesh geometry={geo}>
        <meshBasicMaterial color="#4488ff" wireframe transparent opacity={0.2} />
      </mesh>}
      {!p.ghostMode && <mesh geometry={geo}><Edges threshold={20} color={p.edgeColor} /></mesh>}
    </group>
  );
}

/* ================================================================== */
/*  12. PIZZA BOX (flat, hinged lid)                                   */
/* ================================================================== */
function PizzaBox(p: BoxTypeProps) {
  const lidRef = useRef<THREE.Group>(null);
  const isLidOpen = useBoxStore((s) => s.isLidOpen);
  const a = useRef(0);
  // Pizza box is forced flat
  const flatH = Math.min(p.h, p.l * 0.15);

  useFrame((_, dt) => {
    a.current += ((isLidOpen ? 1 : 0) - a.current) * Math.min(1, dt * 4);
    if (lidRef.current) lidRef.current.rotation.x = THREE.MathUtils.lerp(-0.05, -Math.PI * 0.65, a.current);
  });

  return (
    <group>
      {/* Base */}
      <mesh position={[0, -flatH / 4, 0]} material={p.materials} castShadow receiveShadow>
        <boxGeometry args={[p.l, flatH / 2, p.w]} /></mesh>
      {!p.ghostMode && <mesh position={[0, -flatH / 4, 0]}><boxGeometry args={[p.l, flatH / 2, p.w]} /><Edges threshold={15} color={p.edgeColor} /></mesh>}
      {/* Hinged lid */}
      <group ref={lidRef} position={[0, 0, -p.w / 2]}>
        <mesh position={[0, 0, p.w / 2]} material={p.materials} castShadow>
          <boxGeometry args={[p.l, flatH / 2, p.w]} /></mesh>
        {!p.ghostMode && <mesh position={[0, 0, p.w / 2]}><boxGeometry args={[p.l, flatH / 2, p.w]} /><Edges threshold={15} color={p.edgeColor} /></mesh>}
      </group>
      {p.ghostMode && <GhostWireframe l={p.l} w={p.w} h={flatH} />}
    </group>
  );
}

/* ================================================================== */
/*  DIE-LINE                                                           */
/* ================================================================== */
function DieLine({ l, w, h, materials }: { l: number; w: number; h: number; materials: THREE.MeshPhysicalMaterial[] }) {
  const fg = useRef<(THREE.Group | null)[]>(new Array(6).fill(null));
  const spread = useRef(0);
  const targets = useMemo(() => [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 0, w / 2 + h / 2),
    new THREE.Vector3(0, 0, -(w / 2 + h / 2)),
    new THREE.Vector3(0, 0, -(w / 2 + h + w / 2)),
    new THREE.Vector3(-(l / 2 + w / 2), 0, 0),
    new THREE.Vector3(l / 2 + w / 2, 0, 0),
  ], [l, w, h]);

  useFrame((_, dt) => {
    spread.current += (1 - spread.current) * Math.min(1, dt * 3.5);
    if (spread.current > 0.999) spread.current = 1;
    fg.current.forEach((g, i) => { if (g) g.position.set(targets[i].x * spread.current, 0, targets[i].z * spread.current); });
  });

  const rot: [number, number, number] = [-Math.PI / 2, 0, 0];
  return (
    <group position={[0, -h / 2 + 0.002, 0]}>
      <group ref={el => fg.current[0] = el}><mesh rotation={rot} material={materials[3]} receiveShadow><planeGeometry args={[l, w]} /></mesh></group>
      <group ref={el => fg.current[1] = el}><mesh rotation={rot} material={materials[4]} receiveShadow><planeGeometry args={[l, h]} /></mesh></group>
      <group ref={el => fg.current[2] = el}><mesh rotation={rot} material={materials[5]} receiveShadow><planeGeometry args={[l, h]} /></mesh></group>
      <group ref={el => fg.current[3] = el}><mesh rotation={rot} material={materials[2]} receiveShadow><planeGeometry args={[l, w]} /></mesh></group>
      <group ref={el => fg.current[4] = el}><mesh rotation={rot} material={materials[1]} receiveShadow><planeGeometry args={[w, h]} /></mesh></group>
      <group ref={el => fg.current[5] = el}><mesh rotation={rot} material={materials[0]} receiveShadow><planeGeometry args={[w, h]} /></mesh></group>
      <DieLineFoldMarks l={l} w={w} h={h} />
    </group>
  );
}

function DieLineFoldMarks({ l, w, h }: { l: number; w: number; h: number }) {
  const c = '#ff8c00', lw = 0.004, y = 0.004;
  const rot: [number, number, number] = [-Math.PI / 2, 0, 0];
  const lines = [
    { pos: [0, y, w / 2] as [number, number, number], size: [l, lw] as [number, number] },
    { pos: [0, y, -w / 2] as [number, number, number], size: [l, lw] as [number, number] },
    { pos: [0, y, -(w / 2 + h)] as [number, number, number], size: [l, lw] as [number, number] },
    { pos: [-l / 2, y, 0] as [number, number, number], size: [lw, w] as [number, number] },
    { pos: [l / 2, y, 0] as [number, number, number], size: [lw, w] as [number, number] },
  ];
  return (<group>{lines.map((ln, i) => (
    <mesh key={i} position={ln.pos} rotation={rot}><planeGeometry args={ln.size} /><meshBasicMaterial color={c} side={THREE.DoubleSide} transparent opacity={0.65} /></mesh>
  ))}</group>);
}

/* ================================================================== */
/*  MAIN ENTRY                                                         */
/* ================================================================== */
const BOX_COMPONENTS: Record<string, React.FC<BoxTypeProps>> = {
  mailer: MailerBox,
  shipping: ShippingBox,
  product: ProductBox,
  tuckEnd: TuckEndBox,
  rigid: RigidBox,
  sleeve: SleeveBox,
  drawer: DrawerBox,
  display: DisplayBox,
  gable: GableBox,
  hexagonal: HexagonalBox,
  pillow: PillowBox,
  pizza: PizzaBox,
};

export function BoxModel() {
  const length = useBoxStore((s) => s.length);
  const width = useBoxStore((s) => s.width);
  const height = useBoxStore((s) => s.height);
  const boxType = useBoxStore((s) => s.boxType);
  const color = useBoxStore((s) => s.color);
  const finishType = useBoxStore((s) => s.finishType);
  const isUnfolded = useBoxStore((s) => s.isUnfolded);
  const autoSpin = useBoxStore((s) => s.autoSpin);
  const ghostMode = useBoxStore((s) => s.ghostMode);
  const groupRef = useRef<THREE.Group>(null);

  const l = length * SCALE, w = width * SCALE, h = height * SCALE;
  const materials = useBoxMaterials();
  const edgeColor = getEdgeColor(color, finishType);
  const props: BoxTypeProps = { l, w, h, materials, edgeColor, ghostMode };

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    if (autoSpin) groupRef.current.rotation.y += delta * 0.5;
    if (!isUnfolded) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.02;
    } else {
      groupRef.current.position.y += (0 - groupRef.current.position.y) * Math.min(1, delta * 5);
    }
  });

  const Component = BOX_COMPONENTS[boxType];

  return (
    <group ref={groupRef}>
      {!isUnfolded && Component && <Component {...props} />}
      {isUnfolded && <DieLine l={l} w={w} h={h} materials={materials} />}
    </group>
  );
}
