"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, CartesianGrid } from "recharts"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { 
  Flame,
  Wind, 
  AlertTriangle, 
  CheckCircle,
  Phone,
  Bell,
  AlertCircle,
  Thermometer,
  Radio,
  MapPin,
  History
} from "lucide-react"

// LPG Sensor data
const lpgSensors = [
  {
    id: "lpg-01",
    location: "Hostel Mess Kitchen",
    gasLevel: 125, // PPM
    threshold: 1000,
    status: "safe",
    battery: 87,
    lastCheck: "2 mins ago",
    temperature: 28
  },
  {
    id: "lpg-02",
    location: "Block A - Ground Floor Kitchen",
    gasLevel: 1850, // PPM
    threshold: 1000,
    status: "critical",
    battery: 92,
    lastCheck: "30 secs ago",
    temperature: 32
  },
  {
    id: "lpg-03",
    location: "Canteen Kitchen",
    gasLevel: 450,
    threshold: 1000,
    status: "safe",
    battery: 65,
    lastCheck: "1 min ago",
    temperature: 29
  },
  {
    id: "lpg-04",
    location: "Community Hall Kitchen",
    gasLevel: 780,
    threshold: 1000,
    status: "warning",
    battery: 78,
    lastCheck: "45 secs ago",
    temperature: 30
  },
]

// Fire Alarm data
const fireAlarms = [
  {
    id: "fire-01",
    location: "Block A - 1st Floor",
    type: "Smoke Detector",
    status: "active",
    battery: 95,
    lastTest: "3 days ago"
  },
  {
    id: "fire-02",
    location: "Block B - Ground Floor",
    type: "Heat Detector",
    status: "active",
    battery: 88,
    lastTest: "3 days ago"
  },
  {
    id: "fire-03",
    location: "Parking Basement",
    type: "Smoke Detector",
    status: "maintenance",
    battery: 45,
    lastTest: "15 days ago"
  },
  {
    id: "fire-04",
    location: "Hostel Wing - 2nd Floor",
    type: "Smoke Detector",
    status: "active",
    battery: 92,
    lastTest: "3 days ago"
  },
]

// Historical gas readings
const gasReadings = [
  { time: "00:00", hostel: 100, blockA: 95, canteen: 110 },
  { time: "04:00", hostel: 105, blockA: 98, canteen: 115 },
  { time: "08:00", hostel: 320, blockA: 150, canteen: 450 },
  { time: "12:00", hostel: 580, blockA: 1200, canteen: 890 },
  { time: "16:00", hostel: 450, blockA: 1600, canteen: 680 },
  { time: "20:00", hostel: 380, blockA: 1850, canteen: 520 },
  { time: "Now", hostel: 125, blockA: 1850, canteen: 450 },
]

// Recent alerts
const recentAlerts = [
  {
    id: 1,
    type: "gas",
    severity: "critical",
    location: "Block A - Ground Floor Kitchen",
    message: "LPG levels exceed 1800 PPM! Immediate action required!",
    time: "30 seconds ago",
    acknowledged: false,
    whatsappSent: true
  },
  {
    id: 2,
    type: "fire",
    severity: "warning",
    location: "Parking Basement",
    message: "Fire alarm battery low - requires maintenance",
    time: "2 hours ago",
    acknowledged: true,
    whatsappSent: true
  },
  {
    id: 3,
    type: "gas",
    severity: "warning",
    location: "Community Hall Kitchen",
    message: "LPG levels approaching threshold (780 PPM)",
    time: "5 hours ago",
    acknowledged: true,
    whatsappSent: true
  },
]

