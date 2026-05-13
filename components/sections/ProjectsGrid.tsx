// components/sections/ProjectsGrid.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink, ArrowRight } from 'lucide-react'
import Card from '../ui/Card'
import { projectsData } from '@/data/projects'

const ProjectsGrid = () => {
  const [activeTab, setActiveTab] = useState<'major' | 'other' | 'lab'>('major') // CHANGED: Added 'lab'
  const [projects, setProjects] = useState(projectsData.majorProjects)

  useEffect(() => {
    setProjects(
      activeTab === 'major'
        ? projectsData.majorProjects
        : activeTab === 'other'
          ? projectsData.otherWorks
          : projectsData.labWorks
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
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
          Featured Work
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          A selection of AI product design, UX research, and XR interaction projects.
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
          <button
            onClick={() => setActiveTab('lab')}
            className={`px-6 md:px-8 py-3 rounded-lg font-medium transition-all duration-300 ${activeTab === 'lab'
              ? 'bg-primary-600 text-white shadow-md'
              : 'text-gray-600 hover:text-primary-600'
              }`}
          >
            Lab
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      <AnimatePresence mode="wait">
        <motion.div key={activeTab} initial="hidden" animate="visible" exit="hidden" variants={containerVariants}>

          {/* ── Hero Duo: featured projects (major tab only) ── */}
          {activeTab === 'major' && (() => {
            const featuredProjects = projects.filter(p => p.featured)
            const restProjects = projects.filter(p => !p.featured)
            return (
              <>
                {featuredProjects.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {featuredProjects.map((project, idx) => (
                      <motion.div key={project.id} variants={itemVariants}>
                        <Link href={project.isLiveProject && project.liveProjectPath ? project.liveProjectPath : `/projects/${project.id}`}>
                          <Card hover padding="none" className="group cursor-pointer overflow-hidden h-full hover:shadow-2xl transition-shadow duration-300">
                            {/* Project Image — taller for hero cards */}
                            <div className="relative w-full h-64 overflow-hidden bg-gray-100">
                              <Image
                                src={project.coverImage}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-110"
                                priority
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement
                                  target.src = '/images/placeholder-project.jpg'
                                }}
                              />
                              {/* Overlay on Hover */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                                <span className="text-white font-medium flex items-center gap-2">
                                  View Project
                                  <ArrowRight className="w-4 h-4" />
                                </span>
                              </div>
                              {/* Live Badge */}
                              {project.isLiveProject && (
                                <div className="absolute top-4 left-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1.5">
                                  <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                                  </span>
                                  LIVE
                                </div>
                              )}
                              {/* Featured Badge */}
                              <div className="absolute top-4 right-4 bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                                Featured
                              </div>
                            </div>

                            {/* Project Info */}
                            <div className="p-6">
                              <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                                <span className="font-medium text-primary-600">{project.category}</span>
                                <span>{project.year}</span>
                              </div>
                              <h3 className="text-2xl font-bold mb-3 font-display group-hover:text-primary-600 transition-colors">
                                {project.title}
                              </h3>
                              {project.description && (
                                <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                              )}
                              {project.technologies && project.technologies.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                  {project.technologies.slice(0, 3).map((tech) => (
                                    <span key={tech} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                                      {tech}
                                    </span>
                                  ))}
                                  {project.technologies.length > 3 && (
                                    <span className="text-xs px-2 py-1 text-gray-500">
                                      +{project.technologies.length - 3} more
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          </Card>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* ── Secondary grid ── */}
                {restProjects.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {restProjects.map((project, idx) => (
                      <motion.div key={project.id} variants={itemVariants}>
                        <Link href={project.isLiveProject && project.liveProjectPath ? project.liveProjectPath : `/projects/${project.id}`}>
                          <Card hover className="group cursor-pointer overflow-hidden h-full hover:shadow-2xl transition-shadow duration-300">
                            <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden bg-gray-100">
                              <Image
                                src={project.coverImage}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-110"
                                loading="lazy"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement
                                  target.src = '/images/placeholder-project.jpg'
                                }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                                <span className="text-white font-medium flex items-center gap-2">
                                  View Project
                                  <ArrowRight className="w-4 h-4" />
                                </span>
                              </div>
                              {project.isLiveProject && (
                                <div className="absolute top-4 left-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1.5">
                                  <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                                  </span>
                                  LIVE
                                </div>
                              )}
                            </div>
                            <div className="p-6">
                              <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                                <span className="font-medium text-primary-600">{project.category}</span>
                                <span>{project.year}</span>
                              </div>
                              <h3 className="text-xl font-bold mb-2 font-display group-hover:text-primary-600 transition-colors">
                                {project.title}
                              </h3>
                              {project.description && (
                                <p className="text-gray-600 mb-4 flex-1">{project.description}</p>
                              )}
                              {project.technologies && project.technologies.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-4">
                                  {project.technologies.slice(0, 3).map((tech) => (
                                    <span key={tech} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                                      {tech}
                                    </span>
                                  ))}
                                  {project.technologies.length > 3 && (
                                    <span className="text-xs px-2 py-1 text-gray-500">
                                      +{project.technologies.length - 3} more
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          </Card>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                )}
              </>
            )
          })()}

          {/* ── Other Works / Lab: uniform grid (unchanged) ── */}
          {activeTab !== 'major' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, idx) => (
                <motion.div key={project.id} variants={itemVariants}>
                  <Link href={project.isLiveProject && project.liveProjectPath ? project.liveProjectPath : `/projects/${project.id}`}>
                    <Card hover className="group cursor-pointer overflow-hidden h-full hover:shadow-2xl transition-shadow duration-300">
                      <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden bg-gray-100">
                        <Image
                          src={project.coverImage}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                          priority={idx < 3}
                          loading={idx < 3 ? undefined : "lazy"}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = '/images/placeholder-project.jpg'
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                          <span className="text-white font-medium flex items-center gap-2">
                            View Project
                            <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                        {project.isLiveProject && (
                          <div className="absolute top-4 left-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1.5">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                            </span>
                            LIVE
                          </div>
                        )}
                        {project.featured && (
                          <div className="absolute top-4 right-4 bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                            Featured
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                          <span className="font-medium text-primary-600">{project.category}</span>
                          <span>{project.year}</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 font-display group-hover:text-primary-600 transition-colors">
                          {project.title}
                        </h3>
                        {project.description && (
                          <p className="text-gray-600 mb-4 flex-1">{project.description}</p>
                        )}
                        {project.technologies && project.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.technologies.slice(0, 3).map((tech) => (
                              <span key={tech} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                                {tech}
                              </span>
                            ))}
                            {project.technologies.length > 3 && (
                              <span className="text-xs px-2 py-1 text-gray-500">
                                +{project.technologies.length - 3} more
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

        </motion.div>
      </AnimatePresence>

      {/* Empty State */}
      {projects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20 text-gray-500"
        >
          {activeTab === 'lab'
            ? 'Experimental projects and prototypes. Check back for new work!'
            : 'No projects to display yet.'}
        </motion.div>
      )}
    </section>
  )
}

export default ProjectsGrid
