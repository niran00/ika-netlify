"use client"

import { useState, useEffect } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ShoppingCart, Plus, Minus, Trash2, FileText, X } from 'lucide-react'
import { useCart } from '@/app/context/cart-context'
import { useAuth } from '@/app/context/auth-context'
import { QuoteRequestDialog } from '../quote-request-dialog'

export function CartSidebar({ children }) {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, getCartItemsCount, clearCart } = useCart()
  const { isLoggedIn } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [showQuoteDialog, setShowQuoteDialog] = useState(false)

  const itemCount = getCartItemsCount()
  const total = getCartTotal()

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId)
    } else {
      updateQuantity(productId, newQuantity)
    }
  }

  const handleRequestQuote = () => {
    setShowQuoteDialog(true)
    setIsOpen(false)
  }

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        
          <SheetTrigger asChild>
            <button
              type="button"
              className="text-gray-600 hover:text-[#00599c] p-2 relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {mounted && itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#00599c] text-white text-xs h-5 w-5 flex items-center justify-center p-0 rounded-full">
                  {itemCount}
                </span>
              )}
            </button>
          </SheetTrigger>

        
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader className="space-y-4">
            <div className="flex items-center justify-between">
              <SheetTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Shopping Cart ({itemCount})
              </SheetTitle>
              {cartItems.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </SheetHeader>

          <div className="flex flex-col h-full">
            {cartItems.length === 0 ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Your cart is empty</h3>
                    <p className="text-gray-500">Add some products to get started</p>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto py-4 space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex gap-4">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-16 h-16 object-contain bg-gray-50 rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm line-clamp-2 mb-1">{item.name}</h4>
                          <p className="text-xs text-gray-500 mb-2">ID: {item.itemNumber}</p>
                          <div className="flex items-center justify-between">
                            <div className="text-[#00599c] font-semibold text-sm">
                              {item.price}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 p-1"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                        <span className="text-sm text-gray-600">Quantity:</span>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cart Summary */}
                <div className="border-t border-gray-200 pt-4 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Items:</span>
                      <span>{itemCount}</span>
                    </div>
                    {total > 0 && (
                      <div className="flex justify-between text-sm">
                        <span>Subtotal:</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    )}
                    <Separator />
                    <div className="text-sm text-gray-600">
                      <p>* Prices shown are estimates. Final pricing will be provided in your quote.</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                     


                    <Button asChild className="w-full bg-[#00599c] hover:bg-[#004080] text-white">
                      <Link href="/checkout">
                        <FileText className="h-4 w-4 mr-2" />
                        Checkout
                      </Link>
                    </Button>


                    <Button 
                      onClick={handleRequestQuote}
                      className="w-full bg-[#00599c] hover:bg-[#004080] text-white"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Request Quote
                    </Button>
                    {!isLoggedIn && (
                      <p className="text-xs text-center text-gray-500">
                        <a href="/en/login" className="text-[#00599c] hover:underline">
                          Sign in
                        </a> to save your cart and track quotes
                      </p>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <QuoteRequestDialog 
        open={showQuoteDialog} 
        onOpenChange={setShowQuoteDialog}
        cartItems={cartItems}
      />
    </>
  )
}
