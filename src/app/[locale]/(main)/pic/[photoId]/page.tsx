import Image from "next/image"

import { getImages } from "@/lib/get-iamges"

export default async function Page({
  params,
}: {
  params: { photoId: string }
}) {
  const images = await getImages()
  const currentPhoto = images[params.photoId]

  const currentPhotoUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_2560/${currentPhoto.public_id}.${currentPhoto.format}`
  console.log(currentPhotoUrl, "currentPhotoUrl")
  return (
    <Image
      src={currentPhotoUrl}
      className="pointer-events-none h-auto w-auto"
      alt="blurred background"
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      priority={true}
    />
  )
}
