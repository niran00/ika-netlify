"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { 
    ChevronLeft, 
    ChevronRight,
    ChevronDown, 
    Leaf, 
    Recycle, 
    Battery, 
    Award, 
    Trophy, 
    FlaskRoundIcon as Flask, 
    Cog, 
    Dna
 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card, CardContent } from "@/components/ui/card"

export default function HomeSliderBanner() {
  const sliderRef = useRef<any>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [progressKey, setProgressKey] = useState(0); // Used to restart progress animation

  // Trigger next slide every 5 seconds unless hovered

  // useEffect(() => {
  //   if (isHovered) return;

  //   const timeout = setTimeout(() => {
  //     sliderRef.current?.slickNext();
  //     setProgressKey((prev) => prev + 1);
  //   }, 5000);

  //   return () => clearTimeout(timeout);
  // }, [isHovered, progressKey]);

  // Custom Arrows
  const NextArrow = ({ onClick }: { onClick?: () => void }) => (
    <div
      className="absolute top-1/2 right-4 z-10 transform -translate-y-1/2 cursor-pointer"
      onClick={onClick}
    >
      <ChevronRight className="text-blue-600" size={50} />
    </div>
  );

  const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
    <div
      className="absolute top-1/2 left-4 z-10 transform -translate-y-1/2 cursor-pointer "
      onClick={onClick}
    >
      <ChevronLeft className="text-blue-600" size={50} />
    </div>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    pauseOnHover: false
  };

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Slider ref={sliderRef}  {...settings}>
        {/* Slide 1 */}
        
        <div>
    <div className="relative w-full mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
      {/* Main Content */}
      <div className="relative w-full min-h-[500px]">
        <img
          src="/banner.png"
          alt="IKA Company Building"
          className="w-full h-full object-cover rounded-2xl"
        />

        {/* Text Overlay */}
          <div className="absolute inset-0 flex flex-col max-w-5xl mx-auto justify-start items-start py-8 text-white">
                  <h2 className="text-2xl lg:text-4xl font-bold text-[#00599c] my-4">Your Partner for Research & Production</h2>
                  <p className="text-md lg:text-lg leading-relaxed text-[#464646]">
                    Our core competencies are mixing, dispersing, separation, and temperature control. From<br/>R&D to full-scale production, we help you efficiently scale your processes and products.
                  </p>
                
                  <div className="flex mt-6">

                      <Button 
                        variant="outline"
                        size="lg"
                        className="text-white bg-[#00599c] mr-6 hover:bg-transparent hover:text-[#00599c] border-2 border-[#00599c]">
                        View Solutions
                      </Button>

                      <Button
                          variant="outline"
                          size="lg"
                          className="border-2 border-[#00599c] text-[#00599c] hover:bg-[#00599c] hover:text-white px-8 py-3 rounded-md bg-transparent"
                        >
                        Contact Us
                      </Button>

                  </div>
                  
                </div>
              </div>
            </div>
          </div>



        <div>
            <div className="relative w-full mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden" >
           
            </div>
        </div>
        

      </Slider>

      
    </div>
  );
}

interface NewsArticle {
  id: number
  title: string
  subtitle: string
  description: string
  readTime: string
  image: string
  category: string
}

