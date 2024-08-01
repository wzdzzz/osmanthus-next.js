import { getImages } from "@/lib/get-iamges"

import Photo from "../../components/photo"

export async function generateMetadata({
  params,
}: {
  params: { id: string; locale: string }
}) {
  const { id } = params
  return {
    title: `Photo-${id}`,
    description: `Photo-${id}`,
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const images = await getImages()
  const currentPhoto = images[params.id]

  const currentPhotoUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_2560/${currentPhoto.public_id}.${currentPhoto.format}`

  return (
    <div>
      <Photo photoUrl={currentPhotoUrl} />
    </div>
  )
}
