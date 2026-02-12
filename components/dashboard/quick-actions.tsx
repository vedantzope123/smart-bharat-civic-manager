"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { 
  Power, 
  MessageSquare, 
  FileText, 
  Send,
  Lightbulb,
  Activity
} from "lucide-react"

const actions = [
  {
    label: "Manual Pump Control",
    icon: Power,
    variant: "outline" as const,
    action: "pump",
  },
  {
    label: "Ask Sahayak AI",
    icon: MessageSquare,
    variant: "default" as const,
    action: "assistant",
  },
  {
    label: "Generate Report",
    icon: FileText,
    variant: "outline" as const,
    action: "report",
  },
  {
    label: "Send WhatsApp Alert",
    icon: Send,
    variant: "outline" as const,
    action: "alert",
  },
  {
    label: "Quick System Check",
    icon: Activity,
    variant: "outline" as const,
    action: "system",
  },
]

export function QuickActions() {
  const router = useRouter()
  const { toast } = useToast()

  const handleAction = (action: string) => {
    switch (action) {
      case "pump":
        router.push("/water")
        toast({
          title: "Opening Water Management",
          description: "Navigate to pump controls",
        })
        break
      case "assistant":
        router.push("/assistant")
        break
      case "report":
        toast({
          title: "Generating Report",
          description: "Your infrastructure report is being compiled...",
        })
        setTimeout(() => {
          toast({
            title: "Report Ready",
            description: "Infrastructure report downloaded successfully",
          })
        }, 2000)
        break
      case "alert":
        toast({
          title: "WhatsApp Alert Sent",
          description: "Emergency notification sent to all residents",
        })
        break
      case "system":
        toast({
          title: "System Check Running",
          description: "Scanning all modules and sensors...",
        })
        setTimeout(() => {
          toast({
            title: "System Check Complete",
            description: "All systems operational. 18/18 devices online.",
          })
        }, 2000)
        break
    }
  }

  return (
    <Card className="bg-card border-border/50">
      <CardHeader className="flex flex-row items-center gap-2 pb-2">
        <Lightbulb className="h-5 w-5 text-chart-3" />
        <CardTitle className="text-base font-medium">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2">
        {actions.map((action) => (
          <Button
            key={action.label}
            variant={action.variant}
            className="h-auto flex-col gap-2 py-4 text-xs"
            onClick={() => handleAction(action.action)}
          >
            <action.icon className="h-5 w-5" />
            <span className="text-center leading-tight">{action.label}</span>
          </Button>
        ))}
      </CardContent>
    </Card>
  )
}
