export interface PostMetadata {
  title: string
  date: string
  description: string
  tags: string[]
  slug: string
}

export interface Post extends PostMetadata {
  content: string
}
