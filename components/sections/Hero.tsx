'use client'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react'
import Button from '../ui/Button'

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

  const socialLinks = [
    { icon: Github, href: 'https://github.com/Edwin-IITJ', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/edwinmeleth', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:edwinmeleth@gmail.com', label: 'Email' },
  ]

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col overflow-hidden grain-overlay"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      {/* ── Top spacer (accounts for navbar) ── */}
      <div className="h-20" />

      {/* ── Main content — vertically centered via flex-grow ── */}
      <div className="flex-grow flex items-center justify-center relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Role badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-5"
          >
            <span
              className="inline-block font-medium text-sm md:text-base px-5 py-2 rounded-full border font-mono tracking-wide"
              style={{
                color: 'var(--color-text-secondary)',
                backgroundColor: 'var(--color-surface)',
                borderColor: 'var(--color-border)',
              }}
            >
              Product Designer & Design Engineer
            </span>
          </motion.div>

          {/* Name */}
          <h1
            ref={titleRef}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-light mb-5 overflow-hidden leading-[1.05]"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Edwin Meleth
          </h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            I design and build, moving from user research to production-ready interfaces.
            Specializing in AI-powered products and adaptive experiences blending design, technology, and storytelling.
          </motion.p>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="flex flex-col sm:flex-row gap-3 justify-center mb-8"
          >
            <Button onClick={scrollToProjects} size="lg">
              See My Work
            </Button>
            <Button variant="outline" size="lg" href="#contact">
              Get In Touch
            </Button>
          </motion.div>

          {/* Social row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex justify-center gap-3"
          >
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full transition-all"
                style={{
                  color: 'var(--color-text-muted)',
                  transitionDuration: 'var(--motion-fast)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--color-accent)'
                  e.currentTarget.style.backgroundColor = 'var(--color-accent-soft)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--color-text-muted)'
                  e.currentTarget.style.backgroundColor = 'transparent'
                }}
                aria-label={social.label}
              >
                <social.icon className="w-[18px] h-[18px]" strokeWidth={1.5} />
              </a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Scroll indicator — in normal flow, guaranteed spacing ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="relative z-10 flex flex-col items-center pb-8 pt-6 cursor-pointer"
        onClick={scrollToProjects}
      >
        <span
          className="text-xs tracking-widest uppercase mb-2 font-mono"
          style={{ color: 'var(--color-text-muted)' }}
        >
          Scroll
        </span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ArrowDown className="w-4 h-4" style={{ color: 'var(--color-text-muted)' }} />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
