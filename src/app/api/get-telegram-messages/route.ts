import { type NextRequest, NextResponse } from "next/server"

const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN
const TELEGRAM_CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID

interface TelegramMessage {
  message_id: number
  from: {
    id: number
    first_name: string
    last_name?: string
    username?: string
  }
  date: number
  text?: string
  audio?: {
    file_id: string
    duration: number
    file_size?: number
  }
}

interface TelegramUpdate {
  update_id: number
  message?: TelegramMessage
}

async function getTelegramMessages(): Promise<TelegramMessage[]> {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    throw new Error("Telegram configuration missing")
  }

  const baseUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`

  try {
    // Get recent updates
    const response = await fetch(`${baseUrl}/getUpdates?limit=50`, {
      method: "GET",
    })

    const result = await response.json()

    if (!result.ok) {
      throw new Error(result.description || "Failed to get messages")
    }

    // Filter messages from the specific chat and from users (not bot)
    const messages = result.result
      .filter(
        (update: TelegramUpdate) =>
          update.message &&
          update.message.from.id.toString() !== TELEGRAM_BOT_TOKEN?.split(":")[0] &&
          update.message.text &&
          !update.message.text.startsWith("💕 Love Note Baru!"),
      )
      .map((update: TelegramUpdate) => update.message!)
      .reverse() // Show newest first

    return messages
  } catch (error) {
    console.error("Failed to get Telegram messages:", error)
    throw error
  }
}

export async function GET(request: NextRequest) {
  try {
    const messages = await getTelegramMessages()

    // Transform messages to our format
    const formattedMessages = messages.map((msg, index) => ({
      id: msg.message_id,
      sender: `${msg.from.first_name} ${msg.from.last_name || ""}`.trim(),
      message: msg.text || "Voice message",
      date: new Date(msg.date * 1000).toISOString().split("T")[0],
      relationship: "Teman", // Default category, could be enhanced with user mapping
    }))

    return NextResponse.json({
      success: true,
      messages: formattedMessages,
    })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json(
      {
        error: "Gagal mengambil pesan",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
