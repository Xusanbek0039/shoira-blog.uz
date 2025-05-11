import Link from "next/link"

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container flex flex-col md:flex-row items-center justify-between py-10 gap-4">
        <div className="flex flex-col items-center md:items-start">
          <Link href="/" className="font-bold text-xl text-sky-600">
            Shoira-blog.uz
          </Link>
          <p className="text-sm text-muted-foreground mt-2">
            &copy; {new Date().getFullYear()} Shoira-blog.uz. Barcha huquqlar himoyalangan.
          </p>
        </div>
        <div className="flex gap-8 mt-4 md:mt-0">
          <Link href="/about" className="text-sm text-muted-foreground hover:text-sky-600">
            Men haqimda
          </Link>
          <Link href="/articles" className="text-sm text-muted-foreground hover:text-sky-600">
            Maqolalar
          </Link>
          <Link href="/contact" className="text-sm text-muted-foreground hover:text-sky-600">
            Aloqa
          </Link>
        </div>
      </div>
    </footer>
  )
}
