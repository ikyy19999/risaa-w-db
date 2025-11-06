// lib/auth/session.ts
import { jwtVerify, SignJWT, JWTPayload } from "jose"
import { cookies } from "next/headers"

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key-change-this-in-production")

export interface SessionPayload extends JWTPayload {
  adminId: string
  email: string
  name: string
}

export async function createSession(payload: SessionPayload): Promise<string> {
  const token = await new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setExpirationTime("24h").sign(secret)
  return token
}

export async function verifySession(token: string): Promise<SessionPayload | null> {
  try {
    const verified = await jwtVerify(token, secret)
    return verified.payload as unknown as SessionPayload
  } catch (error) {
    return null
  }
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get("admin_session")?.value

  if (!token) return null

  return verifySession(token)
}

export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set("admin_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 86400, // 24 hours
    path: "/",
  })
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete("admin_session")
}