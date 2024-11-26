'use client'

import { IssueCard } from './issue-card'
import { mockIssues } from '@/lib/mock-data'

export function IssueList() {
  return (
    <div className="space-y-4">
      {mockIssues.map((issue) => (
        <IssueCard key={issue.id} issue={issue} />
      ))}
    </div>
  )
}
