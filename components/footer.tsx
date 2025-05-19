"use client"

import Link from "next/link"
import {
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
  Home,
  User,
} from "lucide-react"
import { useLanguage } from "@/context/language-context"

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t bg-background">
      <div className="container px-4 py-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 flex items-center text-lg font-bold">
              <img
                src="https://github.com/Xusanbek0039/shoira-blog.uz/blob/main/images/logo.png?raw=true"
                alt="Shoira Blog Logo"
                className="mr-2 h-6 w-auto"
              />
              Shoira-blog.uz
            </h3>
            <p className="text-sm text-muted-foreground">
              Bu yerda men o'z fiklarim, loyihalarim va tajribalarim bilan o'rtoqlashaman.
            </p>
          </div>
          <div>
            <h3 className="mb-4 flex items-center text-lg font-bold">
              <BookText className="mr-2 h-5 w-5 text-primary" />
              {t("footer.pages")}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="flex items-center text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Home className="mr-2 h-4 w-4" />
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="flex items-center text-muted-foreground transition-colors hover:text-foreground"
                >
                  <User className="mr-2 h-4 w-4" />
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/articles"
                  className="flex items-center text-muted-foreground transition-colors hover:text-foreground"
                >
                  <BookCopy className="mr-2 h-4 w-4" />
                  {t("nav.articles")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="flex items-center text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Bookmark className="mr-2 h-4 w-4" />
                  {t("nav.contact")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 flex items-center text-lg font-bold">
              <Library className="mr-2 h-5 w-5 text-primary" />
              {t("footer.social")}
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
              {t("footer.contact")}
            </h3>
            <address className="not-italic">
              <p className="mb-2 flex items-center text-sm text-muted-foreground">
                <Mail className="mr-2 h-4 w-4" />
                Email: info@shoira-blog.uz
              </p>
              <p className="mb-2 flex items-center text-sm text-muted-foreground">
                <Phone className="mr-2 h-4 w-4" />
                Telefon: +998 90 123 45 67
              </p>
              <p className="flex items-center text-sm text-muted-foreground">
                <MapPin className="mr-2 h-4 w-4" />
                Manzil: Toshkent, O'zbekiston
              </p>
            </address>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center">
            <img
              src="https://github.com/Xusanbek0039/shoira-blog.uz/blob/main/images/logo.png?raw=true"
              alt="Shoira Blog Logo"
              className="mr-2 h-4 w-auto"
            />
            © {new Date().getFullYear()} Shoira-blog.uz. {t("footer.rights")}.
          </p>
        </div>
      </div>
    </footer>
  )
}
