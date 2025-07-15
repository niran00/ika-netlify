"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"


export default function Homepage3Client() {
  const { scrollY } = useScroll()
  const [mounted, setMounted] = useState(false)

  // Transform values for parallax effect
  const heroY = useTransform(scrollY, [0, 800], [0, -200])
  const contentY = useTransform(scrollY, [0, 800], [0, -800])
  const overlayOpacity = useTransform(scrollY, [0, 400], [0, 0.3])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section className="relative">
      {/* Hero Section */}
      <motion.section
        style={{ y: heroY }}
        className="relative h-[75vh] bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-hidden"
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{
            backgroundImage: `url('/abstract-waves.jpg')`,
          }}
        />

        {/* Overlay */}
        <motion.div style={{ opacity: overlayOpacity }} className="absolute h-[75vh] inset-0 bg-black" />

        {/* Hero Content */}
        <div className="relative z-10  h-[75vh] flex items-center justify-center h-full text-center text-white px-6">
          <div className="max-w-4xl">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-6xl md:text-8xl font-light mb-6"
            >
              Material Kit React.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-xl md:text-2xl font-light opacity-90"
            >
              A Badass Material UI Kit based on Material Design.
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Components Section - This will slide up over the hero */}
      <motion.section
        style={{ y: contentY, marginTop: "-30px" }}
        className="relative z-20 mx-4 bg-white h-[100vh] p-8 md:p-16 rounded-3xl shadow-2xl"
      >
        <div className="max-w-6xl mx-auto">
          
        </div>

       
      </motion.section>
    </section>
  )
}
