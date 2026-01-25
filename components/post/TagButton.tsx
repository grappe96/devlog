'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

interface TagButtonProps {
  tag: string
  variant?: 'default' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'default' | 'lg'
  className?: string
  onClick?: () => void
  linkToHome?: boolean // 홈으로 링크할지 여부
}

export function TagButton({ 
  tag, 
  variant = 'secondary', 
  size = 'sm',
  className = '',
  onClick,
  linkToHome = false
}: TagButtonProps) {
  const router = useRouter()

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else if (linkToHome) {
      // 홈으로 이동하면서 태그 쿼리 파라미터 전달
      router.push(`/?tag=${encodeURIComponent(tag)}`)
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      className={className}
    >
      {tag}
    </Button>
  )
}
