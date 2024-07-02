// import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { Toaster } from "@/components/ui/toaster"

import "./globals.css"

import { NextUIProvider } from "@nextui-org/react"

// import { getTranslations } from "next-intl/server"

import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

// export const generateMetadata = async (): Promise<Metadata> => {
//   const t = await getTranslations("metadata")
//
//   return {
//     title: t("title"),
//     description: t("description"),
//   }
// }

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
