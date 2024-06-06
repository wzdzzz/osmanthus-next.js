"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
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
import {
  loginWithCredentials,
  loginWithGithub,
} from "@/app/(auth)/login/action"

const loginFormSchema = z.object({
  email: z.string().email({
    message: "无效的邮箱格式",
  }),
  password: z.string().min(1, {
    message: "不能为空",
  }),
})

export type loginFormSchemaType = z.infer<typeof loginFormSchema>

export default function LoginPage() {
  const { toast } = useToast()

  const form = useForm<loginFormSchemaType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: loginFormSchemaType) {
    const res = await loginWithCredentials(values)
    console.log(res)

    if (res?.error) {
      toast({
        title: "登录失败",
        variant: "destructive",
        description: "请检查邮箱和密码是否正确",
      })
    } else {
      toast({
        title: "登录成功",
        duration: 5000,
      })
    }
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
                <h1 className="text-2xl font-bold text-[#6960EC]">登录</h1>
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
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
                  </FormItem>
                )}
              />
              <div className="mt-[20px] flex justify-between">
                <Button size="lg" className="w-full" type="submit">
                  登录
                </Button>
              </div>
              <div className="mt-2 flex flex-col gap-3">
                <div className="flex gap-2">
                  <Button
                    size="lg"
                    variant="secondary"
                    type="button"
                    className="flex flex-1 justify-center gap-1 px-0"
                    onClick={() => loginWithGithub()}
                  >
                    GitHub登录
                  </Button>
                </div>
                <Link href="/register">
                  <Button
                    size="lg"
                    variant="link"
                    className="mt-[12px] w-full"
                    type="button"
                  >
                    还没有账号？注册新用户
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
