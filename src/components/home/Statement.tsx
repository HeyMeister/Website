"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Container } from "@/components/ui/layout";

/**
 * Statement moment (tasteskill "word-highlight", ported from assets/moments/word-highlight):
 * each word rests at half ink (about 4:1, readable) and turns to ink as the statement crosses
 * the middle of the screen; the <strong> word turns coral. Scrubbed to the scroll position, so it
 * runs back on the way up. Reduced motion or no script: the whole statement in ink (CSS).
 */
export function Statement({
  eyebrow,
  before,
  strong,
  signature,
  portrait,
}: {
  eyebrow: string;
  before: string;
  strong: string;
  signature?: string;
  /** The person behind the promise, shown beside the statement. */
  portrait?: { src: string; width: number; height: number; alt: string };
}) {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const text = textRef.current;
    if (!text) return;
    const words = Array.from(text.querySelectorAll<HTMLElement>(".mo-w"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      words.forEach((w) => w.classList.add("is-on"));
      return;
    }
    // Before the script runs every word is ink; from here on the scroll decides.
    text.classList.add("mo-wh");
    const from = 0.85;
    const to = 0.45;
    let shown = -1;
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = text.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * from;
      const end = vh * to;
      const t = Math.min(1, Math.max(0, (start - r.top) / Math.max(1, start - end + r.height)));
      const atEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      const k = atEnd ? words.length : Math.round(t * words.length);
      if (k === shown) return;
      shown = k;
      words.forEach((w, i) => w.classList.toggle("is-on", i < k));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
      text.classList.remove("mo-wh");
    };
  }, []);

  const split = (s: string) =>
    s.split(" ").map((w, i, arr) => (
      <span key={`${w}-${i}`}>
        <span className="mo-w">{w}</span>
        {i < arr.length - 1 ? " " : ""}
      </span>
    ));

  return (
    <section
      id="versprechen"
      aria-labelledby="versprechen-heading"
      data-moment="word-highlight"
      className="min-h-[100svh] bg-surface pb-16 pt-24 sm:pb-20 lg:pb-24 lg:pt-[7.5rem]"
    >
      <Container className={portrait ? "grid gap-10 lg:grid-cols-12 lg:gap-12" : ""}>
        <div className={portrait ? "lg:col-span-8" : ""}>
        <p className="label mb-6 text-accent-dark">{eyebrow}</p>
        <h2 id="versprechen-heading" ref={textRef} className="max-w-[24ch] font-display text-[2rem] font-bold leading-[1.16] tracking-[-0.02em] text-ink sm:text-[2.75rem] lg:max-w-[24ch] lg:text-[3.25rem]">
          {split(before)} <strong className="font-bold">{split(strong)}</strong>
        </h2>
        {signature && <p className="mt-8 text-small font-semibold text-ink-muted">{signature}</p>}
        </div>
        {portrait && (
          <div className="relative aspect-[4/5] w-full max-w-[17rem] overflow-hidden rounded-card bg-surface-2 lg:col-span-3 lg:col-start-10 lg:mt-12 lg:max-w-none">
            <Image src={portrait.src} alt={portrait.alt} fill sizes="(min-width: 1024px) 280px, 272px" className="object-cover object-top" />
          </div>
        )}
      </Container>
    </section>
  );
}
