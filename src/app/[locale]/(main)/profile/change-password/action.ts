"use server"

import bcrypt from "bcrypt"
import { AuthError } from "next-auth"
import { getTranslations } from "next-intl/server"

import { auth } from "@/config/auth.config"
import { primsa } from "@/lib/primsa"

import { ChangePasswordSchemaType } from "./page"

// 校验旧密码
export const validatOldPassword = async (email: string, password: string) => {
  const t = await getTranslations("login")

  try {
    const user = await primsa.user.findFirst({
      where: {
        email,
      },
    })

    if (!user || !user.email) {
      return null
    }

    const isSame =
      user.password && (await bcrypt.compare(password, user.password))
    if (!isSame) {
      return {
        error: "旧密码错误，请重新输入",
      }
    }

    return { status: "success" }
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        error: "出错了，请重试",
      }
    }
  }
}

export const changeOldPassword = async (
  changePasswordSchema: ChangePasswordSchemaType
) => {
  const { oldPassword, password } = changePasswordSchema
  try {
    const session = await auth()
    const email: string = session?.user?.email || ""

    if (!email) {
      return {
        error: "请先登录",
      }
    }

    const res = await validatOldPassword(email, oldPassword)
    if (res?.status === "success") {
      const hashPassword = await bcrypt.hash(password, 10)
      await primsa.user.update({
        where: {
          email,
        },
        data: {
          password: hashPassword,
        },
      })
      return {
        status: "success",
      }
    } else {
      return res
    }
  } catch (error) {
    return {
      error: "出错了，请重试",
    }
  }
}
