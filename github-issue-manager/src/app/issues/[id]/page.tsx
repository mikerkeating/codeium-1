'use client'

import { mockIssues } from '@/lib/mock-data'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatDistanceToNow } from 'date-fns'
import { notFound, useRouter } from 'next/navigation'
import { ChevronLeft, Circle, MessageSquare } from 'lucide-react'

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

  const statusColor = {
    open: 'text-green-600',
    in_progress: 'text-purple-600',
    closed: 'text-red-600',
  }[issue.status]

  return (
    <div className="container max-w-5xl py-6">
      {/* Back Button */}
      <Button
        variant="ghost"
        className="mb-4 -ml-2 text-gray-600 hover:text-gray-900"
        onClick={() => router.back()}
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to Issues
      </Button>

      {/* Title Section */}
      <div className="border-b pb-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold flex items-center gap-3">
              {issue.title}
              <span className="text-gray-500">#{issue.id}</span>
            </h1>
            <div className="mt-1 flex items-center gap-2">
              <Badge
                variant="outline"
                className={`flex items-center gap-1.5 ${
                  issue.status === 'open'
                    ? 'border-green-600 bg-green-50 hover:bg-green-100'
                    : issue.status === 'closed'
                    ? 'border-red-600 bg-red-50 hover:bg-red-100'
                    : 'border-purple-600 bg-purple-50 hover:bg-purple-100'
                }`}
              >
                <Circle className={`h-3 w-3 ${statusColor}`} fill="currentColor" strokeWidth={0} />
                <span className={statusColor}>
                  {issue.status.replace('_', ' ')}
                </span>
              </Badge>
              <span className="text-sm text-gray-600">
                <span className="font-medium text-gray-900">{issue.creator.name}</span>
                {' '}opened this issue {formatDistanceToNow(new Date(issue.createdAt))} ago
              </span>
            </div>
          </div>
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            New Issue
          </Button>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* Main Content */}
        <div className="md:col-span-2">
          <div className="flex items-start gap-3 bg-white rounded-lg border p-4">
            <Avatar className="mt-1">
              <AvatarImage src={issue.creator.avatarUrl} alt={issue.creator.name} />
              <AvatarFallback>
                {issue.creator.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="bg-gray-50 rounded-lg border px-4 py-3">
                <div className="prose max-w-none">
                  <p>{issue.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Assignees */}
          <div>
            <h3 className="text-sm font-medium mb-2 text-gray-600">Assignees</h3>
            {issue.assignees.length > 0 ? (
              <div className="space-y-2">
                {issue.assignees.map((assignee) => (
                  <div
                    key={assignee.id}
                    className="flex items-center gap-2"
                  >
                    <Avatar className="h-5 w-5">
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
                ))}
              </div>
            ) : (
              <span className="text-sm text-gray-500">No assignees</span>
            )}
          </div>

          {/* Labels */}
          <div>
            <h3 className="text-sm font-medium mb-2 text-gray-600">Labels</h3>
            <div className="flex flex-wrap gap-1.5">
              {issue.labels.map((label) => (
                <Badge
                  key={label}
                  variant="outline"
                  className="px-2 py-0.5 text-xs bg-gray-50 hover:bg-gray-100"
                >
                  {label}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
