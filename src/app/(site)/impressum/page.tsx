import type { ReactNode } from "react";
import { impressum, operator } from "@/content/legal";
import { site } from "@/content/site";
import { known, operatorAddress, operatorName } from "@/lib/operator";
import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/layout";

export const metadata = pageMetadata({ title: impressum.title, description: impressum.seoDescription, path: "/impressum" });

function Block({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-subheading text-ink">{heading}</h2>
      <div className="mt-3 space-y-1 text-ink-muted">{children}</div>
    </section>
  );
}

/**
 * Impressum. Operator values that are still [PLACEHOLDERS] in content/legal.ts are left out;
 * the launch check blocks PUBLIC_LAUNCH=true until all of them are filled in.
 */
export default function ImpressumPage() {
  const o = operator;
  const address = operatorAddress();
  const representatives = known(o.representatives);
  const registerCourt = known(o.registerCourt);
  const registerNumber = known(o.registerNumber);
  const vatId = known(o.vatId);
  const responsible = known(o.contentResponsible);

  return (
    <Container className="max-w-prose py-16 sm:py-20">
      <h1 className="text-heading lg:text-display-l text-ink">{impressum.title}</h1>
      <p className="mt-2 text-small text-ink-muted">Angaben gemäß § 5 DDG</p>

      <Block heading="Anbieter">
        <p>{operatorName()}</p>
        {address && (
          <>
            <p>{address.street}</p>
            <p>{address.cityLine}</p>
          </>
        )}
      </Block>

      {representatives && (
        <Block heading="Vertreten durch">
          <p>{representatives}</p>
        </Block>
      )}

      <Block heading="Kontakt">
        <p>Telefon: {o.phone}</p>
        <p>E-Mail: {o.email}</p>
      </Block>

      {registerCourt && registerNumber && (
        <Block heading="Registereintrag">
          <p>Registergericht: {registerCourt}</p>
          <p>Registernummer: {registerNumber}</p>
        </Block>
      )}

      {vatId && (
        <Block heading="Umsatzsteuer-Identifikationsnummer">
          <p>gemäß § 27a Umsatzsteuergesetz: {vatId}</p>
        </Block>
      )}

      <Block heading="Angaben für Handwerksbetriebe">
        <p>Zuständige Kammer: {o.chamber}</p>
        {site.trust.handwerksrolle && <p>Eintragung in die Handwerksrolle der zuständigen Handwerkskammer.</p>}
        <p>Gesetzliche Berufsbezeichnung: {o.professionalTitle}</p>
        <p>Berufsrechtliche Regelungen: {o.professionalRules}</p>
      </Block>

      {responsible && (
        <Block heading="Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV">
          <p>{responsible}</p>
        </Block>
      )}

      <Block heading="Verbraucherstreitbeilegung">
        {impressum.disputeResolution.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </Block>
    </Container>
  );
}
