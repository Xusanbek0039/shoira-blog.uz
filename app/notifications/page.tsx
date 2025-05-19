"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, Clock, FileText, User, UserPlus } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import TypingDotsLoader from "@/components/typing-dots-loader"

// Mock notifications data - in a real app, this would come from your API
const mockNotifications = [
  {
    id: "1",
    type: "article_edit",
    title: "notification.articleEdited",
    message: "notification.articleEditedMessage",
    date: "2023-05-15T10:30:00Z",
    read: false,
    data: {
      articleId: "123",
      articleTitle: "Web Development Trends 2023",
    },
  },
  {
    id: "2",
    type: "article_new",
    title: "notification.newArticle",
    message: "notification.newArticleMessage",
    date: "2023-05-14T14:20:00Z",
    read: true,
    data: {
      articleId: "124",
      articleTitle: "Getting Started with React",
    },
  },
  {
    id: "3",
    type: "login",
    title: "notification.newLogin",
    message: "notification.newLoginMessage",
    date: "2023-05-13T09:15:00Z",
    read: true,
    data: {
      device: "Chrome on Windows",
      location: "Tashkent, Uzbekistan",
    },
  },
  {
    id: "4",
    type: "register",
    title: "notification.welcome",
    message: "notification.welcomeMessage",
    date: "2023-05-10T16:45:00Z",
    read: true,
    data: {},
  },
]

export default function NotificationsPage() {
  const { t } = useLanguage()
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const [notifications, setNotifications] = useState(mockNotifications)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Redirect if not authenticated and not loading
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
      return
    }

    // Simulate loading notifications from API
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [isAuthenticated, isLoading, router])

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "article_edit":
        return <FileText className="h-5 w-5 text-blue-500" />
      case "article_new":
        return <FileText className="h-5 w-5 text-green-500" />
      case "login":
        return <User className="h-5 w-5 text-amber-500" />
      case "register":
        return <UserPlus className="h-5 w-5 text-purple-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat(t("locale") || "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  if (isLoading || loading) {
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
        className="mx-auto max-w-3xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{t("notification.title")}</CardTitle>
              <CardDescription>{t("notification.description")}</CardDescription>
            </div>
            {notifications.some((n) => !n.read) && (
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="text-sm font-medium text-primary hover:underline"
                onClick={markAllAsRead}
              >
                {t("notification.markAllAsRead")}
              </motion.button>
            )}
          </CardHeader>
          <CardContent>
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Bell className="mb-4 h-12 w-12 text-muted-foreground opacity-20" />
                <p className="text-lg font-medium">{t("notification.empty")}</p>
                <p className="text-sm text-muted-foreground">{t("notification.emptyDescription")}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`relative rounded-lg border p-4 transition-colors ${
                      notification.read ? "bg-background" : "bg-primary/5"
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    {!notification.read && (
                      <span className="absolute right-4 top-4 h-2 w-2 rounded-full bg-primary"></span>
                    )}
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <h3 className="mb-1 font-medium">{t(notification.title)}</h3>
                        <p className="text-sm text-muted-foreground">
                          {t(notification.message, { articleTitle: notification.data.articleTitle })}
                        </p>
                        <div className="mt-2 flex items-center text-xs text-muted-foreground">
                          <Clock className="mr-1 h-3 w-3" />
                          {formatDate(notification.date)}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
