import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { Button } from '@/components/ui/button'
import { Github } from 'lucide-react'

export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === 'loading') {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="flex h-screen flex-col items-center justify-center space-y-8">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            GitHub Issue Manager
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage your GitHub issues more efficiently
          </p>
        </div>
        <Button
          onClick={() => router.push('/auth/signin')}
          size="lg"
          className="gap-2"
        >
          <Github className="h-5 w-5" />
          Sign in with GitHub
        </Button>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Welcome back, {session.user?.name}</h1>
        <p className="text-muted-foreground">
          Start managing your GitHub issues efficiently
        </p>
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Add issue management cards/widgets here */}
      </div>
    </div>
  )
}
