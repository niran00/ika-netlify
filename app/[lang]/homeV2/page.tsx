


import React from "react";
import HomepageClient2 from "@/components/page-components/homepage2Client";
import { locales } from "@/lib/lang-utils"
import { Metadata } from "next"
import { getDictionary } from "@/get-dictionary";
import HomepageClient from "@/components/page-components/homepageClient";

// Tell Next.js to pre-render for all languages
export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}


export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang
}

// ✅ Server Component: receives params, fetches on server, no hooks.
export default async function HomepageV2({
  params,
}: {
  params: { lang: string };
}) {
  const lang = params.lang;  
  await new Promise((resolve) => setTimeout(resolve, 4000));

  // ✅ Render plain JSX — no useState/useEffect needed
  return (
        
        <>
        <style>{`
        .header1 {
          display: none !important;
        }
        .header2 {
          display: block !important;
        }
      `}</style>
        <HomepageClient></HomepageClient>
        </>
  );
}
