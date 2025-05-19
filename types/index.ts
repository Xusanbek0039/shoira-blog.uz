export interface Article {
  _id: string
  title: string
  content: string
  author: string
  image?: string
  createdAt: string
  user?: string
}

export interface User {
  _id: string
  name: string
  email: string
}
