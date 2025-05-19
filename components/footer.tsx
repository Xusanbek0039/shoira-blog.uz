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
              Bu yerda men o'z fiklarim, loyihalarim va tajribalarim bilan o'rtoqlashaman.
            </p>
          </div>
          <div>
            <h3 className="mb-4 flex items-center text-lg font-bold">
              <BookText className="mr-2 h-5 w-5 text-primary" />
              Sahifalar
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="flex items-center text-muted-foreground transition-colors hover:text-foreground"
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  Bosh sahifa
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="flex items-center text-muted-foreground transition-colors hover:text-foreground"
                >
                  <BookText className="mr-2 h-4 w-4" />
                  Men haqimda
                </Link>
              </li>
              <li>
                <Link
                  href="/articles"
                  className="flex items-center text-muted-foreground transition-colors hover:text-foreground"
                >
                  <BookCopy className="mr-2 h-4 w-4" />
                  Maqolalar
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="flex items-center text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Bookmark className="mr-2 h-4 w-4" />
                  Aloqa
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 flex items-center text-lg font-bold">
              <Library className="mr-2 h-5 w-5 text-primary" />
              Ijtimoiy tarmoqlar
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
              Aloqa
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
            <BookOpen className="mr-2 h-4 w-4" />© {new Date().getFullYear()} Shoira-blog.uz. Barcha huquqlar
            himoyalangan.
          </p>
        </div>
      </div>
    </footer>
  )
}
