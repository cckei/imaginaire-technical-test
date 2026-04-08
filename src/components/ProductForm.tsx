"use client";

import { useState, useMemo } from "react";
import { useCart } from "@/context/CartContext";
import Btn from "./Btn";

interface Variant {
  id: string;
  title: string;
  availableForSale: boolean;
  priceV2: { amount: string; currencyCode: string };
  selectedOptions: { name: string; value: string }[];
}

interface ProductFormProps {
  variants: Variant[];
  productId: string;
  productTitle: string;
  handle: string;
  image?: string;
}

function formatPrice(amount: string, currencyCode: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  }).format(parseFloat(amount));
}

export default function ProductForm({
  variants,
  productId,
  productTitle,
  handle,
  image,
}: ProductFormProps) {
  const { addItem } = useCart();

  // Group options by name  e.g. { Color: ["Ice","Dawn"], Size: ["S","M"] }
  const optionGroups = useMemo(() => {
    const groups: Record<string, string[]> = {};
    for (const v of variants) {
      for (const opt of v.selectedOptions) {
        if (opt.name === "Title" && opt.value === "Default Title") continue;
        if (!groups[opt.name]) groups[opt.name] = [];
        if (!groups[opt.name].includes(opt.value)) {
          groups[opt.name].push(opt.value);
        }
      }
    }
    return groups;
  }, [variants]);

  const optionNames = Object.keys(optionGroups);

  // Track selected value per option name
  const [selections, setSelections] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    for (const name of optionNames) {
      init[name] = optionGroups[name][0];
    }
    return init;
  });

  // Find matching variant
  const selectedVariant = useMemo(() => {
    if (optionNames.length === 0) return variants[0] ?? null;
    return (
      variants.find((v) =>
        optionNames.every((name) =>
          v.selectedOptions.some(
            (o) => o.name === name && o.value === selections[name]
          )
        )
      ) ?? null
    );
  }, [variants, selections, optionNames]);

  const handleSelect = (name: string, value: string) => {
    setSelections((prev) => ({ ...prev, [name]: value }));
  };

  const isAvailable = selectedVariant?.availableForSale ?? false;

  const handleAddToCart = () => {
    if (!selectedVariant || !isAvailable) return;
    addItem({
      variantId: selectedVariant.id,
      productId,
      title: productTitle,
      variantTitle: selectedVariant.title,
      price: parseFloat(selectedVariant.priceV2.amount),
      currencyCode: selectedVariant.priceV2.currencyCode,
      image,
      handle,
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Option selectors */}
      {optionNames.map((name) => (
        <div key={name}>
          <p className="text-sm font-medium mb-2">
            {name}: <span className="font-normal text-gray-500">{selections[name]}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {optionGroups[name].map((value) => {
              const isSelected = selections[name] === value;
              const isOptionAvailable = variants.some(
                (v) =>
                  v.availableForSale &&
                  v.selectedOptions.some(
                    (o) => o.name === name && o.value === value
                  )
              );
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleSelect(name, value)}
                  disabled={!isOptionAvailable}
                  className={`px-4 py-2 text-sm rounded border-2 transition-all ${
                    isSelected
                      ? "border-black bg-black text-white"
                      : isOptionAvailable
                      ? "border-gray-200 text-gray-700 supports-hover:hover:border-gray-400"
                      : "border-gray-100 text-gray-300 line-through cursor-not-allowed"
                  }`}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Add to cart */}
      <div onClick={handleAddToCart}>
        <Btn size="md" disabled={!isAvailable}>
          {isAvailable ? "Add to Cart" : "Sold Out"}
        </Btn>
      </div>
    </div>
  );
}
