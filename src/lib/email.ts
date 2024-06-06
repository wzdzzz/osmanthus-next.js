import { env } from "@/env.mjs"
import * as nodemailer from "nodemailer"

export interface MailInfo {
  to: string
  subject: string
  text?: string
  html?: string
}

export const sendEmail = async (mailInfo: MailInfo) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: +(process.env.MAIL_PORT || 465),
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  })

  return await transporter.sendMail({
    from: `web-nextjs <${env.MAIL_USER}>`,
    ...mailInfo,
  })
}
