"use client"

import Link from "next/link"
import { HeartIcon } from "./icons/heart-icon"


export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-rose-50 to-pink-50 border-t border-rose-100 py-16">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center space-y-6">
      
      {/* Header section */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-3">
          <div className="w-8 h-px bg-gradient-to-r from-transparent via-rose-400 to-transparent"></div>
          <h3 className="text-2xl font-medium text-gray-800 tracking-wide">
            Our Journey
          </h3>
          <div className="w-8 h-px bg-gradient-to-r from-transparent via-rose-400 to-transparent"></div>
        </div>
      </div>

      {/* Main content */}
      {/* <div className="max-w-2xl mx-auto space-y-8">
        <p className="text-gray-600 text-lg leading-relaxed">
          Setiap hari bersama adalah halaman baru dalam cerita kita. 
          Terima kasih telah menjadi bagian dari perjalanan indah ini.
        </p> */}

        {/* Decorative section */}
        {/* <div className="flex items-center justify-center space-x-6 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>Crafted with</span>
            <div className="w-4 h-4 bg-gradient-to-r from-red-400 to-pink-400 rounded-full"></div>
            <span>for our story</span>
          </div>
        </div>
      </div> */}

      {/* Navigation Links */}
      <div className="flex flex-wrap justify-center items-center gap-6 text-sm">
        <Link href="/" className="text-gray-500 hover:text-rose-500 transition-colors duration-200 hover:underline">
          Home
        </Link>
        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
        <Link href="/timeline" className="text-gray-500 hover:text-rose-500 transition-colors duration-200 hover:underline">
          Timeline
        </Link>
        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
        <Link href="/story" className="text-gray-500 hover:text-rose-500 transition-colors duration-200 hover:underline">
          Story
        </Link>
        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
        <Link href="/gallery" className="text-gray-500 hover:text-rose-500 transition-colors duration-200 hover:underline">
          Gallery
        </Link>
        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
        <Link href="/secret-box" className="text-gray-500 hover:text-rose-500 transition-colors duration-200 hover:underline">
          Secret Box
        </Link>
        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
        <Link href="mailto:support@rizkymaulana.web.id" className="text-gray-500 hover:text-rose-500 transition-colors duration-200 hover:underline">
          Contact us
        </Link>
        <Link href="https://charity.rizkymaulana.web.id" className="text-gray-500 hover:text-rose-500 transition-colors duration-200 hover:underline">
          Our pastry shop website
        </Link>
      </div>

      {/* Footer */}
      <div className="border-t border-rose-200/60 pt-6 space-y-2">
        <div className="text-xs text-gray-400 tracking-wide">
          © 2025 Our Love Journey. Every moment, every memory, forever cherished.
        </div>
      </div>
      
    </div>
  </div>
</footer>
  )
}
