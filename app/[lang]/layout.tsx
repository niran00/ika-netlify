
import { Inter } from "next/font/google"
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Metadata } from "next"
import { getDictionary } from "@/get-dictionary"
import { DictionaryProvider } from "@/context/dictionary-context";

const inter = Inter({ subsets: ["latin"] })
import React, { useEffect, useState } from "react";

// export const metadata = {
//   title: "IKA - Laboratory & Process Technology",
//   description: "Leading manufacturer of laboratory and process technology equipment",
//     generator: 'v0.dev'
// }

function getBranchFromPath(pathname : string) { 
  if (pathname.startsWith("/process")) return "process"
  if (pathname.startsWith("/bioprocessing")) return "bioprocessing"
  if (pathname.startsWith("/ev-battery")) return "ev-battery"
  return "laboratory"
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang || "en")
  return {
    title: dict.metaTitle,
    description: dict.metaDescription,
  }
}




export default async function RootLayout({
  children,
  params, 
}: Readonly<{
  children: React.ReactNode
  params : Promise<{lang : string}>
}>) {
  const {lang} = await params
  const dict = await getDictionary(lang || "en");
  // const [showNavbar, setShowNavbar] = useState(true);


  // useEffect(() => {
  //   const handleScroll = () => {
  //     setShowNavbar(window.scrollY > 10);
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  return (
    
    <html lang="en" suppressHydrationWarning>
      <DictionaryProvider lang={lang} dict={dict}>
      <body className={inter.className}>
        <SidebarProvider defaultOpen={false}>
          <div className="flex min-h-screen w-full flex-col md:flex-row">
            <AppSidebar />
            <div className="flex-1 flex flex-col">
              <Header hidden={false} />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </div>
        </SidebarProvider>
      </body>
      </DictionaryProvider>
    </html>
  )
}
