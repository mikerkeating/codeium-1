export type Priority = 'low' | 'medium' | 'high' | 'urgent'
export type Status = 'open' | 'in_progress' | 'closed'

export interface Label {
  id: string
  name: string
  color: string
}

export interface User {
  id: string
  name: string
  email: string
  avatarUrl: string
}

export interface Screenshot {
  id: string
  url: string
  filename: string
  uploadedAt: string
}

export interface Issue {
  id: string
  title: string
  description: string
  status: Status
  priority: Priority
  createdAt: string
  updatedAt: string
  createdBy: string
  labels?: string[]
  assignees?: string[]
  url?: string
  screenshots?: Screenshot[]
  dueDate?: string
}

export const mockLabels: Label[] = [
  { id: '1', name: 'bug', color: '#dc3545' },
  { id: '2', name: 'feature', color: '#28a745' },
  { id: '3', name: 'documentation', color: '#17a2b8' },
  { id: '4', name: 'enhancement', color: '#007bff' },
  { id: '5', name: 'help wanted', color: '#6610f2' },
  { id: '6', name: 'good first issue', color: '#ffc107' },
]

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatarUrl: 'https://avatars.githubusercontent.com/u/1?v=4',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatarUrl: 'https://avatars.githubusercontent.com/u/2?v=4',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    avatarUrl: 'https://avatars.githubusercontent.com/u/3?v=4',
  },
]

export const mockScreenshots: Screenshot[] = [
  {
    id: '1',
    url: 'https://picsum.photos/800/600',
    filename: 'error-screenshot.png',
    uploadedAt: '2024-01-10T10:30:00Z',
  },
  {
    id: '2',
    url: 'https://picsum.photos/800/601',
    filename: 'feature-mockup.png',
    uploadedAt: '2024-01-11T14:20:00Z',
  },
]

export const mockIssues: Issue[] = [
  {
    id: '1',
    title: 'Fix navigation bug in mobile view',
    description: 'The navigation menu is not responsive on mobile devices',
    status: 'open',
    priority: 'high',
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-10T10:00:00Z',
    createdBy: '1',
    labels: ['1', '4'],
    assignees: ['2'],
    url: 'https://github.com/org/repo/issues/1',
    screenshots: [mockScreenshots[0]],
  },
  {
    id: '2',
    title: 'Add dark mode support',
    description: 'Implement dark mode theme across the application',
    status: 'in_progress',
    priority: 'medium',
    createdAt: '2024-01-09T15:30:00Z',
    updatedAt: '2024-01-11T09:00:00Z',
    createdBy: '2',
    labels: ['2', '4'],
    assignees: ['1', '3'],
    url: 'https://github.com/org/repo/issues/2',
    screenshots: [mockScreenshots[1]],
  },
]

export const priorityColors: Record<Priority, string> = {
  low: '#28a745',
  medium: '#ffc107',
  high: '#dc3545',
  urgent: '#6f42c1',
}

export const statusColors: Record<Status, string> = {
  open: '#28a745',
  in_progress: '#ffc107',
  closed: '#6c757d',
}
