// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, locales } from "@/lib/lang-utils";

async function getRegionFromIP(ip: string | null): Promise<string | undefined> {
  if (!ip) return undefined;
  try {
    const res = await fetch(`https://ipapi.co/${ip}/country/`);
    if (!res.ok) return undefined;
    const countryCode = (await res.text())?.trim();
    return countryCode || undefined;
  } catch {
    return undefined;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  let region: string | undefined = request.cookies.get("region")?.value;

  if (!region) {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
               request.headers.get("x-real-ip")?.trim() ||
               null;
    region = await getRegionFromIP(ip);
  }

  const pathnameHasLocale = locales.some(
    (locale) =>
      pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  const locale = pathnameHasLocale ? null : defaultLocale;

  let res: NextResponse;
  if (locale) {
    request.nextUrl.pathname = `/${locale}${pathname}`;
    res = NextResponse.rewrite(request.nextUrl);
  } else {
    res = NextResponse.next();
  }

  if (region && !request.cookies.get("region")) {
    res.cookies.set("region", region, { path: "/", maxAge: 60 * 60 * 24 * 30 });
  }

  return res;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|.*\\.(?:ico|png|jpg|jpeg|mp4|webm|webp|ogg|mp3|wav|flac|svg|aac)$).*)',
  ],
};
