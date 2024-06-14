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
        title: t("errorMsg"),
        variant: "destructive",
        description: res?.error || t("loginFailedMsg"),
      })
    } else {
      toast({
        title: t("activateEmailSend"),
        description: t("activateEmailSendMsg"),
        duration: 5000,
      })
    }
  }
  useEffect(() => {
    activate()
  }, [activate])

  if (!error && !success) {
    return (
      <div className="mt-[20px] px-[100px]">
        <Alert>
          <AlertTitle className="flex items-center gap-2">
            {t("activateMsg")}
          </AlertTitle>
        </Alert>
      </div>
    )
  }

  if (success) {
    return (
      <div className="mt-5 px-20">
        <Alert>
          <AlertTitle>🎉🎉🎉{t("activateSuccess")}</AlertTitle>
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
    <div className="mt=[20px] px-[100px]">
      <Alert>
        <AlertDescription className="flex items-center gap-2">
          {error}
          <Button color="green" variant="link" onClick={resendEmail}>
            {t("activateEmailSend")}
          </Button>
        </AlertDescription>
      </Alert>
    </div>
  )
}
