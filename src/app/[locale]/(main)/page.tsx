import { useTranslations } from "next-intl"

export default function Page() {
  const t = useTranslations("home")
  return (
    <div className="flex">
      <div className="mx-auto flex w-full flex-col items-center justify-center pt-40 font-semibold leading-6 tracking-tight">
        <h1 className="max-w-3xl text-2xl md:text-5xl">
          {t("hello")}
          <span className="ml-4 text-gray-500">{t("description")}</span>
          <span>now</span>
        </h1>
      </div>
    </div>
  )
}
