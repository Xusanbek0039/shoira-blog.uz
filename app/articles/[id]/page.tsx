"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Calendar, User } from "lucide-react"

// Default articles (would normally fetch from the database)
const defaultArticles = {
  "1": {
    id: "1",
    title: "Web dasturlash asoslari",
    content: `
      <p>Web dasturlash haqida boshlang'ich ma'lumotlar va asosiy tushunchalar.</p>
      <p>Web dasturlash - bu internet saytlarini yaratish va ishlab chiqish jarayoni. Bu jarayon bir nechta bosqichlardan iborat bo'lib, ular quyidagilarni o'z ichiga oladi:</p>
      <h2>Frontend dasturlash</h2>
      <p>Frontend - bu foydalanuvchi ko'radigan va o'zaro ta'sir qiladigan web-saytning qismi. Frontend dasturlash uchun quyidagi texnologiyalar ishlatiladi:</p>
      <ul>
        <li>HTML - web-sahifaning asosiy tuzilishini yaratish uchun</li>
        <li>CSS - web-sahifaning ko'rinishini va dizaynini yaratish uchun</li>
        <li>JavaScript - web-sahifaga interaktivlik qo'shish uchun</li>
      </ul>
      <h2>Backend dasturlash</h2>
      <p>Backend - bu foydalanuvchi ko'rmaydigan, lekin web-saytning ishlashi uchun zarur bo'lgan server tomoni. Backend dasturlash uchun quyidagi texnologiyalar ishlatiladi:</p>
      <ul>
        <li>Node.js - JavaScript asosidagi server tomoni dasturlash muhiti</li>
        <li>Express.js - Node.js uchun web-framework</li>
        <li>MongoDB - NoSQL ma'lumotlar bazasi</li>
        <li>MySQL - SQL ma'lumotlar bazasi</li>
      </ul>
      <p>Web dasturlashni o'rganish uchun avval HTML, CSS va JavaScript asoslarini o'rganish tavsiya etiladi. Keyin esa React.js, Vue.js yoki Angular kabi frontend frameworklarini o'rganish mumkin. Backend uchun esa Node.js va Express.js yoki Python va Django kabi texnologiyalarni o'rganish mumkin.</p>
    `,
    author: "Shoira",
    date: "2023-12-15",
    imageUrl: "/placeholder.svg?height=400&width=800",
  },
  "2": {
    id: "2",
    title: "React.js bilan ishlash",
    content: `
      <p>React.js frameworki haqida va undan foydalanish bo'yicha qo'llanma.</p>
      <p>React.js - bu Facebook tomonidan yaratilgan JavaScript kutubxonasi bo'lib, u foydalanuvchi interfeyslarini yaratish uchun ishlatiladi. React.js komponentlarga asoslangan yondashuvni qo'llaydi, bu esa kodni qayta ishlatish va saqlashni osonlashtiradi.</p>
      <h2>React.js asoslari</h2>
      <p>React.js bilan ishlashni boshlash uchun quyidagi asosiy tushunchalarni bilish kerak:</p>
      <ul>
        <li>Komponentlar - React.js dasturining asosiy qurilish bloklari</li>
        <li>Props - komponentlarga ma'lumotlarni uzatish uchun</li>
        <li>State - komponentning ichki holatini saqlash uchun</li>
        <li>Lifecycle metodlari - komponentning turli bosqichlarida kod bajarish uchun</li>
      </ul>
      <h2>React.js loyihasini boshlash</h2>
      <p>React.js loyihasini boshlash uchun Create React App yoki Next.js kabi frameworklardan foydalanish mumkin. Create React App yordamida yangi React.js loyihasini boshlash uchun quyidagi buyruqni ishlatish mumkin:</p>
      <pre><code>npx create-react-app my-app</code></pre>
      <p>Bu buyruq yangi React.js loyihasini yaratadi va kerakli paketlarni o'rnatadi. Loyihani ishga tushirish uchun quyidagi buyruqlarni ishlatish mumkin:</p>
      <pre><code>cd my-app
npm start</code></pre>
      <p>React.js bilan ishlashni o'rganish uchun rasmiy hujjatlarni o'qish va amaliy loyihalar ustida ishlash tavsiya etiladi.</p>
    `,
    author: "Shoira",
    date: "2024-01-20",
    imageUrl: "/placeholder.svg?height=400&width=800",
  },
  "3": {
    id: "3",
    title: "MongoDB ma'lumotlar bazasi",
    content: `
      <p>MongoDB ma'lumotlar bazasi bilan ishlash va uni loyihaga ulash haqida ma'lumot.</p>
      <p>MongoDB - bu NoSQL ma'lumotlar bazasi bo'lib, u ma'lumotlarni JSON-ga o'xshash formatda saqlaydi. MongoDB ma'lumotlar bazasi bilan ishlash uchun quyidagi asosiy tushunchalarni bilish kerak:</p>
      <h2>MongoDB asoslari</h2>
      <p>MongoDB ma'lumotlar bazasi bilan ishlashni boshlash uchun quyidagi asosiy tushunchalarni bilish kerak:</p>
      <ul>
        <li>Collection - ma'lumotlar to'plami</li>
        <li>Document - ma'lumotlar to'plamidagi har bir yozuv</li>
        <li>Field - ma'lumotlar to'plamidagi har bir yozuvning maydoni</li>
      </ul>
      <h2>MongoDB ni o'rnatish</h2>
      <p>MongoDB ni o'rnatish uchun quyidagi qadamlarni bajarish kerak:</p>
      <ol>
        <li>MongoDB ni rasmiy saytidan yuklab olish</li>
        <li>MongoDB ni o'rnatish</li>
        <li>MongoDB ni ishga tushirish</li>
      </ol>
      <h2>MongoDB ni Node.js loyihasiga ulash</h2>
      <p>MongoDB ni Node.js loyihasiga ulash uchun quyidagi qadamlarni bajarish kerak:</p>
      <ol>
        <li>MongoDB driver ni o'rnatish: <code>npm install mongodb</code></li>
        <li>MongoDB ga ulanish:</li>
      </ol>
      <pre><code>const { MongoClient } = require('mongodb');
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
async function connect() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (e) {
    console.error(e);
  }
}
connect();</code></pre>
      <p>MongoDB bilan ishlashni o'rganish uchun rasmiy hujjatlarni o'qish va amaliy loyihalar ustida ishlash tavsiya etiladi.</p>
    `,
    author: "Shoira",
    date: "2024-02-10",
    imageUrl: "/placeholder.svg?height=400&width=800",
  },
  "4": {
    id: "4",
    title: "Node.js va Express.js",
    content: `
      <p>Node.js va Express.js yordamida backend yaratish bo'yicha qo'llanma.</p>
      <p>Node.js - bu JavaScript asosidagi server tomoni dasturlash muhiti. Express.js esa Node.js uchun web-framework bo'lib, u web-ilovalarni yaratishni osonlashtiradi.</p>
      <h2>Node.js asoslari</h2>
      <p>Node.js bilan ishlashni boshlash uchun quyidagi asosiy tushunchalarni bilish kerak:</p>
      <ul>
        <li>Modullar - Node.js dasturining asosiy qurilish bloklari</li>
        <li>NPM - Node.js paketlarini boshqarish tizimi</li>
        <li>Event Loop - Node.js ning asosiy ishlash prinsipi</li>
      </ul>
      <h2>Express.js asoslari</h2>
      <p>Express.js bilan ishlashni boshlash uchun quyidagi asosiy tushunchalarni bilish kerak:</p>
      <ul>
        <li>Routing - so'rovlarni yo'naltirish</li>
        <li>Middleware - so'rovlarni qayta ishlash</li>
        <li>Template Engine - HTML sahifalarni yaratish</li>
      </ul>
      <h2>Express.js loyihasini boshlash</h2>
      <p>Express.js loyihasini boshlash uchun quyidagi qadamlarni bajarish kerak:</p>
      <ol>
        <li>Express.js ni o'rnatish: <code>npm install express</code></li>
        <li>Express.js loyihasini yaratish:</li>
      </ol>
      <pre><code>const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(\`Example app listening at http://localhost:\${port}\`);
});</code></pre>
      <p>Node.js va Express.js bilan ishlashni o'rganish uchun rasmiy hujjatlarni o'qish va amaliy loyihalar ustida ishlash tavsiya etiladi.</p>
    `,
    author: "Shoira",
    date: "2024-03-05",
    imageUrl: "/placeholder.svg?height=400&width=800",
  },
  "5": {
    id: "5",
    title: "Tailwind CSS bilan ishlash",
    content: `
      <p>Tailwind CSS yordamida tez va samarali stillar yaratish haqida ma'lumot.</p>
      <p>Tailwind CSS - bu utility-first CSS framework bo'lib, u web-saytlarni tez va samarali stillar bilan ta'minlashga yordam beradi.</p>
      <h2>Tailwind CSS asoslari</h2>
      <p>Tailwind CSS bilan ishlashni boshlash uchun quyidagi asosiy tushunchalarni bilish kerak:</p>
      <ul>
        <li>Utility Classes - Tailwind CSS ning asosiy qurilish bloklari</li>
        <li>Responsive Design - turli qurilmalar uchun stillar yaratish</li>
        <li>Customization - Tailwind CSS ni o'zingizga moslashtirish</li>
      </ul>
      <h2>Tailwind CSS ni o'rnatish</h2>
      <p>Tailwind CSS ni o'rnatish uchun quyidagi qadamlarni bajarish kerak:</p>
      <ol>
        <li>Tailwind CSS ni o'rnatish: <code>npm install tailwindcss</code></li>
        <li>Tailwind CSS konfiguratsiya faylini yaratish: <code>npx tailwindcss init</code></li>
        <li>Tailwind CSS ni CSS fayliga import qilish:</li>
      </ol>
      <pre><code>@tailwind base;
@tailwind components;
@tailwind utilities;</code></pre>
      <h2>Tailwind CSS bilan ishlash</h2>
      <p>Tailwind CSS bilan ishlash uchun quyidagi misolni ko'rib chiqamiz:</p>
      <pre><code>&lt;div class="flex items-center justify-center h-screen bg-gray-100"&gt;
  &lt;div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4"&gt;
    &lt;div class="flex-shrink-0"&gt;
      &lt;img class="h-12 w-12" src="/img/logo.svg" alt="Logo"&gt;
    &lt;/div&gt;
    &lt;div&gt;
      &lt;div class="text-xl font-medium text-black"&gt;Tailwind CSS&lt;/div&gt;
      &lt;p class="text-gray-500"&gt;Utility-first CSS framework&lt;/p&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;</code></pre>
      <p>Tailwind CSS bilan ishlashni o'rganish uchun rasmiy hujjatlarni o'qish va amaliy loyihalar ustida ishlash tavsiya etiladi.</p>
    `,
    author: "Shoira",
    date: "2024-03-20",
    imageUrl: "/placeholder.svg?height=400&width=800",
  },
  "6": {
    id: "6",
    title: "Next.js frameworki",
    content: `
      <p>Next.js frameworki haqida va undan foydalanish bo'yicha qo'llanma.</p>
      <p>Next.js - bu React.js asosidagi framework bo'lib, u server-side rendering, static site generation va boshqa ko'plab imkoniyatlarni taqdim etadi.</p>
      <h2>Next.js asoslari</h2>
      <p>Next.js bilan ishlashni boshlash uchun quyidagi asosiy tushunchalarni bilish kerak:</p>
      <ul>
        <li>Pages - Next.js dasturining asosiy qurilish bloklari</li>
        <li>Routing - so'rovlarni yo'naltirish</li>
        <li>Data Fetching - ma'lumotlarni olish</li>
        <li>API Routes - API endpointlarini yaratish</li>
      </ul>
      <h2>Next.js loyihasini boshlash</h2>
      <p>Next.js loyihasini boshlash uchun quyidagi qadamlarni bajarish kerak:</p>
      <ol>
        <li>Next.js loyihasini yaratish: <code>npx create-next-app@latest</code></li>
        <li>Loyihani ishga tushirish: <code>npm run dev</code></li>
      </ol>
      <h2>Next.js da sahifalar yaratish</h2>
      <p>Next.js da sahifalar yaratish uchun <code>pages</code> papkasida React komponentlarini yaratish kerak. Masalan, <code>pages/index.js</code> fayli quyidagicha bo'lishi mumkin:</p>
      <pre><code>export default function Home() {
  return (
    &lt;div&gt;
      &lt;h1&gt;Hello, Next.js!&lt;/h1&gt;
    &lt;/div&gt;
  )
}</code></pre>
      <p>Next.js bilan ishlashni o'rganish uchun rasmiy hujjatlarni o'qish va amaliy loyihalar ustida ishlash tavsiya etiladi.</p>
    `,
    author: "Shoira",
    date: "2024-04-10",
    imageUrl: "/placeholder.svg?height=400&width=800",
  },
}

