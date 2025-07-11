"use client"

import { useState, useEffect, useRef } from "react"
import { X,Zap,FlaskConical,Cog,Microscope, Search, ShoppingCart, User, Globe, Menu, ChevronDown } from "lucide-react"

// import {
//   Search,
//   ShoppingCart,
//   Menu,
//   ChevronDown,
//   Microscope,
//   Cog,
//   FlaskConical,
//   Zap,
//   X,
//   MessageCircle,
// } from "lucide-react"
import React from "react"
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

export function Header({ hidden }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false)


  const [showMegaMenu, setShowMegaMenu] = useState(false)

  const [hoveredProduct, setHoveredProduct] = useState(null)
  const hoverTimeoutRef = useRef(null)



const megaMenuData = {
  "LABORATORY TECHNOLOGY": {
    icon: Microscope,
    color: "bg-[#00599c]",
    description: "Advanced laboratory equipment for research and development",
    isActive: true,
    categories: [
      {
        title: "SEPARATION",
        items: ["Rotary Evaporators", "Centrifuges", "Filtration Systems"],
      },
      {
        title: "ELECTROCHEMISTRY",
        items: ["Electrochemistry Kit", "Screening System"],
      },
      {
        title: "MIXING",
        items: ["Magnetic Stirrers", "Overhead Stirrers", "Shakers", "Thermoshakers"],
      },
      {
        title: "CRUSHING",
        items: ["Dispersers", "Mills", "Single-Use Crushing / IVD"],
      },
      {
        title: "MEASURING VISCOSITY",
        items: ["Measuring Stirrers", "Viscometers"],
      },
      {
        title: "HEATING / COOLING / TEMPERING",
        items: ["Dry Block Heater", "Heating Baths", "Hot Plates", "Temperature Control", "Tempering Chambers"],
      },
    ],
  },
  "BIOPROCESSING SOLUTIONS": {
    icon: FlaskConical,
    color: "bg-gray-600",
    description: "Advanced bioreactor systems for pharmaceutical applications",
    isActive: false,
    categories: [
      {
        title: "BIOREACTORS",
        items: ["HABITAT eco", "HABITAT cyt", "Single-Use Systems"],
      },
      {
        title: "FERMENTATION",
        items: ["Microbial Fermentation", "Cell Culture", "Perfusion Systems"],
      },
    ],
  },
  "EV BATTERY SOLUTIONS": {
    icon: Zap,
    color: "bg-gray-600",
    description: "Cutting-edge solutions for EV battery manufacturing",
    isActive: false,
    categories: [
      {
        title: "MATERIAL PROCESSING",
        items: ["Cathode Materials", "Anode Materials", "Electrolyte Prep"],
      },
      {
        title: "CELL MANUFACTURING",
        items: ["Electrode Coating", "Cell Assembly", "Formation"],
      },
    ],
  },
  "PROCESS TECHNOLOGY": {
    icon: Cog,
    color: "bg-gray-600",
    description: "Industrial-scale processing equipment and pilot plants",
    isActive: false,
    categories: [
      {
        title: "REACTOR SYSTEMS",
        items: ["Synthesis Reactors", "High Viscosity Reactors"],
      },
      {
        title: "VACUUM TECHNOLOGY",
        items: ["Vacuum Pumps", "Controllers", "Systems"],
      },
      {
        title: "LIQUID HANDLING",
        items: ["Pipettes"],
      },
      {
        title: "CONTROLLING & MEASURING",
        items: ["Laboratory Software"],
      },
      {
        title: "CALORIMETRY",
        items: ["Calorimeters", "Decomposition Systems"],
      },
      {
        title: "FLOW CHEMISTRY",
        items: ["FLOW System"],
      },
    ],
  },
}

const navigationItems = [
  { name: "Products", href: "/products", hasDropdown: true },
  { name: "Services", href: "/services", hasDropdown: false },
  { name: "Knowledge Center", href: "/knowledge", hasDropdown: false },
  { name: "Company", href: "/company", hasDropdown: true },
  { name: "Career", href: "/career" },
  { name: "Contact", href: "/contact", hasDropdown: true },
]

