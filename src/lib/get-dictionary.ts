import "server-only"

import type { Locale } from "@/config/i18n.config"

const dictionaries = {
  en: () =>
    import("@/config/dictionaries/en.json").then((module) => module.default),
  zh: () =>
    import("@/config/dictionaries/zh.json").then((module) => module.default),
}

export const getDictionary = async (locale: Locale) =>
  dictionaries[locale]?.() ?? (await dictionaries.en())

export const getDictionarySync = (locale: Locale) =>
  dictionaries[locale]?.() ?? dictionaries.en()
