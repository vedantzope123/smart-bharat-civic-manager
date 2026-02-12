"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Line, LineChart } from "recharts"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { 
  Trash2,
  CheckCircle, 
  AlertTriangle,
  MapPin,
  Camera,
  Recycle,
  Leaf,
  TrendingDown,
  Clock,
  User,
  Ticket,
  Calendar
} from "lucide-react"

// Waste bin data
const wasteBins = [
  {
    id: "bin-01",
    location: "Block A - Corridor 1",
    type: "General Waste",
    capacity: 100,
    fillLevel: 95,
    status: "overflowing",
    lastCollected: "3 days ago",
    ticketRaised: true,
    assignedTo: "Cleaning Staff A",
    aiDetected: true
  },
  {
    id: "bin-02",
    location: "Block B - Ground Floor",
    type: "Recyclable",
    capacity: 80,
    fillLevel: 45,
    status: "normal",
    lastCollected: "1 day ago",
    ticketRaised: false,
    assignedTo: null,
    aiDetected: false
  },
  {
    id: "bin-03",
    location: "Parking Area",
    type: "General Waste",
    capacity: 120,
    fillLevel: 78,
    status: "warning",
    lastCollected: "2 days ago",
    ticketRaised: false,
    assignedTo: null,
    aiDetected: true
  },
  {
    id: "bin-04",
    location: "Hostel Mess",
    type: "Organic Waste",
    capacity: 150,
    fillLevel: 92,
    status: "critical",
    lastCollected: "12 hours ago",
    ticketRaised: true,
    assignedTo: "Mess Staff B",
    aiDetected: true
  },
  {
    id: "bin-05",
    location: "Garden Area",
    type: "Garden Waste",
    capacity: 100,
    fillLevel: 35,
    status: "normal",
    lastCollected: "2 days ago",
    ticketRaised: false,
    assignedTo: null,
    aiDetected: false
  },
  {
    id: "bin-06",
    location: "Block C - 2nd Floor",
    type: "Recyclable",
    capacity: 80,
    fillLevel: 88,
    status: "critical",
    lastCollected: "3 days ago",
    ticketRaised: true,
    assignedTo: "Cleaning Staff C",
    aiDetected: true
  },
]

// Cleanliness tickets
const tickets = [
  {
    id: "TKT-001",
    type: "Bin Overflow",
    location: "Block A - Corridor 1",
    priority: "high",
    status: "open",
    assignedTo: "Cleaning Staff A",
    raisedAt: "10 mins ago",
    dueBy: "In 20 mins",
    autoRaised: true
  },
  {
    id: "TKT-002",
    type: "Debris Detected",
    location: "Parking Area Entrance",
    priority: "medium",
    status: "in-progress",
    assignedTo: "Cleaning Staff B",
    raisedAt: "30 mins ago",
    dueBy: "In 30 mins",
    autoRaised: true
  },
  {
    id: "TKT-003",
    type: "Bin Overflow",
    location: "Hostel Mess",
    priority: "high",
    status: "open",
    assignedTo: "Mess Staff B",
    raisedAt: "45 mins ago",
    dueBy: "In 15 mins",
    autoRaised: true
  },
  {
    id: "TKT-004",
    type: "Wet Floor",
    location: "Block B Lobby",
    priority: "high",
    status: "completed",
    assignedTo: "Cleaning Staff A",
    raisedAt: "2 hours ago",
    dueBy: "Completed",
    autoRaised: false
  },
  {
    id: "TKT-005",
    type: "Bin Overflow",
    location: "Block C - 2nd Floor",
    priority: "high",
    status: "open",
    assignedTo: "Cleaning Staff C",
    raisedAt: "1 hour ago",
    dueBy: "In 30 mins",
    autoRaised: true
  },
]

// Weekly waste collection data
const weeklyData = [
  { day: "Mon", general: 450, recyclable: 120, organic: 280 },
  { day: "Tue", general: 420, recyclable: 135, organic: 310 },
  { day: "Wed", general: 480, recyclable: 145, organic: 295 },
  { day: "Thu", general: 510, recyclable: 128, organic: 320 },
  { day: "Fri", general: 490, recyclable: 150, organic: 340 },
  { day: "Sat", general: 380, recyclable: 110, organic: 260 },
  { day: "Sun", general: 350, recyclable: 95, organic: 230 },
]

