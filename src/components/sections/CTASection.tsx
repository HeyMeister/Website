import { home } from "@/content/home";
import { site } from "@/content/site";
import { bookingUrl } from "@/lib/env";
import { mailHref, telHref } from "@/lib/links";
import { LeadForm } from "@/components/forms/LeadForm";
import { BookingWidget } from "@/components/forms/BookingWidget";
import { MailIcon, PhoneIcon } from "@/components/icons";
import { Fill } from "@/components/ui/Placeholder";
import { Section } from "@/components/ui/layout";

export function CTASection({ id = "kontakt" }: { id?: string }) {
  const c = home.contact;
  const tel = telHref(site.contact.phone);
  const mail = mailHref(site.contact.email);

  return (
    <Section id={id} eyebrow={c.eyebrow} title={c.title} intro={c.text}>
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="rounded-2xl border border-line bg-surface-raised p-6 sm:p-8 lg:col-span-8">
          <LeadForm />
        </div>
        <aside className="space-y-6 lg:col-span-4" aria-label="Weitere Kontaktwege">
          <div className="space-y-3">
            <p className="font-semibold text-ink">Lieber direkt?</p>
            <p className="flex items-center gap-3">
              <PhoneIcon className="text-accent" />
              {tel ? (
                <a href={tel} className="font-semibold text-ink hover:underline">
                  {site.contact.phone}
                </a>
              ) : (
                <Fill text={site.contact.phone} />
              )}
            </p>
            <p className="flex items-center gap-3">
              <MailIcon className="text-accent" />
              {mail ? (
                <a href={mail} className="font-semibold text-ink hover:underline">
                  {site.contact.email}
                </a>
              ) : (
                <Fill text={site.contact.email} />
              )}
            </p>
          </div>
          <BookingWidget url={bookingUrl} duration={site.contact.callDuration} />
        </aside>
      </div>
    </Section>
  );
}
