import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { Loader2 } from 'lucide-react'
import useSWR from 'swr'
import { getGitHubIssues } from '@/lib/github'
import { IssueCard } from '@/components/issues/IssueCard'
import { Button } from '@/components/ui/button'

export default function IssuesPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [owner, setOwner] = useState(process.env.NEXT_PUBLIC_GITHUB_DEFAULT_ORG || 'vercel')
  const [repo, setRepo] = useState(process.env.NEXT_PUBLIC_GITHUB_DEFAULT_REPO || 'next.js')

  const { data: issues, error } = useSWR(
    session?.accessToken ? [owner, repo, session.accessToken] : null,
    ([owner, repo, token]) => getGitHubIssues(token, owner, repo)
  )

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

  return (
    <div className="container py-8">
      <div className="mb-8">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">GitHub Issues</h1>
          <p className="text-muted-foreground">
            Viewing issues from {owner}/{repo}
          </p>
        </div>
      </div>

      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center space-x-4">
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
        <Button onClick={() => router.push('/issues/new')}>New Issue</Button>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          Error loading issues. Please check the repository name and try again.
        </div>
      )}

      {!issues && !error && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      )}

      {issues ? (
        <div className="grid gap-4">
          {issues.map((issue) => (
            <IssueCard
              key={issue.id}
              issue={issue}
              owner={owner}
              repo={repo}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}
