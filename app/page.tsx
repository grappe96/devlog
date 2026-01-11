import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">게시글 목록</h1>
        <p className="text-muted-foreground">
          기술 블로그 게시글 목록이 여기에 표시됩니다.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>샘플 게시글 1</CardTitle>
            <CardDescription>
              게시글 카드 컴포넌트 예시입니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              이곳에 게시글 미리보기 내용이 표시됩니다.
            </p>
            <Button variant="outline" asChild>
              <Link href="/posts/sample-1">자세히 보기</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>샘플 게시글 2</CardTitle>
            <CardDescription>
              shadcn/ui Card 컴포넌트를 사용한 예시입니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              실제 게시글 데이터는 다음 단계에서 구현됩니다.
            </p>
            <Button variant="outline" asChild>
              <Link href="/posts/sample-2">자세히 보기</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
