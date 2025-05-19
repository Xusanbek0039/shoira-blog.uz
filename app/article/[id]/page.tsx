"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { fetchArticleById } from "@/utils/api"
import type { Article } from "@/types"
import { formatDate } from "@/utils/format-date"
import ArticlePageLoading from "@/components/article-page-loading"

export default function ArticlePage() {
  const { id } = useParams()
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getArticle = async () => {
      try {
        const data = await fetchArticleById(id as string)
        setArticle(data)
      } catch (error) {
        console.error("Error fetching article:", error)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      getArticle()
    }
  }, [id])

  if (loading) {
    return <ArticlePageLoading />
  }

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-2xl font-bold">The site creator has not posted any articles yet!</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <article className="mx-auto max-w-3xl">
        <motion.h1
          className="mb-4 text-3xl font-bold md:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {article.title}
        </motion.h1>

        <motion.div
          className="mb-8 flex items-center gap-4 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <span>{article.author}</span>
          <span>•</span>
          <time dateTime={article.createdAt}>{formatDate(article.createdAt)}</time>
        </motion.div>

        <motion.div
          className="mb-8 overflow-hidden rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <img
            src={article.image || "/placeholder.svg?height=400&width=800"}
            alt={article.title}
            className="h-auto w-full object-cover"
          />
        </motion.div>

        <motion.div
          className="prose prose-lg max-w-none dark:prose-invert"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>
    </div>
  )
}
