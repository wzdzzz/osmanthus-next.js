import React from "react"
import { Avatar } from "@nextui-org/react"

import { auth, signOut } from "@/config/auth.config"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const AvatarDropdownMenu = async () => {
  const session = await auth()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar src={session?.user?.image || ""}></Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuPortal>
        <DropdownMenuContent>
          <DropdownMenuItem className="">
            {session?.user?.name || "user"}
          </DropdownMenuItem>
          <div className="flex cursor-pointer justify-center">
            <form
              action={async () => {
                "use server"
                // 退出登录后，重定向首页
                await signOut({ redirectTo: `/login` })
              }}
            >
              <Button variant="link">退出登录</Button>
            </form>
          </div>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  )
}

export default AvatarDropdownMenu
