"use client"

import * as React from "react"
import { useEffect, useTransition } from "react"
import { usePathname, useRouter } from "next/navigation"
import { locales, localesMap } from "@/i18n"
import { useLocale } from "next-intl"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function LocaleChange() {
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale()
  console.log(locale, "locale")
  const [, startTransition] = useTransition()
  const [query, setQuery] = React.useState<string | null>(null)
  useEffect(() => {
    const url = new URL(window.location.href)
    setQuery(url.search)
  }, [])

  function onClick(locale: string) {
    startTransition(() => {
      const newPathName = query
        ? `/${locale}/${pathname}${query}`
        : `/${locale}/${pathname}`
      router.push(newPathName)
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="h-8 w-8" variant="link">
          {localesMap[locale]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div>
          {locales.map((key) => {
            return (
              <DropdownMenuItem key={key} onClick={() => onClick(key)}>
                <span>{localesMap[key]}</span>
              </DropdownMenuItem>
            )
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
