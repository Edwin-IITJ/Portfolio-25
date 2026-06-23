'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Send, Mail, MapPin, Phone, Linkedin, Github, Twitter } from 'lucide-react'
import Input from '../ui/Input'
import Textarea from '../ui/Textarea'
import Button from '../ui/Button'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // TODO: Replace with your actual API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitStatus('success')
        reset()
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'edwinmeleth@gmail.com',
      href: 'mailto:edwinmeleth@gmail.com',
    },
    // {
    //   icon: Phone,
    //   label: 'Phone',
    //   value: '+91 XXX XXX XXXX',
    //   href: 'tel:+91XXXXXXXXXX',
    // },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Kochi, Kerala, India',
      href: null,
    },
  ]

  const socialLinks = [
    { icon: Github, href: 'https://github.com/Edwin-IITJ', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/edwinmeleth', label: 'LinkedIn' },
    // { icon: Twitter, href: 'https://twitter.com/yourusername', label: 'Twitter' },
  ]

  return (
    <section id="contact" className="py-20 md:py-32" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-light mb-4" style={{ color: 'var(--color-text-primary)' }}>
            Let's Work Together
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
            Have a project in mind? Let's discuss how we can bring your ideas to life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Input
                label="Your Name"
                placeholder="Darth Vader"
                {...register('name', { required: 'Name is required' })}
                error={errors.name?.message}
                required
              />

              <Input
                label="Email Address"
                type="email"
                placeholder="d.vader@deathstar.com"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                error={errors.email?.message}
                required
              />

              <Input
                label="Subject"
                placeholder="AI for the Dark Side"
                {...register('subject', { required: 'Subject is required' })}
                error={errors.subject?.message}
                required
              />

              <Textarea
                label="Message"
                placeholder="Looking for AI solutions to help the dark side..."
                rows={6}
                {...register('message', { required: 'Message is required' })}
                error={errors.message?.message}
                required
              />

              {/* Submit Status */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-lg"
                  style={{
                    backgroundColor: 'rgba(110, 158, 122, 0.15)',
                    color: 'var(--color-success)',
                  }}
                >
                  ✓ Message sent successfully! I'll get back to you soon.
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-lg"
                  style={{
                    backgroundColor: 'rgba(158, 110, 110, 0.15)',
                    color: 'var(--color-destructive)',
                  }}
                >
                  ✗ Something went wrong. Please{' '}
                  <a
                    href="mailto:edwinmeleth@gmail.com"
                    className="underline font-medium"
                    style={{ color: 'var(--color-destructive)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-accent)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-destructive)' }}
                  >
                    email me directly
                  </a>{' '}
                  instead.
                </motion.div>
              )}

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 rounded-full animate-spin mr-2" style={{ borderColor: 'var(--color-bg)', borderTopColor: 'transparent' }} />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" strokeWidth={1.5} />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-semibold mb-6" style={{ color: 'var(--color-text-primary)' }}>Get in Touch</h3>
              <p className="mb-8" style={{ color: 'var(--color-text-secondary)' }}>
                Feel free to reach out for collaborations, freelance opportunities,
                or just a friendly chat about design and technology.
              </p>

              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-4"
                  >
                    <div
                      className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: 'var(--color-accent-soft)' }}
                    >
                      <info.icon className="w-6 h-6" style={{ color: 'var(--color-accent)' }} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-sm mb-1" style={{ color: 'var(--color-text-muted)' }}>{info.label}</p>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="font-medium transition-colors"
                          style={{
                            color: 'var(--color-text-primary)',
                            transitionDuration: 'var(--motion-fast)',
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-accent)' }}
                          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-primary)' }}
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="font-medium" style={{ color: 'var(--color-text-primary)' }}>{info.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>Connect With Me</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-lg flex items-center justify-center transition-all group border"
                    style={{
                      backgroundColor: 'var(--color-surface)',
                      borderColor: 'var(--color-border)',
                      transitionDuration: 'var(--motion-fast)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-accent)'
                      e.currentTarget.style.backgroundColor = 'var(--color-accent-soft)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-border)'
                      e.currentTarget.style.backgroundColor = 'var(--color-surface)'
                    }}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 transition-colors" style={{ color: 'var(--color-text-secondary)', transitionDuration: 'var(--motion-fast)' }} strokeWidth={1.5} />
                  </a>
                ))}
              </div>
            </div>

            {/* Availability Badge */}
            <div
              className="p-6 rounded-card border"
              style={{
                backgroundColor: 'rgba(110, 158, 122, 0.08)',
                borderColor: 'rgba(110, 158, 122, 0.25)',
              }}
            >
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: 'var(--color-success)' }} />
                <span className="font-semibold" style={{ color: 'var(--color-success)' }}>Available for Work</span>
              </div>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                Currently accepting new projects and collaborations.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
