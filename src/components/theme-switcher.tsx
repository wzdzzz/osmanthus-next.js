"use client"

import { useStore } from "@/store"
import { CheckIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"

import { themes } from "@/config/themes"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function ThemeSwitcher() {
  const { themeColor, setThemeColor } = useStore()
  const { resolvedTheme: mode } = useTheme()

  const theme = themes.find((t) => t.name === themeColor)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "text-xs, fixed bottom-10 right-10 m-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border-2 border-[--theme-primary] bg-white p-1"
          )}
          style={
            {
              "--theme-primary": `hsl(${
                theme?.activeColor[mode === "dark" ? "dark" : "light"]
              })`,
            } as React.CSSProperties
          }
        >
          <span
            className={cn(
              "flex h-full w-full items-center justify-center rounded-full bg-[--theme-primary]"
            )}
          >
            {<CheckIcon className="h-4 w-4 text-white" />}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid grid-cols-3 gap-4">
          {themes.map((theme) => {
            const isActive = themeColor === theme.name

            return (
              <Button
                key={theme.name}
                className={cn(
                  "m-auto flex h-10 w-10 items-center justify-center rounded-full border-2 p-1 text-xs",
                  isActive ? "border-[--theme-primary]" : "border-transparent"
                )}
                variant="ghost"
                onClick={() => {
                  setThemeColor(theme.name)
                }}
                style={
                  {
                    "--theme-primary": `hsl(${
                      theme?.activeColor[mode === "dark" ? "dark" : "light"]
                    })`,
                  } as React.CSSProperties
                }
              >
                <span
                  className={cn(
                    "flex h-full w-full items-center justify-center rounded-full bg-[--theme-primary]"
                  )}
                >
                  {isActive && <CheckIcon className="h-4 w-4 text-white" />}
                </span>
                <span className="sr-only">{theme.label}</span>
              </Button>
            )
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
}
