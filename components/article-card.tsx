"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Article } from "@/types"
import { formatDate } from "@/utils/format-date"

interface ArticleCardProps {
  article: Article
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  }

  return (
    <motion.div variants={cardVariants}>
      <Card className="h-full overflow-hidden transition-all hover:shadow-md">
        <div className="aspect-video overflow-hidden">
          <img
            src={article.image || "/placeholder.svg?height=200&width=400"}
            alt={article.title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <CardHeader className="p-4 pb-2">
          <div className="space-y-1">
            <h3 className="line-clamp-2 text-xl font-bold">{article.title}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{article.author}</span>
              <span>•</span>
              <time dateTime={article.createdAt}>{formatDate(article.createdAt)}</time>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="line-clamp-3 text-muted-foreground">{article.content.substring(0, 150)}...</p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Link href={`/article/${article._id}`} className="w-full">
            <Button variant="outline" className="w-full">
            Read more
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
