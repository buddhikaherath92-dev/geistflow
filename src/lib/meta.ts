interface PageMeta {
  title: string
  description: string
}

export function setPageMeta({ title, description }: PageMeta) {
  document.title = title

  const set = (selector: string, attr: string, value: string) =>
    document.querySelector(selector)?.setAttribute(attr, value)

  set('meta[name="description"]', 'content', description)
  set('meta[property="og:title"]', 'content', title)
  set('meta[property="og:description"]', 'content', description)
  set('meta[name="twitter:title"]', 'content', title)
  set('meta[name="twitter:description"]', 'content', description)
}
