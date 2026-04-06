"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
  images: string[];
  alt: string;
};

export default function ProductGallery({ images, alt }: Props) {
  const [activeIdx, setActiveIdx] = useState(0);

  if (images.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div className="relative aspect-square w-full max-h-[62vh] overflow-hidden rounded-2xl bg-white">
        <Image
          src={images[activeIdx]}
          alt={`${alt} — view ${activeIdx + 1}`}
          fill
          className="object-contain p-4"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {images.map((src, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`relative aspect-square w-full rounded-lg overflow-hidden border-2 transition-all ${
                idx === activeIdx
                  ? " shadow-md"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={src}
                alt={`${alt} thumbnail ${idx + 1}`}
                fill
                className="object-contain p-2"
                sizes="(max-width: 640px) 20vw, 80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
