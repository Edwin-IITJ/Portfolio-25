// components/sections/Footer.tsx
'use client'
import { ChevronUp } from 'lucide-react'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Bottom illustrations — 3 clickable social links with hand-drawn illustrations
  // Aspect ratios locked from design: 302×246, 158×367, 302×211
  const bottomLinks = [
    {
      href: 'https://github.com/Edwin-IITJ',
      label: 'GitHub',
      placeholder: '/images/GitCat.webp',
      width: 200,
      height: 163,
    },
    {
      href: 'https://www.linkedin.com/in/edwinmeleth',
      label: 'LinkedIn',
      placeholder: '/images/LiGiraffe.webp',
      width: 138,
      height: 320,
    },
    {
      href: 'mailto:edwinmeleth@gmail.com',
      label: 'Email',
      placeholder: '/images/MailElephant.webp',
      width: 236,
      height: 167,
    },
    {
      href: 'https://www.behance.net/edwin_m',
      label: 'Behance',
      placeholder: '/images/BeBear.webp',
      width: 236,
      height: 165,
    },
  ]

  return (
    <footer style={{ backgroundColor: 'var(--color-black-solid)' }}>
      {/* Scroll to top — centered white circle */}
      <div className="flex items-center justify-center overflow-hidden py-10 md:py-[66px]">
        <button
          onClick={scrollToTop}
          className="flex items-center justify-center transition-all"
          style={{
            width: '48px',
            height: '48px',
            backgroundColor: '#FFFFFF',
            borderRadius: '9999px',
            color: 'var(--color-black-solid)',
            transitionDuration: 'var(--motion-fast)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
          }}
          aria-label="Back to top"
        >
          <ChevronUp className="w-6 h-6" strokeWidth={2} />
        </button>
      </div>

      {/* Illustration gallery */}
      <div className="w-full max-w-[1024px] mx-auto flex flex-col md:flex-row items-center md:items-end justify-between pt-4 pb-12 gap-10 md:gap-4 px-4 md:px-0">
        {bottomLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.label === 'Email' ? undefined : '_blank'}
            rel={link.label === 'Email' ? undefined : 'noopener noreferrer'}
            className="block transition-opacity"
            style={{
              transitionDuration: 'var(--motion-fast)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.8'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1'
            }}
            aria-label={link.label}
          >
            <img
              src={link.placeholder}
              alt={`${link.label} — illustrated`}
              className="w-full h-auto object-contain"
              style={{
                maxWidth: `${link.width}px`,
                aspectRatio: `${link.width}/${link.height}`,
              }}
            />
          </a>
        ))}
      </div>

      {/* Copyright */}
      <div
        className="flex items-center justify-center"
        style={{
          paddingBottom: '24px',
        }}
      >
        <p
          style={{
            color: 'rgba(255, 255, 255, 0.4)',
            fontSize: '12px',
            fontWeight: 400,
            lineHeight: '16px',
          }}
        >
          © {new Date().getFullYear()} Edwin Meleth. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
