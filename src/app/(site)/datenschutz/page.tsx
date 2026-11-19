import { datenschutz, type LegalParagraph } from "@/content/legal";
import { dataFeatures } from "@/lib/env";
import { operatorAddress, operatorName } from "@/lib/operator";
import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/layout";

export const metadata = pageMetadata({ title: datenschutz.title, description: datenschutz.seoDescription, path: "/datenschutz" });

const applies = (when?: keyof typeof dataFeatures) => !when || dataFeatures[when];

function text(p: LegalParagraph): string | null {
  if (typeof p !== "string") return applies(p.when) ? p.text : null;
  if (!p.includes("{VERANTWORTLICHER}")) return p;
  const address = operatorAddress();
  return p.replace("{VERANTWORTLICHER}", address ? `${operatorName()}, ${address.street}, ${address.cityLine}` : operatorName());
}

export default function DatenschutzPage() {
  const sections = datenschutz.sections.filter((s) => applies("when" in s ? s.when : undefined));
  return (
    <Container className="max-w-prose py-16 sm:py-20">
      <h1 className="text-heading lg:text-display-l text-ink">{datenschutz.title}</h1>
      <p className="mt-4 text-small text-ink-muted">{datenschutz.updated}</p>
      {sections.map((s, i) => (
        <section key={s.heading} className="mt-10">
          <h2 className="text-subheading text-ink">
            {i + 1}. {s.heading}
          </h2>
          <div className="mt-3 space-y-3 text-ink-muted">
            {s.paragraphs.map(text).map((p) => (p ? <p key={p}>{p}</p> : null))}
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
