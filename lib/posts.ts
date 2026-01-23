import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Post, PostMetadata } from '@/types/post'

const postsDirectory = path.join(process.cwd(), 'content', 'posts')

/**
 * 모든 게시글의 메타데이터를 가져옵니다 (정렬: 최신순)
 */
export function getAllPosts(): PostMetadata[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.(mdx|md)$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)

      return {
        slug,
        title: data.title || '',
        date: data.date || '',
        description: data.description || '',
        tags: Array.isArray(data.tags) ? data.tags : [],
      } as PostMetadata
    })
    .filter((post) => post.title && post.date) // 필수 필드가 있는 게시글만

  // 날짜 기준 내림차순 정렬 (최신순)
  return allPostsData.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}

/**
 * slug로 특정 게시글을 가져옵니다
 */
export function getPostBySlug(slug: string): Post | null {
  const mdxPath = path.join(postsDirectory, `${slug}.mdx`)
  const mdPath = path.join(postsDirectory, `${slug}.md`)

  let fullPath: string | null = null
  if (fs.existsSync(mdxPath)) {
    fullPath = mdxPath
  } else if (fs.existsSync(mdPath)) {
    fullPath = mdPath
  } else {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug,
    title: data.title || '',
    date: data.date || '',
    description: data.description || '',
    tags: Array.isArray(data.tags) ? data.tags : [],
    content,
  } as Post
}

/**
 * 모든 게시글의 slug 목록을 가져옵니다 (generateStaticParams용)
 */
export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames
    .filter((fileName) => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.(mdx|md)$/, ''))
}
