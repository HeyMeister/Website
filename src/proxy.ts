import { NextResponse, type NextRequest } from "next/server";

/**
 * Pre-launch protection (defence in depth next to Vercel Password Protection):
 * while PUBLIC_LAUNCH is not "true" and SITE_PASSWORD is set, every request requires
 * HTTP Basic Auth. The user name is ignored.
 */
export function proxy(req: NextRequest) {
  const password = process.env.SITE_PASSWORD;
  if (process.env.PUBLIC_LAUNCH === "true" || !password) return NextResponse.next();

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
