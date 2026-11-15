import { home } from "@/content/home";
import { contactHref } from "@/lib/links";
import { LinkButton } from "@/components/ui/Button";
import { Container, Eyebrow, sectionHeadingClass } from "@/components/ui/layout";

/** Entry without switching providers: a paid pilot for one site (navy band). */
export function PilotStart() {
  const p = home.pilot;
  return (
    <section id="pilot" aria-labelledby="pilot-heading" className="bg-base pb-16 pt-24 text-white sm:pb-20 lg:pb-[7.5rem] lg:pt-[7.5rem]">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <Eyebrow tone="dark">{p.eyebrow}</Eyebrow>
          <h2 id="pilot-heading" className={sectionHeadingClass}>
            {p.title}
          </h2>
          <p className="mt-4 max-w-prose text-subheading text-ink-inverse-muted">{p.lead}</p>
          <LinkButton href={contactHref("pilot")} track="cta_pilot_click" trackLocation="pilot" arrow className="mt-8">
            {home.mainAction}
          </LinkButton>
        </div>
        <ol className="border-t border-white/15 lg:col-span-7 lg:mt-2">
          {p.steps.map((s, i) => (
            <li key={s.title} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-white/15 py-6">
              <span className="font-mono text-subheading text-accent-light">{String(i + 1).padStart(2, "0")}</span>
              <span>
                <span className="block font-display text-subheading font-bold text-white">{s.title}</span>
                <span className="mt-1 block text-ink-inverse-muted">{s.text}</span>
              </span>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
