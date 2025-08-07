"use client"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { loginUser, registerUser } from "../actions/auth"
import { useActionState } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { useAuth } from "@/app/context/auth-context"

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [loginState, loginAction, isLoggingIn] = useActionState(loginUser, null)
  const [registerState, registerAction, isRegistering] = useActionState(registerUser, null)
  const { login } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const user = loginState?.user || registerState?.user
    if ((loginState?.success || registerState?.success) && user) {
      login(user)
      router.push("/dashboard")
    }
  }, [loginState, registerState, login, router])

  return (
    <AuthGuard requireAuth={false}>
      <div className="min-h-screen flex flex-col justify-center bg-gray-50 px-4 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Info */}
          <div className="text-center md:text-left space-y-6">
            <div className="text-4xl font-bold text-[#00599c]">Welcome to IKA</div>
            
               <div className="text-center mb-8">
                   <p className="text-gray-600 max-w-4xl mx-auto">
                     Welcome to my IKA! In the context of your registration, we collect and process the data you provide (name,
                     address, contact and communication data) exclusively for the following purposes:
                   </p>
                </div>

                <div className="mb-8">
                   <ul className="max-w-4xl mx-auto space-y-2 text-sm text-gray-600">
                     <li>• Shopping in the IKA online shop</li>
                     <li>• Registration of your new IKA product</li>
                     <li>• Free warranty extension for your new IKA product</li>
                     <li>• Activation of your labworldsoft® and Calvin license</li>
                     <li>• Use of the firmware update tool (FUT)</li>
                     <li>• Registration of your decomposition vessel for pressure testing</li>
                     <li>• Registration of your devices for maintenance and calibration (e.g. pipettes)</li>
                     <li>• Changes to your stored personal data</li>
                   </ul>
                </div>

          </div>

          {/* Right Column - Card */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">
                {isLogin ? "Login to your account" : "Create a new account"}
              </CardTitle>
            </CardHeader>

            <CardContent>
              {isLogin ? (
                <>
                  {loginState?.error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                      <p className="text-sm text-red-800">{loginState.error}</p>
                    </div>
                  )}

                  <form action={loginAction} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">E-Mail</Label>
                      <Input id="login-email" name="email" type="email" required placeholder="Enter your email" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="login-password">Password</Label>
                      <Input id="login-password" name="password" type="password" required placeholder="Enter your password" />
                    </div>

                    <div className="text-sm">
                      <a href="#" className="text-[#00599c] hover:underline">Forgot your password?</a>
                    </div>

                    <Button type="submit" className="w-full bg-[#00599c] hover:bg-[#004080]" disabled={isLoggingIn}>
                      {isLoggingIn ? "Logging in..." : "Login"}
                    </Button>
                  </form>
                </>
              ) : (
                <>
                  {registerState?.error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                      <p className="text-sm text-red-800">{registerState.error}</p>
                    </div>
                  )}

                  
                  <form action={registerAction} className="space-y-4">
                  
                <div className="grid grid-cols-2 gap-4">  
                  
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Select name="title">
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
                  <Label htmlFor="firstName">First Name*</Label>
                  <Input id="firstName" name="firstName" required />
                </div>

                </div>

                <div className="grid grid-cols-2 gap-4">    
                


                <div className="space-y-2">
                  <Label htmlFor="email">E-Mail*</Label>
                  <Input id="email" name="email" type="email" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name*</Label>
                  <Input id="lastName" name="lastName" required />
                </div>
                
                </div>

                


                <div className="grid grid-cols-2 gap-4">            
                    <div className="space-y-2">
                      <Label htmlFor="password">Password*</Label>
                      <Input id="password" name="password" type="password" required />
                      <p className="text-xs text-gray-500">
                        Your password must contain at least 8 characters. The password is case sensitive.
                      </p>
                    </div>

                        <div className="space-y-2">
                      <Label htmlFor="phone">Phone*</Label>
                      <Input id="phone" name="phone" required />
                    </div>
                </div>     

                <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                   <Label htmlFor="company">Company</Label>
                   <Input id="company" name="company" />
                 </div>

                 <div className="space-y-2">
                   <Label htmlFor="department">Department</Label>
                   <Input id="department" name="department" />
                 </div>
                </div>  

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="address1">Address 1*</Label>
                      <Input id="address1" name="address1" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address2">Address 2</Label>
                      <Input id="address2" name="address2" />
                    </div>
                </div>      

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">Zip / Postal Code*</Label>
                    <Input id="zipCode" name="zipCode" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City*</Label>
                    <Input id="city" name="city" required />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Select name="country">
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Germany">Germany</SelectItem>
                        <SelectItem value="France">France</SelectItem>
                        <SelectItem value="Thailand">Thailand</SelectItem>
                        <SelectItem value="Canada">Malaysia</SelectItem>
                        <SelectItem value="United States">United States</SelectItem>                            
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State / Province</Label>
                    <Input id="state" name="state" placeholder="State / Province" />
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t">
                 
                  <div className="flex items-start space-x-2">
                    <Checkbox id="privacyConsent" name="privacyConsent" required />
                    <Label htmlFor="privacyConsent" className="text-sm">
                      I have read the privacy policy and accept it.*
                    </Label>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox id="marketingConsent" name="marketingConsent" />
                    <Label htmlFor="marketingConsent" className="text-sm">
                      I consent to receiving marketing communications from IKA.
                    </Label>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-[#00599c] hover:bg-[#004080]" disabled={isRegistering}>
                  {isRegistering ? "Registering..." : "NEXT"}
                </Button>
              </form>

                </>
              )}

              {/* Toggle link */}
              <div className="text-sm text-center mt-4">
                {isLogin ? (
                  <>
                    Don’t have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setIsLogin(false)}
                      className="text-[#00599c] hover:underline"
                    >
                      Sign up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setIsLogin(true)}
                      className="text-[#00599c] hover:underline"
                    >
                      Log in
                    </button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthGuard>
  )
}
