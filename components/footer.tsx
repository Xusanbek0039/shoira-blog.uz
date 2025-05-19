"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import {
  BookOpen,
  Mail,
  Phone,
  MapPin,
  BookText,
  Library,
  Bookmark,
  BookCopy,
  Github,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react"

export default function Footer() {
  const [currentTime, setCurrentTime] = useState("")

  useEffect(() => {
    function updateTime() {
      const now = new Date()
      const hours = now.getHours().toString().padStart(2, "0")
      const minutes = now.getMinutes().toString().padStart(2, "0")
      const seconds = now.getSeconds().toString().padStart(2, "0")
      setCurrentTime(`${hours}:${minutes}:${seconds}`)
    }

    updateTime()
    const intervalId = setInterval(updateTime, 1000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <footer className="border-t bg-background">
      <div className="container px-4 py-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 flex items-center text-lg font-bold">
              <BookOpen className="mr-2 h-5 w-5 text-primary" />
              Shoira-blog.uz
            </h3>
            <p className="text-sm text-muted-foreground">
              This site is designed for a personal blog. This is where I keep my personal blog posts.
            </p>
            <p className="mt-2 text-sm font-mono text-green-600">
              Current time: {currentTime}
            </p>
          </div>

          <div>
            <h3 className="mb-4 flex items-center text-lg font-bold">
              <BookText className="mr-2 h-5 w-5 text-primary" />
              Pages
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="flex items-center text-muted-foreground transition-colors hover:text-foreground"
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="flex items-center text-muted-foreground transition-colors hover:text-foreground"
                >
                  <BookText className="mr-2 h-4 w-4" />
                  About Me
                </Link>
              </li>
              <li>
                <Link
                  href="/articles"
                  className="flex items-center text-muted-foreground transition-colors hover:text-foreground"
                >
                  <BookCopy className="mr-2 h-4 w-4" />
                  Articles
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="flex items-center text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Bookmark className="mr-2 h-4 w-4" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 flex items-center text-lg font-bold">
              <Library className="mr-2 h-5 w-5 text-primary" />
              Social Networks
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Twitter className="mr-2 h-4 w-4" />
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Instagram className="mr-2 h-4 w-4" />
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Linkedin className="mr-2 h-4 w-4" />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 flex items-center text-lg font-bold">
              <Bookmark className="mr-2 h-5 w-5 text-primary" />
              Contact
            </h3>
            <address className="not-italic">
              <p className="mb-2 flex items-center text-sm text-muted-foreground">
                <Mail className="mr-2 h-4 w-4" />
                Email: info@shoira-blog.uz
              </p>
              <p className="mb-2 flex items-center text-sm text-muted-foreground">
                <Phone className="mr-2 h-4 w-4" />
                Phone: +998 90 123 45 67
              </p>
              <p className="flex items-center text-sm text-muted-foreground">
                <MapPin className="mr-2 h-4 w-4" />
                Address: Tashkent, Uzbekistan
              </p>
            </address>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center">
            <BookOpen className="mr-2 h-4 w-4" />© {new Date().getFullYear()} Shoira-blog.uz. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
