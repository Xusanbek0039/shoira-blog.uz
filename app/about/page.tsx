"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/context/language-context"

export default function AboutPage() {
  const { t, language } = useLanguage()

  // Language-specific content
  const aboutContent = {
    en: {
      title: "Shoira Abdurasulova",
      bio: [
        "I'm Shoira Abdurasulova – a youth leader who lives and breathes economics and diplomacy.",
        "Born in 2008 in Uzbekistan, I study at the Hamid Olimjon and Zulfiya Presidential Creativity School with a strong focus on global affairs. My core interests lie in economic policy, international relations, and sustainability.",
      ],
      initiatives: {
        title: "Youth Initiatives",
        items: [
          "<strong>Green Trade Diplomacy Lab (GTDL)</strong> – a virtual space where youth simulate eco-friendly diplomacy and trade",
          "<strong>EARTHNET</strong> – an AI-powered system to detect environmental threats",
        ],
      },
      footer: [
        "In 2024, I served as a UN Online Volunteer, contributing to global development efforts.",
        "To me, economics builds futures – and diplomacy protects them.",
      ],
    },
    uz: {
      title: "Shoira Abdurasulova",
      bio: [
        "Men Shoira Abdurasulova – iqtisodiyot va diplomatiya bilan yashaydigan yoshlar yetakchisiman.",
        "2008-yilda O'zbekistonda tug'ilganman, Hamid Olimjon va Zulfiya nomidagi Prezident ijod maktabida global masalalar bo'yicha kuchli e'tibor bilan ta'lim olaman. Mening asosiy qiziqishlarim iqtisodiy siyosat, xalqaro munosabatlar va barqarorlikda.",
      ],
      initiatives: {
        title: "Yoshlar tashabbusi",
        items: [
          "<strong>Yashil savdo diplomatiyasi laboratoriyasi (GTDL)</strong> – yoshlar ekologik diplomatiya va savdoni simulyatsiya qiladigan virtual makon",
          "<strong>EARTHNET</strong> – atrof-muhit tahdidlarini aniqlash uchun sun'iy intellektga asoslangan tizim",
        ],
      },
      footer: [
        "2024-yilda BMT onlayn ko'ngillisi sifatida global rivojlanish harakatlariga hissa qo'shdim.",
        "Men uchun iqtisodiyot kelajakni quradi – va diplomatiya uni himoya qiladi.",
      ],
    },
    ru: {
      title: "Шоира Абдурасулова",
      bio: [
        "Я Шоира Абдурасулова – молодежный лидер, живущий экономикой и дипломатией.",
        "Родилась в 2008 году в Узбекистане, учусь в Президентской школе творчества имени Хамида Алимджана и Зульфии с сильным акцентом на глобальные вопросы. Мои основные интересы лежат в области экономической политики, международных отношений и устойчивого развития.",
      ],
      initiatives: {
        title: "Молодежные инициативы",
        items: [
          "<strong>Лаборатория зеленой торговой дипломатии (GTDL)</strong> – виртуальное пространство, где молодежь моделирует экологически чистую дипломатию и торговлю",
          "<strong>EARTHNET</strong> – система на базе искусственного интеллекта для обнаружения экологических угроз",
        ],
      },
      footer: [
        "В 2024 году я работала онлайн-волонтером ООН, внося вклад в глобальные усилия по развитию.",
        "Для меня экономика строит будущее – а дипломатия его защищает.",
      ],
    },
  }

  // Get content based on current language
  const content = aboutContent[language]

  return (
    <div className="container mx-auto px-6 py-16">
      <motion.div
        className="mx-auto flex max-w-7xl flex-col items-start gap-12 rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-900 md:flex-row md:items-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Rasm */}
        <div className="w-full max-h-[590px] flex-shrink-0 overflow-hidden rounded-xl border border-gray-200 shadow-md dark:border-gray-700 md:w-[420px]">
          <img
            src="https://github.com/Xusanbek0039/shoira-blog.uz/blob/main/images/shoira_photo.png?raw=true"
            alt={content.title}
            className="h-auto w-full object-cover"
            loading="lazy"
            style={{ aspectRatio: "720 / 1166" }}
          />
        </div>

        {/* Matn */}
        <section className="prose prose-lg flex-1 max-w-none text-gray-700 dark:prose-invert dark:text-gray-300">
          <h1 className="mb-8 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">{content.title}</h1>

          {content.bio.map((paragraph, index) => (
            <p key={`bio-${index}`}>{paragraph}</p>
          ))}

          <h2 className="mt-8 mb-3 text-2xl font-semibold text-gray-900 dark:text-gray-100">
            {content.initiatives.title}
          </h2>
          <ul className="list-inside list-disc space-y-2">
            {content.initiatives.items.map((item, index) => (
              <li key={`initiative-${index}`} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </ul>

          {content.footer.map((paragraph, index) => (
            <p key={`footer-${index}`} className={index === 0 ? "mt-6" : ""}>
              {paragraph}
            </p>
          ))}
        </section>
      </motion.div>
    </div>
  )
}
