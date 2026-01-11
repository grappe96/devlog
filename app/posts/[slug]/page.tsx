import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface PostPageProps {
  params: {
    slug: string
  }
}

// 정적 export를 위한 generateStaticParams 함수
export function generateStaticParams() {
  // placeholder 단계: 샘플 slug들 반환
  // 다음 단계에서 실제 게시글 파일 목록을 기반으로 동적으로 생성
  return [
    { slug: 'sample-1' },
    { slug: 'sample-2' },
  ]
}

export default function PostPage({ params }: PostPageProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Button variant="ghost" asChild>
          <Link href="/">← 목록으로</Link>
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>게시글 제목: {params.slug}</CardTitle>
            <CardDescription>
              게시글 상세 페이지 placeholder입니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="prose max-w-none">
              <p className="text-muted-foreground">
                이곳에 게시글 본문 내용이 표시됩니다.
                실제 게시글 데이터와 MDX 렌더링은 다음 단계에서 구현됩니다.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
