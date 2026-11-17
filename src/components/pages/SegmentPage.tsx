import Image from "next/image";
import { photos } from "@/content/photos";
import type { Segment } from "@/content/segments";
import { CheckIcon } from "@/components/icons";
import { FAQ } from "@/components/sections/FAQ";
import { CtaBand } from "@/components/sections/CtaBand";
import { LogbookScreen } from "@/components/sections/LogbookMockup";
import { PageHero } from "@/components/ui/PageHero";
import { Container, Eyebrow, Section, sectionHeadingClass } from "@/components/ui/layout";
import { ExampleQuote } from "./ExampleQuote";

const heroVisual: Record<Segment["slug"], "devices" | "installation" | "steps" | "logbook"> = {
  "fuer-praxen": "devices",
  "fuer-autohaeuser": "installation",
  "fuer-filialisten": "logbook",
  "fuer-hausverwaltungen": "steps",
};

function Visual({ slug }: { slug: Segment["slug"] }) {
  const v = heroVisual[slug];
  if (v === "logbook") return <LogbookScreen />;
  const photo = photos[v];
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-surface-2">
      <Image src={photo.src} alt={photo.alt} fill priority sizes="(min-width: 1024px) 520px, 100vw" className="object-cover" />
    </div>
  );
}

/** Segment landing page: hero → 3 pain points → solution → example calculation → 3 FAQ → CTA. */
export function SegmentPage({ segment }: { segment: Segment }) {
  return (
    <>
      <PageHero eyebrow={segment.eyebrow} title={segment.title} lead={segment.lead} aside={<Visual slug={segment.slug} />} location={segment.slug} />

      <Section id="kennen-sie-das" tone="muted" eyebrow="Kennen Sie das?" title="Drei Dinge, die Zeit kosten.">
        <ol className="grid gap-6 md:grid-cols-3">
          {segment.pains.map((p, i) => (
            <li key={p.title} className="rounded-card border border-line bg-surface-raised p-6">
              <span className="font-mono text-data text-accent-deep">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-subheading text-ink">{p.title}</h3>
              <p className="mt-2 text-ink-muted">{p.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <section id="loesung" aria-labelledby="loesung-heading" className="pb-16 pt-24 sm:pb-20 lg:pb-24 lg:pt-[7.5rem]">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <Eyebrow>Die Lösung</Eyebrow>
            <h2 id="loesung-heading" className={sectionHeadingClass}>
              {segment.solution.title}
            </h2>
            <ul className="mt-10 border-t border-line">
              {segment.solution.items.map((s) => (
                <li key={s.title} className="flex gap-4 border-b border-line py-5">
                  <CheckIcon className="mt-1 h-5 w-5 shrink-0 text-accent-dark" strokeWidth={2.6} />
                  <span>
                    <span className="block font-display text-subheading font-bold text-ink">{s.title}</span>
                    <span className="mt-1 block text-ink-muted">{s.text}</span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-small text-ink-muted">
              Im Abo: Geräte- und Anlagenprüfung, Kleinreparaturen, digitales Betriebsbuch und eine feste Ansprechperson.
            </p>
          </div>
          <div className="min-w-0 lg:col-span-5 lg:col-start-8 lg:pt-16">
            <ExampleQuote example={segment.example} />
          </div>
        </Container>
      </section>

      <Section id="faq" tone="muted" layout="split" eyebrow="Häufige Fragen" title="Kurz beantwortet.">
        <FAQ items={segment.faq} disclaimer="Diese Antworten sind allgemeine Hinweise und keine Rechtsberatung." />
      </Section>

      <CtaBand title="Ein Anruf. Danach ist Elektro nicht mehr Ihr Thema." text="15 Minuten am Telefon: Standorte, Geräte, letzte Prüfung. Sie bekommen eine ehrliche Einschätzung und ein festes Angebot." location={`${segment.slug}-close`} />
    </>
  );
}
