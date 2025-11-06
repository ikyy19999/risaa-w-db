import type React from "react"
import type { Metadata } from "next"
import { Geist, Playfair_Display } from "next/font/google"
import "./globals.css"
import { FloatingHearts } from "./components/floating-hearts"
import { PageTransition } from "./components/page-transition"
import DisableInspect from "./components/DisableRightClick"
import WelcomePage from "./welcome/page"
import Page from "./button/page"
import TawkToChat from "./components/TawkToChat"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "The Journey of Us",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className={`${geistSans.variable} ${playfair.variable} antialiased`}>
      <body className="min-h-screen bg-background font-sans text-foreground relative">
        <Page />
        <WelcomePage />
        <DisableInspect />
        <FloatingHearts />
        <TawkToChat />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  )
}
