"use server"

import { env } from "@/env.mjs"
import Email from "@/templates/email"
import { render } from "@react-email/render"
import bcrypt from "bcrypt"
import { getTranslations } from "next-intl/server"
import { v4 as uuid } from "uuid"

import { sendEmail } from "@/lib/email"
import { primsa } from "@/lib/primsa"
import { RegisterFormSchemaType } from "@/app/[locale]/(auth)/register/page"

export const register = async (data: RegisterFormSchemaType) => {
  const t = await getTranslations("register")

  const existUser = await primsa.user.findFirst({
    where: {
      email: data.email,
    },
  })

  if (existUser) {
    return {
      error: t("emailExist"),
    }
  }

  const hashedPassword = await bcrypt.hash(data.password, 10)

  await primsa.user.create({
    data: {
      email: data.email,
      name: data.username,
      password: hashedPassword,
    },
  })
}

export const sendActiveEmail = async (data: {
  email: string
  subject: string
}) => {
  const token = uuid()
  const { subject, email } = data

  await primsa.verificationToken.create({
    data: {
      identifier: email,
      token,
      expires: new Date(Date.now() + 60 * 60 * 1000),
    },
  })

  const baseUrl = `${env.NEXT_PUBLIC_APP_URL}/activate?token=${token}`

  const emailHtml = render(await Email({ baseUrl }))

  await sendEmail({
    to: email,
    subject,
    html: emailHtml,
  })
}
