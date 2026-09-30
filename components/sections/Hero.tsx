// components/sections/Hero.tsx
'use client'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import Image from 'next/image'

const Hero = () => {
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (titleRef.current) {
      const chars = titleRef.current.textContent?.split('') || []
      titleRef.current.innerHTML = chars
        .map((char) => `<span class="inline-block">${char === ' ' ? '&nbsp;' : char}</span>`)
        .join('')

      gsap.fromTo(
        titleRef.current.children,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.03,
          ease: 'power3.out',
          delay: 0.3,
        }
      )
    }
  }, [])

  const scrollToProjects = () => {
    const el = document.getElementById('projects')
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  // Social links
  const socialLinks = [
    { href: 'https://github.com/Edwin-IITJ', label: 'GitHub', icon: 'github' },
    { href: 'https://www.linkedin.com/in/edwinmeleth', label: 'LinkedIn', icon: 'linkedin' },
    { href: 'mailto:edwinmeleth@gmail.com', label: 'Email', icon: 'mail' },
  ]

  const renderIcon = (icon: string) => {
    switch (icon) {
      case 'github':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
          </svg>
        )
      case 'linkedin':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect width="4" height="12" x="2" y="9" />
            <circle cx="4" cy="4" r="2" />
          </svg>
        )
      case 'mail':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <section
      id="home"
      className="w-full pt-[60px] md:pt-[103px]"
      style={{
        backgroundColor: 'var(--color-bg)',
      }}
    >
      {/* Hero layout: Text (top/left) + Illustration (bottom/right) */}
      <div className="flex flex-col md:flex-row items-center md:items-start w-full max-w-[1024px] mx-auto justify-between px-4 md:px-16">

        {/* Left: Text content */}
        <div className="flex flex-col items-start flex-shrink-0 w-full md:w-1/2 lg:w-[500px] py-2 gap-6 md:gap-[28px]">
          {/* Role badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span
              className="inline-block font-mono"
              style={{
                paddingLeft: '19.63px',
                paddingRight: '19.63px',
                paddingTop: '7.63px',
                paddingBottom: '7.63px',
                borderRadius: '9999px',
                outline: '1px solid var(--color-border)',
                outlineOffset: '-1px',
                color: 'var(--color-black-solid)',
                fontSize: '16px',
                fontWeight: 500,
                lineHeight: '24px',
                letterSpacing: '0.4px',
              }}
            >
              Design Engineer
            </span>
          </motion.div>

          {/* Name */}
          <h1
            ref={titleRef}
            className="font-display overflow-hidden text-[40px] md:text-[clamp(48px,6vw,60px)] leading-none"
            style={{
              fontWeight: 300,
              color: 'var(--color-black-solid)',
            }}
          >
            Edwin Meleth
          </h1>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col items-start"
            style={{ gap: '8px' }}
          >
            <p
              style={{
                color: 'var(--color-black-solid)',
                fontSize: '16px',
                fontFamily: 'var(--font-sans), sans-serif',
                fontWeight: 400,
                lineHeight: '24px',
                maxWidth: '420px',
              }}
            >
              I design and build, moving from user research to production code.
              Specializing in AI-powered products and adaptive experiences blending
              code, design, and storytelling.
            </p>

            {/* Employer + Alma mater logos — decorative */}
            <div className="flex flex-col items-start gap-[10px]">
              <div className="inline-flex items-center justify-center gap-[15px]">
                <img
                  src="/images/Logo_Instamart.webp"
                  alt="Swiggy Instamart"
                  style={{ width: '50px', height: '21px', objectFit: 'contain' }}
                />
                <img
                  src="/images/Logo_IQVIA.webp"
                  alt="IQVIA"
                  style={{ width: '75px', height: '13.4px', objectFit: 'contain' }}
                />
              </div>
            </div>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="flex items-start"
            style={{ gap: '12px' }}
          >
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.icon === 'mail' ? undefined : '_blank'}
                rel={social.icon === 'mail' ? undefined : 'noopener noreferrer'}
                className="flex items-center justify-center transition-all"
                style={{
                  padding: '10px',
                  borderRadius: '9999px',
                  outline: '1px solid var(--color-black-solid)',
                  outlineOffset: '-1px',
                  color: 'var(--color-black-solid)',
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
                aria-label={social.label}
              >
                {renderIcon(social.icon)}
              </a>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
          >
            <button
              onClick={scrollToProjects}
              className="flex items-center justify-center transition-all"
              style={{
                width: '130px',
                height: '40px',
                paddingLeft: '16px',
                paddingRight: '16px',
                paddingTop: '8px',
                paddingBottom: '8px',
                backgroundColor: 'var(--color-black-solid)',
                borderRadius: '9999px',
                color: '#FFFFFF',
                fontSize: '14px',
                fontFamily: 'var(--font-sans), sans-serif',
                fontWeight: 500,
                lineHeight: '20px',
                transitionDuration: 'var(--motion-fast)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#333333' }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-black-solid)' }}
            >
              See My Work
            </button>
          </motion.div>
        </div>

        {/* Right: Hero illustration — real asset 469×529 */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex-shrink-0 w-full md:w-1/2 flex justify-center md:justify-end mt-12 md:mt-0"
        >
          <div className="relative w-full max-w-[469px]" style={{ aspectRatio: '469/529' }}>
            <Image
              src="/images/hero.webp"
              alt="Hand-drawn illustration of Edwin"
              fill
              priority
              style={{ objectFit: 'contain' }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
