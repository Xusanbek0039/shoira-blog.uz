"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    if (!name || !email || !message) {
      setError("Iltimos, barcha maydonlarni to'ldiring")
      return
    }

    setIsLoading(true)

    try {
      // This would normally be an API call to send the message
      // For demo purposes, we'll simulate a successful submission
      setTimeout(() => {
        setSuccess(true)
        setName("")
        setEmail("")
        setMessage("")
        setIsLoading(false)
      }, 1000)
    } catch (err) {
      setError("Xabarni yuborishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.")
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <section className="w-full py-12 md:py-24 bg-gradient-to-b from-sky-50 to-white dark:from-sky-950 dark:to-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl text-sky-800 dark:text-sky-300">Aloqa</h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Men bilan bog'lanish uchun quyidagi forma yoki kontakt ma'lumotlaridan foydalaning
              </p>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Xabar yuborish</CardTitle>
                  <CardDescription>Savollaringiz yoki takliflaringiz bo'lsa, menga xabar yuboring</CardDescription>
                </CardHeader>
                <CardContent>
                  {success && (
                    <div className="bg-green-50 text-green-600 dark:bg-green-950/30 dark:text-green-400 p-4 rounded-md mb-6 text-sm">
                      Xabaringiz muvaffaqiyatli yuborildi. Tez orada siz bilan bog'lanamiz.
                    </div>
                  )}

                  {error && (
                    <div className="bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400 p-4 rounded-md mb-6 text-sm">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Ism</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ismingizni kiriting"
                        className="dark:bg-gray-800"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email@example.com"
                        className="dark:bg-gray-800"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Xabar</Label>
                      <Textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Xabaringizni kiriting"
                        className="min-h-[150px] dark:bg-gray-800"
                      />
                    </div>
                    <Button type="submit" className="w-full bg-sky-600 hover:bg-sky-700" disabled={isLoading}>
                      {isLoading ? "Yuborilmoqda..." : "Yuborish"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-sky-800 dark:text-sky-300">Kontakt ma'lumotlari</h2>
                  <p className="text-muted-foreground mb-6">
                    Quyidagi ma'lumotlar orqali men bilan bog'lanishingiz mumkin
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <Mail className="h-5 w-5 text-sky-600 dark:text-sky-400 mt-0.5" />
                      <div>
                        <h3 className="font-medium dark:text-white">Email</h3>
                        <p className="text-muted-foreground">info@shoira-blog.uz</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Phone className="h-5 w-5 text-sky-600 dark:text-sky-400 mt-0.5" />
                      <div>
                        <h3 className="font-medium dark:text-white">Telefon</h3>
                        <p className="text-muted-foreground">+998 90 123 45 67</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <MapPin className="h-5 w-5 text-sky-600 dark:text-sky-400 mt-0.5" />
                      <div>
                        <h3 className="font-medium dark:text-white">Manzil</h3>
                        <p className="text-muted-foreground">Toshkent, O'zbekiston</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4 text-sky-800 dark:text-sky-300">Ijtimoiy tarmoqlar</h2>
                  <p className="text-muted-foreground mb-6">Mening ijtimoiy tarmoqlardagi sahifalarim</p>

                  <div className="flex gap-4">
                    <Button variant="outline" className="w-full dark:border-gray-700">
                      Facebook
                    </Button>
                    <Button variant="outline" className="w-full dark:border-gray-700">
                      Instagram
                    </Button>
                    <Button variant="outline" className="w-full dark:border-gray-700">
                      Telegram
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}
