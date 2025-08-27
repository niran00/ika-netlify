"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import Homebanner from "@/components/homebanner";
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Search, ChevronRight, ChevronDown, Leaf, Recycle, Battery, Award, Trophy, FlaskRoundIcon as Flask, Cog, Dna } from "lucide-react"

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
          
          <div className="grid grid-cols-1 reletive  lg:grid-cols-1 gap-8 p-4">
            {/* Left column */}
           
            <div className="text-center">
              <h2 className="text-2xl lg:text-4xl font-bold text-[#00599c] my-4">Find Your Solution</h2>
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

        



        <section className="px-8 bg-white">
          
          <div className="grid grid-cols-1 reletive  lg:grid-cols-1 gap-8 p-4">
            {/* Left column */}
           
            <div className="text-start">
              <h2 className="text-4xl font-light text-gray-800">Our Services</h2>
            </div>
              
          <BannerSliderWrapper/>
      

          </div>
        </section>

        <section className="px-8 bg-white">
          <div className="grid grid-cols-1 reletive  lg:grid-cols-1 gap-8 pb-0 p-4">
            {/* Left column */}
           
          <SlickSlider/>
          
          {/* <StickyServices></StickyServices> */}
          <LaboratoryServices/>

          </div>
        </section>
        
        <section className=" bg-gray-50">
           <div className="px-12 py-6 text-start">
              <h2 className="text-4xl font-light text-gray-800">Industries</h2>
          </div>
          <IndustryGrid></IndustryGrid>

        </section>
        



      {/* <OverlappingSections/>  */}
     
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
    id: 4,
    name: "EV Battery Solutions",
    category: "Precision Powered: Defining Excellence in EV Battery Production",
    price: "Contact for pricing",
    image:  "/start_4_divisions_bio_new4.webp",
    badge: "Featured",
    rating: 4.8,
    reviews: 203,
    description: "High-speed disperser for homogenization",
  },
]