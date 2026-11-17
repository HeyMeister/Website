import Link from "next/link";
import { cta } from "@/content/home";
import { site } from "@/content/site";
import { navigation } from "@/content/navigation";
import { contactHref, telHref } from "@/lib/links";
import { Logo } from "@/components/brand/Logo";
import { PhoneIcon } from "@/components/icons";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/layout";
import { MobileMenu } from "./MobileMenu";

/**
 * Fixed, opaque bar: logo, navigation (from xl), the phone number (always visible: number from lg,
 * a call button below) and the main action.
 */
export function Header() {
  const tel = telHref(site.contact.phone);
  const offerHref = contactHref("check");
  const mobileItems = [...navigation.main.filter((i) => i.href !== "/#fuer-wen"), ...navigation.footer.branchen, { label: "Pilotprogramm", href: "/pilot" }, { label: "Kontakt", href: "/kontakt" }];

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-surface">
      <Container className="relative flex h-16 items-center gap-8">
        <Link href="/" className="shrink-0 rounded" aria-label="HeyMeister Elektro, zur Startseite">
          <Logo className="h-6 w-auto sm:h-7" title={null} />
        </Link>

        <nav aria-label="Hauptnavigation" className="hidden xl:block">
          <ul className="flex items-center gap-6 text-small font-medium">
            {navigation.main.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="m-link rounded text-ink-muted hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:gap-4">
          {tel && (
            <a
              href={tel}
              data-track="phone_click"
              data-track-location="nav"
              aria-label={`Anrufen: ${site.contact.phone}`}
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 whitespace-nowrap rounded-control px-2 text-small font-semibold text-ink hover:bg-surface-2"
            >
              <PhoneIcon className="text-accent-dark" />
              <span className="hidden lg:inline">{site.contact.phone}</span>
            </a>
          )}

          <LinkButton href={offerHref} size="md" track="cta_check_click" trackLocation="nav" className="hidden whitespace-nowrap sm:inline-flex">
            {cta.primaryShort}
          </LinkButton>

          <MobileMenu items={mobileItems} offerHref={offerHref} offerLabel={cta.primary} />
        </div>
      </Container>
    </header>
  );
}
