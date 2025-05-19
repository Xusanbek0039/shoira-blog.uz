"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  // theme qiymati ko‘pincha "light", "dark", yoki "system" bo‘ladi

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Toggle theme">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className={`flex items-center space-x-2 rounded-md px-2 py-1 cursor-pointer ${
            theme === "light" ? "bg-blue-500 text-white" : "text-muted-foreground hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          <Sun className="h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className={`flex items-center space-x-2 rounded-md px-2 py-1 cursor-pointer ${
            theme === "dark" ? "bg-blue-500 text-white" : "text-muted-foreground hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          <Moon className="h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className={`flex items-center space-x-2 rounded-md px-2 py-1 cursor-pointer ${
            theme === "system" ? "bg-blue-500 text-white" : "text-muted-foreground hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          {/* System uchun ikonani istasangiz o'zgartiring */}
          <Sun className="h-4 w-4 opacity-50" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
