'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { issueSchema, type IssueInput } from '@/lib/validations/issue'
import { mockLabels, mockUsers } from '@/lib/mock-data'
import { MultiSelect } from '@/components/ui/multi-select'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ChevronLeft, Upload } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { Header } from '@/components/layout/header'

export default function NewIssuePage() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<IssueInput>({
    resolver: zodResolver(issueSchema),
    defaultValues: {
      title: '',
      description: '',
      priority: 'low',
      status: 'open',
      labels: [],
      assignees: [],
      url: '',
      screenshots: [],
      dueDate: ''
    },
  })

  const onSubmit = async (data: IssueInput) => {
    // TODO: Implement issue creation
    console.log(data)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const screenshots = watch('screenshots') || []
    const newScreenshots = Array.from(files)

    setValue('screenshots', [...screenshots, ...newScreenshots])
  }

  const screenshots = watch('screenshots')

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container py-6">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Button
              variant="ghost"
              className="gap-2"
              onClick={() => router.push('/')}
            >
              <ChevronLeft className="h-4 w-4" />
              Back to issues
            </Button>
          </div>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold">New Issue</h1>
            <p className="text-sm text-gray-500">
              Create a new issue to track bugs, feature requests, or other tasks.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Issue title"
                {...register('title')}
                className={`w-full ${errors.title ? 'border-red-500' : ''}`}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Add a description..."
                {...register('description')}
                className={`min-h-[200px] ${errors.description ? 'border-red-500' : ''}`}
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Priority</Label>
                <Select
                  value={watch('priority')}
                  onValueChange={(value) => setValue('priority', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
                {errors.priority && (
                  <p className="text-sm text-red-500">{errors.priority.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={watch('status')}
                  onValueChange={(value) => setValue('status', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
                {errors.status && (
                  <p className="text-sm text-red-500">{errors.status.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Labels</Label>
                <MultiSelect
                  items={mockLabels.map(label => ({
                    value: label.id,
                    label: label.name,
                  }))}
                  value={watch('labels')}
                  onValueChange={(value) => setValue('labels', value as string[])}
                  placeholder="Select labels"
                />
                {errors.labels && (
                  <p className="text-sm text-red-500">{errors.labels.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Assignees</Label>
                <MultiSelect
                  items={mockUsers.map(user => ({
                    value: user.id,
                    label: user.name,
                  }))}
                  value={watch('assignees')}
                  onValueChange={(value) => setValue('assignees', value as string[])}
                  placeholder="Select assignees"
                />
                {errors.assignees && (
                  <p className="text-sm text-red-500">{errors.assignees.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                type="url"
                placeholder="Related URL (optional)"
                {...register('url')}
                className={errors.url ? 'border-red-500' : ''}
              />
              {errors.url && (
                <p className="text-sm text-red-500">{errors.url.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Screenshots</Label>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('screenshots')?.click()}
                  className={`${errors.screenshots ? 'border-red-500' : ''}`}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload screenshots
                </Button>
                <Input
                  id="screenshots"
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
              {errors.screenshots && (
                <p className="text-sm text-red-500">{errors.screenshots.message}</p>
              )}
              {watch('screenshots')?.length > 0 && (
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {watch('screenshots').map((url, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(url)}
                        alt={`Screenshot ${index + 1}`}
                        className="w-full h-40 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const screenshots = watch('screenshots')
                          setValue(
                            'screenshots',
                            screenshots.filter((_, i) => i !== index)
                          )
                        }}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <Button type="submit" size="lg">
                Create issue
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
