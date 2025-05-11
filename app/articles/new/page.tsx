"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/hooks/use-auth"
import { Upload, Check } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function NewArticlePage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const router = useRouter()
  const { user, isLoading: authLoading } = useAuth()

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth/login")
    }
  }, [authLoading, user, router])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    if (!title || !content) {
      setError("Iltimos, sarlavha va maqola matnini to'ldiring")
      return
    }

    if (!image && !imagePreview) {
      setError("Iltimos, maqola uchun rasm tanlang")
      return
    }

    setIsLoading(true)

    try {
      // Generate a unique ID for the new article
      const newArticleId = `user-${Date.now()}`

      // Create a new article object
      const newArticle = {
        id: newArticleId,
        title: title,
        excerpt: content.substring(0, 150) + (content.length > 150 ? "..." : ""),
        content: content,
        author: user?.name || "Foydalanuvchi",
        date: new Date().toISOString().split("T")[0],
        imageUrl: imagePreview || "/placeholder.svg?height=200&width=400",
      }

      // Get existing user articles from localStorage or initialize empty array
      const existingArticlesJSON = localStorage.getItem("userArticles")
      const existingArticles = existingArticlesJSON ? JSON.parse(existingArticlesJSON) : []

      // Add new article to the beginning of the array
      const updatedArticles = [newArticle, ...existingArticles]

      // Save updated articles to localStorage
      localStorage.setItem("userArticles", JSON.stringify(updatedArticles))

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSuccess(true)

      // Reset form after successful submission
      setTimeout(() => {
        router.push("/articles")
      }, 1500)
    } catch (err) {
      setError("Maqolani saqlashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow py-12">
        <div className="container px-4 md:px-6 max-w-4xl">
          <h1 className="text-3xl font-bold tracking-tighter mb-8 text-sky-800 dark:text-sky-300">
            Yangi maqola yaratish
          </h1>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mb-6 border-green-500 text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950/30">
              <Check className="h-4 w-4 mr-2" />
              <AlertDescription>
                Maqola muvaffaqiyatli saqlandi! Maqolalar sahifasiga yo'naltirilmoqdasiz...
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Maqola sarlavhasi</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Maqola sarlavhasini kiriting"
                required
                className="dark:bg-gray-900"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Maqola rasmi</Label>
              <div className="flex items-center gap-4">
                <Label
                  htmlFor="image"
                  className="flex items-center gap-2 px-4 py-2 border rounded-md cursor-pointer hover:bg-muted dark:hover:bg-gray-800"
                >
                  <Upload className="h-4 w-4" />
                  <span>Rasm tanlash</span>
                </Label>
                <Input id="image" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                {imagePreview && <div className="text-sm text-muted-foreground">Rasm tanlandi</div>}
              </div>
              {imagePreview && (
                <div className="mt-4 aspect-video relative rounded-[30px] overflow-hidden border border-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imagePreview || "/placeholder.svg"} alt="Preview" className="object-cover w-full h-full" />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Maqola matni</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Maqola matnini kiriting"
                className="min-h-[300px] dark:bg-gray-900"
                required
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" className="bg-sky-600 hover:bg-sky-700" disabled={isLoading}>
                {isLoading ? "Saqlanmoqda..." : "Maqolani saqlash"}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.back()} className="dark:border-gray-700">
                Bekor qilish
              </Button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </main>
  )
}
