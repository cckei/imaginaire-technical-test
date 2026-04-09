"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import Image from "next/image";

const HERO_CONTENT = {
  cta: "Shop the latest",
};

export default function Hero() {
  const imageRef = useRef<HTMLImageElement>(null);
  const rafId = useRef<number>(0);

  useEffect(() => {
    const multiplier = 0.5;
    const onScroll = () => {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        if (imageRef.current) {
          imageRef.current.style.transform = `translate3d(0, ${window.scrollY * multiplier}px, 0)`;
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <section className="hero-parallax h-[calc(100dvh-var(--header-height))] tablet:h-[80vw] tablet:min-h-[400px]">
      <Image ref={imageRef} src="/images/hero.jpg" alt="Hero Background" className="absolute top-0 left-0 w-full h-full object-cover" width={1000} height={1000} draggable={false} />
      <div className="hero-parallax__content">
        {HERO_CONTENT.cta && (
          <Link
            href="/collections"
            className="absolute bottom-8 right-[var(--spacing-gutter)] text-3xl text-white"
          >
            <span className="hero-parallax__cta">{HERO_CONTENT.cta}</span>
          </Link>
        )}
      </div>
    </section>
  );
}
