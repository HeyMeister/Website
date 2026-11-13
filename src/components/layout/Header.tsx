import Link from "next/link";
import { home } from "@/content/home";
import { site } from "@/content/site";
import { navigation } from "@/content/navigation";
import { siteMode } from "@/lib/env";
import { contactHref, telHref } from "@/lib/links";
import { Logo } from "@/components/brand/Logo";
import { PhoneIcon } from "@/components/icons";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/layout";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const items = navigation[siteMode];
  const tel = telHref(site.contact.phone);
  const offerHref = contactHref("angebot");

  return (
    // Fixed, opaque bar (tasteskill nav-centre): logo left, words in the middle, main action right.
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-surface">
      <Container className="relative flex h-16 items-center gap-6">
        <Link href="/" className="shrink-0 rounded" aria-label="HeyMeister Elektro, zur Startseite">
          <Logo className="h-6 w-auto sm:h-7" title={null} />
        </Link>

        <nav aria-label="Hauptnavigation" className="absolute left-1/2 hidden -translate-x-1/2 xl:block">
          <ul className="flex items-center gap-7 text-small font-medium">
            {items.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="m-link rounded text-ink-muted hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:gap-4">
          {/* Phone: only once a real number is set (no placeholder in the bar). Icon, number from 2xl. */}
          {tel && (
            <a
              href={tel}
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-control text-small font-semibold text-ink hover:bg-surface-2 2xl:px-2"
            >
              <PhoneIcon />
              <span className="sr-only 2xl:not-sr-only">{site.contact.phone}</span>
            </a>
          )}

          <LinkButton href={offerHref} size="md" track="cta_offer_click" trackLocation="nav" className="hidden sm:inline-flex">
            {home.mainAction}
          </LinkButton>

          <MobileMenu items={[...items]} offerHref={offerHref} />
        </div>
      </Container>
    </header>
  );
}
