import Image from "next/image"

export default function Photo({ photoUrl }: { photoUrl: string }) {
  return (
    <Image
      src={photoUrl}
      className="m-auto h-auto max-h-[100vh] max-w-[100vw] rounded-lg object-contain brightness-90 will-change-auto md:min-w-[40vw] lg:w-[30vw]"
      alt="blurred background"
      width={960}
      height={640}
      objectFit="cover"
      priority={true}
      quality={75}
    />
  )
}
