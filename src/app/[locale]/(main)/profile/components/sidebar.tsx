import Link from "next/link"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"

export default function Sidebar() {
  const t = useTranslations("profile")
  return (
    <div className="hidden py-4 md:block">
      <div className="p-2">
        <h3 className="mb-4 px-3 font-bold tracking-tight">{t("title")}</h3>
        <div className="space-y-4">
          <Button asChild variant="secondary" className="w-full justify-start">
            <Link href={"/profile"}>{t("profile")}</Link>
          </Button>

          <Button asChild variant="secondary" className="w-full justify-start">
            <Link href={"/profile/change-password"}>{t("changePassword")}</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
