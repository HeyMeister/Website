import { datenschutz } from "@/content/legal";
import { isLaunched } from "@/lib/env";
import { pageMetadata } from "@/lib/seo";
import { Fill } from "@/components/ui/Placeholder";
import { Container } from "@/components/ui/layout";

export const metadata = pageMetadata({ title: datenschutz.title, description: datenschutz.seoDescription, path: "/datenschutz" });

export default function DatenschutzPage() {
  return (
    <Container className="max-w-prose py-16 sm:py-20">
      <h1 className="text-4xl font-bold tracking-tight text-ink">{datenschutz.title}</h1>
      {!isLaunched && (
        <p className="mt-6 rounded-lg border-2 border-dashed border-placeholder bg-placeholder-soft p-4 text-sm font-semibold text-placeholder">
          {datenschutz.draftNotice}
        </p>
      )}
      <p className="mt-4 text-sm text-ink-muted">
        <Fill text={datenschutz.updated} />
      </p>
      {datenschutz.sections.map((s) => (
        <section key={s.heading} className="mt-10">
          <h2 className="text-xl font-semibold text-ink">{s.heading}</h2>
          <div className="mt-3 space-y-3 text-ink-muted">
            {s.paragraphs.map((p) => (
              <p key={p}>
                <Fill text={p} />
              </p>
            ))}
            {"list" in s && s.list && (
              <ul className="list-disc space-y-1 pl-5">
                {s.list.map((li) => (
                  <li key={li}>{li}</li>
                ))}
              </ul>
            )}
          </div>
        </section>
      ))}
    </Container>
  );
}
