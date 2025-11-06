import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: Request) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")

    let query = supabase.from("gallery_items").select("category, sub_category")

    if (category) {
      query = query.eq("category", category)
    }

    const { data, error } = await query

    if (error) {
      console.error("[v0] Stats error:", error)
      return NextResponse.json({ error: "Gagal mengambil statistik" }, { status: 500 })
    }

    // Group by subcategory and count
    const stats: Record<string, number> = {}
    data?.forEach((item: any) => {
      const key = item.sub_category
      stats[key] = (stats[key] || 0) + 1
    })

    return NextResponse.json(stats, { status: 200 })
  } catch (error) {
    console.error("[v0] Stats error:", error)
    return NextResponse.json({ error: "Terjadi kesalahan" }, { status: 500 })
  }
}
