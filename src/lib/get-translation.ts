import { createTranslator } from "next-intl"
import { getLocale } from "next-intl/server"

let messages = {}
const getTranslation = async (namespace: string, key: string) => {
  const locale = (await getLocale()) ?? "en"

  messages =
    Object.keys(messages).length == 0
      ? (await import(`../config/dictionaries/${locale}.json`)).default
      : messages

  const t = createTranslator({ locale, messages, namespace })
  return t(key)
}

export default getTranslation
