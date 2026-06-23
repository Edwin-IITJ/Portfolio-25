// components/sections/Navbar.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Scroll spy to track active section
  useEffect(() => {
    // Only enable scroll spy on homepage
    if (router.pathname !== '/') {
      setActiveSection('')
      return
    }

    const sections = ['home', 'projects', 'about', 'contact']

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px', // Trigger when section is 20% from top
      threshold: 0
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, observerOptions)

    // Observe all sections
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [router.pathname])

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const navItems = [
    { name: 'Home', href: '/#home' },
    { name: 'Work', href: '/#projects' },
    { name: 'About', href: '/#about' },
    { name: 'Contact', href: '/#contact' }
  ]

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)

    // If on homepage, scroll directly
    if (router.pathname === '/') {
      const hash = href.split('#')[1]
      const element = document.getElementById(hash)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      // Navigate to homepage first, then scroll
      router.push(href)
    }
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all`}
        style={{
          transitionDuration: 'var(--motion-default)',
          backgroundColor: isScrolled ? 'rgba(26, 24, 21, 0.85)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(12px)' : 'none',
          borderBottom: isScrolled ? '1px solid var(--color-border)' : '1px solid transparent',
        }}
      >
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className="text-xl md:text-2xl font-display font-light transition-colors"
              style={{
                color: 'var(--color-accent)',
                transitionDuration: 'var(--motion-fast)',
              }}
            >
              Edwin Meleth
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => {
                const sectionId = item.href.split('#')[1]
                const isActive = activeSection === sectionId

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="transition-colors font-medium relative group text-sm tracking-wide"
                    style={{
                      color: isActive ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                      transitionDuration: 'var(--motion-fast)',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.color = 'var(--color-text-primary)'
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.color = 'var(--color-text-secondary)'
                    }}
                  >
                    {item.name}
                    <span
                      className="absolute bottom-0 left-0 h-[1px] transition-all"
                      style={{
                        backgroundColor: 'var(--color-accent)',
                        width: isActive ? '100%' : '0',
                        transitionDuration: 'var(--motion-default)',
                      }}
                    />
                  </Link>
                )
              })}
              <a
                href="/Resume_EdwinMeleth.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg font-medium text-sm transition-all border"
                style={{
                  color: 'var(--color-accent)',
                  borderColor: 'var(--color-accent)',
                  backgroundColor: 'transparent',
                  transitionDuration: 'var(--motion-fast)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-accent)'
                  e.currentTarget.style.color = 'var(--color-bg)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.color = 'var(--color-accent)'
                }}
              >
                Resume
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg transition-colors"
              style={{
                color: 'var(--color-text-secondary)',
                transitionDuration: 'var(--motion-fast)',
              }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-40 md:hidden"
            style={{ backgroundColor: 'rgba(14, 13, 11, 0.7)' }}
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Menu */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-16 right-0 bottom-0 w-64 z-50 md:hidden overflow-y-auto border-l"
            style={{
              backgroundColor: 'var(--color-surface)',
              borderColor: 'var(--color-border)',
            }}
          >
            <div className="flex flex-col p-6">
              {navItems.map((item, index) => {
                const sectionId = item.href.split('#')[1]
                const isActive = activeSection === sectionId

                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="text-lg transition-colors py-2 border-b block"
                      style={{
                        color: isActive ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                        fontWeight: isActive ? '600' : '400',
                        borderColor: 'var(--color-border)',
                        transitionDuration: 'var(--motion-fast)',
                      }}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                )
              })}
              <a
                href="/Resume_EdwinMeleth.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 px-4 py-2 rounded-lg transition-colors text-center font-medium border"
                style={{
                  color: 'var(--color-accent)',
                  borderColor: 'var(--color-accent)',
                  transitionDuration: 'var(--motion-fast)',
                }}
              >
                Download Resume
              </a>
            </div>
          </motion.div>
        </>
      )}
    </>
  )
}

export default Navbar
