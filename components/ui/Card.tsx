import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  onClick?: () => void
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const Card = ({ 
  children, 
  className = '', 
  hover = false, 
  onClick,
  padding = 'md'
}: CardProps) => {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }

  return (
    <motion.div
      className={`bg-white rounded-xl shadow-lg overflow-hidden ${
        hover ? 'card-hover cursor-pointer' : ''
      } ${paddingClasses[padding]} ${className}`}
      whileHover={hover ? { y: -8 } : {}}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}

export default Card
