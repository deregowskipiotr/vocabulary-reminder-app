import * as React from 'react'
import { cn } from '@/lib/utils'

export interface MetallicButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const MetallicButton = React.forwardRef<HTMLButtonElement, MetallicButtonProps>(
  (
    {
      className,
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: 'h-8 px-3 text-xs gap-1.5',
      md: 'h-10 px-4 text-sm gap-2',
      lg: 'h-12 px-6 text-base gap-2.5',
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          // Layout & Core
          'group relative inline-flex items-center justify-center font-medium select-none',
          'rounded-md overflow-hidden cursor-pointer isolate',
          // Strictly no scale transforms per guidelines
          'transition-[background-color,border-color,box-shadow,color,opacity] duration-500 ease-in-out',
          
          // Colors & Metallic Gradient Base
          'text-text border border-[#3f4350]/70',
          'bg-[linear-gradient(180deg,#2c2e38_0%,#1a1c23_48%,#121318_52%,#1c1e27_100%)]',
          
          // Figma-grade Specular Highlight & Metallic Depth
          'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.28),inset_0_-1px_1px_0_rgba(0,0,0,0.7),0_2px_6px_rgba(0,0,0,0.5)]',
          
          // Metallic Hover State: Illuminated rim, rich decor blue specular bloom, brightened texture
          'hover:border-decor/60 hover:text-white',
          'hover:bg-[linear-gradient(180deg,#383b47_0%,#22252e_48%,#171920_52%,#242733_100%)]',
          'hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.45),inset_0_-1px_1px_0_rgba(0,0,0,0.6),0_0_22px_-2px_rgba(32,54,238,0.45),0_4px_12px_rgba(0,0,0,0.6)]',
          
          // Active State (No scale, pure depth shift)
          'active:bg-[linear-gradient(180deg,#171920_0%,#131419_50%,#0f1014_100%)]',
          'active:shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.8),inset_0_-1px_0_0_rgba(255,255,255,0.1),0_1px_2px_rgba(0,0,0,0.4)]',
          'active:border-decor/40',
          
          // Focus state
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-decor focus-visible:ring-offset-2 focus-visible:ring-offset-main',
          
          // Disabled state
          'disabled:opacity-45 disabled:cursor-not-allowed disabled:pointer-events-none disabled:shadow-none',
          
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {/* Subtle metallic diagonal light sweep on hover */}
        <span
          className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(105deg,transparent_20%,rgba(255,255,255,0.12)_45%,rgba(32,54,238,0.18)_50%,rgba(255,255,255,0.12)_55%,transparent_80%)] transition-transform duration-700 ease-out group-hover:translate-x-full"
          aria-hidden="true"
        />

        {/* Loading Spinner or Left Icon */}
        {isLoading ? (
          <svg
            className="animate-spin h-4 w-4 text-text"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              className="opacity-90"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          leftIcon && (
            <span className="inline-flex shrink-0 items-center justify-center" aria-hidden="true">
              {leftIcon}
            </span>
          )
        )}

        {/* Button Content */}
        <span className="relative z-10 tracking-[0.015em] drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
          {children}
        </span>

        {/* Right Icon */}
        {!isLoading && rightIcon && (
          <span className="inline-flex shrink-0 items-center justify-center" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </button>
    )
  }
)

MetallicButton.displayName = 'MetallicButton'
