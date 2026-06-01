import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'highlighted'
}

export function Card({ variant = 'default', className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl p-6 transition-all',
        {
          'bg-neutral-900 border border-neutral-800': variant === 'default',
          'bg-neutral-900 border border-amber-500/50 shadow-amber-500/10 shadow-lg': variant === 'highlighted',
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
