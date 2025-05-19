"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { BookOpen } from "lucide-react"
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
        <h1 className="mb-4 text-3xl font-bold md:text-4xl">Articles</h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          The latest and most interesting collection of articles. About web development, design, and technology.
        </p>
      </motion.div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            <BookOpen className="h-16 w-16 text-primary" />
          </motion.div>
          <motion.p
            className="mt-4 text-lg font-medium text-muted-foreground"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            Loading articles...
          </motion.p>
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
