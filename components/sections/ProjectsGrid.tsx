// components/sections/ProjectsGrid.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { projectsData, Project } from '@/data/projects'

// ── Layout config — controls visual priority for the Major tab ────────────────
// Changing these IDs is the only thing needed to re-order the hierarchy.
const HERO_ID = 'liquid-read'
const MEDIUM_IDS = ['aruler-redesign', 'fair-split']
const SMALL_IDS = ['lucid-past', 'digimal', 'aam-vr']

// ── Helpers ───────────────────────────────────────────────────────────────────
function projectHref(p: Project): string {
  return p.isLiveProject && p.liveProjectPath
    ? p.liveProjectPath
    : `/projects/${p.id}`
}

// ── Shared sub-components ─────────────────────────────────────────────────────

function LiveBadge() {
  return (
    <div
      className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1.5"
      style={{
        backgroundColor: 'var(--color-success)',
        color: 'var(--color-bg)',
      }}
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: 'var(--color-bg)' }} />
        <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: 'var(--color-bg)' }} />
      </span>
      LIVE
    </div>
  )
}

function ViewOverlay({ label = 'View Case Study' }: { label?: string }) {
  return (
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6 z-10"
      style={{ transitionDuration: 'var(--motion-default)' }}
    >
      <span className="font-medium text-sm flex items-center gap-2 tracking-wide" style={{ color: 'var(--color-text-primary)' }}>
        {label}
        <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
      </span>
    </div>
  )
}

function TechPills({ techs, max = 3 }: { techs: string[]; max?: number }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {techs.slice(0, max).map(t => (
        <span
          key={t}
          className="text-xs px-2.5 py-1 rounded-full font-mono"
          style={{
            backgroundColor: 'var(--color-surface-2)',
            color: 'var(--color-text-muted)',
          }}
        >
          {t}
        </span>
      ))}
      {techs.length > max && (
        <span className="text-xs px-2 py-1" style={{ color: 'var(--color-text-muted)' }}>
          +{techs.length - max}
        </span>
      )}
    </div>
  )
}

