"use client"
import { useEffect } from "react"

export default function DisableInspect() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12
      if (e.key === "F12") e.preventDefault()
      // Ctrl+Shift+I / Cmd+Option+I
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "i") e.preventDefault()
      // Ctrl+Shift+J / Cmd+Option+J
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "j") e.preventDefault()
      // Ctrl+U / Cmd+U (view source)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "u") e.preventDefault()
      // Ctrl+S / Cmd+S (save page)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") e.preventDefault()
    }

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault() // nonaktif klik kanan
    }

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("contextmenu", handleContextMenu)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("contextmenu", handleContextMenu)
    }
  }, [])

  return null
}
