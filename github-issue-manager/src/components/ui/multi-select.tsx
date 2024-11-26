'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Check, ChevronsUpDown, X } from 'lucide-react'

export interface MultiSelectProps {
  items?: { value: string; label: string }[]
  placeholder?: string
  value?: string | string[]
  onValueChange: (value: string | string[]) => void
  multiple?: boolean
}

export function MultiSelect({
  items = [],
  placeholder = 'Select items...',
  value,
  onValueChange,
  multiple = true,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)
  const selected = React.useMemo(() => {
    if (multiple) {
      return Array.isArray(value) ? value : []
    }
    return value ? [value] : []
  }, [value, multiple])

  const handleSelect = (currentValue: string) => {
    if (multiple) {
      const newSelected = selected.includes(currentValue)
        ? selected.filter((item) => item !== currentValue)
        : [...selected, currentValue]
      onValueChange(newSelected)
    } else {
      onValueChange(currentValue)
    }
    if (!multiple) {
      setOpen(false)
    }
  }

  const handleDeselect = (currentValue: string) => {
    if (multiple) {
      const newSelected = selected.filter((item) => item !== currentValue)
      onValueChange(newSelected)
    } else {
      onValueChange('')
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          <div className="flex gap-1 flex-wrap">
            {selected.length === 0 && placeholder}
            {selected.map((value) => {
              const item = items.find((opt) => opt.value === value)
              return item ? (
                <div
                  key={item.value}
                  className="bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded-sm text-sm flex items-center gap-1"
                >
                  {item.label}
                  <span
                    role="button"
                    tabIndex={0}
                    className="hover:bg-secondary/80 rounded-sm cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeselect(item.value)
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        e.stopPropagation()
                        handleDeselect(item.value)
                      }
                    }}
                  >
                    <X className="h-3 w-3" />
                  </span>
                </div>
              ) : null
            })}
          </div>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder={`Search ${placeholder.toLowerCase()}...`} />
          <CommandEmpty>No items found.</CommandEmpty>
          <CommandGroup className="max-h-64 overflow-auto">
            {items.map((item) => (
              <CommandItem
                key={item.value}
                onSelect={() => handleSelect(item.value)}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    selected.includes(item.value)
                      ? 'opacity-100'
                      : 'opacity-0'
                  )}
                />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
