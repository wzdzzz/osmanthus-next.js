"use client"

import { useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast"
import PasswordInput from "@/components/password-input"
import { resetPassword } from "@/app/[locale]/(auth)/forgot-password/reset-password/action"

const ResetPasswordSchemaFn = (t?: (arg: string) => string) =>
  z.object({
    password: z.string().min(1, {
      message: t?.("invalidPassword"),
    }),
  })

const ResetPasswordSchema = ResetPasswordSchemaFn()

export type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>

export default function ResetPasswordPage() {
  const t = useTranslations("resetPassword")
  const [loading, setLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { toast } = useToast()
  const params = useSearchParams()
  const token = params.get("token") || ""

  const form = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(ResetPasswordSchemaFn(t)),
    defaultValues: {
      password: "",
    },
  })

  const onSubmit = async (values: ResetPasswordSchemaType) => {
    setLoading(true)
    const result = await resetPassword({ ...values, token })
    setLoading(false)

    if (result?.error) {
      toast({
        title: t("resetPasswordFailed"),
        description: result.error,
        variant: "destructive",
      })
    } else {
      toast({
        title: t("resetPasswordSuccess"),
        description: t("resetPasswordSuccessDescription"),
      })
      setIsSuccess(true)
    }
  }

  return (
    <Card className="mx-auto mt-10 max-w-[90vw] md:max-w-md">
      {isSuccess ? (
        <CardHeader>
          <CardTitle>{t("resetPasswordSuccess")}</CardTitle>
          <CardDescription>
            <Link
              href={"/login"}
              className="ml-auto inline-block text-sm underline"
            >
              {t("toLogin")}
            </Link>
          </CardDescription>
        </CardHeader>
      ) : (
        <CardHeader>
          <CardTitle>{t("resetPassword")}</CardTitle>
          <CardDescription>{t("resetPasswordDescription")}</CardDescription>
        </CardHeader>
      )}

      {!isSuccess && (
        <CardContent>
          <Form {...form}>
            <div>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="mt-5">
                        <FormLabel>{t("newPassword")}</FormLabel>
                        <FormControl>
                          <PasswordInput
                            {...field}
                            placeholder={t("passwordPlaceholder")}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mt-4">
                  <Button
                    size="lg"
                    type="submit"
                    className="w-full"
                    disabled={loading}
                  >
                    {loading && (
                      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {t("submit")}
                  </Button>
                </div>
              </form>
            </div>
          </Form>
        </CardContent>
      )}
    </Card>
  )
}
