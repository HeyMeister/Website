import Image from "next/image";
import { notFound } from "next/navigation";
import { guideBySlug, guides, guidesHub } from "@/content/guides";
import { photos } from "@/content/photos";
import { site } from "@/content/site";
import { formatDate } from "@/lib/format";
import { pageMetadata, siteUrl } from "@/lib/seo";
import { FAQ } from "@/components/sections/FAQ";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { RelatedGuides } from "@/components/seo/GuideLinks";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/layout";

/** Only the listed guides exist; every other slug is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = guideBySlug(slug);
  if (!g) return {};
  return pageMetadata({ title: g.seo.title, description: g.seo.description, keywords: g.seo.keywords, path: `/ratgeber/${g.slug}` });
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = guideBySlug(slug);
  if (!g) notFound();
  const photo = photos[g.photo];
  const url = `${siteUrl()}/ratgeber/${g.slug}`;
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: g.title,
          description: g.seo.description,
          dateModified: g.updated,
          image: `${siteUrl()}${photo.src}`,
          mainEntityOfPage: url,
          author: { "@type": "Organization", name: site.name },
          publisher: { "@type": "Organization", name: site.name },
          inLanguage: "de-DE",
        }}
      />
      <PageHero
        breadcrumbs={[
          { label: "Ratgeber", href: "/ratgeber" },
          { label: g.short, href: `/ratgeber/${g.slug}` },
        ]}
        eyebrow={`Aktualisiert am ${formatDate(g.updated)}`}
        title={g.title}
        lead={g.lead}
        location={`ratgeber-${g.slug}`}
        aside={
          <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-surface-2">
            <Image src={photo.src} alt={photo.alt} fill priority sizes="(min-width: 1024px) 520px, 100vw" className="object-cover" />
          </div>
        }
      />

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
          <article className="min-w-0 max-w-prose space-y-14 lg:col-span-8 lg:col-start-5">
            {g.sections.map((s, i) => (
              <section key={s.id} id={s.id} aria-labelledby={`${s.id}-heading`} className="scroll-mt-24">
                <p className="font-mono text-data text-accent-deep">{String(i + 1).padStart(2, "0")}</p>
                <h2 id={`${s.id}-heading`} className="mt-2 hyphens-auto break-words text-heading text-ink">
                  {s.title}
                </h2>
                {s.paragraphs.map((p) => (
                  <p key={p} className="mt-4 text-body text-ink">
                    {p}
                  </p>
                ))}
                {s.list && (
                  <ul className="mt-6 divide-y divide-line border-y border-line">
                    {s.list.map((l) => (
                      <li key={l.text} className="py-4">
                        {l.term && <span className="block font-semibold text-ink">{l.term}</span>}
                        <span className={l.term ? "mt-1 block text-ink-muted" : "block text-ink"}>{l.text}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {s.table && (
                  <div className="mt-6 overflow-x-auto rounded-card border border-line bg-surface-raised">
                    <table className="w-full min-w-[30rem] text-left text-small">
                      <caption className="sr-only">{s.table.caption}</caption>
                      <thead className="border-b border-line bg-surface-2">
                        <tr className="label text-ink">
                          {s.table.head.map((h) => (
                            <th key={h} scope="col" className="px-4 py-3 font-semibold">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {s.table.rows.map((row) => (
                          <tr key={row.join("|")} className="border-b border-line align-top last:border-b-0">
                            {row.map((cell, ci) =>
                              ci === 0 ? (
                                <th key={ci} scope="row" className="px-4 py-3 font-semibold text-ink">
                                  {cell}
                                </th>
                              ) : (
                                <td key={ci} className="px-4 py-3 text-ink">
                                  {cell}
                                </td>
                              ),
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {s.note && <p className="mt-6 rounded-control border border-line bg-surface-raised px-5 py-4 text-small text-ink">{s.note}</p>}
              </section>
            ))}
            {g.faq.length > 0 && (
              <section aria-labelledby="faq-heading">
                <h2 id="faq-heading" className="mb-6 text-heading text-ink">
                  Häufige Fragen
                </h2>
                <FAQ items={g.faq} disclaimer={guidesHub.disclaimer} />
              </section>
            )}
          </article>
        </Container>
      </div>

      <CtaBand title="Ein Anruf, und das Thema ist erledigt." text="Prüfung, Kleinreparaturen und Betriebsbuch zum festen Monatspreis pro Standort." location={`ratgeber-${g.slug}-close`} />
      <RelatedGuides slugs={g.related} title="Weiterlesen" />
    </>
  );
}
