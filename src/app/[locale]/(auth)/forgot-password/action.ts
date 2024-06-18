"use server"

import { env } from "@/env.mjs"
import Email from "@/templates/email"
import { render } from "@react-email/render"
import { v4 as uuid } from "uuid"

import { sendEmail } from "@/lib/email"
import { primsa } from "@/lib/primsa"
import { ForgotPasswordSchemaType } from "@/app/[locale]/(auth)/forgot-password/page"

export const sendPasswordResetEmail = async ({
  email,
}: ForgotPasswordSchemaType) => {
  try {
    const token = uuid()
    // 先查询是否有账号
    const existUser = await primsa.user.findFirst({
      where: {
        email,
      },
    })

    if (!existUser) {
      return {
        error: "用户不存在",
      }
    }

    await primsa.passwordResetToken.create({
      data: {
        identifier: email,
        token,
        expires: new Date(Date.now() + 60 * 60 * 1000 * 3),
      },
    })

    const baseUrl = `${env.NEXT_PUBLIC_APP_URL}/activate?token=${token}`

    const emailHtml = render(
      await Email({ baseUrl, namespace: "forgotPassword" })
    )

    await sendEmail({
      to: email,
      subject: "发送成功",
      html: emailHtml,
    })
  } catch (err) {
    return {
      error: "发送失败，请重试",
    }
  }
}
