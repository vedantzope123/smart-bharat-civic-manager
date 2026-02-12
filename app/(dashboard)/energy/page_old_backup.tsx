"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Line, LineChart, Area, AreaChart } from "recharts"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { 
  Zap, 
  TrendingDown, 
  TrendingUp,
  Lightbulb,
  Sun,
  Moon,
  AlertTriangle,
  Activity,
  Gauge,
  Settings,
  Clock,
  IndianRupee
} from "lucide-react"

// Zone data for smart lighting
const zones = [
  {
    id: "zone-a",
    name: "Block A Corridor",
    lights: 12,
    activeLights: 4,
    mode: "auto",
    brightness: 60,
    motionDetected: true,
    powerUsage: 48,
  },
  {
    id: "zone-b",
    name: "Parking Lot",
    lights: 24,
    activeLights: 24,
    mode: "manual",
    brightness: 100,
    motionDetected: false,
    powerUsage: 240,
  },
  {
    id: "zone-c",
    name: "Garden Area",
    lights: 18,
    activeLights: 0,
    mode: "schedule",
    brightness: 0,
    motionDetected: false,
    powerUsage: 0,
  },
  {
    id: "zone-d",
    name: "Block B Stairwell",
    lights: 8,
    activeLights: 2,
    mode: "auto",
    brightness: 40,
    motionDetected: true,
    powerUsage: 16,
  },
]

// Hourly consumption data
const hourlyData = [
  { time: "00:00", consumption: 120, baseline: 150 },
  { time: "02:00", consumption: 95, baseline: 150 },
  { time: "04:00", consumption: 85, baseline: 150 },
  { time: "06:00", consumption: 180, baseline: 200 },
  { time: "08:00", consumption: 320, baseline: 380 },
  { time: "10:00", consumption: 280, baseline: 350 },
  { time: "12:00", consumption: 310, baseline: 380 },
  { time: "14:00", consumption: 295, baseline: 360 },
  { time: "16:00", consumption: 340, baseline: 400 },
  { time: "18:00", consumption: 420, baseline: 480 },
  { time: "20:00", consumption: 380, baseline: 450 },
  { time: "22:00", consumption: 220, baseline: 280 },
]

// Monthly comparison data
const monthlyData = [
  { month: "Aug", consumed: 4200, saved: 850 },
  { month: "Sep", consumed: 3950, saved: 1020 },
  { month: "Oct", consumed: 3800, saved: 1150 },
  { month: "Nov", consumed: 3650, saved: 1280 },
  { month: "Dec", consumed: 4100, saved: 980 },
  { month: "Jan", consumed: 3420, saved: 1450 },
]

// Voltage fluctuation data for predictive maintenance
const voltageData = [
  { time: "Mon", voltage: 228, threshold: 230 },
  { time: "Tue", voltage: 232, threshold: 230 },
  { time: "Wed", voltage: 225, threshold: 230 },
  { time: "Thu", voltage: 238, threshold: 230 },
  { time: "Fri", voltage: 229, threshold: 230 },
  { time: "Sat", voltage: 231, threshold: 230 },
  { time: "Sun", voltage: 227, threshold: 230 },
]

const hourlyChartConfig = {
  consumption: {
    label: "Consumption (W)",
    color: "var(--color-chart-3)",
  },
  baseline: {
    label: "Baseline (W)",
    color: "var(--color-muted-foreground)",
  },
}

const monthlyChartConfig = {
  consumed: {
    label: "Consumed (kWh)",
    color: "var(--color-chart-4)",
  },
  saved: {
    label: "Saved (kWh)",
    color: "var(--color-chart-1)",
  },
}

const voltageChartConfig = {
  voltage: {
    label: "Voltage (V)",
    color: "var(--color-chart-3)",
  },
  threshold: {
    label: "Threshold",
    color: "var(--color-destructive)",
  },
}

