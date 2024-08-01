import { ImageProps } from "@/utils/type"

import cloudinary from "./cloudinary"

function generateThumbnailUrl(url: string) {
  return (
    url.split("/image/upload/")[0] +
    "/image/upload/c_scale,w_200/" +
    url.split("/image/upload/")[1]
  )
}

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
      url: result.secure_url,
      // 缩略图
      thumbnail_url: generateThumbnailUrl(result.secure_url),
    })
    i++
  }

  return reducedResults
}
