import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { Loader2 } from 'lucide-react'
import { type GitHubIssue, getGitHubIssues } from '@/lib/github'
import { IssueCard } from '@/components/issues/IssueCard'
import { Button } from '@/components/ui/button'

export default function IssuesPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [owner, setOwner] = useState('vercel')
  const [repo, setRepo] = useState('next.js')

  const { data: issues, error } = useSWR<GitHubIssue[]>(
    session?.accessToken ? [owner, repo] : null,
    ([owner, repo]) =>
      getGitHubIssues(session!.accessToken as string, owner, repo)
  )

  if (status === 'loading') {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!session) {
    router.push('/auth/signin')
    return null
  }

  return (
    <div className="container py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">GitHub Issues</h1>
          <p className="text-muted-foreground">
            Viewing issues from {owner}/{repo}
          </p>
        </div>
        <Button onClick={() => router.push('/issues/new')}>New Issue</Button>
      </div>

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
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          Error loading issues. Please check the repository name and try again.
        </div>
      )}

      {issues ? (
        <div className="grid gap-4">
          {issues.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      )}
    </div>
  )
}
