"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Navbar } from "../components/navbar"
import { HeartIcon } from "../components/icons/heart-icon"
import { LockIcon } from "../components/icons/lock-icon"
import { Footer } from "../components/footer"

// const SECRET_PASSWORD = "cintasejati2024" // In production, this should be handled server-side
const SECRET_PASSWORD = process.env.NEXT_PUBLIC_SECRET_BOX_PASSWORD;


const secretContent = {
  title: "Our Little Sanctuary",
  subtitle: "Private, Just Ours",
  sections: [
    {
      title: "Janji Cinta Terindah",
      content: `Sayang, jika kamu membaca ini, berarti kamu sudah menemukan password rahasia kita. Ini adalah tempat dimana aku menyimpan semua perasaan terdalam untukmu.

      Aku berjanji akan selalu mencintaimu, dalam keadaan apapun. Ketika kamu sedih, aku akan menjadi bahu untuk bersandar. Ketika kamu bahagia, aku akan menjadi yang pertama merayakannya bersamamu.

      Kamu adalah alasan aku bangun setiap pagi dengan senyuman, dan alasan aku tidur dengan hati yang tenang setiap malam.`,
      image: "/secret-romantic-promise-letter.jpg",
    },
    {
      title: "Mimpi Masa Depan Kita",
      content: `Aku bermimpi suatu hari nanti kita akan memiliki rumah kecil dengan taman yang indah. Kita akan menanam bunga-bunga favorit kita bersama, dan setiap pagi minum kopi sambil melihat matahari terbit.

      Aku membayangkan kita akan punya anak-anak yang lucu, yang memiliki senyummu dan mungkin sifat jahilku. Kita akan mengajari mereka tentang cinta, kebaikan, dan bagaimana memperlakukan orang lain dengan hormat.

      Dan ketika kita sudah tua nanti, kita akan duduk di teras sambil melihat cucu-cucu kita bermain, sambil bercerita tentang perjalanan cinta kita yang indah ini.`,
      image: "/couple-dreaming-future-together-home.jpg",
    },
    {
      title: "Hal-hal Kecil yang Aku Cintai Darimu",
      content: `Cara kamu tertawa ketika menonton film komedi, bahkan yang tidak lucu sekalipun.
      
      Cara kamu selalu mengingat hal-hal kecil yang aku ceritakan, bahkan yang aku sendiri lupa.
      
      Cara kamu memelukku ketika aku sedang stress, tanpa perlu bertanya apa yang terjadi.
      
      Cara kamu menyanyikan lagu dengan nada yang salah tapi dengan penuh percaya diri.
      
      Cara kamu selalu bilang "hati-hati" setiap kali aku pergi, meski hanya ke warung sebelah.
      
      Semua hal kecil ini membuat aku jatuh cinta padamu setiap hari.`,
      image: "/couple-small-moments-together.jpg",
    },
    {
      title: "Surat Cinta Rahasia",
      content: `My Dearest Love,

      Jika ada satu hal yang ingin aku katakan padamu setiap hari, itu adalah: "Terima kasih sudah memilih untuk mencintaiku."

      Kamu bisa memilih siapa saja di dunia ini, tapi kamu memilihku. Kamu melihat semua kekuranganku, semua keanehanku, semua sisi burukku, tapi kamu tetap di sini.

      Aku tidak tahu apa yang aku lakukan di kehidupan sebelumnya untuk bisa bertemu denganmu di kehidupan ini, tapi aku bersyukur setiap hari karenanya.

      Kamu adalah hadiah terbaik yang pernah aku terima dari alam semesta.

      Forever yours,
      [Your Name]`,
      image: "/romantic-love-letter-with-flowers.jpg",
    },
  ],
}

