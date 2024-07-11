import Image from "next/image"
import Link from "next/link"
import { ImageProps } from "@/utils/type"

import cloudinary from "@/lib/cloudinary"

export async function getImages() {
  const results = await cloudinary.v2.search
    .expression(`folder:${process.env.CLOUDINARY_FOLDER}/*`)
    .max_results(10)
    .execute()
  let reducedResults: ImageProps[] = []

  let i = 0
  for (let result of results.resources) {
    reducedResults.push({
      id: i,
      height: result.height,
      width: result.width,
      public_id: result.public_id,
      format: result.format,
    })
    i++
  }

  return reducedResults
}

export default async function Page() {
  const images = await getImages()

  return (
    <div className="container">
      <div className="">pic</div>

      <div className="flex">
        {images.map(({ id, public_id, format }) => {
          return (
            <Link key={id} href={`/pic/${id}`} target="_blank">
              <Image
                src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_720/${public_id}.${format}`}
                alt={""}
                width={300}
                height={200}
              />
            </Link>
          )
        })}
      </div>
    </div>
  )
}
