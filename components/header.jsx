"use client"

import { useState, useEffect } from "react"
import { Search, ShoppingCart, User, Globe, Menu, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Beaker, ArrowRight } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

const productSuggestions = [
  { name: "IKA RV 10 Digital", category: "Rotary Evaporators", type: "product", branch: "laboratory" },
  { name: "EUROSTAR 100 Digital", category: "Overhead Stirrers", type: "product", branch: "laboratory" },
  { name: "C-MAG HS 7", category: "Magnetic Stirrers", type: "product", branch: "laboratory" },
  { name: "T 25 Digital ULTRA-TURRAX", category: "Dispersers", type: "product", branch: "laboratory" },
  { name: "HB 10 Digital Heating Bath", category: "Heating Baths", type: "product", branch: "laboratory" },
  { name: "Pilot Plants", category: "Process Technology", type: "product", branch: "process" },
  { name: "Inline Dispersers", category: "Process Technology", type: "product", branch: "process" },
  { name: "Solid-liquid Mixers", category: "Process Technology", type: "product", branch: "process" },
  { name: "Industrial Mills", category: "Process Technology", type: "product", branch: "process" },
]

export function Header() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false)

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIfMobile()

    // Add event listener
    window.addEventListener("resize", checkIfMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  // Close mobile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileDropdownOpen && !event.target.closest(".relative")) {
        setMobileDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [mobileDropdownOpen])

  // Determine current branch from pathname
  const getCurrentBranch = () => {
    if (pathname.startsWith("/process")) return "process"
    if (pathname.startsWith("/bioprocessing")) return "bioprocessing"
    if (pathname.startsWith("/ev-battery")) return "ev-battery"
    return "laboratory"
  }

  const currentBranch = getCurrentBranch()

  const handleSearchChange = (value) => {
    setSearchQuery(value)
    if (value.length > 0) {
      const filtered = productSuggestions
        .filter(
          (item) =>
            (item.branch === currentBranch || currentBranch === "laboratory") &&
            (item.name.toLowerCase().includes(value.toLowerCase()) ||
              item.category.toLowerCase().includes(value.toLowerCase())),
        )
        .slice(0, 8)
      setSuggestions(filtered)
      setShowSuggestions(true)
    } else {
      setShowSuggestions(false)
      setSuggestions([])
    }
  }

  const getNavigationItems = () => {
    switch (currentBranch) {
      case "process":
        return [
          { name: "Products", href: "/process/products" },
          { name: "Process", href: "#" },
          { name: "Industry", href: "#" },
          { name: "Services", href: "#" },
          { name: "Download Center", href: "#" },
          { name: "Company", href: "#" },
          { name: "News", href: "#" },
          { name: "Career", href: "#" },
          { name: "Contact", href: "#" },
          
        ]
      case "bioprocessing":
        return [
          { name: "Products", href: "/bioprocessing/products" },
          { name: "Solutions", href: "/bioprocessing/solutions" },
          { name: "Applications", href: "/bioprocessing/applications" },
          { name: "Services", href: "/bioprocessing/services" },
          { name: "Support", href: "/bioprocessing/support" },
          { name: "Careers", href: "/careers" },
        ]
      case "ev-battery":
        return [
          { name: "Products", href: "/ev-battery/products" },
          { name: "Solutions", href: "/ev-battery/solutions" },
          { name: "Technology", href: "/ev-battery/technology" },
          { name: "Services", href: "/ev-battery/services" },
          { name: "Resources", href: "/ev-battery/resources" },
          { name: "Careers", href: "/careers" },
        ]
      default: // laboratory
        return [
          { name: "Products", href: "/products" },
          { name: "Services", href: "#" },
          { name: "Knowledge Center", href: "#" },
          { name: "Company", href: "#" },
          { name: "Careers", href: "#" },
          { name: "Contact", href: "#" },
        ]
    }
  }

  const navigationItems = getNavigationItems()

  const handleNavigate = (href) => {
    router.push(href)
    setMobileMenuOpen(false)
  }

  const branchOptions = [
    { name: "Laboratory Technology", branch: "laboratory", href: "/" },
    { name: "Process Technology", branch: "process", href: "/process" },
    { name: "BioProcessing Solutions", branch: "bioprocessing", href: "#" },
    { name: "EV Battery Solutions", branch: "ev-battery", href: "#" },
  ]

  return (
    <header className="border-b bg-white sticky top-0 z-40">
      {/* Top bar */}
      <div className="border-b bg-gray-50 px-4 py-2">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          {/* Branch selector - visible on desktop, hidden on mobile */}
          <div className="hidden md:flex items-center gap-4">
            {branchOptions.map((option) => (
              <button
                key={option.branch}
                onClick={() => router.push(option.href)}
                className={`transition-colors ${
                  currentBranch === option.branch ? "text-blue-600 font-medium" : "text-gray-600 hover:text-blue-600"
                }`}
              >
                {option.name}
              </button>
            ))}
          </div>

          {/* Branch selector dropdown - visible on mobile only */}
          <div className="md:hidden relative">
            <button
              className="flex items-center gap-1 text-gray-700 font-medium"
              onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
            >
              {branchOptions.find((opt) => opt.branch === currentBranch)?.name || "Select Division"}
              <ChevronDown className={`h-4 w-4 transition-transform ${mobileDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {mobileDropdownOpen && (
              <div className="absolute left-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg w-64 z-50">
                {branchOptions.map((option) => (
                  <button
                    key={option.branch}
                    onClick={() => {
                      router.push(option.href)
                      setMobileDropdownOpen(false)
                    }}
                    className={`block w-full text-left px-4 py-2 ${
                      currentBranch === option.branch ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"
                    }`}
                  >
                    {option.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-xs px-2">
              <Globe className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">EN</span>
            </Button>
            <Button variant="ghost" size="sm" className="text-xs px-2">
              <User className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-xs px-2">
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold text-blue-600">
                <a href="/">
                  <img src="/logo.webp" width="80px" />
                </a> 
              </div>
            </div>
          </div>

          {/* Search - adjusted for mobile */}
          <div className="flex-1 max-w-md mx-2 sm:mx-8 relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 z-10" />
              <Input
                placeholder={isMobile ? "Search..." : "Search products, applications..."}
                className="pl-10"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                onFocus={() => searchQuery.length > 0 && setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              />

              {/* Search Suggestions Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-50 max-h-80 overflow-y-auto">
                  <div className="p-2">
                    <div className="text-xs text-gray-500 px-3 py-2 border-b">
                      {suggestions.length} suggestion{suggestions.length !== 1 ? "s" : ""} found
                    </div>
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded flex items-center justify-between group transition-colors"
                        onClick={() => {
                          setSearchQuery(suggestion.name)
                          setShowSuggestions(false)
                          console.log("Navigate to:", suggestion)
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-1.5 bg-gray-100 rounded group-hover:bg-[#00599c] group-hover:text-white transition-colors">
                            {suggestion.type === "product" ? (
                              <Search className="h-3 w-3" />
                            ) : (
                              <Beaker className="h-3 w-3" />
                            )}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 text-sm">{suggestion.name}</div>
                            <div className="text-xs text-gray-500">{suggestion.category}</div>
                          </div>
                        </div>
                        <div className="text-xs text-gray-400 group-hover:text-gray-600">
                          {suggestion.type === "product" ? "Product" : "Category"}
                        </div>
                      </button>
                    ))}

                    <div className="border-t mt-2 pt-2">
                      <button
                        className="w-full text-left px-3 py-2 text-[#00599c] hover:bg-blue-50 rounded font-medium text-sm flex items-center gap-2"
                        onClick={() => {
                          setShowSuggestions(false)
                          console.log("View all results for:", searchQuery)
                        }}
                      >
                        <ArrowRight className="h-4 w-4" />
                        View all results for "{searchQuery}"
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {navigationItems.map((item) => (
              <button
                key={item.name}
                onClick={() => router.push(item.href)}
                className={`hover:text-blue-600 transition-colors ${
                  pathname === item.href ? "text-blue-600 font-medium" : "text-gray-700"
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85vw] sm:w-[350px] p-0">
                <SheetHeader className="p-4 border-b">
                  <SheetTitle className="text-left">Menu</SheetTitle>
                </SheetHeader>

                <div className="overflow-y-auto h-full py-4">
                  {/* Mobile Navigation */}
                  <div className="px-4 pb-4 border-b">
                    <p className="text-sm font-medium text-gray-500 mb-2">Navigation</p>
                    <nav className="space-y-1">
                      {navigationItems.map((item) => (
                        <button
                          key={item.name}
                          onClick={() => handleNavigate(item.href)}
                          className={`block w-full text-left py-2 px-3 rounded-md ${
                            pathname === item.href
                              ? "bg-blue-50 text-blue-600 font-medium"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {item.name}
                        </button>
                      ))}
                    </nav>
                  </div>

                  {/* Mobile Branch Selector */}
                  <div className="px-4 py-4 border-b">
                    <p className="text-sm font-medium text-gray-500 mb-2">Divisions</p>
                    <div className="space-y-1">
                      {branchOptions.map((option) => (
                        <button
                          key={option.branch}
                          onClick={() => {
                            router.push(option.href)
                            setMobileMenuOpen(false)
                          }}
                          className={`block w-full text-left py-2 px-3 rounded-md ${
                            currentBranch === option.branch
                              ? "bg-blue-50 text-blue-600 font-medium"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {option.name}
                        </button>
                      ))}
                    </div>
                  </div>

                 
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
