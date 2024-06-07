"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { i18n, localeMap } from "@/config/i18n.config"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function LocaleChange({ url }: { url?: string }) {
  const router = useRouter()

  function onClick(locale: string) {
    const newPathname =
      `${locale}${url}` ||
      window.location.pathname.replace(/^\/[a-z]{2}/, `/${locale}`)

    router.push(`/${newPathname}/`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="h-8 w-8 bg-white">
          <span className="sr-only text-white">切换</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div>
          {i18n.locales.map((locale) => {
            return (
              // <Link href={redirectedPathName(locale)}>{locale}</Link>
              <DropdownMenuItem key={locale} onClick={() => onClick(locale)}>
                <span>{localeMap[locale]}</span>
              </DropdownMenuItem>
            )
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
