import React from "react";
import HomepageClient from "@/components/page-components/homepageClient";
import Homepage2Client from "@/components/page-components/homepage2Client";
import { locales } from "@/lib/lang-utils"
import { Metadata } from "next"
import { getDictionary } from "@/get-dictionary";



export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang || "en")
  return {
    title: dict.metaTitle,
    description: dict.metaDescription,
  }
}

export default async function HomePage() {
  // This makes loading.tsx show
  return <Homepage2Client />;
}