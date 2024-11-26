import Link from 'next/link'
import { formatDistance } from 'date-fns'
import { MessageSquare, GitPullRequestDraft } from 'lucide-react'
import { type GitHubIssue } from '@/lib/github'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

interface IssueCardProps {
  issue: GitHubIssue
  owner: string
  repo: string
}

export function IssueCard({ issue, owner, repo }: IssueCardProps) {
  const updatedAt = formatDistance(new Date(issue.updated_at), new Date(), {
    addSuffix: true,
  })

  return (
    <Link
      href={`/issues/${owner}/${repo}/${issue.number}`}
      className="block rounded-lg border bg-card p-4 text-card-foreground shadow-sm transition-colors hover:bg-accent/5"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <Avatar className="h-8 w-8">
            <AvatarImage src={issue.user.avatar_url} alt={issue.user.login} />
            <AvatarFallback>{issue.user.login.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{issue.title}</p>
            <div className="mt-1 flex items-center space-x-4 text-sm text-muted-foreground">
              <span>#{issue.number}</span>
              <span>{updatedAt}</span>
              <span className="flex items-center space-x-1">
                <MessageSquare className="h-4 w-4" />
                <span>{issue.comments}</span>
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span
            className={cn(
              'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium',
              issue.state === 'open'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            )}
          >
            <GitPullRequestDraft className="mr-1 h-3 w-3" />
            {issue.state}
          </span>
        </div>
      </div>
      {issue.labels.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {issue.labels.map((label) => (
            <span
              key={label.name}
              className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"
              style={{
                backgroundColor: `#${label.color}20`,
                color: `#${label.color}`,
              }}
            >
              {label.name}
            </span>
          ))}
        </div>
      )}
    </Link>
  )
}
