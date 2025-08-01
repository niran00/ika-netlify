"use client"

import { useState, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const slides = [
  {
    id: 1,
    title: "Services",
    subtitle: "First-rate quality from initial consultation all the way to production",
    image: "/service/proc_services.jpg",
    color: "bg-gradient-to-br from-slate-800 to-slate-900",
  },
  {
    id: 2,
    title: "Engineering",
    subtitle: "",
    image: "/service/proc_engineering.jpg",
    color: "bg-gradient-to-br from-slate-700 to-slate-800",
  },
  {
    id: 3,
    title: "Test Center",
    subtitle: "From idea to solution",
    image: "/service/proc_technikum.jpg",
    color: "bg-gradient-to-br from-slate-600 to-slate-700",
  },
  {
    id: 4,
    title: "Rental Equipment",
    subtitle: "",
    image: "/service/proc_rental.jpg",
    color: "bg-gradient-to-br from-slate-500 to-slate-600",
  },
  {
    id: 5,
    title: "Commissioning",
    subtitle: "",
    image: "/service/proc_implementing.jpg",
    color: "bg-gradient-to-br from-slate-500 to-slate-600",
  },
  {
    id: 6,
    title: "Qualification",
    subtitle: "",
    image: "/service/proc_qualification.jpg",
    color: "bg-gradient-to-br from-slate-400 to-slate-500",
  },
  {
    id: 7,
    title: "Automation",
    subtitle: "",
    image: "/service/proc_automatisation.jpg",
    color: "bg-gradient-to-br from-slate-400 to-slate-500",
  },
  {
    id: 8,
    title: "After Sales Support",
    subtitle: "",
    image: "/service/proc_aftersales.jpg",
    color: "bg-gradient-to-br from-slate-400 to-slate-500",
  },
  {
    id: 9,
    title: "Virtual Reality in R&D and Industry",
    subtitle: "",
    image: "/service/Headerbild_VR_833x330_proc.jpg",
    color: "bg-gradient-to-br from-slate-400 to-slate-500",
  },
]

export default function SlickSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex >= slides.length - 1 ? 0 : prevIndex + 1))
  }

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex <= 0 ? slides.length - 1 : prevIndex - 1))
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  // Calculate transform for center mode with special handling for first and last slides
  // const getTransform = () => {
  //   const slideWidth = 60 // 60% width for each slide
  //   const slideGap = 2 // 2% gap between slides (1% on each side from mx-1)
  //   const totalSlideWidth = slideWidth + slideGap // Total width including gap

  //   // Special case for first slide - start at left edge with no gray space
  //   if (currentIndex === 0) {
  //     return "translateX(0%)"
  //   }

  //   // Special case for last slide - position so it touches the right border
  //   if (currentIndex === slides.length - 1) {
  //     return `translateX(-439.8%)`
  //   }

  //   // For middle slides, center them with the normal calculation
  //   const centerOffset = (100 - slideWidth) / 2 // 20% for 60% width slides
  //   return `translateX(calc(-${currentIndex * totalSlideWidth}% + ${centerOffset}%))`
  // }

  const getTransform = () => {
    const slideWidth = 60 // 60% width for each slide
    const slideGap = 2 // 2% gap between slides (1% on each side from mx-1)
    const totalSlideWidth = slideWidth + slideGap // Total width including gap

    // Special case for first slide - start at left edge with no gray space
    if (currentIndex === 0) {
      return "translateX(0%)"
    }

    // Special case for last slide - position so it touches the right border
    if (currentIndex === slides.length - 1) {
      // Dynamic calculation for any number of slides
      // Last slide starts at: (slides.length - 1) * totalSlideWidth
      // Last slide ends at: lastSlideStart + slideWidth
      // We want this to equal 100%, so we move left by: (lastSlideEnd - 100)
      const lastSlideStart = (slides.length - 1) * totalSlideWidth
      const lastSlideEnd = lastSlideStart + slideWidth
      const moveAmount = lastSlideEnd - 100
      return `translateX(-${moveAmount}%)`
    }

    // For middle slides, center them with the normal calculation
    const centerOffset = (100 - slideWidth) / 2 // 20% for 60% width slides
    return `translateX(calc(-${currentIndex * totalSlideWidth}% + ${centerOffset}%))`
  }
  

  return (
    <div className="w-full">
      <div className="relative overflow-hidden rounded-2xl bg-gray-100" ref={containerRef}>

        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
         <div className="bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 sm:px-6 sm:py-3 shadow-lg">
           <span className="text-gray-900 font-medium text-sm sm:text-base lg:text-lg">Process</span>
         </div>
        </div>

        {/* Slider Container */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: getTransform(),
          }}
        >
          {slides.map((slide, index) => {
            const isActive = index === currentIndex
            const isPeeking = index === currentIndex - 1 || index === currentIndex + 1

            return (
              <div
                key={slide.id}
                className={`relative flex-shrink-0 h-96 w-[60%] transition-all duration-700 ease-in-out ${
                  isActive ? "z-10" : "z-0"
                }`}
                onClick={() => !isActive && goToSlide(index)}
              >
                <div
                  className={`h-full mx-1 rounded-xl relative overflow-hidden group cursor-pointer 
                    ${isActive ? "shadow-2xl" : "shadow-lg"} 
                    ${
                      // Special case: when on slide 1 (index 0), both slide 1 and slide 2 should be clear
                      currentIndex === 0 && (index === 0 || index === 1)
                        ? "opacity-100 scale-100"
                        : // Special case: when on last slide, both last and second-to-last should be clear
                          currentIndex === slides.length - 1 &&
                            (index === slides.length - 1 || index === slides.length - 2)
                          ? "opacity-100 scale-100"
                          : isActive
                            ? "opacity-100 scale-100"
                            : isPeeking
                              ? "opacity-100 scale-100"
                              : "opacity-100 scale-100"
                    }
                    transition-all duration-700 ease-in-out`}
                >
                  {/* Background Image */}
                  <img
                    src={slide.image || "/placeholder.svg"}
                    alt={slide.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Dark Overlay for better text readability */}
                  <div className="absolute inset-0 bg-black/20" />

                  {/* Content Overlay - Bottom Left */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <div className="max-w-md">
                      <h2 className="text-4xl font-bold mb-2 tracking-tight">{slide.title}</h2>
                      <p className="text-lg mb-6 opacity-90 font-medium">{slide.subtitle}</p>

                      {/* Action Buttons */}
                      <div className="flex gap-4">
                        {/* <Button
                          size="lg"
                          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-base font-semibold rounded-md"
                        >
                          Order Now
                        </Button> */}
                        <Button
                          variant="outline"
                          size="lg"
                          className="border-2 border-white/80 text-white hover:bg-white hover:text-black px-8 py-3 text-base font-semibold rounded-md bg-transparent"
                        >
                          Learn More
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Focus Indicator for Main Slide */}
                  {isActive && (
                    <div className="absolute inset-0 border-4 border-white/20 rounded-xl pointer-events-none" />
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Navigation Buttons */}
        <Button
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg z-10"
          onClick={goToPrev}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg z-10"
          onClick={goToNext}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 right-8 flex space-x-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>

      {/* Slide Counter */}
      {/* <div className="text-center mt-4 text-gray-600">
        <span className="text-sm">
          {currentIndex + 1} of {slides.length}
        </span>
      </div> */}
    </div>
  )
}
