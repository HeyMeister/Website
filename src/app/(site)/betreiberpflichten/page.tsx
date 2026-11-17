import Link from "next/link";
import { guide } from "@/content/pages";
import { pageMetadata } from "@/lib/seo";
import { ArrowRightIcon } from "@/components/icons";
import { CtaBand } from "@/components/sections/CtaBand";
import { InspectionIntervals } from "@/components/sections/InspectionIntervals";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/layout";

export const metadata = pageMetadata({ title: guide.seo.title, description: guide.seo.description, keywords: [...guide.seo.keywords], path: "/betreiberpflichten" });

/** Guide: who is responsible and what that means. Sober, no fear, no legal advice. */
export default function BetreiberpflichtenPage() {
  const g = guide;
  const fristenIndex = g.sections.findIndex((s) => s.id === "fristen");
  return (
    <>
      <PageHero eyebrow={g.eyebrow} title={g.title} lead={g.intro} location="ratgeber" />

      <div className="bg-surface-2 py-16 sm:py-20 lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-12">
          <nav aria-label="Inhalt" className="lg:col-span-3">
            <div className="lg:sticky lg:top-24">
              <p className="label mb-3 text-accent-deep">Inhalt</p>
              <ol className="space-y-2 text-small">
                {g.sections.map((s, i) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="m-link text-ink-muted hover:text-ink">
                      {i + 1}. {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>
          <div className="max-w-prose space-y-14 lg:col-span-8 lg:col-start-5">
            {g.sections.map((s, i) => (
              <section key={s.id} id={s.id} aria-labelledby={`${s.id}-heading`} className="scroll-mt-24">
                <p className="font-mono text-data text-accent-deep">{String(i + 1).padStart(2, "0")}</p>
                <h2 id={`${s.id}-heading`} className="mt-2 text-heading text-ink">
                  {s.title}
                </h2>
                {s.paragraphs.map((para) => (
                  <p key={para} className="mt-4 text-body text-ink">
                    {para}
                  </p>
                ))}
                {"list" in s && s.list && (
                  <dl className="mt-6 divide-y divide-line border-y border-line">
                    {s.list.map((l) => (
                      <div key={l.term} className="py-4">
                        <dt className="font-semibold text-ink">{l.term}</dt>
                        <dd className="mt-1 text-ink-muted">{l.text}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                {i === fristenIndex && (
                  <p className="mt-4">
                    <a href="#fristen" className="m-link inline-flex items-center gap-2 font-semibold text-accent-dark">
                      Zur Übersicht der Richtwerte
                      <ArrowRightIcon className="m-arrow h-4 w-4" />
                    </a>
                  </p>
                )}
                {"cta" in s && s.cta && (
                  <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-ink">
                    {s.cta.text}
                    <Link href={s.cta.href} className="m-link inline-flex items-center gap-2 font-semibold text-accent-dark">
                      {s.cta.label}
                      <ArrowRightIcon className="m-arrow h-4 w-4" />
                    </Link>
                  </p>
                )}
              </section>
            ))}
            <p role="note" className="rounded-control border border-line bg-surface-raised px-5 py-4 text-small text-ink">
              {g.notice}
            </p>
          </div>
        </Container>
      </div>

      <InspectionIntervals tone="light" />
      <CtaBand title={g.close.title} text={g.close.text} location="ratgeber-close" />
    </>
  );
}
