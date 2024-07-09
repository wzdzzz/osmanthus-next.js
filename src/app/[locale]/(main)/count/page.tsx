"use client"

import { useStore } from "@/store"

import { Button } from "@/components/ui/button"

export default function Page() {
  const { count, subCount, addCount } = useStore()
  return (
    <div>
      <h1>{count}</h1>
      <Button onClick={addCount}>add</Button>
      <Button onClick={subCount}>sub</Button>
    </div>
  )
}
