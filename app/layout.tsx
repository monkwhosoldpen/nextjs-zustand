import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { DashboardProvider } from "@/lib"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Dashboard Sidebar",
  description: "Interactive dashboard with multi-tab sidebar navigation",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DashboardProvider>
          {children}
        </DashboardProvider>
      </body>
    </html>
  )
}
