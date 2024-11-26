import { IssueList } from '@/components/issues/issue-list'
import { Header } from '@/components/layout/header'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container py-6">
        <IssueList />
      </main>
    </div>
  )
}
