import { ComponentProps, ReactElement } from "react"

import { cn } from "@/lib/utils"

export const Code = ({
  children,
  className,
  ...props
}: ComponentProps<"code">): ReactElement => {
  const hasLineNumbers = "data-line-numbers" in props
  return (
    <code
      className={cn(
        "break-words rounded-md border border-black border-opacity-[0.04] bg-black bg-opacity-[0.03] px-[.25em] py-0.5 text-[.9em]",
        "dark:border-white/10 dark:bg-white/10",
        hasLineNumbers && "[counter-reset:line]",
        className
      )}
      // always show code blocks in ltr
      dir="ltr"
      {...props}
    >
      {children}
    </code>
  )
}
