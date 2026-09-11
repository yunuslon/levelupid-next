'use client'

import { forwardRef, useState } from 'react'
import { cn } from '../lib/utils'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-colors'

    const variants = {
      default:
        'bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90',
      outline:
        'border border-[var(--border)] bg-transparent hover:bg-[var(--muted)]',
      ghost: 'hover:bg-[var(--muted)]',
      destructive: 'bg-red-600 text-white hover:bg-red-700',
    }

    const sizes = {
      sm: 'px-3 py-1.5 text-sm rounded-md',
      md: 'px-4 py-2 text-base rounded-lg',
      lg: 'px-6 py-3 text-lg rounded-xl',
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button }
