import Link from "next/link"
import { env } from "@/env.mjs"
import {
  CheckIcon,
  ClipboardIcon,
  LayersIcon,
  RocketIcon,
  UpdateIcon,
  UploadIcon,
} from "@radix-ui/react-icons"
import { useTranslations } from "next-intl"
import { getTranslations } from "next-intl/server"

import { Button } from "@/components/ui/button"

export async function generateMetadata() {
  const t = await getTranslations("metadata")

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      type: "article",
      title: t("title"),
      description: t("description"),
      url: env.NEXT_PUBLIC_APP_URL,
      images: [
        {
          url: "https://asset.cloudinary.com/daqpmzvx7/8f9f59bc37036251ac6341799b57d5ae",
          width: 1200,
          height: 630,
        },
      ],
    },
  }
}

const advantages = [
  {
    key: "rapid",
    icon: <UploadIcon className="h-6 w-6" />,
  },
  {
    key: "responsive",
    icon: <LayersIcon className="h-6 w-6" />,
  },
  {
    key: "components",
    icon: <RocketIcon className="h-6 w-6" />,
  },
  {
    key: "customize",
    icon: <CheckIcon className="h-6 w-6" />,
  },
  {
    key: "seo",
    icon: <UpdateIcon className="h-6 w-6" />,
  },
  {
    key: "performance",
    icon: <ClipboardIcon className="h-6 w-6" />,
  },
]

export default function Page() {
  const t = useTranslations("home")

  return (
    <div>
      <section className="bg-gradient-to-r from-primary to-secondary py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold text-primary-foreground md:text-6xl">
              {t("title")}
            </h1>
            <p className="mb-8 text-lg text-gray-200 text-muted-foreground md:text-xl">
              {t("description")}
            </p>
            <Button className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-10 font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
              <Link href={"/docs"} className="" prefetch={false}>
                {t("start")}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="w-full border-y py-12 md:py-24 lg:py-32">
        <div className="container grid gap-12 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter text-primary sm:text-5xl">
                {t("advantagesTitle")}
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {t("advantagesDescription")}
              </p>
            </div>
          </div>
          <div className="mx-auto grid gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
            {advantages.map((item) => (
              <div className="flex flex-col" key={item.key}>
                <div className="flex items-center gap-4 md:h-20 lg:h-20">
                  <div className="rounded-full bg-primary p-2 text-primary-foreground">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold">
                    {t(`advantages.${item.key}.title`)}
                  </h3>
                </div>
                <p className="text-muted-foreground">
                  {t(`advantages.${item.key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
