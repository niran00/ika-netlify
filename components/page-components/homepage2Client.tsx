"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { Badge } from "../ui/badge"
import { Input } from "../ui/input"
import Link from "next/link"
import ChatLauncher from "../ChatLauncher"
import { useDictionary } from "@/context/dictionary-context"
import "flag-icons/css/flag-icons.min.css";
import Preloader from "../preloader"

import {
  ArrowRight,
  Play,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Star,
  Beaker,
  Cog,
  Zap,
  Microscope,
  CheckCircle,
  Users,
  Award,
  Phone,
  Calendar,
  Download,
} from "lucide-react"





const heroSlides = [
  {
    id: 1,
    title: "Laboratory Technology",
    subtitle: "Welcome to IKA",
    description: "Start your lab automation journey with labworldsoft",
    image: "labratory-banner.webp",
    cta: "View Products",
    type: "Innovation",
  },
  {
    id: 2,
    title: "IKA laboratory technology",
    subtitle: " offers a wide range of innovative equipment for numerous applications in research and development.",
    description: "Market leaders trust in our proven technology for their mixing, heating, distilling and crushing applications. ",
    image: "/lab-2.webp",
    cta: "Explore Solutions",
    type: "Technology",
  },
  {
    id: 3,
    title: "100 Years of IKA Works",
    subtitle: "IKA has gained a leading position in the world market with its innovative.",
    description: "Our state-of-the-art test center helps you scale from laboratory to production",
    image: "/lab-3.webp",
    cta: "Visit Test Center",
    type: "Service",
  },
  {
    id: 4,
    title: "Compact & Highly Efficient Mixing Plant XPP",
    subtitle: "Advanced Process Technology",
    description: "Innovative mixing solutions for pharmaceutical and chemical applications",
    image: "/lab-4.webp",
    cta: "Learn More",
    type: "Process",
  },
]

const technologySections = [
  {
    id: "laboratory-technology",
    title: "Laboratory Technology",
    subtitle: "designed for scientists",
    icon: Microscope,
    description:
      "IKA laboratory technology offers a wide range of innovative equipment for numerous applications in research and development. Market leaders trust in our proven technology for their mixing, heating, distilling and crushing applications.",
    features: [
      "Start your lab automation journey with labworldsoft®",
      "Maximum power with minimum footprint",
      "Innovative laboratory solutions for research and development",
      "Proven technology trusted by market leaders worldwide",
    ],
    image: "/placeholder.svg?height=400&width=600&text=Laboratory+Equipment",
    cta: "Explore Laboratory Solutions",
  },
  {
    id: "process-technology",
    title: "Process Technology",
    subtitle: "designed to work perfectly",
    icon: Cog,
    description:
      "The Process Technology division of IKA offers turnkey solutions and state-of-the-art manufacturing options. IKA's solutions include: dispersing machines, homogenizers, stirrers, jet flow agitators, kneading machines, vacuum dryers as well as ready-for-use process plants.",
    features: [
      "Test Center: from idea to solution",
      "Compact & highly efficient mixing plant XPP",
      "Turnkey solutions and manufacturing options",
      "Consulting, design and realization of complex projects",
    ],
    image: "/placeholder.svg?height=400&width=600&text=Process+Technology",
    cta: "Discover Process Solutions",
  },
  {
    id: "bioprocessing-solutions",
    title: "BioProcessing Solutions",
    subtitle: "precision powered bioprocessing",
    icon: Beaker,
    description:
      "Advanced bioreactor systems and bioprocessing equipment for pharmaceutical and biotechnology applications. Our systems provide optimal conditions for cell culture and fermentation processes.",
    features: [
      "Bioreactor systems for all bioprocessing applications",
      "Advanced control for cell growth at any cell line",
      "Efficient use of laboratory space and culture area",
      "Scalable from laboratory to production scale",
    ],
    image: "/placeholder.svg?height=400&width=600&text=Bioprocessing+Equipment",
    cta: "View Bioprocessing Solutions",
  },
  {
    id: "ev-battery-solutions",
    title: "EV Battery Solutions",
    subtitle: "defining excellence in EV battery production",
    icon: Zap,
    description:
      "IKA provides scalable and efficient machinery solutions to solve complex challenges in EV battery manufacturing. Our comprehensive approach covers the entire production chain from materials to finished cells.",
    features: [
      "Turnkey to customized systems",
      "Ready to scale into processing",
      "Flexible to new emerging materials",
      "R&D to large-scale production capabilities",
    ],
    image: "/placeholder.svg?height=400&width=600&text=EV+Battery+Technology",
    cta: "Explore EV Solutions",
  },
]

