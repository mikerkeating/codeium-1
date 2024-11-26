'use client'

import { mockIssues } from '@/lib/mock-data'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatDistanceToNow } from 'date-fns'
import { notFound, useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'

export default function IssueDetailsPage({
  params,
}: {
  params: { id: string }
}) {
  const router = useRouter()
  const issue = mockIssues.find((i) => i.id === params.id)

  if (!issue) {
    notFound()
  }

  return (
    <div className="container max-w-4xl py-8">
      {/* Back Button */}
      <Button
        variant="ghost"
        className="mb-6 -ml-2 text-muted-foreground hover:text-foreground"
        onClick={() => router.back()}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back to Issues
      </Button>

      <div className="space-y-8">
        {/* Header */}
        <div>
          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-3xl font-bold">{issue.title}</h1>
            <Badge
              variant={
                issue.status === 'closed'
                  ? 'destructive'
                  : issue.status === 'in_progress'
                  ? 'default'
                  : 'outline'
              }
            >
              {issue.status.replace('_', ' ')}
            </Badge>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>#{issue.id}</span>
            <span>•</span>
            <span>
              Opened {formatDistanceToNow(new Date(issue.createdAt))} ago by{' '}
              <span className="font-medium text-foreground">
                {issue.creator.name}
              </span>
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Description */}
          <div className="prose max-w-none">
            <p>{issue.description}</p>
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="col-span-3">
              {/* Labels */}
              <div className="mb-4">
                <h3 className="text-sm font-medium mb-2">Labels</h3>
                <div className="flex flex-wrap gap-2">
                  {issue.labels.map((label) => (
                    <Badge key={label} variant="secondary">
                      {label}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Priority */}
              <div>
                <h3 className="text-sm font-medium mb-2">Priority</h3>
                <Badge
                  variant={
                    issue.priority === 'high'
                      ? 'destructive'
                      : issue.priority === 'medium'
                      ? 'default'
                      : 'secondary'
                  }
                >
                  {issue.priority}
                </Badge>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              {/* Assignees */}
              <div>
                <h3 className="text-sm font-medium mb-2">Assignees</h3>
                <div className="flex flex-col gap-2">
                  {issue.assignees.length > 0 ? (
                    issue.assignees.map((assignee) => (
                      <div
                        key={assignee.id}
                        className="flex items-center gap-2"
                      >
                        <Avatar>
                          <AvatarImage src={assignee.avatarUrl} alt={assignee.name} />
                          <AvatarFallback>
                            {assignee.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{assignee.name}</span>
                      </div>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      No assignees
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
