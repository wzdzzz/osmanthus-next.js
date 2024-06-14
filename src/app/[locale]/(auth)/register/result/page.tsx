import Link from "next/link"
import { useTranslations } from "next-intl"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function Page() {
  const t = useTranslations("login")
  return (
    <div className="mt-5 px-20">
      <Alert>
        <AlertTitle className="item-center flex">
          🎉🎉🎉{t("registerSuccess")}
        </AlertTitle>
        <AlertDescription>
          {t("registerActivateEmail")}
          <Link href={"/login"}>{t("registerActivate")}</Link>
        </AlertDescription>
      </Alert>
    </div>
  )
}
