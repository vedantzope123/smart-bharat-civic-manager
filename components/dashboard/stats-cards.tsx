"use client"

import { useRouter } from "next/navigation"
import { Droplets, Zap, Shield, Thermometer, TrendingDown, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const stats = [
  {
    title: "Water Level",
    value: "78%",
    subtitle: "Tank A - Block 1",
    trend: "stable",
    trendValue: "Normal",
    icon: Droplets,
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
    link: "/water",
  },
  {
    title: "Energy Saved",
    value: "2,340",
    subtitle: "kWh this month",
    trend: "up",
    trendValue: "+12%",
    icon: Zap,
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
    link: "/energy",
  },
  {
    title: "Security Status",
    value: "Secure",
    subtitle: "All 12 cameras active",
    trend: "stable",
    trendValue: "Online",
    icon: Shield,
    color: "text-primary",
    bgColor: "bg-primary/10",
    link: "/security",
  },
  {
    title: "Air Quality",
    value: "Good",
    subtitle: "AQI: 45",
    trend: "down",
    trendValue: "-8 from yesterday",
    icon: Thermometer,
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
    link: "/safety",
  },
]

export function StatsCards() {
  const router = useRouter()

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card 
          key={stat.title} 
          className="bg-card border-border/50 cursor-pointer hover:bg-accent/50 transition-colors"
          onClick={() => router.push(stat.link)}
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-semibold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
              </div>
              <div className={`rounded-lg p-2.5 ${stat.bgColor}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1 text-xs">
              {stat.trend === "up" && (
                <TrendingUp className="h-3 w-3 text-primary" />
              )}
              {stat.trend === "down" && (
                <TrendingDown className="h-3 w-3 text-chart-4" />
              )}
              <span className={
                stat.trend === "up" ? "text-primary" : 
                stat.trend === "down" ? "text-chart-4" : 
                "text-muted-foreground"
              }>
                {stat.trendValue}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
