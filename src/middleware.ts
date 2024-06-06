import NextAuth from "next-auth"

const { auth } = NextAuth({
  providers: [],
})

export default auth((req) => {
  const isLoggedIn = !!req.auth?.user
  const pathname = new URL(req.url).pathname
  const whiteList = ["/", "/list"]
  const loginList = ["/login", "/register"]
  // 如果未登录，且不在loginList和白名单内，则跳转到登录页
  if (
    !isLoggedIn &&
    !whiteList.includes(pathname) &&
    !loginList.includes(pathname)
  ) {
    return Response.redirect(new URL("/login", req.nextUrl))
  } else if (isLoggedIn && loginList.includes(pathname)) {
    // 如果已登录，且在loginList内，则跳转到用户页
    return Response.redirect(new URL("/user", req.nextUrl))
  }
})

// 排除掉一些接口和静态资源
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
