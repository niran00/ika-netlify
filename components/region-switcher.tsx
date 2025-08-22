"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { countries } from "@/lib/translations"
import { useRegion } from "@/hooks/use-region"
import { MapPin } from "lucide-react"

export function RegionSwitcher() {
  const { region, updateRegion, loading } = useRegion()

  if (loading) {
    return (
      <Button variant="outline" size="sm" disabled className="gap-2 bg-transparent">
        <MapPin className="h-4 w-4" />
        Loading...
      </Button>
    )
  }

  const currentCountry = countries.find((country) => country.code === region)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <MapPin className="h-4 w-4" />
          {currentCountry?.flag} {currentCountry?.name || region}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="max-h-60 overflow-y-auto">
        {countries.map((country) => (
          <DropdownMenuItem key={country.code} onClick={() => updateRegion(country.code)} className="gap-2">
            {country.flag} {country.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
