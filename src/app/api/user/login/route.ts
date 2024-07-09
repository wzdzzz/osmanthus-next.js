// src/app/api/user/login/route.ts
// 模拟登录
export async function POST(request: Request) {
  // 获取body请求参数
  const data = await request.json()

  console.log(data, "login")

  // 这里可以写登录验证
  return Response.json({ access_token: Date.now() })
}
