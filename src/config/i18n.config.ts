export const i18n = {
  defaultLocale: "en",
  locales: ["en", "zh"],
}

export type Locale = (typeof i18n)["locales"][number]

export const localeMap = {
  en: "English",
  zh: "Chinese",
} as const
