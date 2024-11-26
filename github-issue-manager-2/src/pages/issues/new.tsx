import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { ArrowLeft } from 'lucide-react'
import { createGitHubIssue } from '@/lib/github'
import { Button } from '@/components/ui/button'
import { Loader2 } from '@/components/ui/loader'

export default function NewIssuePage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [owner, setOwner] = useState(process.env.NEXT_PUBLIC_GITHUB_DEFAULT_ORG || 'vercel')
  const [repo, setRepo] = useState(process.env.NEXT_PUBLIC_GITHUB_DEFAULT_REPO || 'next.js')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!session) {
    return null
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setError('')

    const formData = new FormData(event.currentTarget)
    const title = formData.get('title') as string
    const body = formData.get('body') as string

    try {
      await createGitHubIssue(
        session!.accessToken as string,
        owner,
        repo,
        title,
        body
      )
      router.push('/issues')
    } catch (error) {
      setError('Failed to create issue. Please try again.')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container py-8">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => router.push('/issues')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Issues
      </Button>

      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-3xl font-bold">Create New Issue</h1>

        <div className="mb-6 flex gap-4">
          <input
            type="text"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            placeholder="Owner"
            className="rounded-md border px-3 py-2"
          />
          <input
            type="text"
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
            placeholder="Repository"
            className="rounded-md border px-3 py-2"
          />
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              className="w-full rounded-md border px-3 py-2"
              placeholder="Issue title"
            />
          </div>

          <div>
            <label
              htmlFor="body"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Description
            </label>
            <textarea
              id="body"
              name="body"
              rows={6}
              required
              className="w-full rounded-md border px-3 py-2"
              placeholder="Describe the issue..."
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Issue'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