export default function EnergyPage() {
  const [globalAutoMode, setGlobalAutoMode] = useState(true)
  const [zoneBrightness, setZoneBrightness] = useState<Record<string, number>>({
    "zone-a": 60,
    "zone-b": 100,
    "zone-c": 0,
    "zone-d": 40,
  })

  const totalSavings = 1450
  const totalConsumption = 3420
  const savingsPercentage = Math.round((totalSavings / (totalSavings + totalConsumption)) * 100)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
            <Zap className="h-6 w-6 text-chart-3" />
            Bijli Bachao - Energy Monitor
          </h1>
          <p className="text-muted-foreground">
            Smart lighting control and energy consumption tracking
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch 
              id="global-auto" 
              checked={globalAutoMode}
              onCheckedChange={setGlobalAutoMode}
            />
            <Label htmlFor="global-auto" className="text-sm">Global Auto Mode</Label>
          </div>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Schedules
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-card border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current Load</p>
                <p className="text-2xl font-semibold mt-1">304 W</p>
                <p className="text-xs text-primary mt-1 flex items-center gap-1">
                  <TrendingDown className="h-3 w-3" />
                  -18% from peak
                </p>
              </div>
              <div className="rounded-lg bg-chart-3/10 p-3">
                <Activity className="h-5 w-5 text-chart-3" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Today&apos;s Usage</p>
                <p className="text-2xl font-semibold mt-1">142 kWh</p>
                <p className="text-xs text-primary mt-1 flex items-center gap-1">
                  <TrendingDown className="h-3 w-3" />
                  -12% vs yesterday
                </p>
              </div>
              <div className="rounded-lg bg-chart-4/10 p-3">
                <Zap className="h-5 w-5 text-chart-4" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Energy Saved</p>
                <p className="text-2xl font-semibold mt-1">{savingsPercentage}%</p>
                <p className="text-xs text-primary mt-1 flex items-center gap-1">
                  {totalSavings} kWh this month
                </p>
              </div>
              <div className="rounded-lg bg-primary/10 p-3">
                <TrendingDown className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Est. Monthly Bill</p>
                <p className="text-2xl font-semibold mt-1 flex items-center">
                  <IndianRupee className="h-5 w-5" />8,420
                </p>
                <p className="text-xs text-primary mt-1 flex items-center gap-1">
                  Saving Rs 1,850
                </p>
              </div>
              <div className="rounded-lg bg-chart-3/10 p-3">
                <IndianRupee className="h-5 w-5 text-chart-3" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Smart Lighting Zones */}
      <Card className="bg-card border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-chart-3" />
              <CardTitle className="text-base font-medium">Smart Lighting Zones</CardTitle>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Sun className="h-4 w-4" />
              <span>Daylight Mode Active</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {zones.map((zone) => (
              <div 
                key={zone.id} 
                className="rounded-lg border border-border/50 bg-secondary/30 p-4 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{zone.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {zone.activeLights}/{zone.lights} lights active
                    </p>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={
                      zone.mode === "auto" 
                        ? "bg-primary/10 text-primary border-primary/30" 
                        : zone.mode === "schedule"
                        ? "bg-chart-2/10 text-chart-2 border-chart-2/30"
                        : "bg-chart-4/10 text-chart-4 border-chart-4/30"
                    }
                  >
                    {zone.mode === "auto" && <Activity className="h-3 w-3 mr-1" />}
                    {zone.mode === "schedule" && <Clock className="h-3 w-3 mr-1" />}
                    {zone.mode.charAt(0).toUpperCase() + zone.mode.slice(1)}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Brightness</span>
                    <span>{zoneBrightness[zone.id]}%</span>
                  </div>
                  <Slider
                    value={[zoneBrightness[zone.id]]}
                    onValueChange={(value) => setZoneBrightness(prev => ({ ...prev, [zone.id]: value[0] }))}
                    max={100}
                    step={10}
                    disabled={globalAutoMode && zone.mode === "auto"}
                    className="[&>span]:bg-chart-3"
                  />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    {zone.motionDetected ? (
                      <>
                        <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-primary">Motion detected</span>
                      </>
                    ) : (
                      <>
                        <Moon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">No motion</span>
                      </>
                    )}
                  </div>
                  <span className="text-muted-foreground">{zone.powerUsage} W</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Charts Section */}
      <Tabs defaultValue="realtime" className="space-y-4">
        <TabsList className="bg-secondary/50">
          <TabsTrigger value="realtime">Real-time</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="voltage">Voltage Monitor</TabsTrigger>
        </TabsList>

        <TabsContent value="realtime">
          <Card className="bg-card border-border/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-chart-3" />
                  <CardTitle className="text-base font-medium">24-Hour Consumption vs Baseline</CardTitle>
                </div>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  Saving 18% today
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ChartContainer config={hourlyChartConfig} className="h-[300px] w-full">
                <AreaChart data={hourlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="fillEnergy" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-chart-3)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--color-chart-3)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" vertical={false} />
                  <XAxis 
                    dataKey="time" 
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="baseline" 
                    stroke="var(--color-muted-foreground)" 
                    strokeWidth={1}
                    strokeDasharray="5 5"
                    dot={false}
                  />
                  <Area
                    type="monotone"
                    dataKey="consumption"
                    stroke="var(--color-chart-3)"
                    fill="url(#fillEnergy)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monthly">
          <Card className="bg-card border-border/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Gauge className="h-5 w-5 text-chart-4" />
                <CardTitle className="text-base font-medium">Monthly Consumption & Savings</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ChartContainer config={monthlyChartConfig} className="h-[300px] w-full">
                <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" vertical={false} />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="voltage">
          <Card className="bg-card border-border/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  <CardTitle className="text-base font-medium">Voltage Fluctuation Monitor</CardTitle>
                </div>
                <Badge variant="outline" className="bg-warning/10 text-warning border-warning/30">
                  2 surges this week
                </Badge>
              </div>
              <CardDescription>
                Mistri AI predicts potential equipment issues based on voltage patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={voltageChartConfig} className="h-[300px] w-full">
                <LineChart data={voltageData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" vertical={false} />
                  <XAxis 
                    dataKey="time" 
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                    domain={[220, 240]}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="threshold" 
                    stroke="var(--color-destructive)" 
                    strokeWidth={1}
                    strokeDasharray="5 5"
                    dot={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="voltage" 
                    stroke="var(--color-chart-3)" 
                    strokeWidth={2}
                    dot={{ fill: "var(--color-chart-3)", r: 4 }}
                  />
                </LineChart>
              </ChartContainer>
              
              <div className="mt-4 rounded-lg border border-warning/30 bg-warning/10 p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
                  <div>
                    <p className="font-medium text-warning">Predictive Alert: Lift Motor</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Based on voltage patterns, the Block A lift motor may require servicing within 2 weeks. 
                      Recommend scheduling preventive maintenance.
                    </p>
                    <Button variant="outline" size="sm" className="mt-3 bg-transparent">
                      Schedule Maintenance
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Appliance Breakdown */}
      <Card className="bg-card border-border/50">
        <CardHeader>
          <CardTitle className="text-base font-medium">Power Consumption by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "Common Area Lighting", percentage: 35, power: "1,197 kWh", color: "bg-chart-3" },
              { name: "Lifts & Motors", percentage: 28, power: "958 kWh", color: "bg-chart-2" },
              { name: "Water Pumps", percentage: 22, power: "752 kWh", color: "bg-chart-4" },
              { name: "Security Systems", percentage: 10, power: "342 kWh", color: "bg-primary" },
              { name: "Other", percentage: 5, power: "171 kWh", color: "bg-muted-foreground" },
            ].map((item) => (
              <div key={item.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>{item.name}</span>
                  <span className="text-muted-foreground">{item.power} ({item.percentage}%)</span>
                </div>
                <Progress value={item.percentage} className={`h-2 [&>div]:${item.color}`} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
