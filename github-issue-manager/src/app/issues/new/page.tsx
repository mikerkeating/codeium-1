'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, Upload } from 'lucide-react'
import { mockLabels, mockUsers, Priority } from '@/lib/mock-data'
import { MultiSelect } from '@/components/ui/multi-select'

export default function NewIssuePage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: '' as Priority,
    dueDate: '',
    labels: [] as string[],
    assignees: [] as string[],
    url: '',
    screenshots: [] as File[],
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement issue creation
    console.log(formData)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        screenshots: [...Array.from(e.target.files!)],
      }))
    }
  }

  return (
    <div className="container max-w-4xl py-6">
      <div className="mb-6">
        <Link 
          href="/issues" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to issues
        </Link>
      </div>

      <h1 className="text-2xl font-semibold mb-8">Create new issue</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="Issue title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="w-full"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Add a description..."
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="min-h-[200px]"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select
              value={formData.priority}
              onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value as Priority }))}
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              type="datetime-local"
              value={formData.dueDate}
              onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Labels</Label>
            <MultiSelect
              options={mockLabels.map(label => ({
                value: label.id,
                label: label.name,
              }))}
              selected={formData.labels}
              onChange={(values) => setFormData(prev => ({ ...prev, labels: values }))}
              placeholder="Select labels"
            />
          </div>

          <div className="space-y-2">
            <Label>Assignees</Label>
            <MultiSelect
              options={mockUsers.map(user => ({
                value: user.id,
                label: user.name,
              }))}
              selected={formData.assignees}
              onChange={(values) => setFormData(prev => ({ ...prev, assignees: values }))}
              placeholder="Select assignees"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="url">URL</Label>
          <Input
            id="url"
            type="url"
            placeholder="Related URL (optional)"
            value={formData.url}
            onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="screenshots">Screenshots</Label>
          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById('screenshots')?.click()}
              className="w-full"
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
          {formData.screenshots.length > 0 && (
            <div className="text-sm text-muted-foreground mt-2">
              {formData.screenshots.length} file(s) selected
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
  )
}
