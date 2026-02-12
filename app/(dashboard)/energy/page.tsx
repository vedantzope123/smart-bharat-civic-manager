"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Line, LineChart, Area, AreaChart, Pie, PieChart, Cell } from "recharts"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { puneSmartCityData } from "@/lib/pune-data"
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
  IndianRupee,
  Plus,
  Download,
  Wind
} from "lucide-react"

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export default function EnergyPage() {
  const { toast } = useToast()
  const [autoMode, setAutoMode] = useState(true)
  const [selectedArea, setSelectedArea] = useState("All Areas")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newComplaint, setNewComplaint] = useState({ area: "", description: "", type: "Power Outage" })

  const energyDistribution = [
    { name: 'Grid Power', value: 65, color: '#3b82f6' },
    { name: 'Solar', value: 20, color: '#eab308' },
    { name: 'Wind', value: 10, color: '#10b981' },
    { name: 'Others', value: 5, color: '#6366f1' },
  ]

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
      description: `Energy issue in ${newComplaint.area} has been logged.`,
    })
    setNewComplaint({ area: "", description: "", type: "Power Outage" })
    setIsDialogOpen(false)
  }

  const exportReport = () => {
    toast({
      title: "Report Generated",
      description: "Energy consumption report has been downloaded.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pune Energy Management</h1>
          <p className="text-muted-foreground mt-2">
            Total Capacity: {puneSmartCityData.energy.capacity} | Smart Meters: {puneSmartCityData.energy.smartMeters}
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
                <DialogTitle>Report Energy Issue</DialogTitle>
                <DialogDescription>
                  Submit an energy-related complaint or issue
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
                  <Label>Issue Type</Label>
                  <Select value={newComplaint.type} onValueChange={(v) => setNewComplaint({...newComplaint, type: v})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Power Outage">Power Outage</SelectItem>
                      <SelectItem value="Voltage Fluctuation">Voltage Fluctuation</SelectItem>
                      <SelectItem value="Street Light">Street Light Issue</SelectItem>
                      <SelectItem value="Meter Problem">Meter Problem</SelectItem>
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
            <CardTitle className="text-sm font-medium">Total Capacity</CardTitle>
            <Zap className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{puneSmartCityData.energy.capacity}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Grid, Solar & Wind Combined
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Smart Meters</CardTitle>
            <Gauge className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{puneSmartCityData.energy.smartMeters}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Active installations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Street Lights</CardTitle>
            <Lightbulb className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{puneSmartCityData.energy.streetLights.total}</div>
            <p className="text-xs text-muted-foreground mt-1">
              LED lighting systems
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Renewable %</CardTitle>
            <Sun className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">30%</div>
            <p className="text-xs text-muted-foreground mt-1">
              Solar + Wind contribution
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="sources" className="space-y-4">
        <TabsList>
          <TabsTrigger value="sources">Energy Sources</TabsTrigger>
          <TabsTrigger value="solar">Solar Projects</TabsTrigger>
          <TabsTrigger value="consumption">Consumption</TabsTrigger>
          <TabsTrigger value="streetlights">Street Lights</TabsTrigger>
        </TabsList>

        <TabsContent value="sources" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Energy Distribution</CardTitle>
                <CardDescription>Source-wise power distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {energyDistribution.map((source, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{source.name}</span>
                        <span className="text-sm text-muted-foreground">{source.value}%</span>
                      </div>
                      <Progress value={source.value} className="h-2" style={{ '--progress-background': source.color } as React.CSSProperties} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Power Sources Breakdown</CardTitle>
                <CardDescription>Distribution by type</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="space-y-2">
                  {Object.entries(puneSmartCityData.energy.sources).map(([key, value], idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div className={`w-4 h-4 rounded ${key === 'grid' ? 'bg-blue-500' : key === 'solar' ? 'bg-yellow-500' : key === 'wind' ? 'bg-green-500' : 'bg-purple-500'}`}></div>
                      <span className="text-sm capitalize">{key}: <strong>{value}</strong></span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="solar" className="space-y-4">
          <div className="grid gap-4">
            {puneSmartCityData.energy.solarProjects.map((project, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{project.name}</CardTitle>
                      <CardDescription>Capacity: {project.capacity}</CardDescription>
                    </div>
                    <Badge className="bg-green-600">
                      {project.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Location: {project.location}</span>
                      <span className="font-medium">Annual Generation: {project.annualGeneration}</span>
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
              <CardTitle>Area-wise Energy Consumption</CardTitle>
              <CardDescription>Real-time consumption monitoring</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {puneSmartCityData.energy.consumption.map((area, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{area.area}</span>
                      <span className="text-sm text-muted-foreground">{area.usage} MW</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Peak Demand</p>
                        <div className="flex items-center gap-2">
                          <Progress value={(area.peakDemand / 100) * 100} className="h-2" />
                          <span className="font-medium">{area.peakDemand} MW</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Efficiency</p>
                        <div className="flex items-center gap-2">
                          <Progress value={area.efficiency} className="h-2" />
                          <span className="font-medium">{area.efficiency}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="streetlights" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Smart Street Lighting System</CardTitle>
                  <CardDescription>{puneSmartCityData.energy.streetLights.total} LED lights across the city</CardDescription>
                </div>
                <Switch checked={autoMode} onCheckedChange={setAutoMode} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 border rounded-lg">
                    <Lightbulb className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
                    <p className="text-2xl font-bold">{puneSmartCityData.energy.streetLights}</p>
                    <p className="text-sm text-muted-foreground">Total Lights</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <Zap className="h-8 w-8 mx-auto mb-2 text-green-600" />
                    <p className="text-2xl font-bold">78%</p>
                    <p className="text-sm text-muted-foreground">Energy Saved</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <IndianRupee className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                    <p className="text-2xl font-bold">₹45 Cr</p>
                    <p className="text-sm text-muted-foreground">Annual Savings</p>
                  </div>
                </div>
                
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">Smart Features</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-green-600" />
                      Motion-sensing adaptive brightness
                    </li>
                    <li className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-600" />
                      Automated sunset-to-sunrise operation
                    </li>
                    <li className="flex items-center gap-2">
                      <Gauge className="h-4 w-4 text-yellow-600" />
                      Real-time fault detection and reporting
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
