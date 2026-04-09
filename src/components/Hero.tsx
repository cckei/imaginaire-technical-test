"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";

const HERO_CONTENT = {
  heading: "Ride the Mountain.",
  body: "Own the moment with boards built for control, speed, and style.",
  cta: "Shop the latest",
};

export default function Hero() {
  const [heroPosition, setHeroPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const multiplier = 0.42;
      setHeroPosition(scrollY * multiplier);
    };
    const scrollOpts: AddEventListenerOptions = { passive: true };
    window.addEventListener("scroll", handleScroll, scrollOpts);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll, scrollOpts);
  }, []);

  return (
    <section className="hero-parallax h-[calc(100dvh-var(--header-height))] tablet:h-[80vw] tablet:min-h-[400px]">
      <Image src="/images/hero.jpg" alt="Hero Background" className="absolute top-0 left-0 w-full h-full object-cover" width={1000} height={1000} style={{ transform: `translate3d(0, ${heroPosition}px, 0)` }} draggable={false} />
      <div className="hero-parallax__content">
        <div className="absolute left-[var(--spacing-gutter)] top-6 max-w-[42rem] text-white">
          {/* <h1 className="text-5xl tracking-tight">{HERO_CONTENT.heading}</h1>
          <p className="mt-4 text-2xl text-white/90">{HERO_CONTENT.body}</p> */}
        </div>
        {HERO_CONTENT.cta && (
          <Link
            href="/shop"
            className="absolute bottom-8 right-[var(--spacing-gutter)] text-3xl text-white"
          >
            <span className="hero-parallax__cta">{HERO_CONTENT.cta}</span>
          </Link>
        )}
      </div>
    </section>
  );
}
