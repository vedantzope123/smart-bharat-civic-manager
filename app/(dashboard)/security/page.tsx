"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { 
  Shield, 
  UserCheck, 
  Car,
  Clock,
  Search,
  Camera,
  AlertTriangle,
  CheckCircle,
  LogIn,
  LogOut,
  Phone,
  Home,
  User,
  Filter
} from "lucide-react"

// Visitor log data
const visitors = [
  {
    id: 1,
    name: "Rajesh Kumar",
    purpose: "Delivery - Amazon",
    visiting: "A-302, Sharma Ji",
    entryTime: "10:45 AM",
    exitTime: null,
    status: "inside",
    phone: "+91 98765 43210",
    vehicle: null,
  },
  {
    id: 2,
    name: "Priya Patel",
    purpose: "Guest",
    visiting: "B-105, Gupta Family",
    entryTime: "9:30 AM",
    exitTime: "11:15 AM",
    status: "exited",
    phone: "+91 87654 32109",
    vehicle: "MH-12-AB-1234",
  },
  {
    id: 3,
    name: "Electrician - Vinod",
    purpose: "Maintenance",
    visiting: "C-401, Reddy Ji",
    entryTime: "8:00 AM",
    exitTime: null,
    status: "inside",
    phone: "+91 76543 21098",
    vehicle: null,
  },
  {
    id: 4,
    name: "Swiggy Delivery",
    purpose: "Food Delivery",
    visiting: "A-205, Joshi Family",
    entryTime: "12:30 PM",
    exitTime: "12:35 PM",
    status: "exited",
    phone: "+91 65432 10987",
    vehicle: "Bike",
  },
]

// Vehicle log data
const vehicles = [
  {
    id: 1,
    number: "MH-12-CD-5678",
    type: "Car - Sedan",
    owner: "A-302, Sharma Ji",
    entryTime: "7:30 AM",
    exitTime: null,
    status: "parked",
    slot: "A-15",
  },
  {
    id: 2,
    number: "MH-12-EF-9012",
    type: "Car - SUV",
    owner: "B-105, Gupta Family",
    entryTime: "6:45 AM",
    exitTime: "9:00 AM",
    status: "exited",
    slot: null,
  },
  {
    id: 3,
    number: "MH-12-GH-3456",
    type: "Two Wheeler",
    owner: "C-205, Mehta Ji",
    entryTime: "8:15 AM",
    exitTime: null,
    status: "parked",
    slot: "TW-23",
  },
  {
    id: 4,
    number: "Unknown",
    type: "Delivery Van",
    owner: "Visitor",
    entryTime: "11:00 AM",
    exitTime: "11:45 AM",
    status: "exited",
    slot: null,
  },
]

// Security incidents
const incidents = [
  {
    id: 1,
    type: "alert",
    title: "Unauthorized Access Attempt",
    description: "Gate 2 - Manual override attempted",
    time: "Yesterday, 11:45 PM",
    status: "resolved",
    resolvedBy: "Guard Ramesh",
  },
  {
    id: 2,
    type: "warning",
    title: "Tailgating Detected",
    description: "Main Gate - 2 persons entered on single entry",
    time: "Today, 8:30 AM",
    status: "verified",
    resolvedBy: "Auto-verified by AI",
  },
  {
    id: 3,
    type: "info",
    title: "Night Patrol Completed",
    description: "All blocks checked, no issues found",
    time: "Today, 5:00 AM",
    status: "logged",
    resolvedBy: "Guard Suresh",
  },
]

