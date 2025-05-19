"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/context/auth-context"
import { fetchArticleById, updateArticle } from "@/utils/api"
import type { Article } from "@/types"
import { useLanguage } from "@/context/language-context"
import TypingDotsLoader from "@/components/typing-dots-loader"

export default function EditArticlePage() {
  const { id } = useParams()
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const { t } = useLanguage()
  const [article, setArticle] = useState<Article | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    const getArticle = async () => {
      try {
        const data = await fetchArticleById(id as string)
        setArticle(data)
        setFormData({
          title: data.title,
          content: data.content,
          image: data.image || "",
        })
      } catch (error) {
        console.error("Error fetching article:", error)
        setError(t("articles.loadError"))
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      getArticle()
    }
  }, [id, isAuthenticated, router, t])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)
    setSaving(true)

    try {
      await updateArticle(id as string, formData)
      setSuccess(true)
      // Redirect after 2 seconds
      setTimeout(() => {
        router.push("/profile")
      }, 2000)
    } catch (err: any) {
      setError(err.message || t("articles.updateError"))
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="container flex h-[calc(100vh-200px)] items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <TypingDotsLoader size="lg" />
        </div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-2xl font-bold">{t("articles.notFound")}</h1>
          <Button className="mt-4" onClick={() => router.push("/profile")}>
            {t("profile.backToProfile")}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container px-4 py-12">
      <motion.div
        className="mx-auto max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{t("articles.editArticle")}</CardTitle>
            <CardDescription>{t("articles.editDescription")}</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="mb-4">
                <AlertDescription>{t("articles.updateSuccess")}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">{t("articles.title")}</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder={t("articles.titlePlaceholder")}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">{t("articles.imageUrl")}</Label>
                <Input
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder={t("articles.imagePlaceholder")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">{t("articles.content")}</Label>
                <Textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder={t("articles.contentPlaceholder")}
                  className="min-h-[200px]"
                  required
                />
              </div>
              <div className="flex space-x-2">
                <Button type="submit" disabled={saving}>
                  {saving ? t("common.saving") : t("common.save")}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.push("/profile")}>
                  {t("common.cancel")}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
