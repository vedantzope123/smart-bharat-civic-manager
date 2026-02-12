"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { 
  Bell,
  AlertTriangle,
  CheckCircle,
  MessageSquare,
  Phone,
  Mail,
  Filter,
  Search,
  Settings,
  Clock,
  MapPin,
  Flame,
  Droplets,
  Zap,
  Camera,
  Trash2,
  Shield
} from "lucide-react"

// Alert types and data
const alerts = [
  {
    id: "ALT-001",
    type: "critical",
    category: "Fire & Safety",
    icon: Flame,
    title: "LPG Gas Leak Detected!",
    message: "Critical gas levels detected in Block A Kitchen (1850 PPM). Immediate evacuation required!",
    location: "Block A - Ground Floor Kitchen",
    timestamp: "30 seconds ago",
    status: "active",
    whatsappSent: true,
    smsSent: true,
    callMade: false,
    recipients: ["Secretary", "Warden", "Security Team"],
    actionTaken: null
  },
  {
    id: "ALT-002",
    type: "warning",
    category: "Water",
    icon: Droplets,
    title: "Water Tank Level Low",
    message: "Tank B water level has dropped to 25%. Pump has been automatically activated.",
    location: "Block 2 - Overhead Tank B",
    timestamp: "15 minutes ago",
    status: "active",
    whatsappSent: true,
    smsSent: false,
    callMade: false,
    recipients: ["Maintenance Staff"],
    actionTaken: "Pump Auto-Started"
  },
  {
    id: "ALT-003",
    type: "critical",
    category: "Security",
    icon: Shield,
    title: "Anti-Ragging Alert",
    message: "Suspicious gathering detected in secluded hostel corridor. Multiple persons detected.",
    location: "Hostel Block - 3rd Floor Corridor",
    timestamp: "3 minutes ago",
    status: "acknowledged",
    whatsappSent: true,
    smsSent: true,
    callMade: true,
    recipients: ["Hostel Warden", "Security", "Campus Admin"],
    actionTaken: "Security Dispatched"
  },
  {
    id: "ALT-004",
    type: "warning",
    category: "Energy",
    icon: Zap,
    title: "High Power Consumption",
    message: "Block C power usage exceeded threshold (450 kWh). Possible equipment malfunction.",
    location: "Block C - Main Distribution",
    timestamp: "1 hour ago",
    status: "resolved",
    whatsappSent: true,
    smsSent: false,
    callMade: false,
    recipients: ["Maintenance Team"],
    actionTaken: "Issue Resolved - AC Unit Switched Off"
  },
  {
    id: "ALT-005",
    type: "info",
    category: "Waste",
    icon: Trash2,
    title: "Waste Bin Overflowing",
    message: "AI detected overflowing garbage bin. Cleaning ticket auto-raised.",
    location: "Block A - Corridor 1",
    timestamp: "2 hours ago",
    status: "acknowledged",
    whatsappSent: false,
    smsSent: false,
    callMade: false,
    recipients: ["Cleaning Staff A"],
    actionTaken: "Ticket TKT-001 Raised"
  },
  {
    id: "ALT-006",
    type: "warning",
    category: "Security",
    icon: Camera,
    title: "Stray Animal Detection",
    message: "Stray dog detected entering premises through garden area.",
    location: "Garden Area - Near Main Gate",
    timestamp: "3 hours ago",
    status: "resolved",
    whatsappSent: true,
    smsSent: false,
    callMade: false,
    recipients: ["Security Guards"],
    actionTaken: "Animal Removed from Premises"
  },
]

