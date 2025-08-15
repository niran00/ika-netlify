"use client"
import Chat from './chatbot-components/Chat';
import React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Linkedin, Youtube, Instagram, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <Chat />
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-[#00599c] mb-4">IKA</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              For over 100 years, IKA has been a leading manufacturer of laboratory and process technology equipment,
              trusted by scientists and engineers worldwide.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800">
                <Youtube className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800">
                <Instagram className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Company Links - Visible on desktop, collapsible on mobile */}
          <div className="space-y-4">
            <h4 className="font-bold mb-2">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/company" className="text-gray-400 hover:text-white transition-colors">
                  About IKA
                </a>
              </li>
              <li>
                <a href="/company/100-years" className="text-gray-400 hover:text-white transition-colors">
                  100 Years of IKA
                </a>
              </li>
             
              <li>
                <a href="/company/awards" className="text-gray-400 hover:text-white transition-colors">
                  Awards
                </a>
              </li>
             
              <li>
                <a href="/company/news" className="text-gray-400 hover:text-white transition-colors">
                  News
                </a>
              </li>
              <li>
                <a href="/careers" className="text-gray-400 hover:text-white transition-colors">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Products & Services - Visible on desktop, collapsible on mobile */}
          <div className="space-y-4">
            <h4 className="font-bold mb-2">Products & Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/products" className="text-gray-400 hover:text-white transition-colors">
                  All Products
                </a>
              </li>
              <li>
                <a href="/laboratory-technology" className="text-gray-400 hover:text-white transition-colors">
                  Laboratory Technology
                </a>
              </li>
              <li>
                <a href="/process-technology" className="text-gray-400 hover:text-white transition-colors">
                  Process Technology
                </a>
              </li>
              <li>
                <a href="/bioprocessing" className="text-gray-400 hover:text-white transition-colors">
                  BioProcessing Solutions
                </a>
              </li>
              <li>
                <a href="/ev-battery" className="text-gray-400 hover:text-white transition-colors">
                  EV Battery Solutions
                </a>
              </li>
              <li>
                <a href="/services" className="text-gray-400 hover:text-white transition-colors">
                  Services
                </a>
              </li>
          
            </ul>
          </div>

          {/* Support & Contact - Visible on desktop, collapsible on mobile */}
          <div className="space-y-4">
            <h4 className="font-bold mb-2">Support & Contact</h4>
            <ul className="space-y-2 text-sm mb-6">
              <li>
                <a href="/knowledge" className="text-gray-400 hover:text-white transition-colors">
                  Knowledge Center
                </a>
              </li>
              <li>
                <a href="/knowledge/downloads" className="text-gray-400 hover:text-white transition-colors">
                  Downloads
                </a>
              </li>
              <li>
                <a href="/services/manuals" className="text-gray-400 hover:text-white transition-colors">
                  Manuals
                </a>
              </li>
             
             
              <li>
                <a href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Phone className="h-4 w-4" />
                <span>+66 2059 4693</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Mail className="h-4 w-4" />
                <span>sales-lab.thailand@ika.com</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-400">
                <MapPin className="h-4 w-5 mt-0.5" />
                <span>
                  O NES Tower, Unit 2005 2006,
                  <br />
                  Sukhumvit 6, Sukhumvit Road 10110 Bangkok Thailand
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="font-bold mb-2">Lab News from IKA: Stay up to date</h4>
              <p className="text-gray-400 text-sm">
                Subscribe to our newsletter for the latest laboratory news, product updates, and technical insights.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                placeholder="Enter your email address"
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
              <Button className="bg-[#00599c] hover:bg-[#004080] text-white px-6">Subscribe</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <div className="text-center md:text-left">
              <span>© 2025 IKA All rights reserved.</span>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6">
              
              <a href="/legal/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="/legal/terms" className="hover:text-white transition-colors">
                Terms of Use
              </a>
              <a href="/legal/cookies" className="hover:text-white transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
