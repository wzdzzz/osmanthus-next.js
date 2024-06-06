"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { ReloadIcon } from "@radix-ui/react-icons"
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
import { useToast } from "@/components/ui/use-toast"
import ColorfulCard from "@/components/colorful-card"

import { register, sendActiveEmail } from "./action"

import "./index.css"

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
        title: "注册失败",
        description: result.error,
        variant: "destructive",
      })
    } else {
      console.log("zccg")
      // 注册成功，跳到注册结果页
      router.push("/register/result")
      await sendActiveEmail({ email: values.email })
    }
    setLoading(false)
  }

  return (
    <div className="flex justify-center py-[100px]">
      <ColorfulCard>
        <Form {...form}>
          <div>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-[420px] p-[20px]"
            >
              <div className="my-[20px] flex justify-center">
                <h1 className="text-2xl font-bold text-[#6960EC]">注册</h1>
              </div>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>用户名</FormLabel>
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
                  <FormItem className="mt-[20px]">
                    <FormLabel>邮箱</FormLabel>
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
                  <FormItem className="mt-[20px]">
                    <FormLabel>密码</FormLabel>
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
                  注册
                </Button>
              </div>
              <div className="flex flex-col gap-3">
                <Link href={"/login"}>
                  <Button
                    disabled={loading}
                    size="lg"
                    variant="link"
                    className="mt-[12px] w-full"
                    type="button"
                  >
                    已有账号？返回登录
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
