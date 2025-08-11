"use client"

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { FileText, Send, CheckCircle } from 'lucide-react'
import { useCart } from '@/app/context/cart-context'
import { useAuth } from '@/app/context/auth-context'

export function QuoteRequestDialog({ open, onOpenChange, cartItems }) {
  const { submitQuoteRequest, isLoading, getCartTotal, getCartItemsCount } = useCart()
  const { user, isLoggedIn } = useAuth()
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    company: user?.company || '',
    phone: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [quoteId, setQuoteId] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const result = await submitQuoteRequest(formData)
    
    if (result.success) {
      setQuoteId(result.quoteId)
      setSubmitted(true)
    } else {
      // Handle error - you might want to show a toast or error message
      console.error('Failed to submit quote request:', result.error)
    }
  }

  const handleClose = () => {
    onOpenChange(false)
    // Reset form after a delay to allow dialog to close
    setTimeout(() => {
      setSubmitted(false)
      setQuoteId('')
      if (!isLoggedIn) {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          company: '',
          phone: '',
          message: ''
        })
      }
    }, 300)
  }

  const total = getCartTotal()
  const itemCount = getCartItemsCount()

  if (submitted) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="max-w-md">
          <div className="text-center space-y-4 py-6">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Quote Request Submitted!</h3>
              <p className="text-gray-600 mt-2">
                Your quote request has been submitted successfully.
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Quote ID: <span className="font-mono font-semibold">{quoteId}</span>
              </p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 text-sm">
              <p className="text-[#00599c]">
                We'll review your request and get back to you within 24 hours with a detailed quote.
              </p>
            </div>
            <Button onClick={handleClose} className="w-full">
              Continue Shopping
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-[#00599c]" />
            Request Quote
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Cart Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Quote Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Items:</span>
                <span>{itemCount}</span>
              </div>
              {total > 0 && (
                <div className="flex justify-between">
                  <span>Estimated Total:</span>
                  <span className="font-semibold">${total.toFixed(2)}</span>
                </div>
              )}
            </div>
            <Separator className="my-3" />
            <div className="max-h-32 overflow-y-auto space-y-2">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-xs">
                  <span className="truncate mr-2">{item.name}</span>
                  <span>Qty: {item.quantity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Contact Information</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  disabled={isLoggedIn}
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  disabled={isLoggedIn}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                disabled={isLoggedIn}
              />
            </div>

            <div>
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                disabled={isLoggedIn}
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label htmlFor="message">Additional Message</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Any specific requirements or questions about the products..."
                rows={3}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-[#00599c] hover:bg-[#004080]"
            >
              {isLoading ? (
                <>
                  <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Submit Quote Request
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
