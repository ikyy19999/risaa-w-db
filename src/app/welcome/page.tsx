"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X, Heart, Gift } from "lucide-react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

export default function WelcomePopup() {
  const router = useRouter()
  const [showMessage, setShowMessage] = useState(false)
  const [messageText, setMessageText] = useState("")
  const [showPopup, setShowPopup] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [isTimeUp, setIsTimeUp] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detect device type
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkDevice()
    window.addEventListener('resize', checkDevice)
    
    return () => window.removeEventListener('resize', checkDevice)
  }, [])

  useEffect(() => {
    // Show popup after a short delay
    const timer = setTimeout(() => {
      setShowPopup(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Birthday date: October 27, 2025 at 00:00 WIB
    const birthdayDate = new Date('2025-10-27T00:00:00+07:00')
    
    const updateCountdown = () => {
      const now = new Date()
      const timeDiff = birthdayDate.getTime() - now.getTime()
      
      if (timeDiff <= 0) {
        setIsTimeUp(true)
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }
      
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000)
      
      setTimeRemaining({ days, hours, minutes, seconds })
    }
    
    // Update countdown immediately and then every second
    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    
    return () => clearInterval(interval)
  }, [])

  const closePopup = () => {
    setShowPopup(false)
  }

  const handleBirthdayMessage = () => {
    if (!isTimeUp) {
      setMessageText("Be patient, wait until October 27 2025 at 00:00 WIB to send your wishes!")
      setShowMessage(true)
      return
    }

    setShowPopup(false)
    router.push('/note')
  }

  const renderAnimatedNumber = (num: number, color: string) => (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={num}
        initial={{ rotateX: -90, opacity: 0 }}
        animate={{ rotateX: 0, opacity: 1, scale: [1, 1.2, 1] }}
        exit={{ rotateX: 90, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className={`${isMobile ? 'text-base' : 'text-lg'} font-bold ${color}`}
      >
        {num}
      </motion.div>
    </AnimatePresence>
  )

  return (
    <>
      {/* Welcome Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 safe-area-inset">
          <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full mx-auto overflow-hidden transform animate-in fade-in zoom-in duration-300 max-h-[95vh] overflow-y-auto">
            {/* Popup Header */}
            <div className="relative bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 p-4 md:p-6 text-center">
              <button
                onClick={closePopup}
                className="absolute top-3 right-3 md:top-4 md:right-4 text-white/80 hover:text-white transition-colors"
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>
               
              <div className="mb-2 md:mb-3">
                <h2 className="text-lg md:text-xl font-serif text-white font-bold">Hello Everyone, welcome</h2>
              </div>
            </div>
             
            {/* Popup Content */}
            <div className="p-4 md:p-6">
              {/* Countdown Timer */}
              {/* <div className="mb-4 p-3 bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl border border-rose-100">
                <div className="text-center mb-2">
                  <Gift className="w-5 h-5 md:w-6 md:h-6 text-rose-500 mx-auto mb-1" />
                  <h4 className="text-sm md:text-base font-semibold text-slate-800">
                    {isTimeUp ? "Its Time to Celebrate Salmas birtday!" : "Getting Close to Salma's Birthday"}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">27 October</p>
                </div>
                
                {!isTimeUp && (
                  <div className="grid grid-cols-4 gap-1 md:gap-2 text-center">
                    <div className="bg-white rounded-lg p-1.5 md:p-2 shadow-sm">
                      {renderAnimatedNumber(timeRemaining.days, "text-rose-600")}
                      <div className="text-xs text-slate-500">Day</div>
                    </div>
                    <div className="bg-white rounded-lg p-1.5 md:p-2 shadow-sm">
                      {renderAnimatedNumber(timeRemaining.hours, "text-pink-600")}
                      <div className="text-xs text-slate-500">Hour</div>
                    </div>
                    <div className="bg-white rounded-lg p-1.5 md:p-2 shadow-sm">
                      {renderAnimatedNumber(timeRemaining.minutes, "text-purple-600")}
                      <div className="text-xs text-slate-500">Minute</div>
                    </div>
                    <div className="bg-white rounded-lg p-1.5 md:p-2 shadow-sm">
                      {renderAnimatedNumber(timeRemaining.seconds, "text-rose-600")}
                      <div className="text-xs text-slate-500">Second</div>
                    </div>
                  </div>
                )}
                
                {isTimeUp && (
                  <div className="text-center py-3 md:py-4">
                    <p className="text-2xl">🎂🎉✨</p>
                    <p className="text-sm text-slate-600 mt-2">Lets Drop Some Birthday Wishes</p>
                  </div>
                )}
              </div> */}

              <div className="text-center mb-4 md:mb-6">
                <h3 className="text-lg md:text-xl font-semibold text-slate-800 mb-2 md:mb-3">Hey there! Welcome!</h3>
                <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                  Thank you for visiting our special website. Here, you will find beautiful love stories,
                  sweet memories, and precious moments that we have shared together.
                </p>
              </div>
               
              <div className="flex flex-col sm:flex-row gap-2 md:gap-3 mb-4">
                <Button
                  onClick={closePopup}
                  className="flex-1 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 text-sm md:text-base py-2.5 md:py-3"
                >
                  Start
                </Button>
                <Button
                  variant="outline"
                  onClick={closePopup}
                  className="px-4 md:px-6 border-rose-300 text-rose-600 hover:bg-rose-50 rounded-full bg-transparent text-sm md:text-base py-2.5 md:py-3"
                >
                  Close
                </Button>
              </div>
              
              {/* Birthday Message Button */}
              {/* <Button
                onClick={handleBirthdayMessage}
                className={`w-full rounded-full font-medium shadow-lg transition-all duration-300 text-sm md:text-base py-2.5 md:py-3 ${
                  isTimeUp 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white hover:shadow-xl animate-pulse'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Gift className="w-4 h-4 mr-2" />
                {isTimeUp ? "Send Birthday Wishes to Salma, guys" : "Send Birthday Wishes to Salma(soon)"}
              </Button> */}
            </div>
          </div>
        </div>
      )}

      {/* Custom Alert Modal */}
      {showMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 safe-area-inset">
          <div className="bg-white rounded-2xl p-4 md:p-6 max-w-xs md:max-w-sm w-full mx-4 text-center shadow-lg">
            <p className="text-sm md:text-base text-slate-800 mb-3 md:mb-4">{messageText}</p>
            <Button
              onClick={() => setShowMessage(false)}
              className="bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full px-6 py-2 text-sm md:text-base"
            >
              Oke
            </Button>
          </div>
        </div>
      )}
    </>
  )
}