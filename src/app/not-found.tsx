import Link from "next/link";
import { contactHref, pricesHref } from "@/lib/links";
import { Container } from "@/components/ui/layout";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function NotFound() {
  const links = [
    { href: "/", label: "Startseite" },
    { href: pricesHref(), label: "Preise" },
    { href: contactHref(), label: "Kontakt" },
  ];
  return (
    <>
      <Header />
      <main id="main" className="flex-1 pt-16">
    <Container className="max-w-2xl py-20 sm:py-28">
      <p className="label text-accent-dark">Fehler 404</p>
      <h1 className="mt-3 text-heading lg:text-display-l text-ink">Diese Seite gibt es nicht.</h1>
      <p className="mt-4 text-body text-ink-muted">Vielleicht hilft Ihnen einer dieser Links weiter:</p>
      <ul className="mt-6 flex flex-wrap gap-3">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              href={l.href}
              className="inline-flex min-h-[44px] items-center rounded-control border border-line-strong bg-surface-raised px-4 font-semibold text-ink hover:border-base"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </Container>
      </main>
      <Footer />
    </>
  );
}
