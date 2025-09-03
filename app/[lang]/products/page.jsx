"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ChevronRight, ChevronDown, Search, Grid, List, FileText, Package, Wrench, Download, Eye, ShoppingCart, Menu, CheckCircle } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CartButton } from '@/components/cart-components/cart-button'


const productCategories = [
  {
    id: "bioprocessing",
    name: "Bioprocessing",
    subcategories: [
      {
        id: "bioreactors",
        name: "Bioreactors",
        sections: ["Overview", "Products", "Accessories", "Downloads"],
      }
    ],
  },
  {
    id: "electrochemistry",
    name: "Electrochemistry",
    subcategories: [
      {
        id: "electrochemistry-kit",
        name: "Electrochemistry Kit",
        sections: ["Overview", "Products", "Accessories", "Downloads"],
      },
      {
        id: "screening-system",
        name: "Screening System",
        sections: ["Overview", "Products", "Accessories", "Downloads"],
      },
    ],
  },
  {
    id: "mixing",
    name: "Mixing",
    subcategories: [
      {
        id: "magnetic-stirrers",
        name: "Magnetic Stirrers",
        sections: ["Overview", "Products", "Accessories", "Downloads"],
      },
      {
        id: "overhead-stirrers",
        name: "Overhead Stirrers",
        sections: ["Overview", "Products", "Accessories", "Downloads"],
      }
    ],
  },
]

const sampleProducts = [
  {
    id: 1,
    name: "Product 1 ",
    image: "/product1.webp",
    price: "5000",
    itemNumber: "0035004128",
    category: "Bioreactors",
    technicalData: {
      "Nominal voltage (input)": "48 VDC",
      "Current max. (input)": "1500 mA",
      "Voltage output (electrode)": "30/10 V",
      "Current output (electrode)": "100 mA",
      "Motor rating output": "9 W",
      "Speed range": "50 - 1500 rpm",
      "Setting accuracy speed": "10 rpm",
      "Stirring quantity max.": "0.5 l",
      "Stirring bar length": "8 - 16 mm",
      "Speed adjustment": "Turning knob",
      Display: "TFT",
      "Dimensions (W x H x D)": "130 x 150 x 250 mm",
      Weight: "3.72 kg",
      "Permissible ambient temperature": "5 - 50 °C",
      "Protection class": "IP 40",
      "Working Volume": "0.5 L",
      Material: "Borosilicate Glass",
      "Temperature Range": "5-80°C",
      "Pressure Rating": "1.5 bar",
    },
  },
  {
    id: 2,
    name: "Product 2",
    image: "/product2.webp",
    price: "6000",
    itemNumber: "0035004129",
    category: "Bioreactors",
    technicalData: {
      "Nominal voltage (input)": "48 VDC",
      "Current max. (input)": "1800 mA",
      "Voltage output (electrode)": "30/10 V",
      "Current output (electrode)": "120 mA",
      "Motor rating output": "12 W",
      "Speed range": "50 - 1800 rpm",
      "Setting accuracy speed": "10 rpm",
      "Stirring quantity max.": "1.0 l",
      "Stirring bar length": "10 - 20 mm",
      "Speed adjustment": "Digital control",
      Display: "TFT",
      "Dimensions (W x H x D)": "140 x 160 x 270 mm",
      Weight: "4.12 kg",
      "Permissible ambient temperature": "5 - 50 °C",
      "Protection class": "IP 40",
      "Working Volume": "1.0 L",
      Material: "Borosilicate Glass",
      "Temperature Range": "5-85°C",
      "Pressure Rating": "2.0 bar",
    },
  },
  {
    id: 3,
    name: "Product 3",
    image: "/product3.webp",
    price: "On Request",
    itemNumber: "0035004130",
    category: "Bioreactors",
    technicalData: {
      "Nominal voltage (input)": "48 VDC",
      "Current max. (input)": "2000 mA",
      "Voltage output (electrode)": "30/10 V",
      "Current output (electrode)": "150 mA",
      "Motor rating output": "15 W",
      "Speed range": "50 - 2000 rpm",
      "Setting accuracy speed": "5 rpm",
      "Stirring quantity max.": "2.0 l",
      "Stirring bar length": "12 - 25 mm",
      "Speed adjustment": "Digital control",
      Display: "Color TFT",
      "Dimensions (W x H x D)": "150 x 170 x 290 mm",
      Weight: "4.85 kg",
      "Permissible ambient temperature": "5 - 50 °C",
      "Protection class": "IP 42",
      "Working Volume": "2.0 L",
      Material: "Borosilicate Glass",
      "Temperature Range": "5-90°C",
      "Pressure Rating": "2.5 bar",
    },
  },
  {
    id: 4,
    name: "Product 4",
    image: "product4.webp",
    price: "On Request",
    itemNumber: "0035004131",
    category: "Bioreactors",
    technicalData: {
      "Nominal voltage (input)": "48 VDC",
      "Current max. (input)": "2500 mA",
      "Voltage output (electrode)": "30/10 V",
      "Current output (electrode)": "200 mA",
      "Motor rating output": "20 W",
      "Speed range": "50 - 2500 rpm",
      "Setting accuracy speed": "5 rpm",
      "Stirring quantity max.": "5.0 l",
      "Stirring bar length": "15 - 30 mm",
      "Speed adjustment": "Digital control",
      Display: "Color TFT",
      "Dimensions (W x H x D)": "170 x 190 x 320 mm",
      Weight: "6.20 kg",
      "Permissible ambient temperature": "5 - 50 °C",
      "Protection class": "IP 42",
      "Working Volume": "5.0 L",
      Material: "Borosilicate Glass",
      "Temperature Range": "5-95°C",
      "Pressure Rating": "3.0 bar",
    },
  },
]

