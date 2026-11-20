import Link from "next/link";
import { contactHref } from "@/lib/links";
import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/layout";

export const metadata = pageMetadata({
  title: "Allgemeine Geschäftsbedingungen",
  description: "Allgemeine Geschäftsbedingungen von HeyMeister Elektro.",
  path: "/agb",
  noindex: true,
});

/** TODO: replace with the final terms once they are drafted and legally reviewed. */
export default function AgbPage() {
  return (
    <Container className="max-w-prose py-16 sm:py-24">
      <h1 className="text-heading text-ink lg:text-display-l">Allgemeine Geschäftsbedingungen</h1>
      <p className="mt-6 text-body text-ink-muted">
        Unsere Allgemeinen Geschäftsbedingungen werden derzeit erstellt. Bis dahin gelten die Bedingungen aus Ihrem individuellen
        Angebot. Wir schicken sie Ihnen gern vorab zu.
      </p>
      <p className="mt-6">
        <Link href={contactHref()} className="font-semibold text-accent-dark underline underline-offset-4">
          Kontakt aufnehmen
        </Link>
      </p>
    </Container>
  );
}
