// components/sections/ProjectsGrid.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Lock } from 'lucide-react'
import { projectsData, Project } from '@/data/projects'

// ── Tab types ─────────────────────────────────────────────────────────────────
type TabKey = 'nda' | 'major' | 'other' | 'lab'

const TAB_LABELS: Record<TabKey, string> = {
  nda: 'NDA Protected',
  major: 'Major Projects',
  other: 'Other Works',
  lab: 'Lab',
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function projectHref(p: Project): string {
  return p.isLiveProject && p.liveProjectPath
    ? p.liveProjectPath
    : `/projects/${p.id}`
}

// ── Shared sub-components ─────────────────────────────────────────────────────

function TechPills({ techs, max = 3 }: { techs: string[]; max?: number }) {
  return (
    <div className="flex flex-wrap items-start" style={{ gap: '4px' }}>
      {techs.slice(0, max).map(t => (
        <span
          key={t}
          className="tag-pill"
        >
          {t}
        </span>
      ))}
      {techs.length > max && (
        <span
          className="text-xs px-2 py-1"
          style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-sans), sans-serif' }}
        >
          +{techs.length - max}
        </span>
      )}
    </div>
  )
}

// ── Hero card (LiquidRead — full-width featured card) ─────────────────────────
function HeroCard({ project }: { project: Project }) {
  return (
    <Link href={projectHref(project)}>
      <div
        className="group cursor-pointer overflow-hidden card-hover flex flex-col w-full"
        style={{
          borderRadius: '12px',
          border: '1px solid var(--color-black-solid)',
          backgroundColor: 'var(--color-bg)',
        }}
      >
        {/* Image — locked aspect from design: 782×375 */}
        <div
          className="relative overflow-hidden w-full aspect-[4/3] md:aspect-[782/375]"
          style={{
            backgroundColor: 'var(--color-surface-2)',
          }}
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
          {/* "New" badge */}
          {project.isNew && (
            <div
              className="absolute z-10 font-mono"
              style={{
                right: '20px',
                top: '20px',
                paddingLeft: '13.63px',
                paddingRight: '13.63px',
                paddingTop: '5.63px',
                paddingBottom: '5.63px',
                backgroundColor: 'var(--color-orange-9-85)',
                borderRadius: '9999px',
                outline: '1px solid var(--color-border)',
                outlineOffset: '-1px',
                backdropFilter: 'blur(4px)',
                color: 'var(--color-accent)',
                fontSize: '12px',
                fontWeight: 600,
                lineHeight: '16px',
                letterSpacing: '0.3px',
              }}
            >
              New
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col items-start" style={{ padding: '20px', gap: '16px' }}>
          {/* Category */}
          <div className="w-full">
            <span
              className="font-mono"
              style={{
                color: 'var(--color-black-solid)',
                fontSize: '12px',
                fontWeight: 700,
                textTransform: 'uppercase',
                lineHeight: '16px',
                letterSpacing: '1.2px',
              }}
            >
              {project.category}
            </span>
          </div>

          {/* Title + Description */}
          <div className="flex flex-col items-start" style={{ gap: '12px', width: '100%' }}>
            <h3
              className="font-display"
              style={{
                color: 'var(--color-black-solid)',
                fontSize: '36px',
                fontWeight: 500,
                lineHeight: '40px',
              }}
            >
              {project.title}
            </h3>
            <p
              style={{
                maxWidth: '896px',
                color: 'var(--color-black-solid)',
                fontSize: '18px',
                fontFamily: 'var(--font-sans), sans-serif',
                fontWeight: 400,
                lineHeight: '28px',
              }}
            >
              {project.description}
            </p>
          </div>

          {/* Tech pills + Case Study link */}
          <div className="flex flex-col items-start w-full" style={{ gap: '16px' }}>
            <TechPills techs={project.technologies} max={5} />
            <div className="flex items-center" style={{ gap: '12px' }}>
              <span
                style={{
                  color: '#565656',
                  fontSize: '14px',
                  fontFamily: 'var(--font-sans), sans-serif',
                  fontWeight: 500,
                  lineHeight: '20px',
                }}
              >
                Case Study
              </span>
              <ArrowRight
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                style={{ color: '#565656', transitionDuration: 'var(--motion-fast)' }}
                strokeWidth={1.5}
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

// ── Medium card (50/50 grid cards) ────────────────────────────────────────────
function MediumCard({ project }: { project: Project }) {
  return (
    <Link href={projectHref(project)} className="h-full block">
      <div
        className="group cursor-pointer overflow-hidden card-hover h-full flex flex-col"
        style={{
          backgroundColor: 'var(--color-bg)',
          borderRadius: '12px',
          border: '1px solid var(--color-black-solid)',
        }}
      >
        {/* Image — locked aspect from design: 378×243 */}
        <div
          className="relative overflow-hidden shrink-0 w-full aspect-[4/3] md:aspect-[378/243]"
          style={{
            backgroundColor: 'var(--color-surface-2)',
          }}
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
        </div>

        {/* Content */}
        <div
          className="flex flex-col flex-1 bg-white"
          style={{ padding: '20px' }}
        >
          <div className="flex flex-col items-start" style={{ gap: '16px' }}>
            {/* Category row */}
            <div className="flex flex-col items-start" style={{ gap: '12px', width: '100%' }}>
              <div className="w-full flex items-start justify-between">
                <span
                  className="font-mono"
                  style={{
                    color: 'var(--color-black-solid)',
                    fontSize: '12px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    lineHeight: '16px',
                    letterSpacing: '1.2px',
                  }}
                >
                  {project.category}
                </span>
                <span
                  className="font-mono"
                  style={{
                    color: 'var(--color-black-solid)',
                    fontSize: '12px',
                    fontWeight: 400,
                    lineHeight: '16px',
                  }}
                >
                  {project.year}
                </span>
              </div>

              {/* Title */}
              <h3
                className="font-display"
                style={{
                  color: 'var(--color-black-solid)',
                  fontSize: '24px',
                  fontWeight: 500,
                  lineHeight: '32px',
                }}
              >
                {project.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  color: 'var(--color-black-solid)',
                  fontSize: '14px',
                  fontFamily: 'var(--font-sans), sans-serif',
                  fontWeight: 400,
                  lineHeight: '22.75px',
                  maxWidth: '322px',
                }}
              >
                {project.description}
              </p>
            </div>

            {/* Tech pills */}
            <TechPills techs={project.technologies} max={3} />
          </div>
        </div>
      </div>
    </Link>
  )
}

// ── NDA Locked State ──────────────────────────────────────────────────────────
function NdaLockedState() {
  return (
    <div
      className="flex flex-col items-center justify-center text-center w-full max-w-[783px]"
      style={{
        minHeight: '400px',
        borderRadius: '12px',
        outline: '1px dashed rgba(46, 43, 40, 0.3)',
        outlineOffset: '-1px',
        padding: '48px',
        gap: '20px',
      }}
    >
      <div
        className="flex items-center justify-center"
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '9999px',
          backgroundColor: 'var(--color-surface-2)',
        }}
      >
        <Lock className="w-6 h-6" style={{ color: 'var(--color-text-secondary)' }} strokeWidth={1.5} />
      </div>
      <h3
        className="font-display"
        style={{
          fontSize: '24px',
          fontWeight: 500,
          lineHeight: '32px',
          color: 'var(--color-text-primary)',
        }}
      >
        NDA Protected Work
      </h3>
      <p
        style={{
          fontSize: '16px',
          fontFamily: 'var(--font-sans), sans-serif',
          fontWeight: 400,
          lineHeight: '24px',
          color: 'var(--color-text-secondary)',
          maxWidth: '420px',
        }}
      >
        These case studies contain confidential work and are available upon request
        with appropriate authorization.
      </p>
      <a
        href="mailto:edwinmeleth@gmail.com"
        className="inline-flex items-center justify-center transition-all"
        style={{
          paddingLeft: '20px',
          paddingRight: '20px',
          paddingTop: '12px',
          paddingBottom: '12px',
          backgroundColor: 'var(--color-black-solid)',
          borderRadius: '9999px',
          color: '#FFFFFF',
          fontSize: '14px',
          fontFamily: 'var(--font-sans), sans-serif',
          fontWeight: 500,
          lineHeight: '20px',
          transitionDuration: 'var(--motion-fast)',
        }}
      >
        Request Access
      </a>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
const ProjectsGrid = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('major')

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

  // Get featured projects for the active tab, sorting the "isNew" one to the top
  const getTabProjects = (tab: TabKey): Project[] => {
    let sourceProjects: Project[] = []
    switch (tab) {
      case 'major':
        sourceProjects = projectsData.majorProjects
        break
      case 'other':
        sourceProjects = projectsData.otherWorks
        break
      case 'lab':
        sourceProjects = projectsData.labWorks
        break
      case 'nda':
        return []
    }

    // Only take projects marked as featured
    const featured = sourceProjects.filter(p => p.featured)
    if (featured.length === 0) return []

    // Find the first project marked as isNew for the hero slot
    const heroIndex = featured.findIndex(p => p.isNew)
    
    if (heroIndex > 0) {
      // Move the hero project to the beginning of the array
      const heroProject = featured.splice(heroIndex, 1)[0]
      featured.unshift(heroProject)
    }

    // Limit to max 3 projects for the home page preview
    return featured.slice(0, 3)
  }

  // Unified tiered layout for all project categories
  const renderTieredLayout = (projects: Project[]) => {
    if (projects.length === 0) return null
    const [first, ...rest] = projects
    return (
      <div className="flex flex-col items-center gap-6 w-full lg:max-w-[1200px]">
        {/* Hero card */}
        <motion.div variants={itemVariants} className="w-full">
          <HeroCard project={first} />
        </motion.div>

        {/* Medium cards row */}
        {rest.length > 0 && (
          <div className="flex flex-col md:flex-row items-start justify-between gap-6 w-full">
            {rest.map(p => (
              <motion.div key={p.id} variants={itemVariants} className="w-full md:w-[calc(50%-12px)]">
                <MediumCard project={p} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <section id="projects" className="w-full">
      <div className="flex flex-col items-center w-full max-w-[1024px] mx-auto px-4 md:px-9 gap-5">
        {/* Section Header: Title + Subtitle + Doodle */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-[32px] w-full">
        <h2 className="section-heading font-display" style={{ whiteSpace: 'nowrap' }}>
          Featured Work
        </h2>
        <p
          className="font-display"
          style={{
            maxWidth: '414px',
            color: 'var(--color-black-solid)',
            fontSize: '20px',
            fontWeight: 300,
            lineHeight: '28px',
          }}
        >
          A selection of AI product design, UX research, and XR interaction projects.
        </p>
        {/* Doodle illustration — decorative */}
        <img
          src="/images/featuredwork.webp"
          alt="Decorative illustration"
          className="hidden md:block object-contain"
          style={{ width: '164px', height: '171px' }}
        />
      </div>

      {/* Content area: Tabs (left) + Cards (right) */}
      <div className="w-full flex flex-col items-end gap-4">
        <div className="w-full flex flex-col xl:flex-row items-start justify-between gap-6">

          {/* Tab Navigation — pill list */}
          <div
            className="flex flex-row md:flex-col items-start w-full md:w-auto overflow-x-auto no-scrollbar shrink-0 gap-2 md:gap-0"
            style={{
              padding: '4px',
              backgroundColor: 'var(--color-bg)',
              borderRadius: '12px',
              outline: '1px solid var(--color-border)',
              outlineOffset: '-1px',
            }}
          >
            {(['nda', 'major', 'other', 'lab'] as TabKey[]).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="text-center md:text-left transition-all overflow-hidden whitespace-nowrap shrink-0"
                style={{
                  width: 'auto',
                  minWidth: '122px',
                  padding: '12px',
                  borderRadius: '8px',
                  backgroundColor: activeTab === tab ? 'var(--color-black-solid)' : 'transparent',
                  color: activeTab === tab ? '#FFFFFF' : 'var(--color-black-solid)',
                  fontSize: '14px',
                  fontFamily: 'var(--font-sans), sans-serif',
                  fontWeight: 500,
                  lineHeight: '20px',
                  transitionDuration: 'var(--motion-fast)',
                }}
              >
                {TAB_LABELS[tab]}
              </button>
            ))}
          </div>

          {/* Project Cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={containerVariants}
            >
              {activeTab === 'nda' ? (
                <motion.div variants={itemVariants}>
                  <NdaLockedState />
                </motion.div>
              ) : (
                /* Dynamic tiered layout for all other tabs */
                renderTieredLayout(getTabProjects(activeTab))
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Show More button */}
        {activeTab !== 'nda' && (
          <Link
            href={`/projects?tab=${activeTab}`}
            className="flex items-center justify-center transition-all group"
            style={{
              width: '130px',
              height: '40px',
              paddingLeft: '16px',
              paddingRight: '16px',
              paddingTop: '8px',
              paddingBottom: '8px',
              borderRadius: '9999px',
              outline: '1px solid var(--color-black-solid)',
              outlineOffset: '-1px',
              gap: '8px',
              transitionDuration: 'var(--motion-fast)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-black-solid)'
              e.currentTarget.style.color = '#FFFFFF'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = 'var(--color-black-solid)'
            }}
          >
            <span
              style={{
                fontSize: '14px',
                fontFamily: 'var(--font-sans), sans-serif',
                fontWeight: 500,
                lineHeight: '20px',
              }}
            >
              Show More
            </span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
          </Link>
        )}
      </div>
      </div>
    </section>
  )
}

export default ProjectsGrid
