"use client"

import { useState, useEffect } from "react"

interface RegionData {
  country_code: string
  country_name: string
  city: string
  region: string
}

function getClientCookie(name: string): string | null {
  if (typeof document === "undefined") return null
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null
  return null
}

function setClientCookie(name: string, value: string, days = 365) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${name}=${value}; path=/; expires=${expires}`
}

export function useRegion() {
  const [region, setRegion] = useState<string>("")
  const [regionData, setRegionData] = useState<RegionData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 1. Try reading cookie first
    const cookieRegion = getClientCookie("region")

    if (cookieRegion) {
      setRegion(cookieRegion)
      setLoading(false)
      return
    }

    // 2. Fallback: detect via IP API
    fetch("https://ipapi.co/json/")
      .then((response) => response.json())
      .then((data: RegionData) => {
        setRegionData(data)
        setRegion(data.country_code)

        // set cookie so middleware & SSR pick it up
        setClientCookie("region", data.country_code)
      })
      .catch((error) => {
        console.error("Failed to fetch region:", error)
        setRegion("US") // default fallback
        setClientCookie("region", "US")
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  // ✅ update cookie instead of just localStorage
  const updateRegion = (newRegion: string) => {
    setRegion(newRegion)
    setClientCookie("region", newRegion)

    // Refresh page so SSR data updates
    window.location.reload()
  }

  return { region, regionData, loading, updateRegion }
}
