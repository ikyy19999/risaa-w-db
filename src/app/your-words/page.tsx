"use client"

import { useState, useEffect } from "react"
import { Navbar } from "../components/navbar"
import { HeartIcon } from "../components/icons/heart-icon"
import { Footer } from "../components/footer"

interface Message {
  id: number
  sender: string
  message: string
  date: string
  relationship: string
}

// Sample messages - these will be replaced by real Telegram messages
const sampleMessages: Message[] = [
  {
    id: 1,
    sender: "Mama",
    message:
      "Senang sekali melihat kalian berdua bahagia. Semoga cinta kalian selalu terjaga dan semakin kuat setiap harinya. Mama mendoakan yang terbaik untuk kalian!",
    date: "2024-01-15",
    relationship: "family",
  },
  {
    id: 2,
    sender: "Sarah (Sahabat)",
    message:
      "Dari awal aku udah tau kalian cocok banget! Kalian tuh couple goals banget deh. Semoga langgeng sampai kakek nenek ya!",
    date: "2024-01-10",
    relationship: "friend",
  },
  {
    id: 3,
    sender: "Papa",
    message:
      "Papa bangga sama pilihan kalian. Jagalah satu sama lain, dan ingat bahwa cinta sejati itu butuh komitmen dan pengorbanan. Semoga bahagia selalu!",
    date: "2024-01-08",
    relationship: "family",
  },
]

export default function YourWordsPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true)
        setError(null)

        // Try to fetch from Telegram API first
        const response = await fetch("/api/get-telegram-messages")

        if (response.ok) {
          const data = await response.json()
          if (data.success && data.messages.length > 0) {
            setMessages(data.messages)
          } else {
            // Fallback to sample messages if no real messages
            setMessages(sampleMessages)
          }
        } else {
          // Fallback to sample messages on API error
          console.warn("Failed to fetch Telegram messages, using sample data")
          setMessages(sampleMessages)
        }
      } catch (error) {
        console.error("Error fetching messages:", error)
        setError("Telegram messages not loading.")
        // Fallback to sample messages
        setMessages(sampleMessages)
      } finally {
        setLoading(false)
      }
    }

    fetchMessages()
  }, [])

  const categories = [
    { id: "all", label: "All", count: messages.length },
    { id: "family", label: "Family", count: messages.filter((m) => m.relationship === "family").length },
    { id: "friend", label: "Friend", count: messages.filter((m) => m.relationship === "friend").length },
  ]

  const filteredMessages =
    selectedCategory === "all" ? messages : messages.filter((message) => message.relationship === selectedCategory)

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
        <Navbar />
        <div className="pt-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto min-h-[70vh] flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-pink-500 border-t-transparent mx-auto mb-4"></div>
              <p className="text-gray-600">Fetching messages from Telegram…</p>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <Navbar />

      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-6xl mx-auto text-center py-16">
          <HeartIcon className="w-16 h-16 text-pink-500 mx-auto mb-6 animate-heartbeat" />
          <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Your{" "}
            <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">Words</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto text-pretty">
            Warm words from family and friends who’ve been part of our journey.
          </p>

          {error && (
            <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-yellow-700 text-sm">{error}</p>
              <p className="text-yellow-600 text-xs mt-1">Menampilkan pesan contoh</p>
            </div>
          )}
        </div>

        {/* Category Filter */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-pink-50 hover:text-pink-600 shadow-md"
                }`}
              >
                {category.label} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="max-w-4xl mx-auto pb-20">
          {filteredMessages.length === 0 ? (
            <div className="text-center py-16">
              <HeartIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">This category hasn’t received any messages yet.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredMessages.map((message, index) => (
                <div
                  key={message.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">{message.sender.charAt(0).toUpperCase()}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-playfair text-lg font-bold text-gray-900">{message.sender}</h3>
                        <div className="flex items-center space-x-2">
                          <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-xs font-medium">
                            {message.relationship}
                          </span>
                          <span className="text-gray-400 text-sm">
                            {new Date(message.date).toLocaleDateString("id-ID", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{message.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* How to Send Message */}
        <div className="max-w-4xl mx-auto pb-20">
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-3xl p-8 text-white text-center">
            <HeartIcon className="w-12 h-12 mx-auto mb-6 animate-heartbeat" />
            <h2 className="font-playfair text-2xl font-bold mb-4">Drop Us a Message</h2>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              Leave a note or wish us well on our journey
            </p>
            <div className="space-y-4">
              <button
                onClick={() => window.open("/note", "_blank")}
                className="bg-white text-pink-600 px-8 py-3 rounded-full font-medium hover:bg-pink-50 transition-colors inline-block"
              >
                Click Here...
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
