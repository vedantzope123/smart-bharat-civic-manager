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

export default function ResidentsPage() {
  const { toast } = useToast()
  const [residents, setResidents] = useState(puneSmartCityData.residents)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterArea, setFilterArea] = useState("All")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedResident, setSelectedResident] = useState<any>(null)
  const [newResident, setNewResident] = useState({
    name: "",
    area: "",
    address: "",
    phone: "",
    email: "",
    occupation: "",
    familyMembers: 1
  })

  const filteredResidents = residents.filter(resident => {
    const matchesSearch = resident.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resident.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesArea = filterArea === "All" || resident.area === filterArea
    return matchesSearch && matchesArea
  })

  const handleAddResident = () => {
    if (!newResident.name || !newResident.area || !newResident.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const resident = {
      ...newResident,
      id: `R${(residents.length + 1).toString().padStart(3, '0')}`,
      registrationDate: new Date().toISOString().split('T')[0]
    }

    setResidents([...residents, resident])
    setNewResident({
      name: "",
      area: "",
      address: "",
      phone: "",
      email: "",
      occupation: "",
      familyMembers: 1
    })
    setIsAddDialogOpen(false)
    
    toast({
      title: "Resident Added",
      description: `${resident.name} has been successfully registered.`,
    })
  }

  const handleEditResident = () => {
    if (!selectedResident) return

    setResidents(residents.map(r => 
      r.id === selectedResident.id ? selectedResident : r
    ))
    setIsEditDialogOpen(false)
    
    toast({
      title: "Resident Updated",
      description: `${selectedResident.name}'s information has been updated.`,
    })
  }

  const handleDeleteResident = (id: string) => {
    const resident = residents.find(r => r.id === id)
    setResidents(residents.filter(r => r.id !== id))
    
    toast({
      title: "Resident Removed",
      description: `${resident?.name} has been removed from the system.`,
    })
  }

  const exportData = () => {
    toast({
      title: "Export Complete",
      description: "Residents data has been downloaded as CSV.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Residents Management</h1>
          <p className="text-muted-foreground mt-2">
            Total Residents: {residents.length} | Active: {residents.length}
          </p>
        </div>
        <div className="flex gap-3">
          <Button onClick={exportData} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add Resident
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Resident</DialogTitle>
                <DialogDescription>
                  Register a new resident in the system
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Full Name *</Label>
                  <Input 
                    value={newResident.name}
                    onChange={(e) => setNewResident({...newResident, name: e.target.value})}
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <Label>Area *</Label>
                  <Select value={newResident.area} onValueChange={(v) => setNewResident({...newResident, area: v})}>
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
                <div className="col-span-2">
                  <Label>Address</Label>
                  <Input 
                    value={newResident.address}
                    onChange={(e) => setNewResident({...newResident, address: e.target.value})}
                    placeholder="Street address"
                  />
                </div>
                <div>
                  <Label>Phone *</Label>
                  <Input 
                    value={newResident.phone}
                    onChange={(e) => setNewResident({...newResident, phone: e.target.value})}
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input 
                    type="email"
                    value={newResident.email}
                    onChange={(e) => setNewResident({...newResident, email: e.target.value})}
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <Label>Occupation</Label>
                  <Input 
                    value={newResident.occupation}
                    onChange={(e) => setNewResident({...newResident, occupation: e.target.value})}
                    placeholder="Occupation"
                  />
                </div>
                <div>
                  <Label>Family Members</Label>
                  <Input 
                    type="number"
                    value={newResident.familyMembers}
                    onChange={(e) => setNewResident({...newResident, familyMembers: parseInt(e.target.value)})}
                    min="1"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAddResident}>Add Resident</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Residents</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{residents.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Across {puneSmartCityData.areas.length} areas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Population</CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{residents.reduce((sum, r) => sum + r.familyMembers, 0)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Family members
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">New This Month</CardTitle>
            <UserPlus className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-1">
              Recent registrations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Family Size</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {residents.length > 0 ? (residents.reduce((sum, r) => sum + r.familyMembers, 0) / residents.length).toFixed(1) : 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Members per household
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search by name or email..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full md:w-48">
              <Select value={filterArea} onValueChange={setFilterArea}>
                <SelectTrigger>
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Areas</SelectItem>
                  {puneSmartCityData.areas.map((area) => (
                    <SelectItem key={area.id} value={area.name}>{area.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Area</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Occupation</TableHead>
                <TableHead>Family</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredResidents.map((resident) => (
                <TableRow key={resident.id}>
                  <TableCell className="font-medium">{resident.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="h-4 w-4" />
                      </div>
                      {resident.name}
                    </div>
                  </TableCell>
                  <TableCell>{resident.area}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Phone className="h-3 w-3 text-muted-foreground" />
                      {resident.phone}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Mail className="h-3 w-3 text-muted-foreground" />
                      {resident.email}
                    </div>
                  </TableCell>
                  <TableCell>{resident.occupation}</TableCell>
                  <TableCell>{resident.familyMembers}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          setSelectedResident({...resident})
                          setIsEditDialogOpen(true)
                        }}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDeleteResident(resident.id)}
                      >
                        <Trash2 className="h-3 w-3 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      {selectedResident && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Resident</DialogTitle>
              <DialogDescription>
                Update resident information
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Full Name</Label>
                <Input 
                  value={selectedResident.name}
                  onChange={(e) => setSelectedResident({...selectedResident, name: e.target.value})}
                />
              </div>
              <div>
                <Label>Area</Label>
                <Select value={selectedResident.area} onValueChange={(v) => setSelectedResident({...selectedResident, area: v})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {puneSmartCityData.areas.map((area) => (
                      <SelectItem key={area.id} value={area.name}>{area.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2">
                <Label>Address</Label>
                <Input 
                  value={selectedResident.address}
                  onChange={(e) => setSelectedResident({...selectedResident, address: e.target.value})}
                />
              </div>
              <div>
                <Label>Phone</Label>
                <Input 
                  value={selectedResident.phone}
                  onChange={(e) => setSelectedResident({...selectedResident, phone: e.target.value})}
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input 
                  type="email"
                  value={selectedResident.email}
                  onChange={(e) => setSelectedResident({...selectedResident, email: e.target.value})}
                />
              </div>
              <div>
                <Label>Occupation</Label>
                <Input 
                  value={selectedResident.occupation}
                  onChange={(e) => setSelectedResident({...selectedResident, occupation: e.target.value})}
                />
              </div>
              <div>
                <Label>Family Members</Label>
                <Input 
                  type="number"
                  value={selectedResident.familyMembers}
                  onChange={(e) => setSelectedResident({...selectedResident, familyMembers: parseInt(e.target.value)})}
                  min="1"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleEditResident}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
