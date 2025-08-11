"use client"

import { useAuth } from '@/app/context/auth-context'

export function AuthenticatedOnly({ children, fallback = null }) {
  const { isLoggedIn, isLoading } = useAuth()
  
  if (isLoading) return fallback
  return isLoggedIn ? children : fallback
}

export function GuestOnly({ children, fallback = null }) {
  const { isLoggedIn, isLoading } = useAuth()
  
  if (isLoading) return fallback
  return !isLoggedIn ? children : fallback
}

export function ConditionalAuth({ authenticated, guest, loading = null }) {
  const { isLoggedIn, isLoading } = useAuth()
  
  if (isLoading) return loading
  return isLoggedIn ? authenticated : guest
}
