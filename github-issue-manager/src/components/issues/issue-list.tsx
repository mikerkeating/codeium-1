'use client'

import { useQuery } from '@tanstack/react-query'
import { IssueCard } from './issue-card'
import { Skeleton } from '@/components/ui/skeleton'
import { Issue } from '@/types'

export function IssueList() {
  const { data: issues, isLoading } = useQuery<Issue[]>({
    queryKey: ['issues'],
    queryFn: async () => {
      const response = await fetch('/api/issues')
      if (!response.ok) {
        throw new Error('Failed to fetch issues')
      }
      return response.json()
    },
  })

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="p-4 border rounded-lg">
            <Skeleton className="h-6 w-1/3 mb-2" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ))}
      </div>
    )
  }

  if (!issues?.length) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No issues found.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {issues.map((issue) => (
        <IssueCard key={issue.id} issue={issue} />
      ))}
    </div>
  )
}
