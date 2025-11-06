"use client"

import { HeartIcon } from "./icons/heart-icon"


interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  text?: string
}

export function LoadingSpinner({ size = "md", text }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        <div className={`${sizeClasses[size]} animate-spin`}>
          <div className="absolute inset-0 border-4 border-pink-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-pink-500 rounded-full animate-spin"></div>
        </div>
        {/* <HeartIcon className={`${sizeClasses[size]} absolute inset-0 text-pink-500 animate-heartbeat`} /> */}
      </div>
      {text && <p className="text-gray-600 text-sm animate-pulse">{text}</p>}
    </div>
  )
}
