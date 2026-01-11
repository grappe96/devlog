export function Footer() {
  return (
    <footer className="border-t mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} DevLog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
