import Link from "next/link";
import { home } from "@/content/home";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";
import { LogbookScreen } from "@/components/sections/LogbookMockup";
import { Container, Eyebrow, sectionHeadingClass } from "@/components/ui/layout";

/** What the subscription contains: the list on the left, the logbook (example) on the right. */
export function Included() {
  const s = home.included;
  const items: ReadonlyArray<{ title: string; text: string; href?: string; bullets?: readonly string[] }> = s.items;
  return (
    <section id="abo" aria-labelledby="abo-heading" className="bg-surface-2 pb-16 pt-24 sm:pb-20 lg:min-h-[100svh] lg:pb-24 lg:pt-[7.5rem]">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-12">
        <div className="min-w-0 lg:col-span-6">
          <Eyebrow tone="muted">{s.eyebrow}</Eyebrow>
          <h2 id="abo-heading" className={sectionHeadingClass}>
            {s.title}
          </h2>
          <ul className="mt-10 border-t border-line">
            {items.map((item) => (
              <li key={item.title} className="flex gap-4 border-b border-line py-5">
                <CheckIcon className="mt-1 h-5 w-5 shrink-0 text-accent-deep" strokeWidth={2.6} />
                <div className="min-w-0">
                  {item.href ? (
                    <Link href={item.href} className="m-link group inline-flex items-center gap-2 font-display text-subheading font-bold text-ink">
                      {item.title}
                      <ArrowRightIcon className="m-arrow h-4 w-4" />
                    </Link>
                  ) : (
                    <p className="font-display text-subheading font-bold text-ink">{item.title}</p>
                  )}
                  {item.text && <p className="mt-1 text-ink-muted">{item.text}</p>}
                  {item.bullets && (
                    <ul className="mt-2 space-y-1.5 text-ink-muted">
                      {item.bullets.map((b) => (
                        <li key={b} className="flex gap-2">
                          <span aria-hidden="true" className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent-deep" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-small text-ink-muted">{s.note}</p>
        </div>
        <div className="min-w-0 lg:col-span-6 lg:pt-16">
          <LogbookScreen />
        </div>
      </Container>
    </section>
  );
}
