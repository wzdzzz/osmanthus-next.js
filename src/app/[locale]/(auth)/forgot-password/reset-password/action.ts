"use server"

import bcrypt from "bcrypt"
import { getTranslations } from "next-intl/server"

import { primsa } from "@/lib/primsa"
import { ResetPasswordSchemaType } from "@/app/[locale]/(auth)/forgot-password/reset-password/page"

const validateToken = async (token: string) => {
  const t = await getTranslations("resetPassword")
  const verificationToken = await primsa.passwordResetToken.findUnique({
    where: {
      token,
    },
  })

  if (!verificationToken || verificationToken.expires < new Date()) {
    return {
      error: t("activateLinkExpires"),
    }
  } else {
    await primsa.passwordResetToken.delete({
      where: {
        token,
      },
    })
    return {
      identifier: verificationToken.identifier,
    }
  }
}

export const resetPassword = async ({
  password,
  token,
}: ResetPasswordSchemaType & { token: string }) => {
  const t = await getTranslations("resetPassword")

  try {
    const res = await validateToken(token)
    if (res.identifier) {
      const user = await primsa.user.findFirst({
        where: {
          email: res.identifier,
        },
      })

      if (!user) {
        return {
          error: t("userNotExist"),
        }
      }

      const hashedPassword = await bcrypt.hash(password, 10)

      await primsa.user.update({
        where: {
          id: user.id,
        },
        data: {
          password: hashedPassword,
        },
      })
    } else {
      return res
    }
  } catch (err) {
    return {
      error: t("resetPasswordFailed"),
    }
  }
}
