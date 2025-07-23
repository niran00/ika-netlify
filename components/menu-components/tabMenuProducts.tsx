"use client"

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import {
  Plus,
  Minus,
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




const productCategoriesLab = [
  {
    id: "bioprocessing",
    name: "Bioprocessing",
    image: "/product1.webp",
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
    image: "/product2.webp",
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
    image: "/product3.webp",
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


const productCategoriesProcess = [
  {
    id: "pilot_plant",
    name: "Pilot Plant",
    image: "/product4.webp",
    subcategories: [
      {
        id: "magic_lab",
        name: "Magic Lab",
      },
      {
        id: "labor_pilot",
        name: "LABOR-PILOT",
      },
      {
        id: "process_pilot",
        name: "PROCESS-PILOT",
      },
      {
        id: "magic_plant",
        name: "magic PLANT",
      }
      
    ],
  },
  {
    id: "inline_dispersersm_ills",
    name: "Inline dispersers / Mills",
    image: "/process1.webp",
    subcategories: [
      {
        id: "ultra_turrax_utl",
        name: "ULTRA-TURRAX UTL",
      },
      {
        id: "utl_economy_line",
        name: "UTL Economy Line",
      },
      {
        id: "dispax_reactor_dr",
        name: "DISPAX-REACTOR DR",
      },
    ],
  },
]


const productCategoriesBio = [
  {
    id: "cell_culture",
    name: "Cell Culture",
    image: "/process2.webp",
    subcategories: [
      {
        id: "bioreactor_classic",
        name: "Bioreactor Classic",
      },
      {
        id: "wave_bioreactor",
        name: "Wave Bioreactor",
      },
      {
        id: "single_use_bioreactor",
        name: "Single-Use Bioreactor",
      },
    ],
  },
  {
    id: "fermentation",
    name: "Fermentation",
    image: "/product2.webp",
    subcategories: [
      {
        id: "bench_top_fermentor",
        name: "Bench-top Fermentor",
      },
      {
        id: "pilot_scale_fermentor",
        name: "Pilot-scale Fermentor",
      },
      {
        id: "industrial_fermentor",
        name: "Industrial Fermentor",
      },
    ],
  },
]

const productCategoriesEv = [
  {
    id: "battery_types",
    name: "Battery Types",
    image: "/product3.webp",
    subcategories: [
      {
        id: "lithium_ion",
        name: "Lithium-Ion",
      },
      {
        id: "solid_state",
        name: "Solid State",
      },
      {
        id: "nickel_metal_hydride",
        name: "Nickel-Metal Hydride",
      },
    ],
  },
  {
    id: "battery_components",
    name: "Battery Components",
    image: "/product4.webp",
    subcategories: [
      {
        id: "anodes",
        name: "Anodes",
      },
      {
        id: "cathodes",
        name: "Cathodes",
      },
      {
        id: "electrolytes",
        name: "Electrolytes",
      },
      {
        id: "battery_management_systems",
        name: "Battery Management Systems (BMS)",
      },
    ],
  },
];

type TabMenuProps = {
  productBranchUrl: string;
  // Add other props as needed
};


export default function TabMenu() {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [activeTab, setActiveTab] = useState<string>("lab")

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]
    )
  }

  const selectSubcategory = (categoryId: string, subcategoryId: string) => {
    setSelectedCategory(categoryId)
    setSelectedSubcategory(subcategoryId)
  }

  // 🔧 Set categories based on active tab
   let currentCategories = []
  if (activeTab === "Lab" || activeTab === "Biosolution") {
  currentCategories = productCategoriesLab;
  } else if (activeTab === "Process") {
    currentCategories = productCategoriesProcess;
  } else if (activeTab === "EV-battery") {
    currentCategories = productCategoriesEv;
  }

  // ✅ Derive the dynamic URL here
  const productBranchUrlMap = [
     {label : "Lab" ,  image: "/start_4_divisions_lab.webp" },
     {label :"Process" , image: "/start_4_divisions_proc.webp"},
     {label :"Biosolution", image: "/start_4_divisions_bat.webp" },
     {label :"EV-battery",  image: "/start_4_divisions_bio_new4.webp"}
  ]



  const productBranchUrl = activeTab

  return (
    <>
      <div className="px-4 pb-4 border-b">
        <p className="text-sm font-medium text-gray-500">
          IKA/products/<span className="lowercase">{productBranchUrl}</span>
        </p>
      </div>

      <div className="bg-gray-50 flex flex-col">
        {/* Tabs */}
        <div className="flex border-b border-gray-300">
          {productBranchUrlMap.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className={`px-4 py-2 font-medium ${
                activeTab === tab.label ? "border-b-2 border-[#00599c] text-[#00599c]" : "text-gray-600"
              }`}
            >
              <img
                src={tab.image}
                alt={tab.label}
                className="w-full h-24 object-cover rounded-md"
              />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Categories */}
        <div className="p-4">
          {currentCategories.map((category) => (
            <div key={category.id} className="mb-2">
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full flex items-center p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
              >
                <img style={{ width: "60px" }} className="rounded-sm" src={category.image} />
                <span className="font-medium text-gray-900 mx-6">{category.name}</span>
                {expandedCategories.includes(category.id) ? (
                  <Minus className="h-6 w-6 text-gray-500" />
                ) : (
                  <Plus className="h-6 w-6 text-gray-500" />
                )}
              </button>

              {expandedCategories.includes(category.id) && (
                <div className="ml-4 mt-2 space-y-1">
                  {category.subcategories.map((subcategory) => (
                    <div key={subcategory.id}>
                      <button
                        onClick={() => selectSubcategory(category.id, subcategory.id)}
                        className={`w-full text-left p-2 rounded-md transition-colors ${
                          selectedSubcategory === subcategory.id
                            ? "bg-[#00599c] text-white"
                            : "hover:bg-gray-100 text-gray-700"
                        }`}
                      >
                        {subcategory.name}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}