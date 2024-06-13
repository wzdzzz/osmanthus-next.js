"use client"

import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

const ThemeChange = () => {
  const { theme, setTheme } = useTheme()
  return (
    <Button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      {theme === "light" ? "Dark" : "Light"} Mode
    </Button>
  )
}

export default ThemeChange
