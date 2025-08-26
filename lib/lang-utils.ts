
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


export async function langQuery(lang: string, region: string) {

  

  const res = await fetch("http://localhost:3000/api/region-lang", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lang, region }), // 👈 send both
  })

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`)
  }

  const data = await res.json()
  console.log("send res", data)

  return data
}
