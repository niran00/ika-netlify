"use client"

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/context/auth-context"
import { useCart } from '@/app/context/cart-context'
import { loginUser, registerUser } from "../actions/auth"
import { useActionState } from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export default function CheckoutPage() {
  const [skipAccount, setSkipAccount] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 3

  const [loginState, loginAction, isLoggingIn] = useActionState(loginUser, null)
  const [registerState, registerAction, isRegistering] = useActionState(registerUser, null)

  const { cartItems, removeFromCart, updateQuantity, getCartTotal, getCartItemsCount, clearCart } = useCart()
  const total = getCartTotal()
  const itemCount = getCartItemsCount()

  const { login, user, isLoggedIn } = useAuth()
  const router = useRouter()

  const [guestShipping, setGuestShipping] = useState(null)

  useEffect(() => {
    if (isLoggedIn) setCurrentStep(2)

    if (!isLoggedIn && typeof window !== "undefined") {
      const guestData = sessionStorage.getItem("guestCheckoutData")
      if (guestData) setGuestShipping(JSON.parse(guestData))
    }
  }, [isLoggedIn])

  useEffect(() => {
    const userData = loginState?.user || registerState?.user
    if ((loginState?.success || registerState?.success) && userData) {
      login(userData)
      setCurrentStep(2)
    }
  }, [loginState, registerState, login])

  const handleSkipAccountChange = (checked) => setSkipAccount(checked)

  const handleSessionSave = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData.entries())
    sessionStorage.setItem("guestCheckoutData", JSON.stringify(data))
    setGuestShipping(data)
    setCurrentStep(2)
  }

  const handlePaymentSelect = () => setCurrentStep(3)
  const handleConfirmOrder = () => alert("Order Confirmed!")

  const progressWidth = `${(currentStep / totalSteps) * 100}%`

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div
          className="bg-[#00599c] h-2 rounded-full transition-all duration-300"
          style={{ width: progressWidth }}
        />
      </div>
      <p className="mb-6 text-sm text-gray-600">Step {currentStep} of {totalSteps}</p>

      {/* Step 1: Login/Register/Guest */}
      {currentStep === 1 && !isLoggedIn && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Login */}
          <div className="p-6 border rounded-lg bg-white shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Login</h2>
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
          </div>

          {/* Register / Guest */}
          <div className="p-6 border rounded-lg bg-white shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Create an Account or Continue as Guest</h2>
            {registerState?.error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-800">{registerState.error}</p>
              </div>
            )}
            <form onSubmit={skipAccount ? handleSessionSave : registerAction} className="space-y-6">
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

              <div className="bg-gray-50 p-3 rounded-md border space-y-2">
                <div className="flex items-start space-x-2">
                  <Checkbox id="skipAccount" checked={skipAccount} onCheckedChange={handleSkipAccountChange} />
                  <Label htmlFor="skipAccount" className="text-sm font-medium">
                    Don’t create customer account
                  </Label>
                </div>
                <p className="text-xs text-gray-500">Checkout without creating an account.</p>
              </div>

              {!skipAccount && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Password*</Label>
                    <Input id="password" name="password" type="password" required />
                    <p className="text-xs text-gray-500">Min 8 characters.</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone*</Label>
                    <Input id="phone" name="phone" required />
                  </div>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-[#00599c] hover:bg-[#004080]"
                disabled={isRegistering && !skipAccount}
              >
                {skipAccount ? "Continue as Guest" : isRegistering ? "Registering..." : "NEXT"}
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* Step 2: Payment */}
      {currentStep === 2 && (
        <div className="p-6 border rounded-lg bg-white shadow-sm max-w-lg mx-auto">
          <h2 className="text-lg font-semibold mb-4">Select Payment Method</h2>
          <div className="space-y-4">
            <label className="flex items-center space-x-2 border p-4 rounded-md cursor-pointer hover:bg-gray-50">
              <input type="radio" name="payment" value="cash" defaultChecked className="accent-[#00599c]" />
              <span>Cash in advance</span>
            </label>
            <Button
              onClick={handlePaymentSelect}
              className="w-full bg-[#00599c] hover:bg-[#004080]"
            >
              Continue to Confirmation
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Confirmation */}
      {currentStep === 3 && (
        <div className="max-w-6xl mx-auto bg-white border rounded-lg shadow-md p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Order Items */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold border-b pb-4 mb-4">Order Confirmation</h2>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="px-4 py-2 text-left">Product</th>
                  <th className="px-4 py-2 text-left">Price</th>
                  <th className="px-4 py-2 text-left">Quantity</th>
                  <th className="px-4 py-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => {
                  const priceNum =
                    typeof item.price === "string"
                      ? parseFloat(item.price.replace(/[^0-9.-]+/g, "")) || 0
                      : item.price || 0;
                  return (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 flex items-center space-x-3">
                        <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-12 h-12 object-cover rounded" />
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-gray-500 text-xs">ID: {item.itemNumber}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[#00599c] font-medium">{item.price}</td>
                      <td className="px-4 py-3">{item.quantity}</td>
                      <td className="px-4 py-3 text-right font-medium">${(priceNum * item.quantity).toFixed(2)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Right Column - Summary & Addresses */}
          <div className="lg:col-span-1 space-y-6 bg-gray-50 p-4 rounded-lg">
            {/* Order Summary */}
            <div className="space-y-2 border-b pb-4">
              <h3 className="font-semibold text-lg">Order Summary</h3>
              <div className="flex justify-between text-sm">
                <span>Items:</span>
                <span>{itemCount}</span>
              </div>
              {total > 0 && (
                <div className="flex justify-between text-sm font-semibold">
                  <span>Subtotal:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              )}
              <div className="text-gray-500 text-xs mt-2">
                * Prices shown are estimates. Final pricing will be provided in your quote.
              </div>
            </div>

            <EditableAddresses user={isLoggedIn ? user : guestShipping} />

            {/* Payment */}
            <div className="border-b pb-4">
              <h3 className="font-semibold mb-2">Payment Method</h3>
              <p>Cash in advance</p>
            </div>

            <Button
              onClick={handleConfirmOrder}
              className="w-full bg-[#00599c] text-white font-medium py-3"
            >
              Confirm Order
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

// Editable Addresses component
function EditableAddresses({ user }) {
  const [editing, setEditing] = useState(false)
  const [shipping, setShipping] = useState(user || {})
  const [billing, setBilling] = useState(user || {})
  const [tempShipping, setTempShipping] = useState(user || {})
  const [tempBilling, setTempBilling] = useState(user || {})

  useEffect(() => {
    if (user) {
      setShipping(user)
      setBilling(user)
      setTempShipping(user)
      setTempBilling(user)
    }
  }, [user])

  const handleChange = (e, type = "shipping") => {
    const { name, value } = e.target
    if (type === "shipping") setTempShipping(prev => ({ ...prev, [name]: value }))
    else setTempBilling(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    setShipping(tempShipping)
    setBilling(tempBilling)
    setEditing(false)
  }

  const handleCancel = () => {
    setTempShipping(shipping)
    setTempBilling(billing)
    setEditing(false)
  }

  return (
    <div className="space-y-4 border-b pb-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Shipping Address</h3>
        {!editing && (
          <button onClick={() => setEditing(true)} className="text-sm text-blue-600 hover:underline">
            Edit
          </button>
        )}
      </div>

      {editing ? (
        <div className="space-y-2">
          {["firstName","lastName","address1","city","country","zipCode","phone"].map(field => (
            <Input
              key={field}
              name={field}
              value={tempShipping[field] || ""}
              onChange={e => handleChange(e, "shipping")}
              placeholder={field}
            />
          ))}
        </div>
      ) : (
        <div className="text-sm">
          <p>{shipping.firstName} {shipping.lastName}</p>
          <p>{shipping.address1}, {shipping.city}, {shipping.country}</p>
          <p>{shipping.zipCode}</p>
          <p>{shipping.phone}</p>
        </div>
      )}

      <h3 className="font-semibold">Billing Address</h3>
      {editing ? (
        <div className="space-y-2">
          {["firstName","lastName","address1","city","country","zipCode","phone"].map(field => (
            <Input
              key={field}
              name={field}
              value={tempBilling[field] || tempShipping[field] || ""}
              onChange={e => handleChange(e, "billing")}
              placeholder={field}
            />
          ))}

          <div className="flex space-x-2 mt-2">
            <Button onClick={handleSave} className="bg-[#00599c] hover:bg-green-700">Save</Button>
            <Button onClick={handleCancel} className="bg-[#00599c] hover:bg-gray-400 text-black">Cancel</Button>
          </div>
        </div>
      ) : (
        <div className="text-sm">
          <p>{billing.firstName} {billing.lastName}</p>
          <p>{billing.address1}, {billing.city}, {billing.country}</p>
          <p>{billing.zipCode}</p>
          <p>{billing.phone}</p>
        </div>
      )}
    </div>
  )
}
