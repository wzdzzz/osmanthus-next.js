import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <div>
      <Link href={"/login"}>
        <Button>去登录</Button>
      </Link>
    </div>
  )
}
