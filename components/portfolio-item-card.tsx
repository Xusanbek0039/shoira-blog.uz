"use client"
import { Card, CardContent } from "@/components/ui/card"

interface PortfolioItemCardProps {
  item: {
    _id: string
    title: string
    content: string
    image: string
    category: string
    author: string
    createdAt: string
  }
}

export default function PortfolioItemCard({ item }: PortfolioItemCardProps) {
  return (
    <Card className="overflow-hidden h-full">
      <div className="aspect-video overflow-hidden">
        <img
          src={item.image || "/placeholder.svg?height=400&width=600"}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <div className="mb-1 flex items-center justify-between">
          <h3 className="text-lg font-semibold">{item.title}</h3>
          <span className="text-sm text-muted-foreground">{new Date(item.createdAt).getFullYear()}</span>
        </div>
        <p className="text-sm text-muted-foreground">{item.content}</p>
      </CardContent>
    </Card>
  )
}
