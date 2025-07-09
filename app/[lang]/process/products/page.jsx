"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, ChevronDown, Search, FileText, Package, Settings, Download, Eye, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"

const processProductCategories = [
  {
    id: "pilot-plants",
    name: "Pilot Plants",
    products: [
      {
        id: "magic-lab",
        name: "magic LAB",
        sections: ["Description", "Features", "Technical Data", "Downloads"],
      },
      {
        id: "labor-pilot",
        name: "LABOR-PILOT",
        sections: ["Description", "Features", "Technical Data", "Downloads"],
      },
      {
        id: "process-pilot",
        name: "PROCESS-PILOT",
        sections: ["Description", "Features", "Technical Data", "Downloads"],
      },
      {
        id: "magic-plant",
        name: "magic PLANT",
        sections: ["Description", "Features", "Technical Data", "Downloads"],
      },
    ],
  },
  {
    id: "inline-dispersers-mills",
    name: "Inline Dispersers / Mills",
    products: [
      {
        id: "dispax-reactor-dr2000",
        name: "DISPAX-REACTOR DR 2000/4",
        sections: ["Description", "Features", "Technical Data", "Downloads"],
      },
      {
        id: "dispax-reactor-dr3000",
        name: "DISPAX-REACTOR DR 3000/4",
        sections: ["Description", "Features", "Technical Data", "Downloads"],
      },
    ],
  },
  {
    id: "solid-liquid-mixers",
    name: "Solid-liquid Mixers",
    products: [
      {
        id: "slm-500",
        name: "Solid-Liquid Mixer SLM 500",
        sections: ["Description", "Features", "Technical Data", "Downloads"],
      },
    ],
  },
]

const technicalData = [
  {
    product: "magic LAB",
    motorPower: "0.9",
    processPresure: "2.5",
    processTemperature: "80",
    dataSheet: "Available",
    drawing: "Available",
  },
]

const downloads = [
  {
    title: "Brochure Process Technology: dispersing, mixing and kneading machines",
    type: "PDF",
    size: "3.2 MB",
  },
  {
    title: "Brochure Machines and Plants for Process Technology",
    type: "PDF",
    size: "2.8 MB",
  },
  {
    title: "Brochure Process Technology for Cosmetics Industry",
    type: "PDF",
    size: "2.1 MB",
  },
  {
    title: "Brochure magic LAB - multi-functional laboratory machine",
    type: "PDF",
    size: "1.9 MB",
  },
]

const getSectionIcon = (section) => {
  switch (section) {
    case "Description":
      return Eye
    case "Features":
      return Package
    case "Technical Data":
      return Settings
    case "Downloads":
      return Download
    default:
      return FileText
  }
}

