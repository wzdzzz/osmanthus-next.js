"use server"

import { env } from "@/env.mjs"
import Email from "@/templates/email"
import { render } from "@react-email/render"
import { getTranslations } from "next-intl/server"
import { v4 as uuid } from "uuid"

import { sendEmail } from "@/lib/email"
import { primsa } from "@/lib/primsa"
import { ForgotPasswordSchemaType } from "@/app/[locale]/(auth)/forgot-password/page"

export const sendPasswordResetEmail = async ({
  email,
}: ForgotPasswordSchemaType) => {
  const t = await getTranslations("login")
  try {
    const token = uuid()

    const existUser = await primsa.user.findFirst({
      where: {
        email,
      },
    })

    if (!existUser) {
      return {
        error: t("userNotExist"),
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
      await Email({ baseUrl, namespace: "forgotPasswordEmail" })
    )

    await sendEmail({
      to: email,
      subject: t("resetPassword"),
      html: emailHtml,
    })
  } catch (err) {
    return {
      error: t("sendFailed"),
    }
  }
}
