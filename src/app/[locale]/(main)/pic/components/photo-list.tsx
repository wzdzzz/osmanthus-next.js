"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useStore } from "@/store"
import { ImageProps } from "@/utils/type"

export default function PhotoList({ images }: { images: ImageProps[] }) {
  const { setImages } = useStore()

  useEffect(() => {
    images?.length && setImages(images)
  }, [images])

  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-3 lg:grid-cols-5">
      {images.map(({ id, thumbnail_url }) => {
        return (
          <Link
            key={id}
            href={`/pic/photo/${id}`}
            passHref
            scroll={false}
            className="after:content after:shadow-highlight group relative mb-5 block w-full cursor-zoom-in overflow-hidden rounded-lg after:pointer-events-none after:absolute after:inset-0 after:rounded-lg"
          >
            <Image
              className="transform brightness-90 transition duration-500 ease-in-out will-change-auto hover:scale-125"
              style={{
                objectFit: "cover",
                height: "100%",
              }}
              src={thumbnail_url}
              alt={thumbnail_url}
              width={720}
              height={480}
              sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
            />
          </Link>
        )
      })}
    </div>
  )
}
