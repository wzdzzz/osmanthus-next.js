"use server"

import bcrypt from "bcrypt"

import { primsa } from "@/lib/primsa"
import { RegisterFormSchemaType } from "@/app/(auth)/register/page"

export const register = async (data: RegisterFormSchemaType) => {
  const existUser = await primsa.user.findFirst({
    where: {
      email: data.email,
    },
  })

  if (existUser) {
    return {
      error: "用户已存在",
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
