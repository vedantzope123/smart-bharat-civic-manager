"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Zap, TrendingDown, ArrowRight } from "lucide-react"

const energyData = [
  { day: "Mon", consumed: 180, saved: 45 },
  { day: "Tue", consumed: 165, saved: 52 },
  { day: "Wed", consumed: 195, saved: 38 },
  { day: "Thu", consumed: 172, saved: 48 },
  { day: "Fri", consumed: 158, saved: 62 },
  { day: "Sat", consumed: 142, saved: 78 },
  { day: "Sun", consumed: 128, saved: 85 },
]

const chartConfig = {
  consumed: {
    label: "Consumed (kWh)",
    color: "var(--color-chart-4)",
  },
  saved: {
    label: "Saved (kWh)",
    color: "var(--color-chart-1)",
  },
}

export function EnergyOverview() {
  return (
    <Card className="bg-card border-border/50">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-chart-3" />
          <CardTitle className="text-base font-medium">Energy Monitor</CardTitle>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 flex items-center gap-1">
            <TrendingDown className="h-3 w-3" />
            -12% this week
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <BarChart data={energyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" vertical={false} />
            <XAxis 
              dataKey="day" 
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
            <Bar 
              dataKey="consumed" 
              fill="var(--color-chart-4)" 
              radius={[4, 4, 0, 0]}
              opacity={0.8}
            />
            <Bar 
              dataKey="saved" 
              fill="var(--color-chart-1)" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
        <div className="mt-4 grid grid-cols-3 gap-4 text-center text-sm">
          <div>
            <p className="text-muted-foreground">This Week</p>
            <p className="text-lg font-semibold">1,140 kWh</p>
          </div>
          <div>
            <p className="text-muted-foreground">Saved</p>
            <p className="text-lg font-semibold text-primary">408 kWh</p>
          </div>
          <div>
            <p className="text-muted-foreground">Est. Bill</p>
            <p className="text-lg font-semibold">Rs 8,420</p>
          </div>
        </div>
        <Button variant="ghost" className="w-full mt-4 justify-between" asChild>
          <Link href="/energy">
            View Details
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
