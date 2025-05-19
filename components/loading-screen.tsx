"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { BookOpen, BookText, Bookmark } from "lucide-react"

export default function LoadingScreen() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!show) return null

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      animate={{ opacity: show ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="relative h-24 w-24">
          <motion.div
            className="absolute left-0 top-0"
            animate={{
              rotateY: [0, 180],
              opacity: [1, 0.8, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            <BookOpen className="h-24 w-24 text-primary" strokeWidth={1.5} />
          </motion.div>
          <motion.div
            className="absolute left-0 top-0"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: 0.75,
            }}
          >
            <BookText className="h-24 w-24 text-primary" strokeWidth={1.5} />
          </motion.div>
        </div>
        <motion.p
          className="text-xl font-medium text-foreground"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          Page is loading, please wait...
        </motion.p>
        <div className="mt-4 flex space-x-2">
          <motion.div
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 0.6,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: 0,
            }}
          >
            <Bookmark className="h-6 w-6 text-primary" />
          </motion.div>
          <motion.div
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 0.6,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: 0.2,
            }}
          >
            <Bookmark className="h-6 w-6 text-primary" />
          </motion.div>
          <motion.div
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 0.6,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: 0.4,
            }}
          >
            <Bookmark className="h-6 w-6 text-primary" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
