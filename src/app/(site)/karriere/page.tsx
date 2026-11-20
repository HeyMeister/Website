import { careersPage } from "@/content/pages";
import { site } from "@/content/site";
import { mailHref, telHref } from "@/lib/links";
import { pageMetadata } from "@/lib/seo";
import { MailIcon, PhoneIcon } from "@/components/icons";
import { PageHero } from "@/components/ui/PageHero";
import { Container, Eyebrow, Section } from "@/components/ui/layout";
import { LinkButton } from "@/components/ui/Button";

export const metadata = pageMetadata({ ...careersPage.seo, path: "/karriere" });

/** Recruiting: no customer CTA in the hero, the action here is to apply. */
export default function KarrierePage() {
  const c = careersPage;
  const tel = telHref(site.contact.phone);
  const mail = mailHref(site.contact.email);
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Karriere", href: "/karriere" }]}
        eyebrow={c.eyebrow}
        title={c.title}
        lead={c.text}
        location="karriere"
        actions={
          <LinkButton href="#bewerben">
            Jetzt bewerben
          </LinkButton>
        }
      />
      <Section id="vorteile" tone="muted" eyebrow="Was Sie erwartet" title="Arbeit mit Plan.">
        <ul className="grid gap-6 md:grid-cols-3">
          {c.benefits.map((b) => (
            <li key={b.title} className="rounded-card border border-line bg-surface-raised p-6">
              <h3 className="text-subheading text-ink">{b.title}</h3>
              <p className="mt-2 text-ink-muted">{b.text}</p>
            </li>
          ))}
        </ul>
      </Section>
      <section id="stellen" aria-labelledby="stellen-heading" className="py-16 sm:py-20 lg:py-24">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <Eyebrow>{c.jobsTitle}</Eyebrow>
            <h2 id="stellen-heading" className="text-heading text-ink">
              Wir suchen Verstärkung in {site.contact.address.city}.
            </h2>
          </div>
          <ul className="border-t border-line lg:col-span-8">
            {c.jobs.map((j) => (
              <li key={j.title} className="border-b border-line py-6">
                <h3 className="text-subheading text-ink">{j.title}</h3>
                <p className="mt-1 text-ink-muted">{j.focus}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <section id="bewerben" aria-labelledby="bewerben-heading" className="bg-base py-16 text-white sm:py-20 lg:py-24">
        <Container className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-6">
            <h2 id="bewerben-heading" className="text-heading lg:text-display-l">
              {c.applyTitle}
            </h2>
            <p className="mt-4 max-w-prose text-subheading text-ink-inverse-muted">{c.applyText}</p>
          </div>
          <ul className="space-y-3 lg:col-span-6">
            {tel && (
              <li className="flex items-center gap-3">
                <PhoneIcon className="text-accent" />
                <a href={tel} data-track="phone_click" data-track-location="karriere" className="m-link font-display text-heading font-bold">
                  {site.contact.phone}
                </a>
              </li>
            )}
            <li className="flex items-center gap-3">
              <MailIcon className="text-accent" />
              {mail ? (
                <a href={mail} className="m-link font-semibold">
                  {site.contact.email}
                </a>
              ) : (
                <span>
                  Bewerbung per E-Mail an {site.contact.email}
                </span>
              )}
            </li>
          </ul>
        </Container>
      </section>
    </>
  );
}
