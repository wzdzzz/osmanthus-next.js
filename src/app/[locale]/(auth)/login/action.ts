"use server"

import { AuthError } from "next-auth"
import { getTranslations } from "next-intl/server"

import { signIn } from "@/config/auth.config"
import { primsa } from "@/lib/primsa"
import { loginFormSchemaType } from "@/app/[locale]/(auth)/login/page"

export const loginWithGithub = async () => {
  await signIn("github", {
    redirectTo: `/`,
  })
}

export const loginWithGoogle = async () => {
  await signIn("google", {
    redirectTo: `/`,
  })
}

export const loginWithGitee = async () => {
  await signIn("gitee", {
    redirectTo: `/`,
  })
}

export const loginWithCredentials = async (
  credentials: loginFormSchemaType
) => {
  const t = await getTranslations("login")
  try {
    const existUser = await primsa.user.findUnique({
      where: {
        email: credentials.email,
      },
    })
    if (!existUser || !existUser.email) {
      return {
        error: t("loginErrMsg"),
      }
    }

    if (!existUser.emailVerified) {
      return {
        error: t("noActivate"),
      }
    }

    await signIn("credentials", {
      ...credentials,
      redirectTo: `/`,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        error: t("loginErrMsg"),
      }
    }

    throw error
  }
}
