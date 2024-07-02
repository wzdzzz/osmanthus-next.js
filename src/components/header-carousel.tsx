import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const textList = ["Hello", "Welcome", "This is osmanthus"]
const HeaderCarousel = () => {
  return (
    <Carousel className="m-auto w-full max-w-[90%]">
      <CarouselContent>
        {textList.map((item) => (
          <CarouselItem key={item}>
            <div className="p-1">
              <Card>
                <CardContent className="flex h-80 items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{item}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:block" />
      <CarouselNext className="hidden md:block" />
    </Carousel>
  )
}

export default HeaderCarousel
