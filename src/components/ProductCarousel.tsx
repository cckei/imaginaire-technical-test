"use client";

import { useCallback, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";

import type { ShopifyProduct } from "@/lib/types";
import ProductCard from "./ProductCard";

function updateNavState(swiper: SwiperType) {
  return {
    canPrev: !swiper.isBeginning,
    canNext: !swiper.isEnd,
  };
}

export default function ProductCarousel({
  products,
}: {
  products: ShopifyProduct[];
}) {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const onSwiperInit = useCallback((instance: SwiperType) => {
    setSwiper(instance);
    const nav = updateNavState(instance);
    setCanPrev(nav.canPrev);
    setCanNext(nav.canNext);
  }, []);

  const onSlideChange = useCallback((instance: SwiperType) => {
    const nav = updateNavState(instance);
    setCanPrev(nav.canPrev);
    setCanNext(nav.canNext);
  }, []);

  const onBreakpoint = useCallback((instance: SwiperType) => {
    instance.update();
    const nav = updateNavState(instance);
    setCanPrev(nav.canPrev);
    setCanNext(nav.canNext);
  }, []);

  return (
    <section className="relative mb-20 tablet:mb-0 tablet:mt-10">
      <div className="container">

        <div className="flex flex-col tablet:flex-col-reverse">
        <div className="tablet:sticky tablet:top-auto tablet:bottom-0 z-30 bg-white py-10 tablet:pb-6 tablet:pt-10">
            <div className="flex items-end justify-between tablet:flex-col tablet:gap-4 tablet:items-start">
              <div>
                <h2 className="text-3xl mb-2 tablet:text-xl">Snowboards</h2>
                <p className="text-lg text-gray-500 tablet:text-base">
                  See our latest snowboards, in stock and ready to ship UK wide
                </p>
              </div>
              <a href="/collections" className="text-xl link-hover tablet:text-base tablet:self-end">
                View more
              </a>
            </div>
          </div>
          <div className="relative">
            <Swiper
              onSwiper={onSwiperInit}
              onSlideChange={onSlideChange}
              onBreakpoint={onBreakpoint}
              onResize={(instance) => {
                const nav = updateNavState(instance);
                setCanPrev(nav.canPrev);
                setCanNext(nav.canNext);
              }}
              watchOverflow
              spaceBetween={24}
              slidesPerView={1.15}
              breakpoints={{
                721: {
                  slidesPerView: 2.15,
                  spaceBetween: 16,
                },
                1025: {
                  slidesPerView: 3.7,
                  spaceBetween: 30,
                },
                1361: {
                  slidesPerView: 3.7,
                  spaceBetween: 60,
                },
              }}
              className="w-full"
            >
              {products.map((product) => (
                <SwiperSlide key={product.id} className="!h-auto">
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}
            </Swiper>


            {/* Navigation buttons */}
            {/* <div className="mt-4 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => swiper?.slidePrev()}
                disabled={!canPrev}
                aria-label="Previous products"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 transition-colors supports-hover:hover:bg-gray-100 disabled:opacity-30"
              >
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
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => swiper?.slideNext()}
                disabled={!canNext}
                aria-label="Next products"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 transition-colors supports-hover:hover:bg-gray-100 disabled:opacity-30"
              >
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
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
