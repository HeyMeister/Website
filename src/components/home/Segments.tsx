import Image from "next/image";
import { home } from "@/content/home";
import { photos } from "@/content/photos";
import { Container, Eyebrow, sectionHeadingClass } from "@/components/ui/layout";

/** Who it is for: three audiences as rows, a photograph of an installation beside them. */
export function Segments() {
  const s = home.segments;
  return (
    <section
      id="fuer-wen"
      aria-labelledby="fuer-wen-heading"
      className="bg-surface-2 pb-16 pt-24 sm:pb-20 lg:min-h-[100svh] lg:pb-24 lg:pt-[7.5rem]"
    >
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <Eyebrow tone="muted">{s.eyebrow}</Eyebrow>
          <h2 id="fuer-wen-heading" className={sectionHeadingClass}>
            {s.title}
          </h2>
          <ul className="mt-10 border-t border-line-strong">
            {s.items.map((item) => (
              <li key={item.title} className="grid gap-2 border-b border-line-strong py-6 sm:grid-cols-[14rem_1fr] sm:gap-8">
                <span>
                  <span className="block font-display text-subheading font-bold text-ink">{item.title}</span>
                  <span className="mt-1 block text-small text-ink-muted">{item.audience}</span>
                </span>
                <span className="text-ink sm:pt-1">{item.benefit}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-surface-raised lg:col-span-5 lg:aspect-auto lg:min-h-[34rem]">
          <Image
            src={photos.installation.src}
            alt={photos.installation.alt}
            fill
            sizes="(min-width: 1024px) 760px, 100vw"
            className="object-cover object-[62%_50%]"
          />
        </div>
      </Container>
    </section>
  );
}
