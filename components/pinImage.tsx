"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";

export default function PinImage() {
  // define pins here
  const pins = [
    { x: "14%", y: "35%", href: "/recycle", label: "Recycle" , icon: "/Icons/1_B.png" , hoverIcon: "/Icons/1_L.png"},
    { x: "70%", y: "65%", href: "/greenhouse", label: "Green house" , icon: "/Icons/9_B.png", hoverIcon: "/Icons/9_L.png"},
    { x: "52%", y: "20%", href: "/power-plant", label: "Power Plant", icon: "/Icons/13_B.png", hoverIcon: "/Icons/13_L.png"},
    { x: "11%", y: "18%", href: "/drainage", label: "Drainage", icon: "/Icons/2_B.png", hoverIcon: "/Icons/2_L.png"},
    { x: "31%", y: "22%", href: "/manufacturing", label: "Manufacturing", icon: "/Icons/3_B.png", hoverIcon: "/Icons/3_L.png"},
    { x: "20%", y: "33%", href: "/cosmetics", label: "Cosmetics", icon: "/Icons/6_B.png" , hoverIcon: "/Icons/6_L.png"},

    { x: "18%", y: "55%", href: "/design", label: "Design", icon: "/Icons/7_B.png", hoverIcon: "/Icons/7_L.png"},
    { x: "31%", y: "74%", href: "/labratory", label: "Labratory", icon: "/Icons/10_B.png", hoverIcon: "/Icons/10_L.png"},
    { x: "50%", y: "73%", href: "/cantine", label: "Cantine", icon: "/Icons/5_B.png",   hoverIcon: "/Icons/5_L.png"},

    { x: "37%", y: "51%", href: "/academy", label: "Academy", icon: "/Icons/11_B.png", hoverIcon: "/Icons/11_L.png"},
    { x: "56%", y: "41%", href: "/medcine", label: "Medcine", icon: "/Icons/14_B.png", hoverIcon: "/Icons/14_L.png"},
    { x: "50%", y: "60%", href: "/bio-lab", label: "Bio Lab", icon: "/Icons/15_B.png", hoverIcon: "/Icons/15_L.png"},
    { x: "60%", y: "52%", href: "/botany", label: "Botany Research", icon: "/Icons/8_B.png", hoverIcon: "/Icons/8_L.png"},

    { x: "68%", y: "39%", href: "/logistics", label: "Logistics", icon: "/Icons/12_B.png", hoverIcon: "/Icons/12_L.png"},
    { x: "79%", y: "46%", href: "/warehouse", label: "Warehouse", icon: "/Icons/4_B.png", hoverIcon: "/Icons/4_L.png"},
    { x: "85%", y: "24%", href: "/chemistry-plant", label: "Chemistry plant", icon: "/Icons/16_B.png", hoverIcon: "/Icons/16_L.png"},
    
  ];

  return (
    <div className="relative w-full aspect-[16/9]">
      {/* Background image */}
      <Image
        src="/City-map-overview.png"
        alt="Interactive background"
        fill
        className="object-cover rounded-2xl"
        priority
      />

      {/* Pins */}
      {pins.map((pin, i) => (
        <Link
          key={i}
          href={pin.href}
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{ top: pin.y, left: pin.x }}
        >
          <div className="group relative flex items-center justify-center">
            

            {/* Default icon */}
            <Image
              src={pin.icon}
              alt={pin.label || "Pin"}
              width={40}
              height={40}
              className="w-10 h-10 object-contain group-hover:hidden"
            />
            {/* Hover icon */}
            <Image
              src={pin.hoverIcon}
              alt={pin.label || "Pin Hover"}
              width={40}
              height={40}
              className="w-10 h-10 object-contain hidden group-hover:block"
            />

            {pin.label && (
              <span className="absolute top-[-40px] left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-black text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                {pin.label}
              </span>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
