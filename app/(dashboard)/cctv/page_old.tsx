"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { 
  Camera, 
  Eye,
  AlertTriangle,
  CheckCircle,
  Video,
  Maximize2,
  Grid3X3,
  LayoutGrid,
  Activity,
  Clock,
  Dog,
  Users,
  Trash2,
  Brain,
  Smartphone,
  QrCode,
  Play,
  StopCircle,
  RefreshCw
} from "lucide-react"

// Camera data
const cameras = [
  {
    id: "cam-1",
    name: "Main Gate",
    location: "Entry Point",
    status: "online",
    recording: true,
    aiEnabled: true,
    lastDetection: "Motion - 2 min ago",
  },
  {
    id: "cam-2",
    name: "Parking Lot A",
    location: "Ground Floor",
    status: "online",
    recording: true,
    aiEnabled: true,
    lastDetection: "Vehicle - 5 min ago",
  },
  {
    id: "cam-3",
    name: "Block A Lobby",
    location: "Building A",
    status: "online",
    recording: true,
    aiEnabled: true,
    lastDetection: "Person - 1 min ago",
  },
  {
    id: "cam-4",
    name: "Block B Lobby",
    location: "Building B",
    status: "online",
    recording: true,
    aiEnabled: false,
    lastDetection: null,
  },
  {
    id: "cam-5",
    name: "Garden Area",
    location: "Common Area",
    status: "online",
    recording: true,
    aiEnabled: true,
    lastDetection: "Stray animal - 15 min ago",
  },
  {
    id: "cam-6",
    name: "Back Gate",
    location: "Service Entry",
    status: "online",
    recording: true,
    aiEnabled: true,
    lastDetection: null,
  },
  {
    id: "cam-7",
    name: "Pool Area",
    location: "Amenities",
    status: "maintenance",
    recording: false,
    aiEnabled: false,
    lastDetection: null,
  },
  {
    id: "cam-8",
    name: "Gym Entrance",
    location: "Amenities",
    status: "online",
    recording: true,
    aiEnabled: false,
    lastDetection: null,
  },
  {
    id: "cam-9",
    name: "Hostel Corridor",
    location: "Hostel Block",
    status: "online",
    recording: true,
    aiEnabled: true,
    lastDetection: "Group gathering - 3 min ago",
  },
  {
    id: "cam-10",
    name: "Block C Corridor",
    location: "Building C",
    status: "online",
    recording: true,
    aiEnabled: true,
    lastDetection: "Person - 8 min ago",
  },
  {
    id: "cam-11",
    name: "Basement Parking",
    location: "Underground",
    status: "online",
    recording: true,
    aiEnabled: true,
    lastDetection: "Vehicle - 12 min ago",
  },
  {
    id: "cam-12",
    name: "Children Play Area",
    location: "Common Area",
    status: "online",
    recording: true,
    aiEnabled: true,
    lastDetection: "Multiple persons - 3 min ago",
  },
]

// AI Detection events
const aiDetections = [
  {
    id: 1,
    type: "stray_animal",
    camera: "Garden Area",
    description: "Stray dog detected near Block B entrance",
    time: "15 min ago",
    status: "alerted",
    severity: "low",
    icon: Dog,
  },
  {
    id: 2,
    type: "crowd",
    camera: "Children Play Area",
    description: "Group gathering detected (8+ people)",
    time: "3 min ago",
    status: "monitoring",
    severity: "info",
    icon: Users,
  },
  {
    id: 3,
    type: "garbage",
    camera: "Block C Corridor",
    description: "Garbage bin overflow detected",
    time: "45 min ago",
    status: "ticketed",
    severity: "medium",
    icon: Trash2,
  },
  {
    id: 4,
    type: "suspicious",
    camera: "Parking Lot A",
    description: "Unusual activity - Person lingering near vehicles",
    time: "2 hours ago",
    status: "resolved",
    severity: "high",
    icon: AlertTriangle,
  },
  {
    id: 5,
    type: "stray_animal",
    camera: "Main Gate",
    description: "Stray cow detected blocking entry",
    time: "Yesterday, 6:30 PM",
    status: "resolved",
    severity: "medium",
    icon: Dog,
  },
]

