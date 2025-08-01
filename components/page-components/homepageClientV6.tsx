"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import Homebanner from "@/components/homebanner";
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, ChevronRight, ChevronDown, Leaf, Recycle, Battery, Award, Trophy, FlaskRoundIcon as Flask, Cog, Dna } from "lucide-react"

import Preloader from "../preloader";
import BannerSliderWrapper from "../BannerSliderWrapper";
import StickyServices from "./stick-services";
import SlickSlider from "@/components/slick-slider"
import IndustryGrid from "@/components/industyGrid";
import OverlappingSections from "@/components/overlappingSections";
import LaboratoryServices  from "@/components/laboratory-services";
import SimpleSlider from "@/components/fullSectionSlider";

export default function HomepageClientV6() {
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
      

      {/* Hero Section */}
      <div
        className="h-[75vh] w-full bg-cover bg-center grid place-items-center"
        style={{
          backgroundImage: `url('/abstract-waves.jpg')`,
          transform: `translateY(80px)`,
          transition: "transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <Homebanner></Homebanner>
      </div>

      <section className="px-8 bg-[#F4F5F9] w-full ">

          <div className="p-4 mx-auto w-3/4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {recommendedProducts.slice(0, 4).map((product) => (
                <Card
                  key={product.id}
                  className="bg-[#f5f5f7] border-none overflow-hidden hover:shadow-lg transition-transform transform duration-300"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover p-4"
                    />
                  </div>
              
                  <CardContent className="text-center pt-0 p-4">
                    <h3 className="text-small font-light text-gray-800 mb-2">{product.name}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>


      </section>

      {/* <section className="bg-white p-8 border-t-1">

              <SimpleSlider/>

      </section> */}

      <section className="w-screen overflow-hidden">
        <SimpleSlider />
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