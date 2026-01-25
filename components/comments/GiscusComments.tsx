'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from '@/components/theme/theme-provider'

interface GiscusCommentsProps {
  term: string
}

export function GiscusComments({ term }: GiscusCommentsProps) {
  const commentRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    if (!commentRef.current) return

    // 기존 스크립트 제거
    const existingScript = commentRef.current.querySelector('script')
    if (existingScript) {
      existingScript.remove()
    }

    // basePath를 고려한 전체 경로 생성
    const basePath = '/devlog'
    const fullPath = `${basePath}${term}`

    // 현재 테마 감지
    const getCurrentTheme = () => {
      if (theme === 'system') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      }
      return theme
    }

    const currentTheme = getCurrentTheme()
    const giscusTheme = currentTheme === 'dark' ? 'dark' : 'light'

    // Giscus 스크립트 생성
    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.setAttribute('data-repo', 'grappe96/devlog')
    script.setAttribute('data-repo-id', 'R_kgDOQ3lgQw')
    script.setAttribute('data-category', 'Announcements')
    script.setAttribute('data-category-id', 'DIC_kwDOQ3lgQ84C1ZD6')
    script.setAttribute('data-mapping', 'pathname')
    script.setAttribute('data-strict', '0')
    script.setAttribute('data-reactions-enabled', '1')
    script.setAttribute('data-emit-metadata', '0')
    script.setAttribute('data-input-position', 'top')
    script.setAttribute('data-theme', giscusTheme)
    script.setAttribute('data-lang', 'ko')
    script.setAttribute('crossorigin', 'anonymous')
    script.async = true

    // pathname 매핑을 사용하므로 전체 경로를 term으로 전달
    script.setAttribute('data-term', fullPath)

    commentRef.current.appendChild(script)
  }, [term, theme])

  return <div ref={commentRef} className="mt-8" />
}
