import { Variants } from 'framer-motion'

/**
 * Fade In Up animation
 * Smoothly fades in while moving up
 */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  },
}

/**
 * Fade In animation
 * Simple fade-in without movement
 */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  },
}

/**
 * Slide Up animation
 * Slides element from below
 */
export const slideUp: Variants = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.4, 0, 0.2, 1],
    },
  },
}

/**
 * Staggered container animation for lists
 */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.12,
    },
  },
}
