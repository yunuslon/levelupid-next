'use client'

import { Check } from 'lucide-react'
import { forwardRef } from 'react'
import { cn } from '../lib/utils'

export interface CheckboxProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'type' | 'onChange'
  > {
  onCheckedChange?: (checked: boolean) => void
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, checked, onCheckedChange, ...props }, ref) => {
    return (
      <span className={cn('relative inline-flex size-4 shrink-0', className)}>
        <input
          ref={ref}
          type="checkbox"
          checked={checked}
          onChange={(e) => onCheckedChange?.(e.target.checked)}
          className="peer size-full cursor-pointer appearance-none rounded border border-[var(--border)] bg-[var(--card)] checked:border-[var(--primary)] checked:bg-[var(--primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]/40 disabled:cursor-not-allowed disabled:opacity-50"
          {...props}
        />
        <Check
          className="pointer-events-none absolute inset-0 m-auto size-3 text-white opacity-0 peer-checked:opacity-100"
          strokeWidth={3}
        />
      </span>
    )
  },
)
Checkbox.displayName = 'Checkbox'

export { Checkbox }
