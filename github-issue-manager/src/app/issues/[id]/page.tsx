'use client'

import { mockIssues, mockUsers, mockLabels, type Priority, type Issue } from '@/lib/mock-data'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatDistanceToNow, format } from 'date-fns'
import { notFound, useRouter } from 'next/navigation'
import { ChevronLeft, Circle, Clock, ExternalLink, Flag } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Header } from '@/components/layout/header'

export default function IssuePage({
  params,
}: {
  params: { id: string }
}) {
  const router = useRouter()
  // Convert numeric string IDs to match mock data
  const issue = mockIssues.find((i) => String(i.id) === params.id)

  if (!issue) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container py-6">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-2xl font-semibold">Issue not found</h2>
            <p className="mt-2 text-gray-500">This issue may have been deleted or moved.</p>
            <Button
              variant="ghost"
              className="mt-4 gap-2"
              onClick={() => router.push('/')}
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Issues
            </Button>
          </div>
        </main>
      </div>
    )
  }

  const statusColor = {
    open: 'text-green-600',
    in_progress: 'text-purple-600',
    closed: 'text-red-600',
  }[issue.status]

  const priorityColor = {
    low: 'text-gray-500',
    medium: 'text-blue-500',
    high: 'text-orange-500',
    urgent: 'text-red-500',
  }[issue.priority]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container py-6">
        <div className="max-w-5xl mx-auto">
          {/* Back Button */}
          <header className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              className="gap-2"
              onClick={() => router.push('/')}
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Issues
            </Button>
          </header>

          {/* Title Section */}
          <div className="border-b pb-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-semibold flex items-center gap-3">
                  {issue.title}
                  <span className="text-gray-500">#{issue.id}</span>
                </h1>
                <div className="mt-1 flex items-center gap-2 flex-wrap">
                  <Badge
                    variant="outline"
                    className={cn(
                      'flex items-center gap-1.5',
                      issue.status === 'open'
                        ? 'border-green-600 bg-green-50 hover:bg-green-100'
                        : issue.status === 'closed'
                        ? 'border-red-600 bg-red-50 hover:bg-red-100'
                        : 'border-purple-600 bg-purple-50 hover:bg-purple-100'
                    )}
                  >
                    <Circle className={`h-3 w-3 ${statusColor}`} fill="currentColor" strokeWidth={0} />
                    <span className={statusColor}>
                      {issue.status.replace('_', ' ')}
                    </span>
                  </Badge>
                  <Badge
                    variant="outline"
                    className={cn(
                      'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset transition-colors',
                      {
                        'border-gray-500 bg-gray-50 hover:bg-gray-100': issue.priority === 'low',
                        'border-blue-500 bg-blue-50 hover:bg-blue-100': issue.priority === 'medium',
                        'border-orange-500 bg-orange-50 hover:bg-orange-100': issue.priority === 'high',
                        'border-red-500 bg-red-50 hover:bg-red-100': issue.priority === ('urgent' as Priority),
                      }
                    )}
                  >
                    <Flag className={`h-3 w-3 ${priorityColor}`} />
                    <span className={priorityColor}>
                      {issue.priority.charAt(0).toUpperCase() + issue.priority.slice(1)}
                    </span>
                  </Badge>
                  <span className="text-sm text-gray-600">
                    <span className="font-medium text-gray-900">
                      {mockUsers.find(user => user.id === issue.createdBy)?.name}
                    </span>
                    {' '}opened this issue {formatDistanceToNow(new Date(issue.createdAt))} ago
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {/* Main Content */}
            <div className="md:col-span-2">
              <div className="flex items-start gap-3 bg-white rounded-lg border p-4">
                <Avatar className="mt-1">
                  <AvatarImage 
                    src={mockUsers.find(user => user.id === issue.createdBy)?.avatarUrl} 
                    alt={mockUsers.find(user => user.id === issue.createdBy)?.name} 
                  />
                  <AvatarFallback>
                    {mockUsers.find(user => user.id === issue.createdBy)?.name
                      ?.split(' ')
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
                  {(issue.screenshots ?? []).length > 0 && (
                    <div className="mt-4 space-y-4">
                      {issue.screenshots?.map((screenshot) => (
                        <div key={screenshot.id} className="space-y-2">
                          <p className="text-sm text-gray-500">
                            {screenshot.filename}
                          </p>
                          <img
                            src={screenshot.url}
                            alt={screenshot.filename}
                            className="rounded-lg border"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Assignees */}
              <div>
                <h3 className="text-sm font-medium mb-2 text-gray-600">Assignees</h3>
                <div className="flex flex-wrap gap-2">
                  {issue.assignees && issue.assignees.length > 0 ? (
                    issue.assignees.map((assigneeId) => {
                      const assignee = mockUsers.find(u => u.id === assigneeId)
                      return assignee ? (
                        <div
                          key={assignee.id}
                          className="flex items-center gap-2 bg-gray-50 rounded-full pl-1 pr-3 py-1"
                        >
                          <Avatar className="h-5 w-5">
                            <AvatarImage src={assignee.avatarUrl} />
                            <AvatarFallback>
                              {assignee.name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{assignee.name}</span>
                        </div>
                      ) : null
                    })
                  ) : (
                    <p className="text-sm text-gray-500">No assignees</p>
                  )}
                </div>
              </div>

              {/* Due Date */}
              {issue.dueDate && (
                <div>
                  <h3 className="text-sm font-medium mb-2 text-gray-600">Due Date</h3>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>{format(new Date(issue.dueDate), 'PPP')}</span>
                  </div>
                </div>
              )}

              {/* Labels */}
              <div>
                <h3 className="text-sm font-medium mb-2 text-gray-600">Labels</h3>
                <div className="flex flex-wrap gap-1">
                  {issue.labels && issue.labels.length > 0 ? (
                    issue.labels.map((labelId) => {
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
                    })
                  ) : (
                    <p className="text-sm text-gray-500">No labels</p>
                  )}
                </div>
              </div>

              {/* Related URL */}
              {issue.url && (
                <div>
                  <h3 className="text-sm font-medium mb-2 text-gray-600">Related URL</h3>
                  <a
                    href={issue.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Visit URL
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
