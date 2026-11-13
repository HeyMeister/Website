/**
 * Creates the first data-room admin (later admins can be created in the admin UI).
 *
 *   npm run dataroom:create-admin -- --email name@example.de --name "Vorname Nachname"
 *
 * Reads NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY from .env.local. Prints a generated
 * password once; it is not stored anywhere else.
 */
import { createClient } from "@supabase/supabase-js";
import { parseArgs } from "node:util";
import { generatePassword } from "../src/lib/dataroom/rules";

async function main() {
  const { values } = parseArgs({ options: { email: { type: "string" }, name: { type: "string" } } });
  const email = values.email?.trim().toLowerCase();
  const name = values.name?.trim();
  if (!email || !name) {
    console.error('Usage: npm run dataroom:create-admin -- --email name@example.de --name "Vorname Nachname"');
    process.exit(1);
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secret = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !secret) {
    console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SECRET_KEY in .env.local");
    process.exit(1);
  }

  const db = createClient(url, secret, { auth: { persistSession: false, autoRefreshToken: false } });
  const password = generatePassword();
  const { data, error } = await db.auth.admin.createUser({ email, password, email_confirm: true, user_metadata: { full_name: name } });
  if (error || !data.user) {
    console.error("Could not create user:", error?.message);
    process.exit(1);
  }
  const { error: profileError } = await db
    .from("dataroom_profiles")
    .insert({ id: data.user.id, email, full_name: name, role: "admin" });
  if (profileError) {
    await db.auth.admin.deleteUser(data.user.id);
    console.error("Could not create profile (did you run supabase/migrations/0001_dataroom.sql?):", profileError.message);
    process.exit(1);
  }

  console.log("\nAdmin created. Sign in at /dataroom/login");
  console.log(`  E-Mail:   ${email}`);
  console.log(`  Passwort: ${password}`);
  console.log("\nStore the password in your password manager now. It is shown only once.\n");
}

main();
