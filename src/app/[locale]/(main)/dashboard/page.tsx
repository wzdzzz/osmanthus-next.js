import React from "react"

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
import SimpleLineIndicator from "@/components/charts/simple-line-indicator"
import SimpleRadarChart from "@/components/charts/simple-rader-chart"
import SimpleRadialChart from "@/components/charts/simple-radial-chart"
import { SimpleLoadTotalLinChart } from "@/components/charts/simple-total-line-chart"

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
)

export default function Page() {
  return (
    <div className={"flex flex-col gap-4"}>
      <div className="grid grid-cols-3 gap-4">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Dashboard</CardTitle>
          </CardHeader>

          <CardContent>
            <SimpleLineChart />
          </CardContent>
        </Card>

        <Card className="col-span-1">
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

      <div className="grid grid-cols-3 gap-4">
        <SimpleRadarChart />
        <SimpleRadialChart />
        <SimpleLineIndicator />
      </div>

      <SimpleLoadTotalLinChart />
    </div>
  )
}