const services = [
  {
    title: "Application Support",
    description: "Expert guidance for optimal equipment selection and application development",
    icon: Users,
    features: ["Technical consultation", "Method development", "Process optimization"],
    image: "/placeholder.svg?height=300&width=400&text=Application+Support",
  },
  {
    title: "Training & Education",
    description: "Comprehensive training programs for equipment operation and maintenance",
    icon: Award,
    features: ["On-site training", "Online seminars", "Certification programs"],
    image: "/placeholder.svg?height=300&width=400&text=Training+Programs",
  },
  {
    title: "Service & Warranty",
    description: "Professional maintenance and repair services with comprehensive warranty coverage",
    icon: CheckCircle,
    features: ["Preventive maintenance", "Repair services", "Extended warranty options"],
    image: "/placeholder.svg?height=300&width=400&text=Service+Support",
  },
  {
    title: "Calibration & Qualification",
    description: "Certified calibration and qualification services for regulatory compliance",
    icon: Award,
    features: ["ISO certified calibration", "IQ/OQ/PQ documentation", "Compliance support"],
    image: "/placeholder.svg?height=300&width=400&text=Calibration+Services",
  },
  {
    title: "Trial Devices",
    description: "Test equipment in your laboratory before making a purchase decision",
    icon: Beaker,
    features: ["Equipment trials", "Method validation", "Performance testing"],
    image: "/placeholder.svg?height=300&width=400&text=Trial+Equipment",
  },
  {
    title: "Customizing Center",
    description: "Tailored solutions designed to meet your specific application requirements",
    icon: Cog,
    features: ["Custom modifications", "Specialized accessories", "Bespoke solutions"],
    image: "/placeholder.svg?height=300&width=400&text=Custom+Solutions",
  },
  {
    title: "24/7 Hotline",
    description: "Round-the-clock technical support for urgent issues and emergency assistance",
    icon: Phone,
    features: ["Emergency support", "Technical helpdesk", "Remote diagnostics"],
    image: "/placeholder.svg?height=300&width=400&text=24-7+Support",
  },
  {
    title: "Spare Parts",
    description: "Genuine spare parts to maintain peak performance and extend equipment life",
    icon: Cog,
    features: ["Genuine parts", "Fast delivery", "Inventory management"],
    image: "/placeholder.svg?height=300&width=400&text=Spare+Parts",
  },
]

const articles = [
  {
    id: 1,
    title: "IKA is once again 'World Market Leader Champion' in 2025",
    excerpt: "One of the fastest-growing medium-sized companies in Germany",
    image: "/placeholder.svg?height=200&width=300&text=World+Market+Leader+Award",
    date: "March 15, 2025",
    category: "News",
    readTime: "3 min read",
  },
  {
    id: 2,
    title: "Maximum power with minimum footprint",
    excerpt: "The latest new disperser series offers exceptional performance in compact design",
    image: "/placeholder.svg?height=200&width=300&text=Compact+Disperser",
    date: "March 10, 2025",
    category: "Product News",
    readTime: "5 min read",
  },
  {
    id: 3,
    title: "Innovative Laboratory Solutions - IKA SPECIALS Q2/2025",
    excerpt: "Discover our latest innovations and special offers for laboratory equipment",
    image: "/placeholder.svg?height=200&width=300&text=IKA+Specials+Q2",
    date: "March 5, 2025",
    category: "Promotions",
    readTime: "4 min read",
  },
  {
    id: 4,
    title: "Start your lab automation journey with labworldsoft®",
    excerpt: "Comprehensive software solutions for modern laboratory management",
    image: "/placeholder.svg?height=200&width=300&text=Lab+Automation+Software",
    date: "February 28, 2025",
    category: "Technology",
    readTime: "6 min read",
  },
]

const recommendedProducts = [
  {
    id: 1,
    name: "Product 1",
    category: "Overhead Stirrers",
    price: "Contact for pricing",
    image:  "/product1.webp",
    badge: "Best Seller",
    rating: 4.8,
    reviews: 124,
    description: "Digital rotary evaporator with precise temperature control",
  },
  {
    id: 2,
    name: "Product 2",
    category: "Bioreactors",
    price: "Contact for pricing",
    image:  "/product2.webp",
    badge: "New",
    rating: 4.9,
    reviews: 89,
    description: "High-performance overhead stirrer for demanding applications",
  },
  {
    id: 3,
    name: "Product 3",
    category: "Magnetic Stirrers",
    price: "Bioprocessing",
    image:   "/product3.webp",
    badge: "Popular",
    rating: 4.7,
    reviews: 156,
    description: "Compact magnetic stirrer with heating function",
  },
  {
    id: 4,
    name: "Product 4",
    category: "Electrochemistry Kit",
    price: "Contact for pricing",
    image:  "/product4.webp",
    badge: "Featured",
    rating: 4.8,
    reviews: 203,
    description: "High-speed disperser for homogenization",
  },
  {
    id: 5,
    name: "Product 5",
    category: "Screening System",
    price: "Contact for pricing",
    image:  "/process1.webp",
    badge: "Recommended",
    rating: 4.6,
    reviews: 78,
    description:
      "Precision heating bath with digital temperature control and safety features. Ideal for laboratory applications requiring consistent temperature maintenance.",
  },
]

interface data{
  data : any;
}

