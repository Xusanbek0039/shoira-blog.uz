"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, XCircle } from "lucide-react"

export default function ApiStatus() {
  const [status, setStatus] = useState<"loading" | "online" | "offline">("loading")
  const [error, setError] = useState<string | null>(null)
  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        console.log("Checking API connection to:", apiUrl)
        // First try the root endpoint
        await axios.get(`${apiUrl}`)
        setStatus("online")
        setError(null)
      } catch (rootError) {
        try {
          // If root fails, try the health endpoint
          await axios.get(`${apiUrl}/api/health`)
          setStatus("online")
          setError(null)
        } catch (healthError) {
          console.error("API connection failed:", healthError)
          setStatus("offline")
          setError(`Could not connect to API server (${apiUrl}). Please try again later.`)
        }
      }
    }

    checkApiStatus()

    // Check every 30 seconds
    const interval = setInterval(checkApiStatus, 30000)

    return () => clearInterval(interval)
  }, [apiUrl])

  if (status === "loading") return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {status === "online" ? (
        <Alert className="bg-green-100 dark:bg-green-900/20">
          <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertDescription className="text-sm">Contacted the site.</AlertDescription>
        </Alert>
      ) : (
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertDescription className="text-sm">{error || "Could not connect to API server."}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}
