import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <section className="w-full py-12 md:py-24 bg-gradient-to-b from-sky-50 to-white dark:from-sky-950 dark:to-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl text-sky-800 dark:text-sky-300">
                Men haqimda
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Shoira va uning dasturlash sohasidagi tajribasi haqida
              </p>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="flex justify-center lg:justify-end">
                <div className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] rounded-full overflow-hidden border-4 border-sky-100 dark:border-sky-900">
                  <Image src="/placeholder.svg?height=350&width=350" alt="Shoira" fill className="object-cover" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl mb-4 text-sky-800 dark:text-sky-300">
                  Salom, men Shoira!
                </h2>
                <p className="text-muted-foreground mb-6">
                  Men web dasturlash sohasida ishlaydigan dasturchi va kontentni yaratuvchiman. Men o'z bilimlarim va
                  tajribamni boshqalar bilan ulashishni yaxshi ko'raman.
                </p>
                <p className="text-muted-foreground mb-6">
                  Men 3 yildan ortiq vaqt davomida web dasturlash bilan shug'ullanib kelaman. Bu vaqt davomida men turli
                  xil loyihalar ustida ishladim va ko'plab texnologiyalarni o'rgandim.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <h3 className="font-medium mb-2">Texnologiyalar</h3>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>HTML, CSS, JavaScript</li>
                      <li>React.js, Next.js</li>
                      <li>Node.js, Express.js</li>
                      <li>MongoDB, MySQL</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Qiziqishlar</h3>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>Web dasturlash</li>
                      <li>UI/UX dizayn</li>
                      <li>Mobil ilovalar</li>
                      <li>Yangi texnologiyalar</li>
                    </ul>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  Ushbu blog orqali men o'z bilimlarim va tajribamni boshqalar bilan ulashishni maqsad qilganman. Umid
                  qilamanki, mening maqolalarim va loyihalarim sizga foydali bo'ladi.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-sky-50 dark:bg-sky-950/20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center gap-4 text-center mb-12">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl text-sky-800 dark:text-sky-300">
                Mening tajribam
              </h2>
              <p className="max-w-[700px] text-muted-foreground">
                Dasturlash sohasidagi tajribam va erishgan yutuqlarim
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-2 dark:text-white">Web dasturlash</h3>
                <p className="text-muted-foreground">
                  Frontend va backend texnologiyalari bilan ishlash tajribasi. HTML, CSS, JavaScript, React.js, Node.js
                  va boshqa texnologiyalar.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-2 dark:text-white">Ma'lumotlar bazalari</h3>
                <p className="text-muted-foreground">
                  MongoDB va MySQL ma'lumotlar bazalari bilan ishlash tajribasi. Ma'lumotlar bazalarini loyihalash va
                  optimallashtirishni bilish.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-2 dark:text-white">UI/UX dizayn</h3>
                <p className="text-muted-foreground">
                  Foydalanuvchi interfeyslarini yaratish va foydalanuvchi tajribasini yaxshilash. Figma va Adobe XD kabi
                  dizayn vositalari bilan ishlash.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-2 dark:text-white">Mobil ilovalar</h3>
                <p className="text-muted-foreground">
                  React Native yordamida mobil ilovalar yaratish tajribasi. iOS va Android platformalari uchun ilovalar
                  yaratish.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-2 dark:text-white">Loyiha boshqarish</h3>
                <p className="text-muted-foreground">
                  Loyihalarni rejalashtirish va boshqarish tajribasi. Agile metodologiyasi va Scrum framework bilan
                  ishlash.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-2 dark:text-white">Ta'lim berish</h3>
                <p className="text-muted-foreground">
                  Dasturlash asoslarini o'rgatish va mentorlik qilish tajribasi. O'quv materiallari va qo'llanmalar
                  yaratish.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}
