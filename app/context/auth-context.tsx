"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { getCurrentUser } from "@/app/[lang]/actions/auth"

const AuthContext = createContext({
  user: null,
  isLoading: true,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  updateUser: () => {},
})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await getCurrentUser()
        setUser(currentUser)
      } catch (error) {
        console.error("Auth check failed:", error)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = (userData) => {
    setUser(userData)
  }

  const logout = () => {
    setUser(null)
  }

  const updateUser = (updatedUserData) => {
    setUser(updatedUserData)
  }

  const value = {
    user,
    isLoading,
    isLoggedIn: !!user,
    login,
    logout,
    updateUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
