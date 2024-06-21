import { locales } from "@/i18n"
import { createSharedPathnamesNavigation } from "next-intl/navigation"

export const { usePathname, useRouter } = createSharedPathnamesNavigation({
  locales,
  localePrefix: "never",
})
