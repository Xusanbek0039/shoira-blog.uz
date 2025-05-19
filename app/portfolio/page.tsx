"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { fetchPortfolioItems } from "@/utils/api"
import { useLanguage } from "@/context/language-context"
import TypingDotsLoader from "@/components/typing-dots-loader"
import PortfolioItemCard from "@/components/portfolio-item-card"

// Define the Portfolio item type
interface PortfolioItem {
  _id: string
  title: string
  content: string
  image: string
  category: string
  author: string
  createdAt: string
}

export default function PortfolioPage() {
  const { t } = useLanguage()
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const getPortfolioItems = async () => {
      try {
        const data = await fetchPortfolioItems()
        setPortfolioItems(data)
      } catch (error: any) {
        console.error("Error fetching portfolio items:", error)
        setError(error.message || "Failed to load portfolio items")
      } finally {
        setLoading(false)
      }
    }

    getPortfolioItems()
  }, [])

  // Group portfolio items by category
  const portfolioByCategory = {
    web: portfolioItems.filter((item) => item.category === "web"),
    mobile: portfolioItems.filter((item) => item.category === "mobile"),
    design: portfolioItems.filter((item) => item.category === "design"),
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        className="mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-4 text-3xl font-bold md:text-4xl">{t("nav.portfolio")}</h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">{t("portfolio.description")}</p>
      </motion.div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <TypingDotsLoader size="lg" />
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-lg text-red-500">{error}</p>
        </div>
      ) : (
        <Tabs defaultValue="web" className="mx-auto max-w-5xl">
          <TabsList className="mb-8 grid w-full grid-cols-3">
            <TabsTrigger value="web">{t("portfolio.categoryWeb")}</TabsTrigger>
            <TabsTrigger value="mobile">{t("portfolio.categoryMobile")}</TabsTrigger>
            <TabsTrigger value="design">{t("portfolio.categoryDesign")}</TabsTrigger>
          </TabsList>

          {Object.entries(portfolioByCategory).map(([category, items]) => (
            <TabsContent key={category} value={category}>
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <p className="text-lg text-muted-foreground">{t("portfolio.noCategoryItems")}</p>
                </div>
              ) : (
                <motion.div
                  className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1,
                      },
                    },
                  }}
                  initial="hidden"
                  animate="visible"
                >
                  {items.map((item) => (
                    <motion.div
                      key={item._id}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                      }}
                    >
                      <PortfolioItemCard item={item} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  )
}
