"use client"

import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import ArticleCard from "@/components/article-card"
import ArticleSearch from "@/components/article-search"
import { fetchArticles } from "@/utils/api"
import type { Article } from "@/types"
import { useLanguage } from "@/context/language-context"
import TypingDotsLoader from "@/components/typing-dots-loader"

export default function ArticlesPage() {
  const { t } = useLanguage()
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<string>("date")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [selectedTags, setSelectedTags] = useState<string[]>([])

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

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleSort = (newSortBy: string, direction: "asc" | "desc") => {
    setSortBy(newSortBy)
    setSortDirection(direction)
  }

  const handleFilter = (filters: any) => {
    setSelectedTags(filters.tags || [])
  }

  const filteredArticles = useMemo(() => {
    return articles
      .filter((article) => {
        // Search filter
        if (searchQuery) {
          const query = searchQuery.toLowerCase()
          return (
            article.title.toLowerCase().includes(query) ||
            article.content.toLowerCase().includes(query) ||
            article.author.toLowerCase().includes(query)
          )
        }
        return true
      })
      .sort((a, b) => {
        // Sorting
        if (sortBy === "date") {
          return sortDirection === "asc"
            ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        } else if (sortBy === "title") {
          return sortDirection === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
        }
        // Default sort by date
        return sortDirection === "asc"
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      })
  }, [articles, searchQuery, sortBy, sortDirection, selectedTags])

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
        className="mb-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-4 text-3xl font-bold md:text-4xl">{t("nav.articles")}</h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">{t("articles.description")}</p>
      </motion.div>

      <ArticleSearch onSearch={handleSearch} onSort={handleSort} onFilter={handleFilter} />

      {loading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <TypingDotsLoader size="lg" />
        </div>
      ) : filteredArticles.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-lg text-muted-foreground">
            {searchQuery ? t("search.noResults") : t("articles.noArticles")}
          </p>
        </div>
      ) : (
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredArticles.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </motion.div>
      )}
    </div>
  )
}
