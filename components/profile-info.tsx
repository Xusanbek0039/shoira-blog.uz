"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { updateUserProfile } from "@/utils/api"
import type { User } from "@/types"
import { useAuth } from "@/context/auth-context"
import { useLanguage } from "@/context/language-context"

interface ProfileInfoProps {
  user: User | null
}

export default function ProfileInfo({ user }: ProfileInfoProps) {
  const { updateUser } = useAuth()
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)
    setLoading(true)

    try {
      const response = await updateUserProfile(formData)
      setSuccess(true)

      // Update user in auth context
      if (updateUser && response.user) {
        updateUser(response.user)
      }
    } catch (err: any) {
      setError(err.message || t("profile.updateError"))
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
          <AlertDescription>{t("profile.updateSuccess")}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">{t("profile.name")}</Label>
          <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? t("profile.saving") : t("profile.save")}
        </Button>
      </form>
    </div>
  )
}
