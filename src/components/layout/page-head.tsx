import React from "react"
import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react"

import { auth } from "@/config/auth.config"
import AvatarDropdownMenu from "@/components/avatar-dropdown-menu"
import HeadDropdownMenu from "@/components/head-dropdown-menu"
import { LocaleChange } from "@/components/locale-change"

export default async function PageHead({ justLogo }: { justLogo?: boolean }) {
  const pathName = typeof window !== "undefined" ? window.location.pathname : ""
  const session = await auth()

  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">Web Nextjs</p>
      </NavbarBrand>
      {!justLogo && (
        <>
          <NavbarContent className="hidden gap-4 sm:flex" justify="center">
            <NavbarItem isActive={pathName === "/"}>
              <Link color="foreground" href="/">
                Home
              </Link>
            </NavbarItem>
            <NavbarItem isActive={pathName === "/list"}>
              <Link color="foreground" href={"/list"} aria-current="page">
                List
              </Link>
            </NavbarItem>
          </NavbarContent>
          <NavbarContent className="flex sm:hidden" justify="start">
            <HeadDropdownMenu />
          </NavbarContent>

          <NavbarContent justify="end">
            <LocaleChange />

            {session ? (
              <AvatarDropdownMenu />
            ) : (
              <>
                <NavbarItem className="hidden lg:flex">
                  <Link href={"/login"}>Login</Link>
                </NavbarItem>
                <NavbarItem>
                  <Button
                    as={Link}
                    color="primary"
                    href={"/register"}
                    variant="flat"
                  >
                    Sign Up
                  </Button>
                </NavbarItem>
              </>
            )}
          </NavbarContent>
        </>
      )}
    </Navbar>
  )
}
