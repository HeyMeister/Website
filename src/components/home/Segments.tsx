import Image from "next/image";
import Link from "next/link";
import { home } from "@/content/home";
import { photos } from "@/content/photos";
import { segments } from "@/content/segments";
import { ArrowRightIcon } from "@/components/icons";
import { Section } from "@/components/ui/layout";

/** For whom: the four main segments with a photograph each, and the way to all branches. */
export function Segments() {
  const s = home.segments;
  const featured = segments.filter((seg) => seg.featured);
  const more = segments.filter((seg) => !seg.featured);
  return (
    <Section id="fuer-wen" tone="muted" eyebrow={s.eyebrow} title={s.title}>
      <ul className="grid gap-6 sm:grid-cols-2">
        {featured.map((seg) => {
          const photo = photos[seg.visual === "logbook" ? "counter" : seg.visual];
          return (
            <li key={seg.slug} className="min-w-0">
              <Link
                href={`/${seg.slug}`}
                className="m-card group grid h-full overflow-hidden rounded-card border border-line bg-surface-raised hover:border-line-strong sm:grid-cols-[2fr_3fr]"
              >
                <span className="m-zoom relative block aspect-[16/9] overflow-hidden bg-surface-2 sm:aspect-auto">
                  <Image src={photo.src} alt="" fill sizes="(min-width: 1024px) 240px, (min-width: 640px) 20vw, 100vw" className="object-cover" />
                </span>
                <span className="flex flex-col justify-between gap-6 p-6">
                  <span>
                    <span className="block hyphens-auto break-words font-display text-subheading font-bold text-ink">{seg.card.title}</span>
                    <span className="mt-2 block text-ink-muted">{seg.card.text}</span>
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
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
        <span className="text-small font-semibold text-ink">Außerdem:</span>
        <ul className="flex flex-wrap gap-2">
          {more.map((seg) => (
            <li key={seg.slug}>
              <Link href={`/${seg.slug}`} className="inline-flex min-h-[44px] items-center rounded-full border border-line-strong bg-surface-raised px-4 text-small font-semibold text-ink hover:border-base">
                {seg.card.title}
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/branchen" className="m-link inline-flex items-center gap-2 font-semibold text-accent-dark">
          Alle Branchen
          <ArrowRightIcon className="m-arrow h-4 w-4" />
        </Link>
      </div>
    </Section>
  );
}
