"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import Homebanner from "@/components/homebanner";
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Search, ChevronRight, ChevronDown, Leaf, Recycle, Battery, Award, Trophy, FlaskRoundIcon as Flask, Cog, Dna } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import Preloader from "../preloader";
import BannerSliderWrapper from "../BannerSliderWrapper";
import StickyServices from "./stick-services";
import SlickSlider from "@/components/slick-slider"
import IndustryGrid from "@/components/industyGrid";
import OverlappingSections from "@/components/overlappingSections";
import LaboratoryServices  from "@/components/laboratory-services";
import SimpleSlider from "@/components/fullSectionSlider";
import HomeSliderbanner from "@/components/banners/homeSliderBanner";
import BranchGrid from "@/components/branchGrid";
import PinImage from "@/components/pinImage";
import EmblaCarousel from "@/components/EmblaCarousel";


export default function HomepageClientV7() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const [loading, setLoading] = useState(true)
     
      
   
      useEffect(() => {
       const delay = setTimeout(() => {
         setLoading(false)
       }, 5000)
   
       return () => clearTimeout(delay)
     }, [])
   
     if (loading) {
       return <Preloader />
     }

  return (
    <>
      {/* Navbar */}

      <section className="w-screen overflow-hidden">
        <HomeSliderbanner />
      </section>
      

       <section className="px-8 bg-white">
          
          <div className="grid grid-cols-1 reletive  lg:grid-cols-1 gap-8">
            {/* Left column */}
           
            <div className="text-center">
              <h2 className="text-2xl lg:text-3xl font-bold text-[#00599c] my-8">Find Your Solution</h2>
              <p className="text-md lg:text-lg leading-relaxed text-[#464646]">
                Our core competencies are mixing, dispersing, separation, and temperature control. <br/> From R&D to full-scale production, we help you efficiently scale your processes and products.
              </p>

              <div style={{ width: "400px" }} className="flex-1 mt-4 mx-auto max-w-[600px] relative">
                <div className="relative">
                  <Input
                    placeholder={"Tell me something about your formulation..."}
                    // className="pl-10"
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-8 z-10" />
                </div>
              </div>

            </div>
          

            
      

          </div>
        </section>

        <section className="px-8 mt-8 bg-white">

          <BranchGrid/>
        
        </section>

        <section className="px-8 my-8 bg-white">
          
          <div className="grid grid-cols-1 reletive  lg:grid-cols-1 gap-8 p-4">
            {/* Left column */}
           
            <div className="text-center">
              <h2 className="text-3xl font-bold text-[#00599c] my-4">Our Services</h2>
            </div>


            
          

            
      

          </div>
        </section>
        
      

       <section className="bg-white">
          <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left: Text */}
            <div className="px-12">
              <h3 className="text-xl font-bold text-[#5F5F5F] my-4">Service is more than support - it's a partnership</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                When the corporate history of IKA began in 1910, China had not yet become a People's Republic and the
                word "globalization" had not been invented yet. Today, the IKA group has over 900 employees at 16
                locations on four continents.
              </p>

                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent">
                  Learn about our services
              </Button>
            </div>

                    {/* Right: Image full-bleed */}
            <div className="relative">
              <img
                src="/ika_staufen_1280x1280.webp"
                alt="IKA Company Building"
                className="w-screen h-full object-cover"
              />
            </div>
          </div>

          <div className="flex px-12 gap-10 my-12 items-stretch">
            <div className="flex flex-col justify-between w-1/2 rounded-2xl overflow-hidden p-6 bg-gray-200">
              <div>
                <h3 className="text-xl font-bold text-[#5F5F5F] mb-3">Enter Virtual Reality</h3>
                <p className="leading-relaxed text-[#464646]">Experience your solutions live today.</p>
              </div>
              <Button
                variant="default"
                className="mt-4 border-blue-600 text-blue-600 hover:bg-blue-50 bg-white self-start"
              >
                Arrange a demo
              </Button>
            </div>

            <div className="flex flex-col justify-between w-1/2 rounded-2xl overflow-hidden p-6 bg-gray-200">
              <div>
                <h3 className="text-xl font-bold text-[#5F5F5F] mb-3">Application Support</h3>
                 <p className="leading-relaxed text-[#464646]">We ensure you get the best device for your application</p>
              </div>
              <Button
                variant="default"
                className="mt-4 border-blue-600 text-blue-600 hover:bg-blue-50 bg-white self-start"
              >
                Get advice
              </Button>
            </div>
          </div>


          <div className="flex px-12 gap-10 items-stretch">
            <div className="flex flex-col justify-between w-full rounded-2xl overflow-hidden p-6 bg-gray-200">
              <div>
                <h3 className="text-xl font-bold text-[#5F5F5F] mb-3">Scale Faster, Save Costs, Ensure Consistency</h3>
                <p className="leading-relaxed text-[#464646]">Ready to scale-up? Let's chat.</p>
              </div>
              
              <div style={{ width: "400px" }} className="flex-1 mt-4 max-w-[600px] relative">
                <div className="relative">
                  <Input
                    placeholder={"Tell me something about your formulation..."}
                    // className="pl-10"
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-8 z-10" />
                </div>
              </div>

            </div>
          </div>
          

        </section>


        <section className="bg-white">
          
          <div className="grid grid-cols-1 reletive  lg:grid-cols-1 gap-8">
            {/* Left column */}
           
            <div className="text-center">
              <h2 className="text-2xl lg:text-3xl font-bold text-[#00599c] my-8">Our Industries</h2>
              <p className="text-md leading-relaxed text-[#464646]">
                In our new industry area, we combine products, services and many years of expertise to create
                <br></br>comprehensive solutions. 
                Our goal is to always offer you the best solution for your application
                <br></br>and to provide you with expert advice.
              </p>
            </div>
          </div>

          <div className="my-8">
            <PinImage></PinImage>
          </div>
          
          
        </section>


        <section className="bg-white">
          
          <div className="grid grid-cols-1 reletive  lg:grid-cols-1 gap-8">
            {/* Left column */}
           
            <div className="text-center">
              <h2 className="text-2xl lg:text-3xl font-bold text-[#00599c] my-8">Knowledge Base - Latest Articles</h2>
              <p className="text-md leading-relaxed text-[#464646]">
                A collection of informative articles and practical examples showcasing a variety of applications in the laboratory field. 
                Our goal is to<br></br>
                provide you with insights and hands-on knowledge that will help you make your processes more efficient and successful.
              </p>
            </div>
          </div>

          <div className="my-8">

            <Tabs defaultValue="lab" className="w-full">
                {/* The tab bar */}
                <div className="w-1/2 mx-auto">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="lab">Lab</TabsTrigger>
                    <TabsTrigger value="process">Process</TabsTrigger>
                    <TabsTrigger value="ev">EV battery</TabsTrigger>
                    <TabsTrigger value="bioprocessing">Bioprocessing</TabsTrigger>
                  </TabsList>
                </div>
              </Tabs>



              <section
                style={{
                  backgroundImage: "url(/31969660_2102_m10_i921_n014.jpg)",
                  backgroundPosition: "bottom right",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                }}
                className="min-h-[600px] px-8 bg-white"
              >
                <div className="p-4">
                  {/* Outer grid with 8 columns total */}
                  <div className="grid grid-cols-1 lg:grid-cols-8 gap-6">

                    {/* Products section takes 7/8 */}
                    <div className="lg:col-span-7 grid grid-cols-1 mt-8 gap-10">
              
                        <EmblaCarousel recommendedProducts={recommendedProducts} options={OPTIONS} />
                      
                    </div>
                      
                    {/* Sidebar takes 1/8 */}
                    <div className="lg:col-span-1 content-center rounded-xl p-6">
                      <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent">
                              See all →
                      </Button>
                    </div>
                  </div>
                </div>
              </section>

          </div>
          
          
        </section>

         



        <section className="px-8 bg-white h-[400px] flex items-center justify-center">
          <div className="text-center max-w-[700px]">
            <h2 className="text-2xl lg:text-3xl font-bold text-[#00599c] my-8">
              Your Career at IKA
            </h2>
            <p className="text-md lg:text-lg leading-relaxed text-[#464646]">
              Our core competencies are mixing, dispersing, separation, and temperature control. <br />
              From R&amp;D to full-scale production, we help you efficiently scale your processes and products.
            </p>

            {/* Buttons section */}
            <div className="flex justify-center gap-5 mt-8">
              <button className="px-6 py-2 rounded-xl bg-[#00599c] text-white font-medium hover:bg-[#004880] transition">
                Learn More
              </button>
              <button className="px-6 py-2 rounded-xl bg-gray-200 text-[#00599c] font-medium hover:bg-gray-300 transition">
                Contact Us
              </button>
            </div>
          </div>
        </section>


        
     
    </>
  );
}

