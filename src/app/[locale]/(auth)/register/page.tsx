"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
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

import { register, sendActiveEmail } from "./action"

const registerFormSchemaFn = (t?: (arg: string) => string) =>
  z.object({
    username: z.string().min(1, {
      message: t?.("invalidUsername"),
    }),
    password: z.string().min(1, {
      message: t?.("invalidPassword"),
    }),
    email: z.string().email({ message: "invalidEmail" }),
  })

const registerFormSchema = registerFormSchemaFn()
export type RegisterFormSchemaType = z.infer<typeof registerFormSchema>

export default function RegisterPage() {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const t = useTranslations("register")

  const form = useForm<RegisterFormSchemaType>({
    resolver: zodResolver(registerFormSchemaFn(t)),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: RegisterFormSchemaType) {
    setLoading(true)
    const result = await register(values)

    if (result?.error) {
      toast({
        title: t("registerFailed"),
        description: result.error,
        variant: "destructive",
      })
    } else {
      toast({
        title: t("registerSuccess"),
        description: t("registerSuccessDescription"),
      })
      router.push("/register/result")
      await sendActiveEmail({
        email: values.email,
        subject: t("activateEmailSubject"),
        namespace: "activateEmail",
      })
    }
    setLoading(false)
  }

  return (
    <Card className="mx-auto mt-10 max-w-[90vw] md:max-w-md">
      <CardHeader>
        <CardTitle className="text-xl">{t("register")}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <div>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("username")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={t("usernamePlaceholder")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="mt-5">
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
                    <FormLabel>{t("password")}</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                        placeholder={t("passwordPlaceholder")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="mt-[30px] flex justify-between">
                <Button
                  disabled={loading}
                  size="lg"
                  className="w-full"
                  type="submit"
                >
                  {loading && (
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {t("submit")}
                </Button>
              </div>

              <div className="mt-3 flex items-center justify-center gap-1 text-sm">
                {t("hasAccount")}
                <Link href={"/login"} className="flex underline">
                  {t("backLogin")}
                </Link>
              </div>
            </form>
          </div>
        </Form>
      </CardContent>
    </Card>
  )
}
