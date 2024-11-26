import { z } from 'zod'

export const IssueSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  priority: z.enum(['low', 'medium', 'high']),
  labels: z.array(z.string()),
  assignees: z.array(z.string()).optional(),
})

export type Issue = z.infer<typeof IssueSchema>

export const WorkBreakdownSchema = z.object({
  tasks: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      estimate: z.number(),
      assignee: z.string().optional(),
    })
  ),
  totalEstimate: z.number(),
})

export type WorkBreakdown = z.infer<typeof WorkBreakdownSchema>