export default function HomepageClient(data : any){
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentServiceSlide, setCurrentServiceSlide] = useState(0)
  const [email, setEmail] = useState("")
  const [showAfterComponent, setShowAfterComponent] = useState(false)

  const [loading, setLoading] = useState(true)
  

 
  console.log(data);

   const { dict, lang } = useDictionary()

    
   console.log(dict)
   console.log(lang)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const serviceTimer = setInterval(() => {
      setCurrentServiceSlide((prev) => (prev + 1) % services.length)
    }, 5000)
    return () => clearInterval(serviceTimer)
  }, [])

   useEffect(() => {
    const delay = setTimeout(() => {
      setLoading(false)
    }, 5000)

    return () => clearTimeout(delay)
  }, [])

  if (loading) {
    return <Preloader />
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  const nextServiceSlide = () => {
    setCurrentServiceSlide((prev) => (prev + 1) % services.length)
  }

  const prevServiceSlide = () => {
    setCurrentServiceSlide((prev) => (prev - 1 + services.length) % services.length)
  }

  const getVisibleServices = () => {
    const visibleServices = []
    for (let i = 0; i < 3; i++) {
      const index = (currentServiceSlide + i) % services.length
      visibleServices.push(services[index])
    }
    return visibleServices
  }

  function AfterComponent() {
  return (
    <p className="mt-4 text-green-600 opacity-0 animate-fade-in">
      Your perfect lab solution awaits!
    </p>
  )
}

    return (
        <>

<section className="relative w-full h-[75vh] bg-white flex items-center">
  {/* Overlayed Video Background */}
  <div className="absolute inset-0">
    {/* Responsive Video Sources */}
    <Image
      src="/abstract-waves.jpg"
      alt="Banner Background"
      className="absolute top-0 left-0 w-full h-full object-cover"
      fill
    />

    {/* Dark overlay */}
    <div className="absolute inset-0 " />
  </div>

  {/* Foreground Content */}
  <div className="container relative z-5 h-[75vh] mx-auto px-4 flex flex-col lg:justify-between justify-center py-10">
    {/* Centered Heading */}
    <div className="md:flex-grow flex-col flex items-center md:justify-center">
      <Image
        src="/logo.webp"
        alt="IKA Logo"
        className="w-32 h-auto mb-4 md:mb-0"
        width={128}
        height={128}
      />
     
        <div className="mt-6 flex items-center justify-center gap-4">
              <a
                className="flex items-center justify-center w-12 h-12 border-2 border-gray-300 rounded-full shadow-sm hover:border-blue-500 transition-all duration-200"
                href={`/en/homeV2`}
              >
                <span className="fi fi-us text-xl"></span>
              </a>
              <a
                className="flex items-center justify-center w-12 h-12 border-2 border-gray-300 rounded-full shadow-sm hover:border-blue-500 transition-all duration-200"
                href={`/de/homeV2`}
              >
                <span className="fi fi-de text-xl"></span>
              </a>
              <a
                className="flex items-center justify-center w-12 h-12 border-2 border-gray-300 rounded-full shadow-sm hover:border-blue-500 transition-all duration-200"
                href={`/th/homeV2`}
              >
                <span className="fi fi-th text-xl"></span>
              </a>
        </div>


      <div className="text-center mt-3 text-white text-sm  rounded-md p-1 bg-white opacity-90 font-bold mb-4">
        <p className="text-zinc-400">{dict.searchTxt}</p>
      </div>
      <div className="w-full text-center mt-3">
        <ChatLauncher></ChatLauncher>
      </div>

    </div>

  </div>

  
</section>

<section className="py-16 bg-gray-50 border-t">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Products</h2>
              <p className="text-lg text-gray-600">Professional laboratory equipment trusted by scientists worldwide</p>
            </div>
            <Button
              variant="outline"
              className="hidden md:flex border-[#00599c] text-[#00599c] hover:bg-[#00599c] hover:text-white"
            >
              View All Products <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left side - 2x2 grid of smaller products */}
            <div className="col-span-1 lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {recommendedProducts.slice(0, 4).map((product) => (
                <Card
  key={product.id}
  className="overflow-hidden hover:shadow-lg transform transition-transform duration-300 hover:scale-105 bg-white"
>

                  <div className="relative">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-40 object-contain p-4"
                    />
                   
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                    <p className="text-sm text-gray-500 mb-3">{product.category}</p>
                    <div className="flex items-center gap-2 mb-3">
                    
                    
                    </div>
                    
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Right side - Featured product */}
            <div className="col-span-1">
              <Card className="overflow-hidden content-end hover:shadow-lg transform transition-transform duration-300 hover:scale-105 bg-white h-full">

                <div className="relative">
                  <img
                    src={recommendedProducts[4].image || "/placeholder.svg"}
                    alt={recommendedProducts[4].name}
                    className="w-full object-contain p-6"
                  />
                  
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl mb-2">{recommendedProducts[4].name}</h3>
                  <p className="text-gray-600 mb-3">{recommendedProducts[4].category}</p>
                 
                 
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>


        </>
    )

}