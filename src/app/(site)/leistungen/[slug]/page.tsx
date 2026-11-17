import { notFound } from "next/navigation";
import { serviceBySlug, services } from "@/content/services";
import { pageMetadata } from "@/lib/seo";
import { ServiceDetail } from "@/components/pages/ServiceDetail";

/** Only the four services exist; every other slug is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) return {};
  return pageMetadata({ ...service.seo, path: `/leistungen/${service.slug}` });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) notFound();
  return <ServiceDetail service={service} />;
}
