"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTranslations } from "next-intl"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

export default function MainNav() {
  const pathname = usePathname()
  const t = useTranslations("siteHeader")

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>

      <nav className="flex items-center gap-4 text-sm lg:gap-6">
        {siteConfig.navList.map((navItem, index) => (
          <Link
            key={index}
            href={navItem.href}
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname === navItem.href
                ? "text-foreground"
                : "text-foreground/60"
            )}
          >
            {t(navItem.title)}
          </Link>
        ))}
      </nav>
    </div>
  )
}
