"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/context/language-context"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Flag image URLs
const FLAGS = {
  en: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg/2560px-Flag_of_the_United_Kingdom_%283-5%29.svg.png",
  uz: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxnZzwWkWhQKBKwX2xU_jDAVZZtO-6vgudnw&s",
  ru: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Russia-flag.png",
}

// Language display names and codes
const LANGUAGES = {
  en: { name: "English", code: "EN" },
  uz: { name: "Uzbek", code: "UZ" },
  ru: { name: "Русский", code: "RU" },
}

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleSetLanguage = (e: Event) => {
      const customEvent = e as CustomEvent
      if (customEvent.detail === "en" || customEvent.detail === "uz" || customEvent.detail === "ru") {
        setLanguage(customEvent.detail)
      }
    }

    document.addEventListener("setLanguage", handleSetLanguage)
    return () => {
      document.removeEventListener("setLanguage", handleSetLanguage)
    }
  }, [setLanguage])

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <img
            src={FLAGS[language] || "/placeholder.svg"}
            alt={LANGUAGES[language].name}
            className="h-5 w-5 rounded-full object-cover"
          />
          <span>{LANGUAGES[language].name}</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px] rounded-md p-1 shadow-md">
  <DropdownMenuItem
    onClick={() => setLanguage("en")}
    className={`flex cursor-pointer items-center gap-2 rounded-sm px-3 py-2 text-sm hover:bg-accent ${language === "en" ? "bg-accent/50" : ""}`}
  >
    <div className="h-6 w-6 overflow-hidden rounded-full border border-muted">
      <img src={FLAGS.en || "/placeholder.svg"} alt="English" className="h-full w-full object-cover" />
    </div>
    <span>English</span>
    <span className="ml-auto text-xs text-muted-foreground">(EN)</span>
  </DropdownMenuItem>

  <DropdownMenuItem
    onClick={() => setLanguage("ru")}
    className={`flex cursor-pointer items-center gap-2 rounded-sm px-3 py-2 text-sm hover:bg-accent ${language === "ru" ? "bg-accent/50" : ""}`}
  >
    <div className="h-6 w-6 overflow-hidden rounded-full border border-muted">
      <img src={FLAGS.ru || "/placeholder.svg"} alt="Russian" className="h-full w-full object-cover" />
    </div>
    <span>Русский</span>
    <span className="ml-auto text-xs text-muted-foreground">(RU)</span>
  </DropdownMenuItem>

  <DropdownMenuItem
    onClick={() => setLanguage("uz")}
    className={`flex cursor-pointer items-center gap-2 rounded-sm px-3 py-2 text-sm hover:bg-accent ${language === "uz" ? "bg-accent/50" : ""}`}
  >
    <div className="h-6 w-6 overflow-hidden rounded-full border border-muted">
      <img src={FLAGS.uz || "/placeholder.svg"} alt="Uzbek" className="h-full w-full object-cover" />
    </div>
    <span>Uzbek</span>
    <span className="ml-auto text-xs text-muted-foreground">(UZ)</span>
  </DropdownMenuItem>
</DropdownMenuContent>

    </DropdownMenu>
  )
}
