'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { MultiSelect } from '@/components/ui/multi-select'
import { Header } from '@/components/layout/header'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { issueSchema, type IssueInput } from '@/lib/validations/issue'
import { mockLabels, mockUsers } from '@/lib/mock-data'
import { useRouter } from 'next/navigation'
import { ChevronLeft, Upload } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'

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

  const [previewUrls, setPreviewUrls] = useState<string[]>([])

  const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const urls = Array.from(files).map((file) => URL.createObjectURL(file))
    setPreviewUrls(urls)
    setValue('screenshots', Array.from(files))
  }

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
              <label htmlFor="title">Title</label>
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
              <label htmlFor="description">Description</label>
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
                <label>Priority</label>
                <Select
                  value={watch('priority')}
                  onValueChange={(value: 'low' | 'medium' | 'high' | 'urgent') => setValue('priority', value)}
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
                <label>Status</label>
                <Select
                  value={watch('status')}
                  onValueChange={(value: 'open' | 'in_progress' | 'closed') => setValue('status', value)}
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
                <label>Labels</label>
                <MultiSelect
                  items={mockLabels.map(label => ({
                    value: label.id,
                    label: label.name,
                  }))}
                  selected={watch('labels')}
                  onValueChange={(value) => setValue('labels', value)}
                  placeholder="Select labels"
                />
                {errors.labels && (
                  <p className="text-sm text-red-500">{errors.labels.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label>Assignees</label>
                <MultiSelect
                  items={mockUsers.map(user => ({
                    value: user.id,
                    label: user.name,
                  }))}
                  selected={watch('assignees')}
                  onValueChange={(value) => setValue('assignees', value)}
                  placeholder="Select assignees"
                />
                {errors.assignees && (
                  <p className="text-sm text-red-500">{errors.assignees.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="url">URL</label>
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
              <label>Screenshots</label>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('screenshots')?.click()}
                  className="gap-2"
                >
                  <Upload className="h-4 w-4" />
                  Add Screenshots
                </Button>
                <input
                  type="file"
                  id="screenshots"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleScreenshotChange}
                />
              </div>
              <div className="mt-4 space-y-4">
                {previewUrls.map((url, index) => (
                  <div key={index} className="rounded-lg overflow-hidden border">
                    <Image
                      src={url}
                      alt={`Preview ${index + 1}`}
                      width={800}
                      height={600}
                      className="w-full h-auto"
                    />
                  </div>
                ))}
              </div>
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
