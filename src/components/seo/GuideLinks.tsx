import Image from "next/image";
import Link from "next/link";
import { guideBySlug, type Guide } from "@/content/guides";
import { photos } from "@/content/photos";
import { ArrowRightIcon } from "@/components/icons";
import { Container, Eyebrow } from "@/components/ui/layout";

/** One guide as a card with photo, title and teaser. */
export function GuideCard({ guide, headingLevel = 3 }: { guide: Guide; headingLevel?: 2 | 3 }) {
  const photo = photos[guide.photo];
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <Link
      href={`/ratgeber/${guide.slug}`}
      className="m-card group flex h-full min-w-0 flex-col overflow-hidden rounded-card border border-line bg-surface-raised hover:border-line-strong"
    >
      <span className="m-zoom relative block aspect-[16/9] overflow-hidden bg-surface-2">
        <Image src={photo.src} alt="" fill sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw" className="object-cover" />
      </span>
      <span className="flex flex-1 flex-col justify-between gap-4 p-6">
        <span>
          <H className="hyphens-auto break-words font-display text-subheading font-bold text-ink">{guide.short}</H>
          <span className="mt-2 block text-ink-muted">{guide.teaser}</span>
        </span>
        <span className="inline-flex items-center gap-2 font-semibold text-accent-dark">
          Weiterlesen
          <ArrowRightIcon className="m-arrow h-4 w-4" />
        </span>
      </span>
    </Link>
  );
}

/** "Mehr wissen": up to three related guides, used on service, segment and guide pages. */
export function RelatedGuides({ slugs, title = "Mehr wissen", tone = "light" }: { slugs: string[]; title?: string; tone?: "light" | "muted" }) {
  const items = slugs
    .map(guideBySlug)
    .filter((g): g is Guide => !!g)
    .slice(0, 3);
  if (items.length === 0) return null;
  return (
    <section aria-labelledby="ratgeber-links-heading" className={`py-16 sm:py-20 ${tone === "muted" ? "bg-surface-2" : ""}`}>
      <Container>
        <Eyebrow tone={tone}>Ratgeber</Eyebrow>
        <h2 id="ratgeber-links-heading" className="mb-8 text-heading text-ink">
          {title}
        </h2>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((g) => (
            <li key={g.slug} className="min-w-0">
              <GuideCard guide={g} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
