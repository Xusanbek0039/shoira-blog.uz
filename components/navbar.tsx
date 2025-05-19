"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/auth-context"
import { ModeToggle } from "@/components/mode-toggle"

export default function Navbar() {
  const pathname = usePathname()
  const { user, isAuthenticated, logout } = useAuth()
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
    { name: "Bosh sahifa", path: "/" },
    { name: "Men haqimda", path: "/about" },
    { name: "Loyihalarim", path: "/projects" },
    { name: "Maqolalar", path: "/articles" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Aloqa", path: "/contact" },
  ]

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm transition-all ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center text-xl font-bold">
          Shoira-blog.uz
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`text-sm transition-colors hover:text-primary ${
                pathname === item.path ? "font-medium text-primary" : "text-muted-foreground"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <ModeToggle />
          {isAuthenticated ? (
            <>
              <Link href="/create">
                <Button variant="outline" size="sm">
                  Maqola joylash
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={logout}>
                Chiqish
              </Button>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{user?.name}</span>
              </div>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Kirish
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Ro'yxatdan o'tish</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <ModeToggle />
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div
          className="container md:hidden"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex flex-col space-y-3 pb-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`py-2 text-sm transition-colors hover:text-primary ${
                  pathname === item.path ? "font-medium text-primary" : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-2">
              {isAuthenticated ? (
                <>
                  <div className="mb-3 flex items-center gap-2">
                    <span className="text-sm font-medium">{user?.name}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Link href="/create">
                      <Button variant="outline" className="w-full justify-start">
                        Maqola joylash
                      </Button>
                    </Link>
                    <Button variant="ghost" className="w-full justify-start" onClick={logout}>
                      Chiqish
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link href="/login">
                    <Button variant="outline" className="w-full justify-start">
                      Kirish
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button className="w-full justify-start">Ro'yxatdan o'tish</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </header>
  )
}
