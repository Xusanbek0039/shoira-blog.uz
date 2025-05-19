"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Menu, X, BookOpen, BookText, BookMarked, Library, Bookmark, BookCopy, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
    { name: "Bosh sahifa", path: "/", icon: <BookOpen className="mr-1 h-4 w-4" /> },
    { name: "Men haqimda", path: "/about", icon: <BookText className="mr-1 h-4 w-4" /> },
    { name: "Loyihalarim", path: "/projects", icon: <BookMarked className="mr-1 h-4 w-4" /> },
    { name: "Maqolalar", path: "/articles", icon: <BookCopy className="mr-1 h-4 w-4" /> },
    { name: "Portfolio", path: "/portfolio", icon: <Library className="mr-1 h-4 w-4" /> },
    { name: "Aloqa", path: "/contact", icon: <Bookmark className="mr-1 h-4 w-4" /> },
  ]

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm transition-all ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center text-xl font-bold">
          <BookOpen className="mr-2 h-6 w-6 text-primary" />
          Shoira-blog.uz
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center text-sm transition-colors hover:text-primary ${
                pathname === item.path ? "font-medium text-primary" : "text-muted-foreground"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
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
                  <Link href="/profile">Shaxsiy kabinet</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/create">Maqola joylash</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>Chiqish</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
                className={`flex items-center py-2 text-sm transition-colors hover:text-primary ${
                  pathname === item.path ? "font-medium text-primary" : "text-muted-foreground"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
            <div className="pt-2">
              {isAuthenticated ? (
                <>
                  <div className="mb-3 flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="text-sm font-medium">{user?.name}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Link href="/profile">
                      <Button variant="outline" className="w-full justify-start">
                        Shaxsiy kabinet
                      </Button>
                    </Link>
                    <Link href="/create">
                      <Button variant="outline" className="w-full justify-start">
                        <BookText className="mr-2 h-4 w-4" />
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
