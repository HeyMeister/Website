import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/layout";
import { getCurrentProfile } from "@/lib/dataroom/auth";
import { signOut } from "./actions";

// Never indexed, never cached: every request checks the session.
export const metadata: Metadata = {
  title: { default: "Datenraum", template: "%s | HeyMeister Datenraum" },
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};
export const dynamic = "force-dynamic";

export default async function DataroomLayout({ children }: { children: ReactNode }) {
  const profile = await getCurrentProfile();
  return (
    <>
      <header className="border-b border-line bg-surface">
        <Container className="flex h-16 items-center gap-4">
          <Link href="/dataroom" className="flex shrink-0 items-center gap-3" aria-label="HeyMeister Datenraum, Übersicht">
            <Logo className="h-6 w-auto" title={null} />
            <span className="label hidden border-l border-line pl-3 text-ink-muted sm:inline">Datenraum</span>
          </Link>
          {profile && (
            <nav aria-label="Datenraum" className="ml-auto flex items-center gap-2 text-small sm:gap-4">
              {profile.role === "admin" && (
                <>
                  <Link href="/dataroom" className="rounded-control px-2 py-2 font-semibold text-ink hover:bg-surface-2">
                    Dokumente
                  </Link>
                  <Link href="/dataroom/admin" className="rounded-control px-2 py-2 font-semibold text-ink hover:bg-surface-2">
                    Verwaltung
                  </Link>
                </>
              )}
              <span className="hidden text-ink-muted md:inline">{profile.full_name}</span>
              <form action={signOut}>
                <button type="submit" className="rounded-control border border-base px-3 py-2 font-semibold text-ink hover:bg-surface-raised">
                  Abmelden
                </button>
              </form>
            </nav>
          )}
        </Container>
      </header>
      <main id="main" className="flex-1 bg-surface">
        {children}
      </main>
      <footer className="border-t border-line bg-surface">
        <Container className="flex flex-wrap gap-x-6 gap-y-2 py-6 text-small text-ink-muted">
          <span>Vertraulich. Inhalte nur für den persönlichen Gebrauch der eingeladenen Person.</span>
          <Link href="/impressum" className="hover:text-ink hover:underline">
            Impressum
          </Link>
          <Link href="/datenschutz" className="hover:text-ink hover:underline">
            Datenschutz
          </Link>
        </Container>
      </footer>
    </>
  );
}
