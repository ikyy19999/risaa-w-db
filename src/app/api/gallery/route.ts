// app/api/gallery/route.ts
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const category = url.searchParams.get("category")

    let galleryItems
    if (!category || category === "all") {
      galleryItems = await prisma.galleryItem.findMany({
        orderBy: { createdAt: "desc" },
      })
    } else {
      galleryItems = await prisma.galleryItem.findMany({
        where: { category },
        orderBy: { createdAt: "desc" },
      })
    }

    // Format response untuk include media type
    const formatted = galleryItems.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      category: item.category,
      sub_category: item.subcategory,
      image_url: item.imageUrl,
      media_type: item.mediaType, // tambahkan media type
      storage_path: item.storagePath,
      created_at: item.createdAt,
    }))

    return NextResponse.json(formatted)
  } catch (error) {
    console.error("Failed to fetch gallery:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}