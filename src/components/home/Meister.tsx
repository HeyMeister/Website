import Image from "next/image";
import { home } from "@/content/home";
import { photos } from "@/content/photos";
import { site } from "@/content/site";
import { publishedTeam } from "@/content/team";
import { Container, Eyebrow, sectionHeadingClass } from "@/components/ui/layout";

/** The master electrician behind it: name, role and, once approved, a sentence in his own words. */
export function Meister() {
  const m = home.meister;
  const leon = publishedTeam[0];
  if (!leon) return null;
  return (
    <section id="meister" aria-labelledby="meister-heading" className="pb-16 pt-24 sm:pb-20 lg:pb-24 lg:pt-[7.5rem]">
      <Container className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-12">
        <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-surface-2 lg:col-span-5">
          <Image src={photos.installation.src} alt={photos.installation.alt} fill sizes="(min-width: 1024px) 520px, 100vw" className="object-cover" />
        </div>
        <div className="lg:col-span-7">
          <Eyebrow>{m.eyebrow}</Eyebrow>
          <h2 id="meister-heading" className={sectionHeadingClass}>
            {m.title}
          </h2>
          {leon.quote && (
            <blockquote className="mt-8 border-l-4 border-accent pl-6 font-display text-heading font-bold leading-snug text-ink">
              „{leon.quote}“
            </blockquote>
          )}
          <p className="mt-6 text-ink">
            <span className="font-semibold">{leon.name}</span>
            <span className="text-ink-muted">, {leon.role}</span>
          </p>
          {site.trust.handwerksrolle && (
            <p className="mt-2 text-small text-ink-muted">
              Eingetragen in der Handwerksrolle der {site.trust.chamber}.
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
