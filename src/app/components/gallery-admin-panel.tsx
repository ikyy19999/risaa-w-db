// app/components/gallery-admin-panel.tsx
"use client"

import { useState, useEffect, SetStateAction } from "react"
import { GalleryIcon } from "./icons/gallery-icon"
import { VideoIcon } from "./icons/video-icon"
import { DeleteIcon, EditIcon } from "./icons/edit-icon"
import { CloseIcon } from "./icons/close-icon"
import Swal from 'sweetalert2'

interface GalleryItem {
  id: string
  title: string
  description: string
  category: string
  sub_category: string
  image_url: string
  media_type: string
  created_at: string
}

const CATEGORY_LABELS: Record<string, string> = {
  jakarta: "Jakarta",
  yogyakarta: "Yogyakarta",
  bogor: "Bogor",
  // bandung: "Bandung",
  "jakarta-pusat": "Jakarta Pusat",
  "jakarta-selatan": "Jakarta Selatan",
  "jakarta-utara": "Jakarta Utara",
  "jakarta-timur": "Jakarta Timur",
  "jakarta-barat": "Jakarta Barat",
  "yogya-kota": "Kota Yogyakarta",
  sleman: "Sleman",
  bantul: "Bantul",
  kidul: "Gunung Kidul",
  "bogor-tengah": "Bogor Tengah",
  "bogor-barat": "Bogor Barat",
  "bogor-timur": "Bogor Timur",
  puncak: "Puncak",
  cianjur: "Cianjur",
  "bandung-wetan": "Bandung Wetan",
  "bandung-barat": "Bandung Barat",
  "bandung-selatan": "Bandung Selatan",
  "bandung-utara": "Bandung Utara",
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
  //   puncak: "Puncak",
  // },
}

// Simple Button component
type ButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'outline' | 'destructive'
  disabled?: boolean
  [key: string]: any
}

const Button = ({ 
  children, 
  onClick, 
  className = "", 
  size = "md",
  variant = "default",
  disabled = false,
  ...props 
}: ButtonProps) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed"
  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  }
  const variantStyles = {
    default: "bg-pink-500 text-white hover:bg-pink-600",
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
    destructive: "bg-red-500 text-white hover:bg-red-600"
  }

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

