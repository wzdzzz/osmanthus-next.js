import { Avatar } from "@nextui-org/react"
import { getTranslations } from "next-intl/server"

import { auth } from "@/config/auth.config"
import { AvatarImage } from "@/components/ui/avatar"

export default async function Page() {
  const session = await auth()
  const t = await getTranslations("profile")

  return (
    <div className="flex flex-col gap-10">
      <div className="flex gap-4">
        <div className="w-20 text-right text-gray-400">{t("username")}:</div>
        <div className="w-10">{session?.user?.name || ""}</div>
      </div>
      <div className="flex gap-4">
        <div className="w-20 text-right text-gray-400">{t("email")}:</div>
        <div className="">{session?.user?.email || ""}</div>
      </div>
      <div className="flex gap-4">
        <div className="w-20 text-right text-gray-400">{t("avatar")}:</div>
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
  )
}
