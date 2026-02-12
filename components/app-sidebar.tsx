"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Droplets,
  Zap,
  Shield,
  Bell,
  MessageSquare,
  Users,
  Settings,
  Building2,
  Flame,
  Camera,
  Trash2,
  Wrench,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"

const mainNavItems = [
  {
    title: "Overview",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Water Management",
    url: "/water",
    icon: Droplets,
    badge: "Live",
    badgeVariant: "default" as const,
  },
  {
    title: "Energy Monitor",
    url: "/energy",
    icon: Zap,
  },
  {
    title: "Security",
    url: "/security",
    icon: Shield,
  },
]

const monitoringItems = [
  {
    title: "Fire & Gas Safety",
    url: "/safety",
    icon: Flame,
    badge: "Alert",
    badgeVariant: "destructive" as const,
  },
  {
    title: "CCTV & AI Vision",
    url: "/cctv",
    icon: Camera,
  },
  {
    title: "Waste Management",
    url: "/waste",
    icon: Trash2,
  },
  {
    title: "Predictive Maintenance",
    url: "/maintenance",
    icon: Wrench,
  },
]

const systemItems = [
  {
    title: "Alerts",
    url: "/alerts",
    icon: Bell,
    badge: "3",
    badgeVariant: "destructive" as const,
  },
  {
    title: "Sahayak AI",
    url: "/assistant",
    icon: MessageSquare,
  },
  {
    title: "Payments",
    url: "/payments",
    icon: Building2,
  },
  {
    title: "Residents",
    url: "/residents",
    icon: Users,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="p-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Building2 className="h-6 w-6" />
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="font-semibold text-lg">Rakshak</span>
            <span className="text-xs text-muted-foreground">Smart Infrastructure</span>
          </div>
        </Link>
      </SidebarHeader>
      
      <SidebarSeparator />
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    tooltip={item.title}
                  >
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                      {item.badge && (
                        <Badge variant="outline" className="ml-auto text-xs bg-primary/10 text-primary border-primary/30">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Monitoring</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {monitoringItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    tooltip={item.title}
                  >
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                      {item.badge && (
                        <Badge 
                          variant={item.badgeVariant || "outline"} 
                          className={`ml-auto text-xs ${
                            item.badgeVariant === "destructive" 
                              ? "bg-destructive/20 text-destructive border-destructive/30" 
                              : "bg-primary/10 text-primary border-primary/30"
                          }`}
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>System</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    tooltip={item.title}
                  >
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                      {item.badge && (
                        <Badge 
                          variant={item.badgeVariant || "outline"} 
                          className={`ml-auto text-xs ${
                            item.badgeVariant === "destructive" 
                              ? "bg-destructive/20 text-destructive border-destructive/30" 
                              : "bg-primary/10 text-primary border-primary/30"
                          }`}
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 group-data-[collapsible=icon]:p-2">
        <div className="flex items-center gap-3 rounded-lg bg-secondary/50 p-3 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
            <span className="text-sm font-medium">AS</span>
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-medium">Admin Sharma</span>
            <span className="text-xs text-muted-foreground">Society Manager</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
