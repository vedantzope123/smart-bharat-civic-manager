"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell, AlertTriangle, CheckCircle, Info, ArrowRight } from "lucide-react"
import Link from "next/link"

const alerts = [
  {
    id: 1,
    type: "warning",
    title: "Tank B Low Level",
    message: "Water level at 25%. Pump activated.",
    time: "5 min ago",
    icon: AlertTriangle,
  },
  {
    id: 2,
    type: "success",
    title: "Maintenance Completed",
    message: "Block C lift servicing done.",
    time: "1 hour ago",
    icon: CheckCircle,
  },
  {
    id: 3,
    type: "info",
    title: "Voltage Fluctuation",
    message: "Detected in Block A. Monitoring.",
    time: "2 hours ago",
    icon: Info,
  },
]

export function AlertsFeed() {
  return (
    <Card className="bg-card border-border/50">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-chart-4" />
          <CardTitle className="text-base font-medium">Recent Alerts</CardTitle>
        </div>
        <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/30">
          3 Active
        </Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="flex items-start gap-3 rounded-lg border border-border/50 bg-secondary/30 p-3"
          >
            <div className={`mt-0.5 rounded-full p-1.5 ${
              alert.type === "warning" ? "bg-warning/20 text-warning" :
              alert.type === "success" ? "bg-primary/20 text-primary" :
              "bg-chart-2/20 text-chart-2"
            }`}>
              <alert.icon className="h-3.5 w-3.5" />
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium">{alert.title}</p>
              <p className="text-xs text-muted-foreground">{alert.message}</p>
              <p className="text-xs text-muted-foreground/70">{alert.time}</p>
            </div>
          </div>
        ))}
        <Button variant="ghost" className="w-full justify-between text-muted-foreground hover:text-foreground" asChild>
          <Link href="/alerts">
            View All Alerts
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
