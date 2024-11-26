import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'
import { ArrowLeft, Loader2, MessageSquare } from 'lucide-react'
import { formatDistance, format } from 'date-fns'
import { getGitHubIssue } from '@/lib/github'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

export default function IssueDetailsPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const { owner, repo, number } = router.query

  const { data, error } = useSWR(
    session?.accessToken && owner && repo && number
      ? [owner, repo, number]
      : null,
    ([owner, repo, number]) =>
      getGitHubIssue(
        session!.accessToken as string,
        owner as string,
        repo as string,
        parseInt(number as string)
      )
  )

  if (error) {
    return (
      <div className="container py-8">
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          Error loading issue. Please try again later.
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  const { issue, comments } = data

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

      <div className="space-y-8">
        {/* Issue Header */}
        <div>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">{issue.title}</h1>
            <span
              className={cn(
                'inline-flex items-center rounded-full px-3 py-1 text-sm font-medium',
                issue.state === 'open'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              )}
            >
              {issue.state}
            </span>
          </div>
          <div className="mt-2 flex items-center space-x-4 text-sm text-muted-foreground">
            <span>#{issue.number}</span>
            <span>
              Opened {formatDistance(new Date(issue.created_at), new Date(), { addSuffix: true })}
            </span>
            <span>{issue.comments} comments</span>
          </div>
        </div>

        {/* Issue Body */}
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-start space-x-4">
            <Avatar>
              <AvatarImage src={issue.user.avatar_url} alt={issue.user.login} />
              <AvatarFallback>{issue.user.login.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <p className="font-medium">{issue.user.login}</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(issue.created_at), 'MMM d, yyyy')}
                </p>
              </div>
              <div className="mt-4 prose prose-sm max-w-none">
                {issue.body}
              </div>
            </div>
          </div>
        </div>

        {/* Comments */}
        {comments.length > 0 && (
          <div className="space-y-6">
            <h2 className="flex items-center text-lg font-semibold">
              <MessageSquare className="mr-2 h-5 w-5" />
              Comments ({comments.length})
            </h2>
            <div className="space-y-6">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="rounded-lg border bg-card p-6"
                >
                  <div className="flex items-start space-x-4">
                    <Avatar>
                      <AvatarImage
                        src={comment.user.avatar_url}
                        alt={comment.user.login}
                      />
                      <AvatarFallback>
                        {comment.user.login.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{comment.user.login}</p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(comment.created_at), 'MMM d, yyyy')}
                        </p>
                      </div>
                      <div className="mt-4 prose prose-sm max-w-none">
                        {comment.body}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
