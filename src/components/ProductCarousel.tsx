"use client";

import { useRef, useState, useEffect } from "react";
import type { ShopifyProduct } from "@/lib/types";
import ProductCard from "./ProductCard";

export default function ProductCarousel({
  products,
}: {
  products: ShopifyProduct[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Track sticky state — the header bar should stick to viewport bottom while scrolling through the section
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(entry.isIntersecting && entry.intersectionRatio < 1);
      },
      { threshold: [0, 0.1, 0.5, 1] }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Track scroll position for mobile slider arrows
  function updateScrollButtons() {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollButtons();
    el.addEventListener("scroll", updateScrollButtons, { passive: true });
    return () => el.removeEventListener("scroll", updateScrollButtons);
  }, []);

  function scroll(direction: "left" | "right") {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector("article")?.offsetWidth ?? 300;
    el.scrollBy({
      left: direction === "left" ? -cardWidth - 16 : cardWidth + 16,
      behavior: "smooth",
    });
  }

  return (
    <section ref={sectionRef} className="relative py-16 mobile:py-10">
      {/* Section header — sticky to bottom of viewport on scroll */}
      <div
        ref={stickyRef}
        className={`sticky bottom-0 z-30 bg-white/95 backdrop-blur-sm transition-shadow ${
          isSticky ? "shadow-[0_-2px_10px_rgba(0,0,0,0.05)]" : ""
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5">
          <h2 className="text-2xl font-bold tracking-tight mobile:text-xl">
            Featured Products
          </h2>
          <a
            href="/collections"
            className="inline-flex items-center gap-1 text-sm font-medium text-gray-900 transition-colors supports-hover:hover:text-gray-600"
          >
            View All
            <svg
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Product grid (desktop) / slider (mobile) */}
      <div className="mx-auto max-w-[1400px] px-6 pt-2">
        {/* Desktop: static grid */}
        <div className="hidden desktop:grid desktop:grid-cols-4 desktop:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Mobile/tablet: horizontal slider */}
        <div className="desktop:hidden relative">
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 scrollbar-hide"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="w-[72vw] flex-shrink-0 snap-start tablet:w-[45vw]"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Slider arrows */}
          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="Previous products"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 transition-colors supports-hover:hover:bg-gray-100 disabled:opacity-30"
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label="Next products"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 transition-colors supports-hover:hover:bg-gray-100 disabled:opacity-30"
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
