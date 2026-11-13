import Link from "next/link";
import { site } from "@/content/site";
import { bookingUrl } from "@/lib/env";
import { pageMetadata } from "@/lib/seo";
import { BookingWidget } from "@/components/forms/BookingWidget";
import { CheckIcon } from "@/components/icons";
import { Container } from "@/components/ui/layout";

export const metadata = pageMetadata({
  title: "Vielen Dank für Ihre Anfrage",
  description: "Ihre Anfrage ist bei uns eingegangen.",
  path: "/danke",
  noindex: true,
});

export default function DankePage() {
  return (
    <Container className="max-w-2xl py-16 sm:py-24">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-base text-accent">
        <CheckIcon className="h-6 w-6" strokeWidth={2.6} />
      </span>
      <h1 className="mt-6 text-4xl font-bold tracking-tight text-ink">Vielen Dank. Ihre Anfrage ist da.</h1>
      <p className="mt-4 text-lg text-ink-muted">
        Wir melden uns {site.contact.responseTime}. Wenn Sie nicht warten möchten, buchen Sie direkt einen Termin für ein
        kostenloses Erstgespräch ({site.contact.callDuration}).
      </p>
      <div className="mt-8">
        <BookingWidget url={bookingUrl} duration={site.contact.callDuration} />
      </div>
      <p className="mt-10">
        <Link href="/" className="font-semibold text-ink underline underline-offset-4">
          Zurück zur Startseite
        </Link>
      </p>
    </Container>
  );
}
