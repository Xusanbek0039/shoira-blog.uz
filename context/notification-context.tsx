"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useLanguage } from "@/context/language-context"

export type NotificationType = "success" | "error" | "info" | "warning"

export interface Notification {
  id: string
  type: NotificationType
  message: string
  duration?: number
}

interface NotificationContextType {
  notifications: Notification[]
  addNotification: (type: NotificationType, messageKey: string, duration?: number) => void
  removeNotification: (id: string) => void
  clearNotifications: () => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const { t } = useLanguage()

  // Auto-remove notifications after their duration
  useEffect(() => {
    if (notifications.length === 0) return

    const timers = notifications.map((notification) => {
      const duration = notification.duration || 5000 // Default 5 seconds
      return setTimeout(() => {
        removeNotification(notification.id)
      }, duration)
    })

    return () => {
      timers.forEach((timer) => clearTimeout(timer))
    }
  }, [notifications])

  const addNotification = (type: NotificationType, messageKey: string, duration = 5000) => {
    const id = Date.now().toString()
    const message = t(messageKey)

    setNotifications((prev) => [
      ...prev,
      {
        id,
        type,
        message,
        duration,
      },
    ])
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  const clearNotifications = () => {
    setNotifications([])
  }

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        removeNotification,
        clearNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotification() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotification must be used within a NotificationProvider")
  }
  return context
}
