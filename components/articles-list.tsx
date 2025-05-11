"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Default articles (would normally fetch from the database)
const defaultArticles = [
  {
    id: "1",
    title: "Web dasturlash asoslari",
    excerpt: "Web dasturlash haqida boshlang'ich ma'lumotlar va asosiy tushunchalar.",
    author: "Shoira",
    date: "2023-12-15",
    imageUrl: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "2",
    title: "React.js bilan ishlash",
    excerpt: "React.js frameworki haqida va undan foydalanish bo'yicha qo'llanma.",
    author: "Shoira",
    date: "2024-01-20",
    imageUrl: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "3",
    title: "MongoDB ma'lumotlar bazasi",
    excerpt: "MongoDB ma'lumotlar bazasi bilan ishlash va uni loyihaga ulash.",
    author: "Shoira",
    date: "2024-02-10",
    imageUrl: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "4",
    title: "Node.js va Express.js",
    excerpt: "Node.js va Express.js yordamida backend yaratish bo'yicha qo'llanma.",
    author: "Shoira",
    date: "2024-03-05",
    imageUrl: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "5",
    title: "Tailwind CSS bilan ishlash",
    excerpt: "Tailwind CSS yordamida tez va samarali stillar yaratish.",
    author: "Shoira",
    date: "2024-03-20",
    imageUrl: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "6",
    title: "Next.js frameworki",
    excerpt: "Next.js frameworki haqida va undan foydalanish bo'yicha qo'llanma.",
    author: "Shoira",
    date: "2024-04-10",
    imageUrl: "/placeholder.svg?height=200&width=400",
  },
]

export function ArticlesList() {
  const [articles, setArticles] = useState(defaultArticles)

  // Load articles from localStorage on component mount
  useEffect(() => {
    const storedArticles = localStorage.getItem("userArticles")
    if (storedArticles) {
      const userArticles = JSON.parse(storedArticles)
      // Combine default articles with user-created ones
      setArticles([...userArticles, ...defaultArticles])
    }
  }, [])

  return (
    <section className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Card key={article.id} className="overflow-hidden transition-all hover:shadow-lg dark:border-gray-800">
              <div className="aspect-video relative">
                <Image src={article.imageUrl || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-2 hover:text-sky-600 dark:hover:text-sky-400">
                  <Link href={`/articles/${article.id}`}>{article.title}</Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-3">{article.excerpt}</p>
                <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
                  <span>{article.author}</span>
                  <span>•</span>
                  <time dateTime={article.date}>{new Date(article.date).toLocaleDateString("uz-UZ")}</time>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/articles/${article.id}`} className="w-full">
                  <Button variant="outline" className="w-full">
                    Batafsil o'qish
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
