"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Pages that end with the contact form already; the footer close would only repeat it. */
const WITH_FORM = new Set(["/", "/kontakt", "/danke"]);

export function FooterClose({ children }: { children: ReactNode }) {
  const path = usePathname();
  return WITH_FORM.has(path) ? null : <>{children}</>;
}
