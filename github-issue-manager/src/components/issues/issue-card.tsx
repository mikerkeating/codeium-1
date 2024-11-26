'use client'

import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'
import { mockLabels, mockUsers, type Issue } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

interface IssueCardProps {
  issue: Issue
}

export function IssueCard({ issue }: IssueCardProps) {
  const statusColor = {
    open: 'bg-green-500',
    in_progress: 'bg-blue-500',
    closed: 'bg-gray-500',
  }[issue.status]

  const creator = mockUsers.find(user => user.id === issue.createdBy)

  return (
    <div className="bg-white rounded-lg border p-4 hover:border-gray-400 transition-colors">
      <div className="flex items-start gap-3">
        <Avatar className="mt-1">
          <AvatarImage src={creator?.avatarUrl} />
          <AvatarFallback>
            {creator?.name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          {issue.labels && issue.labels.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-1">
              {issue.labels.map((labelId) => {
                const label = mockLabels.find(l => l.id === labelId)
                return label ? (
                  <Badge
                    key={label.id}
                    variant="outline"
                    style={{ backgroundColor: label.color + '20' }}
                    className="px-2 py-0.5 text-xs hover:bg-opacity-20"
                  >
                    {label.name}
                  </Badge>
                ) : null
              })}
            </div>
          )}
          <Link
            href={`/issues/${issue.id}`}
            className="text-lg font-semibold hover:text-blue-600 hover:underline line-clamp-1"
          >
            {issue.title}
          </Link>
          <div className="mt-1 flex items-center gap-2 text-sm text-gray-600">
            <span>#{issue.id}</span>
            <span>·</span>
            <div
              className={cn('w-2 h-2 rounded-full', statusColor)}
              title={`Status: ${issue.status}`}
            />
            <span>
              opened {formatDistanceToNow(new Date(issue.createdAt))} ago by{' '}
              <span className="font-medium">{creator?.name}</span>
            </span>
            {issue.assignees && issue.assignees.length > 0 && (
              <>
                <span>·</span>
                <div className="flex -space-x-1">
                  {issue.assignees.map((assigneeId) => {
                    const assignee = mockUsers.find(u => u.id === assigneeId)
                    return assignee ? (
                      <Avatar
                        key={assignee.id}
                        className="h-5 w-5 border-2 border-white"
                        title={assignee.name}
                      >
                        <AvatarImage src={assignee.avatarUrl} />
                        <AvatarFallback>
                          {assignee.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                    ) : null
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
