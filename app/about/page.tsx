"use client"

import { motion } from "framer-motion"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-6 py-16">
      <motion.div
        className="mx-auto max-w-3xl bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="mb-8 text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          About Me
        </h1>

        <div className="mb-10 overflow-hidden rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
          <img
            src="/placeholder.svg?height=300&width=800"
            alt="Men haqimda"
            className="w-full h-64 object-cover object-center"
            loading="lazy"
          />
        </div>

        <section className="prose prose-lg max-w-none text-gray-700 dark:prose-invert dark:text-gray-300">
          <p>
            <strong>Salom! Mening ismim Shoira.</strong> Men web dasturlash va dizayn sohasida faoliyat yuritaman.
            Ushbu blogda o‘z tajribalarim, bilimlarim va loyihalarim haqida yozib boraman.
          </p>

          <h2 className="mt-8 mb-3 text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Tajriba
          </h2>
          <p>
            5 yildan ortiq web dasturlash sohasida faoliyat yuritaman. Bu vaqt mobaynida turli loyihalar ustida ishladim,
            ko‘plab texnologiyalarni o‘rgandim va amaliyotda qo‘lladim.
          </p>

          <h2 className="mt-8 mb-3 text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Ko‘nikmalar
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Frontend:</strong> HTML, CSS, JavaScript, React, Next.js</li>
            <li><strong>Backend:</strong> Node.js, Express, MongoDB</li>
            <li><strong>Dizayn:</strong> Figma, Adobe Photoshop</li>
            <li><strong>Boshqalar:</strong> Git, Docker, AWS</li>
          </ul>

          <h2 className="mt-8 mb-3 text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Ta'lim
          </h2>
          <p>
            Toshkent Axborot Texnologiyalari Universitetini tamomlaganman. O‘z ustimda ishlashni davom ettiraman
            va doimo yangi texnologiyalarni o‘rganaman.
          </p>

          <h2 className="mt-8 mb-3 text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Qiziqishlar
          </h2>
          <p>
            Dasturlashdan tashqari, kitob o‘qishni, sayohat qilishni va fotografiya bilan shug‘ullanishni yaxshi ko‘raman.
            Bu qiziqishlar menga yangi g‘oyalar va ilhom beradi.
          </p>
        </section>
      </motion.div>
    </div>
  )
}
