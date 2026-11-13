import { home } from "@/content/home";
import { Container, Eyebrow, sectionHeadingClass } from "@/components/ui/layout";
import { ReportScreen } from "@/components/sections/LogbookMockup";

/**
 * The navy band (tasteskill rhythm "dark-band"): the report, the page's strongest visual,
 * next to the defect classes that decide what the subscription covers.
 */
export function ReportBand() {
  const r = home.report;
  return (
    <section
      id="bericht"
      aria-labelledby="bericht-heading"
      className="bg-base pb-16 pt-24 text-white sm:pb-20 lg:min-h-[100svh] lg:pb-24 lg:pt-[7.5rem]"
    >
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <Eyebrow tone="dark">{r.eyebrow}</Eyebrow>
          <h2 id="bericht-heading" className={sectionHeadingClass}>
            {r.title}
          </h2>
          <p className="mt-4 max-w-prose text-subheading text-ink-inverse-muted">{r.lead}</p>
          <ol className="mt-8 border-t border-white/15">
            {r.defects.map((d) => (
              <li key={d.label} className="grid grid-cols-[5.5rem_1fr] gap-4 border-b border-white/15 py-4">
                <span className="label pt-1 text-accent-light">{d.label}</span>
                <span>
                  <span className="block font-semibold text-white">{d.title}</span>
                  <span className="mt-0.5 block text-small text-ink-inverse-muted">{d.resolution}</span>
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-4 max-w-prose text-small text-ink-inverse-muted">{r.note}</p>
        </div>
        <div className="lg:col-span-7 lg:pt-2">
          <ReportScreen />
        </div>
      </Container>
    </section>
  );
}
