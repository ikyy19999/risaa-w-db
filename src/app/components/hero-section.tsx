"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState, useEffect } from "react"
import { ScrollReveal } from "./scroll-reveal"
import { HeartIcon } from "./icons/heart-icon"

const couplePhotos = [
  "/assets/PICTNIQ 18.avif",
  "/assets/PICTNIQ 19.avif",
]

export function HeroSection() {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhotoIndex((prev) => (prev + 1) % couplePhotos.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {couplePhotos.map((photo, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentPhotoIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={photo || "/placeholder.svg"}
              alt={`Couple photo ${index + 1}`}
              className="w-full h-full object-cover"
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        ))}
      </div>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-40 left-1/2 w-80 h-80 bg-indigo-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Main heading */}
        <ScrollReveal direction="fade" delay={200}>
          {/* <HeartIcon className="w-16 h-16 text-pink-300 mx-auto mb-6 animate-heartbeat drop-shadow-lg" /> */}
          <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 text-balance drop-shadow-lg">
            The Journey of {" "}
            <span className="bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
              Rizky & Salma
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto text-pretty leading-relaxed drop-shadow-md">
          A tale of two souls brought together to grow, love, 
          and create a future side by side. Explore the memories that tell our journey.
          </p>
        </ScrollReveal>

        {/* CTA Buttons */}
        <ScrollReveal direction="up" delay={400}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover-lift"
            >
              <Link href="/timeline">Start Journey</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-3 rounded-full transition-all duration-300 hover-lift bg-white/5 backdrop-blur-sm"
            >
              <Link href="/story">Read Our Story</Link>
            </Button>
          </div>
        </ScrollReveal>

        {/* Stats */}
        <ScrollReveal direction="up" delay={600}>
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="text-center hover-lift">
              <div className="text-3xl font-bold text-pink-300 font-playfair animate-pulse-soft drop-shadow-lg">1+</div>
              <div className="text-white/80 text-sm uppercase tracking-wider">Years Together</div>
            </div>
            <div className="text-center hover-lift">
              <div
                className="text-3xl font-bold text-purple-300 font-playfair animate-pulse-soft drop-shadow-lg"
                style={{ animationDelay: "0.5s" }}
              >
                ∞
              </div>
              <div className="text-white/80 text-sm uppercase tracking-wider">Memories</div>
            </div>
            {/* <div className="text-center hover-lift">
              <div
                className="text-3xl font-bold text-indigo-300 font-playfair animate-pulse-soft drop-shadow-lg"
                style={{ animationDelay: "1s" }}
              >
                1
              </div>
              <div className="text-white/80 text-sm uppercase tracking-wider">Cinta Sejati</div>
            </div> */}
          </div>
        </ScrollReveal>

        <ScrollReveal direction="fade" delay={700}>
          <div className="flex justify-center space-x-2 mt-8">
            {couplePhotos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPhotoIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentPhotoIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
                }`}
              />
            ))}
          </div>
        </ScrollReveal>
      </div>

      {/* Scroll indicator */}
      <ScrollReveal direction="fade" delay={800}>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-gentle-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
