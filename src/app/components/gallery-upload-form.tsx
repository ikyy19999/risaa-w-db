// components/gallery-upload-form.tsx
"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Swal from 'sweetalert2'

interface UploadFormProps {
  onSuccess?: () => void
}

const CATEGORIES = {
  jakarta: "Jakarta",
  yogyakarta: "Yogyakarta", 
  bogor: "Bogor",
  // bandung: "Bandung",
}

const SUB_CATEGORIES: Record<string, Record<string, string>> = {
  jakarta: {
    "jakarta-pusat": "Jakarta Pusat",
    "jakarta-selatan": "Jakarta Selatan", 
    "jakarta-utara": "Jakarta Utara",
    "jakarta-timur": "Jakarta Timur",
    "jakarta-barat": "Jakarta Barat",
  },
  yogyakarta: {
    "yogya-kota": "Kota Yogyakarta",
    sleman: "Sleman",
    bantul: "Bantul", 
    kidul: "Gunung Kidul",
  },
  bogor: {
    "bogor-tengah": "Bogor Tengah",
    "bogor-barat": "Bogor Barat",
    "bogor-timur": "Bogor Timur",
    puncak: "Puncak",
    cianjur: "Cianjur",
  },
  // bandung: {
  //   "bandung-wetan": "Bandung Wetan",
  //   "bandung-barat": "Bandung Barat", 
  //   "bandung-selatan": "Bandung Selatan",
  //   "bandung-utara": "Bandung Utara",
  // },
}

export function GalleryUploadForm({ onSuccess }: UploadFormProps) {
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("jakarta")
  const [subCategory, setSubCategory] = useState("jakarta-pusat")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      
      // File type validation
      const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
      const allowedVideoTypes = ['video/mp4', 'video/mpeg', 'video/quicktime', 'video/x-msvideo']
      
      if (![...allowedImageTypes, ...allowedVideoTypes].includes(selectedFile.type)) {
        setError("File type not supported. Please upload image or video files only.")
        setFile(null)
        return
      }

      // File size validation (50MB max)
      if (selectedFile.size > 50 * 1024 * 1024) {
        setError("File size too large. Maximum 50MB allowed.")
        setFile(null)
        return
      }

      setFile(selectedFile)
      setError(null)
    }
  }

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value
    setCategory(newCategory)
    const firstSubCategory = Object.keys(SUB_CATEGORIES[newCategory] || {})[0]
    setSubCategory(firstSubCategory || "")
  }

  const showSuccessAlert = (mediaType: string) => {
    Swal.fire({
      title: 'Success!',
      text: `${mediaType} uploaded successfully!`,
      icon: 'success',
      confirmButtonText: 'OK',
      confirmButtonColor: '#ec4899',
      background: '#fff',
      iconColor: '#10b981',
      timer: 5000,
      timerProgressBar: true,
    })
  }

  const showErrorAlert = (errorMessage: string) => {
    Swal.fire({
      title: 'Upload Failed',
      text: errorMessage,
      icon: 'error',
      confirmButtonText: 'Try Again',
      confirmButtonColor: '#ec4899',
      background: '#fff',
      iconColor: '#ef4444',
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!file || !title || !category || !subCategory) {
      setError("Please fill in all required fields")
      return
    }

    setLoading(true)

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("title", title)
      formData.append("description", description)
      formData.append("category", category)
      formData.append("sub_category", subCategory)

      console.log("Submitting form data...")

      const response = await fetch("/api/gallery/upload", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || `Upload failed with status ${response.status}`)
      }

      // Show success alert
      const mediaType = file.type.startsWith('video') ? 'Video' : 'Photo'
      showSuccessAlert(mediaType)

      // Reset form
      setFile(null)
      setTitle("")
      setDescription("")
      setCategory("jakarta")
      setSubCategory("jakarta-pusat")
      
      // Reset file input
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
      if (fileInput) fileInput.value = ""

      if (onSuccess) {
        onSuccess()
      }
    } catch (err) {
      console.error("Upload error:", err)
      const errorMessage = err instanceof Error ? err.message : "Upload failed"
      setError(errorMessage)
      showErrorAlert(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-4 sm:p-6 rounded-lg shadow-md">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Photo or Video <span className="text-red-500">*</span>
        </label>
        <input
          type="file"
          accept="image/*,video/*"
          onChange={handleFileChange}
          required
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
        />
        {file && (
          <p className="mt-2 text-sm text-gray-600">
            Selected: {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
          </p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          Supported formats: JPEG, PNG, GIF, WebP, MP4, AVI, MOV. Max size: 50MB
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Title <span className="text-red-500">*</span>
        </label>
        <Input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Photo/video title" 
          required 
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Photo/video description (optional)"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            value={category}
            onChange={handleCategoryChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            required
          >
            {Object.entries(CATEGORIES).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sub-Category <span className="text-red-500">*</span>
          </label>
          <select
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            required
          >
            {Object.entries(SUB_CATEGORIES[category] || {}).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
          {error}
        </div>
      )}

      <Button 
        type="submit" 
        disabled={loading} 
        className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 disabled:opacity-50 transition-all duration-200"
      >
        {loading ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Uploading...</span>
          </div>
        ) : (
          `Upload ${file?.type.startsWith('video') ? 'Video' : 'Photo'}`
        )}
      </Button>
    </form>
  )
}