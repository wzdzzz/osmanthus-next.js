import { auth, signOut } from "@/config/auth.config"
import { Button } from "@/components/ui/button"

export default async function Page() {
  const session = await auth()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {session?.user ? (
        <div>
          <p>{JSON.stringify(session.user)}</p>
          <form
            action={async () => {
              "use server"
              // 退出登录后，重定向首页
              await signOut({ redirectTo: "/login" })
            }}
          >
            <Button>退出登录</Button>
          </form>
        </div>
      ) : (
        <p>未登录</p>
      )}
    </main>
  )
}
