import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { Lock } from 'lucide-react'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import { projectsData, Project } from '@/data/projects'

type TabKey = 'nda' | 'major' | 'other' | 'lab'

const TAB_LABELS: Record<TabKey, string> = {
  nda: 'NDA Protected',
  major: 'Major Projects',
  other: 'Other Works',
  lab: 'Lab',
}

function projectHref(p: Project): string {
  return p.isLiveProject && p.liveProjectPath
    ? p.liveProjectPath
    : `/projects/${p.id}`
}

function TechPills({ techs, max = 3 }: { techs: string[]; max?: number }) {
  return (
    <div className="flex flex-wrap items-start" style={{ gap: '4px' }}>
      {techs.slice(0, max).map(t => (
        <span key={t} className="tag-pill">{t}</span>
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

function GridCard({ project }: { project: Project }) {
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
        <div
          className="relative overflow-hidden shrink-0 w-full aspect-[4/3] md:aspect-[378/243]"
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
        </div>

        <div className="flex flex-col flex-1 bg-white" style={{ padding: '20px' }}>
          <div className="flex flex-col items-start" style={{ gap: '16px' }}>
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
            <TechPills techs={project.technologies} max={3} />
          </div>
        </div>
      </div>
    </Link>
  )
}

function NdaLockedState() {
  return (
    <div
      className="flex flex-col items-center justify-center text-center w-full col-span-1 md:col-span-2"
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
      <h3 className="font-display text-[24px] font-medium leading-[32px] text-[var(--color-text-primary)]">
        NDA Protected Work
      </h3>
      <p className="text-[16px] font-sans font-normal leading-[24px] text-[var(--color-text-secondary)] max-w-[420px]">
        These case studies contain confidential work and are available upon request
        with appropriate authorization.
      </p>
      <a
        href="mailto:edwinmeleth@gmail.com"
        className="inline-flex items-center justify-center px-5 py-3 bg-[var(--color-black-solid)] rounded-full text-white text-[14px] font-sans font-medium leading-[20px] transition-all hover:bg-[#333]"
      >
        Request Access
      </a>
    </div>
  )
}

export default function ProjectsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<TabKey>('major')

  // Sync with URL query parameter
  useEffect(() => {
    if (router.query.tab && typeof router.query.tab === 'string') {
      const tab = router.query.tab.toLowerCase() as TabKey
      if (['nda', 'major', 'other', 'lab'].includes(tab)) {
        setActiveTab(tab)
      }
    }
  }, [router.query.tab])

  const handleTabChange = (tab: TabKey) => {
    setActiveTab(tab)
    router.push(`/projects?tab=${tab}`, undefined, { shallow: true })
  }

  const getTabProjects = (tab: TabKey): Project[] => {
    switch (tab) {
      case 'major':
        return projectsData.majorProjects
      case 'other':
        return projectsData.otherWorks
      case 'lab':
        return projectsData.labWorks
      case 'nda':
        return []
      default:
        return []
    }
  }

  const projectsToRender = getTabProjects(activeTab)

  return (
    <>
      <Head>
        <title>Projects - Edwin Meleth</title>
        <meta
          name="description"
          content="Case studies and projects by Edwin Meleth — AI-powered product design, XR interaction systems, UX design, and adaptive experiences."
        />
        <link rel="canonical" href="https://edwinm.vercel.app/projects" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://edwinm.vercel.app/projects" />
        <meta property="og:title" content="Projects – Edwin Meleth | Design Engineer" />
        <meta property="og:description" content="AI-powered product design, XR interaction systems, and adaptive experiences by Edwin Meleth." />
        <meta property="og:image" content="https://edwinm.vercel.app/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Projects – Edwin Meleth | Design Engineer" />
      </Head>

      <div className="relative z-10" style={{ backgroundColor: 'var(--color-bg)' }}>
        <Navbar />
        <main
          className="flex flex-col items-center w-full pt-[100px] md:pt-[140px] pb-[80px]"
          style={{
            minHeight: 'calc(100vh - 100px)',
          }}
        >
          <div className="w-full flex flex-col items-start gap-12 max-w-[1024px] mx-auto px-4 md:px-9">
            {/* Header Area */}
            <div className="flex flex-col gap-6">
              <Link
                href="/#projects"
                className="inline-flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-black-solid)] transition-colors w-fit font-sans text-[14px] font-medium"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                Back to Home
              </Link>
              <div className="flex flex-col gap-4">
                <h1 className="font-display text-[48px] md:text-[64px] font-light leading-none text-[var(--color-black-solid)] tracking-tight">
                  Featured Work
                </h1>
                <p className="font-display text-[18px] md:text-[22px] font-light text-[var(--color-text-secondary)] max-w-[640px] leading-relaxed">
                  A comprehensive collection of my work spanning AI interfaces, mixed reality, full-stack engineering, and design research.
                </p>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="w-full md:w-auto">
              <div
                className="inline-flex flex-row items-center w-full md:w-auto overflow-x-auto no-scrollbar gap-1 p-1.5"
                style={{
                  backgroundColor: 'var(--color-bg)',
                  borderRadius: '12px',
                  outline: '1px solid var(--color-border)',
                  outlineOffset: '-1px',
                }}
              >
                {(['nda', 'major', 'other', 'lab'] as TabKey[]).map(tab => (
                  <button
                    key={tab}
                    onClick={() => handleTabChange(tab)}
                    className="text-center transition-all whitespace-nowrap"
                    style={{
                      padding: '10px 24px',
                      borderRadius: '8px',
                      backgroundColor: activeTab === tab ? 'var(--color-black-solid)' : 'transparent',
                      color: activeTab === tab ? '#FFFFFF' : 'var(--color-black-solid)',
                      fontSize: '14px',
                      fontFamily: 'var(--font-sans), sans-serif',
                      fontWeight: activeTab === tab ? 500 : 400,
                      transitionDuration: 'var(--motion-fast)',
                    }}
                  >
                    {TAB_LABELS[tab]}
                  </button>
                ))}
              </div>
            </div>

            {/* Projects Grid */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeTab === 'nda' ? (
                <NdaLockedState />
              ) : projectsToRender.length > 0 ? (
                projectsToRender.map((project) => (
                  <GridCard key={project.id} project={project} />
                ))
              ) : (
                <div className="col-span-1 md:col-span-2 text-center py-20 text-[var(--color-text-secondary)] font-sans">
                  No projects found in this category.
                </div>
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}
