'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Check, ChevronsUpDown, X } from 'lucide-react'

export interface MultiSelectProps {
  items?: { value: string; label: string }[]
  selected?: string[]
  onValueChange: (value: string[]) => void
  placeholder?: string
}

export function MultiSelect({
  items = [],
  selected = [],
  onValueChange,
  placeholder = 'Select items...',
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)

  const handleSelect = (currentValue: string) => {
    if (selected.includes(currentValue)) {
      onValueChange(selected.filter((item) => item !== currentValue))
    } else {
      onValueChange([...selected, currentValue])
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
          <div className="flex flex-wrap gap-1">
            {selected.length === 0 && placeholder}
            {selected.map((selectedValue) => {
              const item = items.find((i) => i.value === selectedValue)
              return item ? (
                <Badge
                  key={item.value}
                  variant="secondary"
                  className="rounded-sm px-1 font-normal"
                >
                  {item.label}
                  <button
                    className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleSelect(item.value)
                    }}
                  >
                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                    <span className="sr-only">Remove {item.label}</span>
                  </button>
                </Badge>
              ) : null
            })}
          </div>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command className="border rounded-md">
          <div className="flex flex-wrap gap-1 p-2">
            {selected.map((selectedValue) => {
              const item = items.find((i) => i.value === selectedValue)
              return item ? (
                <Badge
                  key={item.value}
                  variant="secondary"
                  className="rounded-sm px-1 font-normal"
                >
                  {item.label}
                  <button
                    className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onClick={() => handleSelect(item.value)}
                  >
                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                    <span className="sr-only">Remove {item.label}</span>
                  </button>
                </Badge>
              ) : null
            })}
          </div>
          <div className="flex items-center border-t px-3">
            <CommandInput placeholder={placeholder} />
          </div>
          <CommandList>
            <CommandEmpty>No items found.</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  onSelect={() => handleSelect(item.value)}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      selected.includes(item.value) ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
