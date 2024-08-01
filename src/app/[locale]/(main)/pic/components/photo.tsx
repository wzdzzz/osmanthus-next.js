import Image from "next/image"

export default function Photo({ photoUrl }: { photoUrl: string }) {
  return (
    <Image
      src={photoUrl}
      className="m-auto w-[100vw] max-w-[100vw] brightness-90 will-change-auto md:w-[80vw] lg:w-[70vw]"
      alt="blurred background"
      width={1920}
      height={1280}
    />
  )
}
