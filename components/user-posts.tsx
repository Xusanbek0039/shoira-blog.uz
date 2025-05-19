"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { getUserArticles, deleteArticle } from "@/utils/api"
import { formatDate } from "@/utils/format-date"
import type { Article } from "@/types"
import { useLanguage } from "@/context/language-context"
import TypingDotsLoader from "@/components/typing-dots-loader"

export default function UserPosts() {
  const { t } = useLanguage()
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deleteSuccess, setDeleteSuccess] = useState(false)

  useEffect(() => {
    const fetchUserArticles = async () => {
      try {
        const data = await getUserArticles()
        setArticles(data)
      } catch (err: any) {
        setError(err.message || t("articles.loadError"))
      } finally {
        setLoading(false)
      }
    }

    fetchUserArticles()
  }, [t])

  const handleDeleteClick = (id: string) => {
    setDeleteId(id)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!deleteId) return

    try {
      await deleteArticle(deleteId)
      setArticles((prev) => prev.filter((article) => article._id !== deleteId))
      setDeleteSuccess(true)
      setTimeout(() => setDeleteSuccess(false), 3000)
    } catch (err: any) {
      setError(err.message || t("articles.deleteError"))
    } finally {
      setDeleteDialogOpen(false)
      setDeleteId(null)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <TypingDotsLoader size="lg" />
      </div>
    )
  }

  return (
    <div>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {deleteSuccess && (
        <Alert className="mb-4">
          <AlertDescription>{t("articles.deleteSuccess")}</AlertDescription>
        </Alert>
      )}

      <div className="mb-4 flex justify-between">
        <h2 className="text-xl font-bold">{t("articles.myArticles")}</h2>
        <Link href="/create">
          <Button size="sm">{t("articles.newArticle")}</Button>
        </Link>
      </div>

      {articles.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <p className="text-muted-foreground">{t("articles.noArticlesYet")}</p>
          <Link href="/create" className="mt-4 inline-block">
            <Button>{t("articles.createArticle")}</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {articles.map((article) => (
            <div
              key={article._id}
              className="flex flex-col justify-between rounded-lg border p-4 sm:flex-row sm:items-center"
            >
              <div className="mb-4 sm:mb-0">
                <h3 className="font-medium">{article.title}</h3>
                <p className="text-sm text-muted-foreground">{formatDate(article.createdAt)}</p>
              </div>
              <div className="flex space-x-2">
                <Link href={`/edit/${article._id}`}>
                  <Button variant="outline" size="sm">
                    <Edit className="mr-1 h-4 w-4" />
                    {t("articles.edit")}
                  </Button>
                </Link>
                <Button variant="destructive" size="sm" onClick={() => handleDeleteClick(article._id)}>
                  <Trash2 className="mr-1 h-4 w-4" />
                  {t("articles.delete")}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("articles.deleteArticle")}</AlertDialogTitle>
            <AlertDialogDescription>{t("articles.deleteConfirmation")}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>{t("common.delete")}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
