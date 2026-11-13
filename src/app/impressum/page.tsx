import { impressum, operator } from "@/content/legal";
import { pageMetadata } from "@/lib/seo";
import { Fill } from "@/components/ui/Placeholder";
import { Container } from "@/components/ui/layout";
import type { ReactNode } from "react";

export const metadata = pageMetadata({ title: impressum.title, description: impressum.seoDescription, path: "/impressum" });

function Block({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold text-ink">{heading}</h2>
      <div className="mt-3 space-y-1 text-ink-muted">{children}</div>
    </section>
  );
}

export default function ImpressumPage() {
  const o = operator;
  return (
    <Container className="max-w-prose py-16 sm:py-20">
      <h1 className="text-4xl font-bold tracking-tight text-ink">{impressum.title}</h1>
      <p className="mt-2 text-sm text-ink-muted">Angaben gemäß § 5 DDG</p>

      <Block heading="Anbieter">
        <p>
          <Fill text={`${o.company} ${o.legalForm}`} />
        </p>
        <p>
          <Fill text={o.street} />
        </p>
        <p>
          <Fill text={`${o.zip} ${o.city}`} />
        </p>
      </Block>

      <Block heading="Vertreten durch">
        <p>
          <Fill text={o.representatives} />
        </p>
      </Block>

      <Block heading="Kontakt">
        <p>
          Telefon: <Fill text={o.phone} />
        </p>
        <p>
          E-Mail: <Fill text={o.email} />
        </p>
      </Block>

      {(o.registerCourt || o.registerNumber) && (
        <Block heading="Registereintrag">
          <p>
            Registergericht: <Fill text={o.registerCourt} />
          </p>
          <p>
            Registernummer: <Fill text={o.registerNumber} />
          </p>
        </Block>
      )}

      {o.vatId && (
        <Block heading="Umsatzsteuer-Identifikationsnummer">
          <p>
            gemäß § 27a Umsatzsteuergesetz: <Fill text={o.vatId} />
          </p>
        </Block>
      )}

      <Block heading="Angaben für Handwerksbetriebe">
        <p>
          Zuständige Kammer: <Fill text={o.chamber} />
        </p>
        <p>
          Eintragung in die Handwerksrolle der zuständigen Handwerkskammer.
        </p>
        <p>
          Gesetzliche Berufsbezeichnung: <Fill text={o.professionalTitle} />
        </p>
        <p>
          Berufsrechtliche Regelungen: <Fill text={o.professionalRules} />
        </p>
      </Block>

      <Block heading="Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV">
        <p>
          <Fill text={o.contentResponsible} />
        </p>
      </Block>

      <Block heading="Verbraucherstreitbeilegung">
        {impressum.disputeResolution.map((p) => (
          <p key={p}>
            <Fill text={p} />
          </p>
        ))}
      </Block>
    </Container>
  );
}
