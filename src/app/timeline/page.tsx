"use client"

import { Footer } from "../components/footer"
import { HeartIcon } from "../components/icons/heart-icon"
import { TimelineIcon } from "../components/icons/timeline-icon"
import { Navbar } from "../components/navbar"


const timelineEvents = [
  {
    date: "June 2024",
    title: "First Meeting",
    description:
    "Our chats started on Telegram, just two strangers in a digital sea.But the moment our words connected, everything felt different like the world paused just for us.",
    image: "/romantic-first-meeting-at-cafe.jpg",
    side: "left",
  },
  {
    date: "August 2024",
    title: "First Date",
    description:
    "A day spent wandering the streets of Bogor that turned into hours of laughter and connection. We talked and explored until the city lights faded into the night.",
    image: "/romantic-first-date-under-stars.jpg",
    side: "right",
  },
  {
    date: "August 2024",
    title: "Officially",
    description:
      'Di bawah pohon sakura yang sedang mekar, kamu menggenggam tanganku dan berkata "Mau jadi pacarku?". Tentu saja jawabanku adalah iya!',
    image: "/couple-holding-hands-under-cherry-blossom.jpg",
    side: "left",
  },
]

export default function TimelinePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <Navbar />

      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center py-16">
          <TimelineIcon className="w-16 h-16 text-pink-500 mx-auto mb-6 animate-heartbeat" />
          <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Moments in{" "}
            <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Our Love
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto text-pretty">
            A timeline of the special moments that have defined our journey together.
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-6xl mx-auto pb-20">
          <div className="relative">
            {/* Center line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-pink-300 to-purple-400 hidden lg:block"></div>

            {timelineEvents.map((event, index) => (
              <div
                key={index}
                className={`relative flex items-center mb-16 lg:mb-24 animate-fade-in-up`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Desktop Layout */}
                <div className={`hidden lg:flex w-full ${event.side === "left" ? "flex-row" : "flex-row-reverse"}`}>
                  {/* Content */}
                  <div className="w-5/12">
                    <div
                      className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 ${event.side === "left" ? "mr-8" : "ml-8"}`}
                    >
                      <div className="flex items-center mb-4">
                        <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                          {event.date}
                        </div>
                      </div>
                      <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-4">{event.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{event.description}</p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="flex items-center justify-center w-2/12">
                    <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full border-4 border-white shadow-lg z-10">
                      <HeartIcon className="w-3 h-3 text-white m-0.5" />
                    </div>
                  </div>

                  {/* Image */}
                  <div className="w-5/12">
                    <div className={`${event.side === "right" ? "mr-8" : "ml-8"}`}>
                      <img
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        className="w-full h-64 object-cover rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>

                {/* Mobile Layout */}
                <div className="lg:hidden w-full">
                  <div className="flex items-start space-x-4">
                    {/* Timeline dot */}
                    <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full border-4 border-white shadow-lg mt-2">
                      <HeartIcon className="w-3 h-3 text-white m-0.5" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="bg-white rounded-2xl p-6 shadow-lg mb-4">
                        <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium inline-block mb-3">
                          {event.date}
                        </div>
                        <h3 className="font-playfair text-xl font-bold text-gray-900 mb-3">{event.title}</h3>
                        <p className="text-gray-600 leading-relaxed mb-4">{event.description}</p>
                        <img
                          src={event.image || "/placeholder.svg"}
                          alt={event.title}
                          className="w-full h-48 object-cover rounded-xl"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
