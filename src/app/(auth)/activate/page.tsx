"use client"

import { SetStateAction, useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { activateUser } from "@/app/(auth)/activate/action"

export default function Page() {
  const params = useSearchParams()
  const token = params.get("token")

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const activate = useCallback(() => {
    setError("")
    setSuccess("")

    if (!token) {
      setError("出错了")
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
          setError(result.error || "出错了")
        }
      }
    )
  }, [token])

  useEffect(() => {
    activate()
  }, [activate])

  if (!error && !success) {
    return (
      <div className="mt-[20px] px-[100px]">
        <Alert>
          <AlertTitle className="flex items-center gap-2">激活中...</AlertTitle>
        </Alert>
      </div>
    )
  }

  if (success) {
    return (
      <div className="mt-[20px] px-[100px]">
        <Alert>
          <AlertTitle>🎉🎉🎉{success}</AlertTitle>
          <AlertDescription>
            <Link href={"/login"}>
              <Button color="green" variant="link">
                返回登录
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
        </AlertDescription>
      </Alert>
    </div>
  )
}
