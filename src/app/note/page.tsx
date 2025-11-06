"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Navbar } from "../components/navbar"
import { NoteIcon } from "../components/icons/note-icon"
import { HeartIcon } from "../components/icons/heart-icon"
import { Footer } from "../components/footer"

export default function NotePage() {
  const [isRecording, setIsRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [noteText, setNoteText] = useState("")
  const [mediaLinks, setMediaLinks] = useState("")
  const [senderName, setSenderName] = useState("")
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" })
        setAudioBlob(audioBlob)
        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (error) {
      console.error("Error accessing microphone:", error)
      alert("Microphone access denied. Please allow permission.")
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const clearRecording = () => {
    setAudioBlob(null)
    audioChunksRef.current = []
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append("text", noteText)
      formData.append("mediaLinks", mediaLinks)
      formData.append("senderName", senderName)
      formData.append("isAnonymous", isAnonymous.toString())

      if (audioBlob) {
        formData.append("audio", audioBlob, "voice-note.wav")
      }

      const response = await fetch("/api/send-to-telegram", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        setSubmitSuccess(true)
        setNoteText("")
        setMediaLinks("")
        setSenderName("")
        setIsAnonymous(false)
        setAudioBlob(null)

        setTimeout(() => {
          setSubmitSuccess(false)
        }, 3000)
      } else {
        throw new Error("Failed to send message")
      }
    } catch (error) {
      console.error("Error sending message:", error)
      alert("Sending failed. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const getDisplayName = () => {
    if (!senderName.trim()) return ""
    if (isAnonymous) {
      return "*".repeat(senderName.length)
    }
    return senderName
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <Navbar />

      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center py-16">
          <NoteIcon className="w-16 h-16 text-pink-500 mx-auto mb-6 animate-heartbeat" />
          <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Love{" "}
            <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">Notes</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto text-pretty">
            Write a message or record a voice note to save for the future
          </p>
        </div>

        {/* Note Form */}
        <div className="max-w-2xl mx-auto pb-20">
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-lg p-8 space-y-8">
            {/* Name Input Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Your Name</label>
              <div className="space-y-3">
                <Input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Enter your name..."
                  className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:border-pink-500"
                  required
                />
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="anonymous"
                    checked={isAnonymous}
                    onCheckedChange={(checked) => setIsAnonymous(checked as boolean)}
                    className="border-pink-300 data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500"
                  />
                  <label htmlFor="anonymous" className="text-sm text-gray-600 cursor-pointer">
                    Send as anonymous
                  </label>
                </div>
                {senderName && (
                  <div className="text-xs text-gray-500 bg-gray-50 rounded-lg p-3">
                    <span className="font-medium">Preview name: </span>
                    <span className="font-mono">{getDisplayName() || "No name"}</span>
                    {/* {isAnonymous && (
                      <div className="text-pink-600 mt-1">
                        * Real name will still be sent to Telegram for identification
                      </div>
                    )} */}
                  </div>
                )}
              </div>
            </div>

            {/* Text Note */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Your Message</label>
              <Textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Write a love note, memory, or anything you want to convey..."
                rows={6}
                className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:border-pink-500 focus:ring-0 resize-none"
                required
              />
            </div>

            {/* Media Links */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Media Links (Optional)</label>
              <Input
                type="url"
                value={mediaLinks}
                onChange={(e) => setMediaLinks(e.target.value)}
                placeholder="https://tiktok.com/@username or https://instagram.com/p/..."
                className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:border-pink-500"
              />
              <p className="text-xs text-gray-500 mt-2">
                You can add TikTok, Instagram, or other media links
              </p>
            </div>

            {/* Voice Note */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Voice Note (Optional)</label>

              <div className="border-2 border-dashed border-pink-200 rounded-xl p-6 text-center">
                {!audioBlob ? (
                  <div>
                    <div className="mb-4">
                      <div
                        className={`inline-flex p-4 rounded-full ${isRecording ? "bg-red-500 animate-pulse" : "bg-gradient-to-r from-pink-500 to-purple-600"}`}
                      >
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z" />
                        </svg>
                      </div>
                    </div>

                    {isRecording ? (
                      <div>
                        <p className="text-red-600 font-medium mb-4">Recording in progress…</p>
                        <Button
                          type="button"
                          onClick={stopRecording}
                          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full"
                        >
                          Stop Recording
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <p className="text-gray-600 mb-4">Record a voice message for a more personal touch</p>
                        <Button
                          type="button"
                          onClick={startRecording}
                          className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-6 py-2 rounded-full"
                        >
                          Start Recording
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <div className="mb-4">
                      <div className="inline-flex p-4 rounded-full bg-green-500">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-green-600 font-medium mb-4">Voice note recorded successfully!</p>
                    <div className="flex justify-center space-x-4">
                      <audio controls className="mb-4">
                        <source src={URL.createObjectURL(audioBlob)} type="audio/wav" />
                        Your browser does not support the audio player.
                      </audio>
                    </div>
                    <Button
                      type="button"
                      onClick={clearRecording}
                      variant="outline"
                      className="border-pink-300 text-pink-600 hover:bg-pink-50 bg-transparent"
                    >
                      Record Again
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <Button
                type="submit"
                disabled={isSubmitting || (!noteText.trim() && !audioBlob) || !senderName.trim()}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-12 py-3 rounded-full font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    <span>Sending...</span>
                  </div>
                ) : (
                  "Send"
                )}
              </Button>
            </div>

            {/* Success Message */}
            {submitSuccess && (
              <div className="text-center animate-fade-in-up">
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <HeartIcon className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <p className="text-green-700 font-medium">Love note sent successfully!</p>
                  <p className="text-green-600 text-sm">Your message has been saved for future memories</p>
                </div>
              </div>
            )}
          </form>

          {/* Info Box */}
          {/* <div className="mt-8 bg-pink-50 rounded-2xl p-6 border border-pink-100">
            <h3 className="font-playfair text-lg font-bold text-pink-800 mb-3">Tentang Love Notes</h3>
            <ul className="text-sm text-pink-700 space-y-2">
              <li>• Semua pesan akan dikirim ke bot Telegram pribadi kami</li>
              <li>• Voice note akan disimpan sebagai file audio</li>
              <li>• Link media akan otomatis diparse dan ditampilkan</li>
              <li>• Opsi anonim hanya menyensor nama di tampilan, nama asli tetap dikirim untuk identifikasi</li>
              <li>• Semua love notes akan menjadi kenangan indah untuk masa depan</li>
            </ul>
          </div> */}
        </div>
      </div>
      <Footer />
    </main>
  )
}
