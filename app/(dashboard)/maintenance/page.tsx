"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, CartesianGrid } from "recharts"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { 
  Wrench,
  AlertTriangle,
  TrendingUp,
  Activity,
  Calendar,
  CheckCircle,
  Clock,
  Zap,
  Droplets,
  Wind,
  Bot
} from "lucide-react"

// Equipment health data
const equipment = [
  {
    id: "EQ-001",
    name: "Water Pump - Block A",
    type: "Motor",
    health: 45,
    status: "critical",
    prediction: "Likely to fail within 7 days",
    lastMaintenance: "90 days ago",
    nextMaintenance: "Immediate",
    voltage: "Fluctuating (210-240V)",
    runningHours: 2850,
    failureProbability: 85
  },
  {
    id: "EQ-002",
    name: "Elevator - Block B",
    type: "Lift",
    health: 72,
    status: "warning",
    prediction: "Maintenance recommended within 30 days",
    lastMaintenance: "45 days ago",
    nextMaintenance: "15 days",
    voltage: "Stable (220V)",
    runningHours: 1820,
    failureProbability: 35
  },
  {
    id: "EQ-003",
    name: "Main Generator",
    type: "Power",
    health: 88,
    status: "healthy",
    prediction: "Operating normally",
    lastMaintenance: "20 days ago",
    nextMaintenance: "70 days",
    voltage: "Stable (230V)",
    runningHours: 450,
    failureProbability: 12
  },
  {
    id: "EQ-004",
    name: "HVAC System - Common Hall",
    type: "Cooling",
    health: 55,
    status: "warning",
    prediction: "Compressor efficiency declining",
    lastMaintenance: "60 days ago",
    nextMaintenance: "20 days",
    voltage: "Stable (220V)",
    runningHours: 3200,
    failureProbability: 48
  },
]

// Voltage trend data
const voltageData = [
  { time: "00:00", blockA: 220, blockB: 222, blockC: 221 },
  { time: "04:00", blockA: 218, blockB: 220, blockC: 219 },
  { time: "08:00", blockA: 210, blockB: 221, blockC: 220 },
  { time: "12:00", blockA: 205, blockB: 222, blockC: 221 },
  { time: "16:00", blockA: 212, blockB: 220, blockC: 222 },
  { time: "20:00", blockA: 208, blockB: 221, blockC: 220 },
  { time: "Now", blockA: 215, blockB: 221, blockC: 221 },
]

// Maintenance schedule
const schedule = [
  {
    equipment: "Water Pump - Block A",
    type: "Emergency Repair",
    date: "Tomorrow",
    technician: "Maintenance Team A",
    priority: "critical",
    estimatedCost: 8500
  },
  {
    equipment: "Elevator - Block B",
    type: "Preventive Maintenance",
    date: "Jan 30, 2026",
    technician: "Lift Specialist",
    priority: "medium",
    estimatedCost: 12000
  },
  {
    equipment: "Main Generator",
    type: "Routine Inspection",
    date: "Feb 15, 2026",
    technician: "Electrical Team",
    priority: "low",
    estimatedCost: 3000
  },
]

