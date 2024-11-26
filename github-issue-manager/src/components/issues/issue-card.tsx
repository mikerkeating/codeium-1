'use client'

import { Issue } from '@/types'
import { Badge } from '@/components/ui/badge'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'
import { Circle } from 'lucide-react'

interface IssueCardProps {
  issue: Issue
}

export function IssueCard({ issue }: IssueCardProps) {
  const statusColor = {
    open: 'text-green-600',
    in_progress: 'text-purple-600',
    closed: 'text-red-600',
  }[issue.status]

  return (
    <div className="border-b py-3 hover:bg-slate-50">
      <div className="flex items-start gap-4 px-4">
        <div className="mt-1">
          <Circle 
            className={`h-4 w-4 ${statusColor}`} 
            fill="currentColor" 
            strokeWidth={0}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              href={`/issues/${issue.id}`}
              className="text-lg font-semibold hover:text-blue-600 hover:underline"
            >
              {issue.title}
            </Link>
            <div className="flex gap-1.5 flex-wrap">
              {issue.labels.map((label) => (
                <Badge
                  key={label.id}
                  variant="outline"
                  style={{ backgroundColor: label.color + '20' }}
                  className="px-2 py-0.5 text-xs hover:bg-opacity-20"
                >
                  {label.name}
                </Badge>
              ))}
            </div>
          </div>
          <div className="mt-1 text-sm text-gray-600">
            #{issue.id} opened {formatDistanceToNow(new Date(issue.createdAt))} ago by{' '}
            <span className="font-medium text-gray-900">{issue.creator.name}</span>
          </div>
        </div>
        {issue.assignees.length > 0 && (
          <div className="flex -space-x-2">
            {issue.assignees.map((assignee) => (
              <img
                key={assignee.id}
                src={assignee.avatarUrl}
                alt={assignee.name}
                className="h-6 w-6 rounded-full ring-2 ring-white"
                title={assignee.name}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
