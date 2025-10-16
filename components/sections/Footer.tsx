'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Github, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const footerLinks = {
    Navigation: [
      { name: 'Home', href: '#home' },
      { name: 'Work', href: '#projects' },
      { name: 'About', href: '#about' },
      { name: 'Contact', href: '#contact' },
    ],
    Projects: [
      { name: 'VR Experiences', href: '/projects' },
      { name: 'UI/UX Design', href: '/projects' },
      { name: 'Web Development', href: '/projects' },
      { name: 'Case Studies', href: '/projects' },
    ],
    Connect: [
      { name: 'GitHub', href: 'https://github.com/Edwin-IITJ' },
      { name: 'LinkedIn', href: 'https://linkedin.com/in/edwinmeleth' },
      // { name: 'Behance', href: 'https://behance.net/edwin_m' },
      { name: 'Email', href: 'mailto:m24ldx008@iitj.ac.in' },
    ],
  }

  const socialLinks = [
    { icon: Github, href: 'https://github.com/Edwin-IITJ', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/edwinmeleth', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:m24ldx008@iitj.ac.in', label: 'Email' },
  ]

  return (
    <footer className="relative bg-gray-900 text-white">
      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-primary-600 hover:bg-primary-700 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group"
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
      </button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <h3 className="text-2xl font-display font-bold gradient-text">
                Edwin Meleth
              </h3>
            </Link>
            <p className="text-gray-400 mb-6">
              UI/UX Designer & Creative Developer crafting meaningful digital experiences.
            </p>
            <div className="flex space-x-4">
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
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-lg font-semibold mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200"
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
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Edwin Meleth. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm flex items-center">
              Made with <Heart className="w-4 h-4 mx-1 text-red-500" /> using Next.js & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
