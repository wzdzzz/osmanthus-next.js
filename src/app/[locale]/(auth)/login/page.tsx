"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import ColorfulCard from "@/components/colorful-card"

import "./index.css"

import { useToast } from "@/components/ui/use-toast"
import { GiteeIcon } from "@/components/icons/gitee-icon"
import { GithubIcon } from "@/components/icons/github-icon"
import { GoogleIcon } from "@/components/icons/google-icon"
import {
  loginWithCredentials,
  loginWithGitee,
  loginWithGithub,
  loginWithGoogle,
} from "@/app/[locale]/(auth)/login/action"

const loginFormSchema = z.object({
  email: z.string().email({
    message: "邮箱格式不正确",
  }),
  password: z.string().min(1, {
    message: "密码不能为空",
  }),
})

export type loginFormSchemaType = z.infer<typeof loginFormSchema>

export default function LoginPage() {
  const { toast } = useToast()
  const t = useTranslations("login")

  const form = useForm<loginFormSchemaType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: loginFormSchemaType) {
    const res = await loginWithCredentials(values)

    if (res?.error) {
      toast({
        title: t("loginFailed"),
        variant: "destructive",
        description: res?.error || t("loginFailedMsg"),
      })
    } else {
      toast({
        title: t("loginSuccess"),
        duration: 5000,
      })
    }
  }

  return (
    <div className="flex justify-center pt-10 md:pt-20">
      <ColorfulCard>
        <Form {...form}>
          <div>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-[90vw] min-w-[300px] max-w-[420px] p-5"
            >
              <div className="my-5 flex justify-center">
                <h1 className="text-2xl font-bold text-primary">
                  {t("title")}
                </h1>
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("email")}</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                    <FormLabel>{t("password")}</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="mt-5 flex justify-between">
                <Button size="lg" className="w-full" type="submit">
                  {t("submit")}
                </Button>
              </div>
              <div className="mt-4 flex flex-col gap-3">
                <div className="flex items-center justify-center gap-3">
                  <div
                    className="cursor-pointer rounded-full"
                    onClick={() => loginWithGithub()}
                  >
                    <GithubIcon />
                  </div>
                  <div
                    className="cursor-pointer rounded-full"
                    onClick={() => loginWithGoogle()}
                  >
                    <GoogleIcon />
                  </div>
                  <div
                    className="cursor-pointer rounded-full"
                    onClick={() => loginWithGitee()}
                  >
                    <GiteeIcon />
                  </div>
                </div>

                <Link href={"/register"} className="mt-3 flex">
                  <Button
                    size="lg"
                    variant="link"
                    type="button"
                    className="flex-1"
                  >
                    {t("registerAccount")}
                  </Button>
                </Link>
              </div>
            </form>
          </div>
        </Form>
      </ColorfulCard>
    </div>
  )
}
