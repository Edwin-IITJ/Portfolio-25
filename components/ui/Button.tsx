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
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 smooth-transition'
  
  const variants = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-gray-800 hover:bg-gray-900 text-white shadow-lg hover:shadow-xl',
    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white',
    ghost: 'text-gray-600 hover:text-primary-600 hover:bg-gray-100'
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className} ${
    disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
  }`

  const MotionElement = motion.button

  const content = (
    <MotionElement
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      className={classes}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </MotionElement>
  )

  if (href && !disabled) {
    return (
      <a href={href} target={target} rel={target === '_blank' ? 'noopener noreferrer' : undefined} className="inline-block">
        <motion.span
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={classes}
        >
          {children}
        </motion.span>
      </a>
    )
  }

  return content
}

export default Button
