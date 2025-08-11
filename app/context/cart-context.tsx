"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './auth-context'

const CartContext = createContext()

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { user, isLoggedIn } = useAuth()

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('ika_cart')
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart))
      } catch (error) {
        console.error('Error loading cart from localStorage:', error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('ika_cart', JSON.stringify(cartItems))
  }, [cartItems])

  // Clear cart when user logs out
  useEffect(() => {
    if (!isLoggedIn) {
      // Optionally keep cart for guest users or clear it
      // For now, we'll keep it for guest users
    }
  }, [isLoggedIn])

  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id)
      
      if (existingItem) {
        // Update quantity if item already exists
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        // Add new item to cart
        return [...prevItems, { ...product, quantity, addedAt: new Date().toISOString() }]
      }
    })
  }

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      )
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      // For "On Request" items, we'll count them but not add to price
      if (item.price === "On Request") return total
      
      // Parse price if it's a number
      const price = typeof item.price === 'string' ? 
        parseFloat(item.price.replace(/[^0-9.-]+/g, "")) || 0 : 
        item.price || 0
      
      return total + (price * item.quantity)
    }, 0)
  }

  const getCartItemsCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const isInCart = (productId) => {
    return cartItems.some(item => item.id === productId)
  }

  const getCartItem = (productId) => {
    return cartItems.find(item => item.id === productId)
  }

  // Submit cart as quote request
  const submitQuoteRequest = async (contactInfo) => {
    setIsLoading(true)
    try {
      // Here you would typically send the cart data to your backend
      const quoteData = {
        items: cartItems,
        contactInfo,
        user: user || null,
        total: getCartTotal(),
        submittedAt: new Date().toISOString()
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log('Quote request submitted:', quoteData)
      
      // Clear cart after successful submission
      clearCart()
      
      return { success: true, quoteId: `Q${Date.now()}` }
    } catch (error) {
      console.error('Error submitting quote request:', error)
      return { success: false, error: error.message }
    } finally {
      setIsLoading(false)
    }
  }

  const value = {
    cartItems,
    isLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
    isInCart,
    getCartItem,
    submitQuoteRequest
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
