// app/gallery/page.tsx
"use client"

import { useState, useEffect } from "react"
import { Navbar } from "../components/navbar"
import { GalleryIcon } from "../components/icons/gallery-icon"
import { CloseIcon } from "../components/icons/close-icon"
import { VideoIcon } from "../components/icons/video-icon"
import { SearchIcon } from "../components/icons/search-icon"
import { SortAscIcon, SortDescIcon, CalendarIcon, ArrowUpIcon, ArrowDownIcon } from "../components/icons/sort-icons"
import { Footer } from "../components/footer"

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

interface SubcategoryStats {
  [key: string]: number
}

const CATEGORY_LABELS: Record<string, string> = {
  jakarta: "Jakarta",
  yogyakarta: "Yogyakarta",
  bogor: "Bogor",
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
}

const SUBCATEGORIES: Record<string, string[]> = {
  jakarta: ["jakarta-pusat", "jakarta-selatan", "jakarta-utara", "jakarta-timur", "jakarta-barat"],
  yogyakarta: ["yogya-kota", "sleman", "bantul", "kidul"],
  bogor: ["bogor-tengah", "bogor-barat", "bogor-timur", "puncak", "cianjur"],
}

const SUBCATEGORY_TO_CATEGORY: Record<string, string> = {
  "jakarta-pusat": "jakarta",
  "jakarta-selatan": "jakarta",
  "jakarta-utara": "jakarta",
  "jakarta-timur": "jakarta",
  "jakarta-barat": "jakarta",
  "yogya-kota": "yogyakarta",
  "sleman": "yogyakarta",
  "bantul": "yogyakarta",
  "kidul": "yogyakarta",
  "bogor-tengah": "bogor",
  "bogor-barat": "bogor",
  "bogor-timur": "bogor",
  "puncak": "bogor",
  "cianjur": "bogor",
}

