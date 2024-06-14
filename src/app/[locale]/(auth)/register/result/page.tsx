import Link from "next/link"
import { useTranslations } from "next-intl"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function Page() {
  const t = useTranslations("login")
  return (
    <div className="mt-5 px-4 md:px-20">
      <Alert>
        <AlertTitle className="item-center flex">
          🎉🎉🎉{t("registerSuccess")}
        </AlertTitle>
        <AlertDescription>
          {t("registerActivateEmail")}
          <br />
          <Link href={"/login"} className="text-blue-500">
            {t("registerActivate")}
          </Link>
        </AlertDescription>
      </Alert>
    </div>
  )
}
