import Image from "next/image"
import Link from "next/link"

import { getImages } from "@/lib/get-iamges"

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
