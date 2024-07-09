"use server"

import { getTranslations } from "next-intl/server"

import { primsa } from "@/lib/primsa"
import { sendActiveEmail } from "@/app/[locale]/(auth)/register/action"

export const activateUser = async (token: string) => {
  const t = await getTranslations("activate")
  const verificationToken = await primsa.verificationToken.findUnique({
    where: {
      token,
    },
  })

  if (!verificationToken || verificationToken.expires < new Date()) {
    return {
      error: t("activateLinkExpires"),
    }
  }
  const user = await primsa.user.findUnique({
    where: {
      email: verificationToken.identifier,
    },
  })

  if (!user) {
    return {
      error: t("errorMsg"),
    }
  }

  await primsa.verificationToken.delete({
    where: {
      token: verificationToken.token,
    },
  })

  await primsa.user.update({
    where: {
      id: user.id,
    },
    data: {
      emailVerified: new Date(),
    },
  })
  return {
    success: t("activateSuccess"),
  }
}

export const resendActiveEmail = async (token?: string | null) => {
  const t = await getTranslations("activate")

  if (!token) {
    return {
      error: t("activateLinkExpires"),
    }
  }
  const data = await primsa.verificationToken.findUnique({
    where: {
      token,
    },
  })

  if (data) {
    await sendActiveEmail({
      email: data.identifier,
      subject: t("activateEmailSubject"),
      namespace: "activateEmail",
    })
    await primsa.verificationToken.delete({
      where: {
        token,
      },
    })
  } else {
    return {
      error: t("activateEmailSendFailed"),
    }
  }
}
