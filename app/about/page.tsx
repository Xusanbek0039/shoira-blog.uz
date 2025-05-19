"use client"

import { motion } from "framer-motion"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        className="mx-auto max-w-3xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-6 text-3xl font-bold md:text-4xl">Men haqimda</h1>

        <div className="mb-8 overflow-hidden rounded-lg">
          <img src="/placeholder.svg?height=300&width=800" alt="Men haqimda" className="h-auto w-full object-cover" />
        </div>

        <div className="prose prose-lg max-w-none dark:prose-invert">
          <p>
            Salom! Mening ismim Shoira. Men web dasturlash va dizayn sohasida faoliyat yuritaman. Bu blogda o'z
            tajribalarim, bilimlarim va loyihalarim haqida yozib boraman.
          </p>

          <h2>Tajriba</h2>
          <p>
            Men 5 yildan ortiq vaqt davomida web dasturlash sohasida ishlayman. Bu vaqt mobaynida turli xil loyihalar
            ustida ishladim va ko'plab texnologiyalarni o'rgandim.
          </p>

          <h2>Ko'nikmalar</h2>
          <ul>
            <li>Frontend: HTML, CSS, JavaScript, React, Next.js</li>
            <li>Backend: Node.js, Express, MongoDB</li>
            <li>Dizayn: Figma, Adobe Photoshop</li>
            <li>Boshqalar: Git, Docker, AWS</li>
          </ul>

          <h2>Ta'lim</h2>
          <p>
            Men Toshkent Axborot Texnologiyalari Universitetini tamomlaganman. Bundan tashqari, o'z ustimda ishlashni
            to'xtatmayman va doimo yangi texnologiyalarni o'rganib boraman.
          </p>

          <h2>Qiziqishlar</h2>
          <p>
            Dasturlashdan tashqari, men kitob o'qishni, sayohat qilishni va fotografiya bilan shug'ullanishni yaxshi
            ko'raman. Bu qiziqishlarim menga yangi g'oyalar va ilhom beradi.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
