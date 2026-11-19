import { home } from "@/content/home";
import { site } from "@/content/site";
import { CheckIcon } from "@/components/icons";
import { Container } from "@/components/ui/layout";

/** Trust bar under the hero. Only true statements: the Handwerksrolle item waits for site.trust. */
export function TrustBar() {
  const t = home.trust;
  const items = [
    site.trust.meisterbetrieb ? t.meisterbetrieb : null,
    site.trust.handwerksrolle ? `${t.handwerksrolle} ${site.trust.chamber}` : null,
    site.trust.norms ? t.norms : null,
    t.logbook,
  ].filter((x): x is string => !!x);
  return (
    <section aria-label="Auf einen Blick" className="border-b border-line bg-surface">
      <Container>
        <ul className="flex flex-col gap-3 py-6 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-8">
          {items.map((item) => (
            <li key={item} className="flex items-center gap-2.5 text-small font-semibold text-ink">
              <CheckIcon className="h-4 w-4 shrink-0 text-accent-dark" strokeWidth={3} />
              {item}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
