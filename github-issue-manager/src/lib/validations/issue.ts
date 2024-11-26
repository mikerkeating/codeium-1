import * as z from 'zod'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

export const createIssueSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(256, 'Title must be less than 256 characters'),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(65535, 'Description must be less than 65535 characters'),
  priority: z.enum(['low', 'medium', 'high', 'urgent'] as const, {
    required_error: 'Please select a priority level',
  }),
  status: z.enum(['open', 'in_progress', 'closed'] as const, {
    required_error: 'Please select a status',
  }),
  dueDate: z
    .string()
    .optional()
    .refine(
      (date) => {
        if (!date) return true
        const selectedDate = new Date(date)
        const now = new Date()
        return selectedDate > now
      },
      { message: 'Due date must be in the future' }
    ),
  labels: z
    .array(z.string())
    .max(10, 'Maximum of 10 labels allowed')
    .optional(),
  assignees: z
    .array(z.string())
    .max(10, 'Maximum of 10 assignees allowed')
    .optional(),
  url: z
    .string()
    .url('Please enter a valid URL')
    .optional()
    .or(z.literal('')),
  screenshots: z
    .array(
      z.custom<File>()
        .refine((file) => file instanceof File, 'Please upload a valid file')
        .refine(
          (file) => file.size <= MAX_FILE_SIZE,
          'File size must be less than 5MB'
        )
        .refine(
          (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
          'Only .jpg, .jpeg, .png and .webp files are accepted'
        )
    )
    .optional()
    .default([]),
})

export const issueSchema = createIssueSchema
export type CreateIssueInput = z.infer<typeof createIssueSchema>
export type IssueInput = CreateIssueInput
