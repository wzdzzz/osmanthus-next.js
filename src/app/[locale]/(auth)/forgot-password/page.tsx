"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
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
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { sendPasswordResetEmail } from "@/app/[locale]/(auth)/forgot-password/action"

const ForgotPasswordSchema = z.object({
  email: z.string().email({
    message: "邮箱格式不正确",
  }),
})

export type ForgotPasswordSchemaType = z.infer<typeof ForgotPasswordSchema>

export default function ForgotPassword() {
  const t = useTranslations("login")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const form = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = async (values: ForgotPasswordSchemaType) => {
    setLoading(true)

    const result = await sendPasswordResetEmail(values)

    if (result?.error) {
      toast({
        title: t("sendFailed"),
        description: result.error,
        variant: "destructive",
      })
    } else {
      toast({
        title: t("sendSuccess"),
        description: t("sendSuccessDescription"),
      })
    }
    setLoading(false)
  }

  return (
    <Card className="mx-auto mt-10 max-w-[90vw] md:max-w-md">
      <CardHeader>
        <CardTitle>{t("forgotPassword")}</CardTitle>
        <CardDescription>{t("forgotPasswordDescription")}</CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <div>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div>
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
              </div>
              <div className="mt-4">
                <Button
                  size="lg"
                  type="submit"
                  className="w-full"
                  disabled={loading}
                >
                  {t("sendEmail")}
                </Button>
              </div>
            </form>
          </div>
        </Form>
      </CardContent>
    </Card>
  )
}
