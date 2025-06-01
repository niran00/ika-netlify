"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarHeader,
  SidebarInput,
  useSidebar,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"

const productCategories = [
  {
    title: "Bioprocessing",
    image: "/placeholder.svg?height=300&width=400&text=Bioprocessing+Equipment",
    description: "Advanced bioreactor systems for cell culture and fermentation applications",
    items: [
      { name: "Bioreactors", image: "/placeholder.svg?height=200&width=300&text=Bioreactor+System" },
      { name: "Fermentation Systems", image: "/placeholder.svg?height=200&width=300&text=Fermentation+Equipment" },
      { name: "Cell Culture", image: "/placeholder.svg?height=200&width=300&text=Cell+Culture+System" },
    ],
  },
  {
    title: "Electrochemistry",
    image: "/placeholder.svg?height=300&width=400&text=Electrochemistry+Equipment",
    description: "Precision electrochemical analysis and synthesis solutions",
    items: [
      { name: "Electrochemistry Kit", image: "/placeholder.svg?height=200&width=300&text=Electrochemistry+Kit" },
      { name: "Screening System", image: "/placeholder.svg?height=200&width=300&text=Screening+System" },
      { name: "Electrodes", image: "/placeholder.svg?height=200&width=300&text=Electrode+Array" },
    ],
  },
  {
    title: "Mixing",
    image: "/placeholder.svg?height=300&width=400&text=Mixing+Equipment",
    description: "Comprehensive mixing solutions for laboratory and industrial applications",
    items: [
      { name: "Magnetic Stirrers", image: "/placeholder.svg?height=200&width=300&text=Magnetic+Stirrer" },
      { name: "Overhead Stirrers", image: "/placeholder.svg?height=200&width=300&text=Overhead+Stirrer" },
      { name: "Shakers", image: "/placeholder.svg?height=200&width=300&text=Laboratory+Shaker" },
      { name: "Thermoshakers", image: "/placeholder.svg?height=200&width=300&text=Thermoshaker" },
    ],
  },
  {
    title: "Measuring Viscosity",
    image: "/placeholder.svg?height=300&width=400&text=Viscosity+Measurement",
    description: "Precise viscosity measurement and rheological analysis equipment",
    items: [
      { name: "Measuring Stirrers", image: "/placeholder.svg?height=200&width=300&text=Measuring+Stirrer" },
      { name: "Viscometers", image: "/placeholder.svg?height=200&width=300&text=Viscometer" },
      { name: "Rheometers", image: "/placeholder.svg?height=200&width=300&text=Rheometer" },
    ],
  },
  {
    title: "Separation",
    image: "/placeholder.svg?height=300&width=400&text=Separation+Equipment",
    description: "Advanced separation and purification technologies",
    items: [
      { name: "Rotary Evaporators", image: "/placeholder.svg?height=200&width=300&text=Rotary+Evaporator" },
      { name: "Centrifuges", image: "/placeholder.svg?height=200&width=300&text=Centrifuge" },
      { name: "Filtration Systems", image: "/placeholder.svg?height=200&width=300&text=Filtration+System" },
    ],
  },
  {
    title: "Reactor Systems",
    image: "/placeholder.svg?height=300&width=400&text=Reactor+Systems",
    description: "Scalable reactor systems for synthesis and process development",
    items: [
      { name: "Synthesis Reactors", image: "/placeholder.svg?height=200&width=300&text=Synthesis+Reactor" },
      { name: "High Viscosity Reactors", image: "/placeholder.svg?height=200&width=300&text=High+Viscosity+Reactor" },
      { name: "Pilot Plants", image: "/placeholder.svg?height=200&width=300&text=Pilot+Plant" },
    ],
  },
  {
    title: "Vacuum Technology",
    image: "/placeholder.svg?height=300&width=400&text=Vacuum+Technology",
    description: "Comprehensive vacuum solutions for laboratory applications",
    items: [
      { name: "Vacuum Pumps", image: "/placeholder.svg?height=200&width=300&text=Vacuum+Pump" },
      { name: "Vacuum Controllers", image: "/placeholder.svg?height=200&width=300&text=Vacuum+Controller" },
      { name: "Vacuum Systems", image: "/placeholder.svg?height=200&width=300&text=Vacuum+System" },
    ],
  },
  {
    title: "Liquid Handling",
    image: "/placeholder.svg?height=300&width=400&text=Liquid+Handling",
    description: "Precision liquid handling and dispensing solutions",
    items: [
      { name: "Pipettes", image: "/placeholder.svg?height=200&width=300&text=Laboratory+Pipettes" },
      { name: "Dispensers", image: "/placeholder.svg?height=200&width=300&text=Liquid+Dispenser" },
      { name: "Pumps", image: "/placeholder.svg?height=200&width=300&text=Laboratory+Pump" },
    ],
  },
  {
    title: "Controlling & Measuring",
    image: "/placeholder.svg?height=300&width=400&text=Control+Systems",
    description: "Advanced control and measurement systems for laboratory automation",
    items: [
      { name: "Laboratory Software", image: "/placeholder.svg?height=200&width=300&text=Laboratory+Software" },
      { name: "Data Loggers", image: "/placeholder.svg?height=200&width=300&text=Data+Logger" },
      { name: "Controllers", image: "/placeholder.svg?height=200&width=300&text=Process+Controller" },
    ],
  },
  {
    title: "Calorimetry",
    image: "/placeholder.svg?height=300&width=400&text=Calorimetry+Equipment",
    description: "Thermal analysis and calorimetry solutions",
    items: [
      { name: "Calorimeters", image: "/placeholder.svg?height=200&width=300&text=Calorimeter" },
      { name: "Decomposition Systems", image: "/placeholder.svg?height=200&width=300&text=Decomposition+System" },
      { name: "Thermal Analysis", image: "/placeholder.svg?height=200&width=300&text=Thermal+Analyzer" },
    ],
  },
  {
    title: "Heating / Cooling",
    image: "/placeholder.svg?height=300&width=400&text=Temperature+Control",
    description: "Precise temperature control solutions for laboratory applications",
    items: [
      { name: "Dry Block Heater", image: "/placeholder.svg?height=200&width=300&text=Dry+Block+Heater" },
      { name: "Heating Baths", image: "/placeholder.svg?height=200&width=300&text=Heating+Bath" },
      { name: "Hot Plates", image: "/placeholder.svg?height=200&width=300&text=Hot+Plate" },
      { name: "Temperature Control", image: "/placeholder.svg?height=200&width=300&text=Temperature+Controller" },
      { name: "Tempering Chambers", image: "/placeholder.svg?height=200&width=300&text=Tempering+Chamber" },
    ],
  },
  {
    title: "Crushing",
    image: "/placeholder.svg?height=300&width=400&text=Crushing+Equipment",
    description: "High-performance crushing and dispersing equipment",
    items: [
      { name: "Dispersers", image: "/placeholder.svg?height=200&width=300&text=High+Speed+Disperser" },
      { name: "Mills", image: "/placeholder.svg?height=200&width=300&text=Laboratory+Mill" },
      { name: "Single-Use Crushing", image: "/placeholder.svg?height=200&width=300&text=Single+Use+Crusher" },
      { name: "In-vitro Diagnostic", image: "/placeholder.svg?height=200&width=300&text=Diagnostic+Equipment" },
    ],
  },
]

