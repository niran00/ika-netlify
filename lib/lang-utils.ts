export const locales = ["en", "th", "de"];
export const defaultLocale = "en";

export function getPath(lang: string, path: string): string {
  return `/${lang}${path === "/" ? "" : path}`;
}

export const getLocaleParam = (lang: string): string => {
  if (lang === "th") return "th-TH";
  if (lang === "de") return "de-DE"; // German
  return "en";
};