import { home } from "@/content/home";
import { Section, cardClass } from "@/components/ui/layout";

/** Target groups. In full mode each card will link to its own page. */
export function SegmentCards({ tone = "muted" }: { tone?: "light" | "muted" }) {
  const s = home.segments;
  return (
    <Section id="fuer-wen" tone={tone} eyebrow={s.eyebrow} title={s.title}>
      <ul className="grid gap-6 lg:grid-cols-3">
        {s.items.map((item) => (
          <li key={item.title} className={`${cardClass} flex flex-col`}>
            <h3 className="text-subheading text-ink">{item.title}</h3>
            <p className="mt-1 text-small text-ink-muted">{item.audience}</p>
            <dl className="mt-6 flex-1 space-y-4 border-t border-line pt-5">
              <div>
                <dt className="label text-ink-muted">Ausgangslage</dt>
                <dd className="mt-1.5 text-ink">{item.pain}</dd>
              </div>
              <div>
                <dt className="label text-accent-dark">Mit HeyMeister</dt>
                <dd className="mt-1.5 font-semibold text-ink">{item.benefit}</dd>
              </div>
            </dl>
            {item.note && <p className="mt-5 text-small text-ink-muted">{item.note}</p>}
          </li>
        ))}
      </ul>
    </Section>
  );
}
