import Link from "next/link";
import { home } from "@/content/home";
import { photoCreditLine } from "@/content/photos";
import { site } from "@/content/site";
import { navigation } from "@/content/navigation";
import { operator } from "@/content/legal";
import { siteMode } from "@/lib/env";
import { contactHref, mailHref, telHref } from "@/lib/links";
import { hasPlaceholder } from "@/lib/placeholders";
import { Logo } from "@/components/brand/Logo";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/layout";

/**
 * Close and footer as one section (tasteskill footer.closing): row 1 the close ("close-type":
 * the heading, one line and the big button across the column), row 2 the links ("footer-visit":
 * where we work, how to reach us) and the legal row.
 *
 * Values that are still [PLACEHOLDERS] are left out here instead of being shown publicly.
 */
export function Footer() {
  const tel = telHref(site.contact.phone);
  const mail = mailHref(site.contact.email);
  const links = navigation.footer[siteMode];
  const nav = navigation[siteMode];
  const company = hasPlaceholder(operator.company) ? site.name : `${operator.company} ${operator.legalForm}`;
  const street = hasPlaceholder(site.contact.address.street) ? null : site.contact.address.street;

  return (
    <footer id="footer" className="bg-base text-white lg:min-h-[100svh]">
      <Container className="flex flex-col justify-between gap-16 pb-10 pt-24 lg:min-h-[100svh] lg:pb-[4.5rem] lg:pt-[7.5rem]">
        {/* Row 1: the close */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-8">
            <h2 className="text-[2.5rem] leading-[1.05] tracking-[-0.025em] sm:text-[3.5rem] xl:text-[4.5rem]">{home.closing.title}</h2>
            <p className="mt-4 max-w-prose text-subheading text-ink-inverse-muted">{home.closing.text}</p>
          </div>
          <div className="lg:col-span-4 lg:flex lg:justify-end">
            <LinkButton
              href={contactHref("angebot")}
              track="cta_offer_click"
              trackLocation="close"
              arrow
              className="w-full px-8 py-4 sm:w-auto"
            >
              {home.mainAction}
            </LinkButton>
          </div>
        </div>

        {/* Row 2: links and legal */}
        <div>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Logo variant="on-dark" className="h-7 w-auto" />
              <p className="mt-4 max-w-sm text-small text-ink-inverse-muted">
                {site.tagline}. Meisterbetrieb aus {site.contact.address.city}.
              </p>
            </div>

            <div className="text-small lg:col-span-3">
              <h3 className="mb-3 font-semibold">Einsatzgebiet und Kontakt</h3>
              <ul className="space-y-2 text-ink-inverse-muted">
                <li>{site.region.label}</li>
                {street && (
                  <li>
                    {street}, {site.contact.address.city}
                  </li>
                )}
                {tel && (
                  <li>
                    <a href={tel} className="m-link text-white">
                      {site.contact.phone}
                    </a>
                  </li>
                )}
                {mail && (
                  <li>
                    <a href={mail} className="m-link text-white">
                      {site.contact.email}
                    </a>
                  </li>
                )}
                <li>
                  <Link href={contactHref()} className="m-link text-white">
                    Kontaktformular
                  </Link>
                </li>
              </ul>
            </div>

            <nav aria-label="Fußzeile" className="text-small lg:col-span-4">
              <h3 className="mb-3 font-semibold">Seite</h3>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
                {nav.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="m-link text-ink-inverse-muted hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="mt-10 flex flex-col gap-3 text-small text-ink-inverse-muted md:flex-row md:items-center md:justify-between">
            <p>
              © {new Date().getFullYear()} {company}
            </p>
            <ul className="flex gap-6">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="m-link hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-4 text-[0.75rem] leading-4 text-ink-inverse-muted">{photoCreditLine}</p>
        </div>
      </Container>
    </footer>
  );
}
