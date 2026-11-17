import { contactPage } from "@/content/pages";
import { pageMetadata } from "@/lib/seo";
import { CTASection } from "@/components/sections/CTASection";

export const metadata = pageMetadata({ ...contactPage.seo, path: "/kontakt" });

/** The contact page: heading, next steps, phone and booking on the left, the form on the right. */
export default function KontaktPage() {
  return <CTASection tone="light" headingLevel={1} eyebrow={contactPage.eyebrow} title={contactPage.title} />;
}
