import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-sky-50 to-white dark:from-sky-950 dark:to-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-sky-800 dark:text-sky-300">
            Shoira blogiga xush kelibsiz
          </h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Bu yerda men o'z fikrlarim, loyihalarim va tajribalarim bilan o'rtoqlashaman. Yangi maqolalar va qiziqarli
            ma'lumotlar uchun blogni kuzatib boring.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link href="/articles">
              <Button className="bg-sky-600 hover:bg-sky-700">Maqolalarni ko'rish</Button>
            </Link>
            <Link href="/about">
              <Button
                variant="outline"
                className="border-sky-600 text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-950 dark:text-sky-400 dark:border-sky-400"
              >
                Men haqimda
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
