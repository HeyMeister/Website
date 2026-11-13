import type { FaqItem } from "@/content/faq";
import { ChevronDownIcon } from "@/components/icons";
import { Fill } from "@/components/ui/Placeholder";
import { hasPlaceholder } from "@/lib/placeholders";

/**
 * Accordion built on native <details>/<summary>: keyboard accessible, works without JS.
 * Emits FAQPage JSON-LD for the shown items (items still containing placeholders are skipped).
 */
export function FAQ({ items, disclaimer }: { items: FaqItem[]; disclaimer?: string }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items
      .filter((i) => !i.answer.some(hasPlaceholder))
      .map((i) => ({
        "@type": "Question",
        name: i.question,
        acceptedAnswer: { "@type": "Answer", text: i.answer.join(" ") },
      })),
  };

  return (
    <div className="max-w-3xl">
      <div className="divide-y divide-line border-y border-line">
        {items.map((item) => (
          <details key={item.id} id={`faq-${item.id}`} className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-subheading font-semibold text-ink [&::-webkit-details-marker]:hidden">
              {item.question}
              <ChevronDownIcon className="h-5 w-5 shrink-0 text-ink-muted transition-transform group-open:rotate-180 motion-reduce:transition-none" />
            </summary>
            <div className="max-w-prose space-y-3 pb-6 pr-10 text-ink-muted">
              {item.answer.map((p, i) => (
                <p key={i}>
                  <Fill text={p} />
                </p>
              ))}
            </div>
          </details>
        ))}
      </div>
      {disclaimer && <p className="mt-6 text-small text-ink-muted">{disclaimer}</p>}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </div>
  );
}
