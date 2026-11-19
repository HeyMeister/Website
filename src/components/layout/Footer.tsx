import Link from "next/link";
import { cta, home } from "@/content/home";
import { photoCreditLine } from "@/content/photos";
import { site } from "@/content/site";
import { navigation, type NavItem } from "@/content/navigation";
import { bookingUrl } from "@/lib/env";
import { callHref, contactHref, mailHref, telHref } from "@/lib/links";
import { hasPlaceholder } from "@/lib/placeholders";
import { operatorName } from "@/lib/operator";
import { Logo } from "@/components/brand/Logo";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/layout";

/**
 * Close and footer as one section: row 1 the close (heading, one line, both actions), row 2 the
 * links (contact, services, segments, company) and the legal row.
 * Values that are still [PLACEHOLDERS] are left out here instead of being shown publicly.
 */
export function Footer() {
  const tel = telHref(site.contact.phone);
  const mail = mailHref(site.contact.email);
  const company = operatorName();
  const street = hasPlaceholder(site.contact.address.street) ? null : site.contact.address.street;
  const f = navigation.footer;

  return (
    <footer id="footer" className="bg-base text-white">
      <Container className="flex flex-col gap-16 pb-10 pt-24 lg:gap-24 lg:pb-[4.5rem] lg:pt-[7.5rem]">
        {/* Row 1: the close */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <h2 className="text-[2.5rem] leading-[1.05] tracking-[-0.025em] sm:text-[3.5rem] xl:text-[4.25rem]">{home.closing.title}</h2>
            <p className="mt-4 max-w-prose text-subheading text-ink-inverse-muted">{home.closing.text}</p>
          </div>
          <div className="flex flex-col gap-3 lg:col-span-5 lg:items-end">
            <LinkButton href={contactHref("check")} track="cta_check_click" trackLocation="close" arrow className="w-full sm:w-auto">
              {cta.primary}
            </LinkButton>
            <LinkButton href={callHref(bookingUrl)} variant="inverse" track="cta_call_click" trackLocation="close" className="w-full sm:w-auto">
              {cta.secondary}
            </LinkButton>
          </div>
        </div>

        {/* Row 2: links and legal */}
        <div>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
            <div className="sm:col-span-2 lg:col-span-4">
              <Logo variant="on-dark" className="h-7 w-auto" />
              <p className="mt-4 max-w-sm text-small text-ink-inverse-muted">
                {site.tagline}. Meisterbetrieb aus {site.contact.address.city}, Einsatzgebiet {site.region.label}.
              </p>
              <ul className="mt-6 space-y-2 text-small">
                {tel && (
                  <li>
                    <a href={tel} data-track="phone_click" data-track-location="footer" className="m-link font-semibold text-white">
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
                {street && (
                  <li className="text-ink-inverse-muted">
                    {street}, {site.contact.address.zip} {site.contact.address.city}
                  </li>
                )}
              </ul>
            </div>
            <FooterColumn title="Leistungen" items={f.leistungen} className="lg:col-span-2" />
            <FooterColumn title="Branchen" items={f.branchen} className="lg:col-span-2" />
            <FooterColumn title="Ratgeber" items={f.ratgeber} className="lg:col-span-2" />
            <FooterColumn title="Unternehmen" items={f.unternehmen} className="lg:col-span-2" />
          </div>

          <div className="mt-12 flex flex-col gap-3 border-t border-white/15 pt-6 text-small text-ink-inverse-muted md:flex-row md:items-center md:justify-between">
            <p>
              © {new Date().getFullYear()} {company}
            </p>
            <ul className="flex gap-6">
              {f.legal.map((l) => (
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

function FooterColumn({ title, items, className = "" }: { title: string; items: NavItem[]; className?: string }) {
  return (
    <nav aria-label={title} className={`text-small ${className}`}>
      <h3 className="mb-3 font-semibold">{title}</h3>
      <ul className="space-y-2">
        {items.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="m-link text-ink-inverse-muted hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