// ── Tier 1: HERO card (LiquidRead) ───────────────────────────────────────────
// Full-width, tall image, rich content block, flagship label.
function HeroCard({ project }: { project: Project }) {
  return (
    <Link href={projectHref(project)}>
      <div
        className="group cursor-pointer rounded-card overflow-hidden border card-hover"
        style={{
          backgroundColor: 'var(--color-surface)',
          borderColor: 'var(--color-border)',
        }}
      >
        {/* Image */}
        <div className="relative w-full overflow-hidden h-[400px] md:h-[460px] img-grain"
          style={{ backgroundColor: 'var(--color-surface-2)' }}
        >
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover"
            priority
            onError={e => {
              (e.target as HTMLImageElement).src = '/images/placeholder-project.jpg'
            }}
          />
          {project.isLiveProject && <LiveBadge />}
          <ViewOverlay label="View Case Study" />
          {/* Contextual label */}
          <div
            className="absolute top-5 right-5 z-10 text-xs font-semibold px-3.5 py-1.5 rounded-full border tracking-wide font-mono"
            style={{
              backgroundColor: 'rgba(26, 24, 21, 0.85)',
              borderColor: 'var(--color-border)',
              color: 'var(--color-accent)',
              backdropFilter: 'blur(8px)',
            }}
          >
            New
          </div>
        </div>

        {/* Content */}
        <div className="p-8 md:p-10">
          <div className="flex items-start justify-between gap-4 mb-3">
            <span
              className="text-xs font-bold tracking-widest uppercase font-mono"
              style={{ color: 'var(--color-accent)' }}
            >
              {project.category}
            </span>
          </div>
          <h3
            className="text-3xl md:text-4xl font-display font-medium mb-4 leading-tight transition-colors"
            style={{
              color: 'var(--color-text-primary)',
              transitionDuration: 'var(--motion-fast)',
            }}
          >
            {project.title}
          </h3>
          <p
            className="text-base md:text-lg leading-relaxed mb-7 max-w-4xl"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {project.description}
          </p>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <TechPills techs={project.technologies} max={5} />
            <span
              className="text-sm font-medium flex items-center gap-1.5 group-hover:gap-3 transition-all shrink-0"
              style={{
                color: 'var(--color-accent)',
                transitionDuration: 'var(--motion-fast)',
              }}
            >
              Case Study
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

// ── Tier 2: MEDIUM card (ARuler, FairSplit) ───────────────────────────────────
// 50/50 grid, substantial image, comfortable content area.
function MediumCard({ project }: { project: Project }) {
  return (
    <Link href={projectHref(project)} className="h-full block">
      <div
        className="group cursor-pointer rounded-card overflow-hidden border card-hover h-full flex flex-col"
        style={{
          backgroundColor: 'var(--color-surface)',
          borderColor: 'var(--color-border)',
        }}
      >
        <div className="relative w-full overflow-hidden h-[260px] md:h-[300px] shrink-0 img-grain"
          style={{ backgroundColor: 'var(--color-surface-2)' }}
        >
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover"
            loading="lazy"
            onError={e => {
              (e.target as HTMLImageElement).src = '/images/placeholder-project.jpg'
            }}
          />
          {project.isLiveProject && <LiveBadge />}
          <ViewOverlay />
        </div>
        <div className="p-6 md:p-7 flex flex-col flex-1">
          <div className="flex items-center justify-between mb-2.5">
            <span
              className="text-xs font-bold tracking-widest uppercase font-mono"
              style={{ color: 'var(--color-accent)' }}
            >
              {project.category}
            </span>
            <span className="text-xs font-mono" style={{ color: 'var(--color-text-muted)' }}>{project.year}</span>
          </div>
          <h3
            className="text-xl md:text-2xl font-display font-medium mb-3 leading-snug transition-colors"
            style={{
              color: 'var(--color-text-primary)',
              transitionDuration: 'var(--motion-fast)',
            }}
          >
            {project.title}
          </h3>
          <p
            className="text-sm leading-relaxed mb-5 flex-1"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {project.description}
          </p>
          <TechPills techs={project.technologies} max={3} />
        </div>
      </div>
    </Link>
  )
}

// ── Tier 3: SMALL card (LucidPast, Digimal, Aam) ─────────────────────────────
// 3-column grid, compact image, tight content. Polished but clearly secondary.
function SmallCard({ project }: { project: Project }) {
  return (
    <Link href={projectHref(project)} className="h-full block">
      <div
        className="group cursor-pointer rounded-card overflow-hidden border card-hover h-full flex flex-col"
        style={{
          backgroundColor: 'var(--color-surface)',
          borderColor: 'var(--color-border)',
        }}
      >
        <div className="relative w-full overflow-hidden h-[192px] shrink-0 img-grain"
          style={{ backgroundColor: 'var(--color-surface-2)' }}
        >
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover"
            loading="lazy"
            onError={e => {
              (e.target as HTMLImageElement).src = '/images/placeholder-project.jpg'
            }}
          />
          {project.isLiveProject && <LiveBadge />}
          <ViewOverlay />
        </div>
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-center justify-between mb-1.5">
            <span
              className="text-xs font-bold tracking-widest uppercase font-mono"
              style={{ color: 'var(--color-accent)' }}
            >
              {project.category}
            </span>
            <span className="text-xs font-mono" style={{ color: 'var(--color-text-muted)' }}>{project.year}</span>
          </div>
          <h3
            className="text-base font-display font-medium mb-2 leading-snug transition-colors"
            style={{
              color: 'var(--color-text-primary)',
              transitionDuration: 'var(--motion-fast)',
            }}
          >
            {project.title}
          </h3>
          <p
            className="text-xs leading-relaxed mb-3 flex-1 line-clamp-3"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {project.description}
          </p>
          <TechPills techs={project.technologies} max={2} />
        </div>
      </div>
    </Link>
  )
}

// ── Uniform card (Other Works / Lab) ─────────────────────────────────────────
function UniformCard({ project, priority }: { project: Project; priority: boolean }) {
  return (
    <Link href={projectHref(project)} className="h-full block">
      <div
        className="group cursor-pointer rounded-card overflow-hidden border card-hover h-full flex flex-col"
        style={{
          backgroundColor: 'var(--color-surface)',
          borderColor: 'var(--color-border)',
        }}
      >
        <div className="relative w-full overflow-hidden h-[192px] shrink-0 img-grain"
          style={{ backgroundColor: 'var(--color-surface-2)' }}
        >
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover"
            priority={priority}
            loading={priority ? undefined : 'lazy'}
            onError={e => {
              (e.target as HTMLImageElement).src = '/images/placeholder-project.jpg'
            }}
          />
          {project.isLiveProject && <LiveBadge />}
          <ViewOverlay />
          {project.featured && (
            <div
              className="absolute top-3 right-3 z-10 text-xs font-semibold px-2.5 py-1 rounded-full font-mono"
              style={{
                backgroundColor: 'var(--color-accent)',
                color: 'var(--color-bg)',
              }}
            >
              Featured
            </div>
          )}
        </div>
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-center justify-between mb-1.5">
            <span
              className="text-xs font-bold tracking-widest uppercase font-mono"
              style={{ color: 'var(--color-accent)' }}
            >
              {project.category}
            </span>
            <span className="text-xs font-mono" style={{ color: 'var(--color-text-muted)' }}>{project.year}</span>
          </div>
          <h3
            className="text-base font-display font-medium mb-2 leading-snug transition-colors"
            style={{
              color: 'var(--color-text-primary)',
              transitionDuration: 'var(--motion-fast)',
            }}
          >
            {project.title}
          </h3>
          {project.description && (
            <p
              className="text-xs leading-relaxed mb-3 flex-1 line-clamp-3"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {project.description}
            </p>
          )}
          <TechPills techs={project.technologies} max={2} />
        </div>
      </div>
    </Link>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
const ProjectsGrid = () => {
  const [activeTab, setActiveTab] = useState<'major' | 'other' | 'lab'>('major')
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
      transition: { staggerChildren: 0.08 },
    },
  }

  const itemVariants = {
    hidden: { y: 24, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  }

  // Build the major tab project slots by priority ID
  const allMajor = projectsData.majorProjects
  const hero = allMajor.find(p => p.id === HERO_ID)
  const mediumCards = MEDIUM_IDS
    .map(id => allMajor.find(p => p.id === id))
    .filter(Boolean) as Project[]
  const smallCards = SMALL_IDS
    .map(id => allMajor.find(p => p.id === id))
    .filter(Boolean) as Project[]

  // Any future projects not yet in the layout config go to overflow
  const coveredIds = new Set([HERO_ID, ...MEDIUM_IDS, ...SMALL_IDS])
  const overflow = allMajor.filter(p => !coveredIds.has(p.id))

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 max-w-content mx-auto">

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2
          className="text-4xl md:text-5xl lg:text-6xl font-display font-light mb-4"
          style={{ color: 'var(--color-text-primary)' }}
        >
          Featured Work
        </h2>
        <p
          className="text-lg md:text-xl max-w-2xl mx-auto"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          A selection of AI product design, UX research, and XR interaction projects.
        </p>
      </motion.div>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-12">
        <div
          className="inline-flex rounded-xl p-1.5 border"
          style={{
            backgroundColor: 'var(--color-surface)',
            borderColor: 'var(--color-border)',
          }}
        >
          {(['major', 'other', 'lab'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-6 md:px-8 py-3 rounded-lg font-medium transition-all text-sm"
              style={{
                backgroundColor: activeTab === tab ? 'var(--color-accent)' : 'transparent',
                color: activeTab === tab ? 'var(--color-bg)' : 'var(--color-text-muted)',
                transitionDuration: 'var(--motion-fast)',
              }}
            >
              {tab === 'major' ? 'Major Projects' : tab === 'other' ? 'Other Works' : 'Lab'}
            </button>
          ))}
        </div>
      </div>

      {/* Projects */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={containerVariants}
        >

          {/* ── Major tab: deliberate 3-tier hierarchy ── */}
          {activeTab === 'major' && (
            <div className="space-y-6">

              {/* Tier 1 — Hero: LiquidRead */}
              {hero && (
                <motion.div variants={itemVariants}>
                  <HeroCard project={hero} />
                </motion.div>
              )}

              {/* Tier 2 — Medium duo: ARuler + FairSplit */}
              {mediumCards.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mediumCards.map(p => (
                    <motion.div key={p.id} variants={itemVariants} className="h-full">
                      <MediumCard project={p} />
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Tier 3 — Secondary trio: LucidPast + Digimal + Aam */}
              {smallCards.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {smallCards.map(p => (
                    <motion.div key={p.id} variants={itemVariants} className="h-full">
                      <SmallCard project={p} />
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Overflow — any future projects not yet in the ID config */}
              {overflow.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {overflow.map(p => (
                    <motion.div key={p.id} variants={itemVariants} className="h-full">
                      <SmallCard project={p} />
                    </motion.div>
                  ))}
                </div>
              )}

            </div>
          )}

          {/* ── Other Works / Lab: uniform 3-col grid ── */}
          {activeTab !== 'major' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, idx) => (
                <motion.div key={project.id} variants={itemVariants} className="h-full">
                  <UniformCard project={project} priority={idx < 3} />
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
          className="text-center py-20"
          style={{ color: 'var(--color-text-muted)' }}
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
