'use client';

import dynamic from 'next/dynamic';
import HomeHeroNavbar from '@/components/nav/HomeHeroNavbar';
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
      <HomeHeroNavbar variant="layout" />

      {/* Main Layout */}
      <main className="max-w-[1600px] mx-auto p-4 sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_260px] gap-4 sm:gap-6">
          {/* Left Panel: Controls */}
          <aside className="lg:order-1 order-2 bg-panel rounded-xl p-5 border border-white/5 h-fit lg:sticky lg:top-28 overflow-y-auto lg:max-h-[calc(100vh-8rem)]">
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
          <aside className="lg:order-3 order-3 bg-panel rounded-xl p-5 border border-white/5 h-fit lg:sticky lg:top-28">
            <PreviewExport />
          </aside>
        </div>
      </main>
    </div>
  );
}
