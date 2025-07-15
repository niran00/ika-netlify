"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import Homebanner from "@/components/homebanner";
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, Leaf, Recycle, Battery, Award, Trophy, FlaskRoundIcon as Flask, Cog, Dna } from "lucide-react"

import Preloader from "../preloader";

import OverlappingSections from "@/components/page-components/overlappingSections";

export default function Homepage4Client() {
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
          transform: `translateY(${Math.min(scrollY * 0.4, 80)}px)`,
          transition: "transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <Homebanner></Homebanner>
      </div>

      {/* Content Card */}
      <div
        className="bg-white bg-opacity-80 backdrop-blur-md shadow-xl rounded-lg mx-4 lg:mx-12 -mt-16 p-8"
        style={{
          transform: `translateY(${-Math.min(scrollY * 0.4, 80)}px)`,
          transition: "transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        

         <section className="py-20 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-light text-gray-800 mb-6">Welcome to IKA</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                IKA is where people turn visions into reality.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                When the corporate history of IKA began in 1910, China had not yet become a People's Republic and the
                word "globalization" had not been invented yet. Today, the IKA group has over 900 employees at 16
                locations on four continents.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-600">Family-run, medium-sized company with short decision-making paths</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-600">Investment decisions made with a long-view mindset</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-600">Serving markets of high social relevance</p>
                </div>
              </div>

              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent">
                Learn More About IKA
              </Button>
            </div>

            <div className="relative">
              <img
                src="/ika_staufen_1280x1280.webp"
                alt="IKA Company Building"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Company History Section */}
      <section className="py-20 px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img src="/ika100years.png" alt="100 Years of IKA" className="w-full rounded-lg shadow-lg" />
            </div>

            <div>
              <h2 className="text-4xl font-light text-gray-800 mb-6">100 Years of IKA Works</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                IKA Works GmbH & Co. KG in Staufen can now look back on a century of company history.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Founded in 1910 as a supplier for pharmacies and hospitals, the company left bombed-out Cologne for
                Staufen in Breisgau in 1942. It quickly became the world's leading company for laboratory technology as
                well as dispersing, stirring and kneading machines.
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

              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent">
                Explore Our History
              </Button>

              <Button variant="outline" className="ml-2 border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent">
                Download Brochure
              </Button>   

            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-light text-gray-800 mb-6">Sustainability at IKA</h2>
              <p className="text-lg text-blue-600 mb-6 font-medium">Sustainable. Self-evident</p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                IKA is dedicated to sustainability, sharing its environmental information with Ecovadis and achieving
                recognition. The company's innovative solutions enable the combination of substances at all steps of
                material into innovative products, with a focus on increasing sustainability.
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

              <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent">
                View Our Portfolio
              </Button>
            </div>

            <div className="relative">
              <img
                src="/sus-1.webp"
                alt="Sustainability at IKA"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-20 px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img
                src="/2024_banner_IKA-awards-25_833x360px.webp"
                alt="IKA Awards and Recognition"
                className="w-full rounded-lg shadow-lg"
              />
            </div>

            <div>
              <h2 className="text-4xl font-light text-gray-800 mb-6">Award-winning time and again</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">Laboratory equipment from IKA</p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Innovative strength, design quality and a sense of responsibility - this triad regularly earns us awards
                and recognition. We take this as an incentive to continue innovating with entrepreneurial courage,
                dynamic processes and a strong commitment to learn and communicate.
              </p>

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

              <div className="bg-blue-50 p-6 rounded-lg mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">World market leader 2025</h3>
                <p className="text-gray-600 text-sm">
                  Recognized by WirtschaftsWoche magazine as world market leader for innovative laboratory equipment.
                </p>
              </div>

              <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-50 bg-transparent">
                View All Awards
              </Button>
            </div>
          </div>
        </div>
      </section>
       
      </div>

      <OverlappingSections/> 
     
    </>
  );
}