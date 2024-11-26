import { mockIssues, mockLabels, mockUsers } from '@/lib/mock-data'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Circle, Clock, ExternalLink } from 'lucide-react'
import { Header } from '@/components/layout/header'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export async function generateStaticParams() {
  return mockIssues.map((issue) => ({
    id: String(issue.id),
  }))
}

export default async function IssuePage({
  params,
}: {
  params: { id: string }
}) {
  const issue = mockIssues.find((i) => String(i.id) === params.id)

  if (!issue) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container py-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-gray-900">Issue not found</h2>
              <p className="mt-2 text-gray-600">The issue you&apos;re looking for doesn&apos;t exist or has been moved.</p>
              <Link href="/">
                <Button
                  variant="ghost"
                  className="mt-4 gap-2"
                >
                  Back to Issues
                </Button>
              </Link>
            </div>
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container py-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <Link href="/">
              <Button variant="ghost" className="gap-2">
                Back to Issues
              </Button>
            </Link>
          </div>

          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b">
              <div className="flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-4 mb-1">
                    <Badge
                      variant="outline"
                      className={cn(
                        'inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset'
                      )}
                    >
                      <Circle className={`h-3 w-3 ${statusColor}`} fill="currentColor" strokeWidth={0} />
                      <span className={statusColor}>
                        {issue.status.replace('_', ' ')}
                      </span>
                    </Badge>
                    <span className="text-sm text-gray-600">
                      <span className="font-medium text-gray-900">
                        {mockUsers.find(user => user.id === issue.createdBy)?.name}
                      </span>
                      {' '}opened this issue 
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="prose max-w-none">
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarImage src={mockUsers.find(user => user.id === issue.createdBy)?.avatarUrl} />
                        <AvatarFallback>
                          {mockUsers.find(user => user.id === issue.createdBy)?.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h1 className="text-xl font-semibold text-gray-900 mb-4">
                          {issue.title}
                        </h1>
                        <div className="text-gray-700">
                          <p>{issue.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {(issue.screenshots ?? []).length > 0 && (
                    <div className="mt-4 space-y-4">
                      {issue.screenshots?.map((screenshot, index) => (
                        <div key={index} className="rounded-lg overflow-hidden border">
                          <Image
                            src={screenshot.url}
                            alt={screenshot.filename}
                            width={800}
                            height={600}
                            className="w-full h-auto"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-8">
                  {/* Assignees */}
                  <div>
                    <h3 className="text-sm font-medium mb-2 text-gray-600">Assignees</h3>
                    <div className="flex flex-col gap-2">
                      {issue.assignees?.map((assigneeId) => {
                        const assignee = mockUsers.find(user => user.id === assigneeId)
                        return assignee ? (
                          <div key={assignee.id} className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={assignee.avatarUrl} />
                              <AvatarFallback>
                                {assignee.name
                                  .split(' ')
                                  .map((n) => n[0])
                                  .join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-gray-900">{assignee.name}</span>
                          </div>
                        ) : null
                      })}
                    </div>
                  </div>

                  {/* Due Date */}
                  {issue.dueDate && (
                    <div>
                      <h3 className="text-sm font-medium mb-2 text-gray-600">Due Date</h3>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span>{new Date(issue.dueDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  )}

                  {/* Labels */}
                  {issue.labels && issue.labels.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium mb-2 text-gray-600">Labels</h3>
                      <div className="flex flex-wrap gap-2">
                        {issue.labels.map((labelId) => {
                          const label = mockLabels.find(l => l.id === labelId)
                          return label ? (
                            <Badge
                              key={label.id}
                              variant="outline"
                              className="px-2 py-0.5 text-xs"
                              style={{
                                backgroundColor: label.color + '20',
                                borderColor: label.color,
                              }}
                            >
                              {label.name}
                            </Badge>
                          ) : null
                        })}
                      </div>
                    </div>
                  )}

                  {/* URL */}
                  {issue.url && (
                    <div>
                      <h3 className="text-sm font-medium mb-2 text-gray-600">URL</h3>
                      <a
                        href={issue.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        <ExternalLink className="h-4 w-4" />
                        {issue.url}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
