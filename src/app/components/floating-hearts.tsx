"use client"

import { useEffect, useState } from "react"
import { HeartIcon } from "./icons/heart-icon"

interface Heart {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  duration: number
  color: string
}

export function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([])

  useEffect(() => {
    const colors = ["text-pink-300", "text-rose-300", "text-purple-300", "text-red-300"]

    const createHeart = () => {
      const heart: Heart = {
        id: Math.random(),
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + 50,
        size: Math.random() * 25 + 15,
        opacity: Math.random() * 0.4 + 0.2,
        duration: Math.random() * 4000 + 3000,
        color: colors[Math.floor(Math.random() * colors.length)],
      }

      setHearts((prev) => [...prev, heart])

      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== heart.id))
      }, heart.duration)
    }

    const interval = setInterval(createHeart, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute"
          style={{
            left: heart.x,
            bottom: 0,
            opacity: heart.opacity,
            animation: `floatUp ${heart.duration}ms ease-out forwards`,
          }}
        >
          <HeartIcon
  className={heart.color}
  {...({ style: {
    width: heart.size,
    height: heart.size,
    filter: "blur(0.3px) drop-shadow(0 0 8px rgba(255, 182, 193, 0.3))",
  }} as any)}
/>

        </div>
      ))}

      <style jsx>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) rotate(0deg) scale(0.8);
            opacity: ${hearts[0]?.opacity || 0.3};
          }
          25% {
            transform: translateY(-25vh) rotate(90deg) scale(1);
            opacity: ${hearts[0]?.opacity || 0.3};
          }
          75% {
            transform: translateY(-75vh) rotate(270deg) scale(1.1);
            opacity: ${(hearts[0]?.opacity || 0.3) * 0.7};
          }
          100% {
            transform: translateY(-100vh) rotate(360deg) scale(0.6);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