export default function CCTVPage() {
  const { toast } = useToast()
  const [viewMode, setViewMode] = useState<"grid" | "single">("grid")
  const [selectedCamera, setSelectedCamera] = useState<string | null>(null)
  const [mobileDialogOpen, setMobileDialogOpen] = useState(false)
  const [mobileStream, setMobileStream] = useState<MediaStream | null>(null)
  const [isMobileCameraActive, setIsMobileCameraActive] = useState(false)
  const [mobileCamera, setMobileCamera] = useState({
    id: "mobile-cam",
    name: "Mobile Camera",
    location: "Mobile Device",
    status: "offline" as "online" | "offline",
    recording: false,
    aiEnabled: true,
    lastDetection: null,
  })
  const videoRef = useRef<HTMLVideoElement>(null)

  const onlineCameras = cameras.filter(c => c.status === "online").length + (mobileCamera.status === "online" ? 1 : 0)
  const aiEnabledCameras = cameras.filter(c => c.aiEnabled).length + (mobileCamera.aiEnabled ? 1 : 0)
Dialog open={mobileDialogOpen} onOpenChange={setMobileDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="default" size="sm">
                <Smartphone className="h-4 w-4 mr-2" />
                Connect Mobile Camera
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Connect Mobile Camera</DialogTitle>
                <DialogDescription>
                  Use your mobile device camera as an additional CCTV feed
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-3">
                  <Label>Quick Connect (This Device)</Label>
                  <div className="flex gap-2">
                    {!isMobileCameraActive ? (
                      <Button onClick={startMobileCamera} className="flex-1">
                        <Play className="h-4 w-4 mr-2" />
                        Start Camera
                      </Button>
                    ) : (
                      <Button onClick={stopMobileCamera} variant="destructive" className="flex-1">
                        <StopCircle className="h-4 w-4 mr-2" />
                        Stop Camera
                      </Button>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Use the camera on this device directly
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Remote Mobile Connection</Label>
                  <div className="flex flex-col items-center gap-3 p-4 border rounded-lg bg-secondary/30">
                    <div className="h-32 w-32 bg-white rounded-lg flex items-center justify-center">
                      <QrCode className="h-20 w-20 text-gray-800" />
                    </div>
                    <p className="text-xs text-muted-foreground text-center">
                      Scan QR code with your mobile device
                    </p>
                    <Button size="sm" variant="outline" onClick={generateQRCode}>
                      <RefreshCw className="h-3 w-3 mr-2" />
                      Generate New Code
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="camera-name">Camera Name (Optional)</Label>
                  <Input 
                    id="camera-name" 
                    placeholder="e.g., My Mobile Camera"
                    defaultValue="Mobile Camera"
                  />
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          <
  const startMobileCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment" }, // Use back camera
        audio: false 
      })
      
      setMobileStream(stream)
      setIsMobileCameraActive(true)
      setMobileCamera(prev => ({ ...prev, status: "online", recording: true }))
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }

      toast({
        title: "Mobile Camera Connected",
        descr/* Mobile Camera Card */}
            {mobileCamera.status === "online" && (
              <Card 
                className={`bg-card border-border/50 overflow-hidden cursor-pointer transition-all ${
                  selectedCamera === mobileCamera.id ? "ring-2 ring-primary" : ""
                } ${viewMode === "single" && selectedCamera && selectedCamera !== mobileCamera.id ? "hidden" : ""}`}
                onClick={() => setSelectedCamera(selectedCamera === mobileCamera.id ? null : mobileCamera.id)}
              >
                <div className={`relative bg-secondary/50 flex items-center justify-center ${
                  viewMode === "single" && selectedCamera === mobileCamera.id ? "h-[400px]" : "h-[140px]"
                }`}>
                  {isMobileCameraActive && mobileStream ? (
                    <>
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2">
                        <Badge variant="outline" className="bg-destructive/80 text-destructive-foreground border-0 text-xs">
                          <div className="h-1.5 w-1.5 rounded-full bg-destructive-foreground animate-pulse mr-1" />
                          LIVE
                        </Badge>
                      </div>
                      <div className="absolute top-2 right-2">
                        <Badge variant="outline" className="bg-primary/80 text-primary-foreground border-0 text-xs">
                          <Smartphone className="h-3 w-3 mr-1" />
                          MOBILE
                        </Badge>
                      </div>
                      {mobileCamera.aiEnabled && (
                        <div className="absolute top-10 right-2">
                          <Badge variant="outline" className="bg-chart-2/80 text-chart-2-foreground border-0 text-xs">
                            <Brain className="h-3 w-3 mr-1" />
                            AI
                          </Badge>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-muted-foreground text-sm">
                      <Smartphone className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>Connecting...</p>
                    </div>
                  )}
                </div>
                <CardContent className="p-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-sm flex items-center gap-2">
                        {mobileCamera.name}
                        <Badge 
                          variant="outline" 
                          className="bg-primary/10 text-primary border-primary/30 text-xs"
                        >
                          <CheckCircle className="h-2.5 w-2.5 mr-1" />
                          Online
                        </Badge>
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">{mobileCamera.location}</p>
                      {mobileCamera.lastDetection && (
                        <p className="text-xs text-chart-3 mt-1 flex items-center gap-1">
                          <Activity className="h-3 w-3" />
                          {mobileCamera.lastDetection}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Existing Cameras */}
            {iption: "Your mobile camera is now streaming live",
      })
    } catch (error) {
      toast({
        title: "Camera Access Denied",
        description: "Please allow camera access in your browser settings",
        variant: "destructive",
      })
    }
  }

  const stopMobileCamera = () => {
    if (mobileStream) {
      mobileStream.getTracks().forEach(track => track.stop())
      setMobileStream(null)
      setIsMobileCameraActive(false)
      setMobileCamera(prev => ({ ...prev, status: "offline", recording: false }))
      
      toast({
        title: "Mobile Camera Disconnected",
        description: "Camera stream has been stopped",
      })
    }
  }

  const generateQRCode = () => {
    toast({
      title: "QR Code Generated",
      description: "Scan this code from your mobile device to connect",
    })
  }

  useEffect(() => {
    return () => {
      if (mobileStream) {
        mobileStream.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
            <Camera className="h-6 w-6 text-chart-2" />
            CCTV & AI Vision
          </h1>
          <p className="text-muted-foreground">
            Live camera feeds with AI-powered detection (YOLOv8)
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant={viewMode === "grid" ? "default" : "outline"} 
            size="sm"
            onClick={() => setViewMode("grid")}
            className={viewMode === "outline" ? "bg-transparent" : ""}
          >
            <Grid3X3 className="h-4 w-4 mr-2" />
            Grid
          </Button>
          <Button 
            variant={viewMode === "single" ? "default" : "outline"} 
            size="sm"
            onClick={() => setViewMode("single")}
            className={viewMode === "outline" ? "bg-transparent" : ""}
          >
            <Maximize2 className="h-4 w-4 mr-2" />
            Single
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-card border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Cameras Online</p>
                <p className="text-2xl font-semibold mt-1">{onlineCameras}/{cameras.length}</p>
              </div>
              <div className="rounded-lg bg-primary/10 p-3">
                <Video className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">AI Enabled</p>
                <p className="text-2xl font-semibold mt-1">{aiEnabledCameras}</p>
              </div>
              <div className="rounded-lg bg-chart-2/10 p-3">
                <Brain className="h-5 w-5 text-chart-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Today&apos;s Detections</p>
                <p className="text-2xl font-semibold mt-1">24</p>
              </div>
              <div className="rounded-lg bg-chart-3/10 p-3">
                <Eye className="h-5 w-5 text-chart-3" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Alerts</p>
                <p className="text-2xl font-semibold mt-1">2</p>
              </div>
              <div className="rounded-lg bg-warning/10 p-3">
                <AlertTriangle className="h-5 w-5 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="live" className="space-y-4">
        <TabsList className="bg-secondary/50">
          <TabsTrigger value="live">Live Feeds</TabsTrigger>
          <TabsTrigger value="ai">AI Detections</TabsTrigger>
          <TabsTrigger value="recordings">Recordings</TabsTrigger>
        </TabsList>

        <TabsContent value="live">
          <div className={`grid gap-4 ${viewMode === "grid" ? "md:grid-cols-3 lg:grid-cols-4" : "md:grid-cols-1"}`}>
            {cameras.map((camera) => (
              <Card 
                key={camera.id} 
                className={`bg-card border-border/50 overflow-hidden cursor-pointer transition-all ${
                  selectedCamera === camera.id ? "ring-2 ring-primary" : ""
                } ${viewMode === "single" && selectedCamera && selectedCamera !== camera.id ? "hidden" : ""}`}
                onClick={() => setSelectedCamera(selectedCamera === camera.id ? null : camera.id)}
              >
                <div className={`relative bg-secondary/50 flex items-center justify-center ${
                  viewMode === "single" && selectedCamera === camera.id ? "h-[400px]" : "h-[140px]"
                }`}>
                  {camera.status === "online" ? (
                    <>
                      <div className="text-muted-foreground text-sm">
                        <Video className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p>Live Feed</p>
                      </div>
                      <div className="absolute top-2 left-2">
                        <Badge variant="outline" className="bg-destructive/80 text-destructive-foreground border-0 text-xs">
                          <div className="h-1.5 w-1.5 rounded-full bg-destructive-foreground animate-pulse mr-1" />
                          LIVE
                        </Badge>
                      </div>
                      {camera.aiEnabled && (
                        <div className="absolute top-2 right-2">
                          <Badge variant="outline" className="bg-chart-2/80 text-chart-2-foreground border-0 text-xs">
                            <Brain className="h-3 w-3 mr-1" />
                            AI
                          </Badge>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-muted-foreground text-sm">
                      <AlertTriangle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>Maintenance</p>
                    </div>
                  )}
                </div>
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{camera.name}</p>
                      <p className="text-xs text-muted-foreground">{camera.location}</p>
                    </div>
                    <div className={`h-2 w-2 rounded-full ${
                      camera.status === "online" ? "bg-primary" : "bg-warning"
                    }`} />
                  </div>
                  {camera.lastDetection && (
                    <p className="text-xs text-chart-2 mt-2 flex items-center gap-1">
                      <Activity className="h-3 w-3" />
                      {camera.lastDetection}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ai">
          <Card className="bg-card border-border/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-chart-2" />
                <CardTitle className="text-base font-medium">AI Detection Log</CardTitle>
              </div>
              <CardDescription>
                Automated detection of stray animals, crowds, garbage, and suspicious activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {aiDetections.map((detection) => (
                  <div
                    key={detection.id}
                    className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 rounded-lg border border-border/50 bg-secondary/30 p-4"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`rounded-full p-2.5 ${
                        detection.severity === "high" 
                          ? "bg-destructive/20 text-destructive" 
                          : detection.severity === "medium"
                          ? "bg-warning/20 text-warning"
                          : detection.severity === "low"
                          ? "bg-chart-4/20 text-chart-4"
                          : "bg-chart-2/20 text-chart-2"
                      }`}>
                        <detection.icon className="h-4 w-4" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{detection.description}</p>
                          <Badge 
                            variant="outline" 
                            className={
                              detection.status === "resolved"
                                ? "bg-primary/10 text-primary border-primary/30"
                                : detection.status === "ticketed"
                                ? "bg-chart-3/10 text-chart-3 border-chart-3/30"
                                : detection.status === "alerted"
                                ? "bg-warning/10 text-warning border-warning/30"
                                : "bg-chart-2/10 text-chart-2 border-chart-2/30"
                            }
                          >
                            {detection.status.charAt(0).toUpperCase() + detection.status.slice(1)}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Camera className="h-3 w-3" />
                            {detection.camera}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {detection.time}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="bg-transparent">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      {detection.status !== "resolved" && (
                        <Button variant="outline" size="sm" className="bg-transparent">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Resolve
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Features Info */}
          <div className="grid gap-4 md:grid-cols-3 mt-4">
            <Card className="bg-card border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-chart-4/10 p-2.5">
                    <Dog className="h-5 w-5 text-chart-4" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Stray Animal Detection</p>
                    <p className="text-xs text-muted-foreground">Dogs, cows, cats detection</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-warning/10 p-2.5">
                    <Users className="h-5 w-5 text-warning" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Crowd Detection</p>
                    <p className="text-xs text-muted-foreground">Anti-ragging compliance</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-chart-3/10 p-2.5">
                    <Trash2 className="h-5 w-5 text-chart-3" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Swachhata Monitor</p>
                    <p className="text-xs text-muted-foreground">Garbage overflow alerts</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recordings">
          <Card className="bg-card border-border/50">
            <CardHeader>
              <CardTitle className="text-base font-medium">Recording Archives</CardTitle>
              <CardDescription>Access and download past recordings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {["Today", "Yesterday", "2 Days Ago", "3 Days Ago", "4 Days Ago", "5 Days Ago"].map((day, index) => (
                  <div 
                    key={day}
                    className="rounded-lg border border-border/50 bg-secondary/30 p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <p className="font-medium">{day}</p>
                      <Badge variant="outline" className="text-xs">
                        {12 - index} cameras
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {24 - index * 2} hours of footage
                    </p>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="bg-transparent">
                        <LayoutGrid className="h-4 w-4" />
                      </Button>
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
