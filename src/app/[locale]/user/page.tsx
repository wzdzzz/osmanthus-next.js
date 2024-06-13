import Link from "next/link"
import { getTranslations } from "next-intl/server"

import { auth, signOut } from "@/config/auth.config"
import { Button } from "@/components/ui/button"
import { LocaleChange } from "@/components/locale-change"

type Props = {
  params: { locale: string }
}

export default async function Page({ params: { locale } }: Props) {
  const session = await auth()
  const t = await getTranslations("test")

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div>
        <LocaleChange />
        {t("title")}-{locale}
      </div>
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
        </div>
      ) : (
        <p>未登录</p>
      )}
    </main>
  )
}
