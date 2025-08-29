"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import "flag-icons/css/flag-icons.min.css";

type Props = {
  currentLanguage: string;
};

export default function LanguageSwitcher({ currentLanguage }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const languages = [
    {
      code: "th",
      name: "English",
      shortName: "EN",
      flag: <span className="fi fi-us pointer-events-none" />,
    },
    {
      code: "en",
      name: "ไทย",
      shortName: "TH",
      flag: <span className="fi fi-th pointer-events-none" />,
    },
  ];

  const current = languages.find((lang) => lang.code === currentLanguage)!;
  const next = languages.find((lang) => lang.code !== currentLanguage)!;

  const handleLanguageChange = () => {
    const segments = pathname.split("/").filter(Boolean);

    if (segments.length === 0) {
      // If at `/`, just redirect to `/<next-lang>`
      router.push(`/${next.code}`);
      return;
    }

    // Replace the language segment
    segments[0] = next.code;

    const newPath = "/" + segments.join("/");
    const query = searchParams.toString();
    const fullUrl = query ? `${newPath}?${query}` : newPath;

    router.push(fullUrl);
  };

  return (
    <button
      onClick={handleLanguageChange}
      className="flex items-center space-x-2 px-3 py-2 z-10 rounded-md transition-colors"
    >
      <span className="md:hidden uppercase text-sm">{current.shortName}</span>
      <span className="text-sm">{current.flag}</span>
      <span className="hidden md:block text-sm">{current.name}</span>
    </button>
  );
}