export default function MaintenancePage() {
  const criticalEquipment = equipment.filter(e => e.status === "critical").length
  const warningEquipment = equipment.filter(e => e.status === "warning").length
  const avgHealth = Math.round(equipment.reduce((sum, e) => sum + e.health, 0) / equipment.length)
  const costSavings = 45000 // Simulated savings from predictive maintenance

  const getHealthColor = (health: number) => {
    if (health >= 70) return "text-green-600"
    if (health >= 50) return "text-yellow-600"
    return "text-red-600"
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "healthy":
        return <Badge className="bg-green-500">Healthy</Badge>
      case "warning":
        return <Badge className="bg-yellow-500">Warning</Badge>
      case "critical":
        return <Badge className="bg-red-500 animate-pulse">Critical</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "critical":
        return <Badge variant="destructive">Critical</Badge>
      case "medium":
        return <Badge className="bg-yellow-500">Medium</Badge>
      case "low":
        return <Badge variant="outline">Low</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
          <Wrench className="h-7 w-7" />
          Predictive Maintenance - The 'Mistri' AI
        </h1>
        <p className="text-muted-foreground">
          AI-powered equipment health monitoring and failure prediction
        </p>
      </div>

      {/* Critical Alert */}
      {criticalEquipment > 0 && (
        <Alert variant="destructive" className="border-2">
          <AlertTriangle className="h-5 w-5" />
          <AlertTitle className="text-lg font-bold">
            ⚠️ {criticalEquipment} Critical Equipment Issue(s)!
          </AlertTitle>
          <AlertDescription className="text-base mt-2">
            <p>Water Pump - Block A is predicted to fail within 7 days due to voltage fluctuations. Immediate maintenance required!</p>
            <Button variant="destructive" size="sm" className="mt-3">
              Schedule Emergency Repair
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Equipment Health</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getHealthColor(avgHealth)}`}>
              {avgHealth}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Average across all equipment
            </p>
            <Progress value={avgHealth} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{criticalEquipment}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {warningEquipment} warnings
            </p>
            <Badge className="mt-2 bg-red-500">Needs immediate attention</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cost Savings</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ₹{costSavings.toLocaleString('en-IN')}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Saved by preventing failures
            </p>
            <div className="flex items-center gap-1 mt-2 text-xs text-green-600">
              <CheckCircle className="h-3 w-3" />
              This quarter
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Predictions</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{equipment.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Equipment being monitored
            </p>
            <Badge className="mt-2 bg-blue-500">ML Model Active</Badge>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="equipment" className="space-y-4">
        <TabsList>
          <TabsTrigger value="equipment">Equipment Health</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="schedule">Maintenance Schedule</TabsTrigger>
        </TabsList>

        {/* Equipment Health Tab */}
        <TabsContent value="equipment" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {equipment.map((item) => (
              <Card key={item.id} className={item.status === "critical" ? "border-red-500 border-2" : ""}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base flex items-center gap-2">
                        <Wrench className="h-4 w-4" />
                        {item.name}
                      </CardTitle>
                      <CardDescription>{item.type} • {item.id}</CardDescription>
                    </div>
                    {getStatusBadge(item.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Health Score */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Health Score</span>
                      <span className={`font-bold ${getHealthColor(item.health)}`}>
                        {item.health}%
                      </span>
                    </div>
                    <Progress 
                      value={item.health} 
                      className={item.status === "critical" ? "bg-red-100" : ""}
                    />
                  </div>

                  {/* AI Prediction */}
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                    <div className="flex items-center gap-2 mb-1">
                      <Bot className="h-4 w-4 text-blue-600" />
                      <span className="font-semibold text-sm text-blue-800">AI Prediction</span>
                    </div>
                    <p className="text-sm text-blue-700">{item.prediction}</p>
                    <div className="mt-2 text-xs text-blue-600">
                      Failure Probability: {item.failureProbability}%
                    </div>
                  </div>

                  {/* Equipment Details */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="text-muted-foreground">Voltage</div>
                      <p className="font-semibold">{item.voltage}</p>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Running Hours</div>
                      <p className="font-semibold">{item.runningHours}h</p>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Last Service</div>
                      <p className="font-semibold">{item.lastMaintenance}</p>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Next Service</div>
                      <p className={`font-semibold ${item.status === "critical" ? "text-red-600" : ""}`}>
                        {item.nextMaintenance}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2 border-t">
                    {item.status === "critical" && (
                      <Button size="sm" variant="destructive" className="flex-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        Emergency Repair
                      </Button>
                    )}
                    <Button size="sm" variant="outline" className="flex-1">
                      View Details
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      History
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Voltage Fluctuation Analysis</CardTitle>
              <CardDescription>
                Real-time voltage monitoring to predict equipment burnout
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  blockA: {
                    label: "Block A (Critical)",
                    color: "hsl(var(--chart-1))",
                  },
                  blockB: {
                    label: "Block B (Stable)",
                    color: "hsl(var(--chart-2))",
                  },
                  blockC: {
                    label: "Block C (Stable)",
                    color: "hsl(var(--chart-3))",
                  },
                }}
                className="h-[300px]"
              >
                <LineChart data={voltageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis domain={[200, 230]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="blockA" 
                    stroke="var(--color-blockA)" 
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="blockB" 
                    stroke="var(--color-blockB)" 
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="blockC" 
                    stroke="var(--color-blockC)" 
                    strokeWidth={2}
                  />
                  {/* Safe voltage lines */}
                  <Line 
                    type="monotone" 
                    dataKey={() => 220} 
                    stroke="#10b981" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Optimal (220V)"
                  />
                </LineChart>
              </ChartContainer>

              <Alert className="mt-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  Block A showing voltage fluctuations (205-215V). This can damage motor windings and reduce equipment life. AI predicts pump failure within 7 days if not addressed.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Failure Prevention</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Failures Predicted:</span>
                  <span className="font-semibold text-green-600">3</span>
                </div>
                <div className="flex justify-between">
                  <span>Prevented This Year:</span>
                  <span className="font-semibold text-green-600">8</span>
                </div>
                <div className="flex justify-between">
                  <span>Success Rate:</span>
                  <span className="font-semibold text-green-600">92%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Cost Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Repair Costs Avoided:</span>
                  <span className="font-semibold">₹1,25,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Downtime Saved:</span>
                  <span className="font-semibold">48 hours</span>
                </div>
                <div className="flex justify-between">
                  <span>ROI:</span>
                  <span className="font-semibold text-green-600">340%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">AI Model Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Prediction Accuracy:</span>
                  <span className="font-semibold text-blue-600">89.5%</span>
                </div>
                <div className="flex justify-between">
                  <span>Data Points:</span>
                  <span className="font-semibold">2.4M</span>
                </div>
                <div className="flex justify-between">
                  <span>Model Version:</span>
                  <span className="font-semibold">v2.1.3</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Maintenance Schedule Tab */}
        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Maintenance</CardTitle>
              <CardDescription>
                AI-recommended maintenance schedule based on equipment health
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {schedule.map((item, idx) => (
                  <div key={idx} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{item.equipment}</h4>
                          {getPriorityBadge(item.priority)}
                        </div>
                        <p className="text-sm text-muted-foreground">{item.type}</p>
                        <div className="grid grid-cols-3 gap-4 text-sm mt-2">
                          <div>
                            <div className="text-muted-foreground flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Scheduled Date
                            </div>
                            <p className="font-semibold">{item.date}</p>
                          </div>
                          <div>
                            <div className="text-muted-foreground flex items-center gap-1">
                              <Wrench className="h-3 w-3" />
                              Assigned To
                            </div>
                            <p className="font-semibold">{item.technician}</p>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Estimated Cost</div>
                            <p className="font-semibold">₹{item.estimatedCost.toLocaleString('en-IN')}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline">
                        Reschedule
                      </Button>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                      {item.priority === "critical" && (
                        <Button size="sm" variant="destructive">
                          Mark as Urgent
                        </Button>
                      )}
                    </div>
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
