'use client';

import { useState, useCallback } from 'react';
import { useBoxStore } from '@/store/useBoxStore';

type ViewType = 'front' | 'perspective';

export default function PreviewExport() {
  const setCameraView = useBoxStore((s) => s.setCameraView);
  const [exporting, setExporting] = useState<ViewType | null>(null);

  const captureImage = useCallback(
    async (view: ViewType) => {
      setExporting(view);
      setCameraView(view);

      await new Promise((resolve) => setTimeout(resolve, 350));

      const canvas = document.querySelector(
        '#box-canvas canvas'
      ) as HTMLCanvasElement;
      if (!canvas) {
        setExporting(null);
        return;
      }

      try {
        const dataUrl = canvas.toDataURL('image/png', 1.0);
        const link = document.createElement('a');
        link.download = `box-preview-${view}-${Date.now()}.png`;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (err) {
        console.error('Failed to export:', err);
      }

      setExporting(null);
    },
    [setCameraView]
  );

  return (
    <div className="space-y-4">
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
        Export Preview
      </h3>

      <div className="space-y-2">
        <ExportButton
          label="Front View"
          icon={<FrontViewIcon />}
          loading={exporting === 'front'}
          onClick={() => captureImage('front')}
        />
        <ExportButton
          label="Perspective View"
          icon={<PerspectiveIcon />}
          loading={exporting === 'perspective'}
          onClick={() => captureImage('perspective')}
        />
      </div>

      <p className="text-xs text-gray-500 leading-relaxed">
        Downloads a PNG of the current box configuration.
      </p>

      <QuickSpecs />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Export Button                                                      */
/* ------------------------------------------------------------------ */
function ExportButton({
  label,
  icon,
  loading,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  loading: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="w-full flex items-center gap-3 px-4 py-3 bg-accent hover:bg-accent-light
        disabled:opacity-60 disabled:cursor-wait text-white rounded-lg font-medium text-sm
        transition-all duration-200 shadow-lg shadow-accent/20 hover:shadow-accent/40
        active:scale-[0.98]"
    >
      <span className="w-5 h-5 shrink-0">
        {loading ? <SpinnerIcon /> : icon}
      </span>
      <span>{loading ? 'Capturing...' : label}</span>
      <svg
        className="w-4 h-4 ml-auto opacity-50"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
        />
      </svg>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Quick Specs - extended with new features                           */
/* ------------------------------------------------------------------ */
function QuickSpecs() {
  const {
    length,
    width,
    height,
    boxType,
    material,
    finishType,
    lightingPreset,
    cloneToAllSides,
    ghostMode,
    isUnfolded,
  } = useBoxStore();

  return (
    <div className="bg-surface/50 rounded-lg p-3 space-y-1.5">
      <h4 className="text-xs font-semibold text-gray-400 mb-2">
        Current Config
      </h4>
      <SpecRow label="Type" value={boxType} />
      <SpecRow label="Size" value={`${length} x ${width} x ${height} cm`} />
      <SpecRow label="Material" value={material} />
      <SpecRow label="Finish" value={finishType.toUpperCase()} />
      <SpecRow label="Lighting" value={lightingPreset} />
      {cloneToAllSides && <SpecRow label="Artwork" value="All sides" />}
      {ghostMode && <SpecRow label="Mode" value="X-Ray" />}
      {isUnfolded && <SpecRow label="View" value="Die-Line" />}
    </div>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-xs">
      <span className="text-gray-500">{label}</span>
      <span className="text-gray-300 capitalize">{value}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */
function FrontViewIcon() {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="w-full h-full"
    >
      <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth={1.5} />
      <path strokeLinecap="round" strokeWidth={1.5} d="M4 9h16" />
    </svg>
  );
}

function PerspectiveIcon() {
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
        d="M7 7l4-3h6l4 3v6l-4 3H7l-4-3V7z"
      />
      <path
        strokeLinecap="round"
        strokeWidth={1.5}
        d="M7 7l10 0M7 7l0 6"
      />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg className="w-full h-full animate-spin" fill="none" viewBox="0 0 24 24">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}
