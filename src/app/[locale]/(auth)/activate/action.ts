"use server"

import { primsa } from "@/lib/primsa"

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
