"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { HeartIcon } from "./icons/heart-icon"
import { CloseIcon } from "./icons/close-icon"
import { MenuIcon } from "./icons/menu-icon"

const mainMenuItems = [
  { href: "/", label: "Home" },
  { href: "/timeline", label: "Timeline" },
  { href: "/story", label: "Story" },
  { href: "/gallery", label: "Gallery" },
  { href: "/secret-box", label: "Secret Box" },
]

const moreMenuItems = [
  { href: "/playlist", label: "Our Playlist" },
  { href: "/love-facts", label: "Love Facts" },
  { href: "/your-words", label: "Your Words" },
  { href: "/note", label: "Note" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMoreOpen, setIsMoreOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const closeMenu = () => {
    setIsOpen(false)
    setIsMoreOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-pink-100" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="font-playfair text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              The Story of Us
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {mainMenuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 hover:text-pink-500 hover:scale-105 ${
                  pathname === item.href ? "text-pink-500" : "text-gray-700 hover:text-pink-500"
                }`}
              >
                {item.label}
                {pathname === item.href && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full animate-shimmer" />
                )}
              </Link>
            ))}

            {/* More Dropdown */}
            <div className="relative">
              <Button
                variant="ghost"
                onClick={() => setIsMoreOpen(!isMoreOpen)}
                className="text-gray-700 hover:text-pink-500 transition-all duration-300 hover:scale-105"
              >
                More
                <svg
                  className={`ml-1 w-4 h-4 transition-transform duration-300 ${isMoreOpen ? "rotate-180" : ""}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>

              {isMoreOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-fade-in-up glass-pink">
                  {moreMenuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMenu}
                      className={`block px-4 py-3 text-sm transition-all duration-200 hover:bg-pink-50 hover:text-pink-500 hover:translate-x-1 ${
                        pathname === item.href ? "text-pink-500 bg-pink-50" : "text-gray-700"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 hover:text-pink-500 transition-all duration-300 hover:scale-110"
          >
            {isOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-pink-100 animate-fade-in-down">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {mainMenuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className={`block px-3 py-3 text-base font-medium rounded-xl transition-all duration-300 hover:scale-105 ${
                    pathname === item.href
                      ? "text-pink-500 bg-pink-50"
                      : "text-gray-700 hover:text-pink-500 hover:bg-pink-50"
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              {/* More submenu in mobile */}
              <div className="border-t border-pink-100 pt-2 mt-2">
                <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">More</div>
                {moreMenuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className={`block px-3 py-3 text-base font-medium rounded-xl transition-all duration-300 hover:scale-105 ${
                      pathname === item.href
                        ? "text-pink-500 bg-pink-50"
                        : "text-gray-700 hover:text-pink-500 hover:bg-pink-50"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
