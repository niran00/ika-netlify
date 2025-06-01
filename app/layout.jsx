import { Inter } from "next/font/google"
import "./globals.css"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "IKA - Laboratory & Process Technology",
  description: "Leading manufacturer of laboratory and process technology equipment",
    generator: 'v0.dev'
}

function getBranchFromPath(pathname) {
  if (pathname.startsWith("/process")) return "process"
  if (pathname.startsWith("/bioprocessing")) return "bioprocessing"
  if (pathname.startsWith("/ev-battery")) return "ev-battery"
  return "laboratory"
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SidebarProvider defaultOpen={false}>
          <div className="flex min-h-screen w-full flex-col md:flex-row">
            <AppSidebar />
            <div className="flex-1 flex flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  )
}
