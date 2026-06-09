import { items } from './data'
import type { Item } from './types'

export function getAllItems(): Item[] {
  return items
}

export function getItemById(id: string): Item | undefined {
  return items.find((item) => item.id === id)
}
