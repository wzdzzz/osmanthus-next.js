import { Inter } from "next/font/google"
import { GoogleAnalytics } from "@next/third-parties/google"

import { Toaster } from "@/components/ui/toaster"

import "./globals.css"
import "public/registry/themes.css"

import { cookies, headers } from "next/headers"
import { env } from "@/env.mjs"
import { NextUIProvider } from "@nextui-org/react"
import { getTranslations } from "next-intl/server"

import { siteConfig } from "@/config/site"
import AuthProvider from "@/components/auth-provider"
import { ThemeProvider } from "@/components/theme-provider"
import ThemeSwitcher from "@/components/theme-switcher"
import { ThemeWrapper } from "@/components/theme-wrapper"

const inter = Inter({ subsets: ["latin"] })

export async function generateMetadata() {
  const header = await headers()
  const locale = header.get("x-next-intl-locale")
  const t = await getTranslations({ locale, namespace: "metadata" })

  return {
    title: {
      default: t("title"),
      template: `%s | ${t("title")}`,
    },
    description: t("description"),
    metadataBase: new URL(siteConfig.url),
    keywords: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Server Components",
      "Radix UI",
      "Next.js template",
    ],
    authors: [
      {
        name: "this",
      },
    ],
    creator: "this",
    viewport: {
      width: "device-width",
      initialScale: 1,
      maximumScale: 1,
      minimumScale: 1,
      userScalable: false,
    },
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  let locale = cookieStore.get("NEXT_LOCALE")?.value
  console.log(locale)
  return (
    <html suppressHydrationWarning lang={locale}>
      <body className={inter.className}>
        <ThemeProvider>
          <AuthProvider>
            <NextUIProvider>
              <ThemeWrapper>{children}</ThemeWrapper>
              <ThemeSwitcher />
            </NextUIProvider>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>

      <GoogleAnalytics gaId={env.GOOGLE_GAID} />
    </html>
  )
}
