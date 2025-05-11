"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import { Menu, X, Home, User, Briefcase, FileText, Palette, Mail, LogIn, PenLine, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { user, isLoading } = useAuth()
  const { theme, setTheme } = useTheme()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  // Close menu when path changes
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

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="font-bold text-xl text-sky-600">
            Shoira-blog.uz
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`text-sm font-medium transition-colors hover:text-sky-600 flex items-center ${
                pathname === item.path ? "text-sky-600" : "text-foreground"
              }`}
            >
              {item.name}
            </Link>
          ))}

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {!isLoading && (
            <>
              {user ? (
                <div className="flex items-center gap-4">
                  <Link href="/articles/new">
                    <Button
                      variant="outline"
                      className="text-sky-600 border-sky-600 hover:bg-sky-50 dark:hover:bg-sky-950 flex items-center gap-2"
                    >
                      <PenLine className="h-4 w-4" />
                      Post Joylash
                    </Button>
                  </Link>
                  <Link href="/profile">
                    <Button variant="ghost" className="text-sm flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Profil
                    </Button>
                  </Link>
                </div>
              ) : (
                <Link href="/auth/login">
                  <Button variant="default" className="bg-sky-600 hover:bg-sky-700 flex items-center gap-2">
                    <LogIn className="h-4 w-4" />
                    Kirish
                  </Button>
                </Link>
              )}
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu} aria-label={isMenuOpen ? "Close menu" : "Open menu"}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-50 bg-slate-950 dark:bg-slate-950 text-white flex flex-col animate-in slide-in-from-top-5">
          <div className="container flex justify-between items-center py-4 border-b border-slate-800">
            <Link href="/" className="font-bold text-xl text-sky-600" onClick={toggleMenu}>
              Shoira-blog.uz
            </Link>
            <button onClick={toggleMenu} className="text-white">
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="container flex flex-col gap-6 p-6 flex-grow">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`text-lg font-medium transition-colors hover:text-sky-400 flex items-center ${
                  pathname === item.path ? "text-sky-400" : "text-white"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}

            <div className="flex justify-start py-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
                className="rounded-full w-10 h-10 border-slate-700 bg-slate-900"
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-white" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-white" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </div>

            {!isLoading && (
              <>
                {user ? (
                  <div className="flex flex-col gap-4 mt-4">
                    <Link href="/articles/new">
                      <Button
                        variant="outline"
                        className="w-full text-sky-400 border-sky-800 hover:bg-slate-900 flex items-center justify-center gap-2"
                      >
                        <PenLine className="h-5 w-5" />
                        Post Joylash
                      </Button>
                    </Link>
                    <Link href="/profile">
                      <Button
                        variant="ghost"
                        className="w-full flex items-center justify-center gap-2 text-white hover:bg-slate-900"
                      >
                        <User className="h-5 w-5" />
                        Profil
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <Link href="/auth/login" className="mt-4">
                    <Button
                      variant="default"
                      className="w-full bg-sky-600 hover:bg-sky-700 flex items-center justify-center gap-2"
                    >
                      <LogIn className="h-5 w-5" />
                      Kirish
                    </Button>
                  </Link>
                )}
              </>
            )}

            {/* Input fields for article creation */}
            <div className="mt-6 space-y-4">
              <div>
                <label className="text-sm text-slate-400 mb-1 block">Maqola sarlavhasi</label>
                <input
                  type="text"
                  placeholder="Maqola sarlavhasini kiriting"
                  className="w-full bg-slate-900 border border-slate-800 rounded-md p-2 text-white"
                />
              </div>

              <div>
                <label className="text-sm text-slate-400 mb-1 block">Maqola matni</label>
                <textarea
                  placeholder="Maqola matnini kiriting"
                  className="w-full bg-slate-900 border border-slate-800 rounded-md p-2 text-white min-h-[100px]"
                ></textarea>
              </div>

              <div>
                <label className="text-sm text-slate-400 mb-1 block">Rasm tanlash</label>
                <Button variant="outline" className="w-full border-slate-800 text-white hover:bg-slate-900">
                  Rasm tanlash
                </Button>
              </div>
            </div>
          </nav>

          {/* Post button at the bottom */}
          <div className="border-t border-slate-800 p-6">
            <Button className="w-full bg-sky-600 hover:bg-sky-700 flex items-center justify-center gap-2">
              <PenLine className="h-5 w-5" />
              Post Joylash
            </Button>
          </div>

          {/* Logo at the bottom */}
          <div className="border-t border-slate-800 p-6 flex justify-center">
            <Link href="/" className="font-bold text-xl text-sky-600" onClick={toggleMenu}>
              Shoira-blog.uz
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
