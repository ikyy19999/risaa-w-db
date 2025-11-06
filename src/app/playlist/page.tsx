"use client"

import { Footer } from "../components/footer"
import { MusicIcon } from "../components/icons/music-icon"
import { Navbar } from "../components/navbar"

const playlists = [
  {
    id: 1,
    title: "Our Love Songs",
    description: "Lagu-lagu yang mengiringi perjalanan cinta kami",
    spotifyId: "37i9dQZF1DX0XUsuxWHRQd",
    cover: "/playlist-love-songs-cover.jpg",
    songCount: 25,
  },
  {
    id: 2,
    title: "First Date Vibes",
    description: "Playlist yang kami dengarkan saat kencan pertama",
    spotifyId: "37i9dQZF1DX4sWSpwAYIIu",
    cover: "/playlist-first-date-cover.jpg",
    songCount: 18,
  },
  {
    id: 3,
    title: "Cozy Home Together",
    description: "Musik untuk malam-malam santai di rumah",
    spotifyId: "37i9dQZF1DX1s9knjP51Oa",
    cover: "/playlist-cozy-home-cover.jpg",
    songCount: 32,
  },
]

// Top 10 Songs untuk Anda
const myTop10 = [
  { 
    title: "Blinding Lights", 
    artist: "The Weeknd", 
    spotifyId: "3mTXjYAb9soZ8dnae1Y7Z5" 
  },
  { 
    title: "Save Your Tears", 
    artist: "The Weeknd", 
    spotifyId: "5QO79kh1waicV47BqGRL3g" 
  },
  { 
    title: "Levitating", 
    artist: "Dua Lipa", 
    spotifyId: "39LLxExYz6ewLAcYrzQQyP" 
  },
  { 
    title: "Stay", 
    artist: "The Kid LAROI, Justin Bieber", 
    spotifyId: "5PjdY0CKGZdEuoNab3yDmX" 
  },
  { 
    title: "Good 4 U", 
    artist: "Olivia Rodrigo", 
    spotifyId: "4ZtFanR9U6ndgddUvNcjcG" 
  },
  { 
    title: "Heat Waves", 
    artist: "Glass Animals", 
    spotifyId: "02MWAaffLxlfxAUY7c5dvx" 
  },
  { 
    title: "Easy On Me", 
    artist: "Adele", 
    spotifyId: "0gplL1WMoJ6iYaPgMCL0gX" 
  },
  { 
    title: "Industry Baby", 
    artist: "Lil Nas X", 
    spotifyId: "27NovPIUIRrOZoCHxABJwK" 
  },
  { 
    title: "Shivers", 
    artist: "Ed Sheeran", 
    spotifyId: "6bQfNiqyCX7UaQSvVVGo4I" 
  },
  { 
    title: "As It Was", 
    artist: "Harry Styles", 
    spotifyId: "4LRPiXqCikLlN15c3yImP7" 
  },
]

// Top 10 Songs untuk Pacar
const partnerTop10 = [
  { 
    title: "drivers license", 
    artist: "Olivia Rodrigo", 
    spotifyId: "5wANPM4fQCJwkGd4rN57mH" 
  },
  { 
    title: "Stay", 
    artist: "The Kid LAROI, Justin Bieber", 
    spotifyId: "5PjdY0CKGZdEuoNab3yDmX" 
  },
  { 
    title: "Peaches", 
    artist: "Justin Bieber", 
    spotifyId: "4iJyoBOLtHqaGxP12qzhQI" 
  },
  { 
    title: "Kiss Me More", 
    artist: "Doja Cat ft. SZA", 
    spotifyId: "748mdHapucXQri7IAO8yFK" 
  },
  { 
    title: "Montero", 
    artist: "Lil Nas X", 
    spotifyId: "6jbuHi4WwzcbgS6dNPaqlm" 
  },
  { 
    title: "Leave The Door Open", 
    artist: "Silk Sonic", 
    spotifyId: "7MAibcTli4IisCtbHKrGMh" 
  },
  { 
    title: "Deja Vu", 
    artist: "Olivia Rodrigo", 
    spotifyId: "6nB9nIJxUIdp6eglBoM6C3" 
  },
  { 
    title: "positions", 
    artist: "Ariana Grande", 
    spotifyId: "35eY3BSFjRgE36afg4aYe4" 
  },
  { 
    title: "Therefore I Am", 
    artist: "Billie Eilish", 
    spotifyId: "54bFM56PmE4YLRnqpW6Tha" 
  },
  { 
    title: "34+35", 
    artist: "Ariana Grande", 
    spotifyId: "6Im9k8u9iIzKMrmV7BWtlF" 
  },
]

export default function PlaylistPage() {
  const handleSongClick = (spotifyId: string) => {
    window.open(`https://open.spotify.com/track/${spotifyId}`, '_blank')
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <Navbar />

      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-6xl mx-auto text-center py-16">
          <MusicIcon className="w-16 h-16 text-pink-500 mx-auto mb-6 animate-heartbeat" />
          <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Our{" "}
            <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">Playlist</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto text-pretty">
            Each song holds a story, each note a memory
          </p>
        </div>

        {/* Main Playlist */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-6 text-center">The Playlist of Us</h2>
            <div className="rounded-xl overflow-hidden">
              <iframe
                src="https://open.spotify.com/embed/playlist/6DguPLBwsIqJ2tBfdJHuqX?utm_source=generator"
                width="100%"
                height="380"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-xl"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Top 10 Section */}
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-12 text-center">
            Our <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">Top 10</span> Songs
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* My Top 10 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 animate-fade-in-up">
              <div className="text-center mb-6">
                <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-2">My Top 10</h3>
                {/* <p className="text-gray-600">Lagu-lagu favorit yang selalu ada di playlistku</p> */}
              </div>
              
              <div className="space-y-3">
                {myTop10.map((song, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-pink-50 to-purple-50 hover:from-pink-100 hover:to-purple-100 transition-all duration-300 group cursor-pointer"
                    onClick={() => handleSongClick(song.spotifyId)}
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{index + 1}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 truncate group-hover:text-pink-600 transition-colors">
                        {song.title}
                      </h4>
                      <p className="text-gray-600 text-sm truncate">oleh {song.artist}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <MusicIcon className="w-5 h-5 text-gray-400 group-hover:text-pink-500 transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Partner's Top 10 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 animate-fade-in-up">
              <div className="text-center mb-6">
                <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-2">Her Top 10</h3>
                {/* <p className="text-gray-600">Lagu-lagu spesial yang berarti buat dia</p> */}
              </div>
              
              <div className="space-y-3">
                {partnerTop10.map((song, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-all duration-300 group cursor-pointer"
                    onClick={() => handleSongClick(song.spotifyId)}
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{index + 1}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 truncate group-hover:text-purple-600 transition-colors">
                        {song.title}
                      </h4>
                      <p className="text-gray-600 text-sm truncate">oleh {song.artist}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <MusicIcon className="w-5 h-5 text-gray-400 group-hover:text-purple-500 transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}