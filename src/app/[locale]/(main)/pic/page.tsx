import Image from "next/image"
import Link from "next/link"
import Pic1 from "public/1.png"
import Pic2 from "public/2.png"
import Pic3 from "public/3.png"

export default function Page() {
  const imgs = [Pic1, Pic2, Pic3]
  return (
    <div className="container">
      <div className="">pic</div>

      {imgs.map((item, index) => {
        return (
          <Link key={index} href={""} as={""}>
            <Image key={index} src={item} alt={""} width={300} height={200} />
          </Link>
        )
      })}
    </div>
  )
}
