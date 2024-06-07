"use server"

import { AuthError } from "next-auth"

import { signIn } from "@/config/auth.config"
import { primsa } from "@/lib/primsa"
import { loginFormSchemaType } from "@/app/[lang]/(auth)/login/page"

export const loginWithGithub = async () => {
  await signIn("github", {
    redirectTo: "/user",
  })
}

export const loginWithCredentials = async (
  credentials: loginFormSchemaType
) => {
  try {
    const existUser = await primsa.user.findUnique({
      where: {
        email: credentials.email,
      },
    })
    console.log(JSON.stringify(existUser), "existUser")
    if (!existUser || !existUser.email) {
      return {
        error: "用户名不存在",
      }
    }

    if (!existUser.emailVerified) {
      return {
        error: "用户未激活，请激活后登录",
      }
    }

    await signIn("credentials", {
      ...credentials,
      redirectTo: "/user",
    })
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        error: "用户名或密码错误",
      }
    }

    // 这里一定要抛出异常，不然成功登录后不会重定向
    throw error
  }
}
