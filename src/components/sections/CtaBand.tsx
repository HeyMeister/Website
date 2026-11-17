import { site } from "@/content/site";
import { telHref } from "@/lib/links";
import { Actions } from "@/components/ui/Actions";
import { PhoneIcon } from "@/components/icons";
import { Container, sectionHeadingClass } from "@/components/ui/layout";

/** Closing call to action for subpages: heading, one line, both actions and the phone number. */
export function CtaBand({ title, text, location, id = "cta" }: { title: string; text?: string; location: string; id?: string }) {
  const tel = telHref(site.contact.phone);
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="bg-surface-2 py-16 sm:py-20 lg:py-24">
      <Container className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
        <div className="lg:col-span-6">
          <h2 id={`${id}-heading`} className={sectionHeadingClass}>
            {title}
          </h2>
          {text && <p className="mt-4 max-w-prose text-subheading text-ink-muted">{text}</p>}
        </div>
        <div className="lg:col-span-6">
          <Actions location={location} />
          {tel && (
            <p className="mt-4 flex items-center gap-2 text-small text-ink">
              <PhoneIcon className="h-4 w-4 text-accent-dark" />
              Lieber direkt anrufen:
              <a href={tel} data-track="phone_click" data-track-location={location} className="m-link font-semibold">
                {site.contact.phone}
              </a>
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
