"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { 
  IndianRupee,
  CreditCard,
  CheckCircle,
  Clock,
  Receipt,
  Download,
  QrCode,
  Smartphone,
  Building2,
  Calendar,
  Filter,
  AlertCircle
} from "lucide-react"

// Payment history data
const payments = [
  {
    id: "PAY-001",
    type: "Maintenance Fee",
    amount: 5000,
    status: "paid",
    date: "2026-01-20",
    method: "UPI - Google Pay",
    transactionId: "UPI2026012012345678",
    receipt: true
  },
  {
    id: "PAY-002",
    type: "Mess Fee",
    amount: 3500,
    status: "paid",
    date: "2026-01-15",
    method: "UPI - PhonePe",
    transactionId: "UPI2026011598765432",
    receipt: true
  },
  {
    id: "PAY-003",
    type: "Water Bill",
    amount: 850,
    status: "paid",
    date: "2026-01-10",
    method: "UPI - Paytm",
    transactionId: "UPI2026011011223344",
    receipt: true
  },
  {
    id: "PAY-004",
    type: "Maintenance Fee",
    amount: 5000,
    status: "pending",
    date: "2026-02-01",
    method: null,
    transactionId: null,
    receipt: false,
    dueDate: "2026-02-05"
  },
  {
    id: "PAY-005",
    type: "Parking Fee",
    amount: 1200,
    status: "paid",
    date: "2026-01-05",
    method: "UPI - Google Pay",
    transactionId: "UPI2026010555667788",
    receipt: true
  },
]

// Monthly payment summary
const monthlyData = [
  { month: "Jul", maintenance: 5000, mess: 3500, utilities: 1200 },
  { month: "Aug", maintenance: 5000, mess: 3800, utilities: 1100 },
  { month: "Sep", maintenance: 5000, mess: 3500, utilities: 1350 },
  { month: "Oct", maintenance: 5000, mess: 3700, utilities: 1150 },
  { month: "Nov", maintenance: 5000, mess: 3600, utilities: 1400 },
  { month: "Dec", maintenance: 5000, mess: 3500, utilities: 1250 },
  { month: "Jan", maintenance: 5000, mess: 3500, utilities: 850 },
]

