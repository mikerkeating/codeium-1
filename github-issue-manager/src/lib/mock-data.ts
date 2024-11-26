import { Issue } from '@/types'

export const mockIssues: Issue[] = [
  {
    id: '1',
    title: 'Implement OAuth Authentication',
    description: 'Set up GitHub OAuth authentication flow for user login and authorization.',
    priority: 'high',
    status: 'in_progress',
    labels: ['authentication', 'security'],
    assignees: [
      {
        id: '1',
        name: 'John Doe',
        avatarUrl: 'https://avatars.githubusercontent.com/u/1'
      }
    ],
    createdAt: new Date('2024-01-15').toISOString(),
    updatedAt: new Date('2024-01-16').toISOString(),
    creator: {
      id: '2',
      name: 'Jane Smith',
      avatarUrl: 'https://avatars.githubusercontent.com/u/2'
    }
  },
  {
    id: '2',
    title: 'Add Dark Mode Support',
    description: 'Implement dark mode theme switching functionality with system preference detection.',
    priority: 'medium',
    status: 'open',
    labels: ['ui', 'enhancement'],
    assignees: [],
    createdAt: new Date('2024-01-14').toISOString(),
    updatedAt: new Date('2024-01-14').toISOString(),
    creator: {
      id: '1',
      name: 'John Doe',
      avatarUrl: 'https://avatars.githubusercontent.com/u/1'
    }
  },
  {
    id: '3',
    title: 'Fix Mobile Responsiveness',
    description: 'Address layout issues on mobile devices, particularly in the issue list view.',
    priority: 'high',
    status: 'open',
    labels: ['bug', 'mobile'],
    assignees: [
      {
        id: '2',
        name: 'Jane Smith',
        avatarUrl: 'https://avatars.githubusercontent.com/u/2'
      }
    ],
    createdAt: new Date('2024-01-13').toISOString(),
    updatedAt: new Date('2024-01-15').toISOString(),
    creator: {
      id: '3',
      name: 'Mike Johnson',
      avatarUrl: 'https://avatars.githubusercontent.com/u/3'
    }
  },
  {
    id: '4',
    title: 'Implement Search Functionality',
    description: 'Add search capability to filter issues by title, description, and labels.',
    priority: 'medium',
    status: 'open',
    labels: ['feature', 'search'],
    assignees: [
      {
        id: '1',
        name: 'John Doe',
        avatarUrl: 'https://avatars.githubusercontent.com/u/1'
      },
      {
        id: '3',
        name: 'Mike Johnson',
        avatarUrl: 'https://avatars.githubusercontent.com/u/3'
      }
    ],
    createdAt: new Date('2024-01-12').toISOString(),
    updatedAt: new Date('2024-01-12').toISOString(),
    creator: {
      id: '2',
      name: 'Jane Smith',
      avatarUrl: 'https://avatars.githubusercontent.com/u/2'
    }
  },
  {
    id: '5',
    title: 'Performance Optimization',
    description: 'Optimize application performance by implementing caching and lazy loading.',
    priority: 'low',
    status: 'closed',
    labels: ['optimization', 'performance'],
    assignees: [],
    createdAt: new Date('2024-01-10').toISOString(),
    updatedAt: new Date('2024-01-11').toISOString(),
    creator: {
      id: '3',
      name: 'Mike Johnson',
      avatarUrl: 'https://avatars.githubusercontent.com/u/3'
    }
  }
]
