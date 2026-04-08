"use client";

import { useState } from "react";
import Image from "next/image";
import type { ShopifyImage } from "@/lib/types";

export default function ProductImages({ images }: { images: ShopifyImage[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = images[activeIndex];

  if (!images.length) {
    return (
      <div className="aspect-square bg-gray-100 rounded flex items-center justify-center text-gray-400">
        No image available
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div className="relative aspect-[3/4] overflow-hidden rounded bg-gray-100 border border-gray-200">
        {active && (
          <Image
            src={active.url}
            alt={active.altText || "Product image"}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto scrollbar-hide">
          {images.map((img, i) => (
            <button
              key={img.url}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={`relative w-20 h-20 flex-shrink-0 rounded overflow-hidden border-2 transition-all ${
                i === activeIndex
                  ? "border-black"
                  : "border-gray-200 opacity-60 supports-hover:hover:opacity-100"
              }`}
            >
              <Image
                src={img.url}
                alt={img.altText || `Thumbnail ${i + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