const newsArticles: NewsArticle[] = [
  {
    id: 1,
    title: "ดีวี เผย 3 เดือนหลังบังคับใช้",
    subtitle: "พ.ร.ก.ปราบปรามอาชญากรรมออนไลน์ ยับยั้งมูลค่าความเสียหาย",
    description: "ดีวี เผย 3 เดือนหลังบังคับใช้ พ.ร.ก.ปราบปรามอาชญากรรมออนไลน์ ยับยั้งมูลค่าความเสียหายได้กว่า 5,800 ล้านบาท",
    readTime: "5 นาที",
    image: "/placeholder.svg?height=400&width=600",
    category: "ข่าวเด่น",
  },
  {
    id: 2,
    title: "รัฐบาลเร่งแก้ปัญหาน้ำท่วม",
    subtitle: "เตรียมมาตรการป้องกันน้ำท่วมฤดูฝน",
    description: "รัฐบาลเร่งเตรียมมาตรการรับมือน้ำท่วมฤดูฝน พร้อมจัดสรรง예산เพิ่มเติมช่วยเหลือผู้ประสบภัย",
    readTime: "3 นาที",
    image: "/placeholder.svg?height=400&width=600",
    category: "สังคม",
  },
  {
    id: 3,
    title: "เศรษฐกิจไทยโต 3.2%",
    subtitle: "ไตรมาสที่ 2 ขยายตัวต่อเนื่อง",
    description: "เศรษฐกิจไทยไตรมาสที่ 2 ขยายตัว 3.2% จากปีก่อน ขับเคลื่อนโดยการท่องเที่ยวและการส่งออก",
    readTime: "4 นาที",
    image: "/placeholder.svg?height=400&width=600",
    category: "เศรษฐกิจ",
  },
]

export  function SlideItem() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % newsArticles.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + newsArticles.length) % newsArticles.length)
  }, [])

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index)
  }, [])

  // Auto-slide functionality
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(nextSlide, 5000)
      return () => clearInterval(interval)
    }
  }, [isHovered, nextSlide])

  const currentArticle = newsArticles[currentSlide]

  return (
    <div
      className="relative w-full mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Content */}
      <div className="flex flex-col lg:flex-row min-h-[500px]">
        {/* Left Side - Article Display */}
        <div className="flex-1 relative bg-gradient-to-br from-emerald-600 to-emerald-800 p-8 text-white">
          {/* Device Frame */}
          <div className="relative bg-gray-900 rounded-2xl p-4 shadow-2xl max-w-md mx-auto">
            <div className="bg-emerald-700 rounded-xl p-6 relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full translate-x-12 translate-y-12"></div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h2 className="text-xl font-bold mb-2 leading-tight">{currentArticle.title}</h2>
                <h3 className="text-lg mb-4 opacity-90">{currentArticle.subtitle}</h3>

                {/* Person Image */}
                <div className="flex justify-center mb-4">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/20">
                    <Image
                      src={currentArticle.image || "/placeholder.svg"}
                      alt="News person"
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Highlight Number */}
                <div className="text-center mb-4">
                  <span className="text-3xl font-bold text-yellow-300">5,800</span>
                  <span className="text-sm ml-2">ล้านบาท</span>
                </div>
              </div>

              {/* Footer */}
              <div className="absolute bottom-2 left-4 right-4">
                <div className="text-xs opacity-75 text-center">MDES</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Article Info */}
        <div className="flex-1 p-8 flex flex-col justify-center">
          <div className="mb-4">
            <span className="inline-block bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
              {currentArticle.category}
            </span>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">{currentArticle.title}</h1>

          <p className="text-gray-600 mb-6 leading-relaxed">{currentArticle.description}</p>

          <div className="flex items-center justify-between">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg">อ่านต่อ</Button>
            <span className="text-sm text-gray-500">อ่าน {currentArticle.readTime}</span>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg rounded-full w-12 h-12"
        onClick={prevSlide}
      >
        <ChevronLeft className="w-6 h-6 text-gray-700" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg rounded-full w-12 h-12"
        onClick={nextSlide}
      >
        <ChevronRight className="w-6 h-6 text-gray-700" />
      </Button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {newsArticles.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-emerald-600 scale-110" : "bg-gray-300 hover:bg-gray-400"
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      {/* Progress Bar */}
      {!isHovered && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
          <div
            className="h-full bg-emerald-600 transition-all duration-100 ease-linear"
            style={{
              width: `${((Date.now() % 5000) / 5000) * 100}%`,
              animation: isHovered ? "none" : "progress 5s linear infinite",
            }}
          />
        </div>
      )}

      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  )
}

