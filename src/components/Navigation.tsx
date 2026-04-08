"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Our Products", href: "/products" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

const SECONDARY_LINKS = [
  { label: "Search", href: "/search" },
  { label: "Cart", href: "/cart" },
];

function MenuIcon({ open }: { open: boolean }) {
  return (
    <>
      <span className={`relative menu-icon ${open ? "open" : ""}`}>
        <span className="line line-top"></span>
        <span className="line line-mid"></span>
        <span className="line line-btm"></span>
      </span>
    </>
  );
}

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 left-0 w-full z-[100] bg-white">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-[var(--header-height)]">
          <button
            type="button"
            className="hidden tablet:inline-flex z-[103] fixed"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((o) => !o)}
          >
            <MenuIcon open={mobileOpen} />
          </button>

          <nav className="flex gap-6 tablet:hidden" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="link-hover">
                {link.label}
              </Link>
            ))}
          </nav>

          <nav className="flex gap-6 tablet:hidden" aria-label="Secondary">
            {SECONDARY_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="link-hover">
                {link.label}
              </Link>
            ))}
          </nav>

          <span className="hidden tablet:block w-10 flex-shrink-0" aria-hidden />
        </div>
      </div>

      <Link href="/" className="logo absolute left-[50%] translate-x-[-50%] top-0 h-full py-5 pointer-events-auto">
        <Image src="/images/logo.svg" alt="Logo" width={160} height={160} className="w-auto h-full" />
      </Link>

      <div className="hidden tablet:block">
        <button
          type="button"
          aria-label="Close menu"
          className={`fixed inset-0 z-[101] bg-black/40 transition-opacity duration-300 ease-out ${
            mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={closeMobile}
        />

        <aside
          id="mobile-nav"
          className={`fixed top-0 left-0 z-[102] h-full w-[min(100%,18rem)] max-w-[85vw] bg-white shadow-lg transition-transform duration-300 ease-out ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          aria-hidden={!mobileOpen}
        >
          <div className="flex flex-col pt-[calc(var(--header-height)+0.5rem)] px-5 pb-8 gap-1">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Menu</p>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-3 text-base border-b border-gray-100 last:border-0"
                onClick={closeMobile}
              >
                {link.label}
              </Link>
            ))}
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mt-6 mb-2">
              More
            </p>
            {SECONDARY_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-3 text-base border-b border-gray-100 last:border-0"
                onClick={closeMobile}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </header>
  );
}
