import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getAllPostSlugs, getPostBySlug } from "@/lib/posts"
import { notFound } from "next/navigation"
import { PostContent } from "@/components/post/PostContent"
import { GiscusComments } from "@/components/comments/GiscusComments"

interface PostPageProps {
  params: {
    slug: string
  }
}

// 정적 export를 위한 generateStaticParams 함수
// 동기 함수로 변경 (Next.js 14 호환성)
export function generateStaticParams() {
  const slugs = getAllPostSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

// 존재하지 않는 경로는 404 반환
export const dynamicParams = false

// 정적 생성 강제 (RSC 리소스 요청 방지)
export const dynamic = 'force-static'

// 동적 메타데이터 생성
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug)

  if (!post) {
    return {
      title: '게시글을 찾을 수 없습니다',
    }
  }

  const baseUrl = 'https://grappe96.github.io'
  const basePath = '/devlog'
  const url = `${baseUrl}${basePath}/posts/${params.slug}`
  const siteName = 'DevLog'

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: 'DevLog' }],
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      siteName,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
    alternates: {
      canonical: url,
    },
  }
}

export default function PostPage({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  // basePath를 고려한 전체 경로 생성
  const postPath = `/posts/${params.slug}`

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Button variant="ghost" asChild>
          <Link href="/">← 목록으로</Link>
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>{post.title}</CardTitle>
            <CardDescription>
              {post.description}
            </CardDescription>
            <div className="flex items-center gap-4 pt-2">
              <time className="text-sm text-muted-foreground">
                {new Date(post.date).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <PostContent content={post.content} />
          </CardContent>
        </Card>

        {/* 댓글 섹션 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">댓글</h2>
          <GiscusComments term={postPath} />
        </div>
      </div>
    </div>
  )
}
