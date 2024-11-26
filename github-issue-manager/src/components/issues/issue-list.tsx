'use client'

import { IssueCard } from './issue-card'
import { mockIssues } from '@/lib/mock-data'
import { Button } from '@/components/ui/button'
import { ListFilter, Search } from 'lucide-react'

export function IssueList() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 pb-4">
        <div className="flex-1 flex items-center gap-2 max-w-lg">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search all issues"
              className="w-full pl-9 pr-4 py-1.5 text-sm rounded-lg border bg-gray-50 hover:bg-white focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            />
          </div>
          <Button variant="outline" size="sm" className="text-sm gap-2">
            <ListFilter className="h-4 w-4" />
            Filters
          </Button>
        </div>
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          New Issue
        </Button>
      </div>

      {/* List Header */}
      <div className="flex items-center justify-between border-b bg-gray-50 px-4 py-2">
        <div className="flex items-center gap-2 text-sm font-medium">
          <span>{mockIssues.length} Open</span>
          <span className="text-gray-500">·</span>
          <button className="text-gray-500 hover:text-gray-900">
            {mockIssues.filter(i => i.status === 'closed').length} Closed
          </button>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <button className="hover:text-gray-900">Author</button>
          <button className="hover:text-gray-900">Label</button>
          <button className="hover:text-gray-900">Projects</button>
          <button className="hover:text-gray-900">Milestones</button>
          <button className="hover:text-gray-900">Assignee</button>
          <button className="hover:text-gray-900">Sort</button>
        </div>
      </div>

      {/* Issues */}
      <div className="border rounded-lg divide-y">
        {mockIssues.map((issue) => (
          <IssueCard key={issue.id} issue={issue} />
        ))}
      </div>
    </div>
  )
}
