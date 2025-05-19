"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, XCircle } from "lucide-react"

export default function ApiStatus() {
  const [status, setStatus] = useState<"loading" | "online" | "offline">("loading")
  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        await axios.get(`${apiUrl}/api/health`)
        setStatus("online")
      } catch (error) {
        setStatus("offline")
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
          <AlertDescription className="text-sm">You are connected to the site.</AlertDescription>
        </Alert>
      ) : (
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertDescription className="text-sm">Unable to connect to the site.</AlertDescription>
        </Alert>
      )}
    </div>
  )
}