export default function SafetyPage() {
  const [autoAlerts, setAutoAlerts] = useState(true)
  const [whatsappAlerts, setWhatsappAlerts] = useState(true)
  const [emergencyContacts, setEmergencyContacts] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const criticalSensors = lpgSensors.filter(s => s.status === "critical").length
  const warningSensors = lpgSensors.filter(s => s.status === "warning").length
  const inactiveAlarms = fireAlarms.filter(a => a.status === "maintenance").length

  const getStatusColor = (status: string) => {
    switch (status) {
      case "safe":
      case "active":
        return "text-green-600"
      case "warning":
        return "text-yellow-600"
      case "critical":
        return "text-red-600"
      case "maintenance":
        return "text-orange-600"
      default:
        return "text-gray-600"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "safe":
      case "active":
        return <Badge className="bg-green-500">Safe</Badge>
      case "warning":
        return <Badge className="bg-yellow-500">Warning</Badge>
      case "critical":
        return <Badge className="bg-red-500">Critical</Badge>
      case "maintenance":
        return <Badge className="bg-orange-500">Maintenance</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          Fire & LPG Safety Monitor
        </h1>
        <p className="text-muted-foreground">
          Real-time gas leak detection and fire alarm monitoring system
        </p>
      </div>

      {/* Critical Alerts */}
      {criticalSensors > 0 && (
        <Alert variant="destructive" className="border-2 animate-pulse">
          <AlertTriangle className="h-5 w-5" />
          <AlertTitle className="text-lg font-bold">🚨 EMERGENCY ALERT!</AlertTitle>
          <AlertDescription className="text-base mt-2">
            <div className="space-y-2">
              <p>LPG gas leak detected in Block A - Ground Floor Kitchen!</p>
              <p className="font-semibold">Level: 1850 PPM (Critical - Threshold: 1000 PPM)</p>
              <div className="flex gap-2 mt-3">
                <Button variant="destructive" size="sm">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Emergency (100)
                </Button>
                <Button variant="outline" size="sm">
                  <Bell className="h-4 w-4 mr-2" />
                  Sound Hooter
                </Button>
                <Button variant="outline" size="sm">
                  Acknowledge Alert
                </Button>
              </div>
              <p className="text-sm mt-2">
                ✅ WhatsApp alert sent to Secretary, Warden, and Security Team
              </p>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">LPG Sensors</CardTitle>
            <Wind className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lpgSensors.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {criticalSensors} critical, {warningSensors} warning
            </p>
            <Progress value={((lpgSensors.length - criticalSensors - warningSensors) / lpgSensors.length) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fire Alarms</CardTitle>
            <Flame className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fireAlarms.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {fireAlarms.length - inactiveAlarms} active, {inactiveAlarms} maintenance
            </p>
            <Progress value={((fireAlarms.length - inactiveAlarms) / fireAlarms.length) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {recentAlerts.filter(a => !a.acknowledged).length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {recentAlerts.filter(a => a.severity === "critical").length} critical alerts
            </p>
            <Progress 
              value={recentAlerts.filter(a => a.acknowledged).length / recentAlerts.length * 100} 
              className="mt-2" 
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Status</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Online</div>
            <p className="text-xs text-muted-foreground mt-1">
              Last sync: {currentTime.toLocaleTimeString()}
            </p>
            <Badge className="mt-2 bg-green-500">All Systems Operational</Badge>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="lpg" className="space-y-4">
        <TabsList>
          <TabsTrigger value="lpg">LPG Sensors</TabsTrigger>
          <TabsTrigger value="fire">Fire Alarms</TabsTrigger>
          <TabsTrigger value="alerts">Alert History</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* LPG Sensors Tab */}
        <TabsContent value="lpg" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {lpgSensors.map((sensor) => (
              <Card key={sensor.id} className={sensor.status === "critical" ? "border-red-500 border-2" : ""}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base flex items-center gap-2">
                        <Wind className="h-4 w-4" />
                        {sensor.location}
                      </CardTitle>
                      <CardDescription>{sensor.id}</CardDescription>
                    </div>
                    {getStatusBadge(sensor.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Gas Level</span>
                      <span className={`font-bold ${getStatusColor(sensor.status)}`}>
                        {sensor.gasLevel} PPM
                      </span>
                    </div>
                    <Progress 
                      value={(sensor.gasLevel / sensor.threshold) * 100} 
                      className={sensor.status === "critical" ? "bg-red-100" : ""}
                    />
                    <p className="text-xs text-muted-foreground">
                      Threshold: {sensor.threshold} PPM
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Thermometer className="h-3 w-3" />
                        <span>Temperature</span>
                      </div>
                      <p className="font-semibold">{sensor.temperature}°C</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Radio className="h-3 w-3" />
                        <span>Battery</span>
                      </div>
                      <p className="font-semibold">{sensor.battery}%</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="text-xs text-muted-foreground">
                      Last check: {sensor.lastCheck}
                    </span>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>

                  {sensor.status === "critical" && (
                    <Alert variant="destructive">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription className="text-xs">
                        Gas levels critically high! Evacuate area immediately!
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Gas Level Trend */}
          <Card>
            <CardHeader>
              <CardTitle>24-Hour Gas Level Trends</CardTitle>
              <CardDescription>
                LPG concentration levels (PPM) across all monitored locations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  hostel: {
                    label: "Hostel Mess",
                    color: "hsl(var(--chart-1))",
                  },
                  blockA: {
                    label: "Block A Kitchen",
                    color: "hsl(var(--chart-2))",
                  },
                  canteen: {
                    label: "Canteen",
                    color: "hsl(var(--chart-3))",
                  },
                }}
                className="h-[300px]"
              >
                <LineChart data={gasReadings}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="hostel" 
                    stroke="var(--color-hostel)" 
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="blockA" 
                    stroke="var(--color-blockA)" 
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="canteen" 
                    stroke="var(--color-canteen)" 
                    strokeWidth={2}
                  />
                  {/* Threshold line */}
                  <Line 
                    type="monotone" 
                    dataKey={() => 1000} 
                    stroke="#ef4444" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Danger Threshold"
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Fire Alarms Tab */}
        <TabsContent value="fire" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {fireAlarms.map((alarm) => (
              <Card key={alarm.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base flex items-center gap-2">
                        <Flame className="h-4 w-4" />
                        {alarm.location}
                      </CardTitle>
                      <CardDescription>{alarm.type}</CardDescription>
                    </div>
                    {getStatusBadge(alarm.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Battery Level</div>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress value={alarm.battery} className="flex-1" />
                        <span className="font-semibold">{alarm.battery}%</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Last Tested</div>
                      <p className="font-semibold mt-1">{alarm.lastTest}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Radio className="h-4 w-4 mr-2" />
                      Test Alarm
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      View Logs
                    </Button>
                  </div>

                  {alarm.status === "maintenance" && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription className="text-xs">
                        Requires maintenance - battery low or device offline
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Alert History Tab */}
        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Alerts & Incidents</CardTitle>
              <CardDescription>
                Complete history of safety alerts and responses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAlerts.map((alert) => (
                  <div key={alert.id} className="flex gap-4 p-4 border rounded-lg">
                    <div className={`p-2 rounded-full h-fit ${
                      alert.severity === "critical" ? "bg-red-100" : "bg-yellow-100"
                    }`}>
                      {alert.type === "gas" ? (
                        <Wind className={`h-5 w-5 ${
                          alert.severity === "critical" ? "text-red-600" : "text-yellow-600"
                        }`} />
                      ) : (
                        <Flame className={`h-5 w-5 ${
                          alert.severity === "critical" ? "text-red-600" : "text-yellow-600"
                        }`} />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">{alert.message}</h4>
                            {alert.acknowledged && (
                              <Badge variant="outline" className="text-xs">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Acknowledged
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            <MapPin className="h-3 w-3 inline mr-1" />
                            {alert.location}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {alert.time}
                          </p>
                        </div>
                        <Badge variant={alert.severity === "critical" ? "destructive" : "default"}>
                          {alert.severity}
                        </Badge>
                      </div>
                      {alert.whatsappSent && (
                        <div className="mt-2 text-xs text-green-600 flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          WhatsApp alert sent to emergency contacts
                        </div>
                      )}
                      {!alert.acknowledged && (
                        <Button size="sm" variant="outline" className="mt-2">
                          Acknowledge Alert
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Alert Configuration</CardTitle>
              <CardDescription>
                Configure automatic alerts and emergency response settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-alerts">Automatic Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically trigger alerts when thresholds are exceeded
                  </p>
                </div>
                <Switch
                  id="auto-alerts"
                  checked={autoAlerts}
                  onCheckedChange={setAutoAlerts}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="whatsapp">WhatsApp Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Send critical alerts via WhatsApp to emergency contacts
                  </p>
                </div>
                <Switch
                  id="whatsapp"
                  checked={whatsappAlerts}
                  onCheckedChange={setWhatsappAlerts}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="emergency">Emergency Auto-Dial</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically call fire department for critical incidents
                  </p>
                </div>
                <Switch
                  id="emergency"
                  checked={emergencyContacts}
                  onCheckedChange={setEmergencyContacts}
                />
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-semibold mb-3">Emergency Contacts</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Society Secretary:</span>
                    <span className="font-mono">+91 98765 43210</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hostel Warden:</span>
                    <span className="font-mono">+91 87654 32109</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fire Department:</span>
                    <span className="font-mono">101</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Emergency Services:</span>
                    <span className="font-mono">100</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="mt-3">
                  <Phone className="h-4 w-4 mr-2" />
                  Manage Contacts
                </Button>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-semibold mb-3">Threshold Settings</h4>
                <div className="space-y-4">
                  <div>
                    <Label>LPG Critical Level (PPM)</Label>
                    <div className="flex items-center gap-4 mt-2">
                      <input
                        type="number"
                        defaultValue={1000}
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                      />
                      <Badge variant="outline">Default: 1000</Badge>
                    </div>
                  </div>
                  <div>
                    <Label>Fire Alarm Test Interval (days)</Label>
                    <div className="flex items-center gap-4 mt-2">
                      <input
                        type="number"
                        defaultValue={7}
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                      />
                      <Badge variant="outline">Default: 7</Badge>
                    </div>
                  </div>
                </div>
              </div>

              <Button className="w-full">
                Save Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
