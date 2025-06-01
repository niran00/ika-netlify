"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import {
  ChevronRight,
  ChevronDown,
  Search,
  Grid,
  List,
  FileText,
  Package,
  Wrench,
  Download,
  Eye,
  ShoppingCart,
  Menu,
  CheckCircle,
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

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
    image: "product1.webp",
    price: "On Request",
    itemNumber: "0035004128",
    category: "Bioreactors",
  },
  {
    id: 2,
    name: "Product 2",
    image: "product2.webp",
    price: "On Request",
    itemNumber: "0035004129",
    category: "Bioreactors",
  },
  {
    id: 3,
    name: "Product 3",
    image: "product3.webp",
    price: "On Request",
    itemNumber: "0035004130",
    category: "Bioreactors",
  },
  {
    id: 4,
    name: "Product 4",
    image: "product4.webp",
    price: "On Request",
    itemNumber: "0035004131",
    category: "Bioreactors",
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
                    src={selectedProduct.image}
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
                <Button className="w-full bg-[#00599c] hover:bg-[#004080] text-white py-3">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
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
                  <Button
                    size="sm"
                    className="text-white p-2 w-full mt-3 bg-[#00599c] hover:bg-[#004080]"
                    onClick={() => openProductModal(product)}
                  >
                    View Product
                  </Button>
                </CardContent>
              </>
            ) : (
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-24 h-24 object-contain bg-gray-50 rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-[#00599c] font-semibold">{product.price}</div>
                        <div className="text-xs text-gray-500">Ident. No. {product.itemNumber}</div>
                      </div>
                      <Button
                        size="sm"
                        className="bg-[#00599c] hover:bg-[#004080]"
                        onClick={() => openProductModal(product)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Product
                      </Button>
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
                  <Button size="sm" className="p-2 text-white w-full mt-3 bg-[#00599c] hover:bg-[#004080]">
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
      </div>
    </div>
  )
}
