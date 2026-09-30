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
  const [activeSection, setActiveSection] = useState('home')

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
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, observerOptions)

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
    { name: 'Home', href: '/#home', sectionId: 'home' },
    { name: 'Work', href: '/#projects', sectionId: 'projects' },
    { name: 'About', href: '/#about', sectionId: 'about' },
    { name: 'Contact', href: '/#contact', sectionId: 'contact' }
  ]

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)

    if (router.pathname === '/') {
      const hash = href.split('#')[1]
      const element = document.getElementById(hash)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      router.push(href)
    }
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 transition-all navbar-blur"
        style={{
          transitionDuration: 'var(--motion-default)',
          backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.85)' : 'transparent',
          borderBottom: isScrolled ? '1px solid rgba(46, 43, 40, 0.15)' : '1px solid transparent',
        }}
      >
        <div className="max-w-[1024px] w-full mx-auto" style={{ paddingLeft: '24px', paddingRight: '16px' }}>
          <div className="flex items-center justify-between" style={{ paddingTop: '16px', paddingBottom: '16px' }}>
            {/* Logo — placeholder for custom asset */}
            <Link href="/" className="flex-shrink-0">
              <img
                src="/images/Logo_EM.png"
                alt="Edwin Meleth logo"
                style={{ width: '45px', height: '34px', objectFit: 'contain' }}
              />
            </Link>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center" style={{ gap: '40px' }}>
              {navItems.map((item) => {
                const isActive = activeSection === item.sectionId

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="relative transition-colors"
                    style={{
                      color: 'var(--color-black-solid)',
                      fontFamily: 'var(--font-sans), sans-serif',
                      fontSize: '14px',
                      fontWeight: 500,
                      lineHeight: '20px',
                      letterSpacing: '0.35px',
                      transitionDuration: 'var(--motion-fast)',
                    }}
                  >
                    {item.name}
                    {/* Active underline indicator */}
                    {isActive && (
                      <span
                        className="absolute left-0 bottom-[-2px]"
                        style={{
                          width: '40px',
                          height: '1px',
                          backgroundColor: 'var(--color-black-solid)',
                        }}
                      />
                    )}
                  </Link>
                )
              })}
              <a
                href="/Resume_EdwinMeleth.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all"
                style={{
                  paddingLeft: '15.63px',
                  paddingRight: '15.63px',
                  paddingTop: '7.63px',
                  paddingBottom: '7.63px',
                  borderRadius: '9999px',
                  outline: '1px solid var(--color-black-solid)',
                  outlineOffset: '-1px',
                  color: 'var(--color-black-solid)',
                  fontFamily: 'var(--font-sans), sans-serif',
                  fontSize: '14px',
                  fontWeight: 500,
                  lineHeight: '20px',
                  transitionDuration: 'var(--motion-fast)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-black-solid)'
                  e.currentTarget.style.color = '#FFFFFF'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.color = 'var(--color-black-solid)'
                }}
              >
                Resume
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg transition-colors"
              style={{
                color: 'var(--color-black-solid)',
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
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
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
              backgroundColor: 'var(--color-bg)',
              borderColor: 'rgba(46, 43, 40, 0.15)',
            }}
          >
            <div className="flex flex-col p-6">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.sectionId

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
                        color: isActive ? 'var(--color-black-solid)' : 'var(--color-text-secondary)',
                        fontWeight: isActive ? 600 : 400,
                        borderColor: 'rgba(46, 43, 40, 0.15)',
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
                className="mt-4 px-4 py-2 transition-colors text-center font-medium"
                style={{
                  borderRadius: '9999px',
                  color: 'var(--color-black-solid)',
                  outline: '1px solid var(--color-black-solid)',
                  outlineOffset: '-1px',
                  transitionDuration: 'var(--motion-fast)',
                }}
              >
                Resume
              </a>
            </div>
          </motion.div>
        </>
      )}
    </>
  )
}

export default Navbar
