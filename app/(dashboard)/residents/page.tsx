"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { puneSmartCityData } from "@/lib/pune-data"
import { 
  Users,
  Search,
  Filter,
  UserPlus,
  Phone,
  Mail,
  Home,
  Car,
  CheckCircle,
  Clock,
  AlertCircle,
  Edit,
  Trash2,
  Download
} from "lucide-react"

const residents = [
  {
    id: 1,
    name: "Rajesh Kumar Sharma",
    flat: "A-302",
    phone: "+91 98765 43210",
    email: "rajesh.sharma@email.com",
    members: 4,
    vehicles: 2,
    status: "active",
    paymentStatus: "paid",
    moveInDate: "2020-03-15"
  },
  {
    id: 2,
    name: "Priya Patel",
    flat: "B-105",
    phone: "+91 87654 32109",
    email: "priya.patel@email.com",
    members: 3,
    vehicles: 1,
    status: "active",
    paymentStatus: "pending",
    moveInDate: "2021-06-20"
  },
  {
    id: 3,
    name: "Amit Gupta",
    flat: "C-401",
    phone: "+91 76543 21098",
    email: "amit.gupta@email.com",
    members: 5,
    vehicles: 3,
    status: "active",
    paymentStatus: "paid",
    moveInDate: "2019-01-10"
  },
]

export default function ResidentsPage() {
  const { toast } = useToast()

  const handleAddResident = () => {
    toast({
      title: "Add New Resident",
      description: "Opening resident registration form...",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
          <Users className="h-7 w-7" />
          Residents Management
        </h1>
        <p className="text-muted-foreground">
          Manage resident profiles, contact information, and society membership
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Residents</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{residents.length}</div>
            <p className="text-xs text-muted-foreground">Active families</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{residents.reduce((sum, r) => sum + r.members, 0)}</div>
            <p className="text-xs text-muted-foreground">Including family members</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Registered Vehicles</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{residents.reduce((sum, r) => sum + r.vehicles, 0)}</div>
            <p className="text-xs text-muted-foreground">Cars & bikes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payment Status</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {residents.filter(r => r.paymentStatus === "paid").length}/{residents.length}
            </div>
            <p className="text-xs text-muted-foreground">Paid this month</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Residents</CardTitle>
              <CardDescription>Complete resident directory</CardDescription>
            </div>
            <Button onClick={handleAddResident}>
              <UserPlus className="h-4 w-4 mr-2" />
              Add New Resident
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search residents..." className="pl-9" />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          <div className="space-y-4">
            {residents.map((resident) => (
              <div key={resident.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div>
                      <h4 className="font-semibold text-lg">{resident.name}</h4>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Home className="h-3 w-3" />
                        Flat {resident.flat}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        <span>{resident.phone}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        <span>{resident.email}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3 text-muted-foreground" />
                        <span>{resident.members} members</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Car className="h-3 w-3 text-muted-foreground" />
                        <span>{resident.vehicles} vehicles</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right space-y-2">
                    {resident.paymentStatus === "paid" ? (
                      <Badge className="bg-green-500">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Paid
                      </Badge>
                    ) : (
                      <Badge className="bg-yellow-500">
                        <Clock className="h-3 w-3 mr-1" />
                        Pending
                      </Badge>
                    )}
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">View Details</Button>
                      <Button variant="outline" size="sm">Contact</Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
