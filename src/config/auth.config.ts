import Gitee from "@/providers/gitee"
import Credentials from "@auth/core/providers/credentials"
import Google from "@auth/core/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import bcrypt from "bcrypt"
import NextAuth from "next-auth"
import Github from "next-auth/providers/github"

import { primsa } from "@/lib/primsa"
import { loginFormSchemaType } from "@/app/[locale]/(auth)/login/page"

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/",
  },
  adapter: PrismaAdapter(primsa),
  session: {
    strategy: "jwt",
  },
  secret: process.env.SECRET,
  providers: [
    Github({
      allowDangerousEmailAccountLinking: true,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    // @ts-ignore
    Gitee({
      clientId: process.env.GITEE_CLIENT_ID,
      clientSecret: process.env.GITEE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      type: "credentials",
      authorize: async (credentials) => {
        const { email, password } = credentials as loginFormSchemaType
        if (!email || !password) {
          return null
        }
        const user = await primsa.user.findFirst({
          where: {
            email,
          },
        })

        if (!user || !user.email) {
          return null
        }

        if (!user.emailVerified) {
          return null
        }

        const isSame =
          user.password && (await bcrypt.compare(password, user.password))
        if (!isSame) {
          return null
        }

        return user

        // 远程接口校验
        // const { access_token } = await fetch(
        //   "http://localhost:3000/api/user/login",
        //   {
        //     method: "POST",
        //     body: JSON.stringify({ email, password }),
        //   }
        // ).then((res) => res.json())
        //
        // return {
        //   id: access_token,
        // }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token }) => {
      // const user = await fetch("http://localhost:3000/api/user/user", {
      //   headers: {
      //     Authorization: `Bearer ${token.sub}`,
      //   },
      // }).then((res) => res.json())
      return {
        // ...user,
        ...token,
      }
    },
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          ...token,
          id: token.sub,
        },
      }
    },
  },
})
