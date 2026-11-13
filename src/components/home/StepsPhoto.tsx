import Image from "next/image";
import { home } from "@/content/home";
import { photos } from "@/content/photos";
import { Container, Eyebrow, sectionHeadingClass } from "@/components/ui/layout";

/** How it runs: four steps as rows beside a photograph of a distribution board. */
export function StepsPhoto() {
  const s = home.steps;
  return (
    <section id="ablauf" aria-labelledby="ablauf-heading" className="pb-16 pt-24 sm:pb-20 lg:min-h-[100svh] lg:pb-24 lg:pt-[7.5rem]">
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <Eyebrow>{s.eyebrow}</Eyebrow>
          <h2 id="ablauf-heading" className={sectionHeadingClass}>
            {s.title}
          </h2>
          <ol className="mt-10 border-t border-line">
            {s.items.map((step, i) => (
              <li key={step.title} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-line py-5 sm:grid-cols-[4rem_1fr]">
                <span className="font-mono text-subheading text-accent-dark">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className="block font-display text-subheading font-bold text-ink">{step.title}</span>
                  <span className="mt-1 block max-w-prose text-ink-muted">{step.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-surface-2 lg:col-span-5 lg:aspect-auto lg:min-h-[36rem]">
          <Image
            src={photos.steps.src}
            alt={photos.steps.alt}
            fill
            sizes="(min-width: 1024px) 600px, 100vw"
            className="object-cover object-center"
          />
        </div>
      </Container>
    </section>
  );
}
