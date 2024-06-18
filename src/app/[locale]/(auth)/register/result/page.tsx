import Link from "next/link"
import { useTranslations } from "next-intl"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function Page() {
  const t = useTranslations("register")
  return (
    <div className="mt-5 px-4 md:px-20">
      <Alert className="text-md p-8">
        <AlertTitle className="item-center mb-4 flex">
          🎉🎉🎉{t("registerSuccessMsg")}
        </AlertTitle>
        <AlertDescription>
          {t("hasActivate")}
          <Link href={"/login"} className="underline">
            {t("toLogin")}
          </Link>
        </AlertDescription>
      </Alert>
    </div>
  )
}
