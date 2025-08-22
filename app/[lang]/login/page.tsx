"use client"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {  registerUser } from "../actions/auth"
import { AuthGuard } from "@/components/authentication-components/auth-guard"
import { useAuth } from "@/app/context/auth-context"
import loginUserDB from "@/pages/api/oracles-test"


export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [loginState, setLoginState] = useState<any>(null)
  const [registerState, setRegisterState] = useState<any>(null)
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  // Redirect after login/register
  useEffect(() => {
    const user = loginState?.user || registerState?.user
    if ((loginState?.success || registerState?.success) && user) {
      login(user)
      router.push("/dashboard")
    }
  }, [loginState, registerState, login, router])

  // Handlers
  const handleLogin = async (formData: FormData) => {
    setIsLoggingIn(true)
    const result = await loginUserDB(formData)
    setLoginState(result)
    setIsLoggingIn(false)
  }

  const handleRegister = async (formData: FormData) => {
    setIsRegistering(true)
    const result = await registerUser(formData)
    setRegisterState(result)
    setIsRegistering(false)
  }

  return (
    <AuthGuard requireAuth={false}>
      <div className="min-h-screen flex flex-col justify-center bg-gray-50 px-4 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Info */}
          <div className="text-center md:text-left space-y-6">
            <div className="text-4xl font-bold text-[#00599c]">Welcome to IKA</div>
            <div className="text-center mb-8">
              <p className="text-gray-600 max-w-4xl mx-auto">
                Welcome to my IKA! In the context of your registration, we collect and process the data you provide exclusively for the following purposes:
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

                  <form
                    className="space-y-4"
                    onSubmit={async (e) => {
                      e.preventDefault()
                      const formData = new FormData(e.currentTarget)
                      await handleLogin(formData)
                    }}
                  >
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

                    <button type="submit" className="w-full bg-[#00599c] hover:bg-[#004080]" disabled={isLoggingIn}>
                      {isLoggingIn ? "Logging in..." : "Login"}
                    </button>
                  </form>
                </>
              ) : (
                <>
                  {registerState?.error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                      <p className="text-sm text-red-800">{registerState.error}</p>
                    </div>
                  )}

                  <form
                    className="space-y-4"
                    onSubmit={async (e) => {
                      e.preventDefault()
                      const formData = new FormData(e.currentTarget)
                      await handleRegister(formData)
                    }}
                  >
                    {/* Registration inputs go here */}
                    {/* ... keep your grid inputs like firstName, lastName, email, password, etc ... */}

                    <button type="submit" className="w-full bg-[#00599c] hover:bg-[#004080]" disabled={isRegistering}>
                      {isRegistering ? "Registering..." : "NEXT"}
                    </button>
                  </form>
                </>
              )}

              {/* Toggle link */}
              <div className="text-sm text-center mt-4">
                {isLogin ? (
                  <span>
                    Don’t have an account?{" "}
                    <span
                      role="button"
                      onClick={() => setIsLogin(false)}
                      className="text-[#00599c] hover:underline cursor-pointer"
                    >
                      Sign up
                    </span>
                  </span>
                ) : (
                  <span>
                    Already have an account?{" "}
                    <span
                      role="button"
                      onClick={() => setIsLogin(true)}
                      className="text-[#00599c] hover:underline cursor-pointer"
                    >
                      Log in
                    </span>
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthGuard>
  )
}
