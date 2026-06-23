'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Github, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const footerLinks = {
    // Navigation: [
    //   { name: 'Home', href: '#home' },
    //   { name: 'Work', href: '#projects' },
    //   { name: 'About', href: '#about' },
    //   { name: 'Contact', href: '#contact' },
    // ],
    Projects: [
      // { name: 'VR Experiences', href: '/projects' },
      // { name: 'UI/UX Design', href: '/projects' },
      // { name: 'Web Development', href: '/projects' },
      // { name: 'Case Studies', href: '/projects' },
      { name: 'Design Projects', href: '/projects' },
    ],
    Connect: [
      { name: 'GitHub', href: 'https://github.com/Edwin-IITJ' },
      { name: 'LinkedIn', href: 'https://www.linkedin.com/in/edwinmeleth' },
      { name: 'Behance', href: 'https://behance.net/edwin_m' },
      { name: 'Email', href: 'mailto:edwinmeleth@gmail.com' },
    ],
  }

  const socialLinks = [
    { icon: Github, href: 'https://github.com/Edwin-IITJ', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/edwinmeleth', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:edwinmeleth@gmail.com', label: 'Email' },
  ]

  return (
    <footer className="relative" style={{ backgroundColor: 'var(--color-surface)' }}>
      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all group"
        style={{
          backgroundColor: 'var(--color-accent)',
          color: 'var(--color-bg)',
          transitionDuration: 'var(--motion-fast)',
        }}
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" strokeWidth={1.5} />
      </button>

      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <h3 className="text-2xl font-display font-light" style={{ color: 'var(--color-accent)' }}>
                Edwin Meleth
              </h3>
            </Link>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              Product Designer & Design Engineer building AI-powered products and adaptive interfaces.
            </p>
            {/* <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div> */}
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="transition-colors"
                      style={{
                        color: 'var(--color-text-secondary)',
                        transitionDuration: 'var(--motion-fast)',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-accent)' }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-secondary)' }}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t pt-8" style={{ borderColor: 'var(--color-border)' }}>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-center md:text-left" style={{ color: 'var(--color-text-muted)' }}>
              © {new Date().getFullYear()} Edwin Meleth. All rights reserved.
            </p>
            <p className="text-sm flex items-center" style={{ color: 'var(--color-text-muted)' }}>
              Made with <Heart className="w-4 h-4 mx-1" style={{ color: 'var(--color-destructive)' }} /> using Next.js & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
