"use client"

import { useRouter } from "next/navigation"

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"

import Photo from "../../../components/photo"

export function PhotoDialog({
  photoUrl,
  isRedirect,
}: {
  photoUrl?: string
  isRedirect?: boolean
}) {
  const router = useRouter()

  const onDismiss = () => {
    isRedirect ? router.push("/pic") : router.back()
  }

  return (
    <Dialog open={true} onOpenChange={onDismiss}>
      <DialogContent className="h-auto w-auto max-w-[1960px] border-none bg-red-300 bg-transparent focus-visible:outline-none">
        <DialogTitle hidden />
        <Photo photoUrl={photoUrl || ""} />
      </DialogContent>
    </Dialog>
  )
}
