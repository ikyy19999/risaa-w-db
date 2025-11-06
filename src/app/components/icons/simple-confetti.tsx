// components/simple-confetti.tsx
"use client"

import { useEffect, useState } from "react"

interface ConfettiPiece {
  id: number
  x: number
  y: number
  color: string
  size: number
  duration: number
}

export function SimpleConfetti() {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([])

  useEffect(() => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA5A5', '#FFE66D', '#FF9FF3']
    
    const pieces: ConfettiPiece[] = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 6 + Math.random() * 8,
      duration: 1 + Math.random() * 2
    }))

    setConfetti(pieces)

    const timer = setTimeout(() => {
      setConfetti([])
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute rounded-sm"
          style={{
            left: `${piece.x}vw`,
            top: `${piece.y}vh`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            animation: `confetti-fall ${piece.duration}s ease-in forwards`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      ))}
      
      <style jsx>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}