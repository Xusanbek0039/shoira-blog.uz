import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Github } from "lucide-react"

// This would normally fetch from the database
const projects = [
  {
    id: "1",
    title: "E-commerce platformasi",
    description: "Node.js, Express.js va MongoDB yordamida yaratilgan to'liq funksional e-commerce platformasi.",
    technologies: ["Node.js", "Express.js", "MongoDB", "React.js", "Redux"],
    imageUrl: "/placeholder.svg?height=300&width=600",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    id: "2",
    title: "Task Manager ilovasi",
    description: "React.js va Firebase yordamida yaratilgan vazifalarni boshqarish ilovasi.",
    technologies: ["React.js", "Firebase", "Tailwind CSS"],
    imageUrl: "/placeholder.svg?height=300&width=600",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    id: "3",
    title: "Blog platformasi",
    description: "Next.js va MongoDB yordamida yaratilgan blog platformasi.",
    technologies: ["Next.js", "MongoDB", "Tailwind CSS", "NextAuth.js"],
    imageUrl: "/placeholder.svg?height=300&width=600",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    id: "4",
    title: "Weather App",
    description: "React.js va OpenWeather API yordamida yaratilgan ob-havo ma'lumotlarini ko'rsatuvchi ilova.",
    technologies: ["React.js", "API Integration", "CSS"],
    imageUrl: "/placeholder.svg?height=300&width=600",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
]

export default function ProjectsPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <section className="w-full py-12 md:py-24 bg-gradient-to-b from-sky-50 to-white dark:from-sky-950 dark:to-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl text-sky-800 dark:text-sky-300">
                Loyihalarim
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Men ishlab chiqqan loyihalar va ishlanmalar to'plami
              </p>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-2">
              {projects.map((project) => (
                <Card key={project.id} className="overflow-hidden dark:border-gray-800">
                  <div className="aspect-video relative">
                    <Image
                      src={project.imageUrl || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="dark:text-white">{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-100 text-xs rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-4">
                    <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm" className="gap-2 dark:border-gray-700">
                        <Github className="h-4 w-4" />
                        GitHub
                      </Button>
                    </Link>
                    <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <Button variant="default" size="sm" className="gap-2 bg-sky-600 hover:bg-sky-700">
                        <ExternalLink className="h-4 w-4" />
                        Ko'rish
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}
