import type { Metadata } from "next"
import { Suspense } from "react"
import { getAllPosts } from "@/lib/posts"
import { PostList } from "@/components/post/PostList"

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
    <Suspense fallback={<div>로딩 중...</div>}>
      <PostList posts={posts} />
    </Suspense>
  )
}
