import { NextRequest, NextResponse } from "next/server"
import { match as matchLocale } from "@formatjs/intl-localematcher"
import Negotiator from "negotiator"
import NextAuth from "next-auth"

import { i18n } from "@/config/i18n.config"

const { auth } = NextAuth({
  providers: [],
})

const noRedirectRoute = ["/api(.*)", "/trpc(.*)", "/admin"]
const publicRoute = [
  "/(\\w{2}/)?signin(.*)",
  "/(\\w{2}/)?terms(.*)",
  "/(\\w{2}/)?privacy(.*)",
  "/(\\w{2}/)?docs(.*)",
  "/(\\w{2}/)?blog(.*)",
  "/(\\w{2}/)?pricing(.*)",
  "^/\\w{2}$", // root with locale
]

function isNoRedirect(request: NextRequest): boolean {
  const pathname = request.nextUrl.pathname
  return noRedirectRoute.some((route) => new RegExp(route).test(pathname))
}

function isPublicPage(request: NextRequest): boolean {
  const pathname = request.nextUrl.pathname
  return publicRoute.some((route) => new RegExp(route).test(pathname))
}

function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))
  const locales = Array.from(i18n.locales)
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales
  )
  return matchLocale(languages, locales, i18n.defaultLocale)
}

export default auth((req) => {
  const pathname = req.nextUrl.pathname

  const locale = getLocale(req)

  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // 不需要多语言的页面
  if (!isNoRedirect(req) && pathnameIsMissingLocale) {
    const locale = getLocale(req)
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
        req.url
      )
    )
  }

  if (isPublicPage(req)) {
    return
  }

  const isLoggedIn = !!req.auth?.user
  const whiteList = ["/", "/list"]

  const isAuthPage = /^\/[a-zA-Z]{2,}\/(login|register|activate)/.test(pathname)

  const isAuthRoute = /^\/api\//.test(pathname)

  // 登录后直接访问的页面
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.next()
  }

  // 登录页面登录后直接进入用户中心
  if (isAuthPage) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(`/user`, req.url))
    }
    return
  }

  if (!isLoggedIn) {
    if (whiteList.includes(pathname)) {
      return NextResponse.redirect(new URL(`/${locale}/${pathname}`, req.url))
    }
    let from = req.nextUrl.pathname
    if (req.nextUrl.search) {
      from += req.nextUrl.search
    }
    return NextResponse.redirect(
      new URL(`/${locale}/login?from=${encodeURIComponent(from)}`, req.url)
    )
  }

  const isWebhooksRoute = /^\/api\/webhooks\//.test(req.nextUrl.pathname)
  if (isWebhooksRoute) {
    return NextResponse.next()
  }
})

// 排除掉一些接口和静态资源
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
