"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/context/language-context"

interface TypingDotsLoaderProps {
  text?: string
  size?: "sm" | "md" | "lg"
  color?: string
}

export default function TypingDotsLoader({ text, size = "md", color }: TypingDotsLoaderProps) {
  const { t } = useLanguage()
  const loadingText = text || t("common.loading") || "Loading..."

  const dotSize = {
    sm: "h-1 w-1",
    md: "h-2 w-2",
    lg: "h-3 w-3",
  }

  const containerSize = {
    sm: "h-6",
    md: "h-8",
    lg: "h-10",
  }

  const textSize = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  }

  const dotColor = color || "bg-primary"

  return (
    <div className={`flex flex-col items-center justify-center ${containerSize[size]}`}>
      <div className="flex items-center">
        <span className={`font-medium ${textSize[size]}`}>{loadingText}</span>
        <div className="ml-2 flex items-center space-x-1">
          <motion.div
            className={`rounded-full ${dotSize[size]} ${dotColor}`}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.4, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", times: [0, 0.5, 1] }}
          />
          <motion.div
            className={`rounded-full ${dotSize[size]} ${dotColor}`}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{
              duration: 1.4,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              delay: 0.2,
              times: [0, 0.5, 1],
            }}
          />
          <motion.div
            className={`rounded-full ${dotSize[size]} ${dotColor}`}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{
              duration: 1.4,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              delay: 0.4,
              times: [0, 0.5, 1],
            }}
          />
        </div>
      </div>
    </div>
  )
}
