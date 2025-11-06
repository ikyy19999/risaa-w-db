"use client"

import { Footer } from "../components/footer"
import { HeartIcon } from "../components/icons/heart-icon"
import { Navbar } from "../components/navbar"


const storyChapters = [
  {
    chapter: "Bab 1",
    title: "Destiny Brought Us Together",
    content: 'We met by chance, laughed until our sides hurt, and fell in love in the most ordinary, extraordinary way. Every moment with you feels like a page from a fairy tale, written just for us. Through every season, every challenge, and every joy, our love has only grown stronger. You are my today, my tomorrow, and my forever.',
    image: "",
  },
  // {
  //   chapter: "Bab 2",
  //   title: "Mengenal Lebih Dekat",
  //   content: `Setelah pertemuan pertama itu, kami mulai sering bertukar pesan. Setiap hari ada saja topik yang dibicarakan - mulai dari hal-hal sederhana seperti cuaca, hingga mimpi-mimpi besar untuk masa depan.

  //   Aku mulai menyadari bahwa dia bukan hanya cantik di luar, tapi juga memiliki jiwa yang indah. Cara dia tertawa, cara dia peduli pada orang lain, cara dia melihat dunia dengan mata yang penuh harapan - semuanya membuatku jatuh hati semakin dalam.

  //   Maret 2022, aku memberanikan diri mengajaknya kencan. "Mau nonton film bareng?" tanyaku dengan gugup. "Boleh," jawabnya dengan senyum yang membuat jantungku berdebar kencang. Malam itu, di bawah langit berbintang, kami berjalan-jalan di taman kota sambil berbagi cerita tentang masa lalu dan harapan untuk masa depan.`,
  //   image: "/couple-walking-under-starry-night.jpg",
  // },
  // {
  //   chapter: "Bab 3",
  //   title: "Menjadi Satu",
  //   content: `Juni 2022, musim semi yang indah. Kami sedang berjalan-jalan di taman yang dipenuhi bunga sakura yang sedang mekar. Pemandangan itu begitu romantis, kelopak-kelopak pink berguguran seperti salju.

  //   "Aku ingin bertanya sesuatu," kataku sambil menghentikan langkah. Jantungku berdebar kencang, tangan berkeringat, tapi aku tahu ini saatnya. "Mau jadi pacarku?" tanyaku sambil menggenggam tangannya lembut.

  //   Dia terdiam sejenak, matanya berkaca-kaca, lalu tersenyum lebar. "Iya," jawabnya sambil memelukku erat. Saat itu juga, di bawah hujan kelopak sakura, kami resmi menjadi sepasang kekasih. Dunia terasa sempurna.`,
  //   image: "/couple-under-cherry-blossom-proposal.jpg",
  // },
  // {
  //   chapter: "Bab 4",
  //   title: "Petualangan Bersama",
  //   content: `Desember 2022, liburan pertama kami bersama ke Bali. Kami menjelajahi pantai-pantai indah, menikmati sunset yang menakjubkan, dan mencoba berbagai kuliner lokal.

  //   Yang paling berkesan adalah malam terakhir di sana. Kami makan malam di restoran tepi pantai dengan cahaya lilin yang romantis. Suara ombak menjadi musik latar yang sempurna. "Terima kasih sudah membuat hidupku lebih berwarna," kataku sambil menatap matanya.

  //   "Aku juga," jawabnya sambil menggenggam tanganku. "Aku ingin kita selalu bersama seperti ini." Malam itu, kami berjanji untuk selalu mendukung satu sama lain, dalam suka maupun duka.`,
  //   image: "/romantic-beach-dinner-sunset-bali.jpg",
  // },
  // {
  //   chapter: "Bab 5",
  //   title: "Cinta yang Tumbuh",
  //   content: `2024 adalah tahun dimana cinta kami semakin mengakar kuat. Kami melewati berbagai tantangan bersama - pekerjaan yang menuntut, jarak yang kadang memisahkan, dan tekanan dari berbagai arah.

  //   Tapi setiap kali ada masalah, kami selalu kembali pada satu hal: cinta kami satu sama lain. Kami belajar berkomunikasi dengan lebih baik, belajar memahami perbedaan, dan belajar tumbuh bersama.

  //   Valentine 2024 menjadi momen yang tak terlupakan ketika dia memberiku surprise lagu yang dia tulis sendiri. Liriknya begitu menyentuh hati, melodinya indah, dan yang terpenting, itu semua datang dari hatinya yang tulus.`,
  //   image: "/romantic-valentine-surprise-guitar-serenade.jpg",
  // },
  // {
  //   chapter: "Bab 6",
  //   title: "Masa Depan Bersama",
  //   content: `Januari 2024, kami mengambil langkah besar - memutuskan untuk tinggal bersama. Rumah kecil yang kami sewa mungkin tidak mewah, tapi penuh dengan cinta dan tawa.

  //   Setiap hari adalah petualangan baru. Memasak bersama (meski kadang gosong), menonton film sambil berpelukan, berbagi cerita tentang hari yang telah berlalu. Hal-hal sederhana yang membuat hidup terasa begitu berarti.

  //   Sekarang, saat aku menulis cerita ini, aku tahu bahwa ini baru permulaan. Masih banyak halaman kosong yang menunggu untuk diisi dengan kenangan-kenangan indah. Dan aku tidak sabar untuk menulisnya bersama denganmu, cintaku.`,
  //   image: "/couple-happy-together-in-cozy-home.jpg",
  // },
]

export default function StoryPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <Navbar />

      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center py-16">
          <HeartIcon className="w-16 h-16 text-pink-500 mx-auto mb-6 animate-heartbeat" />
          <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            A Journey Through{" "}
            <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Our Love Story
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto text-pretty">
            A digital diary capturing our love story from its first chapter to the present.
          </p>
        </div>

        {/* Story Chapters */}
        <div className="max-w-4xl mx-auto pb-20">
          {storyChapters.map((chapter, index) => (
            <div key={index} className={`mb-16 animate-fade-in-up`} style={{ animationDelay: `${index * 0.2}s` }}>
              <div className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                {/* Chapter Image */}
                <div className="relative h-64 sm:h-80 overflow-hidden">
                  <img
                    src={chapter.image || "/placeholder.svg"}
                    alt={chapter.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-2">
                      {chapter.chapter}
                    </div>
                    <h2 className="font-playfair text-2xl sm:text-3xl font-bold">{chapter.title}</h2>
                  </div>
                </div>

                {/* Chapter Content */}
                <div className="p-8 sm:p-12">
                  <div className="prose prose-lg max-w-none">
                    {chapter.content.split("\n\n").map((paragraph, pIndex) => (
                      <p key={pIndex} className="text-gray-700 leading-relaxed mb-6 text-justify">
                        {paragraph.trim()}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Ending Message */}
          {/* <div className="text-center mt-16 animate-fade-in-up" style={{ animationDelay: "1.2s" }}>
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-3xl p-12 text-white">
              <HeartIcon className="w-12 h-12 mx-auto mb-6 animate-heartbeat" />
              <h3 className="font-playfair text-2xl font-bold mb-4">Cerita Berlanjut...</h3>
              <p className="text-lg opacity-90 max-w-2xl mx-auto text-pretty">
                Ini bukan akhir dari cerita kami, melainkan awal dari bab-bab baru yang akan kita tulis bersama. Dengan
                cinta yang semakin dalam dan mimpi yang semakin besar.
              </p>
            </div>
          </div> */}
        </div>
      </div>

      <Footer />
    </main>
  )
}
