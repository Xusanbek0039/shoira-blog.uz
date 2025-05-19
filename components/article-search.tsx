"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X, Filter, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/context/language-context"

interface ArticleSearchProps {
  onSearch: (query: string) => void
  onFilter?: (filters: any) => void
  onSort?: (sortBy: string, direction: "asc" | "desc") => void
}

export default function ArticleSearch({ onSearch, onFilter, onSort }: ArticleSearchProps) {
  const { t } = useLanguage()
  const [query, setQuery] = useState("")
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false)
  const [sortBy, setSortBy] = useState<string>("date")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  // Sample tags - in a real app, these would come from your API
  const availableTags = ["Web Development", "Design", "Technology", "Programming", "UI/UX", "Mobile"]

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearch(query)
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [query, onSearch])

  const handleSort = (newSortBy: string) => {
    const newDirection = sortBy === newSortBy && sortDirection === "desc" ? "asc" : "desc"
    setSortBy(newSortBy)
    setSortDirection(newDirection)
    if (onSort) onSort(newSortBy, newDirection)
  }

  const handleTagToggle = (tag: string) => {
    const newTags = selectedTags.includes(tag) ? selectedTags.filter((t) => t !== tag) : [...selectedTags, tag]

    setSelectedTags(newTags)
    if (onFilter) onFilter({ tags: newTags })
  }

  const clearSearch = () => {
    setQuery("")
    onSearch("")
  }

  return (
    <div className="mb-8 w-full">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        <div className="relative flex w-full items-center overflow-hidden rounded-lg border bg-background shadow-sm focus-within:ring-1 focus-within:ring-ring">
          <Search className="absolute left-3 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder={t("search.placeholder") || "Search articles..."}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-0 pl-10 shadow-none focus-visible:ring-0"
          />
          {query && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-10 h-8 w-8"
              onClick={clearSearch}
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 h-8 w-8"
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            aria-label="Advanced search"
          >
            <Filter className={`h-4 w-4 transition-transform ${isAdvancedOpen ? "text-primary" : ""}`} />
          </Button>
        </div>

        <AnimatePresence>
          {isAdvancedOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-2 overflow-hidden rounded-lg border bg-background p-4 shadow-md"
            >
              <div className="space-y-4">
                <div>
                  <h3 className="mb-2 text-sm font-medium">{t("search.sortBy") || "Sort by"}</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={sortBy === "date" ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleSort("date")}
                      className="flex items-center gap-1"
                    >
                      {t("search.date") || "Date"}
                      {sortBy === "date" && (
                        <ArrowUpDown className={`h-3 w-3 ${sortDirection === "asc" ? "rotate-180" : ""}`} />
                      )}
                    </Button>
                    <Button
                      variant={sortBy === "title" ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleSort("title")}
                      className="flex items-center gap-1"
                    >
                      {t("search.title") || "Title"}
                      {sortBy === "title" && (
                        <ArrowUpDown className={`h-3 w-3 ${sortDirection === "asc" ? "rotate-180" : ""}`} />
                      )}
                    </Button>
                    <Button
                      variant={sortBy === "popularity" ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleSort("popularity")}
                      className="flex items-center gap-1"
                    >
                      {t("search.popularity") || "Popularity"}
                      {sortBy === "popularity" && (
                        <ArrowUpDown className={`h-3 w-3 ${sortDirection === "asc" ? "rotate-180" : ""}`} />
                      )}
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 text-sm font-medium">{t("search.filterByTags") || "Filter by tags"}</h3>
                  <div className="flex flex-wrap gap-2">
                    {availableTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant={selectedTags.includes(tag) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => handleTagToggle(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
