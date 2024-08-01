"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"

import Photo from "../../../components/photo"

export function PhotoDialog({ photoUrl }: { photoUrl?: string }) {
  const router = useRouter()
  const [open, setOpen] = useState(true)

  useEffect(() => {
    setOpen(true)
  }, [])

  const onDismiss = () => {
    router.push("/pic", undefined)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={onDismiss}>
      <DialogContent className="h-auto w-auto max-w-[1960px] border-none bg-red-300 bg-transparent">
        <DialogTitle hidden />
        <Photo photoUrl={photoUrl || ""} />
      </DialogContent>
    </Dialog>
  )
}
