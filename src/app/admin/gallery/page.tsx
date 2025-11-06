// app/admin/gallery/page.tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Footer } from "@/app/components/footer"
import { GalleryUploadForm } from "@/app/components/gallery-upload-form"
import { GalleryAdminPanel } from "@/app/components/gallery-admin-panel"
import { Navbar } from "@/app/components/navbar"

export default function AdminGalleryPage() {
  const [refreshKey, setRefreshKey] = useState(0)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const router = useRouter()

  const handleUploadSuccess = () => {
    setRefreshKey((prev) => prev + 1)
  }

  const handleLogout = async () => {
    setIsLoggingOut(true)
    
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      })

      if (response.ok) {
        router.push("/")
        router.refresh()
      } else {
        alert("Logout failed, please try again")
      }
    } catch (error) {
      console.error("Logout error:", error)
      alert("An error occurred during logout")
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <Navbar />

      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto py-8">
          {/* Header with Logout Button */}
          <div className="text-center mb-8 sm:mb-12 relative">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex-1">
                <h1 className="font-playfair text-3xl sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
                  Admin{" "}
                  <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                    Gallery
                  </span>
                </h1>
                <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                  Manage photos and videos in our memory gallery
                </p>
              </div>
              
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="w-full sm:w-auto bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 sm:py-3 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm sm:text-base"
              >
                {isLoggingOut ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Logging out...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Logout</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Upload Form Section */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:sticky lg:top-8">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
                  Upload New Media
                </h2>
                <GalleryUploadForm key={refreshKey} onSuccess={handleUploadSuccess} />
              </div>
            </div>

            {/* Admin Panel Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                    Manage Media
                  </h2>
                  <div className="text-sm text-gray-500">
                    Total: <span className="font-semibold text-pink-600">{refreshKey + 1}</span> uploads
                  </div>
                </div>
                <GalleryAdminPanel key={refreshKey} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}