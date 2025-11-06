import { type NextRequest, NextResponse } from "next/server"

const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN
const TELEGRAM_CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID

const YOUR_TELEGRAM_USERNAME = process.env.NEXT_PUBLIC_YOUR_TELEGRAM_USERNAME
const PARTNER_TELEGRAM_USERNAME = process.env.NEXT_PUBLIC_PARTNER_TELEGRAM_USERNAME

interface TelegramResponse {
  ok: boolean
  result?: any
  description?: string
}

async function sendToTelegram(text: string, audioFile?: File): Promise<TelegramResponse> {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    throw new Error("Telegram configuration missing")
  }

  const baseUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`

  try {
    // Send text message first
    const textResponse = await fetch(`${baseUrl}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: `New Note!\n\n${text}`,
        parse_mode: "HTML",
      }),
    })

    const textResult = await textResponse.json()

    // Send audio file if provided
    if (audioFile) {
      const formData = new FormData()
      formData.append("chat_id", TELEGRAM_CHAT_ID)
      formData.append("audio", audioFile)
      formData.append("caption", "🎵 Voice Note from Love Journey Website")

      const audioResponse = await fetch(`${baseUrl}/sendAudio`, {
        method: "POST",
        body: formData,
      })

      const audioResult = await audioResponse.json()

      if (!audioResult.ok) {
        console.error("Failed to send audio:", audioResult)
      }
    }

    return textResult
  } catch (error) {
    console.error("Telegram API error:", error)
    throw error
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const text = formData.get("text") as string
    const mediaLinks = formData.get("mediaLinks") as string
    const senderName = formData.get("senderName") as string
    const isAnonymous = formData.get("isAnonymous") === "true"
    const audioFile = formData.get("audio") as File | null

    if (!text && !audioFile) {
      return NextResponse.json({ error: "Text or audio is required" }, { status: 400 })
    }

    let messageText = `Hello! 🚀 @${YOUR_TELEGRAM_USERNAME} @${PARTNER_TELEGRAM_USERNAME} a fresh message just landed!\n\n`
    messageText += `👤 From: ${senderName}${isAnonymous ? " (Anonymous in website)" : ""}\n\n`
    messageText += text || "Voice Note Only"

    if (mediaLinks) {
      messageText += `\n\n🔗 Media Resources:\n${mediaLinks}`
    }

    messageText += `\n\n📅 Sent at: ${new Date().toLocaleString("id-ID", {
      timeZone: "Asia/Jakarta",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })}`

    // Send to Telegram
    const result = await sendToTelegram(messageText, audioFile || undefined)

    if (result.ok) {
      return NextResponse.json({
        success: true,
        message: "Love note successfully sent to Telegram!",
      })
    } else {
      throw new Error(result.description || "Failed to send to Telegram")
    }
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json(
      {
        error: "Failed to send message",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
