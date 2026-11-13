import { home } from "@/content/home";
import { site } from "@/content/site";
import { bookingUrl } from "@/lib/env";
import { mailHref, telHref } from "@/lib/links";
import { LeadForm } from "@/components/forms/LeadForm";
import { BookingWidget } from "@/components/forms/BookingWidget";
import { MailIcon, PhoneIcon } from "@/components/icons";
import { Container, Eyebrow, sectionHeadingClass } from "@/components/ui/layout";

export function CTASection({ id = "kontakt", tone = "muted" }: { id?: string; tone?: "light" | "muted" }) {
  const c = home.contact;
  const tel = telHref(site.contact.phone);
  const mail = mailHref(site.contact.email);

  const bg = tone === "muted" ? "bg-surface-2" : "bg-surface";

  // Heading, next steps and direct contact on the left; the form on the right, so the whole
  // section fits one screen on desktop (tasteskill: one section per screen).
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={`${bg} pb-16 pt-24 sm:pb-20 lg:min-h-[100svh] lg:pb-24 lg:pt-[7.5rem]`}>
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <Eyebrow tone={tone}>{c.eyebrow}</Eyebrow>
          <h2 id={`${id}-heading`} className={sectionHeadingClass}>
            {c.title}
          </h2>
          <p className="mt-4 max-w-prose text-subheading text-ink-muted">{c.text}</p>

          <p className="mt-10 font-display text-subheading font-bold text-ink">{c.nextStepsTitle}</p>
          <ol className="mt-4 space-y-4">
            {c.nextSteps.map((step, i) => (
              <li key={step} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-base font-mono text-small text-white"
                >
                  {i + 1}
                </span>
                <span className="pt-0.5 text-ink">{step}</span>
              </li>
            ))}
          </ol>

          {(tel || mail) && (
            <div className="mt-8 space-y-3 border-t border-line pt-6">
              <p className="font-display text-subheading font-bold text-ink">Lieber direkt?</p>
              {tel && (
                <p className="flex items-center gap-3">
                  <PhoneIcon className="text-accent" />
                  <a href={tel} className="m-link font-semibold text-ink">
                    {site.contact.phone}
                  </a>
                </p>
              )}
              {mail && (
                <p className="flex items-center gap-3">
                  <MailIcon className="text-accent" />
                  <a href={mail} className="m-link font-semibold text-ink">
                    {site.contact.email}
                  </a>
                </p>
              )}
            </div>
          )}
          <div className="mt-8">
            <BookingWidget url={bookingUrl} duration={site.contact.callDuration} />
          </div>
        </div>

        <div className="rounded-card border border-line bg-surface-raised p-6 lg:col-span-8 lg:p-8">
          <LeadForm />
        </div>
      </Container>
    </section>
  );
}