export default function ArticlePage({ params }: { params: { id: string } }) {
  const [article, setArticle] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // First check if it's a default article
    if (defaultArticles[params.id as keyof typeof defaultArticles]) {
      setArticle(defaultArticles[params.id as keyof typeof defaultArticles])
      setIsLoading(false)
      return
    }

    // If not a default article, check user articles in localStorage
    const storedArticles = localStorage.getItem("userArticles")
    if (storedArticles) {
      const userArticles = JSON.parse(storedArticles)
      const foundArticle = userArticles.find((article: any) => article.id === params.id)
      if (foundArticle) {
        setArticle(foundArticle)
      }
    }

    setIsLoading(false)
  }, [params.id])

  if (isLoading) {
    return (
      <main className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Yuklanmoqda...</h1>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  if (!article) {
    return (
      <main className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Maqola topilmadi</h1>
            <Link href="/articles">
              <Button variant="outline">Barcha maqolalarga qaytish</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <article className="flex-grow">
        <div className="w-full max-w-4xl mx-auto aspect-[21/9] relative bg-muted rounded-[30px] overflow-hidden">
          {article.imageUrl.startsWith("data:") ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={article.imageUrl || "/placeholder.svg"}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <Image
              src={article.imageUrl || "/placeholder.svg"}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          )}
        </div>

        <div className="container px-4 md:px-6 py-12 max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-sky-800 dark:text-sky-300 mb-6">
            {article.title}
          </h1>

          <div className="flex items-center gap-4 text-muted-foreground mb-8">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time dateTime={article.date}>{new Date(article.date).toLocaleDateString("uz-UZ")}</time>
            </div>
          </div>

          {article.content ? (
            <div
              className="prose prose-sky dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          ) : (
            <div className="prose prose-sky dark:prose-invert max-w-none">
              <p>{article.excerpt || "Maqola matni mavjud emas."}</p>
            </div>
          )}

          <div className="mt-12 pt-6 border-t">
            <Link href="/articles">
              <Button variant="outline">Barcha maqolalarga qaytish</Button>
            </Link>
          </div>
        </div>
      </article>
      <Footer />
    </main>
  )
}
