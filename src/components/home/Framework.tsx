import Image from "next/image";
import { home } from "@/content/home";
import { publishedTeam } from "@/content/team";
import { contactHref } from "@/lib/links";
import { CheckIcon } from "@/components/icons";
import { LinkButton } from "@/components/ui/Button";
import { Container, Eyebrow, sectionHeadingClass } from "@/components/ui/layout";

/** Framework agreement for chains (navy band); the contact person's photo is shown when one is set in team.ts. */
export function Framework() {
  const f = home.framework;
  const meister = publishedTeam[0];
  return (
    <section id="filialisten" aria-labelledby="filialisten-heading" className="bg-base pb-16 pt-24 text-white sm:pb-20 lg:pb-[7.5rem] lg:pt-[7.5rem]">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-12">
        <div className={meister?.photo ? "lg:col-span-7" : "lg:col-span-12"}>
          <Eyebrow tone="dark">{f.eyebrow}</Eyebrow>
          <h2 id="filialisten-heading" className={sectionHeadingClass}>
            {f.title}
          </h2>
          <ul className={`mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2 ${meister?.photo ? "" : "lg:grid-cols-4"}`}>
            {f.points.map((p) => (
              <li key={p.title} className="flex gap-3">
                <CheckIcon className="mt-1 h-5 w-5 shrink-0 text-accent-light" strokeWidth={2.6} />
                <span>
                  <span className="block font-semibold text-white">{p.title}</span>
                  <span className="mt-1 block text-ink-inverse-muted">{p.text}</span>
                </span>
              </li>
            ))}
          </ul>
          <LinkButton href={contactHref("rahmenvertrag")} track="cta_offer_click" trackLocation="framework" arrow className="mt-10">
            {f.cta}
          </LinkButton>
        </div>
        {meister?.photo && meister.photoSize && (
          <figure className="lg:col-span-4 lg:col-start-9">
            <div className="relative aspect-[4/5] w-full max-w-[20rem] overflow-hidden rounded-card bg-base-light lg:max-w-none">
              <Image
                src={meister.photo}
                alt={`${meister.name}, ${meister.role}`}
                fill
                sizes="(min-width: 1024px) 380px, 320px"
                className="object-cover object-top"
              />
            </div>
            <figcaption className="mt-4">
              <span className="block font-display text-subheading font-bold text-white">{meister.name}</span>
              <span className="block text-small text-ink-inverse-muted">
                {meister.role} · {meister.contactLine}
              </span>
            </figcaption>
          </figure>
        )}
      </Container>
    </section>
  );
}
