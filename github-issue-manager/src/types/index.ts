import { z } from 'zod'

export const IssueSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  priority: z.enum(['low', 'medium', 'high']),
  status: z.enum(['open', 'in_progress', 'closed']),
  labels: z.array(z.string()),
  assignees: z.array(z.string()).optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  createdBy: z.string(),
})

export type Issue = z.infer<typeof IssueSchema>

export const WorkBreakdownSchema = z.object({
  tasks: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      estimate: z.number(),
      assignee: z.string().optional(),
      status: z.enum(['todo', 'in_progress', 'done']),
    })
  ),
  totalEstimate: z.number(),
})

export type WorkBreakdown = z.infer<typeof WorkBreakdownSchema>

export const CommentSchema = z.object({
  id: z.string(),
  content: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  authorId: z.string(),
  issueId: z.string(),
})

export type Comment = z.infer<typeof CommentSchema>
