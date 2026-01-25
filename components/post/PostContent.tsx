import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import 'highlight.js/styles/github.css'

interface PostContentProps {
  content: string
}

export function PostContent({ content }: PostContentProps) {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-foreground prose-p:text-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
        components={{
          // 코드 블록 스타일링
          code: ({ node, className, children, ...props }: any) => {
            // className에 'language-'가 있으면 코드 블록, 없으면 인라인 코드
            const match = /language-(\w+)/.exec(className || '')
            const isInline = !match
            
            if (isInline) {
              // 인라인 코드
              return (
                <code
                  className="px-1.5 py-0.5 bg-muted rounded text-sm font-mono text-foreground"
                  {...props}
                >
                  {children}
                </code>
              )
            }
            
            // 코드 블록인 경우 - rehype-highlight가 처리한 className 유지
            return (
              <code className={className} {...props}>
                {children}
              </code>
            )
          },
          // 링크는 새 탭에서 열기
          a: ({ node, ...props }) => (
            <a
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
          // 이미지 스타일링
          img: ({ node, ...props }) => (
            <img className="rounded-lg my-4" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