// Simple Input component
const Input = ({ className = "", ...props }: any) => {
  return (
    <input
      className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent ${className}`}
      {...props}
    />
  )
}

export function GalleryAdminPanel() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [filterCategory, setFilterCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [error, setError] = useState<string | null>(null)

  // Form state for edit
  const [editTitle, setEditTitle] = useState("")
  const [editDescription, setEditDescription] = useState("")
  const [editCategory, setEditCategory] = useState("")
  const [editSubCategory, setEditSubCategory] = useState("")
  const [updating, setUpdating] = useState(false)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    fetchItems()
  }, [])

  const showSuccessAlert = (title: string, text: string) => {
    Swal.fire({
      title,
      text,
      icon: 'success',
      confirmButtonText: 'OK',
      confirmButtonColor: '#ec4899',
      background: '#fff',
      iconColor: '#10b981',
    })
  }

  const showErrorAlert = (title: string, text: string) => {
    Swal.fire({
      title,
      text,
      icon: 'error',
      confirmButtonText: 'OK',
      confirmButtonColor: '#ec4899',
      background: '#fff',
      iconColor: '#ef4444',
    })
  }

  const showDeleteConfirmation = (itemTitle: string): Promise<boolean> => {
    return Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete "${itemTitle}"? This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      background: '#fff',
      iconColor: '#eab308',
    }).then((result) => {
      return result.isConfirmed
    })
  }

  const fetchItems = async () => {
    try {
      setError(null)
      const response = await fetch("/api/gallery")
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`)
      }
      const data = await response.json()
      setItems(data)
    } catch (error) {
      console.error("Failed to fetch items:", error)
      setError("Failed to load gallery data. Please make sure the API route is working properly.")
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (item: GalleryItem) => {
    setEditingItem(item)
    setEditTitle(item.title)
    setEditDescription(item.description)
    setEditCategory(item.category)
    setEditSubCategory(item.sub_category)
  }

  const handleUpdate = async () => {
    if (!editingItem) return

    try {
      setUpdating(true)
      setError(null)

      const response = await fetch(`/api/gallery/${editingItem.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: editTitle,
          description: editDescription,
          category: editCategory,
          sub_category: editSubCategory,
        }),
      })

      if (response.ok) {
        const updatedItem = await response.json()
        // Update local state
        setItems(prev => prev.map(item => 
          item.id === editingItem.id ? updatedItem : item
        ))
        setEditingItem(null)
        showSuccessAlert('Success!', 'Media updated successfully')
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to update item")
      }
    } catch (error) {
      console.error("Update error:", error)
      const errorMessage = `Failed to update media: ${error instanceof Error ? error.message : 'Unknown error'}`
      setError(errorMessage)
      showErrorAlert('Update Failed', errorMessage)
    } finally {
      setUpdating(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      setDeleting(true)
      setError(null)

      const itemToDelete = items.find(item => item.id === id)
      if (!itemToDelete) return

      const confirmed = await showDeleteConfirmation(itemToDelete.title)
      if (!confirmed) {
        setDeleteConfirm(null)
        return
      }

      const response = await fetch(`/api/gallery/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        // Remove from local state
        setItems(prev => prev.filter(item => item.id !== id))
        setDeleteConfirm(null)
        showSuccessAlert('Deleted!', 'Media deleted successfully')
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to delete item")
      }
    } catch (error) {
      console.error("Delete error:", error)
      const errorMessage = `Failed to delete media: ${error instanceof Error ? error.message : 'Unknown error'}`
      setError(errorMessage)
      showErrorAlert('Delete Failed', errorMessage)
    } finally {
      setDeleting(false)
    }
  }

  const filteredItems = items.filter(item => {
    const matchesCategory = filterCategory === "all" || item.category === filterCategory
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="w-6 h-6 border-2 border-pink-500 border-t-transparent rounded-full animate-spin mr-3"></div>
        <p className="text-gray-500">Loading data...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto">
          <p className="text-red-700 mb-4">{error}</p>
          <Button onClick={fetchItems}>
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Filter and Search */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Category
            </label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {Object.entries(CATEGORIES).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <Input
              type="text"
              placeholder="Search by title or description..."
              value={searchTerm}
              onChange={(e: { target: { value: SetStateAction<string> } }) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-end">
            <Button
              onClick={fetchItems}
              variant="outline"
              className="w-full md:w-auto"
            >
              Refresh Data
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border text-center">
          <p className="text-xl sm:text-2xl font-bold text-gray-900">{items.length}</p>
          <p className="text-gray-600 text-sm sm:text-base">Total Media</p>
        </div>
        <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border text-center">
          <p className="text-xl sm:text-2xl font-bold text-pink-600">
            {items.filter(item => item.media_type === 'image').length}
          </p>
          <p className="text-gray-600 text-sm sm:text-base">Photos</p>
        </div>
        <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border text-center">
          <p className="text-xl sm:text-2xl font-bold text-purple-600">
            {items.filter(item => item.media_type === 'video').length}
          </p>
          <p className="text-gray-600 text-sm sm:text-base">Videos</p>
        </div>
        <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border text-center">
          <p className="text-xl sm:text-2xl font-bold text-blue-600">
            {new Set(items.map(item => item.category)).size}
          </p>
          <p className="text-gray-600 text-sm sm:text-base">Categories</p>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 border"
          >
            {/* Media Preview */}
            <div className="aspect-square relative bg-gray-100">
              {item.media_type === 'video' ? (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100">
                  <VideoIcon className="w-10 h-10 sm:w-12 sm:h-12 text-purple-500" />
                </div>
              ) : (
                <img
                  src={item.image_url || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              )}
              
              {/* Media Type Badge */}
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.media_type === 'video' 
                    ? 'bg-purple-500 text-white' 
                    : 'bg-pink-500 text-white'
                }`}>
                  {item.media_type === 'video' ? 'Video' : 'Photo'}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-3 sm:p-4">
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm sm:text-base">{item.title}</h3>
              <p className="text-gray-600 text-xs sm:text-sm mb-3 line-clamp-2">{item.description}</p>
              
              <div className="flex flex-wrap gap-1 mb-3">
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                  {CATEGORY_LABELS[item.category] || item.category}
                </span>
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                  {CATEGORY_LABELS[item.sub_category] || item.sub_category}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  {new Date(item.created_at).toLocaleDateString('en-US')}
                </span>
                <div className="flex gap-1 sm:gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(item)}
                    className="flex items-center gap-1 text-xs"
                  >
                    <EditIcon className="w-3 h-3" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(item.id)}
                    className="flex items-center gap-1 text-xs"
                    disabled={deleting}
                  >
                    <DeleteIcon className="w-3 h-3" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && items.length > 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-md border">
          <p className="text-gray-500">No media found matching your filters</p>
        </div>
      )}

      {items.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-md border">
          <GalleryIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No media uploaded yet</p>
        </div>
      )}

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 p-6 pb-0">
              <h3 className="text-lg font-semibold">Edit Media</h3>
              <button
                onClick={() => setEditingItem(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 p-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <Input
                  value={editTitle}
                  onChange={(e: { target: { value: SetStateAction<string> } }) => setEditTitle(e.target.value)}
                  placeholder="Media title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  placeholder="Media description"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
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
                    Sub-Category
                  </label>
                  <select
                    value={editSubCategory}
                    onChange={(e) => setEditSubCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  >
                    {Object.entries(SUB_CATEGORIES[editCategory] || {}).map(([key, label]) => (
                      <option key={key} value={key}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  onClick={handleUpdate}
                  className="bg-pink-500 hover:bg-pink-600 flex-1"
                  disabled={updating}
                >
                  {updating ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Updating...</span>
                    </div>
                  ) : (
                    "Update Media"
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setEditingItem(null)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}