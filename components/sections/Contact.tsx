// components/sections/Contact.tsx
'use client'
import { motion } from 'framer-motion'
import { Mail, MapPin, Github, Linkedin } from 'lucide-react'

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'edwinmeleth@gmail.com',
      href: 'mailto:edwinmeleth@gmail.com',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Bengaluru, Karnataka, India',
      href: null,
    },
  ]

  const socialLinks = [
    { icon: Github, href: 'https://github.com/Edwin-IITJ', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/edwinmeleth', label: 'LinkedIn' },
  ]

  return (
    <section
      id="contact"
      className="w-full"
      style={{ backgroundColor: 'var(--color-black-solid)' }}
    >
      <div className="w-full max-w-[1024px] mx-auto px-4 md:px-9">
        <div 
          className="flex flex-col items-start w-full gap-4"
        style={{
          paddingTop: '16px',
          paddingBottom: '16px',
          paddingLeft: '32px',
          paddingRight: '16px',
        }}
      >
        {/* Heading */}
        <h2
          className="section-heading font-display"
          style={{ color: '#FFFFFF' }}
        >
          Contact
        </h2>

        {/* Content: Info (left) + Image (right) */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between w-full gap-10 md:gap-4">
          {/* Left side — contact info + socials */}
          <div
            className="flex flex-col flex-wrap w-full md:w-[400px] pt-2 gap-6 md:gap-[32px]"
          >
            {/* Email */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="flex items-start"
            >
              <div
                className="flex-shrink-0 flex items-center justify-center"
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '35px',
                  outline: '1px solid #FFFFFF',
                  outlineOffset: '-1px',
                }}
              >
                <Mail className="w-6 h-6" style={{ color: '#FFFFFF' }} strokeWidth={1.5} />
              </div>
              <div style={{ paddingLeft: '16px' }}>
                <p style={{ color: '#FFFFFF', fontSize: '14px', fontFamily: 'var(--font-sans), sans-serif', fontWeight: 400, lineHeight: '20px' }}>
                  Email
                </p>
                <a
                  href="mailto:edwinmeleth@gmail.com"
                  className="transition-colors"
                  style={{
                    color: '#FFFFFF',
                    fontSize: '16px',
                    fontFamily: 'var(--font-sans), sans-serif',
                    fontWeight: 500,
                    lineHeight: '24px',
                    transitionDuration: 'var(--motion-fast)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-accent)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#FFFFFF' }}
                >
                  edwinmeleth@gmail.com
                </a>
              </div>
            </motion.div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex items-start"
            >
              <div
                className="flex-shrink-0 flex items-center justify-center"
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '35px',
                  outline: '1px solid #FFFFFF',
                  outlineOffset: '-1px',
                }}
              >
                <MapPin className="w-6 h-6" style={{ color: '#FFFFFF' }} strokeWidth={1.5} />
              </div>
              <div style={{ paddingLeft: '16px' }}>
                <p style={{ color: '#FFFFFF', fontSize: '14px', fontFamily: 'var(--font-sans), sans-serif', fontWeight: 400, lineHeight: '20px' }}>
                  Location
                </p>
                <p style={{ color: '#FFFFFF', fontSize: '16px', fontFamily: 'var(--font-sans), sans-serif', fontWeight: 500, lineHeight: '24px' }}>
                  Bengaluru, Karnataka, India
                </p>
              </div>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex items-start"
              style={{ gap: '32px' }}
            >
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center transition-all"
                  style={{
                    width: '48px',
                    height: '48px',
                    padding: '10px',
                    borderRadius: '9999px',
                    outline: '1px solid #FFFFFF',
                    outlineOffset: '-1px',
                    color: '#FFFFFF',
                    transitionDuration: 'var(--motion-fast)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFFFFF'
                    e.currentTarget.style.color = 'var(--color-black-solid)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.color = '#FFFFFF'
                  }}
                  aria-label={social.label}
                >
                  <social.icon className="w-6 h-6" strokeWidth={1.5} />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right side — illustration (aspect 559×395) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full md:w-[559px] max-w-full"
          >
            <img
              src="/images/contact.webp"
              alt="Contact illustration"
              className="w-full h-auto object-cover"
              style={{ aspectRatio: '559/395' }}
            />
          </motion.div>
        </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
