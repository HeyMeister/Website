import Link from "next/link";
import { site } from "@/content/site";
import { navigation } from "@/content/navigation";
import { operator } from "@/content/legal";
import { siteMode } from "@/lib/env";
import { mailHref, telHref } from "@/lib/links";
import { Logo } from "@/components/brand/Logo";
import { Fill } from "@/components/ui/Placeholder";
import { Container } from "@/components/ui/layout";

export function Footer() {
  const tel = telHref(site.contact.phone);
  const mail = mailHref(site.contact.email);
  const { address } = site.contact;
  const links = navigation.footer[siteMode];

  return (
    <footer className="bg-base text-surface">
      <Container className="grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo variant="on-dark" className="h-7 w-auto" />
          <p className="mt-3 text-small text-ink-inverse-muted">
            {site.tagline}. Meisterbetrieb aus {address.city} für {site.region.label}.
          </p>
        </div>

        <div className="text-small md:col-span-4">
          <h2 className="mb-3 font-semibold">Kontakt</h2>
          <address className="space-y-1 not-italic text-ink-inverse-muted">
            <p>
              <Fill text={`${operator.company} ${operator.legalForm}`} />
            </p>
            <p>
              <Fill text={address.street} />, <Fill text={address.zip} /> {address.city}
            </p>
            <p>
              Telefon:{" "}
              {tel ? (
                <a href={tel} className="text-surface underline-offset-4 hover:underline">
                  {site.contact.phone}
                </a>
              ) : (
                <Fill text={site.contact.phone} />
              )}
            </p>
            <p>
              E-Mail:{" "}
              {mail ? (
                <a href={mail} className="text-surface underline-offset-4 hover:underline">
                  {site.contact.email}
                </a>
              ) : (
                <Fill text={site.contact.email} />
              )}
            </p>
          </address>
        </div>

        <nav aria-label="Fußzeile" className="text-small md:col-span-3">
          <h2 className="mb-3 font-semibold">Informationen</h2>
          <ul className="space-y-2">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-ink-inverse-muted hover:text-surface hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
      <div className="border-t border-white/10">
        <Container className="py-5 text-small text-ink-inverse-muted">
          © {new Date().getFullYear()} <Fill text={`${operator.company} ${operator.legalForm}`} />
        </Container>
      </div>
    </footer>
  );
}
