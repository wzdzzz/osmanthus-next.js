"use server"

import { primsa } from "@/lib/primsa"
import { sendActiveEmail } from "@/app/[locale]/(auth)/register/action"

export const activateUser = async (token: string) => {
  const verificationToken = await primsa.verificationToken.findUnique({
    where: {
      token,
    },
  })

  if (!verificationToken || verificationToken.expires < new Date()) {
    return {
      error: "当前链接已失效",
    }
  }
  const user = await primsa.user.findUnique({
    where: {
      email: verificationToken.identifier,
    },
  })

  if (!user) {
    return {
      error: "激活失败，请联系管理员",
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
    success: "激活成功",
  }
}

export const resendActiveEmail = async (token?: string | null) => {
  if (!token) {
    return {
      error: "当前链接已失效",
    }
  }
  const data = await primsa.verificationToken.findUnique({
    where: {
      token,
    },
  })
  console.log(data, "xxx")

  if (data) {
    await sendActiveEmail({ email: data.identifier, subject: "激活账号" })
  } else {
    return {
      error: "无法重新发送邮件，请联系管理员",
    }
  }
}
