"use client"

import * as React from "react"
import { useTransition } from "react"
import { usePathname, useRouter } from "next/navigation"
import { locales } from "@/i18n"

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
  const [isPending, startTransition] = useTransition()

  function onClick(locale: string) {
    startTransition(() => {
      router.push(`/${locale}/${pathname}/`)
    })
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
          {locales.map((locale) => {
            return (
              <DropdownMenuItem key={locale} onClick={() => onClick(locale)}>
                <span>{locale}</span>
              </DropdownMenuItem>
            )
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
