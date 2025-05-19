"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import {
  Menu,
  X,
  BookOpen,
  BookText,
  BookMarked,
  Library,
  Bookmark,
  BookCopy,
  User,
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
    // Close mobile menu on route change
    setIsMenuOpen(false)
  }, [pathname])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navItems = [
    { name: "Home", path: "/", icon: <BookOpen className="mr-1 h-4 w-4" /> },
    { name: "About Me", path: "/about", icon: <BookText className="mr-1 h-4 w-4" /> },
    { name: "Projects", path: "/projects", icon: <BookMarked className="mr-1 h-4 w-4" /> },
    { name: "Articles", path: "/articles", icon: <BookCopy className="mr-1 h-4 w-4" /> },
    { name: "Portfolio", path: "/portfolio", icon: <Library className="mr-1 h-4 w-4" /> },
    { name: "Contact", path: "/contact", icon: <Bookmark className="mr-1 h-4 w-4" /> },
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
        <nav className="hidden items-center gap-4 md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.path
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`
                  inline-flex items-center gap-1 rounded-md px-4 py-2 text-sm font-medium transition
                  ${
                    isActive
                      ? "bg-blue-600 text-white shadow-glow"
                      : "text-muted-foreground hover:bg-blue-100 hover:text-blue-700 hover:shadow-glow"
                  }
                `}
                style={{
                  transitionProperty: "background-color, box-shadow, color",
                  transitionDuration: "300ms",
                }}
              >
                {item.icon}
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* Desktop User Controls */}
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
                {/* <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem> */}
                <DropdownMenuItem asChild>
                  <Link href="/create">Create Article</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Register</Button>
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
          className="container md:hidden border-t border-gray-200 bg-white shadow-lg rounded-b-lg overflow-hidden"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex flex-col divide-y divide-gray-200">
            {navItems.map((item) => {
              const isActive = pathname === item.path
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`
                    flex items-center py-3 px-5 text-base font-medium rounded-none transition
                    ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:bg-blue-50"
                    }
                  `}
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </Link>
              )
            })}

            <div className="pt-4 px-5">
              {isAuthenticated ? (
                <>
                  <div className="mb-3 flex items-center gap-3">
                    <User className="h-5 w-5 text-blue-600" />
                    <span className="text-lg font-semibold text-gray-900">{user?.name}</span>
                  </div>
                  <div className="flex flex-col space-y-2">
                    {/* <Link href="/profile">
                      <Button variant="outline" className="w-full justify-start">
                        Profile
                      </Button>
                    </Link> */}
                    <Link href="/create">
                      <Button variant="outline" className="w-full justify-start flex items-center gap-2">
                        <BookText className="h-4 w-4" />
                        Create Article
                      </Button>
                    </Link>
                    <Button variant="ghost" className="w-full justify-start" onClick={logout}>
                      Logout
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link href="/login">
                    <Button variant="outline" className="w-full justify-start">
                      Login
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button className="w-full justify-start">Register</Button>
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
