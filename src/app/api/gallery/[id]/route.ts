// app/api/gallery/[id]/route.ts
import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("GalleryItem")
      .select("*")
      .eq("id", id)
      .single()

    if (error) {
      console.error("GET error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("GET catch error:", error)
    return NextResponse.json({ error: "internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params
    const supabase = await createClient()
    const body = await request.json()

    const { data, error } = await supabase
      .from("GalleryItem")
      .update(body)
      .eq("id", id)
      .select()

    if (error) {
      console.error("PUT error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data[0])
  } catch (error) {
    console.error("PUT catch error:", error)
    return NextResponse.json({ error: "internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params
    const supabase = await createClient()

    const { error } = await supabase
      .from("GalleryItem")
      .delete()
      .eq("id", id)

    if (error) {
      console.error("DELETE error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("DELETE catch error:", error)
    return NextResponse.json({ error: "internal server error" }, { status: 500 })
  }
}
