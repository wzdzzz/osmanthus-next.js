"use client"

import { SetStateAction, useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useTranslations } from "next-intl"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import {
  activateUser,
  resendActiveEmail,
} from "@/app/[locale]/(auth)/activate/action"

export default function Page() {
  const t = useTranslations("activate")
  const { toast } = useToast()
  const params = useSearchParams()
  const token = params.get("token")

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const activate = useCallback(() => {
    setError("")
    setSuccess("")

    if (!token) {
      setError(t("errorMsg"))
      return
    }

    activateUser(token).then(
      (result: {
        error?: SetStateAction<string>
        success?: SetStateAction<string>
      }) => {
        if (result?.success) {
          setSuccess(result?.success)
        } else {
          setError(result.error || t("errorMsg"))
        }
      }
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  const resendEmail = async () => {
    const res = await resendActiveEmail(token)
    if (res?.error) {
      toast({
        title: t("activateEmailSendFailed"),
        variant: "destructive",
        description: res?.error || t("activateEmailSendFailed"),
      })
    } else {
      toast({
        title: t("activateEmailSend"),
        description: t("activateEmailSendSuccess"),
        duration: 5000,
      })
    }
  }
  useEffect(() => {
    activate()
  }, [activate])

  if (!error && !success) {
    return (
      <div className="mt-5 px-4 md:px-20">
        <Alert className="text-md p-8">
          <AlertTitle className="flex items-center gap-2">
            {t("activateMsg")}
          </AlertTitle>
        </Alert>
      </div>
    )
  }

  if (success) {
    return (
      <div className="mt-5 px-4 md:px-20">
        <Alert className="text-md p-8">
          <AlertTitle className="mb-4">🎉🎉🎉{t("activateSuccess")}</AlertTitle>
          <AlertDescription>
            <Link href={"/login"}>
              <Button color="green" variant="link">
                {t("activateLogin")}
              </Button>
            </Link>
          </AlertDescription>
        </Alert>
      </div>
    )
  }
  return (
    <div className="mt-5 px-4 md:px-20">
      <Alert className="text-md mb-4 p-8">
        <AlertTitle className="flex items-center gap-2">
          {error}
          <span className="cursor-pointer underline" onClick={resendEmail}>
            {t("activateEmailSend")}
          </span>
        </AlertTitle>
      </Alert>
    </div>
  )
}
