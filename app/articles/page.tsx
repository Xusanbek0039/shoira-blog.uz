"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import ArticleCard from "@/components/article-card"
import { fetchArticles } from "@/utils/api"
import type { Article } from "@/types"

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getArticles = async () => {
      try {
        const data = await fetchArticles()
        setArticles(data)
      } catch (error) {
        console.error("Error fetching articles:", error)
      } finally {
        setLoading(false)
      }
    }

    getArticles()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        className="mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-4 text-3xl font-bold md:text-4xl">Maqolalar</h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Eng so'nggi va qiziqarli maqolalar to'plami. Web dasturlash, dizayn va texnologiyalar haqida.
        </p>
      </motion.div>

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-[350px] animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      ) : (
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {articles.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </motion.div>
      )}
    </div>
  )
}