const recommendedProducts = [
  {
    id: 1,
    name: "Laboratory Technology",
    category: "Engineered for precision and scalability in every lab setting.",
    price: "Contact for pricing",
    image:  "/start_4_divisions_lab.webp",
    badge: "Best Seller",
    rating: 4.8,
    reviews: 124,
    description: "Digital rotary evaporator with precise temperature control",
  },
  {
    id: 2,
    name: "Process Technology",
    category: "The Process Technology division of IKA offers turnkey solutions",
    price: "Contact for pricing",
    image:  "/process_b.webp",
    badge: "New",
    rating: 4.9,
    reviews: 89,
    description: "High-performance overhead stirrer for demanding applications",
  },
  {
    id: 3,
    name: "BioProcessing Solutions",
    category: "One system suitable for all bioprocessing applications",
    price: "Bioprocessing",
    image:   "/start_4_divisions_bat.webp",
    badge: "Popular",
    rating: 4.7,
    reviews: 156,
    description: "Compact magnetic stirrer with heating function",
  },
  {
    id: 1,
    name: "Laboratory Technology",
    category: "Engineered for precision and scalability in every lab setting.",
    price: "Contact for pricing",
    image:  "/start_4_divisions_lab.webp",
    badge: "Best Seller",
    rating: 4.8,
    reviews: 124,
    description: "Digital rotary evaporator with precise temperature control",
  },
  {
    id: 2,
    name: "Process Technology",
    category: "The Process Technology division of IKA offers turnkey solutions",
    price: "Contact for pricing",
    image:  "/process_b.webp",
    badge: "New",
    rating: 4.9,
    reviews: 89,
    description: "High-performance overhead stirrer for demanding applications",
  },
  {
    id: 3,
    name: "BioProcessing Solutions",
    category: "One system suitable for all bioprocessing applications",
    price: "Bioprocessing",
    image:   "/start_4_divisions_bat.webp",
    badge: "Popular",
    rating: 4.7,
    reviews: 156,
    description: "Compact magnetic stirrer with heating function",
  },
  // {
  //   id: 4,
  //   name: "EV Battery Solutions",
  //   category: "Precision Powered: Defining Excellence in EV Battery Production",
  //   price: "Contact for pricing",
  //   image:  "/start_4_divisions_bio_new4.webp",
  //   badge: "Featured",
  //   rating: 4.8,
  //   reviews: 203,
  //   description: "High-speed disperser for homogenization",
  // },
]


const OPTIONS = { align: 'start' }
const SLIDE_COUNT = 6
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())