// Product images for hover states
const productImages = [
  "/placeholder.svg",
  "/placeholder.svg",
  "/placeholder.svg",
]

// Default featured content
const defaultFeaturedContent = {
  image: "/placeholder.svg",
  title: "DISTILLATION HAS NEVER BEEN MORE EASY & INTELLIGENT",
  description: "Discover our latest rotary evaporator technology for efficient and intelligent distillation processes.",
}



  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  const handleNavigate = (href) => {
    router.push(href)
    setMobileMenuOpen(false)
    setShowMegaMenu(false)
  }

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
    setShowMegaMenu(true)
  }

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setShowMegaMenu(false)
      setHoveredProduct(null) // Reset hovered product when menu closes
    }, 100) // Small delay to prevent flickering
  }

  const handleProductHover = (productName) => {
    setHoveredProduct(productName)
  }

  const handleProductLeave = () => {
    setHoveredProduct(null)
  }

  // Get featured content based on hovered product
  const getFeaturedContent = () => {
    if (!hoveredProduct) return defaultFeaturedContent

    // Cycle through images based on product name hash
    const imageIndex =
      Math.abs(hoveredProduct.split("").reduce((a, b) => a + b.charCodeAt(0), 0)) % productImages.length

    return {
      image: productImages[imageIndex],
      title: `${hoveredProduct.toUpperCase()}`,
      description: `Advanced ${hoveredProduct.toLowerCase()} technology for laboratory and industrial applications. Discover our innovative solutions.`,
    }
  }

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
    }
  }, [])

  const featuredContent = getFeaturedContent()

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

  // const getNavigationItems = () => {
  //   switch (currentBranch) {
  //     case "process":
  //       return [
  //         { name: "Products", href: "/process/products" },
  //         { name: "Process", href: "#" },
  //         { name: "Industry", href: "#" },
  //         { name: "Services", href: "#" },
  //         { name: "Download Center", href: "#" },
  //         { name: "Company", href: "#" },
  //         { name: "News", href: "#" },
  //         { name: "Career", href: "#" },
  //         { name: "Contact", href: "#" },
          
  //       ]
  //     case "bioprocessing":
  //       return [
  //         { name: "Products", href: "/bioprocessing/products" },
  //         { name: "Solutions", href: "/bioprocessing/solutions" },
  //         { name: "Applications", href: "/bioprocessing/applications" },
  //         { name: "Services", href: "/bioprocessing/services" },
  //         { name: "Support", href: "/bioprocessing/support" },
  //         { name: "Careers", href: "/careers" },
  //       ]
  //     case "ev-battery":
  //       return [
  //         { name: "Products", href: "/ev-battery/products" },
  //         { name: "Solutions", href: "/ev-battery/solutions" },
  //         { name: "Technology", href: "/ev-battery/technology" },
  //         { name: "Services", href: "/ev-battery/services" },
  //         { name: "Resources", href: "/ev-battery/resources" },
  //         { name: "Careers", href: "/careers" },
  //       ]
  //     default: // laboratory
  //       return [
  //         { name: "Products", href: "/products" },
  //         { name: "Services", href: "#" },
  //         { name: "Knowledge Center", href: "#" },
  //         { name: "Company", href: "#" },
  //         { name: "Careers", href: "#" },
  //         { name: "Contact", href: "#" },
  //       ]
  //   }
  // }

  // const navigationItems = getNavigationItems()

  // const handleNavigate = (href) => {
  //   router.push(href)
  //   setMobileMenuOpen(false)
  // }

  const branchOptions = [
    { name: "Laboratory Technology", branch: "laboratory", href: "/" },
    { name: "Process Technology", branch: "process", href: "/process" },
    { name: "BioProcessing Solutions", branch: "bioprocessing", href: "#" },
    { name: "EV Battery Solutions", branch: "ev-battery", href: "#" },
  ]



  return (
    <header 
       className={` border-b bg-white sticky top-0 z-40  top-0 left-0 w-full z-50 transition-opacity duration-300 ${
        hidden ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Top bar */}
      <div className="border-b bg-gray-50 px-4 py-2">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          {/* Branch selector - visible on desktop, hidden on mobile */}
          <div className="hidden md:flex items-center gap-4">
            {/* {branchOptions.map((option) => (
              <button
                key={option.branch}
                onClick={() => router.push(option.href)}
                className={`transition-colors ${
                  currentBranch === option.branch ? "text-blue-600 font-medium" : "text-gray-600 hover:text-blue-600"
                }`}
              >
                {option.name}
              </button>
            ))} */}

            {/* Search - adjusted for mobile */}
              <div style={{ width: "400px" }} className="flex-1 max-w-[600px] relative">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-8 z-10" />
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

           {/* Desktop Navigation */}
          {/* <nav className="hidden md:flex items-center gap-6 text-sm">
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
          </nav> */}

          <nav className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <div key={item.name} className="relative">
                  {item.hasDropdown ? (
                    <div
                      onMouseEnter={item.name === "Products" ? handleMouseEnter : undefined}
                      onMouseLeave={item.name === "Products" ? handleMouseLeave : undefined}
                    >
                      <button className="flex items-center gap-1 text-gray-700 hover:text-[#00599c] transition-colors py-2 text-sm font-medium">
                        {item.name}
                        <ChevronDown className="h-3 w-3" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleNavigate(item.href)}
                      className="text-gray-700 hover:text-[#00599c] transition-colors py-2 text-sm font-medium"
                    >
                      {item.name}
                    </button>
                  )}
                </div>
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

       {/* Mega Menu for Products & Solutions */}
      {showMegaMenu && !isMobile && (
        <div
          className="absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-lg z-40"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-12 gap-8">
              {/* Left Sidebar - Main Categories */}
              <div className="col-span-3">
                <div className="space-y-2">
                  {Object.entries(megaMenuData).map(([categoryKey, categoryData]) => (
                    <div
                      key={categoryKey}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        categoryData.isActive ? "bg-[#00599c] text-white" : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-1.5 rounded ${categoryData.isActive ? "bg-white/20" : "bg-gray-100"}`}>
                          {React.createElement(categoryData.icon, {
                            className: `h-4 w-4 ${categoryData.isActive ? "text-white" : "text-gray-600"}`,
                          })}
                        </div>
                        <span className="text-sm font-medium">{categoryKey}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Main Content - Product Categories */}
              <div className="col-span-6">
                <div className="grid grid-cols-2 gap-8">
                  {megaMenuData["LABORATORY TECHNOLOGY"].categories.map((category) => (
                    <div key={category.title} className="space-y-3">
                      <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">{category.title}</h3>
                      <ul className="space-y-2">
                        {category.items.map((item) => (
                          <li key={item}>
                            <a
                              href="#"
                              className="text-sm text-gray-600 hover:text-[#00599c] transition-colors block py-1 px-2 rounded hover:bg-blue-50"
                              onMouseEnter={() => handleProductHover(item)}
                              onMouseLeave={handleProductLeave}
                            >
                              {item}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Side - Featured Product */}
              <div className="col-span-3">
                <div className="bg-gray-50 rounded-lg p-6 h-full">
                  <div className="relative mb-4 overflow-hidden rounded-lg">
                    <img
                      src={featuredContent.image || "/placeholder.svg"}
                      alt="Featured Product"
                      className="w-full h-40 object-cover transition-all duration-300 ease-in-out"
                      key={featuredContent.image} // Force re-render on image change
                    />
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-lg font-bold text-[#00599c] leading-tight transition-all duration-300">
                      {featuredContent.title}
                    </h4>
                    <p className="text-sm text-gray-600 transition-all duration-300">{featuredContent.description}</p>
                    <Button size="sm" className="bg-[#00599c] hover:bg-[#004080] text-white w-full">
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Section - Product Category Cards */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="grid grid-cols-4 gap-6">
                {[
                  {
                    title: "Laboratory & Analytical Technology",
                    image: "/placeholder.svg",
                    description: "Advanced equipment for research and development applications",
                  },
                  {
                    title: "BioProcessing Solutions",
                    image: "/placeholder.svg",
                    description: "Bioreactor systems for pharmaceutical applications",
                  },
                  {
                    title: "EV Battery Solutions",
                    image: "/placeholder.svg",
                    description: "Cutting-edge solutions for battery manufacturing",
                  },
                  {
                    title: "Process Technology",
                    image: "/placeholder.svg",
                    description: "Industrial-scale processing equipment",
                  },
                ].map((card, index) => (
                  <div key={index} className="group cursor-pointer">
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                      <img
                        src={card.image || "/placeholder.svg"}
                        alt={card.title}
                        className="w-full h-24 object-cover"
                      />
                      <div className="p-4">
                        <h5 className="font-semibold text-sm text-gray-900 mb-2 group-hover:text-[#00599c] transition-colors">
                          {card.title}
                        </h5>
                        <p className="text-xs text-gray-600 leading-relaxed">{card.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

    </header>
  )
}

// "use client"

// import React from "react"
// import { useState, useEffect, useRef } from "react"
// import {
//   Search,
//   ShoppingCart,
//   Menu,
//   ChevronDown,
//   Microscope,
//   Cog,
//   FlaskConical,
//   Zap,
//   X,
//   MessageCircle,
// } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { useRouter, usePathname } from "next/navigation"

// const megaMenuData = {
//   "LABORATORY TECHNOLOGY": {
//     icon: Microscope,
//     color: "bg-[#00599c]",
//     description: "Advanced laboratory equipment for research and development",
//     isActive: true,
//     categories: [
//       {
//         title: "SEPARATION",
//         items: ["Rotary Evaporators", "Centrifuges", "Filtration Systems"],
//       },
//       {
//         title: "ELECTROCHEMISTRY",
//         items: ["Electrochemistry Kit", "Screening System"],
//       },
//       {
//         title: "MIXING",
//         items: ["Magnetic Stirrers", "Overhead Stirrers", "Shakers", "Thermoshakers"],
//       },
//       {
//         title: "CRUSHING",
//         items: ["Dispersers", "Mills", "Single-Use Crushing / IVD"],
//       },
//       {
//         title: "MEASURING VISCOSITY",
//         items: ["Measuring Stirrers", "Viscometers"],
//       },
//       {
//         title: "HEATING / COOLING / TEMPERING",
//         items: ["Dry Block Heater", "Heating Baths", "Hot Plates", "Temperature Control", "Tempering Chambers"],
//       },
//     ],
//   },
//   "BIOPROCESSING SOLUTIONS": {
//     icon: FlaskConical,
//     color: "bg-gray-600",
//     description: "Advanced bioreactor systems for pharmaceutical applications",
//     isActive: false,
//     categories: [
//       {
//         title: "BIOREACTORS",
//         items: ["HABITAT eco", "HABITAT cyt", "Single-Use Systems"],
//       },
//       {
//         title: "FERMENTATION",
//         items: ["Microbial Fermentation", "Cell Culture", "Perfusion Systems"],
//       },
//     ],
//   },
//   "EV BATTERY SOLUTIONS": {
//     icon: Zap,
//     color: "bg-gray-600",
//     description: "Cutting-edge solutions for EV battery manufacturing",
//     isActive: false,
//     categories: [
//       {
//         title: "MATERIAL PROCESSING",
//         items: ["Cathode Materials", "Anode Materials", "Electrolyte Prep"],
//       },
//       {
//         title: "CELL MANUFACTURING",
//         items: ["Electrode Coating", "Cell Assembly", "Formation"],
//       },
//     ],
//   },
//   "PROCESS TECHNOLOGY": {
//     icon: Cog,
//     color: "bg-gray-600",
//     description: "Industrial-scale processing equipment and pilot plants",
//     isActive: false,
//     categories: [
//       {
//         title: "REACTOR SYSTEMS",
//         items: ["Synthesis Reactors", "High Viscosity Reactors"],
//       },
//       {
//         title: "VACUUM TECHNOLOGY",
//         items: ["Vacuum Pumps", "Controllers", "Systems"],
//       },
//       {
//         title: "LIQUID HANDLING",
//         items: ["Pipettes"],
//       },
//       {
//         title: "CONTROLLING & MEASURING",
//         items: ["Laboratory Software"],
//       },
//       {
//         title: "CALORIMETRY",
//         items: ["Calorimeters", "Decomposition Systems"],
//       },
//       {
//         title: "FLOW CHEMISTRY",
//         items: ["FLOW System"],
//       },
//     ],
//   },
// }

// const navigationItems = [
//   { name: "Products & Solutions", href: "/products", hasDropdown: true },
//   { name: "Services", href: "/services", hasDropdown: true },
//   { name: "Knowledge Center", href: "/knowledge", hasDropdown: true },
//   { name: "Company", href: "/company", hasDropdown: true },
//   { name: "Career", href: "/career" },
//   { name: "Contact", href: "/contact", hasDropdown: true },
//   { name: "MyIKA", href: "/myika", hasDropdown: true },
// ]

// // Product images for hover states
// const productImages = [
//   "/placeholder.svg",
//   "/placeholder.svg",
//   "/placeholder.svg",
// ]

// // Default featured content
// const defaultFeaturedContent = {
//   image: "/placeholder.svg",
//   title: "DISTILLATION HAS NEVER BEEN MORE EASY & INTELLIGENT",
//   description: "Discover our latest rotary evaporator technology for efficient and intelligent distillation processes.",
// }

// export function Header() {
 

//   return (
//     <header className="bg-white sticky top-0 z-50 shadow-sm">
//       {/* Main header */}
//       <div className="border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="flex items-center justify-between h-16">
//             {/* Logo */}
//             <div className="flex items-center">
//               <div className="text-3xl font-bold text-[#00599c] tracking-tight">IKA</div>
//             </div>

//             {/* Desktop Navigation */}
//             <nav className="hidden lg:flex items-center space-x-8">
//               {navigationItems.map((item) => (
//                 <div key={item.name} className="relative">
//                   {item.hasDropdown ? (
//                     <div
//                       onMouseEnter={item.name === "Products & Solutions" ? handleMouseEnter : undefined}
//                       onMouseLeave={item.name === "Products & Solutions" ? handleMouseLeave : undefined}
//                     >
//                       <button className="flex items-center gap-1 text-gray-700 hover:text-[#00599c] transition-colors py-2 text-sm font-medium">
//                         {item.name}
//                         <ChevronDown className="h-3 w-3" />
//                       </button>
//                     </div>
//                   ) : (
//                     <button
//                       onClick={() => handleNavigate(item.href)}
//                       className="text-gray-700 hover:text-[#00599c] transition-colors py-2 text-sm font-medium"
//                     >
//                       {item.name}
//                     </button>
//                   )}
//                 </div>
//               ))}
//             </nav>

//             {/* Right side icons */}
//             <div className="flex items-center space-x-3">
//               <Button variant="ghost" size="sm" className="text-gray-600 hover:text-[#00599c] p-2">
//                 <MessageCircle className="h-5 w-5" />
//               </Button>
//               <Button variant="ghost" size="sm" className="text-gray-600 hover:text-[#00599c] p-2">
//                 <Search className="h-5 w-5" />
//               </Button>
//               <Button variant="ghost" size="sm" className="text-gray-600 hover:text-[#00599c] p-2 relative">
//                 <ShoppingCart className="h-5 w-5" />
//                 <span className="absolute -top-1 -right-1 bg-[#00599c] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//                   0
//                 </span>
//               </Button>
//               <Button variant="ghost" size="sm" className="text-gray-600 hover:text-[#00599c] p-2">
//                 <img src="/placeholder.svg?height=20&width=30&text=DE" alt="German" className="h-4 w-6" />
//               </Button>

//               {/* Mobile menu button */}
//               <div className="lg:hidden">
//                 <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(true)}>
//                   <Menu className="h-6 w-6" />
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

     

//     </header>
//   )
// }
