import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merges Tailwind CSS classes with proper precedence
 * Useful for component variants and conditional styling
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ── UNUSED UTILITIES ──────────────────────────────────────────────────────────
// The functions below are not currently imported anywhere in the codebase.
// They are preserved as a utility library for future features.
// To use any function, simply uncomment it and import where needed.

// /**
//  * [UNUSED] Formats a date string to a readable format.
//  * Potential use: Blog post dates, project timeline display.
//  */
// export function formatDate(dateString: string): string {
//   const date = new Date(dateString)
//   return new Intl.DateTimeFormat('en-US', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//   }).format(date)
// }

// /**
//  * [UNUSED] Truncates text to a specified length.
//  * Potential use: Card descriptions, meta descriptions.
//  */
// export function truncateText(text: string, length: number): string {
//   if (text.length <= length) return text
//   return text.slice(0, length) + '...'
// }

// /**
//  * [UNUSED] Validates email format.
//  * Potential use: Contact form validation.
//  */
// export function isValidEmail(email: string): boolean {
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
//   return emailRegex.test(email)
// }

// /**
//  * [UNUSED] Generates a slug from a string.
//  * Potential use: Dynamic route generation from project titles.
//  */
// export function slugify(text: string): string {
//   return text
//     .toLowerCase()
//     .trim()
//     .replace(/[^\w\s-]/g, '')
//     .replace(/[\s_-]+/g, '-')
//     .replace(/^-+|-+$/g, '')
// }

// /**
//  * [UNUSED] Debounce function to limit function calls.
//  * Potential use: Search input, scroll handlers, resize listeners.
//  */
// export function debounce<T extends (...args: any[]) => any>(
//   func: T,
//   wait: number
// ): (...args: Parameters<T>) => void {
//   let timeout: NodeJS.Timeout | null = null
//
//   return function executedFunction(...args: Parameters<T>) {
//     const later = () => {
//       timeout = null
//       func(...args)
//     }
//
//     if (timeout) clearTimeout(timeout)
//     timeout = setTimeout(later, wait)
//   }
// }

// /**
//  * [UNUSED] Gets the reading time for text content.
//  * Potential use: Blog posts, case study reading time estimate.
//  */
// export function getReadingTime(text: string, wordsPerMinute: number = 200): number {
//   const words = text.trim().split(/\s+/).length
//   return Math.ceil(words / wordsPerMinute)
// }

// /**
//  * [UNUSED] Copies text to clipboard.
//  * Potential use: Share links, code snippet copying.
//  */
// export async function copyToClipboard(text: string): Promise<boolean> {
//   try {
//     await navigator.clipboard.writeText(text)
//     return true
//   } catch (error) {
//     console.error('Failed to copy text:', error)
//     return false
//   }
// }

// /**
//  * [UNUSED] Smooth scroll to element with offset.
//  * Potential use: Navbar scroll-to-section with fixed header offset.
//  * Note: Currently, Hero.tsx and Navbar.tsx use native scrollIntoView instead.
//  */
// export function smoothScrollTo(elementId: string, offset: number = 0): void {
//   const element = document.getElementById(elementId)
//   if (element) {
//     const elementPosition = element.getBoundingClientRect().top
//     const offsetPosition = elementPosition + window.pageYOffset - offset
//
//     window.scrollTo({
//       top: offsetPosition,
//       behavior: 'smooth',
//     })
//   }
// }

// /**
//  * [UNUSED] Checks if user prefers reduced motion.
//  * Potential use: Disabling GSAP/Framer Motion animations for a11y.
//  */
// export function prefersReducedMotion(): boolean {
//   return window.matchMedia('(prefers-reduced-motion: reduce)').matches
// }

// /**
//  * [UNUSED] Formats a number with commas.
//  * Potential use: Stats display (e.g., "1,234 users").
//  */
// export function formatNumber(num: number): string {
//   return new Intl.NumberFormat('en-US').format(num)
// }

// /**
//  * [UNUSED] Gets random items from an array.
//  * Potential use: Random project showcase, testimonial rotation.
//  * Note: [slug].tsx currently uses its own inline shuffle for related projects.
//  */
// export function getRandomItems<T>(array: T[], count: number): T[] {
//   const shuffled = [...array].sort(() => 0.5 - Math.random())
//   return shuffled.slice(0, count)
// }
