"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Bell, Search, Globe } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"

const searchSuggestions = [
  { name: "Water Management", path: "/water" },
  { name: "Energy Monitor", path: "/energy" },
  { name: "Security", path: "/security" },
  { name: "Fire & Gas Safety", path: "/safety" },
  { name: "CCTV & AI Vision", path: "/cctv" },
  { name: "Waste Management", path: "/waste" },
  { name: "Predictive Maintenance", path: "/maintenance" },
  { name: "Alerts", path: "/alerts" },
  { name: "Sahayak AI", path: "/assistant" },
  { name: "Payments", path: "/payments" },
  { name: "Residents", path: "/residents" },
  { name: "Settings", path: "/settings" },
]

export function DashboardHeader() {
  const { toast } = useToast()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const openNotifications = () => {
    router.push("/alerts")
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    const match = searchSuggestions.find(
      (item) => item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    if (match) {
      router.push(match.path)
      setSearchQuery("")
      toast({
        title: "Navigating to " + match.name,
        description: "Opening the requested module",
      })
    } else {
      toast({
        title: "No results found",
        description: `No module found for "${searchQuery}"`,
        variant: "destructive",
      })
    }
  }

  return (
    <header className="sticky top-0 z-50 flex h-14 items-center gap-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="h-6" />
      
      <div className="flex flex-1 items-center gap-4">
        <form onSubmit={handleSearch} className="relative hidden md:flex w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search modules, alerts..."
            className="pl-9 bg-secondary/50 border-border/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2">
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">EN</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => toast({ title: "Language: English" })}>
              English
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => toast({ title: "Language: Hindi" })}>
              Hindi
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => toast({ title: "Language: Hinglish" })}>
              Hinglish
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="icon" className="relative" onClick={openNotifications}>
          <Bell className="h-4 w-4" />
          <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-destructive text-destructive-foreground text-xs">
            3
          </Badge>
          <span className="sr-only">Notifications</span>
        </Button>

        <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
          <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
          <span>All Systems Online</span>
        </div>
      </div>
    </header>
  )
}
