"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { useStore } from "@/store"

import { PhotoDialog } from "./modal"

export default function PhotoModal() {
  const { images } = useStore()
  let { id = "" } = useParams() // useParams 钩子获取路由参数

  const [image, setImage] = useState<string>()
  useEffect(() => {
    const image = images.find((image) => image?.id === +id)
    setImage(image?.url)
  }, [id])
  return <PhotoDialog photoUrl={image} />
}
