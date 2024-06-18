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

const registerFormSchema = z.object({
  username: z.string().min(1, {
    message: "不能为空",
  }),
  password: z.string().min(1, {
    message: "不能为空",
  }),
  email: z.string().email({ message: "无效的邮箱格式" }),
})

export type RegisterFormSchemaType = z.infer<typeof registerFormSchema>

export default function RegisterPage() {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const t = useTranslations("login")

  const form = useForm<RegisterFormSchemaType>({
    resolver: zodResolver(registerFormSchema),
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
      // 注册成功，跳到注册结果页
      router.push("/register/result")
      await sendActiveEmail({ email: values.email })
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
                      <Input {...field} />
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
                  {t("register")}
                </Button>
              </div>
              <Link
                href={"/login"}
                className="mt-[12px] flex justify-center text-sm underline"
              >
                {t("backLogin")}
              </Link>
            </form>
          </div>
        </Form>
      </CardContent>
    </Card>
  )
}
