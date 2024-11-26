'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Plus } from 'lucide-react'

export function CreateIssueButton() {
  const router = useRouter()

  return (
    <Button
      onClick={() => router.push('/issues/new')}
      className="gap-2"
    >
      <Plus className="h-4 w-4" />
      New Issue
    </Button>
  )
}
