import type { Metadata } from "next"
import { Geist, Geist_Mono, Manrope } from "next/font/google"

import { PwaRegister } from "@/components/pwa-register"
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/theme-provider"

import "./globals.css"

const manrope = Manrope({ subsets: ["latin"], variable: "--font-sans" })

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Vendorzo POS",
  description: "Vendorzo POS by Eastrix Labs for modern point-of-sale operations.",
  applicationName: "Vendorzo",
  manifest: "/manifest.webmanifest",
  themeColor: "#151518",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Vendorzo",
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={manrope.variable} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <PwaRegister />
          {children}
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  )
}
