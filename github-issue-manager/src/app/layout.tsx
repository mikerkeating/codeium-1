import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GitHub Issue Manager',
  description: 'AI-powered GitHub issue management platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn('min-h-screen bg-background font-sans antialiased', inter.className)}>
        {children}
      </body>
    </html>
  )
}
