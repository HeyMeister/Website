import { segmentBySlug } from "@/content/segments";
import { pageMetadata } from "@/lib/seo";
import { SegmentPage } from "@/components/pages/SegmentPage";

const segment = segmentBySlug("fuer-hotels");

export const metadata = pageMetadata({ ...segment.seo, path: "/fuer-hotels" });

export default function Page() {
  return <SegmentPage segment={segment} />;
}
