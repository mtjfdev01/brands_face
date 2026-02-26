"use client";

import { useRef, useCallback } from "react";

/* ── Types ── */
export type TrendVideo = {
  id: string;
  src: string; // video file path e.g. "/videos/pouch.mp4"
  poster?: string; // optional poster/thumbnail image
};

type Props = {
  marqueeText: string;
  heading: string;
  subheading: string;
  videos: TrendVideo[];
};

/* ── Single video card ── */
function VideoCard({ video }: { video: TrendVideo }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = useCallback(() => {
    videoRef.current?.play();
  }, []);

  const handleMouseLeave = useCallback(() => {
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
  }, []);

  return (
    <div
      className="group relative w-[220px] sm:w-[260px] md:w-[280px] shrink-0 overflow-hidden rounded-2xl bg-gray-100 aspect-[3/4] cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        src={video.src}
        poster={video.poster}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Play icon overlay — hides on hover */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/5 transition-opacity duration-300 group-hover:opacity-0">
        <div className="grid h-12 w-12 place-items-center rounded-full bg-white/80 backdrop-blur-sm shadow-lg">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-gray-800 ml-0.5"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ── Main component ── */
export default function SetTheTrends({
  marqueeText,
  heading,
  subheading,
  videos,
}: Props) {
  return (
    <section className="w-full py-14 md:py-20 overflow-hidden">
      {/* ── Blue marquee title (LTR) ── */}
      <div className="relative w-full overflow-hidden mb-10 md:mb-14">
        <div className="animate-marquee-ltr flex whitespace-nowrap">
          {/* Duplicate text for seamless loop */}
          {[0, 1].map((i) => (
            <span
              key={i}
              className="mx-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#0EA5E9] select-none"
            >
              {marqueeText}
            </span>
          ))}
        </div>
      </div>

      {/* ── Heading + subheading ── */}
      <div className="max-w-2xl mx-auto px-4 text-center mb-10 md:mb-14">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          {heading}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-gray-600 md:text-lg">
          {subheading}
        </p>
      </div>

      {/* ── Video cards marquee (RTL) — pauses on hover ── */}
      <div className="group/marquee relative w-full overflow-hidden">
        <div className="animate-marquee-rtl flex gap-4 md:gap-6 group-hover/marquee:[animation-play-state:paused]">
          {/* Duplicate videos for seamless loop */}
          {[...videos, ...videos].map((video, idx) => (
            <VideoCard key={`${video.id}-${idx}`} video={video} />
          ))}
        </div>
      </div>

      {/* ── Keyframe styles ── */}
      <style jsx>{`
        @keyframes marquee-ltr {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }
        @keyframes marquee-rtl {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee-ltr {
          animation: marquee-ltr 20s linear infinite;
        }
        .animate-marquee-rtl {
          animation: marquee-rtl 30s linear infinite;
          width: max-content;
        }
      `}</style>
    </section>
  );
}