export default function ProcessProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedCategories, setExpandedCategories] = useState(["pilot-plants"])
  const [selectedCategory, setSelectedCategory] = useState("pilot-plants")
  const [selectedProduct, setSelectedProduct] = useState("magic-lab")
  const [selectedSection, setSelectedSection] = useState("Description")

  const [isMobile, setIsMobile] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  const toggleCategory = (categoryId) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  const selectProduct = (categoryId, productId) => {
    setSelectedCategory(categoryId)
    setSelectedProduct(productId)
    setSelectedSection("Description")

    // Close sidebar on mobile when a product is selected
    if (isMobile) {
      setSidebarOpen(false)
    }
  }

  const renderSidebar = () => {
    const sidebarContent = (
      <div className="w-full md:w-80 bg-white border-r border-gray-200 h-full overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Process Technology</h1>
          <p className="text-sm text-gray-600 mb-4">Industrial-scale processing equipment</p>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="p-4">
          {processProductCategories
            .filter(
              (category) =>
                category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                category.products.some((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase())),
            )
            .map((category) => (
              <div key={category.id} className="mb-2">
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <span className="font-medium text-gray-900">{category.name}</span>
                  {expandedCategories.includes(category.id) ? (
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-gray-500" />
                  )}
                </button>

                {expandedCategories.includes(category.id) && (
                  <div className="ml-4 mt-2 space-y-1">
                    {category.products.map((product) => (
                      <div key={product.id}>
                        <button
                          onClick={() => {
                            selectProduct(category.id, product.id)
                          }}
                          className={`w-full text-left p-2 rounded-md transition-colors ${
                            selectedProduct === product.id
                              ? "bg-[#00599c] text-white"
                              : "hover:bg-gray-100 text-gray-700"
                          }`}
                        >
                          {product.name}
                        </button>

                        {selectedProduct === product.id && (
                          <div className="ml-4 mt-2 space-y-1">
                            {product.sections.map((section) => {
                              const IconComponent = getSectionIcon(section)
                              return (
                                <button
                                  key={section}
                                  onClick={() => {
                                    setSelectedSection(section)
                                    // Close sidebar on mobile when a section is selected
                                    if (isMobile) {
                                      setSidebarOpen(false)
                                    }
                                  }}
                                  className={`w-full flex items-center gap-2 p-2 text-sm rounded-md transition-colors ${
                                    selectedSection === section
                                      ? "bg-blue-50 text-[#00599c] border-l-2 border-[#00599c]"
                                      : "hover:bg-gray-50 text-gray-600"
                                  }`}
                                >
                                  <IconComponent className="h-4 w-4" />
                                  {section}
                                </button>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    )

    if (isMobile) {
      return (
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetContent side="left" className="w-[85vw] sm:w-[350px] p-0">
            <SheetHeader className="p-4 border-b">
              <SheetTitle className="text-left">Product Categories</SheetTitle>
            </SheetHeader>
            {sidebarContent}
          </SheetContent>
        </Sheet>
      )
    }

    return sidebarContent
  }

  const renderBreadcrumb = () => {
    if (!selectedCategory || !selectedProduct) return null

    const category = processProductCategories.find((c) => c.id === selectedCategory)
    const product = category?.products.find((p) => p.id === selectedProduct)

    return (
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
        <span>Process Technology</span>
        <ChevronRight className="h-4 w-4" />
        <span>{category?.name}</span>
        <ChevronRight className="h-4 w-4" />
        <span className="text-[#00599c] font-medium">{product?.name}</span>
        <ChevronRight className="h-4 w-4" />
        <span className="text-gray-900 font-medium">{selectedSection}</span>
      </div>
    )
  }

  const renderDescription = () => (
    <div className="space-y-8">
      <div className="grid lg:grid-cols-1 gap-8 items-center">
        <div className="order-2 lg:order-1">
           <div className="relative">
            <img
              src="/process1.webp"
              alt="magic LAB Equipment"
              className="w-full h-96 object-contain rounded-lg"
            />
            
          </div>

          <h1 className="text-4xl font-bold text-[#00599c] mb-4">magic LAB</h1>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            The magic LAB® is a unique and multi-functional small-scale laboratory machine. It is designed for mixing,
            dispersing, wet milling and incorporation of powders into liquids. The magic LAB® is most frequently used
            for the development of new products or for optimizing of existing process techniques, particularly in the
            chemical, cosmetic, pharmaceutical and food industries.
          </p>
          <p className="text-gray-700 mb-6 leading-relaxed">
            It is an ideal machine for continuous, circulating and batch processing with interchangeable modules. Many
            work parameters of the magic LAB® are identical to those of the IKA 2000 online production machines UTL, DR,
            CMS, MHD, MK and MKO. Therefore, the magic LAB® ensures a reliable scale-up by offering the possibility to
            work with the same method from formulation development to mass production.
          </p>
          <p className="text-gray-700 mb-8 leading-relaxed">
            The basic in-line machine is equipped with the single-stage dispersing module ULTRA-TURRAX® UTL. It is best
            suited for batch applications and can be adapted for the manufacturing of dispersions from coarse to fine.
            Compared to a conventional stirrer, the mixing time is reduced by up to 50%.
          </p>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">Advantages of the magic LAB®:</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-[#00599c] rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  Flexibility and ease of use: one machine suits for many applications and variety of processes
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-[#00599c] rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  Optimum mixing, dispersing and wet milling results due to rotor tip speed up to 40 m/s and therefore
                  high energy input into the working area
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-[#00599c] rounded-full mt-2 flex-shrink-0"></div>
                <span>Simple heating or cooling of all modules</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-[#00599c] rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  Together with inline machines of 2000 series enables seamless transition of processes from laboratory
                  to production while retaining the product quality
                </span>
              </li>
            </ul>
          </div>
        </div>
        
      </div>
    </div>
  )

  const renderFeatures = () => (
    <div className="space-y-8">
      <div className="grid lg:grid-cols-1 gap-8 items-start">
        <div className="order-2 lg:order-1">
          <div className="relative">
            <img
              src="/process2.webp"
              alt="magic LAB Features"
              className="w-full h-96 object-contain rounded-lg"
            />
           
          </div>

          <h1 className="text-4xl font-bold text-[#00599c] mb-6">magic LAB</h1>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Optionally available modules for magic LAB®:</h3>
              <div className="space-y-4 text-gray-700">
                <p>
                  The module DISPAX-REACTOR® DR converts the magic LAB® into a multi-stage high capacity dispersing
                  machine for fine particle size reduction. With just one pass, the DR achieves fine dispersions with a
                  narrow particle size distribution. It also guarantees an optimum homogeneity, which is an important
                  pre-condition for the long-time stability of emulsions or suspensions.
                </p>
                <p>
                  The module CMS is used for solid/liquid mixing, ideally suited for enrichment of liquids by powders in
                  a recirculation process. It creates a vacuum at the powder inlet, thus enabling the powder to be
                  sucked into the mixing chamber of the machine. It enables a quick, dust and lump-free incorporation
                  and energy efficient homogeneous mixing.
                </p>
                <p>
                  The module MHD is designed for the incorporation of liquids into liquids. By use of this module, the
                  mixing motion of solid and liquid should be volumetrically or gravimetrically controlled. Depending on
                  the product characteristics, dispersions with viscosities up to 50 Pas or solid content of just after
                  one pass.
                </p>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  )

  const renderTechnicalData = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Technical Data</h2>
        <Button variant="outline" className="text-[#00599c] border-[#00599c] hover:bg-[#00599c] hover:text-white">
          /// QUESTIONS?
        </Button>
      </div>

      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Product</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                  Motor power
                  <br />
                  <span className="font-normal text-gray-600">(kW)</span>
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                  Process pressure (max.)
                  <br />
                  <span className="font-normal text-gray-600">(bar)</span>
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                  Process temperature, max.
                  <br />
                  <span className="font-normal text-gray-600">(°C)</span>
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Data Sheet</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Drawing</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-6 py-4 text-sm text-gray-900">
                  magic LAB<sup>®</sup> with module UTL
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">0.9</td>
                <td className="px-6 py-4 text-sm text-gray-900">2.5</td>
                <td className="px-6 py-4 text-sm text-gray-900">80</td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <Button variant="ghost" size="sm" className="p-0 h-auto text-[#00599c]">
                    <FileText className="h-4 w-4" />
                  </Button>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <Button variant="ghost" size="sm" className="p-0 h-auto text-[#00599c]">
                    <FileText className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderDownloads = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Downloads</h2>
        <Button variant="outline" className="text-[#00599c] border-[#00599c] hover:bg-[#00599c] hover:text-white">
          {"< PRODUCT OVERVIEW"}
        </Button>
      </div>

      <div className="space-y-4">
        {downloads.map((download, index) => (
          <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-red-100 rounded">
                <FileText className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{download.title}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Badge variant="outline">{download.type}</Badge>
                  <span>{download.size}</span>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-[#00599c] hover:bg-[#00599c] hover:text-white">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )

  const renderMainContent = () => {
    if (!selectedCategory || !selectedProduct) {
      return (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Select a Process Technology Product</h2>
            <p className="text-gray-600">Choose a category and product from the sidebar to view details</p>
          </div>
        </div>
      )
    }

    switch (selectedSection) {
      case "Description":
        return renderDescription()
      case "Features":
        return renderFeatures()
      case "Technical Data":
        return renderTechnicalData()
      case "Downloads":
        return renderDownloads()
      default:
        return renderDescription()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Desktop sidebar */}
      <div className="hidden md:block">{renderSidebar()}</div>

      {/* Mobile sidebar */}
      <div className="md:hidden">{renderSidebar()}</div>

      <div className="flex-1 p-4 md:p-8">
        {/* Mobile menu button */}
        {isMobile && (
          <div className="mb-4">
            <Button variant="outline" className="mb-4" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-4 w-4 mr-2" />
              Product Categories
            </Button>
          </div>
        )}

        {renderBreadcrumb()}
        {renderMainContent()}
      </div>
    </div>
  )
}
