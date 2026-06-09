import rawItems from '../data/items.json'
import type { Item } from './types'

type RawItem = Omit<Item, 'createdAt'> & { createdAt: string }

function toItem(raw: RawItem): Item {
  return { ...raw, createdAt: new Date(raw.createdAt) }
}

export function getAllItems(): Item[] {
  return (rawItems as RawItem[]).map(toItem)
}

export function getItemById(id: string): Item | undefined {
  return getAllItems().find((item) => item.id === id)
}

export function getCategories(): string[] {
  return [...new Set(getAllItems().map((item) => item.category))]
}
