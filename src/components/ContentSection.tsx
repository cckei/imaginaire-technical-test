"use client";

import { IconPlus, IconMinus, IconChevronRight } from "@tabler/icons-react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
interface ContentSectionProps {
  heading?: string;
  body?: string;
  image?: string;
}

export default function ContentSection({
  heading = "Sanchez",
  body = "Every board in our collection is shaped by riders who live for the mountain. We partner with independent shapers and sustainable material suppliers to deliver gear that performs at the highest level — without compromise. Whether you're dropping into a steep chute or cruising groomers at golden hour, our boards are designed to amplify the way you ride.",
  image = "/images/content.jpg",
}: ContentSectionProps) {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="relative pt-[var(--spacing-section)]">
      <div className="bg-[#B9FF2E] absolute top-0 left-0 w-full h-[80%] z-[1]"></div>
      <div className="max-w-[80%] tablet:max-w-[100%] mx-auto px-[var(--spacing-gutter)] relative z-[2]">
        <div><h2 className="text-3xl text-center mb-[var(--spacing-section)]">The latest drop</h2></div>
        <div className="relative overflow-hidden">
          {/* heading */}
          <h3 className="absolute top-6 left-6 text-3xl tablet:text-2xl">{heading}</h3>
          {/* image */}
          <div>
            <Image src={image} alt={heading} width={1000} height={1000} className="object-cover block w-full" />
          </div>
          {/* content */}
          <div className={`absolute w-full h-auto max-h-[70%] overflow-y-auto pb-10 bottom-0 left-0 bg-black text-white z-[3] transition-transform duration-300 ease-in-out 
            ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>
            <p className="text-2xl p-6 leading-relaxed">{body}</p>
          </div>

          <button
            type="button"
            className={`tablet:hidden absolute bottom-6 right-6 flex h-16 w-16 items-center justify-center rounded-full z-[4] ${isOpen ? 'text-white' : 'text-black'}`}
            aria-label="View details"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <IconMinus size={48} stroke={2} /> : <IconPlus size={48} stroke={2} />}
          </button>

          <Link href="#"
            type="button"
            className="hidden tablet:flex absolute bottom-4 right-2 items-center justify-center rounded-full z-[4] text-black"
            aria-label="View details"
          >
            <IconChevronRight size={48} stroke={2} />
          </Link>
        </div>
      </div>
    </section>
  );
}
