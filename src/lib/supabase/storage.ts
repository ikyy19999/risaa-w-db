// lib/supabase/storage.ts
import { createClient } from "./server"

export async function uploadToStorage(bucket: string, path: string, file: File) {
  const supabase = await createClient()

  const { data, error } = await supabase.storage.from(bucket).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  })

  if (error) {
    throw new Error(`Upload failed: ${error.message}`)
  }

  return data
}

export async function getPublicUrl(bucket: string, path: string) {
  const supabase = await createClient()

  const { data } = supabase.storage.from(bucket).getPublicUrl(path)

  return data.publicUrl
}

export async function deleteFromStorage(bucket: string, path: string) {
  const supabase = await createClient()

  const { error } = await supabase.storage.from(bucket).remove([path])

  if (error) {
    throw new Error(`Delete failed: ${error.message}`)
  }
}