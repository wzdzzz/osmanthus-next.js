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
    host: env.MAIL_HOST,
    port: +(env.MAIL_PORT || 465),
    secure: true,
    auth: {
      user: env.MAIL_USER,
      pass: env.MAIL_PASS,
    },
  })

  return await transporter.sendMail({
    from: `web-nextjs <${env.MAIL_USER}>`,
    ...mailInfo,
  })
}
