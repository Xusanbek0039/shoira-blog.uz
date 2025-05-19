"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Menu,
  X,
  Home,
  User,
  Briefcase,
  BookOpen,
  Library,
  Mail,
  FileText,
  Sun,
  Moon,
  Laptop,
  Bell,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/context/auth-context"
import { useLanguage } from "@/context/language-context"
import { ModeToggle } from "@/components/mode-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import LogoutConfirmation from "@/components/logout-confirmation"

// Flag image URLs
const FLAGS = {
  en: "https://sjc.microlink.io/GWEipgQATeo66nOnb58wiltNFjx6xejZHA8_8AVh9SUWRfwIIEoOvOFPNZoNsr1ubdXPwVMB8WFAHu8CZ2vJkQ.jpeg",
  uz: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxnZzwWkWhQKBKwX2xU_jDAVZZtO-6vgudnw&s",
  ru: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Russia-flag.png",
}

// Language display names and codes
const LANGUAGES = {
  en: { name: "English", code: "EN" },
  uz: { name: "Uzbek", code: "UZ" },
  ru: { name: "Русский", code: "RU" },
}

export default function Navbar() {
  const pathname = usePathname()
  const { user, isAuthenticated } = useAuth()
  const { t, language, setLanguage } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false)
  }, [pathname])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navItems = [
    { name: t("nav.home"), path: "/", icon: <Home className="h-4 w-4" /> },
    { name: t("nav.about"), path: "/about", icon: <User className="h-4 w-4" /> },
    { name: t("nav.projects"), path: "/projects", icon: <Briefcase className="h-4 w-4" /> },
    { name: t("nav.articles"), path: "/articles", icon: <BookOpen className="h-4 w-4" /> },
    { name: t("nav.portfolio"), path: "/portfolio", icon: <Library className="h-4 w-4" /> },
    { name: t("nav.contact"), path: "/contact", icon: <Mail className="h-4 w-4" /> },
  ]

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm transition-all ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center text-xl font-bold">
          <img
            src="https://github.com/Xusanbek0039/shoira-blog.uz/blob/main/images/logo.png?raw=true"
            alt="Shoira Blog Logo"
            className="mr-2 h-8 w-auto"
          />
          Shoira-blog.uz
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-1.5 text-sm transition-colors hover:text-primary ${
                pathname === item.path ? "font-medium text-primary" : "text-muted-foreground"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <LanguageToggle />
          <ModeToggle />
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {user?.name}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {t("user.profile")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/create" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    {t("user.newArticle")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/notifications" className="flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    {t("user.notifications")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <LogoutConfirmation />
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  {t("user.login")}
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">{t("user.register")}</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <LanguageToggle />
          <ModeToggle />
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-16 z-40 w-full bg-slate-900 md:hidden">
          <div className="container flex h-[calc(100vh-4rem)] flex-col bg-slate-900 px-4 py-6">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center rounded-md p-3 text-base transition-colors hover:bg-slate-800 ${
                    pathname === item.path ? "bg-slate-800 font-medium text-primary" : "text-slate-100"
                  }`}
                >
                  <span className="mr-3 flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                    {item.icon}
                  </span>
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="mt-auto space-y-4">
              {isAuthenticated ? (
                <>
                  <div className="mb-2 flex items-center gap-2 px-3">
                    <User className="h-5 w-5 text-slate-400" />
                    <span className="text-sm font-medium text-slate-100">{user?.name}</span>
                  </div>
                  <Link href="/profile">
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-slate-800 text-slate-100 hover:bg-slate-700"
                      size="lg"
                    >
                      <User className="mr-3 h-5 w-5" />
                      {t("user.profile")}
                    </Button>
                  </Link>
                  <Link href="/create">
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-slate-800 text-slate-100 hover:bg-slate-700"
                      size="lg"
                    >
                      <FileText className="mr-3 h-5 w-5" />
                      {t("user.newArticle")}
                    </Button>
                  </Link>
                  <Link href="/notifications">
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-slate-800 text-slate-100 hover:bg-slate-700"
                      size="lg"
                    >
                      <Bell className="mr-3 h-5 w-5" />
                      {t("user.notifications")}
                    </Button>
                  </Link>
                  <LogoutConfirmation variant="mobile" />
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link href="/login" className="w-full">
                    <Button variant="outline" className="w-full bg-slate-800 text-slate-100 hover:bg-slate-700">
                      {t("user.login")}
                    </Button>
                  </Link>
                  <Link href="/register" className="w-full">
                    <Button className="w-full">{t("user.register")}</Button>
                  </Link>
                </div>
              )}

              <div className="mt-4 rounded-lg border border-slate-700 bg-slate-800 p-4">
                <p className="mb-3 text-sm font-medium text-slate-100">{t("theme.light")}</p>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex flex-col items-center gap-1 bg-slate-800 p-3 text-slate-100 hover:bg-slate-700"
                    onClick={() => document.documentElement.classList.remove("dark")}
                  >
                    <Sun className="h-5 w-5" />
                    <span className="text-xs">{t("theme.light")}</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex flex-col items-center gap-1 bg-slate-800 p-3 text-slate-100 hover:bg-slate-700"
                    onClick={() => document.documentElement.classList.add("dark")}
                  >
                    <Moon className="h-5 w-5" />
                    <span className="text-xs">{t("theme.dark")}</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex flex-col items-center gap-1 bg-slate-800 p-3 text-slate-100 hover:bg-slate-700"
                    onClick={() => {
                      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
                        document.documentElement.classList.add("dark")
                      } else {
                        document.documentElement.classList.remove("dark")
                      }
                    }}
                  >
                    <Laptop className="h-5 w-5" />
                    <span className="text-xs">{t("theme.system")}</span>
                  </Button>
                </div>
              </div>

              <div className="mt-4 rounded-lg border border-slate-700 bg-slate-800 p-4">
                <p className="mb-3 text-sm font-medium text-slate-100">{t("lang.select")}</p>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className={`flex w-full items-center justify-between bg-slate-800 px-3 py-2 text-slate-100 hover:bg-slate-700 ${
                      language === "en" ? "border-primary" : "border-slate-700"
                    }`}
                    onClick={() => setLanguage("en")}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={FLAGS.en || "/placeholder.svg"}
                        alt="English"
                        className="h-5 w-5 rounded-full object-cover"
                      />
                      <span>English</span>
                    </div>
                    <span className="text-xs text-slate-400">(EN)</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`flex w-full items-center justify-between bg-slate-800 px-3 py-2 text-slate-100 hover:bg-slate-700 ${
                      language === "ru" ? "border-primary" : "border-slate-700"
                    }`}
                    onClick={() => setLanguage("ru")}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={FLAGS.ru || "/placeholder.svg"}
                        alt="Russian"
                        className="h-5 w-5 rounded-full object-cover"
                      />
                      <span>Русский</span>
                    </div>
                    <span className="text-xs text-slate-400">(RU)</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`flex w-full items-center justify-between bg-slate-800 px-3 py-2 text-slate-100 hover:bg-slate-700 ${
                      language === "uz" ? "border-primary" : "border-slate-700"
                    }`}
                    onClick={() => setLanguage("uz")}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={FLAGS.uz || "/placeholder.svg"}
                        alt="Uzbek"
                        className="h-5 w-5 rounded-full object-cover"
                      />
                      <span>Uzbek</span>
                    </div>
                    <span className="text-xs text-slate-400">(UZ)</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
