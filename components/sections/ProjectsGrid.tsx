'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink, ArrowRight } from 'lucide-react'
import Card from '../ui/Card'
import { projectsData } from '@/data/projects'

const ProjectsGrid = () => {
  const [activeTab, setActiveTab] = useState<'major' | 'other'>('major')
  const [projects, setProjects] = useState(projectsData.majorProjects)

  useEffect(() => {
    setProjects(
      activeTab === 'major' ? projectsData.majorProjects : projectsData.otherWorks
    )
  }, [activeTab])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
            Featured Work
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            A collection of projects showcasing expertise in UI/UX design,
            VR development, and creative problem-solving.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white rounded-xl p-1.5 shadow-lg">
            <button
              onClick={() => setActiveTab('major')}
              className={`px-6 md:px-8 py-3 rounded-lg font-medium transition-all duration-300 ${activeTab === 'major'
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-primary-600'
                }`}
            >
              Major Projects
            </button>
            <button
              onClick={() => setActiveTab('other')}
              className={`px-6 md:px-8 py-3 rounded-lg font-medium transition-all duration-300 ${activeTab === 'other'
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-primary-600'
                }`}
            >
              Other Works
            </button>
          </div>
        </div>
        {/* Projects Grid - KEY FIX: Added key={activeTab} */}
        <motion.div
          key={activeTab}  // CRITICAL: Forces re-mount and re-animation
          variants={containerVariants}
          initial="hidden"
          animate="visible"  // Changed from whileInView to animate
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={itemVariants}>
              <Link href={`/projects/${project.id}`}>
                <Card hover className="h-full flex flex-col">
                  {/* Project Image */}
                  <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = '/images/placeholder-project.jpg'
                      }}
                    />
                    {/* Overlay on Hover */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white font-semibold flex items-center gap-2">
                        View Project
                        <ArrowRight className="w-5 h-5" />
                      </span>
                    </div>

                    {/* Featured Badge */}
                    {project.featured && (
                      <div className="absolute top-2 right-2 bg-primary-600 text-white text-xs px-2 py-1 rounded-full">
                        Featured
                      </div>
                    )}
                  </div>

                  {/* Project Info */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-2 text-sm text-gray-500">
                      <span>{project.category}</span>
                      <span>{project.year}</span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {project.title}
                    </h3>

                    <p className="text-gray-600 mb-4 flex-1">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Live Project Indicator */}
                    {project.projectUrl && project.projectUrl !== '#' && (
                      <div className="flex items-center gap-2 text-primary-600 text-sm font-medium">
                        <ExternalLink className="w-4 h-4" />
                        <span>Live Project Available</span>
                      </div>
                    )}
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {projects.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p>No projects to display yet.</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default ProjectsGrid
