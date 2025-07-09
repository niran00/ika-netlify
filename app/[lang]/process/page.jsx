"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Factory, Cog, Zap, Users } from "lucide-react"

export default function ProcessTechnologyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden bg-gradient-to-r from-slate-800 to-slate-700">
        <div className="absolute inset-0">
          <img
            src="/process-banner.webp"
            alt="Process Technology"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 to-transparent" />
        </div>

        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-4xl text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">Process Technology</h1>
              <h2 className="text-xl md:text-2xl mb-6 text-gray-200 font-normal">designed to work perfectly</h2>
              <p className="text-lg mb-8 text-gray-300 leading-relaxed max-w-3xl">
                Industrial-scale processing equipment and pilot plants for manufacturing excellence. From concept to
                production, we provide turnkey solutions for your most demanding applications.
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="bg-[#00599c] hover:bg-[#004080] text-white px-8 py-3 font-semibold">
                  View Products
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Technology Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Industrial Processing Excellence</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our Process Technology division offers comprehensive solutions for industrial-scale manufacturing, from
              pilot plants to full production systems.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <Factory className="h-12 w-12 text-[#00599c] mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Pilot Plants</h3>
              <p className="text-gray-600 text-sm">Scale-up solutions from lab to production</p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <Cog className="h-12 w-12 text-[#00599c] mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Process Equipment</h3>
              <p className="text-gray-600 text-sm">Industrial mixing and processing systems</p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <Zap className="h-12 w-12 text-[#00599c] mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Automation</h3>
              <p className="text-gray-600 text-sm">Advanced process control and monitoring</p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <Users className="h-12 w-12 text-[#00599c] mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Support</h3>
              <p className="text-gray-600 text-sm">Comprehensive engineering and service support</p>
            </Card>
          </div>
        </div>
      </section>

     
    </div>
  )
}
