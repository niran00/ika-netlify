// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { defaultLocale, locales } from '@/lib/lang-utils';

// let locales = ["en", "th"];
// let defaultLocale = "en";

// Get the preferred locale, similar to the above or using a library
function getLocale(request: NextRequest) {
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // if (pathnameHasLocale) return;
  if (pathnameHasLocale) return NextResponse.next();

  const locale = getLocale(request);

  // Redirect if there is no locale

  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.rewrite(request.nextUrl); // "/" behaves the same as "/en"
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|.*\\.(?:ico|png|jpg|jpeg|mp4|webm|webp|ogg|mp3|wav|flac|aac)$).*)',
  ],
};

