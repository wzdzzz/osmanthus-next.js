"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import PasswordInput from "@/components/password-input"

import { changeOldPassword } from "./action"

const ChangePasswordSchemaFn = (t?: (arg: string) => string) =>
  z
    .object({
      password: z.string().min(1, {
        message: t?.("invalidPassword"),
      }),
      oldPassword: z.string().min(1, {
        message: t?.("invalidPassword"),
      }),
      confirmPassword: z.string().min(1, {
        message: t?.("invalidPassword"),
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t?.("passwordNotMatch"),
      path: ["confirmPassword"],
    })

const ChangePasswordSchema = ChangePasswordSchemaFn()
export type ChangePasswordSchemaType = z.infer<typeof ChangePasswordSchema>

export default function ChangePassword() {
  const t = useTranslations("profile")
  const [loading, setLoading] = useState(false)

  const form = useForm<any>({
    resolver: zodResolver(ChangePasswordSchemaFn(t)),
    defaultValues: {
      password: "",
      oldPassword: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (values: ChangePasswordSchemaType) => {
    setLoading(true)

    const result = await changeOldPassword({ ...values })
    setLoading(false)

    if (result?.error) {
      toast({
        title: t("resetPasswordFailed"),
        description: result.error,
        variant: "destructive",
      })
    } else {
      toast({
        title: t("changePasswordSuccess"),
      })
    }
  }

  return (
    <div>
      <Form {...form}>
        <div>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <FormField
                control={form.control}
                name="oldPassword"
                render={({ field }) => (
                  <FormItem className="mt-5">
                    <FormLabel>{t("oldPassword")}</FormLabel>
                    <FormControl>
                      <PasswordInput
                        {...field}
                        placeholder={t("oldPasswordPlaceholder")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="mt-5">
                    <FormLabel>{t("newPassword")}</FormLabel>
                    <FormControl>
                      <PasswordInput
                        {...field}
                        placeholder={t("newPasswordPlaceholder")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="mt-5">
                    <FormLabel>{t("confirmPassword")}</FormLabel>
                    <FormControl>
                      <PasswordInput
                        {...field}
                        placeholder={t("confirmPasswordPlaceholder")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-4">
              <Button size="lg" type="submit" disabled={loading}>
                {loading && (
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                )}
                {t("submit")}
              </Button>
            </div>
          </form>
        </div>
      </Form>
    </div>
  )
}
