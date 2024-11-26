import Link from 'next/link'
import { useRouter } from 'next/router'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { PlusCircle, ListTodo, Home } from 'lucide-react'

const sidebarItems = [
  {
    title: 'Home',
    href: '/',
    icon: Home,
  },
  {
    title: 'Issues',
    href: '/issues',
    icon: ListTodo,
  },
  {
    title: 'New Issue',
    href: '/issues/new',
    icon: PlusCircle,
  },
]

export default function Sidebar() {
  const router = useRouter()

  return (
    <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
      <div className="flex h-full flex-col gap-2">
        <div className="flex-1 space-y-1 p-4">
          {sidebarItems.map((item) => {
            const isActive = router.pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? 'secondary' : 'ghost'}
                  className={cn(
                    'w-full justify-start gap-2',
                    isActive && 'bg-gray-200 dark:bg-gray-700'
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Button>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
