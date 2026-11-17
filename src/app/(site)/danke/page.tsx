import Link from "next/link";
import { thanksPage } from "@/content/pages";
import { site } from "@/content/site";
import { bookingUrl } from "@/lib/env";
import { telHref } from "@/lib/links";
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
  const t = thanksPage;
  const tel = telHref(site.contact.phone);
  return (
    <Container className="max-w-2xl py-16 sm:py-24">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-base text-accent">
        <CheckIcon className="h-6 w-6" strokeWidth={2.6} />
      </span>
      <h1 className="mt-6 text-heading text-ink lg:text-display-l">{t.title}</h1>
      {bookingUrl ? (
        <>
          <p className="mt-4 text-body text-ink-muted">
            {t.waitText} {t.bookLabel}:
          </p>
          <div className="mt-6">
            <BookingWidget url={bookingUrl} duration={site.contact.callDuration} />
          </div>
        </>
      ) : (
        tel && (
          <p className="mt-4 text-body text-ink-muted">
            {t.waitText} Rufen Sie uns an:{" "}
            <a href={tel} data-track="phone_click" data-track-location="danke" className="m-link font-semibold text-ink">
              {site.contact.phone}
            </a>
          </p>
        )
      )}
      <p className="mt-6 rounded-control border border-line bg-surface-2 px-5 py-4 text-ink">{t.tip}</p>
      <p className="mt-10">
        <Link href="/" className="font-semibold text-ink underline underline-offset-4">
          Zurück zur Startseite
        </Link>
      </p>
    </Container>
  );
}
