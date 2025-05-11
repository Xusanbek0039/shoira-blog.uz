"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Default featured articles
const defaultFeaturedArticles = [
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
]

export function FeaturedArticles() {
  const [featuredArticles, setFeaturedArticles] = useState(defaultFeaturedArticles)

  // Load articles from localStorage on component mount
  useEffect(() => {
    const storedArticles = localStorage.getItem("userArticles")
    if (storedArticles) {
      const userArticles = JSON.parse(storedArticles)
      // Take the most recent user article and add it to featured
      if (userArticles.length > 0) {
        const recentUserArticle = userArticles[0]
        setFeaturedArticles([recentUserArticle, ...defaultFeaturedArticles.slice(0, 2)])
      }
    }
  }, [])

  return (
    <section className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center gap-4 text-center mb-10">
          <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl text-sky-800 dark:text-sky-300">
            So'nggi maqolalar
          </h2>
          <p className="max-w-[700px] text-muted-foreground">Eng so'nggi va qiziqarli maqolalar to'plami</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredArticles.map((article) => (
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

        <div className="flex justify-center mt-10">
          <Link href="/articles">
            <Button
              variant="outline"
              className="border-sky-600 text-sky-600 hover:bg-sky-50 dark:text-sky-400 dark:border-sky-400 dark:hover:bg-sky-950/30"
            >
              Barcha maqolalarni ko'rish
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
