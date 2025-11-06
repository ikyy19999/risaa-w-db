"use client"

import { Footer } from "../components/footer"
import { HeartIcon } from "../components/icons/heart-icon"
import { Navbar } from "../components/navbar"

const loveFacts = [
  {
    category: "About Us",
    icon: "💕",
    facts: [
      "Coming soon… making sure everything looks perfect",
    ],
  },
  {
    category: "Funny Habits",
    icon: "😄",
    facts: [
      "Coming soon… making sure everything looks perfect",
    ],
  },
  {
    category: "Milestones",
    icon: "🎉",
    facts: [
      "Coming soon… making sure everything looks perfect",
    ],
  },
  {
    category: "Fun Stats",
    icon: "📊",
    facts: [
      "Coming soon… making sure everything looks perfect",
    ],
  },
  {
    category: "Unique Coincidences",
    icon: "✨",
    facts: [
      "Coming soon… making sure everything looks perfect",
    ],
  },
  {
    category: "Rencana Masa Depan",
    icon: "🌟",
    facts: [
      "Coming soon… making sure everything looks perfect",
    ],
  },
]

export default function LoveFactsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <Navbar />

      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-6xl mx-auto text-center py-16">
          <HeartIcon className="w-16 h-16 text-pink-500 mx-auto mb-6 animate-heartbeat" />
          <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Love{" "}
            <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">Facts</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto text-pretty">
            Love Facts & Unique Moments
          </p>
        </div>

        {/* Facts Categories */}
        <div className="max-w-6xl mx-auto pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {loveFacts.map((category, categoryIndex) => (
              <div
                key={categoryIndex}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 animate-fade-in-up"
                style={{ animationDelay: `${categoryIndex * 0.2}s` }}
              >
                {/* Category Header */}
                <div className="flex items-center mb-6">
                  <span className="text-3xl mr-4">{category.icon}</span>
                  <h2 className="font-playfair text-2xl font-bold text-gray-900">{category.category}</h2>
                </div>

                {/* Facts List */}
                <div className="space-y-4">
                  {category.facts.map((fact, factIndex) => (
                    <div
                      key={factIndex}
                      className="flex items-start space-x-3 p-3 rounded-xl bg-pink-50 hover:bg-pink-100 transition-colors"
                    >
                      <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mt-0.5">
                        <HeartIcon className="w-3 h-3 text-white" />
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">{fact}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Fun Stats Section */}
          <div className="mt-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-3xl p-12 text-white text-center">
            <h2 className="font-playfair text-3xl font-bold mb-8">Our Love Stats</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-4xl font-bold mb-2">1+</div>
                <div className="text-sm opacity-90">Our Journey Through the Years</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">∞</div>
                <div className="text-sm opacity-90">Beautiful Memories</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">100%</div>
                <div className="text-sm opacity-90">Happiness Level</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">1</div>
                <div className="text-sm opacity-90">True Love</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
