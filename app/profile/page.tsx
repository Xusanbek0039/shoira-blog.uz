"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/auth-context"
import { useLanguage } from "@/context/language-context"
import ProfileInfo from "@/components/profile-info"
import PasswordChange from "@/components/password-change"
import UserPosts from "@/components/user-posts"
import TypingDotsLoader from "@/components/typing-dots-loader"

export default function ProfilePage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading } = useAuth()
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState("info")

  useEffect(() => {
    // Redirect if not authenticated and not loading
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="container flex h-[calc(100vh-200px)] items-center justify-center">
        <div className="text-center">
          <TypingDotsLoader size="lg" />
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Will redirect in useEffect
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
            <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 mb-6">
              <Button
                variant={activeTab === "info" ? "default" : "outline"}
                onClick={() => setActiveTab("info")}
                className="w-full justify-start sm:justify-center"
              >
                {t("profile.infoTab")}
              </Button>
              <Button
                variant={activeTab === "password" ? "default" : "outline"}
                onClick={() => setActiveTab("password")}
                className="w-full justify-start sm:justify-center"
              >
                {t("profile.passwordTab")}
              </Button>
              <Button
                variant={activeTab === "posts" ? "default" : "outline"}
                onClick={() => setActiveTab("posts")}
                className="w-full justify-start sm:justify-center"
              >
                {t("profile.postsTab")}
              </Button>
            </div>

            <div className="mt-6">
              {activeTab === "info" && <ProfileInfo user={user} />}
              {activeTab === "password" && <PasswordChange />}
              {activeTab === "posts" && <UserPosts />}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
