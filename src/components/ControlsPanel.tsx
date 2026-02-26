'use client';

import { useCallback, useRef, useState } from 'react';
import { useBoxStore } from '@/store/useBoxStore';
import {
  MaterialType,
  FinishType,
  MATERIAL_LABELS,
  MATERIAL_COLORS,
  FINISH_LABELS,
  FINISH_COLORS,
  BOX_TYPE_CATALOG,
} from '@/types/box';
import BoxTypeSelector from './BoxTypeSelector';

/* ------------------------------------------------------------------ */
/*  Debounce hook                                                      */
/* ------------------------------------------------------------------ */
function useDebouncedCallback<T extends (...args: number[]) => void>(
  callback: T,
  delay: number
): T {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  return useCallback(
    ((...args: number[]) => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => callback(...args), delay);
    }) as T,
    [callback, delay]
  );
}

/* ================================================================== */
/*  CONTROLS PANEL                                                     */
/* ================================================================== */
export default function ControlsPanel() {
  const {
    length, width, height,
    boxType, material, finishType,
    setLength, setWidth, setHeight, setMaterial, setFinishType,
  } = useBoxStore();

  const [selectorOpen, setSelectorOpen] = useState(false);

  const debouncedSetLength = useDebouncedCallback(setLength, 120);
  const debouncedSetWidth = useDebouncedCallback(setWidth, 120);
  const debouncedSetHeight = useDebouncedCallback(setHeight, 120);

  const currentType = BOX_TYPE_CATALOG[boxType];

  return (
    <div className="space-y-6">
      {/* Box Type Selector Trigger */}
      <section>
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
          Box Type
        </h3>
        <button
          onClick={() => setSelectorOpen(true)}
          className="w-full flex items-center gap-3 px-4 py-3 bg-surface rounded-xl border border-white/5
            hover:border-accent/30 hover:bg-surface/80 transition-all duration-200 group text-left"
        >
          {/* Mini icon */}
          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0
            group-hover:bg-accent/20 transition-colors">
            <svg className="w-5 h-5 text-accent-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{currentType.label}</p>
            <p className="text-[10px] text-gray-500 truncate">{currentType.description}</p>
          </div>
          <svg className="w-4 h-4 text-gray-500 group-hover:text-accent-light transition-colors shrink-0"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
          </svg>
        </button>

        {/* Category badge */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface text-gray-400 capitalize">
            {currentType.category}
          </span>
          <span className="text-[10px] text-gray-600">
            12 types available
          </span>
        </div>
      </section>

      {/* Dimensions */}
      <section>
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
          Dimensions (cm)
        </h3>
        <div className="space-y-3">
          <DimensionInput label="Length" defaultValue={length} onChange={debouncedSetLength} min={5} max={100} />
          <DimensionInput label="Width" defaultValue={width} onChange={debouncedSetWidth} min={5} max={100} />
          <DimensionInput label="Height" defaultValue={height} onChange={debouncedSetHeight} min={3} max={80} />
        </div>
        <p className="text-xs text-gray-500 mt-2">{length} x {width} x {height} cm</p>
      </section>

      {/* Material */}
      <section>
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Material</h3>
        <div className="grid grid-cols-3 gap-2">
          {(Object.keys(MATERIAL_LABELS) as MaterialType[]).map((mat) => (
            <button
              key={mat}
              onClick={() => setMaterial(mat)}
              className={`flex flex-col items-center gap-1.5 p-3 rounded-lg transition-all duration-200 ${
                material === mat
                  ? 'bg-surface ring-2 ring-accent shadow-lg'
                  : 'bg-surface/50 hover:bg-surface'
              }`}
            >
              <div className="w-8 h-8 rounded-full border-2 border-gray-600 shadow-inner"
                style={{ backgroundColor: MATERIAL_COLORS[mat] }} />
              <span className="text-[10px] text-gray-400 text-center leading-tight">
                {mat.charAt(0).toUpperCase() + mat.slice(1)}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Finish Type */}
      <section>
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Finish Type</h3>
        <div className="grid grid-cols-4 gap-1.5">
          {(Object.keys(FINISH_LABELS) as FinishType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFinishType(f)}
              className={`relative flex flex-col items-center gap-1 p-2.5 rounded-lg text-[10px] font-medium transition-all duration-200 ${
                finishType === f
                  ? 'bg-surface ring-2 ring-accent shadow-lg text-white'
                  : 'bg-surface/50 hover:bg-surface text-gray-400 hover:text-gray-200'
              }`}
            >
              <div className="w-5 h-5 rounded-full border border-gray-600"
                style={{
                  background: f === 'gold' ? 'linear-gradient(135deg, #b8860b, #ffd700, #b8860b)'
                    : f === 'silver' ? 'linear-gradient(135deg, #808080, #e0e0e0, #808080)'
                    : f === 'uv' ? 'linear-gradient(135deg, #4488cc, #88ccff, #4488cc)'
                    : FINISH_COLORS[f],
                }} />
              <span>{FINISH_LABELS[f]}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Box Type Selector Modal */}
      {selectorOpen && <BoxTypeSelector onClose={() => setSelectorOpen(false)} />}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  DimensionInput                                                     */
/* ------------------------------------------------------------------ */
function DimensionInput({
  label, defaultValue, onChange, min, max,
}: {
  label: string; defaultValue: number; onChange: (v: number) => void; min: number; max: number;
}) {
  return (
    <div className="flex items-center gap-3">
      <label className="text-sm text-gray-300 w-14 shrink-0">{label}</label>
      <input type="range" min={min} max={max} step={1} defaultValue={defaultValue}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1 h-1.5 bg-surface rounded-full appearance-none cursor-pointer
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:shadow-lg
          [&::-webkit-slider-thumb]:cursor-pointer
          [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:bg-accent [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer" />
      <input type="number" min={min} max={max} defaultValue={defaultValue}
        onChange={(e) => { const v = Number(e.target.value); if (v >= min && v <= max) onChange(v); }}
        className="w-14 bg-surface text-white text-sm text-center rounded-md py-1.5 border border-gray-700
          focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/50 transition-colors" />
    </div>
  );
}
