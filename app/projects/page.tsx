"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Mock projects data
const projects = [
  {
    id: 1,
    title: "E-commerce Platformasi",
    description: "Online do'kon uchun to'liq e-commerce yechimi. React, Node.js va MongoDB bilan yaratilgan.",
    image: "/placeholder.svg?height=200&width=400",
    link: "#",
    tags: ["React", "Node.js", "MongoDB", "Express"],
  },
  {
    id: 2,
    title: "Task Management Dasturi",
    description: "Vazifalarni boshqarish uchun web ilova. Drag-and-drop interfeysi va real-time yangilanishlar bilan.",
    image: "/placeholder.svg?height=200&width=400",
    link: "#",
    tags: ["Vue.js", "Firebase", "Tailwind CSS"],
  },
  {
    id: 3,
    title: "Portfolio Websayt",
    description: "Shaxsiy portfolio uchun zamonaviy va responsive web sayt. Next.js va Tailwind CSS bilan yaratilgan.",
    image: "/placeholder.svg?height=200&width=400",
    link: "#",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    id: 4,
    title: "Weather Forecast Ilovasi",
    description: "Ob-havo ma'lumotlarini ko'rsatuvchi ilova. OpenWeatherMap API bilan integratsiya qilingan.",
    image: "/placeholder.svg?height=200&width=400",
    link: "#",
    tags: ["React", "API Integration", "CSS Modules"],
  },
]

export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h1 className="mb-4 text-3xl font-bold md:text-4xl">Loyihalarim</h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Men ishtirok etgan va yaratgan loyihalar to'plami. Har bir loyiha o'ziga xos texnologiyalar va yechimlardan
          foydalanadi.
        </p>
      </motion.div>

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
        {projects.map((project) => (
          <motion.div
            key={project.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
            }}
          >
            <Card className="h-full overflow-hidden transition-all hover:shadow-md">
              <div className="aspect-video overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardHeader className="p-4 pb-2">
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span key={index} className="rounded-full bg-secondary px-2 py-1 text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Link href={project.link} className="w-full">
                  <Button variant="outline" className="w-full">
                    Loyihani ko'rish
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
