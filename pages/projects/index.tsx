import { useState } from 'react'
import Head from 'next/head'
import { motion } from 'framer-motion'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import ProjectsGrid from '@/components/sections/ProjectsGrid'

export default function ProjectsPage() {
  return (
    <>
      <Head>
        <title>Projects - Edwin Meleth</title>
        <meta
          name="description"
          content="Case studies and projects by Edwin Meleth — AI-powered product design, XR interaction systems, UX design, and archival research. Product Designer & Design Engineer at IIT Jodhpur."
        />
        <link rel="canonical" href="https://edwinm.vercel.app/projects" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://edwinm.vercel.app/projects" />
        <meta property="og:title" content="Projects – Edwin Meleth | Product Designer & Design Engineer" />
        <meta property="og:description" content="AI-powered product design, XR interaction systems, enterprise UX, and archival research projects by Edwin Meleth." />
        <meta property="og:image" content="https://edwinm.vercel.app/og-image.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Projects – Edwin Meleth | Product Designer & Design Engineer" />
        <meta name="twitter:description" content="AI-powered product design, XR interaction systems, enterprise UX, and archival research projects by Edwin Meleth." />
        <meta name="twitter:image" content="https://edwinm.vercel.app/og-image.png" />
      </Head>

      <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
        <Navbar />

        <main className="pt-20">
          {/* Page Header */}
          <section className="py-20" style={{ backgroundColor: 'var(--color-bg)' }}>
            <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-4xl mx-auto"
              >
                <h1
                  className="text-5xl md:text-6xl lg:text-7xl font-display font-light mb-6"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  My Projects
                </h1>
                <p className="text-xl md:text-2xl" style={{ color: 'var(--color-text-secondary)' }}>
                  A showcase of my design work, VR experiences, and creative development projects
                  that blend innovation with user-centered design principles.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Projects Grid Component */}
          <ProjectsGrid />

          {/* Additional Info Section */}
          <section className="py-20" style={{ backgroundColor: 'var(--color-surface)' }}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2
                  className="text-3xl md:text-4xl font-display font-light mb-6"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  Let's Create Something Together
                </h2>
                <p className="text-lg mb-8" style={{ color: 'var(--color-text-secondary)' }}>
                  I'm always excited to take on new challenges and collaborate on innovative projects.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/#contact"
                    className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-medium transition-all"
                    style={{
                      backgroundColor: 'var(--color-accent)',
                      color: 'var(--color-bg)',
                      transitionDuration: 'var(--motion-fast)',
                    }}
                  >
                    Start a Project
                  </a>
                  <a
                    href="https://www.behance.net/edwin_m"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center border px-8 py-4 rounded-lg font-medium transition-all"
                    style={{
                      borderColor: 'var(--color-accent)',
                      color: 'var(--color-accent)',
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
                    View Full Portfolio
                  </a>
                </div>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  )
}
