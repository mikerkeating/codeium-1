export default function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-14 md:flex-row">
        <p className="text-sm leading-loose text-center text-muted-foreground md:text-left">
          Built with Next.js and Tailwind CSS. Powered by GitHub API.
        </p>
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} GitHub Issue Manager. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
