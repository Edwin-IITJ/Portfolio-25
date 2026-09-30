import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  href?: string
  target?: string
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  href, 
  target,
  className = '', 
  disabled = false,
  type = 'button'
}: ButtonProps) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg smooth-transition'
  
  const variants: Record<string, string> = {
    primary: '',
    secondary: '',
    outline: '',
    ghost: '',
  }
  
  // ── Handcrafted Light theme styles ────────────────────────────────────────
  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      backgroundColor: 'var(--color-black-solid)',
      color: '#FFFFFF',
    },
    secondary: {
      backgroundColor: 'var(--color-surface-2)',
      color: 'var(--color-text-primary)',
    },
    outline: {
      backgroundColor: 'transparent',
      color: 'var(--color-black-solid)',
      border: '1px solid var(--color-black-solid)',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--color-text-secondary)',
    },
  }

  const hoverStyles: Record<string, React.CSSProperties> = {
    primary: {
      backgroundColor: '#333333',
      color: '#FFFFFF',
    },
    secondary: {
      backgroundColor: '#E8E8E8',
      color: 'var(--color-text-primary)',
    },
    outline: {
      backgroundColor: 'var(--color-black-solid)',
      color: '#FFFFFF',
      border: '1px solid var(--color-black-solid)',
    },
    ghost: {
      backgroundColor: 'var(--color-surface-2)',
      color: 'var(--color-text-primary)',
    },
  }
  
  const sizes: Record<string, string> = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className} ${
    disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
  }`

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (disabled) return
    const style = hoverStyles[variant]
    Object.assign(e.currentTarget.style, style)
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    if (disabled) return
    const style = variantStyles[variant]
    Object.assign(e.currentTarget.style, style)
  }

  if (href && !disabled) {
    return (
      <a href={href} target={target} rel={target === '_blank' ? 'noopener noreferrer' : undefined} className="inline-block">
        <span
          className={classes}
          style={variantStyles[variant]}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {children}
        </span>
      </a>
    )
  }

  return (
    <button
      className={classes}
      style={variantStyles[variant]}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      type={type}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  )
}

export default Button
