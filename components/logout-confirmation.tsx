"use client"

import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useLanguage } from "@/context/language-context"
import { useAuth } from "@/context/auth-context"
import { useNotification } from "@/context/notification-context"
import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

interface LogoutConfirmationProps {
  variant?: "default" | "mobile"
  className?: string
}

export default function LogoutConfirmation({ variant = "default", className = "" }: LogoutConfirmationProps) {
  const [open, setOpen] = useState(false)
  const { t } = useLanguage()
  const { logout } = useAuth()
  const { addNotification } = useNotification()

  const handleLogout = () => {
    logout()
    addNotification("success", "auth.logoutSuccess")
    setOpen(false)
  }

  if (variant === "mobile") {
    return (
      <>
        <Button
          variant="outline"
          className={`w-full justify-start bg-gray-800 text-gray-100 hover:bg-gray-700 ${className}`}
          size="lg"
          onClick={() => setOpen(true)}
        >
          <LogOut className="mr-3 h-5 w-5" />
          {t("user.logout")}
        </Button>

        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t("logout.title")}</AlertDialogTitle>
              <AlertDialogDescription>{t("logout.description")}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
              <AlertDialogAction onClick={handleLogout}>{t("logout.confirm")}</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    )
  }

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setOpen(true)}
        className={`flex items-center gap-2 ${className}`}
      >
        <LogOut className="h-4 w-4" />
        {t("user.logout")}
      </Button>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("logout.title")}</AlertDialogTitle>
            <AlertDialogDescription>{t("logout.description")}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout}>{t("logout.confirm")}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
