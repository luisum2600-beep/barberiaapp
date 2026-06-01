import { InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label className="text-sm text-gray-400 font-medium">{label}</label>
        )}
        <input
          ref={ref}
          className={cn(
            'bg-neutral-900 border border-neutral-700 text-white rounded-lg px-4 py-2.5',
            'placeholder:text-gray-600 focus:outline-none focus:border-amber-500 transition-colors',
            error && 'border-red-500 focus:border-red-500',
            className
          )}
          {...props}
        />
        {error && <p className="text-red-400 text-xs">{error}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'
