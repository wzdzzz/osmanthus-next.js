import { auth, signOut } from "@/config/auth.config"
import { i18n, Locale } from "@/config/i18n.config"
import { getDictionary } from "@/lib/get-dictionary"
import { Button } from "@/components/ui/button"
import { LocaleChange } from "@/components/locale-change"

interface PageProps {
  children?: React.ReactNode
  params: {
    lang: Locale
  }
}

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({
    lang: locale,
  }))
}

export default async function Page({ params: { lang } }: PageProps) {
  const session = await auth()
  console.log(lang, "lang")
  const dict = await getDictionary(lang)

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div>
        <LocaleChange url="/user" />
        {dict.test.title}
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
