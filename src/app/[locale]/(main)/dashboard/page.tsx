import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import SimpleLineChart from "@/components/charts/simple-line-chart"

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
)

export default function Page() {
  return (
    <div className="flex gap-4 p-4">
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
        </CardHeader>

        <CardContent>
          <SimpleLineChart />
        </CardContent>
      </Card>

      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Total</CardTitle>
          <CardDescription>all count</CardDescription>
          <CardContent>
            <ScrollArea className="h-72 w-full">
              <div>
                {tags.map((tag) => (
                  <>
                    <div key={tag} className="text-sm">
                      {tag}
                    </div>
                    <Separator className="my-2" />
                  </>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  )
}
