"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { IconShoppingBagPlus } from "@tabler/icons-react";
import type { ShopifyProduct } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import Btn from "./Btn";

function formatPrice(amount: string, currencyCode: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  }).format(parseFloat(amount));
}

export default function ProductCard({ product }: { product: ShopifyProduct }) {
  const [activeColor, setActiveColor] = useState<string | null>(null);
  const { addItem } = useCart();

  const image = product.images.edges[0]?.node;
  const secondImage = product.images.edges[1]?.node;
  const price = product.priceRange.minVariantPrice;
  const compareAt = product.compareAtPriceRange.minVariantPrice;
  const hasDiscount =
    parseFloat(compareAt.amount) > 0 &&
    parseFloat(compareAt.amount) > parseFloat(price.amount);

  const variants = useMemo(
    () => product.variants.edges.map((e) => e.node),
    [product.variants.edges]
  );

  // Extract unique colour options
  const colorOptions = useMemo(() => {
    const seen = new Set<string>();
    return variants
      .flatMap((v) => v.selectedOptions)
      .filter(
        (o) =>
          (o.name.toLowerCase() === "color" ||
            o.name.toLowerCase() === "colour") &&
          !seen.has(o.value) &&
          seen.add(o.value)
      )
      .map((o) => o.value);
  }, [variants]);

  // Extract unique size options
  const sizeOptions = useMemo(() => {
    const seen = new Set<string>();
    return variants
      .flatMap((v) => v.selectedOptions)
      .filter(
        (o) =>
          o.name.toLowerCase() === "size" &&
          !seen.has(o.value) &&
          seen.add(o.value)
      )
      .map((o) => o.value);
  }, [variants]);

  const mapColor = (color: string) => {
    // ice, dawn, powder, electric, sunset
    switch (color) {
      case "ice":
        return "#F5F5F5";
      case "dawn":
        return "#EAEAEA";
      case "powder":
        return "#BBBBBB";
      case "electric":
        return "#FFC107";
      case "sunset":
        return "#FF5722";
    }
  };



  const availableCount = variants.filter((v) => v.availableForSale).length;
  const totalCount = variants.length;
  const allSoldOut = availableCount === 0;

  const productUrl = `/products/${product.handle}`;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const firstAvailable = variants.find((v) => v.availableForSale);
    if (!firstAvailable) return;
    addItem({
      variantId: firstAvailable.id,
      productId: product.id,
      title: product.title,
      variantTitle: firstAvailable.title,
      price: parseFloat(price.amount),
      currencyCode: price.currencyCode,
      image: image?.url,
      handle: product.handle,
    });
  };

  return (
    <article
      className="product-card group flex flex-col h-full"
    >
      {/* Image container */}
      <Link
        href={productUrl}
        className="product-card__image relative aspect-[3/4] overflow-hidden rounded bg-gray-100 border border-gray-200 block"
      >

        {/* Primary image */}
        {image && (
          <Image
            src={image.url}
            alt={image.altText || product.title}
            fill
            sizes="(max-width: 720px) 80vw, (max-width: 1024px) 45vw, 25vw"
            className={`image--primary object-cover transition-all duration-500`}
          />
        )}
        {/* Secondary image on hover */}
        {secondImage && (
          <Image
            src={secondImage.url}
            alt={secondImage.altText || product.title}
            fill
            sizes="(max-width: 720px) 80vw, (max-width: 1024px) 45vw, 25vw"
            className={`image--secondary object-cover transition-all duration-500`}
          />
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-[2]">
          {hasDiscount && (
            <span className="product-card__badge product-card__badge--sale">
              Sale
            </span>
          )}
          {allSoldOut && (
            <span className="product-card__badge product-card__badge--sold-out">
              Sold Out
            </span>
          )}
        </div>

        {/* Hover overlay — variant info + quick actions */}
        <div
          className={`product-card__overlay absolute inset-0 z-[3] flex flex-col items-center justify-end p-4 transition-opacity duration-300`}
        >
          {/* Add to cart button — top right */}
          {!allSoldOut && (
            <button
              type="button"
              onClick={handleQuickAdd}
              aria-label="Add to cart"
              className="product-card__add-to-cart absolute top-3 right-3"
            >
              <IconShoppingBagPlus size={20} stroke={1.5} />
            </button>
          )}
          {/* Colour swatches */}
          {colorOptions.length > 0 && (
            <div className="flex items-center gap-2 mb-2 flex-wrap justify-center">
              {colorOptions.map((color) => (
                <button
                  key={color}
                  title={color}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveColor(color);
                  }}
                  className={`product-card__swatch ${
                    activeColor === color ? "product-card__swatch--active" : ""
                  }`}
                  style={{ backgroundColor: mapColor(color.toLowerCase()) }}
                />
              ))}
              {activeColor && (
                <span className="text-xs text-white/80 ml-1">{activeColor}</span>
              )}
            </div>
          )}

          {/* Variant availability (when no colours) */}
          {colorOptions.length === 0 && totalCount > 1 && (
            <div className="mb-2">
              <span className="text-xs text-white/70">
                {availableCount}/{totalCount} variants in stock
              </span>
            </div>
          )}

          {/* Size quick-select */}
          {sizeOptions.length > 0 && (
            <div className="product-card__sizes w-full mb-2">
              <p className="text-[10px] uppercase tracking-wider text-white/70 mb-1.5 text-center">
                Quick Add — Size
              </p>
              <div className="flex justify-center gap-1.5 flex-wrap">
                {sizeOptions.map((size) => {
                  const sizeVariant = variants.find((v) =>
                    v.selectedOptions.some(
                      (o) => o.name.toLowerCase() === "size" && o.value === size
                    )
                  );
                  const inStock = sizeVariant?.availableForSale ?? false;
                  return (
                    <button
                      key={size}
                      disabled={!inStock}
                      className={`product-card__size-btn ${
                        !inStock ? "product-card__size-btn--oos" : ""
                      }`}
                      title={inStock ? `Add size ${size}` : `Size ${size} — sold out`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </Link>

      {/* Product info */}
      <div className="mt-3">
        <div className="flex gap-2 justify-between items-start">
          <Link href={productUrl} className="text-lg leading-6 product-card__title">
            {product.title}
          </Link>

          <div className="flex items-center gap-2 mt-0.5 flex-shrink-0">
            {hasDiscount && (
              <span className="text-sm text-gray-300 line-through">
                {formatPrice(compareAt.amount, compareAt.currencyCode)}
              </span>
            )}
            <span className={`text-base ${hasDiscount ? "text-red-500" : "text-gray-400"}`}>
              {formatPrice(price.amount, price.currencyCode)}
            </span>
          </div>
        </div>

      </div>

      <span className="flex grow min-h-[20px]" />

      {/* CTA button */}
      <div>
        <Link href={productUrl}><Btn size="sm" disabled={allSoldOut}>View Product</Btn></Link>
      </div>
    </article>
  );
}
