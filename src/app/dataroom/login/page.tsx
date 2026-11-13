import { redirect } from "next/navigation";
import { Container } from "@/components/ui/layout";
import { getCurrentProfile } from "@/lib/dataroom/auth";
import { isDataroomConfigured } from "@/lib/dataroom/supabase";
import { LoginForm } from "./LoginForm";
import { SetupNotice } from "../SetupNotice";

export const metadata = { title: "Anmelden" };

export default async function DataroomLoginPage() {
  if (!isDataroomConfigured()) return <SetupNotice />;
  const profile = await getCurrentProfile();
  if (profile) redirect(profile.role === "admin" ? "/dataroom/admin" : "/dataroom");

  return (
    <Container className="max-w-md py-16 sm:py-24">
      <p className="label text-accent-dark">Investoren</p>
      <h1 className="mt-3 text-heading text-ink">Datenraum</h1>
      <p className="mt-3 text-ink-muted">Melden Sie sich mit den Zugangsdaten an, die Sie von uns erhalten haben.</p>
      <div className="mt-8 rounded-card border border-line bg-surface-raised p-6">
        <LoginForm />
      </div>
      <p className="mt-6 text-small text-ink-muted">
        Kein Zugang oder Passwort vergessen? Bitte wenden Sie sich direkt an Ihre Ansprechperson bei HeyMeister.
      </p>
    </Container>
  );
}
