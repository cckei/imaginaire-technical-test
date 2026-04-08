"use client";

import { useState } from "react";
import Image from "next/image";
import type { ShopifyProduct } from "@/lib/types";

function formatPrice(amount: string, currencyCode: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  }).format(parseFloat(amount));
}

export default function ProductCard({ product }: { product: ShopifyProduct }) {
  const [hovered, setHovered] = useState(false);

  const image = product.images.edges[0]?.node;
  const secondImage = product.images.edges[1]?.node;
  const price = product.priceRange.minVariantPrice;
  const compareAt = product.compareAtPriceRange.minVariantPrice;
  const hasDiscount =
    parseFloat(compareAt.amount) > 0 &&
    parseFloat(compareAt.amount) > parseFloat(price.amount);

  const variants = product.variants.edges.map((e) => e.node);
  const colorOptions = variants
    .flatMap((v) => v.selectedOptions)
    .filter((o) => o.name.toLowerCase() === "color" || o.name.toLowerCase() === "colour")
    .reduce<string[]>((acc, o) => {
      if (!acc.includes(o.value)) acc.push(o.value);
      return acc;
    }, []);

  const availableCount = variants.filter((v) => v.availableForSale).length;

  return (
    <article
      className="group flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <a
        href={`/products/${product.handle}`}
        className="relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-100"
      >
        {image && (
          <Image
            src={image.url}
            alt={image.altText || product.title}
            fill
            sizes="(max-width: 720px) 80vw, (max-width: 1024px) 45vw, 25vw"
            className={`object-cover transition-transform duration-500 ${
              hovered && secondImage ? "opacity-0" : "opacity-100"
            } supports-hover:group-hover:scale-105`}
          />
        )}
        {secondImage && (
          <Image
            src={secondImage.url}
            alt={secondImage.altText || product.title}
            fill
            sizes="(max-width: 720px) 80vw, (max-width: 1024px) 45vw, 25vw"
            className={`object-cover transition-opacity duration-500 ${
              hovered ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        {/* Hover overlay with quick actions */}
        <div
          className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 transition-opacity duration-300 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <button className="w-full rounded-full bg-white py-2.5 text-xs font-semibold text-gray-900 transition-colors supports-hover:hover:bg-gray-100">
            Quick View
          </button>
        </div>

        {/* Sale badge */}
        {hasDiscount && (
          <span className="absolute left-3 top-3 rounded-full bg-red-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
            Sale
          </span>
        )}
      </a>

      {/* Info */}
      <div className="mt-3 flex flex-col gap-1">
        <a
          href={`/products/${product.handle}`}
          className="text-sm font-medium text-gray-900 transition-colors supports-hover:hover:text-gray-600 line-clamp-1"
        >
          {product.title}
        </a>

        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-900">
            {formatPrice(price.amount, price.currencyCode)}
          </span>
          {hasDiscount && (
            <span className="text-xs text-gray-400 line-through">
              {formatPrice(compareAt.amount, compareAt.currencyCode)}
            </span>
          )}
        </div>

        {/* Color swatches on hover */}
        <div
          className={`flex items-center gap-1 transition-all duration-300 ${
            hovered ? "mt-1 max-h-8 opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          {colorOptions.length > 0 ? (
            colorOptions.map((color) => (
              <span
                key={color}
                title={color}
                className="inline-block h-4 w-4 rounded-full border border-gray-200"
                style={{ backgroundColor: color.toLowerCase() }}
              />
            ))
          ) : (
            <span className="text-xs text-gray-400">
              {availableCount} variant{availableCount !== 1 ? "s" : ""} available
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
