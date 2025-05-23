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
import { getUserPortfolioItems, deletePortfolio } from "@/utils/api"
import { formatDate } from "@/utils/format-date"
import { useLanguage } from "@/context/language-context"
import TypingDotsLoader from "@/components/typing-dots-loader"

interface PortfolioItem {
  _id: string
  title: string
  content: string
  image: string
  category: string
  author: string
  createdAt: string
}

export default function UserPortfolio() {
  const { t } = useLanguage()
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deleteSuccess, setDeleteSuccess] = useState(false)

  useEffect(() => {
    const fetchUserPortfolioItems = async () => {
      try {
        const data = await getUserPortfolioItems()
        setPortfolioItems(data)
      } catch (err: any) {
        setError(err.message || t("portfolio.loadError"))
      } finally {
        setLoading(false)
      }
    }

    fetchUserPortfolioItems()
  }, [t])

  const handleDeleteClick = (id: string) => {
    setDeleteId(id)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!deleteId) return

    try {
      await deletePortfolio(deleteId)
      setPortfolioItems((prev) => prev.filter((item) => item._id !== deleteId))
      setDeleteSuccess(true)
      setTimeout(() => setDeleteSuccess(false), 3000)
    } catch (err: any) {
      setError(err.message || t("portfolio.deleteError"))
    } finally {
      setDeleteDialogOpen(false)
      setDeleteId(null)
    }
  }

  const getCategoryName = (category: string) => {
    switch (category) {
      case "web":
        return t("portfolio.categoryWeb")
      case "mobile":
        return t("portfolio.categoryMobile")
      case "design":
        return t("portfolio.categoryDesign")
      default:
        return category
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
          <AlertDescription>{t("portfolio.deleteSuccess")}</AlertDescription>
        </Alert>
      )}

      <div className="mb-4 flex justify-between">
        <h2 className="text-xl font-bold">{t("portfolio.myItems")}</h2>
        <Link href="/create-portfolio">
          <Button size="sm">{t("portfolio.newItem")}</Button>
        </Link>
      </div>



      {portfolioItems.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <p className="text-muted-foreground">{t("portfolio.noItemsYet")}</p>
          <Link href="/create-portfolio" className="mt-4 inline-block">
            <Button>{t("portfolio.createItem")}</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {portfolioItems.map((item) => (
            <div
              key={item._id}
              className="flex flex-col justify-between rounded-lg border p-4 sm:flex-row sm:items-center"
            >
              <div className="mb-4 sm:mb-0">
                <h3 className="font-medium">{item.title}</h3>
                <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                  <span>{formatDate(item.createdAt)}</span>
                  <span>•</span>
                  <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium">
                    {getCategoryName(item.category)}
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <Link href={`/edit-portfolio/${item._id}`}>
                  <Button variant="outline" size="sm">
                    <Edit className="mr-1 h-4 w-4" />
                    {t("portfolio.edit")}
                  </Button>
                </Link>
                <Button variant="destructive" size="sm" onClick={() => handleDeleteClick(item._id)}>
                  <Trash2 className="mr-1 h-4 w-4" />
                  {t("portfolio.delete")}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("portfolio.deleteItem")}</AlertDialogTitle>
            <AlertDialogDescription>{t("portfolio.deleteConfirmation")}</AlertDialogDescription>
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