const industries = [
  {
    name: "Pharma",
    image: "/placeholder.svg?height=300&width=400&text=Pharmaceutical+Industry",
    description: "Pharmaceutical manufacturing and quality control solutions",
  },
  {
    name: "Chemistry",
    image: "/placeholder.svg?height=300&width=400&text=Chemical+Research",
    description: "Advanced equipment for chemical research and analysis",
  },
  {
    name: "Food",
    image: "/placeholder.svg?height=300&width=400&text=Food+Processing",
    description: "Food processing and quality assurance equipment",
  },
  {
    name: "Cosmetics",
    image: "/placeholder.svg?height=300&width=400&text=Cosmetic+Manufacturing",
    description: "Cosmetic formulation and production solutions",
  },
  {
    name: "Bitumen",
    image: "/placeholder.svg?height=300&width=400&text=Bitumen+Testing",
    description: "Specialized equipment for bitumen testing and analysis",
  },
  {
    name: "Electrosynthesis",
    image: "/placeholder.svg?height=300&width=400&text=Electrochemical+Synthesis",
    description: "Electrochemical synthesis and analysis solutions",
  },
  {
    name: "Petrochemistry",
    image: "/placeholder.svg?height=300&width=400&text=Petrochemical+Industry",
    description: "Equipment for petrochemical processing and analysis",
  },
  {
    name: "Fuel Cell / Electrolyser",
    image: "/placeholder.svg?height=300&width=400&text=Fuel+Cell+Technology",
    description: "Advanced fuel cell and electrolyser technology",
  },
  {
    name: "Battery Cells",
    image: "/placeholder.svg?height=300&width=400&text=Battery+Technology",
    description: "Battery research and manufacturing solutions",
  },
]

