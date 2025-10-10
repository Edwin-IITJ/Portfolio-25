'use client'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react'
import Button from '../ui/Button'

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (titleRef.current) {
      // Split text animation
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
    const projectsSection = document.getElementById('projects')
    projectsSection?.scrollIntoView({ behavior: 'smooth' })
  }

  const socialLinks = [
    { icon: Github, href: 'https://github.com/Edwin-IITJ', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/edwinmeleth', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:m24ldx008@iitj.ac.in', label: 'Email' },
  ]

  return (
    <section 
      ref={heroRef}
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-primary-50"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-200 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-200 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6"
        >
          <span className="inline-block text-primary-600 font-medium text-base md:text-lg bg-primary-50 px-4 py-2 rounded-full">
            👋 Hello, I'm
          </span>
        </motion.div>

        <h1
          ref={titleRef}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold mb-6 overflow-hidden"
        >
          Edwin Meleth
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-700 font-semibold mb-4">
            UI/UX Designer & Creative Developer
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Crafting immersive digital experiences through VR technologies,
            user-centered design, and innovative problem-solving.
          </p>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex justify-center space-x-4 mb-8"
        >
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:bg-primary-50 group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={social.label}
            >
              <social.icon className="w-5 h-5 text-gray-600 group-hover:text-primary-600 transition-colors" />
            </motion.a>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          {/* <Button onClick={scrollToProjects} size="lg">
            View My Work
          </Button>
          <Button variant="outline" size="lg" href="#contact">
            Get In Touch
          </Button> */}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={scrollToProjects}
        >
          <div className="flex flex-col items-center space-y-2">
            <span className="text-sm text-gray-500">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowDown className="w-6 h-6 text-gray-400" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