export default function PaymentsPage() {
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null)
  const [amount, setAmount] = useState("")
  const [upiId, setUpiId] = useState("")
  const [showQR, setShowQR] = useState(false)

  const pendingPayments = payments.filter(p => p.status === "pending")
  const totalPending = pendingPayments.reduce((sum, p) => sum + p.amount, 0)
  const paidThisMonth = payments.filter(p => p.status === "paid" && p.date.startsWith("2026-01")).reduce((sum, p) => sum + p.amount, 0)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-500"><CheckCircle className="h-3 w-3 mr-1" />Paid</Badge>
      case "pending":
        return <Badge className="bg-yellow-500"><Clock className="h-3 w-3 mr-1" />Pending</Badge>
      case "overdue":
        return <Badge className="bg-red-500"><AlertCircle className="h-3 w-3 mr-1" />Overdue</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
          <IndianRupee className="h-7 w-7" />
          Payment Gateway - UPI Integration
        </h1>
        <p className="text-muted-foreground">
          Pay maintenance, mess fees, and utilities instantly via UPI
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              ₹{totalPending.toLocaleString('en-IN')}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {pendingPayments.length} bills due
            </p>
            <Badge className="mt-2 bg-yellow-500">Due in 10 days</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paid This Month</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ₹{paidThisMonth.toLocaleString('en-IN')}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {payments.filter(p => p.status === "paid" && p.date.startsWith("2026-01")).length} transactions
            </p>
            <Badge className="mt-2 bg-green-500">On time</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">UPI Transactions</CardTitle>
            <Smartphone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {payments.filter(p => p.method?.startsWith("UPI")).length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              100% digital payments
            </p>
            <Badge className="mt-2 bg-blue-500">Cashless Society</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Paid (FY 2025-26)</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{(monthlyData.reduce((sum, m) => sum + m.maintenance + m.mess + m.utilities, 0)).toLocaleString('en-IN')}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Last 7 months
            </p>
            <Button variant="outline" size="sm" className="mt-2">
              <Download className="h-3 w-3 mr-1" />
              Tax Report
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Payment Interface */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Make Payment</CardTitle>
            <CardDescription>
              Pay instantly using UPI - Google Pay, PhonePe, Paytm, or any UPI app
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="quick" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="quick">Quick Pay</TabsTrigger>
                <TabsTrigger value="upi">UPI ID</TabsTrigger>
                <TabsTrigger value="qr">QR Code</TabsTrigger>
              </TabsList>

              {/* Quick Pay Tab */}
              <TabsContent value="quick" className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Select Pending Bill</Label>
                    <div className="space-y-2">
                      {pendingPayments.map((payment) => (
                        <div
                          key={payment.id}
                          className={`p-4 border rounded-lg cursor-pointer transition-all ${
                            selectedPayment === payment.id ? "border-blue-500 bg-blue-50" : "hover:border-gray-400"
                          }`}
                          onClick={() => {
                            setSelectedPayment(payment.id)
                            setAmount(payment.amount.toString())
                          }}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-semibold">{payment.type}</h4>
                              <p className="text-sm text-muted-foreground">Due: {payment.dueDate}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold">₹{payment.amount.toLocaleString('en-IN')}</div>
                              {getStatusBadge(payment.status)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedPayment && (
                    <div className="pt-4 border-t">
                      <h4 className="font-semibold mb-3">Pay with UPI</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <Button className="h-16 flex-col gap-1" variant="outline">
                          <div className="text-2xl">📱</div>
                          <span className="text-sm">Google Pay</span>
                        </Button>
                        <Button className="h-16 flex-col gap-1" variant="outline">
                          <div className="text-2xl">💜</div>
                          <span className="text-sm">PhonePe</span>
                        </Button>
                        <Button className="h-16 flex-col gap-1" variant="outline">
                          <div className="text-2xl">💙</div>
                          <span className="text-sm">Paytm</span>
                        </Button>
                        <Button className="h-16 flex-col gap-1" variant="outline">
                          <div className="text-2xl">🏦</div>
                          <span className="text-sm">BHIM UPI</span>
                        </Button>
                      </div>
                      <Button className="w-full mt-4" size="lg">
                        <IndianRupee className="h-4 w-4 mr-2" />
                        Pay ₹{parseInt(amount).toLocaleString()}
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* UPI ID Tab */}
              <TabsContent value="upi" className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount (₹)</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Enter amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="upiid">Your UPI ID</Label>
                    <Input
                      id="upiid"
                      type="text"
                      placeholder="yourname@upi"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Example: 9876543210@paytm or yourname@okaxis
                    </p>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">Society UPI ID</h4>
                    <div className="flex items-center justify-between">
                      <code className="text-sm font-mono">rakshak.society@upi</code>
                      <Button variant="outline" size="sm">Copy</Button>
                    </div>
                  </div>

                  <Button className="w-full" size="lg" disabled={!amount || !upiId}>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Proceed to Pay
                  </Button>
                </div>
              </TabsContent>

              {/* QR Code Tab */}
              <TabsContent value="qr" className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="qr-amount">Amount to Pay (₹)</Label>
                    <Input
                      id="qr-amount"
                      type="number"
                      placeholder="Enter amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>

                  {amount && (
                    <div className="space-y-4">
                      {/* Simulated QR Code */}
                      <div className="bg-white p-6 border-2 border-dashed rounded-lg flex flex-col items-center">
                        <div className="w-48 h-48 bg-gray-100 flex items-center justify-center rounded">
                          <QrCode className="h-32 w-32 text-gray-400" />
                        </div>
                        <p className="text-sm text-center mt-4 text-muted-foreground">
                          Scan this QR code with any UPI app to pay
                        </p>
                        <p className="text-lg font-bold mt-2">₹{parseInt(amount).toLocaleString()}</p>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>Secure payment via UPI - No extra charges</span>
                      </div>

                      <Button className="w-full" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download QR Code
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Sidebar - Payment History & Details */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Payment History</CardTitle>
              <CardDescription>Recent transactions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {payments.slice(0, 5).map((payment) => (
                <div key={payment.id} className="pb-3 border-b last:border-0">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <p className="font-semibold text-sm">{payment.type}</p>
                      <p className="text-xs text-muted-foreground">{payment.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sm">₹{payment.amount.toLocaleString('en-IN')}</p>
                      {getStatusBadge(payment.status)}
                    </div>
                  </div>
                  {payment.method && (
                    <p className="text-xs text-muted-foreground">{payment.method}</p>
                  )}
                  {payment.receipt && (
                    <Button variant="ghost" size="sm" className="mt-1 h-6 text-xs">
                      <Receipt className="h-3 w-3 mr-1" />
                      Download Receipt
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Payment Breakdown</CardTitle>
              <CardDescription>This month</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Maintenance Fee:</span>
                <span className="font-semibold">₹5,000</span>
              </div>
              <div className="flex justify-between">
                <span>Mess Fee:</span>
                <span className="font-semibold">₹3,500</span>
              </div>
              <div className="flex justify-between">
                <span>Water Bill:</span>
                <span className="font-semibold">₹850</span>
              </div>
              <div className="flex justify-between pt-2 border-t font-bold">
                <span>Total:</span>
                <span>₹9,350</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                UPI Benefits
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Instant payment confirmation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Zero transaction fees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Secure & encrypted</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Auto-receipt generation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>24/7 payment availability</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Payment Analytics */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Analytics</CardTitle>
          <CardDescription>
            Monthly expense breakdown (Last 7 months)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              maintenance: {
                label: "Maintenance Fee",
                color: "hsl(var(--chart-1))",
              },
              mess: {
                label: "Mess Fee",
                color: "hsl(var(--chart-2))",
              },
              utilities: {
                label: "Utilities",
                color: "hsl(var(--chart-3))",
              },
            }}
            className="h-[300px]"
          >
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="maintenance" fill="var(--color-maintenance)" />
              <Bar dataKey="mess" fill="var(--color-mess)" />
              <Bar dataKey="utilities" fill="var(--color-utilities)" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
