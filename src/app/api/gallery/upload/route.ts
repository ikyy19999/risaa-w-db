// app/api/gallery/upload/route.ts
import { prisma } from "@/lib/prisma"
import { createClient } from "@/lib/supabase/server"
import { uploadToStorage, getPublicUrl } from "@/lib/supabase/storage"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const category = formData.get("category") as string
    const sub_category = formData.get("sub_category") as string

    console.log("Upload data:", { 
      title, 
      category, 
      sub_category, 
      fileName: file?.name,
      fileType: file?.type,
      fileSize: file?.size
    })

    // Validasi required fields
    if (!file || !title || !category || !sub_category) {
      return NextResponse.json(
        { error: "Missing required fields: file, title, category, sub_category" }, 
        { status: 400 }
      )
    }

    // Validasi file size (max 50MB)
    const maxSize = 50 * 1024 * 1024 // 50MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File size too large. Maximum 50MB" }, 
        { status: 400 }
      )
    }

    // Tentukan media type
    const mediaType = file.type.startsWith("video") ? "video" : "image"
    console.log("Detected media type:", mediaType)

    // Upload file ke Supabase storage
    const timestamp = Date.now()
    const fileExtension = file.name.split('.').pop()
    const filename = `${timestamp}-${Math.random().toString(36).substring(2)}.${fileExtension}`
    const storagePath = `${mediaType}s/${filename}`

    console.log("Uploading to storage path:", storagePath)

    const supabase = await createClient()
    const result = await uploadToStorage("journey", storagePath, file)
    
    if (!result) {
      return NextResponse.json(
        { error: "Failed to upload file to storage" }, 
        { status: 500 }
      )
    }

    const fileUrl = await getPublicUrl("journey", storagePath)
    console.log("File uploaded successfully. URL:", fileUrl)

    // Simpan metadata ke database
    const galleryItem = await prisma.galleryItem.create({
      data: {
        title,
        description: description || "",
        category,
        subcategory: sub_category,
        imageUrl: fileUrl,
        storagePath,
        mediaType,
      }
    })

    console.log("Database record created:", galleryItem.id)

    return NextResponse.json(galleryItem, { status: 201 })

  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json(
      { error: "Upload failed: " + (error instanceof Error ? error.message : "Unknown error") }, 
      { status: 500 }
    )
  }
}