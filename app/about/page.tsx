"use client"

import { motion } from "framer-motion"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-6 py-16">
      <motion.div
        className="flex flex-col md:flex-row items-start md:items-center gap-12 max-w-7xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Rasm */}
        <div className="flex-shrink-0 w-full md:w-[420px] max-h-[590px] overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 shadow-md">
          <img
            src="https://github.com/Xusanbek0039/shoira-blog.uz/blob/main/images/shoira_photo.png?raw=true"
            alt="Shoira Abdurasulova"
            className="w-full h-auto object-cover"
            loading="lazy"
            style={{ aspectRatio: '720 / 1166' }}
          />
        </div>

        {/* Matn */}
        <section className="prose prose-lg max-w-none text-gray-700 dark:prose-invert dark:text-gray-300 flex-1">
          <h1 className="mb-8 text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Shoira Abdurasulova
          </h1>

          <p>
            I’m Shoira Abdurasulova – a youth leader who lives and breathes economics and diplomacy.
          </p>

          <p>
            Born in 2008 in Uzbekistan, I study at the Hamid Olimjon and Zulfiya Presidential Creativity School with a strong focus on global affairs. My core interests lie in economic policy, international relations, and sustainability.
          </p>

          <h2 className="mt-8 mb-3 text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Youth Initiatives
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Green Trade Diplomacy Lab (GTDL)</strong> – a virtual space where youth simulate eco-friendly diplomacy and trade
            </li>
            <li>
              <strong>EARTHNET</strong> – an AI-powered system to detect environmental threats
            </li>
          </ul>

          <p className="mt-6">
            In 2024, I served as a UN Online Volunteer, contributing to global development efforts.
          </p>

          <p>
            To me, economics builds futures – and diplomacy protects them.
          </p>
        </section>
      </motion.div>
    </div>
  )
}
