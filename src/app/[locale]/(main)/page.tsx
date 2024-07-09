import Link from "next/link"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"

export default function Page() {
  const t = useTranslations("home")
  return (
    <div>
      <div className="py-36 text-center">
        <div className="mb-4 text-5xl font-semibold md:text-9xl">
          {t("title")}
        </div>
        <div className="mb-4 text-xl text-gray-400">{t("description")}</div>
        <Button className="px-10">
          <Link href={"/docs"}>{t("start")}</Link>
        </Button>
      </div>
      <div className=""></div>
    </div>
  )
}
