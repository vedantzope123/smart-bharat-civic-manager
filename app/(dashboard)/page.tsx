"use client"

import { StatsCards } from "@/components/dashboard/stats-cards"
import { WaterOverview } from "@/components/dashboard/water-overview"
import { EnergyOverview } from "@/components/dashboard/energy-overview"
import { AlertsFeed } from "@/components/dashboard/alerts-feed"
import { SecurityOverview } from "@/components/dashboard/security-overview"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { puneSmartCityData } from "@/lib/pune-data"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight text-balance">
          Welcome to {puneSmartCityData.city.name} Smart City Dashboard
        </h1>
        <p className="text-muted-foreground">
          Managing {puneSmartCityData.city.population} citizens across {puneSmartCityData.city.area} with {puneSmartCityData.city.completedProjects} completed and {puneSmartCityData.city.ongoingProjects} ongoing projects.
        </p>
      </div>

      <StatsCards />

      <div className="grid gap-6 lg:grid-cols-7">
        <div className="lg:col-span-4 space-y-6">
          <WaterOverview />
          <EnergyOverview />
        </div>
        <div className="lg:col-span-3 space-y-6">
          <AlertsFeed />
          <SecurityOverview />
          <QuickActions />
        </div>
      </div>
    </div>
  )
}
