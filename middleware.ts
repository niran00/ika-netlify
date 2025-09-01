import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, locales } from "@/lib/lang-utils";

// let locales = ["en", "th"];
// let defaultLocale = "en";

function getLocale(request: NextRequest) {
  return defaultLocale; // you can extend this with accept-language later
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ---- Region handling ----
  const regionCookie = request.cookies.get("region");
  let region = regionCookie?.value ?? "EU";

  // ---- Locale handling ----
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  let res: NextResponse;

  if (!pathnameHasLocale) {
    const locale = getLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname}`;
    res = NextResponse.rewrite(request.nextUrl);
  } else {
    res = NextResponse.next();
  }

  // ---- Set region cookie if missing ----
  if (!regionCookie) {
    res.cookies.set("region", region, { path: "/" });
  }

  // ---- Debug log ----
  if (regionCookie) {
    console.log("Region cookie exists:", regionCookie.value);
  } else {
    console.log("Region cookie just set to:", region);
  }

  return res;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\.(?:ico|png|jpg|jpeg|mp4|webm|webp|ogg|mp3|wav|flac|svg|aac)$).*)",
  ],
};
