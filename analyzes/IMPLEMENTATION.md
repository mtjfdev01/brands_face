# Brands Cafe – 3D Box Configurator: Complete Implementation Reference

> **Purpose:** This file fully documents the architecture, every component, styling, state management, 3D logic, and feature set so that any AI or developer reading only this file can understand and modify the entire project.

---

## 1. TECH STACK

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 14.x |
| UI Library | React | 18.x |
| 3D Engine | Three.js + React Three Fiber + Drei | three 0.170, r3f 8.x, drei 9.x |
| State | Zustand | 5.x |
| Styling | Tailwind CSS | 3.4 |
| File Upload | react-dropzone | 14.x |
| Export | html2canvas + native canvas.toDataURL | 1.4 |
| Language | TypeScript | 5.x |

---

## 2. PROJECT STRUCTURE

```
brandscafe/
├── analyzes/
│   └── IMPLEMENTATION.md          ← THIS FILE
├── public/
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── app/
│   │   ├── globals.css            ← Tailwind directives, scrollbar, slider styles
│   │   ├── layout.tsx             ← Root layout (Inter font, metadata)
│   │   └── page.tsx               ← Renders <Configurator />
│   ├── components/
│   │   ├── BoxCanvas.tsx          ← R3F Canvas, Scene lighting, OrbitControls
│   │   ├── BoxTypeSelector.tsx    ← Modal overlay: 12 box types in category grid
│   │   ├── Configurator.tsx       ← Main page layout (header + 3-column grid)
│   │   ├── ControlsPanel.tsx      ← Left panel: type selector, dimensions, material, finish
│   │   ├── PresentationBar.tsx    ← Toolbar: Unfold, Open Lid, Spin, Ghost, Lighting
│   │   ├── PreviewExport.tsx      ← Right panel: export buttons + quick specs
│   │   └── UploadTexture.tsx      ← Artwork dropzone + clone/fit toggles
│   ├── store/
│   │   └── useBoxStore.ts         ← Zustand global state
│   ├── three/
│   │   └── BoxModel.tsx           ← All 12 box 3D geometries + die-line unfold
│   └── types/
│       └── box.ts                 ← TypeScript types + constant catalogs
├── .gitignore
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

---

## 3. TYPES & CONSTANTS (`src/types/box.ts`)

### BoxType (12 types)
```
'mailer' | 'shipping' | 'product' | 'tuckEnd' | 'rigid' | 'sleeve'
| 'drawer' | 'display' | 'gable' | 'hexagonal' | 'pillow' | 'pizza'
```

### Categories
- **standard**: mailer, shipping, tuckEnd
- **premium**: product, rigid, sleeve, drawer
- **specialty**: display, gable, hexagonal, pillow
- **food**: pizza

### MaterialType
`'kraft'` (#c4a265) | `'white'` (#f0f0f0) | `'black'` (#1a1a1a)

### FinishType
`'ink'` (matte) | `'gold'` (metallic 0.92) | `'silver'` (metallic 0.95) | `'uv'` (clearcoat 1.0)

### LightingPreset
`'dark'` | `'day'` | `'warm'`

### BOX_TYPE_CATALOG
Record mapping each BoxType to `{ label, category, description }`.

### BoxState (Zustand interface)
All dimensions, configuration, texture, presentation toggles, camera view, and setter actions.

---

## 4. STATE MANAGEMENT (`src/store/useBoxStore.ts`)

Zustand store created with `create<BoxState>()`. Key defaults:
- Dimensions: 20 × 15 × 10 cm
- Type: mailer, Material: kraft, Finish: ink
- All toggles off, Lighting: dark

Special logic:
- `setMaterial(mat)` also sets `color` from `MATERIAL_COLORS[mat]`
- `setCloneWithFinish(true)` also forces `cloneToAllSides = true`

---

## 5. 3D ENGINE (`src/three/BoxModel.tsx`)

### Architecture
- **Scale factor**: `0.04` (cm → scene units)
- **Material factory** (`useBoxMaterials`): creates 6-material array for BoxGeometry face groups
  - Ghost mode: transparent blue emissive
  - Finish types modify roughness/metalness/clearcoat via `getFinishProps()`
  - Clone artwork: applies texture to all 6 faces or just front (+z, index 4)
- **Shared `BoxBody`** component: renders BoxGeometry + Edges + GhostWireframe
- **Invisible material** (`INVIS_MAT`): used for sleeve/drawer open faces

### Box Type Components (all accept `BoxTypeProps`)

| Component | Geometry | Open Lid Behavior |
|-----------|----------|-------------------|
| `MailerBox` | BoxGeometry + lid group (top hinge) + tuck flap | Lid rotates from -12° to -78° |
| `ShippingBox` | BoxGeometry + 4 flap meshes + tape stripe | 4 flaps open from 45° to ~2° |
| `ProductBox` | Two BoxGeometries (base 70% + lid 30%) | Lid lifts up + slight tilt |
| `TuckEndBox` | BoxGeometry + top tuck lid + bottom tuck | Top opens, bottom opens |
| `RigidBox` | Two thick-walled BoxGeometries + rim | Lid lifts up |
| `SleeveBox` | BoxGeometry with invisible top/bottom materials | No lid action |
| `DrawerBox` | Sleeve (open front) + inner tray + pull tab | Tray slides out in +z |
| `DisplayBox` | Back section (full height) + front section (45% height) + bottom shelf | No lid |
| `GableBox` | BoxGeometry body + ExtrudeGeometry triangular prism peak + handle | Roof lifts |
| `HexagonalBox` | CylinderGeometry (6 segments) + hex lid | Lid lifts up |
| `PillowBox` | ExtrudeGeometry with rounded Shape + bevel | No lid |
| `PizzaBox` | Flat base BoxGeometry + hinged lid group | Lid hinges open from back |

### Die-Line (Unfold View)
- 6 PlaneGeometry faces arranged in cross pattern
- Animated spread from center (ref-based position updates in `useFrame`)
- Orange fold-mark lines at face connections
- Layout: Front (center), Top/Back (above), Bottom (below), Left/Right (sides)

### Main `BoxModel` Export
- Reads all state from store
- Uses `BOX_COMPONENTS` record to dynamically select the right component
- `useFrame`: auto-spin (Y rotation), idle float (sin wave), or settle to y=0 for unfold
- Conditional: shows box component OR DieLine based on `isUnfolded`

---

## 6. CANVAS & SCENE (`src/components/BoxCanvas.tsx`)

### Lighting Presets (3 configs)
| Preset | Ambient | Key Color | Key Intensity | BG Color |
|--------|---------|-----------|---------------|----------|
| dark | 0.25 | #dde4ff | 1.1 | #1a1a2e |
| day | 0.65 | #ffffff | 1.6 | #d8d8e6 |
| warm | 0.35 | #ffe0a0 | 1.3 | #1a150e |

### Scene Components
- `ambientLight`, `directionalLight` (key + fill), `pointLight` (rim)
- `ContactShadows` (ground plane)
- `Grid` (infinite grid floor)
- Background/fog colors set via `useThree().scene`

### CameraController
- Watches `cameraView` from store
- Repositions camera for 'front' (0,0,3) or 'perspective' (2.5,1.8,2.5)
- Auto-resets to 'default' after 200ms

### Canvas Config
- `preserveDrawingBuffer: true` (for PNG export)
- `ACESFilmicToneMapping`, exposure 1.1
- Camera: position [2.5, 1.8, 2.5], fov 45

### OrbitControls
- Pan, zoom, rotate enabled
- Distance: 1.5–8, polar angle: 0.1π–0.85π
- Damping enabled

### Wrapper CSS
- Dynamic gradient background based on lighting preset
- `transition-colors duration-500` for smooth preset changes

---

## 7. UI COMPONENTS

### Configurator (`src/components/Configurator.tsx`)
**Layout**: Dark theme page with:
- **Header**: sticky top bar with logo + "Brands Cafe" title + version badge
- **Main grid**: `grid-cols-1 lg:grid-cols-[280px_1fr_260px]`
  - Left aside (order-2 on mobile, order-1 on desktop): ControlsPanel + UploadTexture
  - Center (order-1 on mobile, order-2 on desktop): BoxCanvas + PresentationBar + tooltip hints
  - Right aside (order-3): PreviewExport

BoxCanvas is loaded with `next/dynamic` (ssr: false) with a spinner loading state.

### ControlsPanel (`src/components/ControlsPanel.tsx`)
Sections (top to bottom):
1. **Box Type**: Trigger button showing current type name + description → opens BoxTypeSelector modal
2. **Dimensions**: 3 `DimensionInput` components (range slider + number input), debounced 120ms
3. **Material**: 3 color circle buttons (kraft/white/black), ring highlight on active
4. **Finish Type**: 4 buttons with gradient swatches (ink/gold/silver/uv)

### BoxTypeSelector (`src/components/BoxTypeSelector.tsx`)
- Full-screen fixed overlay (`z-[100]`) with backdrop blur
- Categorized grid: Standard, Premium, Specialty, Food & Beverage
- Grid: `grid-cols-2 sm:grid-cols-3`
- Each card: SVG icon (line-art silhouette) + label + description + selected checkmark
- Closes on: card click, backdrop click, Escape key

### UploadTexture (`src/components/UploadTexture.tsx`)
- React Dropzone: PNG/JPG, single file
- Auto-resizes to max 2048px
- Preview thumbnail when uploaded
- Toggles: Fit to face, Clone to all sides, Clone with finish
- Remove Artwork button (red outline)
- Reusable `ToggleSwitch` sub-component

### PresentationBar (`src/components/PresentationBar.tsx`)
Horizontal toolbar below canvas:
- **Toggles**: Unfold (die-line icon), Open Lid (box icon), Spin (refresh icon), Ghost (ghost icon)
  - Disabled states: Open Lid disabled when unfolded
  - Label text hidden on mobile (`hidden sm:inline`)
- **Separator** (vertical line, hidden on mobile)
- **Lighting**: Dark (🌙), Day (☀️), Warm (🕯️) – emoji icons + label on sm+

### PreviewExport (`src/components/PreviewExport.tsx`)
- Two accent-colored export buttons: "Front View" + "Perspective View"
- Flow: set camera → wait 350ms → `canvas.toDataURL('image/png')` → download link
- QuickSpecs panel: type, size, material, finish, lighting + conditional rows for artwork/ghost/unfold

---

## 8. STYLING SYSTEM

### Tailwind Theme Extensions (`tailwind.config.ts`)
```
kraft: '#c4a265'
panel: '#1e1e2e'
surface: '#2a2a3c'
accent: '#7c5cfc'
accent-light: '#9d85fd'
```

### Global CSS (`src/app/globals.css`)
- `@tailwind base/components/utilities`
- Body: `bg-[#13131f] text-white`
- Custom scrollbar: 6px, gray-700 thumb
- Number input: spinners hidden (webkit + moz)
- Range input: custom thumb (accent purple, 4×4) and track (surface color, 1.5 height)

### Common Patterns
- **Panels**: `bg-panel rounded-xl p-5 border border-white/5`
- **Active buttons**: `bg-accent text-white shadow-lg shadow-accent/25`
- **Inactive buttons**: `bg-surface text-gray-300 hover:bg-surface/80`
- **Toggle active**: `bg-accent/20 text-accent-light ring-1 ring-accent/40`
- **Section headers**: `text-xs font-semibold text-gray-400 uppercase tracking-wider`
- **Canvas wrapper**: gradient background keyed to lighting preset

---

## 9. FEATURE MATRIX

| Feature | Implementation | File(s) |
|---------|---------------|---------|
| 12 Box Types | BOX_COMPONENTS record → conditional render | BoxModel.tsx, box.ts |
| Box Type Selector | Modal overlay with categorized grid + SVG icons | BoxTypeSelector.tsx |
| Dimensions (L×W×H) | Debounced sliders + number inputs → Zustand | ControlsPanel.tsx |
| Materials (kraft/white/black) | Color buttons → store.setMaterial → MATERIAL_COLORS | ControlsPanel.tsx |
| Finish (ink/gold/silver/uv) | Buttons → store → getFinishProps → MeshPhysicalMaterial | ControlsPanel.tsx, BoxModel.tsx |
| Artwork Upload | react-dropzone → FileReader → dataURL → texture | UploadTexture.tsx |
| Clone to All Sides | Toggle → material array all uses texMat | UploadTexture.tsx, BoxModel.tsx |
| Clone with Finish | Toggle → finish props applied to textured faces | UploadTexture.tsx, BoxModel.tsx |
| 3D Orbit/Zoom/Pan | Drei OrbitControls with min/max distance + polar | BoxCanvas.tsx |
| Unfold to Die-Line | 6 PlaneGeometries spread animation + fold marks | BoxModel.tsx (DieLine) |
| Open Lid | Per-type lid animation (useFrame + useRef) | BoxModel.tsx (each type) |
| Auto-Spin | Y-axis rotation in useFrame | BoxModel.tsx (main) |
| Ghost / X-Ray Mode | Transparent blue MeshPhysicalMaterial + wireframe overlay | BoxModel.tsx |
| Lighting Presets | 3 configs switching ambient/key/fill/bg/fog/grid | BoxCanvas.tsx |
| Export PNG | Camera reposition → canvas.toDataURL → download link | PreviewExport.tsx, BoxCanvas.tsx |
| Mobile Responsive | CSS grid col collapse + hidden labels + flex-wrap | Configurator.tsx, PresentationBar.tsx |

---

## 10. DATA FLOW

```
User Action → Zustand Store → React Re-render
                                ├── UI Components (read selectors)
                                └── BoxModel (useFrame + materials)
                                     └── Three.js Scene (real-time)
```

1. User clicks "Gold" finish → `setFinishType('gold')`
2. `useBoxMaterials()` hook re-computes materials (useMemo dependency)
3. `getFinishProps('kraft-color', 'gold')` returns metalness: 0.92, roughness: 0.28
4. New `MeshPhysicalMaterial` created with gold-lerped color
5. Material array fed to BoxGeometry → instant 3D update

---

## 11. 3D MATERIAL SYSTEM

### Material Array (BoxGeometry face order)
```
Index 0: +X (right face)
Index 1: -X (left face)
Index 2: +Y (top face)
Index 3: -Y (bottom face)
Index 4: +Z (front face)  ← texture applied here by default
Index 5: -Z (back face)
```

### Finish Properties
| Finish | Roughness | Metalness | Clearcoat | Color Modification |
|--------|-----------|-----------|-----------|-------------------|
| ink | 0.70 | 0.05 | 0 | Base color |
| gold | 0.28 | 0.92 | 0 | lerp(base, #FFD700, 0.55) |
| silver | 0.22 | 0.95 | 0 | lerp(base, #C0C0C0, 0.50) |
| uv | 0.05 | 0.25 | 1.0 | Base color |

### Ghost Mode Override
All 6 faces: `color: #4488ff, emissive: #223366, opacity: 0.1, metalness: 0.6`
Plus wireframe overlay mesh: `color: #4488ff, wireframe: true, opacity: 0.2`

---

## 12. ANIMATION SYSTEM

All animations use `useFrame` with ref-based interpolation (no React state re-renders):

```typescript
// Pattern used throughout:
const animRef = useRef(0);
useFrame((_, delta) => {
  const target = isActive ? 1 : 0;
  animRef.current += (target - animRef.current) * Math.min(1, delta * 4);
  // Apply to mesh.rotation / mesh.position
});
```

- **Lid open**: interpolates rotation angle from closed → open position
- **Flap open** (shipping): 4 refs, each updating rotation
- **Drawer slide**: position.z interpolation
- **Die-line spread**: 6 group refs, position lerped from center to target
- **Auto-spin**: `groupRef.current.rotation.y += delta * 0.5`
- **Idle float**: `position.y = sin(time * 0.8) * 0.02`

---

## 13. EXPORT SYSTEM

1. `PreviewExport` calls `setCameraView('front')` or `setCameraView('perspective')`
2. `CameraController` (inside Canvas) detects change, repositions camera
3. After 350ms timeout, grabs `#box-canvas canvas` element
4. Calls `canvas.toDataURL('image/png', 1.0)`
5. Creates temporary `<a>` element with download attribute
6. Triggers click → browser downloads PNG
7. Canvas has `preserveDrawingBuffer: true` to allow capture

---

## 14. HOW TO RUN

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser
http://localhost:3000
```

---

## 15. HOW TO ADD A NEW BOX TYPE

1. **`src/types/box.ts`**: Add to `BoxType` union + `BOX_TYPE_CATALOG` entry
2. **`src/three/BoxModel.tsx`**: Create component (accept `BoxTypeProps`) + add to `BOX_COMPONENTS` record
3. **`src/components/BoxTypeSelector.tsx`**: Add SVG icon to `BOX_ICONS` record
4. That's it — store, controls, export all work automatically via the type system.

---

## 16. KEY DESIGN DECISIONS

- **No backend**: All state in Zustand, textures as data URLs
- **MeshPhysicalMaterial** for all boxes: supports clearcoat (UV finish), metalness (gold/silver)
- **Ref-based animations**: No React re-renders during animation frames
- **Dynamic SSR disable**: BoxCanvas loaded with `next/dynamic({ ssr: false })` because Three.js needs browser APIs
- **Invisible material singleton**: Shared `INVIS_MAT` for sleeve/drawer open faces (not recreated per render)
- **Material array pattern**: 6-element array maps directly to BoxGeometry face groups
- **Box component record**: `BOX_COMPONENTS[boxType]` avoids long if/else chains

---

*Generated for Brands Cafe 3D Box Configurator — last updated Feb 2026*
