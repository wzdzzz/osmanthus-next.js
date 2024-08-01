import React from "react"
import Link from "next/link"
import { getTranslations } from "next-intl/server"

import { auth } from "@/config/auth.config"
import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"
import AvatarDropdownMenu from "@/components/avatar-dropdown-menu"
import { LocaleChange } from "@/components/locale-change"
import MainNav from "@/components/main-nav"
import MobileNav from "@/components/mobile-nav"
import ModeChange from "@/components/mode-change"

export default async function SiteHeader({
  isAuthPage,
}: {
  isAuthPage?: boolean
}) {
  const session = await auth()
  const t = await getTranslations("siteHeader")

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        {isAuthPage ? (
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              {siteConfig.name}
            </span>
          </Link>
        ) : (
          <>
            <MainNav />
            <MobileNav />
          </>
        )}

        <div className="flex flex-1 items-center justify-end space-x-4">
          <LocaleChange />
          <ModeChange />

          {!isAuthPage && (
            <>
              {session?.user ? (
                <AvatarDropdownMenu />
              ) : (
                <>
                  <Link href={"/login"}>
                    <Button size="sm" color="primary" variant="ghost">
                      {t("login")}
                    </Button>
                  </Link>
                  <Link href={"/register"}>
                    <Button size="sm" color="primary">
                      {t("signUp")}
                    </Button>
                  </Link>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  )
}
