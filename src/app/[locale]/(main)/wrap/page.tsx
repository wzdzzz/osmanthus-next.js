import React from "react"
import Link from "next/link"

const Page = () => {
  return (
    <div className="flex flex-col rounded-md bg-blue-500 p-10">
      <h1>Hello, World!</h1>
      <div>
        <Link href="/wrap/box-1">box-1</Link>
      </div>
      <div>
        <Link href="/wrap/box-2">box-2</Link>
      </div>
    </div>
  )
}

export default Page
