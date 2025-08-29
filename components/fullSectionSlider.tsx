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

export default function SimpleSlider() {
  const sliderRef = useRef<any>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [progressKey, setProgressKey] = useState(0); // Used to restart progress animation

  // Trigger next slide every 5 seconds unless hovered
  useEffect(() => {
    if (isHovered) return;

    const timeout = setTimeout(() => {
      sliderRef.current?.slickNext();
      setProgressKey((prev) => prev + 1); // restart progress animation
    }, 5000);

    return () => clearTimeout(timeout);
  }, [isHovered, progressKey]);

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
    pauseOnHover: false,
    adaptiveHeight: true
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
            <div className="relative w-full mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden" >
                 {/* Main Content */}
                <div className="flex flex-col lg:flex-row  min-h-[500px]">
                   {/* Left Side - Article Display */}
                   <div className="flex-1 relative content-center p-8 text-white">
                     {/* Device Frame */}
                     <div className="relative bg-gray-900 rounded-2xl p-4 shadow-2xl mx-10">
                       <div className="bg-white-700 rounded-xl relative overflow-hidden">



                         {/* Content */}
                         <div className="relative z-10">

                           <img
                                   src="/banners/IKA_Process_Banner-Smart_Efficient,_Reliable.png"
                                   alt="IKA Company Building"
                                   className="w-full rounded-lg border"
                                 />


                         </div>


                       </div>
                     </div>
                   </div>

                   {/* Right Side - Article Info */}
                   <div className="flex-1 p-8 flex flex-col justify-center">
                     <div className="mb-4">
                       <span className="inline-block px-3 border-l-4 border-solid border-[#00599c] py-1 text-sm font-medium">
                             Scale your Labrartory
                       </span>
                     </div>

                     <p className="text-gray-600 leading-relaxed text-[#00599c] mb-4 "> NR. 1 UP Scale Partner</p>

                     <div className="flex items-center justify-between">
                       <a className="border-b-2 border-[#00599c] font-bold text-[#00599c] pb-1">View Products</a>
                     </div>
                   </div>
                </div>
            </div>
        </div>


         <div>
            <div className="relative w-full mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden" >
                 {/* Main Content */}
                <div className="flex flex-col lg:flex-row  min-h-[500px]">
                   {/* Left Side - Article Display */}
                   <div className="flex-1 relative content-center p-8 text-white">
                     {/* Device Frame */}
                     <div className="relative bg-gray-900 rounded-2xl shadow-2xl mx-10">
                       <div className="bg-white-700 rounded-xl relative overflow-hidden">



                         {/* Content */}
                         <div className="relative z-10">

                           <img
                                   src="/ika_staufen_1280x1280.webp"
                                   alt="IKA Company Building"
                                   className="w-full rounded-lg border"
                                 />


                         </div>


                       </div>
                     </div>
                   </div>

                   {/* Right Side - Article Info */}
                   <div className="flex-1 p-8 flex flex-col justify-center">
                        <div>
                           <span className="inline-block mb-4 px-3 border-l-4 border-solid border-[#00599c] py-1 text-lg font-medium">
                             Our Company
                           </span>
                          <p className="text-md text-gray-600 mb-4 leading-relaxed">
                            IKA is where people turn visions into reality.
                          </p>
                          <p className="text-gray-600 mb-4 leading-relaxed">
                            When the corporate history of IKA began in 1910, China had not yet become a People's Republic and the
                            word "globalization" had not been invented yet. Today, the IKA group has over 900 employees at 16
                            locations on four continents.
                          </p>

                          <div className="space-y-4 mb-4">
                            <div className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-blue-[#00599c] rounded-full mt-2 flex-shrink-0"></div>
                              <p className="text-gray-600">Family-run, medium-sized company with short decision-making paths</p>
                            </div>
                            <div className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-blue-[#00599c] rounded-full mt-2 flex-shrink-0"></div>
                              <p className="text-gray-600">Investment decisions made with a long-view mindset</p>
                            </div>
                            <div className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-blue-[#00599c] rounded-full mt-2 flex-shrink-0"></div>
                              <p className="text-gray-600">Serving markets of high social relevance</p>
                            </div>
                          </div>
                          <a className="border-b-2 border-[#00599c] font-bold text-[#00599c] pb-1">Learn More About IKA</a>
                        </div>

                   </div>
                </div>
            </div>
        </div>
        
        <div>
            <div className="relative w-full mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden" >
                 {/* Main Content */}
                <div className="flex flex-col lg:flex-row  min-h-[500px]">
                   {/* Left Side - Article Display */}
                   <div className="flex-1 relative content-center p-8 text-white">
                     {/* Device Frame */}
                     <div className="relative rounded-2xl  mx-auto">
                       <div className="bg-white-700 rounded-xl relative overflow-hidden">



                         {/* Content */}
                         <div className="relative z-10">

                           <img
                                   src="/ika100years.png"
                                   alt="IKA Company Building"
                                   width={300}
                                   className="rounded-lg border mx-auto"
                                 />


                         </div>


                       </div>
                     </div>
                   </div>

                   {/* Right Side - Article Info */}
                   <div className="flex-1 p-8 flex flex-col justify-center">
                        <div>
                           <span className="inline-block mb-4 px-3 border-l-4 border-solid border-[#00599c] py-1 text-lg font-medium">
                             100 Years of IKA Works
                           </span>
                          <p className="text-md text-gray-600 mb-4 leading-relaxed">
                            IKA Works GmbH & Co. KG in Staufen can now look back on a century of company history.
                          </p>
                          <p className="text-gray-600 mb-4 leading-relaxed">
                            Founded in 1910 as a supplier for pharmacies and hospitals, the company left bombed-out Cologne for Staufen in Breisgau in 1942. It quickly became the world's leading company for laboratory technology as well as dispersing, stirring and kneading machines.
                          </p>

                            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Milestones</h3>
                                <div className="space-y-3">
                                  <div className="flex items-center space-x-3">
                                    <span className="text-blue-600 font-semibold">1910</span>
                                    <span className="text-gray-600">Company founded</span>
                                  </div>
                                  <div className="flex items-center space-x-3">
                                    <span className="text-blue-600 font-semibold">1942</span>
                                    <span className="text-gray-600">Moved to Staufen</span>
                                  </div>
                                  <div className="flex items-center space-x-3">
                                    <span className="text-blue-600 font-semibold">Today</span>
                                    <span className="text-gray-600">900+ employees, 16 locations</span>
                                  </div>
                                </div>
                            </div>

                          <Button variant="outline" className="ml-2 border-[#00599c] text-[#00599c] hover:bg-[#00599c] bg-transparent">
                            Download Brochure
                          </Button> 

                        
                          
                        </div>

                   </div>
                </div>
            </div>
        </div>

        <div>
            <div className="relative w-full mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden" >
                 {/* Main Content */}
                <div className="flex flex-col lg:flex-row  min-h-[500px]">
                   {/* Left Side - Article Display */}
                   <div className="flex-1 relative content-center p-8 text-white">
                     {/* Device Frame */}
                     <div className="relative rounded-2xl  mx-auto">
                       <div className="bg-white-700 rounded-xl relative overflow-hidden">



                         {/* Content */}
                         <div className="relative z-10">

                           <img
                                   src="/banners/Process-Banner-Safe Sustainable-Scalable.png"
                                   alt="IKA Company Building"
                                   className="rounded-lg border w-full"
                                 />


                         </div>


                       </div>
                     </div>
                   </div>

                   {/* Right Side - Article Info */}
                   <div className="flex-1 p-8 flex flex-col justify-center">
                        <div>
                           <span className="inline-block mb-4 px-3 border-l-4 border-solid border-[#00599c] py-1 text-lg font-medium">
                             Sustainability at IKA
                           </span>
                           <p className="text-lg text-blue-600 mb-4 font-medium">Sustainable. Self-evident</p>
                          <p className="text-md text-gray-600 mb-4 leading-relaxed">
                            IKA is dedicated to sustainability, sharing its environmental information with Ecovadis and achieving recognition. The company's innovative solutions enable the combination of substances at all steps of material into innovative products, with a focus on increasing sustainability.
                          </p>
                          

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                                  <div className="text-green-600 mt-1">
                                    <Leaf className="w-6 h-6" />
                                  </div>
                                  <div>
                                    <h4 className="font-semibold text-gray-800 mb-1">ECO Friendly R290</h4>
                                    <p className="text-sm text-gray-600">
                                      Natural refrigerant with significantly reduced environmental impact
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                                  <div className="text-green-600 mt-1">
                                    <Recycle className="w-6 h-6" />
                                  </div>
                                  <div>
                                    <h4 className="font-semibold text-gray-800 mb-1">Long Product Life</h4>
                                    <p className="text-sm text-gray-600">Designed for durability and extended service life</p>
                                  </div>
                                </div>
                                <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                                  <div className="text-green-600 mt-1">
                                    <Battery className="w-6 h-6" />
                                  </div>
                                  <div>
                                    <h4 className="font-semibold text-gray-800 mb-1">Energy Efficient</h4>
                                    <p className="text-sm text-gray-600">Optimized energy consumption for sustainable operations</p>
                                  </div>
                                </div>
                                <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                                  <div className="text-green-600 mt-1">
                                    <Award className="w-6 h-6" />
                                  </div>
                                  <div>
                                    <h4 className="font-semibold text-gray-800 mb-1">Certified Quality</h4>
                                    <p className="text-sm text-gray-600">ISO certified environmental management systems</p>
                                  </div>
                                </div>
                            </div>

                             <a className="border-b-2 border-[#00599c] font-bold text-[#00599c] pb-1">View Our Portfolio</a>

                        
                          
                        </div>

                   </div>
                </div>
            </div>
        </div>

        <div>
            <div className="relative w-full mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden" >
                 {/* Main Content */}
                <div className="flex flex-col lg:flex-row  min-h-[500px]">
                   {/* Left Side - Article Display */}
                   

                   <div className="flex-1 relative content-center p-8 text-white">

                    
                     
                     {/* Device Frame */}
                     <div className="relative rounded-2xl  mx-auto">
                       <div className="bg-white-700 rounded-xl relative overflow-hidden">
                         {/* Content */}
                         <div className="relative z-10">
                           <img
                                   src="/2024_banner_IKA-awards-25_833x360px.webp"
                                   alt="IKA Company Building"
                                   className="rounded-lg border w-full"
                                 />
                         </div>
                       </div>
                     </div>
                     
                     <div className="bg-blue-50 p-6 rounded-lg mt-4">
                       <h3 className="text-xl font-semibold text-gray-800 mb-2">World market leader 2025</h3>
                       <p className="text-gray-600 text-sm">
                         Recognized by WirtschaftsWoche magazine as world market leader for innovative laboratory equipment.
                       </p>
                     </div>

                   </div>

                   {/* Right Side - Article Info */}
                   <div className="flex-1 p-8 flex flex-col justify-center">
                        <div>
                           <span className="inline-block mb-4 px-3 border-l-4 border-solid border-[#00599c] py-1 text-lg font-medium">
                             Award-winning time and again
                           </span>
                           <p className="text-lg text-blue-600 mb-4 font-medium">Laboratory equipment from IKA</p>
                          {/* <p className="text-md text-gray-600 mb-4 leading-relaxed">
                            Innovative strength, design quality and a sense of responsibility - this triad regularly earns us awards and recognition. We take this as an incentive to continue innovating with entrepreneurial courage, dynamic processes and a strong commitment to learn and communicate.
                          </p> */}
                          

                            <div className="space-y-4 mb-8">
                                <Card className="border-l-4 border-l-red-500 shadow-sm">
                                  <CardContent className="p-4">
                                    <div className="flex items-start space-x-3">
                                      <Trophy className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                                      <div>
                                        <div className="flex items-center space-x-2 mb-1">
                                          <span className="font-semibold text-gray-800">Red Dot Design Award</span>
                                          <span className="text-sm text-gray-500">2024</span>
                                        </div>
                                        <p className="text-sm text-gray-600">For innovative mini disperser design</p>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                                <Card className="border-l-4 border-l-red-500 shadow-sm">
                                  <CardContent className="p-4">
                                    <div className="flex items-start space-x-3">
                                      <Trophy className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                                      <div>
                                        <div className="flex items-center space-x-2 mb-1">
                                          <span className="font-semibold text-gray-800">iF Design Award</span>
                                          <span className="text-sm text-gray-500">2023</span>
                                        </div>
                                        <p className="text-sm text-gray-600">Outstanding product design recognition</p>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                                <Card className="border-l-4 border-l-red-500 shadow-sm">
                                  <CardContent className="p-4">
                                    <div className="flex items-start space-x-3">
                                      <Trophy className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                                      <div>
                                        <div className="flex items-center space-x-2 mb-1">
                                          <span className="font-semibold text-gray-800">German Design Award</span>
                                          <span className="text-sm text-gray-500">2022</span>
                                        </div>
                                        <p className="text-sm text-gray-600">Excellence in industrial design</p>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>

                             <a className="border-b-2 border-[#00599c] font-bold text-[#00599c] pb-1">View All Awards</a>

                        
                          
                        </div>

                   </div>
                </div>
            </div>
        </div>

      </Slider>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200 overflow-hidden">
        {!isHovered && (
          <div
            key={progressKey} // force animation restart
            className="h-full bg-[#00599c] animate-progress"
          />
        )}
      </div>

      <style jsx>{`
        @keyframes progress {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }

        .animate-progress {
          animation: progress 5s linear forwards;
        }
      `}</style>
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

