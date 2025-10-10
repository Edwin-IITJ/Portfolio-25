import { GetStaticProps, GetStaticPaths } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, Calendar, Tag } from 'lucide-react'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import Button from '@/components/ui/Button'
import projectsData from '@/data/projects.json'

interface Project {
  id: string
  title: string
  description: string
  fullDescription: string
  category: string
  year: string
  technologies: string[]
  coverImage: string
  images?: string[]
  projectUrl?: string
  githubUrl?: string
  behanceUrl?: string
  featured?: boolean
  challenges?: string
  solution?: string
  results?: string
}

interface ProjectPageProps {
  project: Project
}

export default function ProjectPage({ project }: ProjectPageProps) {
  return (
    <>
      <Head>
        <title>{project.title} - Edwin Meleth</title>
        <meta name="description" content={project.description} />
        <meta property="og:title" content={`${project.title} - Edwin Meleth`} />
        <meta property="og:description" content={project.description} />
        <meta property="og:image" content={project.coverImage} />
      </Head>

      <div className="min-h-screen bg-white">
        <Navbar />

        <main className="pt-20">
          {/* Back Button */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Link href="/#projects">
              <motion.div
                className="inline-flex items-center text-gray-600 hover:text-primary-600 transition-colors cursor-pointer"
                whileHover={{ x: -5 }}
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Projects
              </motion.div>
            </Link>
          </div>

          {/* Hero Section */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Project Meta */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="inline-flex items-center text-sm text-primary-600 font-semibold bg-primary-50 px-4 py-2 rounded-full">
                  <Tag className="w-4 h-4 mr-2" />
                  {project.category}
                </span>
                <span className="inline-flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  {project.year}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                {project.title}
              </h1>

              {/* Description */}
              <p className="text-xl text-gray-600 mb-8 max-w-4xl">
                {project.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                {project.projectUrl && project.projectUrl !== '#' && (
                  <Button href={project.projectUrl} target="_blank" size="lg">
                    <ExternalLink className="w-5 h-5 mr-2" />
                    View Live Project
                  </Button>
                )}
                {project.behanceUrl && (
                  <Button variant="outline" href={project.behanceUrl} target="_blank" size="lg">
                    View on Behance
                  </Button>
                )}
              </div>
            </motion.div>
          </section>

          {/* Cover Image */}
          <motion.section
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={project.coverImage}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.section>

          {/* Project Details */}
          <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
              {/* Technologies */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Category</h3>
                <p className="text-gray-600">{project.category}</p>
              </div>

              {/* Year */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Timeline</h3>
                <p className="text-gray-600">{project.year}</p>
              </div>
            </div>

            {/* Full Description */}
            <div className="prose prose-lg max-w-none mb-12">
              <h2 className="text-3xl font-display font-bold mb-6">Overview</h2>
              <p className="text-gray-600 leading-relaxed">
                {project.fullDescription || project.description}
              </p>
            </div>

            {/* Challenges, Solution, Results */}
            {(project.challenges || project.solution || project.results) && (
              <div className="space-y-12">
                {project.challenges && (
                  <div>
                    <h2 className="text-3xl font-display font-bold mb-6">Challenges</h2>
                    <p className="text-gray-600 leading-relaxed">{project.challenges}</p>
                  </div>
                )}

                {project.solution && (
                  <div>
                    <h2 className="text-3xl font-display font-bold mb-6">Solution</h2>
                    <p className="text-gray-600 leading-relaxed">{project.solution}</p>
                  </div>
                )}

                {project.results && (
                  <div>
                    <h2 className="text-3xl font-display font-bold mb-6">Results</h2>
                    <p className="text-gray-600 leading-relaxed">{project.results}</p>
                  </div>
                )}
              </div>
            )}

            {/* Additional Images */}
            {project.images && project.images.length > 0 && (
              <div className="mt-16">
                <h2 className="text-3xl font-display font-bold mb-8">Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {project.images.map((image, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="relative aspect-video rounded-xl overflow-hidden shadow-lg"
                    >
                      <Image
                        src={image}
                        alt={`${project.title} screenshot ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* CTA Section */}
          <section className="bg-gray-50 py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Interested in Working Together?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Let's create something amazing together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" href="/#contact">
                  Get In Touch
                </Button>
                <Button variant="outline" size="lg" href="/#projects">
                  View More Projects
                </Button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allProjects = [...projectsData.majorProjects, ...projectsData.otherWorks]
  const paths = allProjects.map((project) => ({
    params: { slug: project.id },
  }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const allProjects = [...projectsData.majorProjects, ...projectsData.otherWorks]
  const project = allProjects.find((p) => p.id === params?.slug)

  if (!project) {
    return { notFound: true }
  }

  return {
    props: { project },
  }
}
