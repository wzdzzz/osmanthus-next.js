"use client"

import React from "react"
import Link, { LinkProps } from "next/link"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { MenuIcon } from "@/components/icons/menu-icon"

export default function MobileNav() {
  const [open, setOpen] = React.useState(false)
  const t = useTranslations("siteHeader")

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
          onClick={() => setOpen((prev) => !prev)}
        >
          <MenuIcon />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="pr-0">
        <SheetTitle>
          <MobileLink
            href="/"
            className="flex items-center space-x-2"
            onOpenChange={setOpen}
          >
            <span className="font-bold">{siteConfig.name}</span>
          </MobileLink>
        </SheetTitle>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="space-y-3">
            {siteConfig.navList.map((navItem) => (
              <>
                <MobileLink
                  key={navItem.href}
                  href={navItem.href}
                  className="flex items-center space-x-2 font-semibold"
                  onOpenChange={setOpen}
                >
                  <span>{t(navItem.title)}</span>
                </MobileLink>

                {navItem.children?.length && (
                  <div className="space-y-2 pl-4 text-gray-500">
                    {navItem.children.map((child) => (
                      <MobileLink
                        key={child.href}
                        href={child.href}
                        className="flex items-center space-x-2"
                        onOpenChange={setOpen}
                      >
                        <span>{t(child.title)}</span>
                      </MobileLink>
                    ))}
                  </div>
                )}
              </>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}

function MobileLink({
  href,
  onOpenChange,
  children,
  className,
  ...props
}: MobileLinkProps) {
  const router = useRouter()
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString())
        onOpenChange?.(false)
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  )
}
