"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { changePassword } from "@/utils/api"
import { checkPasswordStrength } from "@/utils/password-strength"
import { useLanguage } from "@/context/language-context"

export default function PasswordChange() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (name === "newPassword") {
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
    setSuccess(false)

    if (formData.newPassword !== formData.confirmPassword) {
      setError(t("password.mismatch"))
      return
    }

    if (passwordStrength < 30) {
      setError(t("password.tooWeak"))
      return
    }

    setLoading(true)

    try {
      await changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      })
      setSuccess(true)
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
      setPasswordStrength(0)
    } catch (err: any) {
      setError(err.message || t("password.changeError"))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="mb-4">
          <AlertDescription>{t("password.changeSuccess")}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="currentPassword">{t("password.current")}</Label>
          <Input
            id="currentPassword"
            name="currentPassword"
            type="password"
            value={formData.currentPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="newPassword">{t("password.new")}</Label>
          <Input
            id="newPassword"
            name="newPassword"
            type="password"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />
          {formData.newPassword && (
            <div className="mt-2">
              <div className="mb-1 flex items-center justify-between">
                <span className="text-xs">{t("password.strength")}:</span>
                <span className="text-xs font-medium">{getPasswordStrengthText()}</span>
              </div>
              <Progress value={passwordStrength} className={`h-2 w-full ${getPasswordStrengthColor()}`} />
            </div>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">{t("password.confirm")}</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? t("password.changing") : t("password.change")}
        </Button>
      </form>
    </div>
  )
}
