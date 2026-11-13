import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * 1. Data room (/dataroom): refreshes the Supabase session cookie on every request. The data room
 *    has its own login and is never behind the optional preview password.
 * 2. Everything else is public. An optional HTTP Basic Auth gate exists for previews, but it is
 *    strictly opt-in: it only runs when PREVIEW_AUTH is exactly "true" AND PREVIEW_PASSWORD is set.
 *    Any other combination (including missing variables) leaves the site open.
 */
export async function proxy(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/dataroom")) return refreshDataroomSession(req);
  return previewAuth(req);
}

async function refreshDataroomSession(req: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  let res = NextResponse.next({ request: req });
  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  if (!url || !key) return res;

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll: () => req.cookies.getAll(),
      setAll: (toSet) => {
        for (const { name, value } of toSet) req.cookies.set(name, value);
        res = NextResponse.next({ request: req });
        res.headers.set("X-Robots-Tag", "noindex, nofollow");
        for (const { name, value, options } of toSet) res.cookies.set(name, value, options);
      },
    },
  });
  // Triggers a token refresh if needed. Authorisation itself happens in the pages and actions.
  await supabase.auth.getUser();
  return res;
}

function previewAuth(req: NextRequest) {
  const password = process.env.PREVIEW_PASSWORD;
  // Opt-in only. Never lock the site because a variable is missing.
  if (process.env.PREVIEW_AUTH !== "true" || !password) return NextResponse.next();

  const header = req.headers.get("authorization");
  if (header?.startsWith("Basic ")) {
    try {
      const decoded = atob(header.slice(6));
      const supplied = decoded.slice(decoded.indexOf(":") + 1);
      if (timingSafeEqual(supplied, password)) return NextResponse.next();
    } catch {
      // fall through to 401
    }
  }

  return new NextResponse("Zugang geschützt.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="HeyMeister Vorschau", charset="UTF-8"',
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