export default function SecurityPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  
  const visitorsInside = visitors.filter(v => v.status === "inside").length
  const vehiclesParked = vehicles.filter(v => v.status === "parked").length

  const handleMarkExit = (visitorName: string) => {
    toast({
      title: "Exit Marked",
      description: `${visitorName} has been marked as exited. Entry updated in log.`,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            Security Dashboard
          </h1>
          <p className="text-muted-foreground">
            Visitor management and vehicle tracking system
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 text-sm py-1.5">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse mr-2" />
            All Gates Secure
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-card border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Visitors Inside</p>
                <p className="text-2xl font-semibold mt-1">{visitorsInside}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {visitors.length} total today
                </p>
              </div>
              <div className="rounded-lg bg-chart-2/10 p-3">
                <UserCheck className="h-5 w-5 text-chart-2" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Vehicles Parked</p>
                <p className="text-2xl font-semibold mt-1">{vehiclesParked}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {vehicles.length} entries today
                </p>
              </div>
              <div className="rounded-lg bg-chart-4/10 p-3">
                <Car className="h-5 w-5 text-chart-4" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Cameras</p>
                <p className="text-2xl font-semibold mt-1">12/12</p>
                <p className="text-xs text-primary mt-1">
                  All online
                </p>
              </div>
              <div className="rounded-lg bg-primary/10 p-3">
                <Camera className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Today&apos;s Alerts</p>
                <p className="text-2xl font-semibold mt-1">2</p>
                <p className="text-xs text-warning mt-1">
                  1 pending review
                </p>
              </div>
              <div className="rounded-lg bg-warning/10 p-3">
                <AlertTriangle className="h-5 w-5 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="visitors" className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <TabsList className="bg-secondary/50">
            <TabsTrigger value="visitors">Visitors</TabsTrigger>
            <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
            <TabsTrigger value="incidents">Incidents</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-[200px] bg-secondary/50"
              />
            </div>
            <Button variant="outline" size="icon" className="bg-transparent">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="visitors">
          <Card className="bg-card border-border/50">
            <CardHeader>
              <CardTitle className="text-base font-medium">Visitor Log</CardTitle>
              <CardDescription>Track all visitors entering and exiting the premises</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {visitors
                  .filter(v => 
                    v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    v.visiting.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((visitor) => (
                  <div
                    key={visitor.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-lg border border-border/50 bg-secondary/30 p-4"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`rounded-full p-2.5 ${
                        visitor.status === "inside" 
                          ? "bg-primary/20 text-primary" 
                          : "bg-muted text-muted-foreground"
                      }`}>
                        <User className="h-4 w-4" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{visitor.name}</p>
                          <Badge 
                            variant="outline" 
                            className={
                              visitor.status === "inside"
                                ? "bg-primary/10 text-primary border-primary/30"
                                : "bg-muted text-muted-foreground border-border"
                            }
                          >
                            {visitor.status === "inside" ? "Inside" : "Exited"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{visitor.purpose}</p>
                        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Home className="h-3 w-3" />
                            {visitor.visiting}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {visitor.phone}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-primary">
                          <LogIn className="h-3 w-3" />
                          {visitor.entryTime}
                        </div>
                        {visitor.exitTime && (
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <LogOut className="h-3 w-3" />
                            {visitor.exitTime}
                          </div>
                        )}
                      </div>
                      {visitor.status === "inside" && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="bg-transparent"
                          onClick={() => handleMarkExit(visitor.name)}
                        >
                          Mark Exit
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vehicles">
          <Card className="bg-card border-border/50">
            <CardHeader>
              <CardTitle className="text-base font-medium">Vehicle Log</CardTitle>
              <CardDescription>Monitor vehicle entries and parking status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {vehicles
                  .filter(v => 
                    v.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    v.owner.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((vehicle) => (
                  <div
                    key={vehicle.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-lg border border-border/50 bg-secondary/30 p-4"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`rounded-full p-2.5 ${
                        vehicle.status === "parked" 
                          ? "bg-chart-4/20 text-chart-4" 
                          : "bg-muted text-muted-foreground"
                      }`}>
                        <Car className="h-4 w-4" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium font-mono">{vehicle.number}</p>
                          <Badge 
                            variant="outline" 
                            className={
                              vehicle.status === "parked"
                                ? "bg-chart-4/10 text-chart-4 border-chart-4/30"
                                : "bg-muted text-muted-foreground border-border"
                            }
                          >
                            {vehicle.status === "parked" ? "Parked" : "Exited"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{vehicle.type}</p>
                        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Home className="h-3 w-3" />
                            {vehicle.owner}
                          </span>
                          {vehicle.slot && (
                            <span className="font-mono bg-secondary px-2 py-0.5 rounded">
                              Slot: {vehicle.slot}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-chart-4">
                          <LogIn className="h-3 w-3" />
                          {vehicle.entryTime}
                        </div>
                        {vehicle.exitTime && (
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <LogOut className="h-3 w-3" />
                            {vehicle.exitTime}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="incidents">
          <Card className="bg-card border-border/50">
            <CardHeader>
              <CardTitle className="text-base font-medium">Security Incidents</CardTitle>
              <CardDescription>Review and manage security alerts and events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {incidents.map((incident) => (
                  <div
                    key={incident.id}
                    className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 rounded-lg border border-border/50 bg-secondary/30 p-4"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`rounded-full p-2.5 ${
                        incident.type === "alert" 
                          ? "bg-destructive/20 text-destructive" 
                          : incident.type === "warning"
                          ? "bg-warning/20 text-warning"
                          : "bg-chart-2/20 text-chart-2"
                      }`}>
                        {incident.type === "alert" ? (
                          <AlertTriangle className="h-4 w-4" />
                        ) : incident.type === "warning" ? (
                          <AlertTriangle className="h-4 w-4" />
                        ) : (
                          <CheckCircle className="h-4 w-4" />
                        )}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{incident.title}</p>
                          <Badge 
                            variant="outline" 
                            className={
                              incident.status === "resolved"
                                ? "bg-primary/10 text-primary border-primary/30"
                                : incident.status === "verified"
                                ? "bg-chart-2/10 text-chart-2 border-chart-2/30"
                                : "bg-muted text-muted-foreground border-border"
                            }
                          >
                            {incident.status.charAt(0).toUpperCase() + incident.status.slice(1)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{incident.description}</p>
                        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {incident.time}
                          </span>
                          <span>By: {incident.resolvedBy}</span>
                        </div>
                      </div>
                    </div>
                    {incident.status !== "resolved" && (
                      <Button variant="outline" size="sm" className="bg-transparent">
                        Review
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Guard Status */}
      <Card className="bg-card border-border/50">
        <CardHeader>
          <CardTitle className="text-base font-medium">On-Duty Security Personnel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { name: "Ramesh Singh", post: "Main Gate", shift: "6 AM - 2 PM", status: "active" },
              { name: "Suresh Kumar", post: "Block A & B", shift: "6 AM - 2 PM", status: "patrol" },
              { name: "Mohan Verma", post: "Parking Area", shift: "6 AM - 2 PM", status: "active" },
            ].map((guard) => (
              <div 
                key={guard.name}
                className="flex items-center gap-3 rounded-lg border border-border/50 bg-secondary/30 p-4"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary">
                  <span className="text-sm font-medium">
                    {guard.name.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{guard.name}</p>
                  <p className="text-xs text-muted-foreground">{guard.post}</p>
                  <p className="text-xs text-muted-foreground">{guard.shift}</p>
                </div>
                <Badge 
                  variant="outline" 
                  className={
                    guard.status === "patrol"
                      ? "bg-chart-2/10 text-chart-2 border-chart-2/30"
                      : "bg-primary/10 text-primary border-primary/30"
                  }
                >
                  {guard.status === "patrol" ? "On Patrol" : "Active"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
