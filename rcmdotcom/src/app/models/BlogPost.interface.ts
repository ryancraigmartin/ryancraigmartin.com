export interface BlogPost {
  title: string
  date: string
  excerpt: string
  slug: string
  url: string
  cardImage: string
  tags: string[]
  content?: string | object
}
