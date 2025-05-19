"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation" // Agar 'app' router ishlatayotgan bo‘lsangiz
// import { useRouter } from "next/router" // Agar 'pages' router bo‘lsa, shu qatorni oching
import { motion } from "framer-motion"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/auth-context"
import { useLanguage } from "@/context/language-context"
import ProfileInfo from "@/components/profile-info"
import PasswordChange from "@/components/password-change"
import UserPosts from "@/components/user-posts"
import UserPortfolio from "@/components/user-portfolio"
import TypingDotsLoader from "@/components/typing-dots-loader"

export default function ProfilePage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading } = useAuth()
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState("info")

  useEffect(() => {
    // Agar foydalanuvchi autentifikatsiyadan o‘tmagan bo‘lsa, login sahifasiga yo‘naltiramiz
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="container flex h-[calc(100vh-200px)] items-center justify-center">
        <TypingDotsLoader size="lg" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Redirekt bo‘ladi, hech narsa render qilinmaydi
  }

  const tabs = [
    { key: "info", label: t("profile.infoTab") },
    { key: "password", label: t("profile.passwordTab") },
    { key: "posts", label: t("profile.postsTab") },
    { key: "portfolio", label: t("profile.portfolioTab") },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case "info":
        return <ProfileInfo user={user} />
      case "password":
        return <PasswordChange />
      case "posts":
        return <UserPosts />
      case "portfolio":
        return <UserPortfolio />
      default:
        return null
    }
  }

  return (
    <div className="container px-4 py-12">
      <motion.div
        className="mx-auto max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{t("profile.title")}</CardTitle>
            <CardDescription>{t("profile.description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              {tabs.map((tab) => (
                <Button
                  key={tab.key}
                  variant={activeTab === tab.key ? "default" : "outline"}
                  onClick={() => setActiveTab(tab.key)}
                  className="w-full sm:w-auto flex-1 capitalize"
                >
                  {tab.label}
                </Button>
              ))}
            </div>

            <div className="mt-6">{renderTabContent()}</div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
