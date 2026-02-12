"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, XAxis, YAxis, CartesianGrid } from "recharts"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Droplets, ArrowRight } from "lucide-react"

const waterData = [
  { time: "00:00", level: 85, consumption: 120 },
  { time: "04:00", level: 82, consumption: 80 },
  { time: "08:00", level: 65, consumption: 450 },
  { time: "12:00", level: 72, consumption: 320 },
  { time: "16:00", level: 68, consumption: 280 },
  { time: "20:00", level: 78, consumption: 180 },
  { time: "Now", level: 78, consumption: 150 },
]

const chartConfig = {
  level: {
    label: "Water Level (%)",
    color: "var(--color-chart-2)",
  },
  consumption: {
    label: "Consumption (L)",
    color: "var(--color-chart-1)",
  },
}

export function WaterOverview() {
  return (
    <Card className="bg-card border-border/50">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <Droplets className="h-5 w-5 text-chart-2" />
          <CardTitle className="text-base font-medium">Water Management</CardTitle>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
            Pump: Auto
          </Badge>
          <Badge variant="outline" className="bg-chart-2/10 text-chart-2 border-chart-2/30">
            Tank: 78%
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <AreaChart data={waterData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="fillLevel" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-chart-2)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--color-chart-2)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="fillConsumption" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-chart-1)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--color-chart-1)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" vertical={false} />
            <XAxis 
              dataKey="time" 
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              className="text-muted-foreground"
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              className="text-muted-foreground"
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="level"
              stroke="var(--color-chart-2)"
              fill="url(#fillLevel)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
        <div className="mt-4 grid grid-cols-3 gap-4 text-center text-sm">
          <div>
            <p className="text-muted-foreground">Today&apos;s Usage</p>
            <p className="text-lg font-semibold">4,280 L</p>
          </div>
          <div>
            <p className="text-muted-foreground">Avg Daily</p>
            <p className="text-lg font-semibold">3,950 L</p>
          </div>
          <div>
            <p className="text-muted-foreground">Saved</p>
            <p className="text-lg font-semibold text-primary">+8%</p>
          </div>
        </div>
        <Button variant="ghost" className="w-full mt-4 justify-between" asChild>
          <Link href="/water">
            View Details
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
