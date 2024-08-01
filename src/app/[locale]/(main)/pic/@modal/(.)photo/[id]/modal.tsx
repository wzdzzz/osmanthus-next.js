"use client"

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

  const onDismiss = () => {
    router.back()
  }

  return (
    <Dialog open={true} onOpenChange={onDismiss}>
      <DialogContent className="h-auto w-auto max-w-[1960px] border-none bg-red-300 bg-transparent">
        <DialogTitle hidden />
        <Photo photoUrl={photoUrl || ""} />
      </DialogContent>
    </Dialog>
  )
}
