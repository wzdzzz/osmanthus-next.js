import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"

import { Toaster } from "@/components/ui/toaster"

import "./globals.css"

import { NextUIProvider } from "@nextui-org/react"

import { ThemeProvider } from "@/components/providers/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata & Viewport = {
  title: "Web Nextjs",
  description: "Web Nextjs",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <NextUIProvider>{children}</NextUIProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