export default function AlertsPage() {
  const [whatsappEnabled, setWhatsappEnabled] = useState(true)
  const [smsEnabled, setSmsEnabled] = useState(true)
  const [emailEnabled, setEmailEnabled] = useState(true)
  const [autoCallEnabled, setAutoCallEnabled] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState<"all" | "critical" | "warning" | "info">("all")
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "acknowledged" | "resolved">("all")

  const criticalAlerts = alerts.filter(a => a.type === "critical" && a.status === "active").length
  const activeAlerts = alerts.filter(a => a.status === "active").length
  const whatsappSentToday = alerts.filter(a => a.whatsappSent).length

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         alert.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         alert.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === "all" || alert.type === filterType
    const matchesStatus = filterStatus === "all" || alert.status === filterStatus
    return matchesSearch && matchesType && matchesStatus
  })

  const getAlertTypeColor = (type: string) => {
    switch (type) {
      case "critical": return "bg-red-500"
      case "warning": return "bg-yellow-500"
      case "info": return "bg-blue-500"
      default: return "bg-gray-500"
    }
  }

  const getAlertStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="destructive" className="animate-pulse">Active</Badge>
      case "acknowledged":
        return <Badge variant="default">Acknowledged</Badge>
      case "resolved":
        return <Badge variant="outline">Resolved</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
          <Bell className="h-7 w-7" />
          Alerts & Notifications Center
        </h1>
        <p className="text-muted-foreground">
          Real-time alerts with WhatsApp, SMS, and voice call integration
        </p>
      </div>

      {/* Critical Alert Banner */}
      {criticalAlerts > 0 && (
        <Alert variant="destructive" className="border-2 animate-pulse">
          <AlertTriangle className="h-5 w-5" />
          <AlertTitle className="text-lg font-bold">🚨 {criticalAlerts} CRITICAL ALERT(S) ACTIVE!</AlertTitle>
          <AlertDescription className="text-base mt-2">
            <div className="space-y-1">
              {alerts.filter(a => a.type === "critical" && a.status === "active").map(alert => (
                <p key={alert.id}>• {alert.title} - {alert.location}</p>
              ))}
            </div>
            <Button variant="destructive" size="sm" className="mt-3">
              View All Critical Alerts
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{activeAlerts}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {criticalAlerts} critical
            </p>
            <Badge className="mt-2 bg-red-500">{criticalAlerts} need immediate action</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">WhatsApp Sent</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{whatsappSentToday}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Notifications sent today
            </p>
            <div className="flex items-center gap-1 mt-2 text-xs text-green-600">
              <CheckCircle className="h-3 w-3" />
              Integration active
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SMS Alerts</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{alerts.filter(a => a.smsSent).length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Via Twilio gateway
            </p>
            <Badge className="mt-2" variant="outline">Backup channel</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">2.3m</div>
            <p className="text-xs text-muted-foreground mt-1">
              Average acknowledgment time
            </p>
            <div className="flex items-center gap-1 mt-2 text-xs text-green-600">
              <CheckCircle className="h-3 w-3" />
              Excellent performance
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Alerts List */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>All Alerts</CardTitle>
                <CardDescription>Real-time monitoring and notification history</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search and Filters */}
            <div className="space-y-3">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search alerts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex gap-2">
                <div className="flex gap-1">
                  {["all", "critical", "warning", "info"].map((type) => (
                    <Button
                      key={type}
                      variant={filterType === type ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilterType(type as any)}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </Button>
                  ))}
                </div>
                <div className="flex gap-1">
                  {["all", "active", "acknowledged", "resolved"].map((status) => (
                    <Button
                      key={status}
                      variant={filterStatus === status ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilterStatus(status as any)}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Alerts Feed */}
            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-4">
                {filteredAlerts.map((alert) => {
                  const IconComponent = alert.icon
                  return (
                    <div key={alert.id} className={`p-4 border-l-4 rounded-lg border ${
                      alert.type === "critical" ? "border-l-red-500 bg-red-50" :
                      alert.type === "warning" ? "border-l-yellow-500 bg-yellow-50" :
                      "border-l-blue-500 bg-blue-50"
                    }`}>
                      <div className="flex gap-4">
                        <div className={`h-10 w-10 rounded-full ${
                          alert.type === "critical" ? "bg-red-100" :
                          alert.type === "warning" ? "bg-yellow-100" :
                          "bg-blue-100"
                        } flex items-center justify-center`}>
                          <IconComponent className={`h-5 w-5 ${
                            alert.type === "critical" ? "text-red-600" :
                            alert.type === "warning" ? "text-yellow-600" :
                            "text-blue-600"
                          }`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold">{alert.title}</h4>
                                {getAlertStatusBadge(alert.status)}
                              </div>
                              <p className="text-sm mt-1">{alert.message}</p>
                              <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {alert.location}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {alert.timestamp}
                                </span>
                                <Badge variant="outline" className="text-xs">
                                  {alert.category}
                                </Badge>
                              </div>
                            </div>
                          </div>

                          {/* Notification Status */}
                          <div className="mt-3 flex items-center gap-3 text-xs">
                            {alert.whatsappSent && (
                              <div className="flex items-center gap-1 text-green-600">
                                <MessageSquare className="h-3 w-3" />
                                <span>WhatsApp sent</span>
                              </div>
                            )}
                            {alert.smsSent && (
                              <div className="flex items-center gap-1 text-blue-600">
                                <Phone className="h-3 w-3" />
                                <span>SMS sent</span>
                              </div>
                            )}
                            {alert.callMade && (
                              <div className="flex items-center gap-1 text-red-600">
                                <Phone className="h-3 w-3" />
                                <span>Call made</span>
                              </div>
                            )}
                          </div>

                          {/* Recipients */}
                          <div className="mt-2 text-xs">
                            <span className="text-muted-foreground">Notified: </span>
                            {alert.recipients.join(", ")}
                          </div>

                          {/* Action Taken */}
                          {alert.actionTaken && (
                            <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded text-xs text-green-800">
                              <CheckCircle className="h-3 w-3 inline mr-1" />
                              Action: {alert.actionTaken}
                            </div>
                          )}

                          {/* Actions */}
                          {alert.status === "active" && (
                            <div className="flex gap-2 mt-3">
                              <Button size="sm" variant="outline">
                                Acknowledge
                              </Button>
                              <Button size="sm" variant="outline">
                                <Phone className="h-3 w-3 mr-1" />
                                Call
                              </Button>
                              <Button size="sm">
                                Mark Resolved
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Settings Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="whatsapp">WhatsApp Alerts</Label>
                  <p className="text-xs text-muted-foreground">
                    Send alerts via WhatsApp Business API
                  </p>
                </div>
                <Switch
                  id="whatsapp"
                  checked={whatsappEnabled}
                  onCheckedChange={setWhatsappEnabled}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sms">SMS Notifications</Label>
                  <p className="text-xs text-muted-foreground">
                    Backup alerts via Twilio SMS
                  </p>
                </div>
                <Switch
                  id="sms"
                  checked={smsEnabled}
                  onCheckedChange={setSmsEnabled}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email">Email Alerts</Label>
                  <p className="text-xs text-muted-foreground">
                    Send detailed reports via email
                  </p>
                </div>
                <Switch
                  id="email"
                  checked={emailEnabled}
                  onCheckedChange={setEmailEnabled}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="autocall">Auto Emergency Call</Label>
                  <p className="text-xs text-muted-foreground">
                    Auto-dial for critical alerts
                  </p>
                </div>
                <Switch
                  id="autocall"
                  checked={autoCallEnabled}
                  onCheckedChange={setAutoCallEnabled}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Emergency Contacts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <div className="font-semibold">Society Secretary</div>
                <div className="text-xs text-muted-foreground">+91 98765 43210</div>
                <div className="flex gap-1 mt-1">
                  <Badge variant="outline" className="text-xs">WhatsApp</Badge>
                  <Badge variant="outline" className="text-xs">SMS</Badge>
                </div>
              </div>
              <div className="border-t pt-3">
                <div className="font-semibold">Hostel Warden</div>
                <div className="text-xs text-muted-foreground">+91 87654 32109</div>
                <div className="flex gap-1 mt-1">
                  <Badge variant="outline" className="text-xs">WhatsApp</Badge>
                  <Badge variant="outline" className="text-xs">Call</Badge>
                </div>
              </div>
              <div className="border-t pt-3">
                <div className="font-semibold">Fire Department</div>
                <div className="text-xs text-muted-foreground">101</div>
                <div className="flex gap-1 mt-1">
                  <Badge className="bg-red-500 text-xs">Emergency</Badge>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-2">
                <Phone className="h-3 w-3 mr-2" />
                Manage Contacts
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Integration Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span>WhatsApp API:</span>
                <Badge className="bg-green-500">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Connected
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Twilio SMS:</span>
                <Badge className="bg-green-500">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Active
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>SMTP Email:</span>
                <Badge className="bg-green-500">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Configured
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