export default function WastePage() {
  const [selectedTab, setSelectedTab] = useState("overview")

  const overflowingBins = wasteBins.filter(b => b.status === "overflowing").length
  const criticalBins = wasteBins.filter(b => b.status === "critical").length
  const openTickets = tickets.filter(t => t.status === "open").length
  const totalWaste = weeklyData.reduce((sum, day) => sum + day.general + day.recyclable + day.organic, 0)
  const recyclingRate = ((weeklyData.reduce((sum, day) => sum + day.recyclable, 0) / totalWaste) * 100).toFixed(1)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "text-green-600"
      case "warning":
        return "text-yellow-600"
      case "critical":
      case "overflowing":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "normal":
        return <Badge className="bg-green-500">Normal</Badge>
      case "warning":
        return <Badge className="bg-yellow-500">Warning</Badge>
      case "critical":
        return <Badge className="bg-red-500">Critical</Badge>
      case "overflowing":
        return <Badge className="bg-red-600 animate-pulse">Overflowing</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>
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
        <h1 className="text-2xl font-semibold tracking-tight">
          Swachhata Monitor - Waste Management
        </h1>
        <p className="text-muted-foreground">
          AI-powered cleanliness monitoring and automated ticketing system
        </p>
      </div>

      {/* Critical Alerts */}
      {overflowingBins > 0 && (
        <Alert variant="destructive" className="border-2">
          <AlertTriangle className="h-5 w-5" />
          <AlertTitle className="text-lg font-bold">Urgent Action Required!</AlertTitle>
          <AlertDescription className="text-base mt-2">
            <p>{overflowingBins} waste bin(s) are overflowing. {openTickets} cleaning tickets awaiting action.</p>
            <Button variant="destructive" size="sm" className="mt-3">
              View Critical Locations
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Waste Bins</CardTitle>
            <Trash2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{wasteBins.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {overflowingBins + criticalBins} need attention
            </p>
            <Progress 
              value={((wasteBins.length - overflowingBins - criticalBins) / wasteBins.length) * 100} 
              className="mt-2" 
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Detections</CardTitle>
            <Camera className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {wasteBins.filter(b => b.aiDetected).length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Auto-monitored via CCTV
            </p>
            <Badge className="mt-2 bg-blue-500">YOLOv8 Active</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
            <Ticket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{openTickets}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {tickets.filter(t => t.autoRaised).length} auto-raised
            </p>
            <Progress value={(tickets.filter(t => t.status === "completed").length / tickets.length) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recycling Rate</CardTitle>
            <Recycle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{recyclingRate}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              This week's performance
            </p>
            <div className="flex items-center gap-1 mt-2 text-xs text-green-600">
              <TrendingDown className="h-3 w-3" />
              +2.3% from last week
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4" onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="overview">Bin Status</TabsTrigger>
          <TabsTrigger value="tickets">Cleaning Tickets</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="staff">Staff Performance</TabsTrigger>
        </TabsList>

        {/* Bin Status Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {wasteBins.map((bin) => (
              <Card key={bin.id} className={bin.status === "overflowing" ? "border-red-500 border-2 animate-pulse" : ""}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base flex items-center gap-2">
                        <Trash2 className="h-4 w-4" />
                        {bin.location}
                      </CardTitle>
                      <CardDescription>{bin.type}</CardDescription>
                    </div>
                    {getStatusBadge(bin.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Fill Level</span>
                      <span className={`font-bold ${getStatusColor(bin.status)}`}>
                        {bin.fillLevel}%
                      </span>
                    </div>
                    <Progress 
                      value={bin.fillLevel} 
                      className={bin.status === "overflowing" || bin.status === "critical" ? "bg-red-100" : ""}
                    />
                    <p className="text-xs text-muted-foreground">
                      Capacity: {bin.capacity}L
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <div className="text-muted-foreground text-xs">Last Collected</div>
                      <p className="font-semibold">{bin.lastCollected}</p>
                    </div>
                    <div>
                      <div className="text-muted-foreground text-xs">AI Monitor</div>
                      <p className="font-semibold">
                        {bin.aiDetected ? (
                          <Badge variant="outline" className="text-xs">
                            <Camera className="h-3 w-3 mr-1" />
                            Active
                          </Badge>
                        ) : (
                          "Manual"
                        )}
                      </p>
                    </div>
                  </div>

                  {bin.ticketRaised && (
                    <Alert>
                      <Ticket className="h-4 w-4" />
                      <AlertDescription className="text-xs">
                        Ticket raised - Assigned to {bin.assignedTo}
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="flex gap-2">
                    {!bin.ticketRaised && (bin.status === "critical" || bin.status === "overflowing") && (
                      <Button size="sm" variant="destructive" className="flex-1">
                        <Ticket className="h-4 w-4 mr-2" />
                        Raise Ticket
                      </Button>
                    )}
                    <Button size="sm" variant="outline" className="flex-1">
                      Mark Collected
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Cleaning Tickets Tab */}
        <TabsContent value="tickets" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Housekeeping Tickets</CardTitle>
                  <CardDescription>
                    Auto-generated and manual cleaning requests
                  </CardDescription>
                </div>
                <Button>
                  <Ticket className="h-4 w-4 mr-2" />
                  Create Manual Ticket
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tickets.map((ticket) => (
                  <div key={ticket.id} className="flex gap-4 p-4 border rounded-lg">
                    <div className={`p-2 rounded-full h-fit ${
                      ticket.priority === "high" ? "bg-red-100" : 
                      ticket.priority === "medium" ? "bg-yellow-100" : "bg-green-100"
                    }`}>
                      <Trash2 className={`h-5 w-5 ${
                        ticket.priority === "high" ? "text-red-600" : 
                        ticket.priority === "medium" ? "text-yellow-600" : "text-green-600"
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">{ticket.id}</h4>
                            {getPriorityBadge(ticket.priority)}
                            {ticket.autoRaised && (
                              <Badge variant="outline" className="text-xs">
                                <Camera className="h-3 w-3 mr-1" />
                                Auto-Raised
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm mt-1">{ticket.type}</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            <MapPin className="h-3 w-3 inline mr-1" />
                            {ticket.location}
                          </p>
                        </div>
                        <Badge variant={
                          ticket.status === "completed" ? "outline" :
                          ticket.status === "in-progress" ? "default" : "destructive"
                        }>
                          {ticket.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                        <div>
                          <div className="text-muted-foreground">Assigned To</div>
                          <p className="font-semibold flex items-center gap-1 mt-1">
                            <User className="h-3 w-3" />
                            {ticket.assignedTo}
                          </p>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Due By</div>
                          <p className={`font-semibold flex items-center gap-1 mt-1 ${
                            ticket.status === "open" && ticket.priority === "high" ? "text-red-600" : ""
                          }`}>
                            <Clock className="h-3 w-3" />
                            {ticket.dueBy}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Raised {ticket.raisedAt}
                      </p>
                      {ticket.status !== "completed" && (
                        <div className="flex gap-2 mt-3">
                          {ticket.status === "open" && (
                            <Button size="sm" variant="outline">
                              Start Work
                            </Button>
                          )}
                          {ticket.status === "in-progress" && (
                            <Button size="sm">
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Mark Complete
                            </Button>
                          )}
                          <Button size="sm" variant="outline">
                            Reassign
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Waste Collection</CardTitle>
                <CardDescription>
                  Total waste collected by category (in kg)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    general: {
                      label: "General Waste",
                      color: "hsl(var(--chart-1))",
                    },
                    recyclable: {
                      label: "Recyclable",
                      color: "hsl(var(--chart-2))",
                    },
                    organic: {
                      label: "Organic",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="general" fill="var(--color-general)" />
                    <Bar dataKey="recyclable" fill="var(--color-recyclable)" />
                    <Bar dataKey="organic" fill="var(--color-organic)" />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Environmental Impact</CardTitle>
                <CardDescription>
                  Swachh Bharat contribution metrics
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Recycle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Waste Recycled</span>
                    </div>
                    <span className="font-bold text-green-600">
                      {weeklyData.reduce((sum, day) => sum + day.recyclable, 0)} kg
                    </span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Leaf className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Composted Organic</span>
                    </div>
                    <span className="font-bold text-green-600">
                      {weeklyData.reduce((sum, day) => sum + day.organic, 0)} kg
                    </span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>

                <div className="p-4 bg-green-50 rounded-lg mt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Leaf className="h-5 w-5 text-green-600" />
                    <h4 className="font-semibold text-green-800">Carbon Saved</h4>
                  </div>
                  <p className="text-2xl font-bold text-green-600">245 kg CO₂</p>
                  <p className="text-xs text-green-700 mt-1">This month's contribution to clean environment</p>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Collection Schedule
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>General Waste:</span>
                      <span className="font-semibold">Daily - 6:00 AM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Recyclables:</span>
                      <span className="font-semibold">Mon, Wed, Fri</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Organic Waste:</span>
                      <span className="font-semibold">Daily - 7:00 PM</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Staff Performance Tab */}
        <TabsContent value="staff" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            {["Cleaning Staff A", "Cleaning Staff B", "Mess Staff B"].map((staff, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {staff}
                  </CardTitle>
                  <CardDescription>This week's performance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Tickets Completed</span>
                      <span className="font-bold">{8 + idx * 2}/10</span>
                    </div>
                    <Progress value={(8 + idx * 2) * 10} />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Avg. Response</div>
                      <p className="font-semibold">{12 + idx * 3} mins</p>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Rating</div>
                      <p className="font-semibold text-green-600">⭐ {4.5 + idx * 0.2}/5</p>
                    </div>
                  </div>
                  <Badge className="w-full justify-center bg-green-500">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Excellent Performance
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
