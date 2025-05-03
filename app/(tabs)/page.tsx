"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function RedirectToFeatured() {
  const router = useRouter()
  
  useEffect(() => {
    // Redirect to featured tab
    router.push('/featured')
  }, [router])
  
  // This return is only shown while redirect is happening
  return null
} 