// src/app/api/auth/login/route.ts
import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { verifyPassword } from "@/lib/auth/password"
import { createSession, setSessionCookie } from "@/lib/auth/session"

// buat client server-side pakai service role key
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "email dan password diperlukan" }, { status: 400 })
    }

    // ambil data admin dari tabel AdminUser
    const { data: admin, error } = await supabase
      .from("AdminUser")  // nama tabel sesuai di supabase
      .select("*")
      .eq("email", email) // nama kolom sesuai
      .single()

    if (error || !admin) {
      return NextResponse.json({ error: "email atau password salah" }, { status: 401 })
    }

    // cek password
    const isPasswordValid = await verifyPassword(password, admin.passwordHash) // field sesuai kolom
    if (!isPasswordValid) {
      return NextResponse.json({ error: "email atau password salah" }, { status: 401 })
    }

    // buat session
    const token = await createSession({
      adminId: admin.id,
      email: admin.email,
      name: admin.name,
    })

    // set session cookie
    await setSessionCookie(token)

    return NextResponse.json({ success: true, message: "login berhasil" }, { status: 200 })
  } catch (error) {
    console.error("login error:", error)
    return NextResponse.json({ error: "terjadi kesalahan saat login" }, { status: 500 })
  }
}
