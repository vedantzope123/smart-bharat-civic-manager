"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { puneSmartCityData } from "@/lib/pune-data"
import { 
  Trash2,
  Recycle,
  TrendingDown,
  Truck,
  MapPin,
  Calendar,
  Download,
  BarChart3
} from "lucide-react"

export default function WastePage() {
  const { toast } = useToast()

  const collectionData = [
    { day: "Mon", collected: 320, target: 350 },
    { day: "Tue", collected: 315, target: 350 },
    { day: "Wed", collected: 340, target: 350 },
    { day: "Thu", collected: 305, target: 350 },
    { day: "Fri", collected: 350, target: 350 },
    { day: "Sat", collected: 380, target: 350 },
    { day: "Sun", collected: 290, target: 350 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pune Waste Management</h1>
          <p className="text-muted-foreground mt-2">
            Daily Collection: {puneSmartCityData.waste.dailyCollection} | Segregation: {puneSmartCityData.waste.segregationRate}
          </p>
        </div>
        <Button onClick={() => toast({ title: "Report Downloaded" })} variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Daily Collection</CardTitle>
            <Trash2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{puneSmartCityData.waste.dailyCollection}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Total waste collected daily
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Segregation Rate</CardTitle>
            <Recycle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{puneSmartCityData.waste.segregationRate}</div>
            <p className="text-xs text-muted-foreground mt-1">
              At source segregation
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Collection Vehicles</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{puneSmartCityData.waste.collectionVehicles}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Active fleet
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Processing Plants</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{puneSmartCityData.waste.processingPlants.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Operational facilities
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="plants" className="space-y-4">
        <TabsList>
          <TabsTrigger value="plants">Processing Plants</TabsTrigger>
          <TabsTrigger value="collection">Collection Stats</TabsTrigger>
          <TabsTrigger value="recycling">Recycling</TabsTrigger>
        </TabsList>

        <TabsContent value="plants" className="space-y-4">
          <div className="grid gap-4">
            {puneSmartCityData.waste.processingPlants.map((plant, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{plant.name}</CardTitle>
                      <CardDescription>
                        Location: {plant.location} | Capacity: {plant.capacity}
                      </CardDescription>
                    </div>
                    <Badge className="bg-green-600">
                      {plant.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Processing Type: {plant.type}</span>
                      <span className="font-medium">{plant.dailyProcessing}</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="collection" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Collection Statistics</CardTitle>
              <CardDescription>Daily waste collection vs targets</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  collected: {
                    label: "Collected",
                    color: "hsl(var(--chart-1))",
                  },
                  target: {
                    label: "Target",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-80 w-full"
              >
                <BarChart data={collectionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="collected" fill="hsl(var(--chart-1))" />
                  <Bar dataKey="target" fill="hsl(var(--chart-2))" opacity={0.5} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Collection Schedule by Area</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {puneSmartCityData.waste.collectionSchedule.map((schedule, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{schedule.area}</p>
                        <p className="text-sm text-muted-foreground">
                          {schedule.days.join(", ")}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline">{schedule.time}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recycling" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recycling Statistics</CardTitle>
              <CardDescription>Material recovery and recycling rates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { material: "Paper & Cardboard", rate: 75, color: "bg-blue-600" },
                  { material: "Plastic", rate: 45, color: "bg-green-600" },
                  { material: "Metal", rate: 82, color: "bg-yellow-600" },
                  { material: "Glass", rate: 68, color: "bg-purple-600" },
                  { material: "Organic Waste", rate: 90, color: "bg-orange-600" },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{item.material}</span>
                      <span className="text-sm text-muted-foreground">{item.rate}%</span>
                    </div>
                    <Progress value={item.rate} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
