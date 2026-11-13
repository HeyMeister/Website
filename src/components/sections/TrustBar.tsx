import { site } from "@/content/site";
import { CheckIcon } from "@/components/icons";
import { Fill } from "@/components/ui/Placeholder";

/** Trust signals; each one is switched on/off in content/site.ts → trust. */
export function TrustBar({ className = "" }: { className?: string }) {
  const { trust, contact } = site;
  const items: Array<{ key: string; text: string }> = [];
  if (trust.meisterbetrieb) items.push({ key: "meister", text: `Meisterbetrieb aus ${contact.address.city}` });
  if (trust.handwerksrolle) items.push({ key: "hwk", text: `Eingetragen in der Handwerksrolle ${trust.chamber}` });
  if (trust.norms) items.push({ key: "norms", text: "Prüfung nach DGUV V3 und BetrSichV" });
  if (!items.length) return null;

  return (
    <ul aria-label="Qualifikation" className={`flex flex-col gap-3 text-sm font-medium text-ink sm:flex-row sm:flex-wrap sm:gap-x-6 ${className}`}>
      {items.map((i) => (
        <li key={i.key} className="flex items-center gap-2">
          <CheckIcon className="h-4 w-4 shrink-0 text-accent" strokeWidth={2.4} />
          <span>
            <Fill text={i.text} />
          </span>
        </li>
      ))}
    </ul>
  );
}
