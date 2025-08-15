"use client"

import { useAuth } from "@/app/context/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function AuthGuard({ children, requireAuth = true, redirectTo = "/en/login" }) {
  const { isLoggedIn, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (requireAuth && !isLoggedIn) {
        // User needs to be logged in but isn't
        router.push(redirectTo)
      } else if (!requireAuth && isLoggedIn) {
        // User shouldn't be logged in but is (e.g., login page)
        router.push("/dashboard")
      }
    }
  }, [isLoggedIn, isLoading, requireAuth, redirectTo, router])

  // Show loading while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00599c] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Don't render children if auth requirements aren't met
  if (requireAuth && !isLoggedIn) {
    return null
  }

  if (!requireAuth && isLoggedIn) {
    return null
  }

  return children
}