export default function SecretBoxPage() {
  const [password, setPassword] = useState("")
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [isWrongPassword, setIsWrongPassword] = useState(false)
  const [attempts, setAttempts] = useState(0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (password.toLowerCase() === (SECRET_PASSWORD || "").toLowerCase()) {
      setIsUnlocked(true)
      setIsWrongPassword(false)
    } else {
      setIsWrongPassword(true)
      setAttempts((prev) => prev + 1)
      setPassword("")

      // Reset error after 3 seconds
      setTimeout(() => {
        setIsWrongPassword(false)
      }, 3000)
    }
  }

  if (isUnlocked) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
        <Navbar />

        <div className="pt-20 px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="max-w-4xl mx-auto text-center py-16">
            <HeartIcon className="w-16 h-16 text-pink-500 mx-auto mb-6 animate-heartbeat" />
            <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-gray-900 mb-4">{secretContent.title}</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto text-pretty">{secretContent.subtitle}</p>
          </div>

          {/* Secret Content */}
          <div className="max-w-4xl mx-auto pb-20">
            {secretContent.sections.map((section, index) => (
              <div key={index} className={`mb-16 animate-fade-in-up`} style={{ animationDelay: `${index * 0.3}s` }}>
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-pink-100">
                  {/* Section Image */}
                  <div className="relative h-64 sm:h-80 overflow-hidden">
                    <img
                      src={section.image || "/placeholder.svg"}
                      alt={section.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 text-white">
                      <h2 className="font-playfair text-2xl sm:text-3xl font-bold">{section.title}</h2>
                    </div>
                  </div>

                  {/* Section Content */}
                  <div className="p-8 sm:p-12">
                    <div className="prose prose-lg max-w-none">
                      {section.content.split("\n\n").map((paragraph, pIndex) => (
                        <p key={pIndex} className="text-gray-700 leading-relaxed mb-6 text-justify">
                          {paragraph.trim()}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Special Message */}
            {/* <div className="text-center mt-16 animate-fade-in-up" style={{ animationDelay: "1.2s" }}>
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-3xl p-12 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 left-4 w-20 h-20 border-2 border-white rounded-full"></div>
                  <div className="absolute bottom-4 right-4 w-16 h-16 border-2 border-white rounded-full"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white rounded-full"></div>
                </div>

                <div className="relative z-10">
                  <HeartIcon className="w-12 h-12 mx-auto mb-6 animate-heartbeat" />
                  <h3 className="font-playfair text-2xl font-bold mb-4">Untuk Cinta Sejatiku</h3>
                  <p className="text-lg opacity-90 max-w-2xl mx-auto text-pretty">
                    Terima kasih sudah menemukan tempat rahasia ini. Ini adalah bukti bahwa kamu benar-benar mengenal
                    aku dan cinta kita. Aku mencintaimu lebih dari kata-kata yang bisa aku ungkapkan.
                  </p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <Navbar />

      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="min-h-[70vh] flex items-center justify-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 sm:p-12 w-full border border-pink-100">
              {/* Lock Icon */}
              <div className="text-center mb-8">
                <div
                  className={`inline-flex p-6 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 mb-6 ${isWrongPassword ? "animate-bounce" : "animate-float"}`}
                >
                  <LockIcon className="w-12 h-12 text-white" />
                </div>
                <h1 className="font-playfair text-3xl font-bold text-gray-900 mb-2">Box of Secrets</h1>
                <p className="text-gray-600 text-pretty">Type the password to step inside our private sanctuary.</p>
              </div>

              {/* Password Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    type="password"
                    placeholder="Enter the secret key…"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                      isWrongPassword
                        ? "border-red-300 bg-red-50 focus:border-red-500"
                        : "border-pink-200 focus:border-pink-500"
                    }`}
                    required
                  />
                  {isWrongPassword && (
                    <p className="text-red-500 text-sm mt-2 animate-fade-in-up">
                      Password salah! Coba lagi... ({attempts}/∞)
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Unlock the Secret Box
                </Button>
              </form>

              {/* Hints */}
              <div className="mt-8 p-4 bg-pink-50 rounded-xl border border-pink-100">
                <h3 className="font-medium text-pink-800 mb-2">Need a clue?</h3>
                <ul className="text-sm text-pink-700 space-y-1">
                  <li>• Only Salma or Rizky know the password, ask them</li>
                  {/* <li>• Plus the year that is special to us</li>
                  <li>• All lowercase letters, no spaces</li> */}
                </ul>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-pink-200 rounded-full opacity-60 animate-float"></div>
              <div
                className="absolute -bottom-4 -right-4 w-6 h-6 bg-purple-200 rounded-full opacity-60 animate-float"
                style={{ animationDelay: "1s" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
