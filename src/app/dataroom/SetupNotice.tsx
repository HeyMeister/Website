import { Container } from "@/components/ui/layout";

/** Shown while the Supabase environment variables are missing. */
export function SetupNotice() {
  return (
    <Container className="max-w-xl py-16 sm:py-24">
      <p className="label text-accent-dark">Datenraum</p>
      <h1 className="mt-3 text-heading text-ink">Noch nicht eingerichtet</h1>
      <p className="mt-3 text-ink-muted">
        Der Datenraum braucht eine Supabase-Verbindung. Die Einrichtung ist in der README unter „Investor data room“
        beschrieben.
      </p>
    </Container>
  );
}
