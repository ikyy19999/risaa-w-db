import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TimelineIcon } from "./icons/timeline-icon"
import { GalleryIcon } from "./icons/gallery-icon"
import { LockIcon } from "./icons/lock-icon"
import { MusicIcon } from "./icons/music-icon"
import { NoteIcon } from "./icons/note-icon"
import { HeartIcon } from "./icons/heart-icon"
import { ScrollReveal } from "./scroll-reveal"

const features = [
  {
    icon: TimelineIcon,
    title: "Moments in Time",
    description: "A timeline of the moments that define our journey together.",
    href: "/timeline",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: GalleryIcon,
    title: "Memories in Frames",
    description: "A collection of the most beautiful photos and videos from each precious moment.",
    href: "/gallery",
    color: "from-purple-500 to-violet-500",
  },
  {
    icon: LockIcon,
    title: "Secret Box",
    description: "A secret room where only our deepest feelings belong.",
    href: "/secret-box",
    color: "from-indigo-500 to-blue-500",
  },
  {
    icon: MusicIcon,
    title: "Our Playlist",
    description: "The soundtrack of our hearts.",
    href: "/playlist",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: NoteIcon,
    title: "Love Notes",
    description: "Capture your wishes and love for Rizky & Salma as a timeless keepsake.",
    href: "/note",
    color: "from-orange-500 to-amber-500",
  },
  {
    icon: HeartIcon,
    title: "Love Facts",
    description: "Little Things That Make Us… Us",
    href: "/love-facts",
    color: "from-red-500 to-pink-500",
  },
]

export function FeaturesPreview() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50/50 to-purple-50/50"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <ScrollReveal direction="up" delay={100}>
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              A Glimpse Into{" "}
              <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                Our Story
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto text-pretty">
              Every part of this website holds stories, memories, and special moments we have shared together.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <ScrollReveal key={feature.href} direction="up" delay={index * 100 + 200}>
              <Link
                href={feature.href}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-pink-200 hover-lift block"
              >
                <div
                  className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="font-playfair text-xl font-semibold text-gray-900 mb-3 group-hover:text-pink-600 transition-colors">
                  {feature.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed mb-6">{feature.description}</p>

                <Button
                  variant="ghost"
                  className="text-pink-500 hover:text-pink-600 hover:bg-pink-50 p-0 h-auto font-medium group-hover:translate-x-1 transition-transform duration-200"
                >
                  Explore →
                </Button>

                {/* Decorative gradient border on hover */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`}
                />

                {/* Sparkle effect on hover */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 animate-sparkle transition-opacity duration-300"></div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
