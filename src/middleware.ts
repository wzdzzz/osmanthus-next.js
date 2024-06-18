import { NextRequest, NextResponse } from "next/server"
import NextAuth from "next-auth"
import createMiddleware from "next-intl/middleware"

const { auth } = NextAuth({
  providers: [],
})
const noRedirectRoute = ["/api(.*)"]

const publicRoute = [
  "/(\\w{2}/)?signin(.*)",
  "/(\\w{2}/)?terms(.*)",
  "/(\\w{2}/)?privacy(.*)",
  "/(\\w{2}/)?docs(.*)",
  "/(\\w{2}/)?blog(.*)",
  "/(\\w{2}/)?pricing(.*)",
  "/(\\w{2}/)?unauthorized(.*)",
  "/(\\w{2}/)?pricing(.*)",
  "/(\\w{2}/)?roadmap(.*)",
  "/(\\w{2}/)?features(.*)",
  "/(\\w{2}/)?contact(.*)",
  "/(\\w{2}/)?about(.*)",
  "/(\\w{2}/)?unauthorized(.*)",
  "^/\\w{2}$", // root with locale
]

function isPublicPage(request: NextRequest): boolean {
  const pathname = request.nextUrl.pathname
  return publicRoute.some((route) => new RegExp(route).test(pathname))
}

const locales = ["en", "zh"]
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: "en",
  localePrefix: "never",
})

const authPages = [
  "/login",
  "/register",
  "/register/result",
  "/activate",
  "/forgot-password",
]

const testPathnameRegex = (pages: string[], pathName: string): boolean => {
  return RegExp(
    `^(/(${locales.join("|")}))?(${pages.flatMap((p) => (p === "/" ? ["", "/"] : p)).join("|")})/?$`,
    "i"
  ).test(pathName)
}

const authMiddleware = auth((req) => {
  const pathname = req.nextUrl.pathname

  const isNoRedirectRoute = noRedirectRoute.some((route) =>
    new RegExp(route).test(pathname)
  )
  if (isNoRedirectRoute) {
    return NextResponse.next()
  }

  const isWebhooksRoute = /^\/api\/webhooks\//.test(pathname)
  if (isWebhooksRoute) {
    return NextResponse.next()
  }

  if (isPublicPage(req)) {
    return intlMiddleware(req)
  }

  const isAuthPage = testPathnameRegex(authPages, pathname)
  const isLoggedIn = !!req.auth?.user
  // 不需要登录的页面
  const whiteList = ["/", "/list"]
  console.log(isAuthPage, pathname, "isNoRedirectRoute")

  if (!isLoggedIn) {
    if (!isAuthPage && !whiteList.includes(pathname)) {
      let from = req.nextUrl.pathname
      if (req.nextUrl.search) {
        from += req.nextUrl.search
      }
      return NextResponse.redirect(
        new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
      )
    }
  }

  // 已登录状态，强制跳转到首页
  if (isAuthPage && isLoggedIn) {
    return NextResponse.redirect(new URL(`/`, req.url))
  }

  return intlMiddleware(req)
})

const middleware = (req: NextRequest) => {
  const isAuthPage = testPathnameRegex(authPages, req.nextUrl.pathname)

  if (isAuthPage) {
    return (authMiddleware as any)(req)
  }

  if (isPublicPage(req)) {
    return intlMiddleware(req)
  } else {
    return (authMiddleware as any)(req)
  }
}

// 排除掉一些接口和静态资源
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

export default middleware
