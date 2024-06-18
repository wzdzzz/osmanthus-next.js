"use client"

import { ComponentProps, ReactElement, useRef } from "react"

import { cn } from "@/lib/utils"

export const Pre = ({
  children,
  className,
  hasCopyCode,
  ...props
}: ComponentProps<"pre"> & {
  hasCopyCode?: boolean
}): ReactElement => {
  const preRef = useRef<HTMLPreElement | null>(null)
  // 解析 code 标签以获取语言类型和其他属性
  // @ts-ignore
  const str = children?.props?.className || ""
  const language = str
    .split(" ")
    .find((item) => item.startsWith("language-"))
    ?.split("-")[1]

  return (
    <div className="relative mt-6 first:mt-0">
      {language && (
        <div className="absolute top-0 z-[1] w-full truncate rounded-t-xl bg-primary-700/5 px-4 py-2 text-xs text-gray-700 dark:bg-primary-300/10 dark:text-gray-200">
          {language}
        </div>
      )}
      <pre
        className={cn(
          "mb-4 overflow-x-auto rounded-xl bg-primary-700/5 text-[.9em] subpixel-antialiased dark:bg-primary-300/10",
          "pl-[1rem] contrast-more:border contrast-more:border-primary-900/20 contrast-more:contrast-150 contrast-more:dark:border-primary-100/40",
          language ? "pb-4 pt-12" : "py-4",
          className
        )}
        ref={preRef}
        {...props}
      >
        {children}
      </pre>
    </div>
  )
}
