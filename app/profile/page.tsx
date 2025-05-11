"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/hooks/use-auth"
import { Eye, EyeOff, Upload } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ProfilePage() {
  const { user, isLoading, logout } = useAuth()
  const router = useRouter()

  const [name, setName] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email || "")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const [updateError, setUpdateError] = useState("")
  const [profileImage, setProfileImage] = useState<string | null>(null)

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login")
    }

    // Load profile image from localStorage if exists
    const storedProfileImage = localStorage.getItem("profileImage")
    if (storedProfileImage) {
      setProfileImage(storedProfileImage)
    }
  }, [isLoading, user, router])

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const imageDataUrl = reader.result as string
        setProfileImage(imageDataUrl)
        // Save to localStorage
        localStorage.setItem("profileImage", imageDataUrl)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setUpdateError("")
    setUpdateSuccess(false)

    setIsUpdating(true)

    try {
      // This would normally be an API call to update the profile
      // For demo purposes, we'll simulate a successful update
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update user in localStorage
      if (user) {
        const updatedUser = {
          ...user,
          name: name,
          email: email,
        }
        localStorage.setItem("user", JSON.stringify(updatedUser))
      }

      setUpdateSuccess(true)
    } catch (err) {
      setUpdateError("Profilni yangilashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.")
    } finally {
      setIsUpdating(false)
    }
  }

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setUpdateError("")
    setUpdateSuccess(false)

    if (newPassword !== confirmPassword) {
      setUpdateError("Yangi parollar mos kelmadi")
      return
    }

    setIsUpdating(true)

    try {
      // This would normally be an API call to update the password
      // For demo purposes, we'll simulate a successful update
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setUpdateSuccess(true)
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (err) {
      setUpdateError("Parolni yangilashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.")
    } finally {
      setIsUpdating(false)
    }
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow py-12">
        <div className="container px-4 md:px-6 max-w-4xl">
          <h1 className="text-3xl font-bold tracking-tighter mb-8 text-sky-800 dark:text-sky-300">
            Profil sozlamalari
          </h1>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="profile">Profil ma'lumotlari</TabsTrigger>
              <TabsTrigger value="password">Parolni o'zgartirish</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profil ma'lumotlari</CardTitle>
                  <CardDescription>Profil ma'lumotlaringizni yangilang</CardDescription>
                </CardHeader>
                <CardContent>
                  {updateSuccess && (
                    <Alert className="bg-green-50 text-green-600 border-green-500 dark:bg-green-950/30 dark:text-green-400 dark:border-green-800 mb-6">
                      <AlertDescription>Profil ma'lumotlari muvaffaqiyatli yangilandi.</AlertDescription>
                    </Alert>
                  )}

                  {updateError && (
                    <Alert variant="destructive" className="mb-6">
                      <AlertDescription>{updateError}</AlertDescription>
                    </Alert>
                  )}

                  <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="profile-image">Profil rasmi</Label>
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                          {profileImage ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={profileImage || "/placeholder.svg"}
                              alt="Profile"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-2xl font-bold text-muted-foreground">
                              {name.charAt(0).toUpperCase()}
                            </span>
                          )}
                        </div>
                        <Label
                          htmlFor="profile-image"
                          className="flex items-center gap-2 px-4 py-2 border rounded-md cursor-pointer hover:bg-muted dark:hover:bg-gray-800"
                        >
                          <Upload className="h-4 w-4" />
                          <span>Rasm tanlash</span>
                        </Label>
                        <Input
                          id="profile-image"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleProfileImageChange}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="name">Ism</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="dark:bg-gray-900"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="dark:bg-gray-900"
                      />
                    </div>
                    <Button type="submit" className="bg-sky-600 hover:bg-sky-700" disabled={isUpdating}>
                      {isUpdating ? "Saqlanmoqda..." : "Saqlash"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="password">
              <Card>
                <CardHeader>
                  <CardTitle>Parolni o'zgartirish</CardTitle>
                  <CardDescription>Hisobingiz xavfsizligini ta'minlash uchun parolingizni o'zgartiring</CardDescription>
                </CardHeader>
                <CardContent>
                  {updateSuccess && (
                    <Alert className="bg-green-50 text-green-600 border-green-500 dark:bg-green-950/30 dark:text-green-400 dark:border-green-800 mb-6">
                      <AlertDescription>Parol muvaffaqiyatli yangilandi.</AlertDescription>
                    </Alert>
                  )}

                  {updateError && (
                    <Alert variant="destructive" className="mb-6">
                      <AlertDescription>{updateError}</AlertDescription>
                    </Alert>
                  )}

                  <form onSubmit={handlePasswordUpdate} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Joriy parol</Label>
                      <div className="relative">
                        <Input
                          id="current-password"
                          type={showPassword ? "text" : "password"}
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className="dark:bg-gray-900"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          <span className="sr-only">{showPassword ? "Parolni yashirish" : "Parolni ko'rsatish"}</span>
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">Yangi parol</Label>
                      <div className="relative">
                        <Input
                          id="new-password"
                          type={showPassword ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="dark:bg-gray-900"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Yangi parolni tasdiqlang</Label>
                      <div className="relative">
                        <Input
                          id="confirm-password"
                          type={showPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="dark:bg-gray-900"
                        />
                      </div>
                    </div>
                    <Button type="submit" className="bg-sky-600 hover:bg-sky-700" disabled={isUpdating}>
                      {isUpdating ? "Saqlanmoqda..." : "Parolni o'zgartirish"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-8">
            <Button variant="destructive" onClick={handleLogout}>
              Chiqish
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
