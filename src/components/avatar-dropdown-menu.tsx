import React from "react"
import Link from "next/link"
import { Avatar } from "@nextui-org/react"
import { getTranslations } from "next-intl/server"

import { auth, signOut } from "@/config/auth.config"
import { AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default async function AvatarDropdownMenu() {
  const session = await auth()
  const t = await getTranslations("userMenu")
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-8 w-8 rounded-full bg-gray-200"
        >
          <Avatar size="sm">
            <AvatarImage
              src={session?.user?.image || ""}
              alt={session?.user?.name || ""}
            ></AvatarImage>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuPortal>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {session?.user?.name}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {session?.user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link href={"/profile"} className="w-full">
                {t("profile")}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={"/setting"} className="w-full">
                {t("setting")}
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <form
              className={"w-full"}
              action={async () => {
                "use server"
                await signOut({ redirectTo: `/login` })
              }}
            >
              <Button variant="ghost" className="w-full">
                <span> {t("logout")}</span>
              </Button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  )
}
