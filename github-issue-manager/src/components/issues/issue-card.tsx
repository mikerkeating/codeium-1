'use client'

import { Issue } from '@/types'
import { Badge } from '@/components/ui/badge'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'

interface IssueCardProps {
  issue: Issue
}

export function IssueCard({ issue }: IssueCardProps) {
  return (
    <Link
      href={`/issues/${issue.id}`}
      className="block p-4 border rounded-lg hover:border-primary transition-colors"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-semibold truncate">{issue.title}</h2>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {issue.description}
          </p>
          <div className="mt-2 flex items-center gap-2">
            {issue.labels.map((label) => (
              <Badge key={label} variant="outline">
                {label}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Badge variant={getPriorityVariant(issue.priority)}>
            {issue.priority}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(issue.createdAt), { addSuffix: true })}
          </span>
        </div>
      </div>
    </Link>
  )
}

function getPriorityVariant(priority: Issue['priority']) {
  switch (priority) {
    case 'high':
      return 'destructive'
    case 'medium':
      return 'warning'
    case 'low':
      return 'secondary'
    default:
      return 'default'
  }
}
