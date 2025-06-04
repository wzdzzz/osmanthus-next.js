"use client"

import * as React from "react"
import { useTransition } from "react"
import { useSearchParams } from "next/navigation"
import { usePathname, useRouter } from "@/i18n/navigation"
import { localesMap } from "@/i18n/request"
import { routing } from "@/i18n/routing"
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
        <Button className="h-8 w-8 border-none" variant="link">
          {localesMap[locale]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div>
          {routing.locales.map((key) => {
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
