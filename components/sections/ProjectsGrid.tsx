'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink, ArrowRight } from 'lucide-react'
import Card from '../ui/Card'
import projectsData from '../../data/projects.json'

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
    <section id="projects" className="py-20 md:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
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
              className={`px-6 md:px-8 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === 'major'
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
              onClick={() => setActiveTab('major')}
            >
              Major Projects
            </button>
            <button
              className={`px-6 md:px-8 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === 'other'
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
              onClick={() => setActiveTab('other')}
            >
              Other Works
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div
          key={activeTab}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div key={project.id} variants={itemVariants}>
              <Card hover padding="none" className="group">
                {/* Project Image */}
                <div className="relative aspect-video bg-gray-200 overflow-hidden">
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = '/images/placeholder-project.jpg'
                    }}
                  />
                  
                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <Link
                      href={`/projects/${project.id}`}
                      className="flex items-center text-white font-medium hover:text-primary-300 transition-colors"
                    >
                      View Project
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </div>

                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 right-4 bg-accent-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Featured
                    </div>
                  )}
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-block text-sm text-primary-600 font-semibold bg-primary-50 px-3 py-1 rounded-full">
                      {project.category}
                    </span>
                    <span className="text-sm text-gray-500">{project.year}</span>
                  </div>

                  <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-primary-600 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-xs text-gray-500 flex items-center">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Project Link (if available) */}
                  {project.projectUrl && project.projectUrl !== '#' && (
                    <a
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center mt-4 text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Live Project
                    </a>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {projects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-xl text-gray-500">No projects to display yet.</p>
          </motion.div>
        )}

        {/* View All Projects Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="https://www.behance.net/edwin_m"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold text-lg transition-colors group"
          >
            View Full Portfolio on Behance
            <ExternalLink className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default ProjectsGrid
