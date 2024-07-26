import { Inter } from "next/font/google"
import { GoogleAnalytics } from "@next/third-parties/google"

import { Toaster } from "@/components/ui/toaster"

import "./globals.css"

import { headers } from "next/headers"
import { env } from "@/env.mjs"
import { NextUIProvider } from "@nextui-org/react"
import { getTranslations } from "next-intl/server"

import AuthProvider from "@/components/auth-provider"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export async function generateMetadata() {
  const header = headers()
  const locale = header.get("x-next-intl-locale")
  const t = await getTranslations({ locale, namespace: "metadata" })

  return {
    title: t("title"),
    description: t("description"),
  }
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
          <AuthProvider>
            <NextUIProvider>{children}</NextUIProvider>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>

      <GoogleAnalytics gaId={env.GOOGLE_GAID} />
    </html>
  )
}
