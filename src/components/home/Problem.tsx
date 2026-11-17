import { home } from "@/content/home";
import { IconCards } from "@/components/sections/IconCards";
import { Section } from "@/components/ui/layout";

/** "Kennen Sie das?": four situations, in the customer's own words. */
export function Problem() {
  const p = home.problem;
  return (
    <Section id="problem" layout="row" eyebrow={p.eyebrow} title={p.title}>
      <IconCards items={p.items} />
    </Section>
  );
}
