"use client"

import { useStore } from "@/store"

import { cn } from "@/lib/utils"

export function ThemeWrapper({ children }) {
  const { themeColor } = useStore()
  return <div className={cn(`theme-${themeColor}`)}>{children}</div>
}
