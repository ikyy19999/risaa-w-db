import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const TELEGRAM_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN!;
  const TELEGRAM_CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID!;

  try {
    const body = await req.json();
    const { event, visitor, message } = body;

    // Format pesan untuk Telegram
    const text = `
📩 *New Chat from Tawk.to*
👤 Name: ${visitor?.name || "Anonymous"}
💬 Message: ${message?.text || "(no message)"}
🔗 Event: ${event || "unknown"}
`;

    // Kirim ke Telegram
    const telegramRes = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text,
          parse_mode: "Markdown",
        }),
      }
    );

    if (!telegramRes.ok) {
      console.error("Failed to send message to Telegram");
      return NextResponse.json({ error: "Failed to send Telegram message" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Webhook Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
