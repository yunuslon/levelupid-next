'use client'

import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { cn } from '../lib/utils'

export interface CollapsibleProps {
  trigger: React.ReactNode
  children: React.ReactNode
  defaultOpen?: boolean
  className?: string
}

export function Collapsible({
  trigger,
  children,
  defaultOpen = false,
  className,
}: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const [height, setHeight] = useState<number | undefined>(undefined)

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-3 text-left font-medium hover:text-[var(--primary)]"
      >
        {trigger}
        <ChevronDown
          className={cn('w-5 h-5 transition-transform', isOpen && 'rotate-180')}
        />
      </button>
      <div
        className="faq-panel overflow-hidden"
        data-open={isOpen ? '' : undefined}
        style={
          isOpen
            ? ({
                '--collapsible-panel-height': `${height}px`,
              } as React.CSSProperties)
            : undefined
        }
        ref={(el) => {
          if (el && isOpen) {
            setHeight(el.scrollHeight)
          }
        }}
      >
        <div className="pb-3">{children}</div>
      </div>
    </div>
  )
}
