"use client"

import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

export default function DocsSideNav({ items }) {
  const pathname = usePathname()

  return items?.length ? (
    <div className="w-full">
      {items.map((item, index) => (
        <div key={index} className="pb-4">
          <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
            {item.title}
          </h4>
          {item?.items?.length && (
            <DocsSideNavItem items={item.items} pathname={pathname} />
          )}
        </div>
      ))}
    </div>
  ) : null
}

function DocsSideNavItem({ items, pathname }) {
  return (
    <div className="grid grid-flow-row auto-rows-max text-sm">
      {items.map((item, index) =>
        item.href && !item.disabled ? (
          <a
            key={index}
            href={item.href}
            className={cn(
              "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline",
              item.disabled && "cursor-not-allowed opacity-60",
              pathname === item.href
                ? "font-medium text-foreground"
                : "text-muted-foreground"
            )}
            target={item.external ? "_blank" : ""}
            rel={item.external ? "noreferrer" : ""}
          >
            {item.title}
            {item.label && (
              <span className="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline"></span>
            )}
          </a>
        ) : (
          <div
            key={index}
            className="flex w-full cursor-not-allowed items-center rounded-md border border-transparent px-2 py-1 text-muted-foreground opacity-60"
          >
            {item.title}
            {item.label && (
              <span className="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline"></span>
            )}
          </div>
        )
      )}
    </div>
  )
}
