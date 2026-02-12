"use client"

import { useMemo, useState } from "react"
import { useTheme } from "next-themes"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { Separator } from "@/components/ui/separator"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { 
  Settings as SettingsIcon,
  Building2,
  Bell,
  Shield,
  Database,
  Wifi,
  Save,
  RefreshCw,
  Sparkles,
  ShieldCheck,
  TestTubes,
  ArrowUpRight
} from "lucide-react"

type FormState = {
  societyName: string
  adminName: string
  address: string
  contact: string
}

export default function SettingsPage() {
  const { toast } = useToast()
  const { theme, setTheme } = useTheme()
  const [form, setForm] = useState<FormState>({
    societyName: "Green Valley Society",
    adminName: "Admin Sharma",
    address: "Sector 21, Pune",
    contact: "+91 98765 43210",
  })
  const [syncing, setSyncing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [accentColor, setAccentColor] = useState("blue")

  const onlineDevices = useMemo(() => 18, [])

  // Theme usage data for visualization
  const themeUsageData = [
    { name: "Light", users: 45, fill: "hsl(var(--chart-1))" },
    { name: "Dark", users: 128, fill: "hsl(var(--chart-2))" },
    { name: "System", users: 67, fill: "hsl(var(--chart-3))" },
  ]

  const moduleActivityData = [
    { module: "Water", sessions: 89 },
    { module: "Security", sessions: 124 },
    { module: "Energy", sessions: 76 },
    { module: "CCTV", sessions: 102 },
    { module: "Residents", sessions: 58 },
  ]

  const handleSave = () => {
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      toast({
        title: "Changes saved",
        description: "Settings updated successfully and replicated across modules.",
      })
    }, 600)
  }

  const handleSyncDevices = () => {
    setSyncing(true)
    setTimeout(() => {
      setSyncing(false)
      toast({
        title: "Device sync complete",
        description: "ESP32, MQ-6, and lighting nodes are online.",
      })
    }, 900)
  }

  const sendTestNotification = () => {
    toast({
      title: "Test notification sent",
      description: "WhatsApp + SMS hooks triggered successfully.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
          <SettingsIcon className="h-7 w-7" />
          System Settings
        </h1>
        <p className="text-muted-foreground">
          Configure your Rakshak smart infrastructure management system
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="iot">IoT Devices</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="ai">AI Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Society Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="society-name">Society Name</Label>
                  <Input
                    id="society-name"
                    value={form.societyName}
                    onChange={(e) => setForm((p) => ({ ...p, societyName: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-name">Admin Name</Label>
                  <Input
                    id="admin-name"
                    value={form.adminName}
                    onChange={(e) => setForm((p) => ({ ...p, adminName: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={form.address}
                    onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact">Contact Number</Label>
                  <Input
                    id="contact"
                    value={form.contact}
                    onChange={(e) => setForm((p) => ({ ...p, contact: e.target.value }))}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-green-600" />
                  <span>Config replicated across modules</span>
                </div>
                <Button onClick={handleSave} disabled={saving}>
                  <Save className="h-4 w-4 mr-2" />
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Theme & Accent
              </CardTitle>
              <CardDescription>Choose how Rakshak looks for your team</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <Label>Theme mode</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {["light", "dark", "system"].map((mode) => (
                      <Button
                        key={mode}
                        variant={theme === mode ? "default" : "outline"}
                        onClick={() => {
                          setTheme(mode)
                          toast({
                            title: "Theme updated",
                            description: `Switched to ${mode} mode`,
                          })
                        }}
                      >
                        {mode.charAt(0).toUpperCase() + mode.slice(1)}
                      </Button>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    System matches your OS preference automatically.
                  </p>
                </div>

                <div className="space-y-3">
                  <Label>Accent color</Label>
                  <div className="flex flex-wrap gap-2">
                    {["blue", "emerald", "amber", "violet", "rose"].map((color) => (
                      <button
                        key={color}
                        onClick={() => setAccentColor(color)}
                        className={`h-9 w-9 rounded-full border-2 transition ${
                          accentColor === color ? "border-primary shadow" : "border-border"
                        } bg-gradient-to-br ${
                          color === "blue" ? "from-sky-500 to-blue-600" :
                          color === "emerald" ? "from-emerald-400 to-emerald-600" :
                          color === "amber" ? "from-amber-400 to-amber-600" :
                          color === "violet" ? "from-violet-400 to-violet-600" :
                          "from-rose-400 to-rose-600"
                        }`}
                        aria-label={`Select ${color} accent`}
                        type="button"
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Applies to buttons, badges, and highlights.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="text-sm text-muted-foreground flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-green-600" />
                  Live preview enabled (no page reload).
                </div>
                <Button
                  onClick={() =>
                    toast({
                      title: "Theme Updated",
                      description: `Mode: ${theme || 'system'}, Accent: ${accentColor}. Changes applied automatically.`,
                    })
                  }
                >
                  <Save className="h-4 w-4 mr-2" />
                  Apply Theme
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Theme Usage Analytics */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Theme Preference Distribution</CardTitle>
                <CardDescription>User preference across society members</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    users: {
                      label: "Users",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[200px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={themeUsageData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={60}
                        fill="hsl(var(--chart-1))"
                        dataKey="users"
                      >
                        {themeUsageData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Module Activity</CardTitle>
                <CardDescription>Sessions per module this week</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    sessions: {
                      label: "Sessions",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[200px]"
                >
                  <BarChart data={moduleActivityData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                    <XAxis 
                      dataKey="module" 
                      className="text-xs"
                      tick={{ fontSize: 11 }}
                    />
                    <YAxis 
                      className="text-xs"
                      tick={{ fontSize: 11 }}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="sessions" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="iot" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wifi className="h-5 w-5" />
                IoT Device Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Water Level Sensors (ESP32)</Label>
                    <p className="text-sm text-muted-foreground">Ultrasonic sensors for tank monitoring</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>LPG Gas Sensors (MQ-6)</Label>
                    <p className="text-sm text-muted-foreground">Gas leak detection modules</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Smart Lighting (ESP32)</Label>
                    <p className="text-sm text-muted-foreground">Motion-based automatic lighting</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground flex items-center gap-2">
                  <Wifi className="h-4 w-4 text-green-600" />
                  {onlineDevices} devices online
                </div>
                <Button onClick={handleSyncDevices} disabled={syncing}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  {syncing ? "Syncing..." : "Sync All Devices"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Alert Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>WhatsApp Notifications</Label>
                    <p className="text-sm text-muted-foreground">Send alerts via WhatsApp Business API</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>SMS Alerts</Label>
                    <p className="text-sm text-muted-foreground">Backup notification via Twilio</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Reports</Label>
                    <p className="text-sm text-muted-foreground">Daily summary emails</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-blue-600" />
                  Alert automation rules active
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={sendTestNotification}>
                    <TestTubes className="h-4 w-4 mr-2" />
                    Test Notification
                  </Button>
                  <Button size="sm" onClick={() => toast({ title: "Alert rules saved" })}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Alert Rules
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                AI & Machine Learning
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>YOLOv8 Object Detection</Label>
                    <p className="text-sm text-muted-foreground">Real-time video analysis for security</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Sahayak AI Assistant</Label>
                    <p className="text-sm text-muted-foreground">Llama 3 powered chatbot</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Predictive Maintenance</Label>
                    <p className="text-sm text-muted-foreground">ML-based failure prediction</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="border-dashed">
        <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <img
                src="/ved-industries-logo.png"
                alt="Ved Industries logo"
                className="h-10 w-10 rounded-full border border-muted bg-card object-contain"
                loading="lazy"
              />
              <div>
                <CardTitle className="text-base">Powered by Ved Industries</CardTitle>
                <CardDescription className="text-sm">
                  Designed by Vedant Zope | Supporting Swachh Bharat & Smart Cities
                </CardDescription>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <Shield className="h-3 w-3" />
              Made in India
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              Swachh Bharat Ready
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <ArrowUpRight className="h-3 w-3" />
              Smart Cities Mission
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Keep your civic infrastructure resilient and sustainable with Rakshak, proudly engineered with
          Ved Industries. Drop your official logo at public/ved-industries-logo.png to display branding here.
        </CardContent>
      </Card>
    </div>
  )
}
