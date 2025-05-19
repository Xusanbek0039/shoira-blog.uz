"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { registerUser } from "@/utils/api"
import { checkPasswordStrength } from "@/utils/password-strength"
import { useLanguage } from "@/context/language-context"
import { useNotification } from "@/context/notification-context"

export default function RegisterPage() {
  const router = useRouter()
  const { login } = useAuth()
  const { t } = useLanguage()
  const { addNotification } = useNotification()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (name === "password") {
      setPasswordStrength(checkPasswordStrength(value))
    }
  }

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 30) return "bg-red-500"
    if (passwordStrength < 60) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getPasswordStrengthText = () => {
    if (passwordStrength < 30) return t("password.weak")
    if (passwordStrength < 60) return t("password.medium")
    return t("password.strong")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (formData.password !== formData.confirmPassword) {
      setError(t("password.mismatch"))
      return
    }

    if (passwordStrength < 30) {
      setError(t("password.tooWeak"))
      return
    }

    setLoading(true)

    try {
      const data = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      })
      login(data.token, data.user)
      addNotification("success", "auth.registerSuccess")
      router.push("/")
    } catch (err: any) {
      setError(err.message || t("auth.registerError"))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container flex h-[calc(100vh-200px)] items-center justify-center px-4 py-12">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{t("user.register")}</CardTitle>
            <CardDescription>{t("auth.registerDescription")}</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">{t("profile.name")}</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder={t("auth.namePlaceholder")}
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={t("contact.emailPlaceholder")}
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">{t("auth.password")}</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                  />
                  {formData.password && (
                    <div className="mt-2">
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-xs">{t("password.strength")}:</span>
                        <span className="text-xs font-medium">{getPasswordStrengthText()}</span>
                      </div>
                      <Progress value={passwordStrength} className={`h-2 w-full ${getPasswordStrengthColor()}`} />
                    </div>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">{t("password.confirm")}</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    minLength={6}
                  />
                </div>
                <Button type="submit" disabled={loading}>
                  {loading ? t("auth.registering") : t("user.register")}
                </Button>
                
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              {t("auth.haveAccount")}{" "}
              <Link href="/login" className="font-medium text-primary underline-offset-4 hover:underline">
                {t("user.login")}
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
