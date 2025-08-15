"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Plus, Check } from 'lucide-react'
import { useCart } from '@/app/context/cart-context'
import { cn } from '@/lib/utils'

export function CartButton({ 
  product, 
  quantity = 1, 
  variant = "default", 
  size = "default",
  className,
  showIcon = true,
  children 
}) {
  const { addToCart, isInCart, getCartItem } = useCart()
  const [isAdding, setIsAdding] = useState(false)
  const [justAdded, setJustAdded] = useState(false)

  const inCart = isInCart(product.id)
  const cartItem = getCartItem(product.id)

  const handleAddToCart = async () => {
    setIsAdding(true)
    
    // Add to cart
    addToCart(product, quantity)
    
    // Show success state
    setJustAdded(true)
    
    // Reset states
    setTimeout(() => {
      setIsAdding(false)
      setJustAdded(false)
    }, 1500)
  }

  const getButtonContent = () => {
    if (justAdded) {
      return (
        <>
          {showIcon && <Check className="h-4 w-4 mr-2" />}
          Added 
        </>
      )
    }
    
    if (isAdding) {
      return (
        <>
          {showIcon && <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />}
          Adding...
        </>
      )
    }

    if (inCart) {
      return (
        <>
          {showIcon && <ShoppingCart className="h-4 w-4 mr-2" />}
          {children || `In Cart (${cartItem?.quantity})`}
        </>
      )
    }

    return (
      <>
        {showIcon && <Plus className="h-4 w-4 mr-2" />}
        {children || "Add to Cart"}
      </>
    )
  }

  const getButtonVariant = () => {
    if (justAdded) return "default"
    if (inCart) return "outline"
    return variant
  }

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isAdding}
      variant={getButtonVariant()}
      size={size}
      className={cn(
        "transition-all duration-200",
        justAdded && "bg-green-600 hover:bg-green-700 text-white",
        inCart && "border-[#00599c] text-white hover:bg-[#00599c] hover:text-white",
        className
      )}
    >
      {getButtonContent()}
    </Button>
  )
}
