import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FileQuestion } from "lucide-react"

export default function NotFound() {
  return (
    <div className="container flex min-h-[calc(100vh-200px)] items-center justify-center px-4 py-12">
      <Card className="mx-auto max-w-md text-center">
        <CardHeader>
          <div className="flex justify-center">
            <FileQuestion className="h-16 w-16 text-muted-foreground" />
          </div>
          <CardTitle className="text-2xl">Sahifa topilmadi</CardTitle>
          <CardDescription>Siz qidirayotgan sahifa mavjud emas yoki o'chirilgan bo'lishi mumkin.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Iltimos, URL manzilini tekshiring yoki bosh sahifaga qaytib, kerakli ma'lumotni topishga harakat qiling.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/">
            <Button>Bosh sahifaga qaytish</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
