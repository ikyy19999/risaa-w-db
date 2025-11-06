// components/birthday-surprise.tsx
"use client"

import { useState, useEffect } from "react"
import { CakeIcon, GiftIcon } from "lucide-react"
import { SimpleConfetti } from "./icons/simple-confetti"

export function BirthdaySurprise() {
  const [isOpen, setIsOpen] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    // Cek apakah hari ini ulang tahun pacar
    const today = new Date()
    const birthday = new Date("2024-12-25") // Ganti dengan tanggal ulang tahun pacar
    
    if (today.getMonth() === birthday.getMonth() && today.getDate() === birthday.getDate()) {
      setIsOpen(true)
      setShowConfetti(true)
      
      // Auto close setelah 10 detik
      setTimeout(() => {
        setIsOpen(false)
      }, 10000)
    }
  }, [])

  if (!isOpen) return null

  return (
    <>
      {showConfetti && <SimpleConfetti />}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <div className="relative bg-gradient-to-br from-pink-500 via-red-400 to-purple-600 rounded-3xl p-8 max-w-md w-full text-white text-center shadow-2xl animate-scale-in">
          {/* Decorative elements */}
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-300 rounded-full animate-bounce"></div>
          <div className="absolute -bottom-2 -left-4 w-6 h-6 bg-pink-300 rounded-full animate-pulse"></div>
          
          <CakeIcon className="w-16 h-16 mx-auto mb-4 animate-bounce" />
          <h2 className="text-3xl font-bold mb-2 font-playfair">Happy Birthday!</h2>
          <p className="text-lg mb-4 opacity-90">
            Selamat ulang tahun sayangku! 🎂
          </p>
          <p className="text-sm mb-6 opacity-80">
            Semoga hari ini penuh dengan kebahagiaan dan cinta. 
            Terima kasih sudah menjadi bagian terindah dalam hidupku. 💝
          </p>
          
          <div className="flex gap-3 justify-center">
            <button 
              onClick={() => setIsOpen(false)}
              className="bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full hover:bg-white/30 transition-all"
            >
              Tutup
            </button>
            <button 
              onClick={() => window.location.href = '/birthday-surprise'}
              className="bg-white text-pink-600 px-6 py-2 rounded-full font-semibold hover:scale-105 transition-all flex items-center gap-2"
            >
              <GiftIcon className="w-4 h-4" />
              Buka Hadiah
            </button>
          </div>
        </div>
      </div>
    </>
  )
}