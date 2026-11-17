import { home } from "@/content/home";
import { homeFormHref } from "@/lib/links";
import { IconCards } from "@/components/sections/IconCards";
import { Actions } from "@/components/ui/Actions";
import { Section } from "@/components/ui/layout";

/** The core: like an insurance for your electrics. Six arguments and the first repeat of the main action. */
export function Core() {
  const c = home.core;
  return (
    <Section id="kern" tone="muted" layout="row" eyebrow={c.eyebrow} title={c.title} intro={c.lead}>
      <IconCards items={c.items} columns={3} tone="muted" />
      <div className="mt-12 flex flex-col gap-6 rounded-card bg-base p-8 text-white lg:flex-row lg:items-center lg:justify-between lg:p-10">
        <p className="font-display text-heading font-bold">{c.closing}</p>
        <Actions location="kern" primaryHref={homeFormHref("check")} onDark micro={false} />
      </div>
    </Section>
  );
}
