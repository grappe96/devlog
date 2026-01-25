'use client'

import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, X } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { PostMetadata } from '@/types/post'

interface PostListProps {
  posts: PostMetadata[]
}

export function PostList({ posts }: PostListProps) {
  const searchParams = useSearchParams()
  const initialTag = searchParams.get('tag')
  const [selectedTag, setSelectedTag] = useState<string | null>(initialTag)
  const [searchQuery, setSearchQuery] = useState<string>('')

  // URL 쿼리 파라미터가 변경되면 필터 상태 업데이트
  useEffect(() => {
    const tag = searchParams.get('tag')
    setSelectedTag(tag)
  }, [searchParams])

  // 모든 태그 추출 (중복 제거)
  const allTags = useMemo(() => {
    const tagSet = new Set<string>()
    posts.forEach((post) => {
      post.tags.forEach((tag) => tagSet.add(tag))
    })
    return Array.from(tagSet).sort()
  }, [posts])

  // 검색 및 태그 필터링된 게시글
  const filteredPosts = useMemo(() => {
    let result = posts

    // 태그 필터링
    if (selectedTag) {
      result = result.filter((post) => post.tags.includes(selectedTag))
    }

    // 검색어 필터링
    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase()
      result = result.filter((post) => {
        const titleMatch = post.title.toLowerCase().includes(query)
        const descriptionMatch = post.description.toLowerCase().includes(query)
        const tagsMatch = post.tags.some((tag) => tag.toLowerCase().includes(query))
        return titleMatch || descriptionMatch || tagsMatch
      })
    }

    return result
  }, [posts, selectedTag, searchQuery])

  // 태그 클릭 핸들러
  const handleTagClick = (tag: string) => {
    if (selectedTag === tag) {
      // 같은 태그를 다시 클릭하면 필터 해제
      setSelectedTag(null)
      // URL에서 쿼리 파라미터 제거
      window.history.pushState({}, '', '/')
    } else {
      setSelectedTag(tag)
      // URL에 쿼리 파라미터 추가
      window.history.pushState({}, '', `/?tag=${encodeURIComponent(tag)}`)
    }
  }

  // 태그 필터 초기화 핸들러
  const handleClearTagFilter = () => {
    setSelectedTag(null)
    // URL에서 쿼리 파라미터 제거
    window.history.pushState({}, '', '/')
  }

  // 검색어 초기화 핸들러
  const handleClearSearch = () => {
    setSearchQuery('')
  }

  const hasActiveFilters = selectedTag || searchQuery.trim()

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">게시글 목록</h1>
          <p className="text-muted-foreground">
            기술 블로그 게시글 목록입니다.
          </p>
        </div>

        {/* 검색바 */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="게시글 제목, 설명, 태그로 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClearSearch}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* 태그 필터 */}
        {allTags.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-muted-foreground">태그 필터:</span>
              {allTags.map((tag) => (
                <Button
                  key={tag}
                  variant={selectedTag === tag ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleTagClick(tag)}
                  className="h-7 text-xs"
                >
                  {tag}
                </Button>
              ))}
              {selectedTag && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearTagFilter}
                  className="h-7 text-xs"
                >
                  필터 초기화
                </Button>
              )}
            </div>
            {(selectedTag || searchQuery.trim()) && (
              <p className="text-sm text-muted-foreground">
                {selectedTag && (
                  <span>
                    <span className="font-medium">{selectedTag}</span> 태그
                  </span>
                )}
                {selectedTag && searchQuery.trim() && ' 및 '}
                {searchQuery.trim() && (
                  <span>
                    "<span className="font-medium">{searchQuery}</span>" 검색
                  </span>
                )}
                {' '}로 필터링 중 ({filteredPosts.length}개 게시글)
              </p>
            )}
          </div>
        )}
      </div>

      {/* 게시글 목록 */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {hasActiveFilters
              ? '검색 조건에 맞는 게시글이 없습니다.'
              : '게시글이 없습니다.'}
          </p>
          {searchQuery.trim() && (
            <Button
              variant="outline"
              onClick={handleClearSearch}
              className="mt-4"
            >
              검색어 초기화
            </Button>
          )}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
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
                      <Button
                        key={tag}
                        variant={selectedTag === tag ? 'default' : 'secondary'}
                        size="sm"
                        onClick={() => handleTagClick(tag)}
                        className="h-6 text-xs px-2 py-0"
                      >
                        {tag}
                      </Button>
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
