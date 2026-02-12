"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, Camera, UserCheck, Car, ArrowRight } from "lucide-react"

const securityStats = [
  {
    label: "Active Cameras",
    value: "12/12",
    icon: Camera,
    status: "online",
  },
  {
    label: "Visitors Today",
    value: "24",
    icon: UserCheck,
    status: "normal",
  },
  {
    label: "Vehicle Entries",
    value: "48",
    icon: Car,
    status: "normal",
  },
]

export function SecurityOverview() {
  return (
    <Card className="bg-card border-border/50">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <CardTitle className="text-base font-medium">Security Status</CardTitle>
        </div>
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
          All Secure
        </Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        {securityStats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center justify-between rounded-lg border border-border/50 bg-secondary/30 p-3"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <stat.icon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
            <div className={`h-2 w-2 rounded-full ${
              stat.status === "online" ? "bg-primary" : "bg-chart-3"
            } animate-pulse`} />
          </div>
        ))}
        <Button variant="ghost" className="w-full mt-2 justify-between" asChild>
          <Link href="/security">
            View All Cameras
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
