import Image from "next/image";
import Link from "next/link";
import { photos } from "@/content/photos";
import { segments, segmentsHub } from "@/content/segments";
import { pageMetadata } from "@/lib/seo";
import { ArrowRightIcon } from "@/components/icons";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/layout";

export const metadata = pageMetadata({ ...segmentsHub.seo, path: "/branchen" });

/** All segments with a photograph each. */
export default function BranchenPage() {
  const h = segmentsHub;
  return (
    <>
      <PageHero breadcrumbs={[{ label: "Branchen", href: "/branchen" }]} eyebrow={h.eyebrow} title={h.title} lead={h.lead} location="branchen" />
      <Section id="alle" tone="muted">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {segments.map((s) => {
            const photo = photos[s.visual === "logbook" ? "counter" : s.visual];
            return (
              <li key={s.slug} className="min-w-0">
                <Link
                  href={`/${s.slug}`}
                  className="m-card group flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface-raised hover:border-line-strong"
                >
                  <span className="m-zoom relative block aspect-[16/10] overflow-hidden bg-surface-2">
                    <Image src={photo.src} alt="" fill sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                  </span>
                  <span className="flex flex-1 flex-col justify-between gap-6 p-6">
                    <span>
                      <h2 className="hyphens-auto break-words font-display text-subheading font-bold text-ink">{s.card.title}</h2>
                      <span className="mt-2 block text-ink-muted">{s.card.text}</span>
                    </span>
                    <span className="inline-flex items-center gap-2 font-semibold text-accent-dark">
                      Mehr erfahren
                      <ArrowRightIcon className="m-arrow h-4 w-4" />
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Section>
      <CtaBand title="Ihre Branche ist nicht dabei?" text="Das Abo passt für jeden Betrieb mit Geräten und Anlagen. Sprechen wir 15 Minuten darüber." location="branchen-close" />
    </>
  );
}
