"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { Input } from "./ui/input"
import Link from "next/link"
import ChatLauncher from "./ChatLauncher"
import "flag-icons/css/flag-icons.min.css";
import Preloader from "./preloader"
import { useDictionary } from '@/app/context/dictionary-context';

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






interface data{
  data : any;
}

export default function Homepage2Client(data : any){
  const { lang, dict } = useDictionary();
 
    return (
        <>

            <section className="relative w-full h-[75vh]flex items-center">
              {/* Overlayed Video Background */}
              <div className="absolute inset-0">
                {/* Responsive Video Sources */}
                {/* <Image
                  src="/abstract-waves.jpg"
                  alt="Banner Background"
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  fill
                /> */}

                    <div
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
                      style={{
                        backgroundImage: `url('/20250811_IKA_Process Banner A.png')`,
                      }}
                    />

                {/* Dark overlay */}
                <div className="absolute inset-0 " />
              </div>

              {/* Foreground Content */}
              <div className="container relative z-5 h-[75vh]  mx-auto px-4 flex flex-col lg:justify-between justify-center py-10">
                {/* Centered Heading */}
                <div className="md:flex-grow flex-col flex items-center md:justify-center">
                  <Image
                    src="/logo.webp"
                    alt="IKA Logo"
                    className="w-32 h-auto mb-4 md:mb-0"
                    width={128}
                    height={128}
                  />

                    {/* <div className="mt-6 flex items-center justify-center gap-4">
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
                    </div> */}


                  <div className="text-center mt-3 text-white text-sm  rounded-md p-1 bg-white opacity-90 font-bold mb-4">
                     <p className="text-zinc-400">{dict.searchTxt}</p>
                  </div>
                  <div className="w-full text-center">
                    <ChatLauncher></ChatLauncher>
                  </div>

                </div>

              </div>


            </section>



        </>
    )

}