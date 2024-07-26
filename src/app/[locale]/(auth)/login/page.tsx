"use client"

import { useState } from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { GiteeIcon } from "@/components/icons/gitee-icon"
import { GithubIcon } from "@/components/icons/github-icon"
import { GoogleIcon } from "@/components/icons/google-icon"
import PasswordInput from "@/components/password-input"
import {
  loginWithCredentials,
  loginWithGitee,
  loginWithGithub,
  loginWithGoogle,
} from "@/app/[locale]/(auth)/login/action"

const loginFormSchemaFn = (t?: (arg: string) => string) =>
  z.object({
    email: z.string().email({
      message: t?.("invalidEmail"),
    }),
    password: z.string().min(1, {
      message: t?.("invalidPassword"),
    }),
  })

const loginFormSchema = loginFormSchemaFn()

export type loginFormSchemaType = z.infer<typeof loginFormSchema>

export default function LoginPage() {
  const { toast } = useToast()
  const t = useTranslations("login")
  const [loading, setLoading] = useState(false)

  const form = useForm<loginFormSchemaType>({
    resolver: zodResolver(loginFormSchemaFn(t)),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: loginFormSchemaType) {
    setLoading(true)
    try {
      const res = await loginWithCredentials(values)
      setLoading(false)
      if (res?.error) {
        toast({
          title: t("loginFailed"),
          variant: "destructive",
          description: res?.error || t("loginFailedMsg"),
        })
        return true
      } else {
        toast({
          title: t("loginSuccess"),
          duration: 5000,
        })
      }
    } catch (err) {
      setLoading(false)
    }
  }

  return (
    <Card className="mx-auto mt-10 max-w-[90vw] md:max-w-md">
      <CardHeader>
        <CardTitle className="text-xl">{t("title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <div>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("email")}</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder={t("emailPlaceholder")} />
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
                    <FormLabel className="flex justify-between">
                      <div>{t("password")}</div>
                      <Link
                        href={"/forgot-password"}
                        className="ml-auto inline-block text-sm underline"
                      >
                        {t("forgotPassword")}
                      </Link>
                    </FormLabel>
                    <FormControl>
                      <PasswordInput
                        {...field}
                        placeholder={t("passwordPlaceholder")}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="mt-5 flex justify-between">
                <Button
                  size="lg"
                  className="w-full"
                  type="submit"
                  disabled={loading}
                >
                  {loading && (
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {t("submit")}
                </Button>
              </div>
              <div className="mt-8 flex flex-col gap-3">
                <div className="flex items-center justify-center gap-8">
                  <div
                    className="cursor-pointer rounded-full"
                    onClick={() => loginWithGithub()}
                  >
                    <GithubIcon classname="dark:fill-white" />
                  </div>
                  <div
                    className="cursor-pointer rounded-full"
                    onClick={() => loginWithGoogle()}
                  >
                    <GoogleIcon classname="dark:fill-white" />
                  </div>
                  <div
                    className="cursor-pointer rounded-full"
                    onClick={() => loginWithGitee()}
                  >
                    <GiteeIcon classname="dark:fill-white" />
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-center gap-1 text-sm">
                  {t("noAccount")}
                  <Link href={"/register"} className="flex underline">
                    {t("signUp")}
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </Form>
      </CardContent>
    </Card>
  )
}
