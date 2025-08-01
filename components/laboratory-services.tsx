"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Phone,
  Settings,
  Award,
  Wrench,
  Users,
  TestTube,
  GraduationCap,
  Download,
  FileText,
  Package,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

export default function LaboratoryServices() {
  const [labServicesIndex, setLabServicesIndex] = useState(0)

  const laboratoryServices = [
    { name: "Mixing", icon: Phone, image: "/placeholder.svg?height=200&width=300&text=24/7+Hotline" },
    {
      name: "Stirring",
      icon: Settings,
      image: "/placeholder.svg?height=200&width=300&text=Service+Warranty",
    },
    {
      name: "Dispersing",
      icon: Award,
      image: "/placeholder.svg?height=200&width=300&text=Calibration",
    },
    { name: "Solids/Liquids Mixing", icon: Wrench, image: "/placeholder.svg?height=200&width=300&text=Customizing" },
    {
      name: "Wet milling",
      icon: Users,
      image: "/placeholder.svg?height=200&width=300&text=Application+Support",
    },
    { name: "Dry milling", icon: TestTube, image: "/placeholder.svg?height=200&width=300&text=Trial+Devices" },
    { name: "Homogenizing", icon: GraduationCap, image: "/placeholder.svg?height=200&width=300&text=Training" },
    { name: "Emulsifying", icon: Download, image: "/placeholder.svg?height=200&width=300&text=Firmware" },
    { name: "Drying", icon: FileText, image: "/placeholder.svg?height=200&width=300&text=Manuals" },
    { name: "Crushing", icon: Package, image: "/placeholder.svg?height=200&width=300&text=Spare+Parts" },
    { name: "Electrosynthesis", icon: Package, image: "/placeholder.svg?height=200&width=300&text=Spare+Parts" },
    
  ]

  const nextLabServicesSlide = () => {
    setLabServicesIndex((prev) => (prev + 1) % Math.ceil(laboratoryServices.length / 5))
  }

  const prevLabServicesSlide = () => {
    setLabServicesIndex(
      (prev) => (prev - 1 + Math.ceil(laboratoryServices.length / 5)) % Math.ceil(laboratoryServices.length / 5),
    )
  }

  return (
    <section className="bg-white">
      <div className="container">
        <div className="text-start">
          <h2 className="text-4xl mb-8 font-light text-gray-800">Processes</h2>
        </div>
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {laboratoryServices.slice(labServicesIndex * 5, labServicesIndex * 5 + 5).map((service, index) => {
              const IconComponent = service.icon
              return (
                <Card
                  key={service.name}
                  className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <CardContent className="p-0">
                    <div className="relative">
                      <Image
                        src={service.image || "/placeholder.svg"}
                        alt={service.name}
                        width={300}
                        height={200}
                        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        {/* <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center mb-2">
                          <IconComponent className="w-5 h-5 text-white" />
                        </div> */}
                        <h3 className="font-bold text-white text-sm">{service.name}</h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
          {laboratoryServices.length > 5 && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white shadow-lg"
                onClick={prevLabServicesSlide}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white shadow-lg"
                onClick={nextLabServicesSlide}
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
