import Link from "next/link";
import { site } from "@/content/site";
import { navigation } from "@/content/navigation";
import { siteMode } from "@/lib/env";
import { contactHref, telHref } from "@/lib/links";
import { Logo } from "@/components/brand/Logo";
import { PhoneIcon } from "@/components/icons";
import { LinkButton } from "@/components/ui/Button";
import { Fill } from "@/components/ui/Placeholder";
import { Container } from "@/components/ui/layout";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const items = navigation[siteMode];
  const tel = telHref(site.contact.phone);
  const offerHref = contactHref("angebot");

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/85">
      <Container className="flex h-16 items-center gap-6">
        <Link href="/" className="shrink-0 rounded" aria-label="HeyMeister Elektro, zur Startseite">
          <Logo className="h-6 w-auto sm:h-7" title={null} />
        </Link>

        <nav aria-label="Hauptnavigation" className="ml-4 hidden lg:block">
          <ul className="flex items-center gap-6 text-sm font-medium">
            {items.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="rounded text-ink-muted hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:gap-4">
          {/* Phone: always visible. Number on larger screens, icon on mobile. */}
          {tel ? (
            <a
              href={tel}
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-lg text-sm font-semibold text-ink hover:bg-surface-muted sm:px-2"
            >
              <PhoneIcon />
              <span className="sr-only sm:not-sr-only">{site.contact.phone}</span>
              <span className="sr-only sm:hidden">Anrufen</span>
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 text-sm font-semibold">
              <PhoneIcon />
              <span className="hidden sm:inline">
                <Fill text={site.contact.phone} />
              </span>
            </span>
          )}

          <LinkButton href={offerHref} size="md" track="cta_offer_click" className="hidden sm:inline-flex">
            Angebot anfordern
          </LinkButton>

          <MobileMenu items={[...items]} offerHref={offerHref} />
        </div>
      </Container>
    </header>
  );
}
