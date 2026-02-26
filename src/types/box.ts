export type BoxType =
  | 'mailer'
  | 'shipping'
  | 'product'
  | 'tuckEnd'
  | 'rigid'
  | 'sleeve'
  | 'drawer'
  | 'display'
  | 'gable'
  | 'hexagonal'
  | 'pillow'
  | 'pizza';

export type MaterialType = 'kraft' | 'white' | 'black';

export type FinishType = 'ink' | 'gold' | 'silver' | 'uv';

export type LightingPreset = 'dark' | 'day' | 'warm';

export type BoxCategory = 'standard' | 'premium' | 'specialty' | 'food';

export interface BoxTypeInfo {
  label: string;
  category: BoxCategory;
  description: string;
}

/* ------------------------------------------------------------------ */
/*  BOX TYPE CATALOG                                                   */
/* ------------------------------------------------------------------ */
export const BOX_TYPE_CATALOG: Record<BoxType, BoxTypeInfo> = {
  mailer: {
    label: 'Mailer Box',
    category: 'standard',
    description: 'Tuck-top lid with front flap',
  },
  shipping: {
    label: 'Shipping Box',
    category: 'standard',
    description: 'RSC with 4 open flaps',
  },
  tuckEnd: {
    label: 'Tuck End Box',
    category: 'standard',
    description: 'Tuck flaps on both ends',
  },
  product: {
    label: 'Product Box',
    category: 'premium',
    description: 'Two-piece telescoping lid',
  },
  rigid: {
    label: 'Rigid Box',
    category: 'premium',
    description: 'Thick-wall luxury finish',
  },
  sleeve: {
    label: 'Sleeve Box',
    category: 'premium',
    description: 'Open-end wrap sleeve',
  },
  drawer: {
    label: 'Drawer Box',
    category: 'premium',
    description: 'Sliding inner tray',
  },
  display: {
    label: 'Display Box',
    category: 'specialty',
    description: 'Low-front counter display',
  },
  gable: {
    label: 'Gable Box',
    category: 'specialty',
    description: 'Peaked carry-handle top',
  },
  hexagonal: {
    label: 'Hexagonal Box',
    category: 'specialty',
    description: 'Six-sided prism shape',
  },
  pillow: {
    label: 'Pillow Box',
    category: 'specialty',
    description: 'Curved pillow pouch',
  },
  pizza: {
    label: 'Pizza Box',
    category: 'food',
    description: 'Flat hinged-lid box',
  },
};

export const CATEGORY_LABELS: Record<BoxCategory, string> = {
  standard: 'Standard',
  premium: 'Premium',
  specialty: 'Specialty',
  food: 'Food & Beverage',
};

// Keep backward-compat alias
export const BOX_TYPE_LABELS: Record<BoxType, string> = Object.fromEntries(
  Object.entries(BOX_TYPE_CATALOG).map(([k, v]) => [k, v.label])
) as Record<BoxType, string>;

/* ------------------------------------------------------------------ */
/*  STATE                                                              */
/* ------------------------------------------------------------------ */
export interface BoxState {
  length: number;
  width: number;
  height: number;
  boxType: BoxType;
  material: MaterialType;
  color: string;
  finishType: FinishType;
  texture: string | null;
  fitToFace: boolean;
  cloneToAllSides: boolean;
  cloneWithFinish: boolean;
  isUnfolded: boolean;
  isLidOpen: boolean;
  autoSpin: boolean;
  ghostMode: boolean;
  lightingPreset: LightingPreset;
  cameraView: 'default' | 'front' | 'perspective';

  setLength: (l: number) => void;
  setWidth: (w: number) => void;
  setHeight: (h: number) => void;
  setBoxType: (type: BoxType) => void;
  setMaterial: (material: MaterialType) => void;
  setColor: (color: string) => void;
  setFinishType: (f: FinishType) => void;
  setTexture: (texture: string | null) => void;
  setFitToFace: (fit: boolean) => void;
  setCloneToAllSides: (v: boolean) => void;
  setCloneWithFinish: (v: boolean) => void;
  setIsUnfolded: (v: boolean) => void;
  setIsLidOpen: (v: boolean) => void;
  setAutoSpin: (v: boolean) => void;
  setGhostMode: (v: boolean) => void;
  setLightingPreset: (p: LightingPreset) => void;
  setCameraView: (view: 'default' | 'front' | 'perspective') => void;
}

/* ------------------------------------------------------------------ */
/*  CONSTANTS                                                          */
/* ------------------------------------------------------------------ */
export const MATERIAL_COLORS: Record<MaterialType, string> = {
  kraft: '#c4a265',
  white: '#f0f0f0',
  black: '#1a1a1a',
};

export const MATERIAL_LABELS: Record<MaterialType, string> = {
  kraft: 'Kraft (Brown)',
  white: 'White Cardboard',
  black: 'Black Premium',
};

export const FINISH_LABELS: Record<FinishType, string> = {
  ink: 'Ink',
  gold: 'Gold',
  silver: 'Silver',
  uv: 'UV',
};

export const FINISH_COLORS: Record<FinishType, string> = {
  ink: '#3a3a3a',
  gold: '#FFD700',
  silver: '#C0C0C0',
  uv: '#88ccff',
};

export const LIGHTING_LABELS: Record<LightingPreset, string> = {
  dark: 'Dark',
  day: 'Day',
  warm: 'Warm',
};
