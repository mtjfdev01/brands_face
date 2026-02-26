import { create } from 'zustand';
import { BoxState, MATERIAL_COLORS } from '@/types/box';

export const useBoxStore = create<BoxState>((set) => ({
  // Default dimensions (cm)
  length: 20,
  width: 15,
  height: 10,

  // Default configuration
  boxType: 'mailer',
  material: 'kraft',
  color: MATERIAL_COLORS.kraft,
  finishType: 'ink',

  // Texture
  texture: null,
  fitToFace: true,
  cloneToAllSides: false,
  cloneWithFinish: false,

  // Presentation
  isUnfolded: false,
  isLidOpen: false,
  autoSpin: false,
  ghostMode: false,
  lightingPreset: 'dark',

  // Camera
  cameraView: 'default',

  // Actions
  setLength: (l) => set({ length: l }),
  setWidth: (w) => set({ width: w }),
  setHeight: (h) => set({ height: h }),
  setBoxType: (boxType) => set({ boxType }),
  setMaterial: (material) =>
    set({ material, color: MATERIAL_COLORS[material] }),
  setColor: (color) => set({ color }),
  setFinishType: (finishType) => set({ finishType }),
  setTexture: (texture) => set({ texture }),
  setFitToFace: (fitToFace) => set({ fitToFace }),
  setCloneToAllSides: (cloneToAllSides) => set({ cloneToAllSides }),
  setCloneWithFinish: (cloneWithFinish) =>
    set((state) => ({
      cloneWithFinish,
      // Enabling "with finish" also enables clone to all sides
      cloneToAllSides: cloneWithFinish ? true : state.cloneToAllSides,
    })),
  setIsUnfolded: (isUnfolded) => set({ isUnfolded }),
  setIsLidOpen: (isLidOpen) => set({ isLidOpen }),
  setAutoSpin: (autoSpin) => set({ autoSpin }),
  setGhostMode: (ghostMode) => set({ ghostMode }),
  setLightingPreset: (lightingPreset) => set({ lightingPreset }),
  setCameraView: (cameraView) => set({ cameraView }),
}));