const SORT_OPTIONS = [
  { id: 'newest', label: 'Newest First', icon: ArrowDownIcon },
  { id: 'oldest', label: 'Oldest First', icon: ArrowUpIcon },
  { id: 'title-asc', label: 'Title A-Z', icon: SortAscIcon },
  { id: 'title-desc', label: 'Title Z-A', icon: SortDescIcon },
]

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null)
  const [selectedMedia, setSelectedMedia] = useState<GalleryItem | null>(null)
  const [selectedMediaType, setSelectedMediaType] = useState<"all" | "image" | "video">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState('newest')
  const [isSortOpen, setIsSortOpen] = useState(false)
  const [subcategoryStats, setSubcategoryStats] = useState<SubcategoryStats>({})

  // Fetch data
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch(`/api/gallery`)
        const data = await response.json()
        const itemsWithDate = data.map((item: GalleryItem) => ({
          ...item,
          created_at: item.created_at || new Date().toISOString()
        }))
        setItems(itemsWithDate)

        const stats: SubcategoryStats = {}
        itemsWithDate.forEach((item: GalleryItem) => {
          stats[item.sub_category] = (stats[item.sub_category] || 0) + 1
        })
        setSubcategoryStats(stats)
      } catch (error) {
        console.error("Failed to fetch gallery:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchGallery()
  }, [])

  // Data calculations
  const categories = [
    { id: "all", label: "All", count: items.length },
    { id: "jakarta", label: "Jakarta", count: items.filter(item => item.category === "jakarta").length },
    { id: "yogyakarta", label: "Yogyakarta", count: items.filter(item => item.category === "yogyakarta").length },
    { id: "bogor", label: "Bogor", count: items.filter(item => item.category === "bogor").length },
  ]

  const mediaTypes = [
    { id: "all", label: "All Media", icon: null, count: items.length },
    { id: "image", label: "Photos", icon: GalleryIcon, count: items.filter(item => item.media_type === 'image').length },
    { id: "video", label: "Videos", icon: VideoIcon, count: items.filter(item => item.media_type === 'video').length },
  ]

  // Handlers
  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setSelectedSubCategory(null)
  }

  const handleSubCategoryClick = (subcategoryId: string) => {
    setSelectedSubCategory(subcategoryId)
    const parentCategory = SUBCATEGORY_TO_CATEGORY[subcategoryId]
    if (parentCategory) {
      setSelectedCategory(parentCategory)
    }
  }

  const handleMediaTypeClick = (mediaType: "all" | "image" | "video") => {
    setSelectedMediaType(mediaType)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const clearSearch = () => {
    setSearchQuery("")
  }

  const handleSortChange = (sortOption: string) => {
    setSortBy(sortOption)
    setIsSortOpen(false)
  }

  const resetFilters = () => {
    setSelectedCategory("all")
    setSelectedSubCategory(null)
    setSelectedMediaType("all")
    setSearchQuery("")
    setSortBy('newest')
  }

  // Filter and sort logic
  const filteredItems = items.filter((item) => {
    const categoryMatch = selectedSubCategory 
      ? item.sub_category === selectedSubCategory
      : selectedCategory === "all" 
        ? true
        : item.category === selectedCategory
    
    const mediaTypeMatch = selectedMediaType === "all" || item.media_type === selectedMediaType

    const searchMatch = searchQuery === "" || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      CATEGORY_LABELS[item.category]?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      CATEGORY_LABELS[item.sub_category]?.toLowerCase().includes(searchQuery.toLowerCase())

    return categoryMatch && mediaTypeMatch && searchMatch
  })

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch(sortBy) {
      case 'newest':
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      case 'oldest':
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      case 'title-asc':
        return a.title.localeCompare(b.title)
      case 'title-desc':
        return b.title.localeCompare(a.title)
      default:
        return 0
    }
  })

  // Helper functions
  const getAllSubcategoriesWithItems = (): string[] => {
    const subcategoriesWithItems = new Set<string>()
    items.forEach((item) => {
      if (subcategoryStats[item.sub_category] > 0) {
        subcategoriesWithItems.add(item.sub_category)
      }
    })
    return Array.from(subcategoriesWithItems)
  }

  const getCurrentSubcategories = (): string[] => {
    if (selectedCategory === "all") {
      return getAllSubcategoriesWithItems()
    } else {
      return SUBCATEGORIES[selectedCategory] || []
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const currentSubcategories = getCurrentSubcategories()
  const hasActiveFilters = selectedSubCategory || selectedCategory !== "all" || selectedMediaType !== "all" || searchQuery || sortBy !== 'newest'

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <Navbar />

      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center py-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <GalleryIcon className="w-16 h-16 text-pink-500 animate-heartbeat" />
              <div className="absolute -inset-2 bg-pink-100 rounded-full blur-md opacity-50 -z-10"></div>
            </div>
          </div>
          <h1 className="font-playfair text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Memory <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">Gallery</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Beautiful collection of photos and videos from every precious moment in our love journey
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search memories by title, description, or location..."
              className="w-full pl-12 pr-12 py-4 bg-white/80 backdrop-blur-sm border-0 rounded-2xl shadow-lg placeholder-gray-500 focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all duration-300 text-gray-900 text-base"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Controls Section */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            {/* Media Type Filters */}
            <div className="flex flex-wrap gap-3">
              {mediaTypes.map((mediaType) => {
                const IconComponent = mediaType.icon
                return (
                  <button
                    key={mediaType.id}
                    onClick={() => handleMediaTypeClick(mediaType.id as "all" | "image" | "video")}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-medium transition-all duration-200 ${
                      selectedMediaType === mediaType.id
                        ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg scale-105"
                        : "bg-white text-gray-700 hover:bg-pink-50 hover:text-pink-600 shadow-md"
                    }`}
                  >
                    {IconComponent && <IconComponent className="w-4 h-4" />}
                    <span>{mediaType.label}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      selectedMediaType === mediaType.id
                        ? "bg-white/20 text-white"
                        : "bg-pink-100 text-pink-600"
                    }`}>
                      {mediaType.count}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 hover:border-pink-300 min-w-[160px] justify-between"
              >
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-pink-500" />
                  <span className="font-medium text-gray-700 text-sm">
                    {SORT_OPTIONS.find(option => option.id === sortBy)?.label}
                  </span>
                </div>
                <svg 
                  className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isSortOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isSortOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200 z-10 py-1">
                  {SORT_OPTIONS.map((option) => {
                    const IconComponent = option.icon
                    return (
                      <button
                        key={option.id}
                        onClick={() => handleSortChange(option.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-all duration-200 ${
                          sortBy === option.id
                            ? 'bg-pink-50 text-pink-600'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <IconComponent className="w-4 h-4" />
                        <span className="text-sm font-medium">{option.label}</span>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === category.id && !selectedSubCategory
                    ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg scale-105"
                    : "bg-white text-gray-700 hover:bg-pink-50 hover:text-pink-600 shadow-md"
                }`}
              >
                <span>{category.label}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  selectedCategory === category.id && !selectedSubCategory
                    ? "bg-white/20 text-white"
                    : "bg-pink-100 text-pink-600"
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Active Filters Indicator */}
        {/* {hasActiveFilters && (
          <div className="max-w-6xl mx-auto mb-8">
            <div className="flex flex-col sm:flex-row items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-md">
              <span className="text-sm text-gray-600 font-medium">Active filters:</span>
              <div className="flex flex-wrap gap-2">
                {searchQuery && (
                  <span className="inline-flex items-center gap-2 bg-blue-500 text-white px-3 py-1.5 rounded-full text-sm">
                    <SearchIcon className="w-3 h-3" />
                    "{searchQuery}"
                  </span>
                )}
                {selectedMediaType !== "all" && (
                  <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
                    selectedMediaType === "image" 
                      ? "bg-pink-500 text-white" 
                      : "bg-purple-500 text-white"
                  }`}>
                    {selectedMediaType === "image" ? "Photos" : "Videos"}
                  </span>
                )}
                {selectedSubCategory ? (
                  <>
                    <span className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 py-1.5 rounded-full text-sm">
                      {CATEGORY_LABELS[selectedSubCategory]}
                    </span>
                    <span className="inline-flex items-center gap-2 bg-pink-100 text-pink-600 px-3 py-1.5 rounded-full text-sm">
                      {CATEGORY_LABELS[selectedCategory]}
                    </span>
                  </>
                ) : selectedCategory !== "all" && (
                  <span className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 py-1.5 rounded-full text-sm">
                    {CATEGORY_LABELS[selectedCategory]}
                  </span>
                )}
                {sortBy !== 'newest' && (
                  <span className="inline-flex items-center gap-2 bg-green-500 text-white px-3 py-1.5 rounded-full text-sm">
                    <CalendarIcon className="w-3 h-3" />
                    {SORT_OPTIONS.find(option => option.id === sortBy)?.label}
                  </span>
                )}
              </div>
              <button
                onClick={resetFilters}
                className="flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors ml-auto text-sm font-medium"
              >
                <CloseIcon className="w-4 h-4" />
                Clear all
              </button>
            </div>
          </div>
        )} */}

        {/* Subcategories Section */}
        {currentSubcategories.length > 0 && !searchQuery && (
          <div className="max-w-6xl mx-auto mb-12">
            <div className="text-center mb-8">
              <h2 className="font-playfair text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                {selectedCategory === "all" 
                  ? "Explore Our Locations" 
                  : `Discover ${CATEGORY_LABELS[selectedCategory]}`
                }
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {selectedCategory === "all" 
                  ? "Browse through our cherished memories from different locations"
                  : `Find special moments from various places in ${CATEGORY_LABELS[selectedCategory]}`
                }
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {currentSubcategories.map((subcat) => (
                <button
                  key={subcat}
                  onClick={() => handleSubCategoryClick(subcat)}
                  disabled={subcategoryStats[subcat] === 0}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-200 ${
                    selectedSubCategory === subcat
                      ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg scale-105"
                      : subcategoryStats[subcat] > 0
                      ? "bg-white text-gray-700 hover:bg-pink-50 hover:text-pink-600 shadow-md hover:scale-105"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <span className="font-medium">{CATEGORY_LABELS[subcat]}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    selectedSubCategory === subcat
                      ? "bg-white/20 text-white"
                      : subcategoryStats[subcat] > 0
                      ? "bg-pink-100 text-pink-600"
                      : "bg-gray-200 text-gray-400"
                  }`}>
                    {subcategoryStats[subcat] || 0}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Gallery Grid */}
        <div className="max-w-6xl mx-auto pb-20">
          {loading ? (
            <div className="text-center py-20">
              <div className="w-10 h-10 border-3 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-500 text-lg">Loading beautiful memories...</p>
            </div>
          ) : sortedItems.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <GalleryIcon className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {searchQuery ? 'No memories found' : 'No memories yet'}
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                {searchQuery 
                  ? `We couldn't find any memories matching "${searchQuery}". Try different keywords.`
                  : "Looks like this location doesn't have memories yet. Have a place we should visit?"
                }
              </p>
              <button
                onClick={resetFilters}
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-full hover:from-pink-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {searchQuery ? "Clear Search" : "Browse All Memories"}
              </button>
            </div>
          ) : (
            <>
              {/* Results Summary */}
              <div className="text-center mb-10">
                <p className="text-gray-600">
                  {searchQuery ? (
                    <>
                      Found <span className="font-semibold text-pink-600">{sortedItems.length}</span> memory{sortedItems.length !== 1 ? 'ies' : ''} for{" "}
                      <span className="font-semibold text-pink-600">"{searchQuery}"</span>
                    </>
                  ) : (
                    <>
                      Showing <span className="font-semibold text-pink-600">{sortedItems.length}</span> cherished memory{sortedItems.length !== 1 ? 'ies' : ''}
                      {selectedSubCategory && ` from ${CATEGORY_LABELS[selectedSubCategory]}`}
                      {selectedCategory !== "all" && !selectedSubCategory && ` from ${CATEGORY_LABELS[selectedCategory]}`}
                    </>
                  )}
                  {sortBy !== 'newest' && (
                    <> • Sorted by <span className="font-semibold text-pink-600">{SORT_OPTIONS.find(option => option.id === sortBy)?.label}</span></>
                  )}
                </p>
              </div>

              {/* Gallery Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-[1.02]"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => setSelectedMedia(item)}
                  >
                    <div className="aspect-square overflow-hidden relative bg-gray-100">
                      {item.media_type === 'video' ? (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100">
                          <div className="text-center">
                            <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 mx-auto mb-3 transform group-hover:scale-110 transition-transform duration-300">
                              <VideoIcon className="w-8 h-8 text-purple-500" />
                            </div>
                            <p className="text-purple-700 font-medium text-sm">Video Memory</p>
                            <p className="text-purple-500 text-xs mt-1">Click to play</p>
                          </div>
                        </div>
                      ) : (
                        <img
                          src={item.image_url || "/placeholder.svg"}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      )}
                    </div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-playfair text-lg font-bold line-clamp-1">{item.title}</h3>
                          {item.media_type === 'video' && (
                            <VideoIcon className="w-4 h-4 text-white/80 flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-sm opacity-90 line-clamp-2 mb-2">{item.description}</p>
                        <div className="flex items-center gap-2 text-xs opacity-75">
                          <CalendarIcon className="w-3 h-3" />
                          <span>{formatDate(item.created_at)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-gray-700">
                        {CATEGORY_LABELS[item.sub_category] || CATEGORY_LABELS[item.category]}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3">
                      <span className={`backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium ${
                        item.media_type === 'video' 
                          ? 'bg-purple-500/90 text-white' 
                          : 'bg-pink-500/90 text-white'
                      }`}>
                        {item.media_type === 'video' ? 'Video' : 'Photo'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modal */}
      {selectedMedia && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedMedia(null)}
              className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors shadow-lg"
            >
              <CloseIcon className="w-5 h-5 text-gray-700" />
            </button>

            <div className="aspect-video bg-black">
              {selectedMedia.media_type === 'video' ? (
                <video
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                >
                  <source src={selectedMedia.image_url} type="video/mp4" />
                  Your browser does not support video playback.
                </video>
              ) : (
                <img
                  src={selectedMedia.image_url || "/placeholder.svg"}
                  alt={selectedMedia.title}
                  className="w-full h-full object-contain"
                />
              )}
            </div>

            <div className="p-6 lg:p-8">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 py-1.5 rounded-full text-sm font-medium">
                  {CATEGORY_LABELS[selectedMedia.category]}
                </span>
                <span className="bg-pink-100 text-pink-700 px-3 py-1.5 rounded-full text-sm font-medium">
                  {CATEGORY_LABELS[selectedMedia.sub_category]}
                </span>
                <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                  selectedMedia.media_type === 'video'
                    ? 'bg-purple-100 text-purple-700'
                    : 'bg-pink-100 text-pink-700'
                }`}>
                  {selectedMedia.media_type === 'video' ? 'Video' : 'Photo'}
                </span>
                <span className="flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm font-medium">
                  <CalendarIcon className="w-3 h-3" />
                  {formatDate(selectedMedia.created_at)}
                </span>
              </div>
              <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-3">{selectedMedia.title}</h2>
              <p className="text-gray-600 leading-relaxed">{selectedMedia.description}</p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}