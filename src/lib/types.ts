export interface Item {
  id: string
  title: string
  description: string
  category: string
  price: number
  imageUrl: string
  createdAt: Date
  colors?: string[]
}
