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
  IndianRupee,
  Search,
  Filter,
  Plus,
  Download,
  CheckCircle,
  Clock,
  XCircle,
  CreditCard,
  Building,
  Droplets,
  Zap,
  Calendar
} from "lucide-react"

export default function PaymentsPage() {
  const { toast } = useToast()
  const [payments, setPayments] = useState(puneSmartCityData.payments)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("All")
  const [filterType, setFilterType] = useState("All")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newPayment, setNewPayment] = useState({
    residentId: "",
    type: "Property Tax",
    amount: "",
    dueDate: "",
    description: ""
  })

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.residentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "All" || payment.status === filterStatus
    const matchesType = filterType === "All" || payment.type === filterType
    return matchesSearch && matchesStatus && matchesType
  })

  const handleAddPayment = () => {
    if (!newPayment.residentId || !newPayment.amount || !newPayment.dueDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const payment = {
      ...newPayment,
      id: `PAY${(payments.length + 1).toString().padStart(4, '0')}`,
      amount: parseFloat(newPayment.amount),
      status: "Pending",
      createdDate: new Date().toISOString().split('T')[0]
    }

    setPayments([...payments, payment])
    setNewPayment({
      residentId: "",
      type: "Property Tax",
      amount: "",
      dueDate: "",
      description: ""
    })
    setIsAddDialogOpen(false)
    
    toast({
      title: "Payment Added",
      description: `New ${payment.type} payment has been created.`,
    })
  }

  const updatePaymentStatus = (id: string, newStatus: string) => {
    setPayments(payments.map(p => 
      p.id === id ? { ...p, status: newStatus } : p
    ))
    
    toast({
      title: "Status Updated",
      description: `Payment status changed to ${newStatus}`,
    })
  }

  const getTotalByStatus = (status: string) => {
    return payments
      .filter(p => p.status === status)
      .reduce((sum, p) => sum + p.amount, 0)
  }

  const getPaymentIcon = (type: string) => {
    switch(type) {
      case "Property Tax": return <Building className="h-4 w-4" />
      case "Water Bill": return <Droplets className="h-4 w-4" />
      case "Electricity Bill": return <Zap className="h-4 w-4" />
      default: return <CreditCard className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payments Management</h1>
          <p className="text-muted-foreground mt-2">
            Total Payments: {payments.length} | Outstanding: ₹{getTotalByStatus("Pending").toLocaleString()}
          </p>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => toast({ title: "Export Complete", description: "Payment records downloaded." })} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Payment
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Payment</DialogTitle>
                <DialogDescription>
                  Add a new payment entry to the system
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Resident ID *</Label>
                  <Select value={newPayment.residentId} onValueChange={(v) => setNewPayment({...newPayment, residentId: v})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select resident" />
                    </SelectTrigger>
                    <SelectContent>
                      {puneSmartCityData.residents.map((resident) => (
                        <SelectItem key={resident.id} value={resident.id}>
                          {resident.id} - {resident.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Payment Type *</Label>
                  <Select value={newPayment.type} onValueChange={(v) => setNewPayment({...newPayment, type: v})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Property Tax">Property Tax</SelectItem>
                      <SelectItem value="Water Bill">Water Bill</SelectItem>
                      <SelectItem value="Electricity Bill">Electricity Bill</SelectItem>
                      <SelectItem value="Maintenance">Maintenance</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Amount (₹) *</Label>
                  <Input 
                    type="number"
                    value={newPayment.amount}
                    onChange={(e) => setNewPayment({...newPayment, amount: e.target.value})}
                    placeholder="Enter amount"
                  />
                </div>
                <div>
                  <Label>Due Date *</Label>
                  <Input 
                    type="date"
                    value={newPayment.dueDate}
                    onChange={(e) => setNewPayment({...newPayment, dueDate: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Input 
                    value={newPayment.description}
                    onChange={(e) => setNewPayment({...newPayment, description: e.target.value})}
                    placeholder="Payment description"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAddPayment}>Create Payment</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Collected</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">₹{getTotalByStatus("Paid").toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {payments.filter(p => p.status === "Paid").length} payments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">₹{getTotalByStatus("Pending").toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {payments.filter(p => p.status === "Pending").length} payments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">₹{getTotalByStatus("Overdue").toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {payments.filter(p => p.status === "Overdue").length} payments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{payments.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Total transactions
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search payments..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Types</SelectItem>
                  <SelectItem value="Property Tax">Property Tax</SelectItem>
                  <SelectItem value="Water Bill">Water Bill</SelectItem>
                  <SelectItem value="Electricity Bill">Electricity Bill</SelectItem>
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Status</SelectItem>
                  <SelectItem value="Paid">Paid</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Overdue">Overdue</SelectItem>
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
                <TableHead>Resident</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.id}</TableCell>
                  <TableCell>{payment.residentId}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getPaymentIcon(payment.type)}
                      {payment.type}
                    </div>
                  </TableCell>
                  <TableCell className="font-bold">₹{payment.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      {payment.dueDate}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        payment.status === "Paid" ? "default" : 
                        payment.status === "Pending" ? "secondary" : 
                        "destructive"
                      }
                      className={
                        payment.status === "Paid" ? "bg-green-600" : 
                        payment.status === "Pending" ? "bg-yellow-600" : 
                        "bg-red-600"
                      }
                    >
                      {payment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {payment.status !== "Paid" && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => updatePaymentStatus(payment.id, "Paid")}
                      >
                        Mark Paid
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
