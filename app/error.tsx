"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { XCircle } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="container flex min-h-[calc(100vh-200px)] items-center justify-center px-4 py-12">
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center text-xl text-red-600">
            <XCircle className="mr-2 h-5 w-5" />
            Xatolik yuz berdi
          </CardTitle>
          <CardDescription>
            Ilovada kutilmagan xatolik yuz berdi. Iltimos, sahifani yangilang yoki keyinroq qayta urinib ko'ring.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/10">
            <p className="text-sm text-red-800 dark:text-red-200">{error?.message || "Noma'lum xatolik"}</p>
            {error.digest && <p className="mt-2 text-xs text-red-600 dark:text-red-400">Xatolik ID: {error.digest}</p>}
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button onClick={() => reset()} className="flex-1">
            Qayta urinish
          </Button>
          <Button onClick={() => window.location.reload()} variant="outline" className="flex-1">
            Sahifani yangilash
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
