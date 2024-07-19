import { Avatar } from "@nextui-org/react"

import { auth } from "@/config/auth.config"
import { AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

export default async function Page() {
  const session = await auth()

  return (
    <div className="space-y-6 p-10">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Profile</h2>
        <p className="text-muted-foreground">Manage your account settings.</p>
      </div>

      <Separator className="my-6" />

      <div className="flex flex-col gap-10">
        <div className="flex gap-4">
          <div className="w-20 text-right">username:</div>
          <div className="">{session?.user?.name || ""}</div>
        </div>
        <div className="flex gap-4">
          <div className="w-20 text-right">email:</div>
          <div className="">{session?.user?.email || ""}</div>
        </div>
        <div className="flex gap-4">
          <div className="w-20 text-right">image:</div>
          <div className="">
            <Avatar size="sm">
              <AvatarImage
                src={session?.user?.image || ""}
                alt={session?.user?.name || ""}
              ></AvatarImage>
            </Avatar>
          </div>
        </div>
      </div>
    </div>
  )
}
