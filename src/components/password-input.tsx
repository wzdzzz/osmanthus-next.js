import { useState } from "react"

import { Input, InputProps } from "@/components/ui/input"
import { EyeOffIcon } from "@/components/icons/eye-off-icon"
import { EyeWatchIcon } from "@/components/icons/eye-watch-icon"

export default function PasswordInput(props: InputProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="relative">
      <Input type={showPassword ? "text" : "password"} {...props} />
      <div
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-2 top-2 cursor-pointer opacity-50"
      >
        {!showPassword ? <EyeWatchIcon /> : <EyeOffIcon />}
      </div>
    </div>
  )
}
