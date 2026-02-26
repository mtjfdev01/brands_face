'use client';

import { useBoxStore } from '@/store/useBoxStore';
import type { LightingPreset } from '@/types/box';

export default function PresentationBar() {
  const {
    isUnfolded,
    setIsUnfolded,
    isLidOpen,
    setIsLidOpen,
    autoSpin,
    setAutoSpin,
    ghostMode,
    setGhostMode,
    lightingPreset,
    setLightingPreset,
  } = useBoxStore();

  return (
    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 bg-panel rounded-xl px-3 py-2.5 border border-white/5">
      {/* Presentation Toggles */}
      <PresentationToggle
        active={isUnfolded}
        onClick={() => setIsUnfolded(!isUnfolded)}
        icon={<UnfoldIcon />}
        label="Unfold"
        tooltip="Unfold to Die-Line"
      />

      <PresentationToggle
        active={isLidOpen}
        onClick={() => setIsLidOpen(!isLidOpen)}
        icon={<LidIcon />}
        label="Open Lid"
        tooltip="Open / Close Lid"
        disabled={isUnfolded}
      />

      <PresentationToggle
        active={autoSpin}
        onClick={() => setAutoSpin(!autoSpin)}
        icon={<SpinIcon />}
        label="Spin"
        tooltip="Start Auto-Spin"
      />

      <PresentationToggle
        active={ghostMode}
        onClick={() => setGhostMode(!ghostMode)}
        icon={<GhostIcon />}
        label="Ghost"
        tooltip="Ghost / X-Ray Mode"
      />

      {/* Separator */}
      <div className="w-px h-7 bg-white/10 mx-1 hidden sm:block" />

      {/* Lighting Presets */}
      <div className="flex items-center gap-1">
        <span className="text-[10px] text-gray-500 uppercase tracking-wider mr-1 hidden sm:inline">
          Light
        </span>
        {(['dark', 'day', 'warm'] as LightingPreset[]).map((preset) => (
          <LightingButton
            key={preset}
            active={lightingPreset === preset}
            onClick={() => setLightingPreset(preset)}
            preset={preset}
          />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Presentation Toggle Button                                         */
/* ------------------------------------------------------------------ */
function PresentationToggle({
  active,
  onClick,
  icon,
  label,
  tooltip,
  disabled = false,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  tooltip: string;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={tooltip}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200
        ${disabled ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}
        ${
          active
            ? 'bg-accent/20 text-accent-light ring-1 ring-accent/40'
            : 'bg-surface/60 text-gray-400 hover:bg-surface hover:text-gray-200'
        }`}
    >
      <span className="w-4 h-4 shrink-0">{icon}</span>
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Lighting Preset Button                                             */
/* ------------------------------------------------------------------ */
function LightingButton({
  active,
  onClick,
  preset,
}: {
  active: boolean;
  onClick: () => void;
  preset: LightingPreset;
}) {
  const config: Record<LightingPreset, { icon: string; bg: string }> = {
    dark: { icon: '🌙', bg: 'from-[#1a1a2e] to-[#0d0d1a]' },
    day: { icon: '☀️', bg: 'from-[#e0e0ea] to-[#c8c8d8]' },
    warm: { icon: '🕯️', bg: 'from-[#3a2a10] to-[#1a1008]' },
  };

  const c = config[preset];

  return (
    <button
      onClick={onClick}
      title={`${preset.charAt(0).toUpperCase() + preset.slice(1)} lighting`}
      className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200
        ${
          active
            ? 'ring-1 ring-accent/50 bg-surface text-white shadow-sm'
            : 'bg-surface/40 text-gray-500 hover:bg-surface/70 hover:text-gray-300'
        }`}
    >
      <span className="text-sm leading-none">{c.icon}</span>
      <span className="hidden sm:inline capitalize">{preset}</span>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */
function UnfoldIcon() {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="w-full h-full"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 3h6v6H9V3zm0 12h6v6H9v-6zM3 9h6v6H3V9zm12 0h6v6h-6V9z"
      />
    </svg>
  );
}

function LidIcon() {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="w-full h-full"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M5 19h14a2 2 0 002-2v-7H3v7a2 2 0 002 2zM3 10l3-5h12l3 5"
      />
    </svg>
  );
}

function SpinIcon() {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="w-full h-full"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    </svg>
  );
}

function GhostIcon() {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="w-full h-full"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 3C7.5 3 4 7 4 11v9l2-2 2 2 2-2 2 2 2-2 2 2 2-2 2 2v-9c0-4-3.5-8-8-8z"
      />
      <circle cx="9" cy="11" r="1.5" fill="currentColor" />
      <circle cx="15" cy="11" r="1.5" fill="currentColor" />
    </svg>
  );
}
