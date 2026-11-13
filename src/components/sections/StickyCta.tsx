"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PhoneIcon } from "@/components/icons";
import { ButtonArrow, buttonClass } from "@/components/ui/Button";

/**
 * Mobile-only bar at the bottom of the viewport. Shown once the hero has scrolled out of view
 * and hidden again as soon as the contact section (#kontakt) reaches the viewport, so it never
 * covers the form or the footer. Hidden bars are `inert`, so they cannot receive focus.
 */
export function StickyCta({ href, label, tel }: { href: string; label: string; tel: string | null }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const contact = document.getElementById("kontakt");
    let frame = 0;
    const update = () => {
      frame = 0;
      const pastHero = hero ? hero.getBoundingClientRect().bottom < 0 : window.scrollY > 600;
      const contactReached = contact ? contact.getBoundingClientRect().top < window.innerHeight : false;
      setVisible(pastHero && !contactReached);
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
    };
  }, []);

  return (
    <div
      inert={!visible}
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur transition-transform duration-200 motion-reduce:transition-none sm:px-6 lg:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-content gap-3">
        {tel && (
          <a
            href={tel}
            className={buttonClass("secondary", "lg", "shrink-0 px-4")}
            aria-label="Anrufen"
          >
            <PhoneIcon />
          </a>
        )}
        <Link
          href={href}
          data-track="cta_offer_click"
          data-track-location="sticky"
          className={buttonClass("primary", "lg", "flex-1")}
        >
          {label}
          <ButtonArrow />
        </Link>
      </div>
    </div>
  );
}
