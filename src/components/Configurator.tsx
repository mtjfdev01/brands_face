'use client';

import dynamic from 'next/dynamic';
import ControlsPanel from './ControlsPanel';
import UploadTexture from './UploadTexture';
import PreviewExport from './PreviewExport';
import PresentationBar from './PresentationBar';

const BoxCanvas = dynamic(() => import('./BoxCanvas'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[400px] rounded-xl bg-panel flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-gray-400">Loading 3D viewer...</p>
      </div>
    </div>
  ),
});

export default function Configurator() {
  return (
    <div className="min-h-screen bg-[#13131f] text-white">
      {/* Header */}
      <header className="border-b border-white/5 bg-panel/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">Brands Face</h1>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">
                3D Box Configurator
              </p>
            </div>
          </div>
          <span className="hidden sm:inline-block text-xs text-gray-600 bg-surface px-3 py-1 rounded-full">
            v2.0
          </span>
        </div>
      </header>

      {/* Main Layout */}
      <main className="max-w-[1600px] mx-auto p-4 sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_260px] gap-4 sm:gap-6">
          {/* Left Panel: Controls */}
          <aside className="lg:order-1 order-2 bg-panel rounded-xl p-5 border border-white/5 h-fit lg:sticky lg:top-20 overflow-y-auto lg:max-h-[calc(100vh-6rem)]">
            <div className="space-y-6">
              <ControlsPanel />
              <div className="border-t border-white/5 pt-4">
                <UploadTexture />
              </div>
            </div>
          </aside>

          {/* Center: 3D Canvas + Presentation Toolbar */}
          <div className="lg:order-2 order-1 flex flex-col gap-3">
            <div className="aspect-[4/3] lg:aspect-auto lg:min-h-[600px] relative">
              <BoxCanvas />
              {/* Canvas overlay hints */}
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
                Drag to rotate &middot; Scroll to zoom &middot; Right-click to
                pan
              </div>
            </div>

            {/* Presentation toolbar below canvas */}
            <PresentationBar />
          </div>

          {/* Right Panel: Export */}
          <aside className="lg:order-3 order-3 bg-panel rounded-xl p-5 border border-white/5 h-fit lg:sticky lg:top-20">
            <PreviewExport />
          </aside>
        </div>
      </main>
    </div>
  );
}
