import Link from "next/link";
import { home } from "@/content/home";
import { segments } from "@/content/segments";
import { ArrowRightIcon } from "@/components/icons";
import { Section } from "@/components/ui/layout";

/** For whom: four segments, each card links to its landing page. */
export function Segments() {
  const s = home.segments;
  return (
    <Section id="fuer-wen" tone="muted" eyebrow={s.eyebrow} title={s.title}>
      <ul className="grid gap-6 sm:grid-cols-2">
        {segments.map((seg) => (
          <li key={seg.slug} className="min-w-0">
            <Link
              href={`/${seg.slug}`}
              className="m-card group flex h-full flex-col justify-between gap-8 rounded-card border border-line bg-surface-raised p-6 hover:border-line-strong lg:p-8"
            >
              <span>
                <span className="block hyphens-auto break-words font-display text-heading font-bold text-ink">{seg.card.title}</span>
                <span className="mt-2 block text-ink-muted">{seg.card.text}</span>
              </span>
              <span className="inline-flex items-center gap-2 font-semibold text-accent-dark">
                Mehr erfahren
                <ArrowRightIcon className="m-arrow h-4 w-4" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
