"use client"

import { useState, useEffect } from "react"

interface RegionData {
  country_code: string
  country_name: string
  city: string
  region: string
}

export function useRegion() {
  const [region, setRegion] = useState<string>("")
  const [regionData, setRegionData] = useState<RegionData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if region is already stored in localStorage
    const storedRegion = localStorage.getItem("user-region")
    if (storedRegion) {
      setRegion(storedRegion)
      setLoading(false)
      return
    }
    if(!localStorage.getItem("user-region")) {
         // Fetch region from IP API
        fetch("https://ipapi.co/json/")
      .then((response) => response.json())
      .then((data: RegionData) => {
        setRegionData(data)
        setRegion(data.country_code)
        localStorage.setItem("user-region", data.country_code)
      })
      .catch((error) => {
        console.error("Failed to fetch region:", error)
        setRegion("US") // Default fallback
      })
      .finally(() => {
        setLoading(false)
    })
    }

   
  }, [])

  const updateRegion = (newRegion: string) => {
    setRegion(newRegion)
    localStorage.setItem("user-region", newRegion)
  }

  return { region, regionData, loading, updateRegion }
}
