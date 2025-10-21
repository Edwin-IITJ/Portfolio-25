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
          content="Browse through my portfolio of UI/UX design, VR experiences, and web development projects." 
        />
        <link rel="canonical" href="https://edwinm.vercel.app/projects" />
      </Head>

      <div className="min-h-screen bg-white">
        <Navbar />

        <main className="pt-20">
          {/* Page Header */}
          <section className="py-20 bg-gradient-to-br from-primary-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-4xl mx-auto"
              >
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6">
                  My Projects
                </h1>
                <p className="text-xl md:text-2xl text-gray-600">
                  A showcase of my design work, VR experiences, and creative development projects 
                  that blend innovation with user-centered design principles.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Projects Grid Component */}
          <ProjectsGrid />

          {/* Additional Info Section */}
          <section className="py-20 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                  Let's Create Something Together
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  I'm always excited to take on new challenges and collaborate on innovative projects.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/#contact"
                    className="inline-flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Start a Project
                  </a>
                  <a
                    href="https://www.behance.net/edwin_m"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white px-8 py-4 rounded-lg font-medium transition-all duration-300"
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
