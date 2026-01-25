import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getAllPosts } from "@/lib/posts"

// 정적 생성 강제 (RSC 리소스 요청 방지)
export const dynamic = 'force-static'

// 메타데이터
export const metadata: Metadata = {
  title: "DevLog - 기술 블로그",
  description: "Next.js, TypeScript, React 등 프론트엔드 개발 관련 기술 블로그입니다.",
  keywords: ["Next.js", "TypeScript", "React", "프론트엔드", "개발", "블로그"],
  openGraph: {
    title: "DevLog - 기술 블로그",
    description: "Next.js, TypeScript, React 등 프론트엔드 개발 관련 기술 블로그입니다.",
    url: "https://grappe96.github.io/devlog",
    siteName: "DevLog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevLog - 기술 블로그",
    description: "Next.js, TypeScript, React 등 프론트엔드 개발 관련 기술 블로그입니다.",
  },
  alternates: {
    canonical: "https://grappe96.github.io/devlog",
  },
}

export default function Home() {
  const posts = getAllPosts()

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">게시글 목록</h1>
        <p className="text-muted-foreground">
          기술 블로그 게시글 목록입니다.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">게시글이 없습니다.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.slug}>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>
                  {post.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <time className="text-sm text-muted-foreground">
                    {new Date(post.date).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
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
                <Button variant="outline" asChild>
                  <Link href={`/posts/${post.slug}`}>자세히 보기</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
