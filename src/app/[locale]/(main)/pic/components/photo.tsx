import Image from "next/image"

export default function Photo({ photoUrl }: { photoUrl: string }) {
  return (
    <Image
      src={photoUrl}
      className="m-auto h-auto max-h-[100vh] w-[100vw] max-w-[100vw] rounded-lg object-contain brightness-90 will-change-auto md:w-[80vw] lg:w-[60vw]"
      alt="blurred background"
      width={1920}
      height={1280}
      objectFit="cover"
      priority={true}
    />
  )
}