const getSectionIcon = (section) => {
  switch (section) {
    case "Overview":
      return Eye
    case "Products":
      return Package
    case "Accessories":
      return Wrench
    case "Downloads":
      return Download
    default:
      return FileText
  }
}

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedCategories, setExpandedCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedSubcategory, setSelectedSubcategory] = useState(null)
  const [selectedSection, setSelectedSection] = useState("Overview")
  const [viewMode, setViewMode] = useState("grid")
  const [isMobile, setIsMobile] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [productModalOpen, setProductModalOpen] = useState(false)

  const [selectedForComparison, setSelectedForComparison] = useState([])
  const [comparisonModalOpen, setComparisonModalOpen] = useState(false)
  

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

  const selectSubcategory = (categoryId, subcategoryId) => {
    setSelectedCategory(categoryId)
    setSelectedSubcategory(subcategoryId)
    setSelectedSection("Overview")

    // Close sidebar on mobile when a subcategory is selected
    if (isMobile) {
      setSidebarOpen(false)
    }
  }

  const openProductModal = (product) => {
    console.log("Opening modal for product:", product) // Add this debug line
    setSelectedProduct(product)
    setProductModalOpen(true)
  }

  // Start toggle product selection for comparison
  const toggleProductComparison = (product) => {
    setSelectedForComparison((prev) => {
      const isSelected = prev.find((p) => p.id === product.id)
      if (isSelected) {
        return prev.filter((p) => p.id !== product.id)
      } else if (prev.length < 3) {
        return [...prev, product]
      }
      return prev
    })
  }

  const clearComparison = () => {
    setSelectedForComparison([])
  }

  const openComparisonModal = () => {
    if (selectedForComparison.length >= 2) {
      setComparisonModalOpen(true)
    }
  }


  const renderComparisonModal = () => {
      if (selectedForComparison.length === 0) return null
  
      // Get all unique technical data keys
      const allKeys = new Set()
      selectedForComparison.forEach((product) => {
        Object.keys(product.technicalData || {}).forEach((key) => allKeys.add(key))
      })
      const sortedKeys = Array.from(allKeys).sort()
  
      return (
        <Dialog open={comparisonModalOpen} onOpenChange={setComparisonModalOpen}>
          <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-[#00599c]">
                Product Comparison ({selectedForComparison.length} products)
              </DialogTitle>
            </DialogHeader>
  
            <div className="space-y-6">
              {/* Product Headers */}
              <div
                className="grid gap-4"
                style={{ gridTemplateColumns: `200px repeat(${selectedForComparison.length}, 1fr)` }}
              >
                <div className="font-semibold text-gray-600">Product</div>
                {selectedForComparison.map((product) => (
                  <div key={product.id} className="space-y-2">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-32 object-contain bg-gray-50 rounded"
                    />
                    <h3 className="font-semibold text-sm">{product.name}</h3>
                    <p className="text-xs text-gray-500">ID: {product.itemNumber}</p>
                    <p className="text-[#00599c] font-semibold">{product.price}</p>
                  </div>
                ))}
              </div>
  
              {/* Technical Specifications Comparison */}
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-3 border-b">
                  <h3 className="font-semibold text-lg">Technical Specifications</h3>
                </div>
  
                <div className="divide-y">
                  {sortedKeys.map((key, index) => (
                    <div
                      key={key}
                      className={`grid gap-4 p-3 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                      style={{ gridTemplateColumns: `200px repeat(${selectedForComparison.length}, 1fr)` }}
                    >
                      <div className="font-medium text-gray-700">{key}</div>
                      {selectedForComparison.map((product) => (
                        <div key={product.id} className="text-sm">
                          {product.technicalData?.[key] || "N/A"}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
  
              {/* Action Buttons */}
              <div className="flex justify-between items-center pt-4 border-t">
                <Button variant="outline" onClick={clearComparison}>
                  Clear Selection
                </Button>
                <div className="flex gap-2">
                  {selectedForComparison.map((product) => (
                    <CartButton key={product.id} product={product} size="sm" className="bg-[#00599c] hover:bg-[#004080]">
                      Add {product.name.split(" ")[2]} to Cart
                    </CartButton>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )
    }
  
    const renderComparisonBar = () => {
      if (selectedForComparison.length === 0) return null
  
      return (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
          <Card className="p-4 shadow-lg border-2 border-[#00599c]">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-[#00599c]" />
                <span className="font-semibold">Compare Products ({selectedForComparison.length}/3)</span>
              </div>
  
              <div className="flex gap-2">
                {selectedForComparison.map((product) => (
                  <div key={product.id} className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded text-sm">
                    <span className=" max-w-20">{product.name}</span>
                    <button
                      onClick={() => toggleProductComparison(product)}
                      className="text-red-500 hover:text-red-700 ml-1"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
  
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={openComparisonModal}
                  disabled={selectedForComparison.length < 2}
                  className="bg-[#00599c] hover:bg-[#004080]"
                >
                  Compare
                </Button>
                <Button size="sm" variant="outline" onClick={clearComparison}>
                  Clear
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )
    }

  // End toggle product selection for comparison

  const renderSidebar = () => {
    const sidebarContent = (
      <div className="w-full md:w-80 bg-white border-r border-gray-200 h-full overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Products</h1>
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
          {productCategories
            .filter(
              (category) =>
                category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                category.subcategories.some((sub) => sub.name.toLowerCase().includes(searchTerm.toLowerCase())),
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
                    {category.subcategories.map((subcategory) => (
                      <div key={subcategory.id}>
                        <button
                          onClick={() => {
                            selectSubcategory(category.id, subcategory.id)
                          }}
                          className={`w-full text-left p-2 rounded-md transition-colors ${
                            selectedSubcategory === subcategory.id
                              ? "bg-[#00599c] text-white"
                              : "hover:bg-gray-100 text-gray-700"
                          }`}
                        >
                          {subcategory.name}
                        </button>

                        {selectedSubcategory === subcategory.id && (
                          <div className="ml-4 mt-2 space-y-1">
                            {subcategory.sections.map((section) => {
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
    if (!selectedCategory || !selectedSubcategory) return null

    const category = productCategories.find((c) => c.id === selectedCategory)
    const subcategory = category?.subcategories.find((s) => s.id === selectedSubcategory)

    return (
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
        <span>Products</span>
        <ChevronRight className="h-4 w-4" />
        <span>{category?.name}</span>
        <ChevronRight className="h-4 w-4" />
        <span className="text-[#00599c] font-medium">{subcategory?.name}</span>
        <ChevronRight className="h-4 w-4" />
        <span className="text-gray-900 font-medium">{selectedSection}</span>
      </div>
    )
  }

  const renderProductModal = () => {
    if (!selectedProduct) return null

    return (
      <Dialog open={productModalOpen} onOpenChange={setProductModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#00599c]">{selectedProduct.name}</DialogTitle>
          </DialogHeader>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={selectedProduct.image || "/placeholder.svg"}
                  alt={selectedProduct.name}
                  className="w-full h-80 object-contain bg-gray-50 rounded-lg"
                />
                <Badge className="absolute top-3 left-3 bg-[#00599c] text-white">Featured</Badge>
              </div>

              {/* Additional Images */}
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    src={`/placeholder.svg?height=100&width=100&text=View+${i}`}
                    alt={`Product view ${i}`}
                    className="w-full h-20 object-contain bg-gray-50 rounded cursor-pointer hover:bg-gray-100"
                  />
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <p className="text-gray-600 mb-2">{selectedProduct.category}</p>
                <div className="text-3xl font-bold text-[#00599c] mb-4">{selectedProduct.price}</div>
                <p className="text-sm text-gray-500 mb-4">Ident. No. {selectedProduct.itemNumber}</p>
              </div>

              {/* Product Description */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Product Description</h3>
                <p className="text-gray-700 leading-relaxed">
                  The HABITAT eco series represents the latest in bioreactor technology, designed for both cell culture
                  and microbial fermentation applications. This single-wall vessel provides excellent temperature
                  control and mixing efficiency for laboratory-scale bioprocessing.
                </p>
              </div>

              {/* Key Features */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {[
                    "Single-wall glass vessel construction",
                    "Optimized for 0.5L working volume",
                    "Compatible with HABITAT control systems",
                    "Easy cleaning and sterilization",
                    "Ergonomic design for laboratory use",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-[#00599c] mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technical Specifications */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Technical Specifications</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-600">Working Volume:</span>
                      <span className="ml-2">0.5 L</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Material:</span>
                      <span className="ml-2">Borosilicate Glass</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Temperature Range:</span>
                      <span className="ml-2">5-80°C</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Pressure Rating:</span>
                      <span className="ml-2">1.5 bar</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4 border-t">
                <CartButton 
                  product={selectedProduct} 
                  className="w-full py-3 bg-[#00599c] hover:bg-[#004080] text-white"
                  showIcon={true}
                >
                  Add to Cart
                </CartButton>
                <Button
                  variant="outline"
                  className="w-full border-[#00599c] text-[#00599c] hover:bg-[#00599c] hover:text-white py-3"
                >
                  <FileText className="h-5 w-5 mr-2" />
                  Request Quotation
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="ghost" size="sm" className="text-[#00599c] hover:bg-blue-50">
                    <Download className="h-4 w-4 mr-1" />
                    Datasheet
                  </Button>
                  <Button variant="ghost" size="sm" className="text-[#00599c] hover:bg-blue-50">
                    <FileText className="h-4 w-4 mr-1" />
                    Manual
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  const renderOverview = () => (
    <div className="space-y-8">
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Bioreactors</h1>
          <p className="text-lg text-gray-600 mb-6">
            HABITAT Research is a bench-top bioreactor and fermenter from IKA, designed for both cell culture and
            microbial fermentation. As the first bioreactor with a 3D tank, it ensures ergonomic working and a
            well-organized laboratory, ideal for various bioprocessing applications.
          </p>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">Key Benefits:</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-[#00599c] rounded-full mt-2 flex-shrink-0"></div>
                <span>Optimized control for cell growth at any cell line</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-[#00599c] rounded-full mt-2 flex-shrink-0"></div>
                <span>Efficient use of laboratory space and culture area</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-[#00599c] rounded-full mt-2 flex-shrink-0"></div>
                <span>Wide range of freely selectable sensors</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-[#00599c] rounded-full mt-2 flex-shrink-0"></div>
                <span>Exceptionally user-friendly control software</span>
              </li>
            </ul>
          </div>
          <div className="mt-8">
            <Button className="bg-[#00599c] hover:bg-[#004080] text-white">Learn More</Button>
          </div>
        </div>
        <div>
          <img
            src="bioreactor-habitat-setup.webp"
            alt="Bioreactor System"
            className="w-full h-80 object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>

      
    </div>
  )

  const renderProducts = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Products</h2>
          <p className="text-gray-600">Showing {sampleProducts.length} products</p>
        </div>
        <div className="flex gap-2">
          <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
            <Grid className="h-4 w-4" />
          </Button>
          <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"}>
        {sampleProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            {viewMode === "grid" ? (
              <>
                <div className="relative">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-48 object-contain p-4 bg-gray-50"
                  />

                  <div className="absolute top-2 right-2">
                    <input
                      type="checkbox"
                      checked={selectedForComparison.find((p) => p.id === product.id) !== undefined}
                      onChange={() => toggleProductComparison(product)}
                      disabled={
                        selectedForComparison.length >= 3 && !selectedForComparison.find((p) => p.id === product.id)
                      }
                      className="w-4 h-4 text-[#00599c] bg-white border-2 border-gray-300 rounded focus:ring-[#00599c] focus:ring-2"
                    />
                  </div>
                  
                </div>

                  <div className="absolute top-2 right-2">
                    <input
                      type="checkbox"
                      checked={selectedForComparison.find((p) => p.id === product.id) !== undefined}
                      onChange={() => toggleProductComparison(product)}
                      disabled={
                        selectedForComparison.length >= 3 && !selectedForComparison.find((p) => p.id === product.id)
                      }
                      className="w-4 h-4 text-[#00599c] bg-white border-2 border-gray-300 rounded focus:ring-[#00599c] focus:ring-2"
                    />
                  </div>

                <CardContent className="p-4">
                  <h3 className="font-semibold text-sm mb-2 line-clamp-2">{product.name}</h3>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">PRICE</span>
                    </div>
                    <div className="text-[#00599c] font-semibold">{product.price}</div>
                    <div className="text-xs text-gray-500">Ident. No. {product.itemNumber}</div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 w-full gap-0"
                      onClick={() => openProductModal(product)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <CartButton 
                      product={product} 
                      size="sm" 
                      className="flex-1 gap-0 w-full bg-[#00599c] hover:bg-[#004080]"
                    />
                  </div>
                </CardContent>
              </>
            ) : (
              <CardContent className="p-4">
                <div className="relative">
                <div className="flex gap-4">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-24 h-24 object-contain bg-gray-50 rounded"
                  />

                      <div className="absolute -top-1 -right-1">
                      <input
                        type="checkbox"
                        checked={selectedForComparison.find((p) => p.id === product.id) !== undefined}
                        onChange={() => toggleProductComparison(product)}
                        disabled={
                          selectedForComparison.length >= 3 && !selectedForComparison.find((p) => p.id === product.id)
                        }
                        className="w-4 h-4 text-[#00599c] bg-white border-2 border-gray-300 rounded focus:ring-[#00599c] focus:ring-2"
                      />
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-[#00599c] font-semibold">{product.price}</div>
                        <div className="text-xs text-gray-500">Ident. No. {product.itemNumber}</div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openProductModal(product)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <CartButton 
                          product={product} 
                          size="sm" 
                          className="bg-[#00599c] hover:bg-[#004080]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  )

  const renderAccessories = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Accessories - Bioreactors</h2>
        <p className="text-gray-600">Essential accessories to enhance your bioreactor system</p>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <ChevronRight className="h-5 w-5 text-[#00599c]" />
            TEMPERATURE SENSORS
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Accessory 1", id: "0035004128" },
              { name: "Accessory 2", id: "0035004123" },
              { name: "Accessory 3", id: "0035004125" },
              { name: "Accessory 4", id: "0035004127" },
            ].map((item, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src="accessory.webp"
                    alt={item.name}
                    className="w-full h-48 object-contain p-4 bg-gray-50"
                  />
                </div>
                <CardContent className="p-4">
                  <h4 className="font-semibold text-sm mb-2 line-clamp-2">{item.name}</h4>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">PRICE</span>
                    </div>
                    <div className="text-[#00599c] font-semibold">On Request</div>
                    <div className="text-xs text-gray-500">Ident. No. {item.id}</div>
                  </div>
                  <Button size="sm" className="w-full mt-3 bg-[#00599c] hover:bg-[#004080]">
                    Request Quote
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <ChevronRight className="h-5 w-5 text-[#00599c]" />
            VESSEL PACKAGES
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "HABITAT cyt sw 0.5 single-wall, for 0.5 l", id: "0035004644" },
              { name: "HABITAT cyt sw 1 single-wall, for 1 l", id: "0035004645" },
              { name: "HABITAT cyt sw 2 single-wall, for 2 l", id: "0035004646" },
              { name: "HABITAT cyt sw 5 single-wall, for 5 l", id: "0035004647" },
            ].map((item, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src="/placeholder.svg?height=200&width=200&text=Vessel+Package"
                    alt={item.name}
                    className="w-full h-48 object-contain p-4 bg-gray-50"
                  />
                </div>
                <CardContent className="p-4">
                  <h4 className="font-semibold text-sm mb-2 line-clamp-2">{item.name}</h4>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">PRICE</span>
                    </div>
                    <div className="text-[#00599c] font-semibold">On Request</div>
                    <div className="text-xs text-gray-500">Ident. No. {item.id}</div>
                  </div>
                  <Button size="sm" className="w-full mt-3 bg-[#00599c] hover:bg-[#004080]">
                    Request Quote
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderDownloads = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Downloads</h2>
        <p className="text-gray-600">Technical documentation, manuals, and resources</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: "Product Brochure - Bioreactors",
            type: "PDF",
            size: "2.4 MB",
            description: "Complete overview of our bioreactor systems and capabilities",
          },
          {
            title: "Technical Specifications",
            type: "PDF",
            size: "1.8 MB",
            description: "Detailed technical specifications and dimensions",
          },
          {
            title: "Installation Manual",
            type: "PDF",
            size: "3.2 MB",
            description: "Step-by-step installation and setup guide",
          },
          {
            title: "Operating Instructions",
            type: "PDF",
            size: "4.1 MB",
            description: "Comprehensive operating manual and safety guidelines",
          },
          {
            title: "Software Manual",
            type: "PDF",
            size: "2.9 MB",
            description: "Software interface guide and troubleshooting",
          },
          {
            title: "Maintenance Guide",
            type: "PDF",
            size: "1.5 MB",
            description: "Preventive maintenance and service procedures",
          },
        ].map((download, index) => (
          <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-100 rounded-lg">
                <FileText className="h-6 w-6 text-red-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">{download.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{download.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Badge variant="outline">{download.type}</Badge>
                    <span>{download.size}</span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-[#00599c] text-[#00599c] hover:bg-[#00599c] hover:text-white"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderMainContent = () => {
    if (!selectedCategory || !selectedSubcategory) {
      return (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Select a Product Category</h2>
            <p className="text-gray-600">Choose a category and subcategory from the sidebar to view products</p>
          </div>
        </div>
      )
    }

    switch (selectedSection) {
      case "Overview":
        return renderOverview()
      case "Products":
        return renderProducts()
      case "Accessories":
        return renderAccessories()
      case "Downloads":
        return renderDownloads()
      default:
        return renderOverview()
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
        {renderProductModal()}
        {renderComparisonModal()}
      </div>
        {renderComparisonBar()}
    </div>
  )
}

