"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock portfolio data
const portfolioItems = {
  web: [
    {
      id: 1,
      title: "E-commerce Websayt",
      description: "Online do'kon uchun zamonaviy web sayt",
      image: "/placeholder.svg?height=400&width=600",
      year: "2023",
    },
    {
      id: 2,
      title: "Blog Platformasi",
      description: "Kontent boshqarish tizimi bilan blog platformasi",
      image: "/placeholder.svg?height=400&width=600",
      year: "2022",
    },
    {
      id: 3,
      title: "Kompaniya Websayti",
      description: "IT kompaniyasi uchun korporativ web sayt",
      image: "/placeholder.svg?height=400&width=600",
      year: "2022",
    },
  ],
  mobile: [
    {
      id: 4,
      title: "Fitness Ilovasi",
      description: "Mashqlar va ovqatlanish rejimini kuzatish uchun mobil ilova",
      image: "/placeholder.svg?height=400&width=600",
      year: "2023",
    },
    {
      id: 5,
      title: "To-do List Ilovasi",
      description: "Vazifalarni boshqarish uchun mobil ilova",
      image: "/placeholder.svg?height=400&width=600",
      year: "2021",
    },
  ],
  design: [
    {
      id: 6,
      title: "Brend Identifikatsiyasi",
      description: "Startup uchun to'liq brend identifikatsiyasi",
      image: "/placeholder.svg?height=400&width=600",
      year: "2023",
    },
    {
      id: 7,
      title: "UI/UX Dizayn",
      description: "Mobil ilova uchun foydalanuvchi interfeysi dizayni",
      image: "/placeholder.svg?height=400&width=600",
      year: "2022",
    },
    {
      id: 8,
      title: "Logo Dizayn",
      description: "Turli kompaniyalar uchun logo dizaynlari",
      image: "/placeholder.svg?height=400&width=600",
      year: "2021",
    },
  ],
}

export default function PortfolioPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        className="mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-4 text-3xl font-bold md:text-4xl">Portfolio</h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Mening eng yaxshi ishlarim to'plami. Web saytlar, mobil ilovalar va dizayn ishlari.
        </p>
      </motion.div>

      <Tabs defaultValue="web" className="mx-auto max-w-5xl">
        <TabsList className="mb-8 grid w-full grid-cols-3">
          <TabsTrigger value="web">Web Saytlar</TabsTrigger>
          <TabsTrigger value="mobile">Mobil Ilovalar</TabsTrigger>
          <TabsTrigger value="design">Dizayn</TabsTrigger>
        </TabsList>

        {Object.entries(portfolioItems).map(([category, items]) => (
          <TabsContent key={category} value={category}>
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
                  key={item.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                  }}
                >
                  <Card className="overflow-hidden">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="mb-1 flex items-center justify-between">
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                        <span className="text-sm text-muted-foreground">{item.year}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
