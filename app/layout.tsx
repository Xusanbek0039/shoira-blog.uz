import type React from "react"
import type { Metadata } from "next/types"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/context/auth-context"
import { LanguageProvider } from "@/context/language-context"
import { NotificationProvider } from "@/context/notification-context"
import Footer from "@/components/footer"
import LoadingScreen from "@/components/loading-screen"
import ApiStatus from "@/components/api-status"
import { ErrorBoundary } from "@/components/error-boundary"
import Notifications from "@/components/notifications"

const inter = Inter({ subsets: ["latin", "cyrillic"] })

export const metadata: Metadata = {
  title: "Shoira-blog.uz",
  description: "Zamonaviy blog platformasi",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            <NotificationProvider>
              <AuthProvider>
                <ErrorBoundary>
                  <LoadingScreen />
                  <div className="flex min-h-screen flex-col">
                    <Navbar />
                    <main className="flex-1">{children}</main>
                    <Footer />
                    <ApiStatus />
                    <Notifications />
                  </div>
                </ErrorBoundary>
              </AuthProvider>
            </NotificationProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
