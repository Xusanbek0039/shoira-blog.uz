"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, RefreshCw } from "lucide-react"
import { checkApiConnection } from "@/utils/api"

export default function ApiStatusPage() {
  const [status, setStatus] = useState<"loading" | "online" | "offline">("loading")
  const [checking, setChecking] = useState(false)
  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  const checkStatus = async () => {
    setChecking(true)
    try {
      const isConnected = await checkApiConnection()
      setStatus(isConnected ? "online" : "offline")
    } catch (error) {
      setStatus("offline")
    } finally {
      setChecking(false)
    }
  }

  useEffect(() => {
    checkStatus()
  }, [])

  return (
    <div className="container px-4 py-12">
      <motion.div
        className="mx-auto max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">API Status</CardTitle>
            <CardDescription>Backend API serverga ulanish holati</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-medium">API URL:</span>
                <code className="rounded bg-muted px-2 py-1 text-sm">{apiUrl}</code>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Status:</span>
                {status === "loading" ? (
                  <span className="flex items-center">
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Tekshirilmoqda...
                  </span>
                ) : status === "online" ? (
                  <span className="flex items-center text-green-600">
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Online
                  </span>
                ) : (
                  <span className="flex items-center text-red-600">
                    <XCircle className="mr-2 h-4 w-4" />
                    Offline
                  </span>
                )}
              </div>
            </div>

            {status === "online" ? (
              <Alert className="bg-green-100 dark:bg-green-900/20">
                <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                <AlertDescription>
                  API serverga ulanish muvaffaqiyatli o'rnatildi. Ilova to'g'ri ishlashi uchun barcha kerakli
                  funksiyalar mavjud.
                </AlertDescription>
              </Alert>
            ) : status === "offline" ? (
              <Alert variant="destructive">
                <XCircle className="h-4 w-4" />
                <AlertDescription>
                  API serverga ulanib bo'lmadi. Iltimos, server ishlayotganini tekshiring va qayta urinib ko'ring.
                </AlertDescription>
              </Alert>
            ) : null}

            <Button
              onClick={checkStatus}
              disabled={checking}
              className="w-full"
              variant={status === "offline" ? "destructive" : "default"}
            >
              {checking ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Tekshirilmoqda...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Qayta tekshirish
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
