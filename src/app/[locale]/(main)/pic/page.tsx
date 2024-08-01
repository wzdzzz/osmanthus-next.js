import { getImages } from "@/lib/get-iamges"

import PhotoList from "./components/photo-list"

export default async function Page() {
  const images = await getImages()

  return (
    <div className="container">
      <PhotoList
        images={[...images, ...images, ...images, ...images, ...images]}
      />
    </div>
  )
}
