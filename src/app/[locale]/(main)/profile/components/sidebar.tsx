"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTranslations } from "next-intl"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const sidebarNavList = [
  {
    title: "profile",
    href: "/profile",
  },
  {
    title: "changePassword",
    href: "/profile/change-password",
  },
]

export default function Sidebar() {
  const t = useTranslations("profile")
  const pathname = usePathname()

  return (
    <div className="hidden w-[300px] py-4 md:block md:border-r">
      <div className="p-2">
        <h3 className="mb-4 px-3 font-bold tracking-tight">{t("title")}</h3>
        <div className="space-y-4">
          {sidebarNavList.map((item) => (
            <Button
              key={item.title}
              asChild
              variant="secondary"
              className={cn(
                "w-full justify-start",
                pathname === item.href &&
                  "bg-primary/70 text-white hover:bg-primary/70"
              )}
            >
              <Link href={item.href}>{t(item.title)}</Link>
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
