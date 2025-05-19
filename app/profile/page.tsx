"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
            <Tabs defaultValue="info" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="info">{t("profile.infoTab")}</TabsTrigger>
                <TabsTrigger value="password">{t("profile.passwordTab")}</TabsTrigger>
                <TabsTrigger value="posts">{t("profile.postsTab")}</TabsTrigger>
              </TabsList>
              <TabsContent value="info" className="mt-6">
                <ProfileInfo user={user} />
              </TabsContent>
              <TabsContent value="password" className="mt-6">
                <PasswordChange />
              </TabsContent>
              <TabsContent value="posts" className="mt-6">
                <UserPosts />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
