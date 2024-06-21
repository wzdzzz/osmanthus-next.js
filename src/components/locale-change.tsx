"use client"

import * as React from "react"
import { useTransition } from "react"
import { useSearchParams } from "next/navigation"
import { locales, localesMap } from "@/i18n"
import { useLocale } from "next-intl"
import { createSharedPathnamesNavigation } from "next-intl/navigation"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const { usePathname, useRouter } = createSharedPathnamesNavigation({
  locales,
  localePrefix: "never",
})

export function LocaleChange() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const locale = useLocale()

  const [, startTransition] = useTransition()

  function onClick(locale: string) {
    startTransition(() => {
      router.replace(`${pathname}?${searchParams.toString()}`, { locale })

      router.refresh()
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