export function AppSidebar() {
  const router = useRouter()
  const [hoveredItem, setHoveredItem] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState([])
  const { openMobile, setOpenMobile } = useSidebar()

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

  const toggleCategory = (categoryTitle) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryTitle) ? prev.filter((title) => title !== categoryTitle) : [...prev, categoryTitle],
    )
  }

  // Mobile sidebar content
  const renderMobileSidebar = () => (
    <div className="h-full overflow-y-auto">
      <SidebarHeader className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <SidebarInput placeholder="Search categories..." className="pl-10" />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <div className="p-4 space-y-4">
          <h3 className="font-medium text-sm text-gray-500">Product Categories</h3>
          {productCategories.map((category) => (
            <div key={category.title} className="border-b pb-2">
              <button
                className="flex items-center justify-between w-full py-2 text-left font-medium"
                onClick={() => toggleCategory(category.title)}
              >
                {category.title}
                {expandedCategories.includes(category.title) ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4 transform -rotate-90" />
                )}
              </button>

              {expandedCategories.includes(category.title) && (
                <div className="ml-4 mt-1 space-y-1">
                  {category.items.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => {
                        router.push(`/products/${item.name.toLowerCase().replace(/\s+/g, "-")}`)
                        setOpenMobile(false)
                      }}
                      className="block w-full text-left py-1.5 text-sm text-gray-700 hover:text-blue-600"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          <h3 className="font-medium text-sm text-gray-500 pt-2">Industries</h3>
          <div className="space-y-1">
            {industries.map((industry) => (
              <button
                key={industry.name}
                onClick={() => {
                  router.push(`/industries/${industry.name.toLowerCase()}`)
                  setOpenMobile(false)
                }}
                className="block w-full text-left py-2 text-gray-700 hover:text-blue-600"
              >
                {industry.name}
              </button>
            ))}
          </div>
        </div>
      </SidebarContent>
    </div>
  )

  // Desktop sidebar content
  const renderDesktopSidebar = () => (
    <>
      <Sidebar className="border-r">
        <SidebarHeader className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <SidebarInput placeholder="Search categories..." className="pl-10" />
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Product Categories</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {productCategories.map((category) => (
                  <Collapsible key={category.title} className="group/collapsible">
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          className="w-full justify-between hover:bg-gray-100 transition-colors duration-200"
                          onMouseEnter={() => setHoveredItem({ type: "category", data: category })}
                        >
                          <span>{category.title}</span>
                          <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {category.items.map((item) => (
                            <SidebarMenuSubItem key={item.name}>
                              <SidebarMenuSubButton
                                asChild
                                onMouseEnter={() => setHoveredItem({ type: "product", data: item })}
                                className="hover:bg-gray-50 transition-colors duration-200"
                              >
                                <a href={`/products/${item.name.toLowerCase().replace(/\s+/g, "-")}`}>{item.name}</a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Industries</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {industries.map((industry) => (
                  <SidebarMenuItem key={industry.name}>
                    <SidebarMenuButton
                      asChild
                      onMouseEnter={() => setHoveredItem({ type: "industry", data: industry })}
                      className="hover:bg-gray-100 transition-colors duration-200"
                    >
                      <a href={`/industries/${industry.name.toLowerCase()}`}>{industry.name}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      {/* Hover Preview Panel */}
      {hoveredItem && (
        <div
          className="fixed left-64 top-20 z-50 w-80 bg-white border border-gray-200 rounded-lg shadow-2xl transform transition-all duration-200 ease-out"
          onMouseEnter={() => {
            // Keep the preview open when hovering over it
          }}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <div className="p-6 space-y-4">
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={hoveredItem.data.image || "/placeholder.svg"}
                alt={hoveredItem.data.name || hoveredItem.data.title}
                className="w-full h-40 object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-bold text-[#00599c] leading-tight">
                {hoveredItem.data.name || hoveredItem.data.title}
              </h3>

              {hoveredItem.data.description && (
                <p className="text-gray-600 text-sm leading-relaxed">{hoveredItem.data.description}</p>
              )}

              {hoveredItem.type === "category" && (
                <div className="pt-2">
                  <p className="text-xs text-gray-500 mb-2">{hoveredItem.data.items.length} products available</p>
                  <div className="flex flex-wrap gap-1">
                    {hoveredItem.data.items.slice(0, 3).map((item, index) => (
                      <span key={index} className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                        {item.name}
                      </span>
                    ))}
                    {hoveredItem.data.items.length > 3 && (
                      <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                        +{hoveredItem.data.items.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-gray-100">
              <Button
                size="sm"
                className="w-full bg-[#00599c] hover:bg-[#004080] transition-colors duration-200"
                onClick={() => {
                  // Handle navigation here
                  console.log("Navigate to:", hoveredItem.data.name || hoveredItem.data.title)
                }}
              >
                {hoveredItem.type === "product"
                  ? "View Product"
                  : hoveredItem.type === "category"
                    ? "Browse Category"
                    : "Explore Industry"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Invisible hover area to keep preview open */}
      {hoveredItem && (
        <div className="fixed left-64 top-0 w-80 h-full z-40" onMouseLeave={() => setHoveredItem(null)} />
      )}
    </>
  )

  return (
    <div className="flex relative">
      {/* Desktop sidebar */}
      <div className="hidden md:block">{renderDesktopSidebar()}</div>

      {/* Mobile sidebar */}
      <div className="md:hidden">
        <Sheet open={openMobile} onOpenChange={setOpenMobile}>
          <SheetContent side="left" className="w-[85vw] sm:w-[350px] p-0">
            {renderMobileSidebar()}
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
