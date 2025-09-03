import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, locales } from "@/lib/lang-utils";

// let locales = ["en", "th"];
// let defaultLocale = "en";

function getLocale(request: NextRequest) {
  return defaultLocale; // you can extend this with accept-language later
}


async function getAPILocation() {
  try {
    const response = await fetch("https://ipapi.co/json/");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data; // full data object
  } catch (error) {
    console.error("Error fetching location:", error);
  }
}

// // Usage example:
// getAPILocation().then(data => console.log(data));


export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ---- Region handling ----
  const regionCookie = request.cookies.get("region");
  let region = regionCookie?.value; // default safe fallback

  let res: NextResponse;

  // ---- Locale handling ----
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameHasLocale) {
    const locale = getLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname}`;
    res = NextResponse.rewrite(request.nextUrl);
  } else {
    res = NextResponse.next();
  }

  // ---- Only fetch if cookie missing ----
  if (!regionCookie) {
    const countryData = await getAPILocation();
    if (countryData?.country_code) {
      console.log("current reg", countryData.country_code);
      region = countryData.country_code;
    }
    res.cookies.set("region", region, { path: "/" });
    console.log("Region cookie just set to:", region);
  } else {
    console.log("Region cookie exists:", region);
  }

  return res;
}


export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\.(?:ico|png|jpg|jpeg|mp4|webm|webp|ogg|mp3|wav|flac|svg|aac)$).*)",
  ],
};
