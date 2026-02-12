"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, XAxis, YAxis, CartesianGrid, Line, LineChart, Bar, BarChart } from "recharts"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { puneSmartCityData } from "@/lib/pune-data"
import { 
  Droplets, 
  Power, 
  AlertTriangle, 
  TrendingDown,
  Waves,
  Timer,
  Settings,
  History,
  Plus,
  Download
} from "lucide-react"

export default function WaterPage() {
  const { toast } = useToast()
  const [autoMode, setAutoMode] = useState(true)
  const [selectedArea, setSelectedArea] = useState("All Areas")
  const [newComplaint, setNewComplaint] = useState({ area: "", description: "", priority: "Medium" })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleAutoModeChange = (checked: boolean) => {
    setAutoMode(checked)
    toast({
      title: checked ? "Auto Mode Enabled" : "Manual Mode Enabled",
      description: checked 
        ? "Water distribution will be managed automatically"
        : "You can now manually control water distribution",
    })
  }

  const handleReportIssue = () => {
    if (!newComplaint.area || !newComplaint.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }
    toast({
      title: "Issue Reported",
      description: `Water issue in ${newComplaint.area} has been logged for immediate attention.`,
    })
    setNewComplaint({ area: "", description: "", priority: "Medium" })
    setIsDialogOpen(false)
  }

  const exportReport = () => {
    toast({
      title: "Report Generated",
      description: "Water consumption report has been downloaded.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pune Water Management</h1>
          <p className="text-muted-foreground mt-2">
            Daily Supply: {puneSmartCityData.water.dailySupply} | Total Pipelines: {puneSmartCityData.water.distribution.pipelines}
          </p>
        </div>
        <div className="flex gap-3">
          <Button onClick={exportReport} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Report Issue
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Report Water Issue</DialogTitle>
                <DialogDescription>
                  Submit a water-related complaint or issue
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Area</Label>
                  <Select value={newComplaint.area} onValueChange={(v) => setNewComplaint({...newComplaint, area: v})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select area" />
                    </SelectTrigger>
                    <SelectContent>
                      {puneSmartCityData.areas.map((area) => (
                        <SelectItem key={area.id} value={area.name}>{area.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Description</Label>
                  <Input 
                    value={newComplaint.description}
                    onChange={(e) => setNewComplaint({...newComplaint, description: e.target.value})}
                    placeholder="Describe the issue..."
                  />
                </div>
                <div>
                  <Label>Priority</Label>
                  <Select value={newComplaint.priority} onValueChange={(v) => setNewComplaint({...newComplaint, priority: v})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleReportIssue}>Submit Report</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Treatment Capacity</CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{puneSmartCityData.water.treatment.capacity}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {puneSmartCityData.water.treatment.plants.length} operational plants
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Connections</CardTitle>
            <Waves className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{puneSmartCityData.water.distribution.connections}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {puneSmartCityData.water.distribution.smartMeters} smart meters
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pipeline Network</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{puneSmartCityData.water.distribution.pipelines}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Total distribution network
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Leakage Reduction</CardTitle>
            <TrendingDown className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{puneSmartCityData.water.distribution.leakageReduction}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Improved efficiency
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="sources" className="space-y-4">
        <TabsList>
          <TabsTrigger value="sources">Water Sources</TabsTrigger>
          <TabsTrigger value="treatment">Treatment Plants</TabsTrigger>
          <TabsTrigger value="consumption">Area-wise Consumption</TabsTrigger>
          <TabsTrigger value="control">Control Panel</TabsTrigger>
        </TabsList>

        <TabsContent value="sources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Water Sources</CardTitle>
              <CardDescription>Major water sources for Pune city</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {puneSmartCityData.water.sources.map((source, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Waves className="h-8 w-8 text-blue-600" />
                      <div>
                        <p className="font-medium">{source}</p>
                        <p className="text-sm text-muted-foreground">Active Source</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700">Operational</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="treatment" className="space-y-4">
          <div className="grid gap-4">
            {puneSmartCityData.water.treatment.plants.map((plant, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{plant.name}</CardTitle>
                      <CardDescription>Treatment Capacity: {plant.capacity}</CardDescription>
                    </div>
                    <Badge className={plant.status === "Operational" ? "bg-green-600" : "bg-yellow-600"}>
                      {plant.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Operational Status</span>
                      <span className="font-medium">100%</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="consumption" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Area-wise Water Consumption</CardTitle>
              <CardDescription>Daily consumption, quality, and pressure metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {puneSmartCityData.water.consumption.map((area, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{area.area}</span>
                      <span className="text-sm text-muted-foreground">{area.usage} MLD</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Quality</p>
                        <div className="flex items-center gap-2">
                          <Progress value={area.quality} className="h-2" />
                          <span className="font-medium">{area.quality}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Pressure</p>
                        <div className="flex items-center gap-2">
                          <Progress value={area.pressure} className="h-2" />
                          <span className="font-medium">{area.pressure}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Usage</p>
                        <div className="flex items-center gap-2">
                          <Progress value={(area.usage / 60) * 100} className="h-2" />
                          <span className="font-medium">{area.usage} MLD</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="control" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Water Distribution Control</CardTitle>
              <CardDescription>Manage water supply and distribution settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Auto Distribution Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically manage water distribution based on demand
                  </p>
                </div>
                <Switch checked={autoMode} onCheckedChange={handleAutoModeChange} />
              </div>

              <div className="space-y-4">
                <Label>Select Area for Manual Control</Label>
                <Select value={selectedArea} onValueChange={setSelectedArea} disabled={autoMode}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Areas">All Areas</SelectItem>
                    {puneSmartCityData.areas.map((area) => (
                      <SelectItem key={area.id} value={area.name}>{area.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {!autoMode && (
                <div className="grid gap-4 md:grid-cols-2">
                  <Button variant="outline" className="w-full" onClick={() => toast({ title: "Supply Started", description: `Water supply started for ${selectedArea}` })}>
                    <Power className="mr-2 h-4 w-4" />
                    Start Supply
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => toast({ title: "Supply Stopped", description: `Water supply stopped for ${selectedArea}` })}>
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Stop Supply
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
