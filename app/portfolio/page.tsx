import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"

// This would normally fetch from the database
const portfolioItems = {
  web: [
    {
      id: "web1",
      title: "E-commerce platformasi",
      description: "Online do'kon uchun to'liq funksional platforma",
      imageUrl: "/placeholder.svg?height=300&width=600",
    },
    {
      id: "web2",
      title: "Blog platformasi",
      description: "Maqolalar va blog postlari uchun platforma",
      imageUrl: "/placeholder.svg?height=300&width=600",
    },
    {
      id: "web3",
      title: "Portfolio sayt",
      description: "Shaxsiy portfolio uchun sayt",
      imageUrl: "/placeholder.svg?height=300&width=600",
    },
  ],
  mobile: [
    {
      id: "mobile1",
      title: "Task Manager ilovasi",
      description: "Vazifalarni boshqarish uchun mobil ilova",
      imageUrl: "/placeholder.svg?height=300&width=600",
    },
    {
      id: "mobile2",
      title: "Weather App",
      description: "Ob-havo ma'lumotlarini ko'rsatuvchi mobil ilova",
      imageUrl: "/placeholder.svg?height=300&width=600",
    },
  ],
  design: [
    {
      id: "design1",
      title: "E-commerce UI dizayni",
      description: "Online do'kon uchun UI dizayn",
      imageUrl: "/placeholder.svg?height=300&width=600",
    },
    {
      id: "design2",
      title: "Mobil ilova UI/UX dizayni",
      description: "Task Manager ilovasi uchun UI/UX dizayn",
      imageUrl: "/placeholder.svg?height=300&width=600",
    },
    {
      id: "design3",
      title: "Logo dizayn",
      description: "Turli kompaniyalar uchun logo dizaynlari",
      imageUrl: "/placeholder.svg?height=300&width=600",
    },
  ],
}

export default function PortfolioPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <section className="w-full py-12 md:py-24 bg-gradient-to-b from-sky-50 to-white dark:from-sky-950 dark:to-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl text-sky-800 dark:text-sky-300">
                Portfolio
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">Mening ishlarim va loyihalarim to'plami</p>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue="web" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList>
                  <TabsTrigger value="web">Web loyihalar</TabsTrigger>
                  <TabsTrigger value="mobile">Mobil ilovalar</TabsTrigger>
                  <TabsTrigger value="design">UI/UX dizayn</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="web" className="mt-0">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {portfolioItems.web.map((item) => (
                    <Card key={item.id} className="overflow-hidden dark:border-gray-800">
                      <div className="aspect-video relative">
                        <Image
                          src={item.imageUrl || "/placeholder.svg"}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="text-lg font-bold mb-1 dark:text-white">{item.title}</h3>
                        <p className="text-muted-foreground text-sm">{item.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="mobile" className="mt-0">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {portfolioItems.mobile.map((item) => (
                    <Card key={item.id} className="overflow-hidden dark:border-gray-800">
                      <div className="aspect-video relative">
                        <Image
                          src={item.imageUrl || "/placeholder.svg"}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="text-lg font-bold mb-1 dark:text-white">{item.title}</h3>
                        <p className="text-muted-foreground text-sm">{item.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="design" className="mt-0">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {portfolioItems.design.map((item) => (
                    <Card key={item.id} className="overflow-hidden dark:border-gray-800">
                      <div className="aspect-video relative">
                        <Image
                          src={item.imageUrl || "/placeholder.svg"}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="text-lg font-bold mb-1 dark:text-white">{item.title}</h3>
                        <p className="text-muted-foreground text-sm">{item.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}
