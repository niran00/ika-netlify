"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Settings, Download, Calendar, CheckCircle, Clock, Plus, Edit, FileText, Shield, Zap, Activity, LogOut } from 'lucide-react'
import { updateUserProfile, logoutUser } from "@/app/[lang]/actions/auth"
import { useActionState } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { useAuth } from "@/app/context/auth-context"

export default function Dashboard() {
  const { user, logout: authLogout } = useAuth()
  const [profileState, profileAction, isUpdatingProfile] = useActionState(updateUserProfile, null)
  const router = useRouter()

  // Mock data for dashboard
  const [devices] = useState([
    {
      id: "1",
      name: "EUROSTAR 20 digital",
      model: "EUROSTAR20",
      serialNumber: "ES20-2024-001",
      status: "Active",
      registrationDate: "2024-01-15",
      warrantyExpiry: "2026-01-15",
      lastMaintenance: "2024-06-15",
    }
  ])

  const [pressureTests] = useState([
    {
      id: "1",
      vesselId: "PV-001",
      vesselName: "Pressure Vessel 50ml",
      testDate: "2024-02-15",
      nextTestDue: "2025-02-15",
      status: "Valid",
      certificate: "CERT-2024-001.pdf",
    },
    {
      id: "2",
      vesselId: "PV-002",
      vesselName: "Pressure Vessel 100ml",
      testDate: "2023-11-20",
      nextTestDue: "2024-11-20",
      status: "Due Soon",
      certificate: "CERT-2023-045.pdf",
    },
  ])

  const [licenses] = useState([
    
  ])

  const handleLogout = async () => {
    try {
      await logoutUser()
      authLogout()
      router.push("/")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  return (
    <AuthGuard requireAuth={true}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-500">MyIKA Dashboard</div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Welcome, {user?.firstName} {user?.lastName}
                </span>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-7">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="devices">Device Overview</TabsTrigger>
              <TabsTrigger value="register">Register Devices</TabsTrigger>
              <TabsTrigger value="pressure">Pressure Test</TabsTrigger>
              <TabsTrigger value="firmware">Firmware Update</TabsTrigger>
              <TabsTrigger value="licenses">Software Licenses</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Registered Devices</CardTitle>
                    <Settings className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{devices.length}</div>
                    <p className="text-xs text-muted-foreground">+1 from last month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Licenses</CardTitle>
                    <Shield className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{licenses.filter((l) => l.status === "Active").length}</div>
                    <p className="text-xs text-muted-foreground">2 expiring soon</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pressure Tests</CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{pressureTests.length}</div>
                    <p className="text-xs text-muted-foreground">1 due soon</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Warranty Status</CardTitle>
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2</div>
                    <p className="text-xs text-muted-foreground">devices under warranty</p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest IKA account activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Device registered successfully</p>
                        <p className="text-xs text-gray-500">EUROSTAR 20 digital - 2 days ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">License activated</p>
                        <p className="text-xs text-gray-500">labworldsoft® - 1 week ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Pressure test scheduled</p>
                        <p className="text-xs text-gray-500">Pressure Vessel 100ml - 2 weeks ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              {/* <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common tasks and shortcuts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button
                      variant="outline"
                      className="h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
                    >
                      <Plus className="h-5 w-5" />
                      <span className="text-xs">Register Device</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
                    >
                      <Download className="h-5 w-5" />
                      <span className="text-xs">Download FUT</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
                    >
                      <Calendar className="h-5 w-5" />
                      <span className="text-xs">Schedule Test</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
                    >
                      <Shield className="h-5 w-5" />
                      <span className="text-xs">Manage Licenses</span>
                    </Button>
                  </div>
                </CardContent>
              </Card> */}
            </TabsContent>

            {/* Device Overview Tab */}
            <TabsContent value="devices" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Registered Devices</CardTitle>
                  <CardDescription>Manage your IKA laboratory equipment</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {devices.map((device) => (
                      <div key={device.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">{device.name}</h3>
                          <Badge variant={device.status === "Active" ? "default" : "destructive"}>{device.status}</Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div>
                            <p className="font-medium">Model</p>
                            <p>{device.model}</p>
                          </div>
                          <div>
                            <p className="font-medium">Serial Number</p>
                            <p>{device.serialNumber}</p>
                          </div>
                          <div>
                            <p className="font-medium">Warranty Expiry</p>
                            <p>{device.warrantyExpiry}</p>
                          </div>
                          <div>
                            <p className="font-medium">Last Maintenance</p>
                            <p>{device.lastMaintenance}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2 mt-4">
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                          <Button size="sm" variant="outline">
                            <FileText className="h-4 w-4 mr-2" />
                            Manual
                          </Button>
                          <Button size="sm" variant="outline">
                            <Calendar className="h-4 w-4 mr-2" />
                            Schedule Service
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Register Devices Tab */}
            <TabsContent value="register" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Register New Device</CardTitle>
                  <CardDescription>Register your IKA equipment for warranty and support</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="device-name">Device Name</Label>
                        <Input id="device-name" placeholder="e.g., EUROSTAR 20 digital" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="model">Model</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select model" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="eurostar20">EUROSTAR 20</SelectItem>
                            <SelectItem value="rct-basic">RCT basic</SelectItem>
                            <SelectItem value="t10-basic">T 10 basic</SelectItem>
                            <SelectItem value="ks130">KS 130 basic</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="serial-number">Serial Number</Label>
                        <Input id="serial-number" placeholder="Enter serial number" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="purchase-date">Purchase Date</Label>
                        <Input id="purchase-date" type="date" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dealer">Dealer/Distributor</Label>
                      <Input id="dealer" placeholder="Enter dealer name" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="application">Primary Application</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select application" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="research">Research & Development</SelectItem>
                          <SelectItem value="quality-control">Quality Control</SelectItem>
                          <SelectItem value="production">Production</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox id="warranty-extension" />
                      <Label htmlFor="warranty-extension">
                        I want to extend my warranty (free for registration within 30 days of purchase)
                      </Label>
                    </div>

                    <Button type="submit" className="w-full bg-[#00599c] hover:bg-[#004080]">
                      Register Device
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Pressure Test Tab */}
            <TabsContent value="pressure" className="space-y-6">
              <Card>
                {/* <CardHeader>
                  <CardTitle>Pressure Test Management</CardTitle>
                  <CardDescription>Manage pressure vessel testing and certificates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pressureTests.map((test) => (
                      <div key={test.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">{test.vesselName}</h3>
                          <Badge variant={test.status === "Valid" ? "default" : "destructive"}>{test.status}</Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div>
                            <p className="font-medium">Vessel ID</p>
                            <p>{test.vesselId}</p>
                          </div>
                          <div>
                            <p className="font-medium">Last Test</p>
                            <p>{test.testDate}</p>
                          </div>
                          <div>
                            <p className="font-medium">Next Test Due</p>
                            <p>{test.nextTestDue}</p>
                          </div>
                          <div>
                            <p className="font-medium">Certificate</p>
                            <p>{test.certificate}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2 mt-4">
                          <Button size="sm" variant="outline">
                            <Calendar className="h-4 w-4 mr-2" />
                            Schedule Test
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Download Certificate
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-6" />

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Register New Pressure Vessel</h3>
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="vessel-type">Vessel Type</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select vessel type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="50ml">Pressure Vessel 50ml</SelectItem>
                              <SelectItem value="100ml">Pressure Vessel 100ml</SelectItem>
                              <SelectItem value="200ml">Pressure Vessel 200ml</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="vessel-serial">Vessel Serial Number</Label>
                          <Input id="vessel-serial" placeholder="Enter serial number" />
                        </div>
                      </div>
                      <Button type="submit" className="bg-[#00599c] hover:bg-[#004080]">
                        Register Vessel
                      </Button>
                    </form>
                  </div>
                </CardContent> */}
              </Card>
            </TabsContent>

            {/* Firmware Update Tab */}
            <TabsContent value="firmware" className="space-y-6">
              <Card>
                {/* <CardHeader>
                  <CardTitle>Firmware Update Tool (FUT)</CardTitle>
                  <CardDescription>Download and manage firmware updates for your devices</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <Download className="h-5 w-5 text-blue-600" />
                        <div>
                          <h3 className="font-semibold text-blue-900">Download FUT</h3>
                          <p className="text-sm text-blue-700">
                            Download the latest Firmware Update Tool for Windows and macOS
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2 mt-4">
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          <Download className="h-4 w-4 mr-2" />
                          Download for Windows
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Download for macOS
                        </Button>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Available Updates</h3>
                      <div className="space-y-3">
                        <div className="border rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">EUROSTAR 20 digital</h4>
                              <p className="text-sm text-gray-600">Firmware v2.1.3 available</p>
                            </div>
                            <Badge variant="outline">Update Available</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-2">
                            Improvements: Enhanced temperature control, bug fixes, new calibration features
                          </p>
                          <Button size="sm" className="mt-3 bg-[#00599c] hover:bg-[#004080]">
                            <Zap className="h-4 w-4 mr-2" />
                            Update Firmware
                          </Button>
                        </div>

                        <div className="border rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">RCT basic</h4>
                              <p className="text-sm text-gray-600">Firmware up to date (v1.8.2)</p>
                            </div>
                            <Badge variant="default">Up to Date</Badge>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 border rounded-lg p-4">
                      <h3 className="font-semibold mb-2">Update Instructions</h3>
                      <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                        <li>Download and install the Firmware Update Tool (FUT)</li>
                        <li>Connect your device to your computer via USB</li>
                        <li>Launch FUT and select your device</li>
                        <li>Follow the on-screen instructions to update firmware</li>
                        <li>Do not disconnect during the update process</li>
                      </ol>
                    </div>
                  </div>
                </CardContent> */}
              </Card>
            </TabsContent>

            {/* Software Licenses Tab */}
            <TabsContent value="licenses" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Software License Management</CardTitle>
                  <CardDescription>Manage your IKA software licenses and activations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {licenses.map((license) => (
                      <div key={license.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">{license.software}</h3>
                          <Badge variant={license.status === "Active" ? "default" : "destructive"}>
                            {license.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div>
                            <p className="font-medium">License Key</p>
                            <p className="font-mono">{license.licenseKey}</p>
                          </div>
                          <div>
                            <p className="font-medium">Expiry Date</p>
                            <p>{license.expiryDate}</p>
                          </div>
                          <div>
                            <p className="font-medium">Seats</p>
                            <p>
                              {license.usedSeats}/{license.seats} used
                            </p>
                          </div>
                          <div>
                            <p className="font-medium">Status</p>
                            <p>{license.status}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2 mt-4">
                          <Button size="sm" variant="outline">
                            <Shield className="h-4 w-4 mr-2" />
                            Manage Seats
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Download Software
                          </Button>
                          {license.status === "Expiring Soon" && (
                            <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                              <Clock className="h-4 w-4 mr-2" />
                              Renew License
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-6" />

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Activate New License</h3>
                    {/* <form className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="license-key">License Key</Label>
                        <Input id="license-key" placeholder="Enter your license key" className="font-mono" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="software-type">Software Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select software" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="labworldsoft">labworldsoft®</SelectItem>
                            <SelectItem value="calvin">Calvin Connect</SelectItem>
                            <SelectItem value="process-control">Process Control Software</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button type="submit" className="bg-[#00599c] hover:bg-[#004080]">
                        Activate License
                      </Button>
                    </form> */}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal and company information</CardDescription>
                </CardHeader>
                <CardContent>
                  {profileState?.error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                      <p className="text-sm text-red-800">{profileState.error}</p>
                    </div>
                  )}

                  {profileState?.success && (
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
                      <p className="text-sm text-green-800">{profileState.message}</p>
                    </div>
                  )}

                  <form action={profileAction} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="profile-title">Title</Label>
                        <Select name="title" defaultValue={user?.title}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select title" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Mr.">Mr.</SelectItem>
                            <SelectItem value="Ms.">Ms.</SelectItem>
                            <SelectItem value="Dr.">Dr.</SelectItem>
                            <SelectItem value="Prof.">Prof.</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="profile-firstName">First Name</Label>
                        <Input id="profile-firstName" name="firstName" defaultValue={user?.firstName} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="profile-lastName">Last Name</Label>
                        <Input id="profile-lastName" name="lastName" defaultValue={user?.lastName} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="profile-email">Email</Label>
                        <Input id="profile-email" name="email" type="email" defaultValue={user?.email} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="profile-phone">Phone</Label>
                        <Input id="profile-phone" name="phone" defaultValue={user?.phone} />
                      </div>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="profile-company">Company</Label>
                        <Input id="profile-company" name="company" defaultValue={user?.company} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="profile-department">Department</Label>
                        <Input id="profile-department" name="department" defaultValue={user?.department} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="profile-address1">Address 1</Label>
                      <Input id="profile-address1" name="address1" defaultValue={user?.address1} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="profile-address2">Address 2</Label>
                      <Input id="profile-address2" name="address2" defaultValue={user?.address2} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="profile-zipCode">Zip / Postal Code</Label>
                        <Input id="profile-zipCode" name="zipCode" defaultValue={user?.zipCode} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="profile-city">City</Label>
                        <Input id="profile-city" name="city" defaultValue={user?.city} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="profile-country">Country</Label>
                        <Select name="country" defaultValue={user?.country}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="United States">United States</SelectItem>
                            <SelectItem value="Germany">Germany</SelectItem>
                            <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                            <SelectItem value="France">France</SelectItem>
                            <SelectItem value="Canada">Canada</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="profile-state">State / Province</Label>
                        <Input id="profile-state" name="state" defaultValue={user?.state} />
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="profile-marketingConsent"
                        name="marketingConsent"
                        defaultChecked={user?.marketingConsent}
                      />
                      <Label htmlFor="profile-marketingConsent">
                        I consent to receiving marketing communications from IKA
                      </Label>
                    </div>

                    <Button type="submit" className="w-full bg-[#00599c] hover:bg-[#004080]" disabled={isUpdatingProfile}>
                      {isUpdatingProfile ? "Updating..." : "Update Profile"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AuthGuard>
  )
}
