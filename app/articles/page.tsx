import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ArticlesList } from "@/components/articles-list"

export default function ArticlesPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <section className="w-full py-12 md:py-24 bg-gradient-to-b from-sky-50 to-white dark:from-sky-950 dark:to-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl text-sky-800 dark:text-sky-300">
                Maqolalar
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Barcha maqolalar va blog postlari to'plami
              </p>
            </div>
          </div>
        </section>

        <ArticlesList />
      </div>
      <Footer />
    </main>
  )
}
