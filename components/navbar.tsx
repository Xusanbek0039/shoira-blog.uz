"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import {
  Menu, X, Home, User, Briefcase, FileText,
  Palette, Mail, LogIn, PenLine, Sun, Moon
} from "lucide-react"
import { useTheme } from "next-themes"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { user, isLoading } = useAuth()
  const { theme, setTheme } = useTheme()

  const toggleMenu = () => setIsMenuOpen(prev => !prev)

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const navItems = [
    { name: "Bosh sahifa", path: "/", icon: <Home className="h-4 w-4 mr-2" /> },
    { name: "Men haqimda", path: "/about", icon: <User className="h-4 w-4 mr-2" /> },
    { name: "Loyihalarim", path: "/projects", icon: <Briefcase className="h-4 w-4 mr-2" /> },
    { name: "Maqolalar", path: "/articles", icon: <FileText className="h-4 w-4 mr-2" /> },
    { name: "Portfolio", path: "/portfolio", icon: <Palette className="h-4 w-4 mr-2" /> },
    { name: "Aloqa", path: "/contact", icon: <Mail className="h-4 w-4 mr-2" /> },
  ]

  const renderThemeToggle = (
    <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Toggle theme">
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  )

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-gray-100/90 dark:bg-gray-900/90 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-bold text-xl text-sky-600">Shoira-blog.uz</Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map(({ name, path }) => (
            <Link key={path} href={path}
              className={`text-sm font-medium transition hover:text-sky-600 flex items-center ${pathname === path ? "text-sky-600" : "text-foreground"}`}>
              {name}
            </Link>
          ))}

          {renderThemeToggle}

          {!isLoading && (
            user ? (
              <>
                <Link href="/articles/new">
                  <Button variant="outline" className="text-sky-600 border-sky-600 hover:bg-sky-50 dark:hover:bg-sky-950 flex gap-2">
                    <PenLine className="h-4 w-4" /> Post Joylash
                  </Button>
                </Link>
                <Link href="/profile">
                  <Button variant="ghost" className="flex gap-2">
                    <User className="h-4 w-4" /> Profil
                  </Button>
                </Link>
              </>
            ) : (
              <Link href="/auth/login">
                <Button variant="default" className="bg-sky-600 hover:bg-sky-700 flex gap-2">
                  <LogIn className="h-4 w-4" /> Kirish
                </Button>
              </Link>
            )
          )}
        </nav>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-50 bg-gray-100 dark:bg-gray-900 flex flex-col animate-in slide-in-from-top-5">
          <div className="container flex justify-between items-center py-4 border-b border-slate-800">
            <Link href="/" className="font-bold text-xl text-sky-600" onClick={toggleMenu}>Shoira-blog.uz</Link>
            <button onClick={toggleMenu}><X className="h-6 w-6 text-white" /></button>
          </div>

          <nav className="container flex flex-col gap-6 p-6 flex-grow">
            {navItems.map(({ name, path, icon }) => (
              <Link key={path} href={path} className={`text-lg font-medium flex items-center transition ${pathname === path ? "text-sky-400" : "text-white"}`}>
                {icon} {name}
              </Link>
            ))}

            <div className="py-2">{renderThemeToggle}</div>

            {!isLoading && (
              user ? (
                <div className="flex flex-col gap-4 mt-4">
                  <Link href="/articles/new">
                    <Button variant="outline" className="w-full text-sky-400 border-sky-800 hover:bg-slate-900 flex gap-2 justify-center">
                      <PenLine className="h-5 w-5" /> Post Joylash
                    </Button>
                  </Link>
                  <Link href="/profile">
                    <Button variant="ghost" className="w-full text-white hover:bg-slate-900 flex gap-2 justify-center">
                      <User className="h-5 w-5" /> Profil
                    </Button>
                  </Link>
                </div>
              ) : (
                <Link href="/auth/login" className="mt-4">
                  <Button variant="default" className="w-full bg-sky-600 hover:bg-sky-700 flex gap-2 justify-center">
                    <LogIn className="h-5 w-5" /> Kirish
                  </Button>
                </Link>
              )
            )}

            {/* Optional: Maqola formasi (mobildagi tez post uchun) */}
            <div className="mt-6 space-y-4">
              <div>
                <label className="text-sm text-slate-400">Maqola sarlavhasi</label>
                <input type="text" placeholder="Sarlavha" className="w-full bg-slate-900 border border-slate-800 rounded-md p-2 text-white" />
              </div>
              <div>
                <label className="text-sm text-slate-400">Maqola matni</label>
                <textarea placeholder="Matn" className="w-full bg-slate-900 border border-slate-800 rounded-md p-2 text-white min-h-[100px]" />
              </div>
              <div>
                <label className="text-sm text-slate-400">Rasm tanlash</label>
                <Button variant="outline" className="w-full border-slate-800 text-white hover:bg-slate-900">Rasm tanlash</Button>
              </div>
            </div>

            <Button className="w-full mt-4 bg-sky-600 hover:bg-sky-700 flex gap-2 justify-center">
              <PenLine className="h-5 w-5" /> Post Joylash
            </Button>
          </nav>

          <div className="border-t border-slate-800 p-6 flex justify-center">
            <Link href="/" className="font-bold text-xl text-sky-600" onClick={toggleMenu}>Shoira-blog.uz</Link>
          </div>
        </div>
      )}
    </header>
  )
}
