interface TelegramConfig {
  botToken: string
  chatId: string
  webhookUrl?: string
}

class TelegramService {
  private config: TelegramConfig

  constructor(config: TelegramConfig) {
    this.config = config
  }

  private get baseUrl() {
    return `https://api.telegram.org/bot${this.config.botToken}`
  }

  async sendMessage(
    text: string,
    options?: {
      parseMode?: "HTML" | "Markdown"
      disableWebPagePreview?: boolean
    },
  ) {
    try {
      const response = await fetch(`${this.baseUrl}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: this.config.chatId,
          text,
          parse_mode: options?.parseMode || "HTML",
          disable_web_page_preview: options?.disableWebPagePreview || false,
        }),
      })

      const result = await response.json()

      if (!result.ok) {
        throw new Error(result.description || "Failed to send message")
      }

      return result
    } catch (error) {
      console.error("Telegram sendMessage error:", error)
      throw error
    }
  }

  async sendAudio(audioFile: File, caption?: string) {
    try {
      const formData = new FormData()
      formData.append("chat_id", this.config.chatId)
      formData.append("audio", audioFile)

      if (caption) {
        formData.append("caption", caption)
      }

      const response = await fetch(`${this.baseUrl}/sendAudio`, {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (!result.ok) {
        throw new Error(result.description || "Failed to send audio")
      }

      return result
    } catch (error) {
      console.error("Telegram sendAudio error:", error)
      throw error
    }
  }

  async setWebhook(webhookUrl: string, secretToken?: string) {
    try {
      const params = new URLSearchParams({
        url: webhookUrl,
      })

      if (secretToken) {
        params.append("secret_token", secretToken)
      }

      const response = await fetch(`${this.baseUrl}/setWebhook?${params}`, {
        method: "POST",
      })

      const result = await response.json()

      if (!result.ok) {
        throw new Error(result.description || "Failed to set webhook")
      }

      return result
    } catch (error) {
      console.error("Telegram setWebhook error:", error)
      throw error
    }
  }

  async getUpdates(offset?: number, limit?: number) {
    try {
      const params = new URLSearchParams()

      if (offset) params.append("offset", offset.toString())
      if (limit) params.append("limit", limit.toString())

      const response = await fetch(`${this.baseUrl}/getUpdates?${params}`)
      const result = await response.json()

      if (!result.ok) {
        throw new Error(result.description || "Failed to get updates")
      }

      return result.result
    } catch (error) {
      console.error("Telegram getUpdates error:", error)
      throw error
    }
  }
}

// Export singleton instance
export const telegramService = new TelegramService({
  botToken: process.env.TELEGRAM_BOT_TOKEN || "",
  chatId: process.env.TELEGRAM_CHAT_ID || "",
  webhookUrl: process.env.TELEGRAM_WEBHOOK_URL,
})

export default TelegramService