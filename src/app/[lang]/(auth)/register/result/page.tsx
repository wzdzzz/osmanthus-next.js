import Link from "next/link"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function Page() {
  return (
    <div className="mt-[20px] px-[100px]">
      <Alert>
        <AlertTitle className="item-center flex">🎉🎉🎉注册成功</AlertTitle>
        <AlertDescription>
          您的验证邮件已发送，请前往验证
          <Link href="/login">已验证？返回登录</Link>
        </AlertDescription>
      </Alert>
    </div>
  )
}
