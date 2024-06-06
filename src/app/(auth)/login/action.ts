"use server"

import { AuthError } from "next-auth"

import { signIn } from "@/config/auth.config"
import { loginFormSchemaType } from "@/app/(auth)/login/page"

export const loginWithGithub = async () => {
  await signIn("github", {
    redirectTo: "/user",
  })
}

export const loginWithCredentials = async (
  credentials: loginFormSchemaType
) => {
  try {
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
