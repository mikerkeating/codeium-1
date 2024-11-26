'use client'

import { UserNav } from './user-nav'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

export function Header() {
  const { data: session } = useSession()

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          GitHub Issue Manager
        </Link>
        {session ? (
          <UserNav user={session.user} />
        ) : (
          <Link
            href="/api/auth/signin"
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md"
          >
            Sign In
          </Link>
        )}
      </div>
    </header>
  )
}
