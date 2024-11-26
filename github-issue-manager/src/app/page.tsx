import { IssueList } from '@/components/issues/issue-list'
import { Header } from '@/components/layout/header'
import { CreateIssueButton } from '@/components/issues/create-issue-button'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Issues</h1>
          <CreateIssueButton />
        </div>
        <IssueList />
      </main>
    </div>
  )
}
