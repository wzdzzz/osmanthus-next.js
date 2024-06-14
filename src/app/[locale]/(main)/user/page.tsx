import Link from "next/link"

import { auth, signOut } from "@/config/auth.config"
import { Button } from "@/components/ui/button"
import ThemeChange from "@/components/theme-change"

export default async function Page() {
  const session = await auth()

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div>
        <ThemeChange />
      </div>
      <div></div>
      {session?.user ? (
        <div>
          <div className="whitespace-break w-[500px] break-words">
            {Object.entries(session.user).map(([k, v]) => {
              return <div key={k}>{`${k}:${v}`}</div>
            })}
          </div>
          <form
            action={async () => {
              "use server"
              // 退出登录后，重定向首页
              await signOut({ redirectTo: `/login` })
            }}
          >
            <Button>退出登录</Button>
          </form>
          <Link href={`/list`}>
            <Button>去List</Button>
          </Link>
          <Link href={`/count`}>
            <Button>去Count</Button>
          </Link>
        </div>
      ) : (
        <p>未登录</p>
      )}
    </main>
  )
}
