import "server-only";
import { createServerClient } from "@supabase/ssr";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

/**
 * Supabase configuration. Accepts the new key names (publishable/secret) and the legacy ones
 * (anon/service_role). Without configuration the data room shows a setup notice.
 */
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || "";
export const supabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() || "";
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY?.trim() || process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() || "";

export const BUCKET = "dataroom";

export function isDataroomConfigured(): boolean {
  return Boolean(supabaseUrl && supabasePublishableKey && supabaseSecretKey);
}

/** Session-aware client (reads/writes the auth cookies). Used for sign-in and getUser() only. */
export async function createSessionClient() {
  const cookieStore = await cookies();
  return createServerClient(supabaseUrl, supabasePublishableKey, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (toSet) => {
        try {
          for (const { name, value, options } of toSet) cookieStore.set(name, value, options);
        } catch {
          // Called from a Server Component: cookies are refreshed by the proxy instead.
        }
      },
    },
  });
}

let adminClient: SupabaseClient | null = null;

/**
 * Privileged client with the secret key. Server only. Bypasses RLS, so every call site must
 * check the current user's role and access rights first (see auth.ts).
 */
export function createAdminClient(): SupabaseClient {
  if (!adminClient) {
    adminClient = createClient(supabaseUrl, supabaseSecretKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return adminClient;
}
