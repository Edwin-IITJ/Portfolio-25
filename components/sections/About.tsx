// components/sections/About.tsx
'use client'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Code, Hammer, Sparkles, Users, ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'

// ─── Credly embed script injection ───────────────────────────────────────────
const CREDLY_BADGE_IDS = [
  '1a8da742-f117-4916-b3aa-91b364253d1e',
  '04088ee7-746b-4fab-aff0-5b5b3f8cc20b',
  '2fb56bdd-9593-4ba6-a6a8-721ef0bb3071',
]

// ─── Skills data ─────────────────────────────────────────────────────────────
const skills = [
  {
    category: 'Build & Ship',
    icon: Code,
    items: ['JavaScript', 'TypeScript', 'HTML/CSS', 'Angular', 'ASP.NET (C#)', 'SQL', 'Python', 'Supabase', 'GitHub'],
  },
  {
    category: 'AI-Native Workflow',
    icon: Sparkles,
    items: ['Agentic Prototyping', 'Cursor', 'Claude', 'ChatGPT', 'Google Antigravity', 'Claude Code', 'Prompt Engineering', 'AI Image Generation'],
  },
  {
    category: 'Design & Research',
    icon: Users,
    items: ['User Research', 'Usability Testing', 'Heuristic Evaluation', 'Interaction Design', 'Wireframing', 'User Flows', 'Prototyping', 'Design Systems', 'Personas', 'Accessibility'],
  },
  {
    category: 'Tools & Creative',
    icon: Hammer,
    items: ['Figma', 'Photoshop', 'Procreate', 'DaVinci Resolve'],
  },
]

// ─── Certifications data ─────────────────────────────────────────────────────
const certifications = [
  { name: 'Introduction to Prompt Engineering for Generative AI', issuer: 'LinkedIn', year: '2023', group: 'ai' },
  { name: 'What Is Generative AI?', issuer: 'LinkedIn', year: '2023', group: 'ai' },
  { name: 'Introduction to Artificial Intelligence', issuer: 'LinkedIn', year: '2023', group: 'ai' },
  { name: 'Building ChatGPT Plugins', issuer: 'LinkedIn', year: '2023', group: 'ai' },
  { name: 'UX Foundations: Interaction Design', issuer: 'LinkedIn', year: '2024', group: 'design' },
  { name: 'Figma Essential Training: The Basics', issuer: 'LinkedIn', year: '2023', group: 'design' },
  { name: 'PCEP – Certified Entry-Level Python Programmer', issuer: 'OpenEDG Python Institute', year: '2023', group: 'tech' },
  { name: 'Microsoft Certified: Azure Fundamentals', issuer: 'Microsoft', year: '2022', group: 'tech' },
  { name: 'MTA: Database Fundamentals', issuer: 'Microsoft', year: '2021', group: 'tech' },
  { name: 'Programming for Everybody (Getting Started with Python)', issuer: 'University of Michigan', year: '2020', group: 'tech' },
  { name: 'Python Data Structures', issuer: 'University of Michigan', year: '2020', group: 'tech' },
  { name: 'Learning Angular', issuer: 'LinkedIn', year: '2021', group: 'tech' },
  { name: 'Learning C#', issuer: 'LinkedIn', year: '2021', group: 'tech' },
  { name: 'SharePoint Advanced: Enhancing Functionality with JavaScript', issuer: 'LinkedIn', year: '2021', group: 'tech' },
  { name: 'Character Design for Video Games', issuer: 'California Institute of the Arts', year: '2020', group: 'creative' },
  { name: 'Story and Narrative Development for Video Games', issuer: 'California Institute of the Arts', year: '2020', group: 'creative' },
  { name: 'Introduction to Game Design', issuer: 'California Institute of the Arts', year: '2020', group: 'creative' },
  { name: 'Creative Writing: The Craft of Plot', issuer: 'Wesleyan University', year: '2020', group: 'creative' },
  { name: 'Modern Art & Ideas', issuer: 'The Museum of Modern Art', year: '2023', group: 'creative' },
]

const DEFAULT_CERT_NAMES = new Set([
  'UX Foundations: Interaction Design',
  'Figma Essential Training: The Basics',
  'Introduction to Game Design',
  'Story and Narrative Development for Video Games',
  'Introduction to Prompt Engineering for Generative AI',
])

// ─── Stats ───────────────────────────────────────────────────────────────────
const stats = [
  { number: '3', label: 'Years Experience' },
  { number: '15+', label: 'Licenses &\nCertifications' },
]

// ─── Component ───────────────────────────────────────────────────────────────
const About = () => {
  const [showAllCerts, setShowAllCerts] = useState(false)

  // Inject Credly embed script once
  useEffect(() => {
    const existingScript = document.querySelector(
      'script[src="//cdn.credly.com/assets/utilities/embed.js"]'
    )
    if (!existingScript) {
      const script = document.createElement('script')
      script.src = '//cdn.credly.com/assets/utilities/embed.js'
      script.async = true
      document.body.appendChild(script)
    } else {
      if ((window as any).CREDLY) (window as any).CREDLY.triggerBadgeLoading?.()
    }
  }, [])

  return (
    <section id="about" className="w-full" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="flex flex-col items-start w-full max-w-[1024px] mx-auto px-4 md:px-9 gap-[13px]">

        {/* Section heading */}
        <div className="w-full" style={{ paddingLeft: '8px', paddingRight: '8px' }}>
          <h2
            className="section-heading font-display"
            style={{ color: 'var(--color-black-solid)' }}
          >
            About Me
          </h2>
        </div>

        {/* Main content area */}
        <div className="w-full flex flex-col items-end gap-10 md:gap-[65.25px]">

          {/* ═══ Zone 1: Photo+Stats (Left) | Bio+Work+Education (Right) ═══ */}
          <div className="w-full flex flex-col md:flex-row items-start justify-between gap-10 md:gap-[80px]">

            {/* Left column — Photo + Stats */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col items-end w-full md:w-[358.71px] gap-[27.29px]"
            >
              {/* Photo + credit */}
              <div className="w-full flex flex-col items-center" style={{ gap: '13px' }}>
                <div
                  className="relative w-full aspect-square max-w-[280px] md:max-w-[358.71px]"
                  style={{
                    borderRadius: '12px',
                  }}
                >
                  <Image
                    src="/images/profile.webp"
                    alt="Edwin Meleth"
                    fill
                    className="object-cover"
                    style={{ borderRadius: '120px' }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = 'https://via.placeholder.com/357x357/F5F5F5/7B7B7B?text=EM'
                    }}
                  />
                </div>
                <p
                  className="w-full text-center italic"
                  style={{
                    color: 'var(--color-text-secondary)',
                    fontSize: '12px',
                    lineHeight: '16px',
                    letterSpacing: '0.3px',
                  }}
                >
                  Photo by{' '}
                  <a
                    href="https://anshulsdoc.framer.website/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 link-hover-accent"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    Anshul Sharma
                  </a>
                </p>
              </div>

              {/* Stat cards */}
              <div className="w-full flex flex-row items-start justify-center md:justify-end gap-3">
                {stats.map((stat, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center flex-1 md:flex-none md:w-[152px]"
                    style={{
                      paddingTop: '19.62px',
                      paddingBottom: i === 0 ? '39.63px' : '19.63px',
                      paddingLeft: '19.63px',
                      paddingRight: '19.63px',
                      borderRadius: '12px',
                      outline: '1px solid rgba(0, 0, 0, 0.25)',
                      outlineOffset: '-1px',
                      gap: '2px',
                    }}
                  >
                    <span
                      className="text-center"
                      style={{
                        color: 'var(--color-black-solid)',
                        fontSize: '30px',
                        fontFamily: 'var(--font-sans), sans-serif',
                        fontWeight: 700,
                        lineHeight: '36px',
                      }}
                    >
                      {stat.number}
                    </span>
                    <span
                      className="text-center"
                      style={{
                        color: 'var(--color-text-secondary)',
                        fontSize: '14px',
                        fontFamily: 'var(--font-sans), sans-serif',
                        fontWeight: 400,
                        lineHeight: '20px',
                        whiteSpace: 'pre-line',
                      }}
                    >
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right column — Bio + Work + Education */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex-1 flex flex-col items-start gap-8 md:gap-[36.32px] max-w-[700px]"
            >
              {/* Bio paragraphs */}
              <div className="w-full flex flex-col items-start gap-4 md:gap-[15.4px]">
                <p style={{ color: 'var(--color-black-solid)', fontSize: '16px', fontFamily: 'var(--font-sans), sans-serif', fontWeight: 400, lineHeight: '26px' }}>
                  I&apos;m a Design Engineer with a Master&apos;s in Design from IIT Jodhpur.
                </p>
                <p style={{ color: 'var(--color-black-solid)', fontSize: '16px', fontFamily: 'var(--font-sans), sans-serif', fontWeight: 400, lineHeight: '26px' }}>
                  I design intelligent interfaces and build them, moving fluidly between user research, prototyping, and production-ready front-end code. Currently solving problems at the intersection of operations and behavioural science.
                </p>
                <p style={{ color: 'var(--color-black-solid)', fontSize: '16px', fontFamily: 'var(--font-sans), sans-serif', fontWeight: 400, lineHeight: '26px' }}>
                  Before, I worked as a Full-Stack Developer at IQVIA, building SiMS, a B2B product for supply integrity management using Angular, ASP.NET, and SQL.
                </p>
                <p style={{ color: 'var(--color-black-solid)', fontSize: '16px', fontFamily: 'var(--font-sans), sans-serif', fontWeight: 400, lineHeight: '26px' }}>
                  Beyond, I&apos;m fascinated by narrative structure and the power of storytelling.
                </p>
              </div>

              {/* Work + Education — side by side */}
              <div className="w-full flex flex-col xl:flex-row items-start gap-8">

                {/* Where I've Worked */}
                <div className="flex flex-col items-start" style={{ gap: '16px' }}>
                  <h3
                    style={{
                      color: 'var(--color-black-solid)',
                      fontSize: '20px',
                      fontFamily: 'var(--font-sans), sans-serif',
                      fontWeight: 600,
                      lineHeight: '28px',
                    }}
                  >
                    Where I&apos;ve Worked
                  </h3>
                  <div className="flex flex-col" style={{ gap: '8px' }}>
                    {/* Swiggy */}
                    <div
                      className="flex items-center"
                      style={{
                        padding: '11.63px',
                        borderRadius: '12px',
                        outline: '1px solid rgba(0, 0, 0, 0.25)',
                        outlineOffset: '-1px',
                        gap: '12px',
                      }}
                    >
                      <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0 bg-white p-1">
                        <Image src="/images/Logo_Instamart.webp" alt="Instamart logo" width={28} height={12} className="object-contain" />
                      </div>
                      <div className="flex flex-col">
                        <span style={{ color: 'var(--color-black-solid)', fontSize: '14px', fontFamily: 'var(--font-sans), sans-serif', fontWeight: 600, lineHeight: '17.5px' }}>
                          Human-Centered Design<br />Intern
                        </span>
                        <span style={{ color: 'var(--color-black-solid)', fontSize: '12px', fontFamily: 'var(--font-sans), sans-serif', fontWeight: 400, lineHeight: '16px' }}>
                          Jun 2026 – Present
                        </span>
                        <span style={{ color: 'var(--color-black-solid)', fontSize: '12px', fontFamily: 'var(--font-sans), sans-serif', fontWeight: 400, lineHeight: '16px' }}>
                          Behavioural Science · Instamart
                        </span>
                      </div>
                    </div>

                    {/* Imersive.IO */}
                    <div
                      className="flex items-center"
                      style={{
                        padding: '11.63px',
                        borderRadius: '12px',
                        outline: '1px solid rgba(0, 0, 0, 0.25)',
                        outlineOffset: '-1px',
                        gap: '12px',
                      }}
                    >
                      <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0 bg-white p-1">
                        <Image src="/images/Logo_Imersive1.webp" alt="Imersive.IO logo" width={28} height={28} className="object-contain" />
                      </div>
                      <div className="flex flex-col" style={{ minWidth: '185.79px' }}>
                        <span style={{ color: 'var(--color-black-solid)', fontSize: '14px', fontFamily: 'var(--font-sans), sans-serif', fontWeight: 600, lineHeight: '17.5px' }}>
                          Product Development<br />Intern
                        </span>
                        <span style={{ color: 'var(--color-black-solid)', fontSize: '12px', fontFamily: 'var(--font-sans), sans-serif', fontWeight: 400, lineHeight: '16px' }}>
                          Jun 2025 – Aug 2025
                        </span>
                        <span style={{ color: 'var(--color-black-solid)', fontSize: '12px', fontFamily: 'var(--font-sans), sans-serif', fontWeight: 400, lineHeight: '16px' }}>
                          AI sizing tool
                        </span>
                      </div>
                    </div>

                    {/* IQVIA */}
                    <div
                      className="flex items-center"
                      style={{
                        padding: '11.63px',
                        borderRadius: '12px',
                        outline: '1px solid rgba(0, 0, 0, 0.25)',
                        outlineOffset: '-1px',
                        gap: '12px',
                      }}
                    >
                      <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0 bg-white p-1">
                        <Image src="/images/Logo_IQVIA.webp" alt="IQVIA logo" width={31} height={5} className="object-contain" />
                      </div>
                      <div className="flex flex-col">
                        <span style={{ color: 'var(--color-black-solid)', fontSize: '14px', fontFamily: 'var(--font-sans), sans-serif', fontWeight: 600, lineHeight: '17.5px' }}>
                          Associate Software<br />Developer
                        </span>
                        <span style={{ color: 'var(--color-black-solid)', fontSize: '12px', fontFamily: 'var(--font-sans), sans-serif', fontWeight: 400, lineHeight: '16px' }}>
                          Oct 2021 – Jan 2024
                        </span>
                        <span style={{ color: 'var(--color-black-solid)', fontSize: '12px', fontFamily: 'var(--font-sans), sans-serif', fontWeight: 400, lineHeight: '16px' }}>
                          SiMS · Amgen, Takeda, BI, Sandoz
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Education */}
                <div className="flex flex-col items-start" style={{ gap: '16px' }}>
                  <h3
                    style={{
                      color: 'var(--color-black-solid)',
                      fontSize: '20px',
                      fontFamily: 'var(--font-sans), sans-serif',
                      fontWeight: 600,
                      lineHeight: '28px',
                    }}
                  >
                    Education
                  </h3>
                  <div className="flex flex-col items-center" style={{ gap: '8px' }}>
                    {/* IIT Jodhpur */}
                    <div
                      className="flex items-center"
                      style={{
                        paddingLeft: '11.63px',
                        paddingRight: '11.63px',
                        paddingTop: '16.38px',
                        paddingBottom: '16.38px',
                        borderRadius: '12px',
                        outline: '1px solid rgba(0, 0, 0, 0.25)',
                        outlineOffset: '-1px',
                        gap: '12px',
                      }}
                    >
                      <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0 bg-white p-1">
                        <Image src="/images/Logo_IITJ.webp" alt="IIT Jodhpur logo" width={31} height={34} className="object-contain" />
                      </div>
                      <div className="flex flex-col">
                        <span style={{ color: 'var(--color-black-solid)', fontSize: '14px', fontFamily: 'var(--font-sans), sans-serif', fontWeight: 600, lineHeight: '17.5px' }}>
                          Master of Design (M.Des.)
                        </span>
                        <span style={{ color: 'var(--color-black-solid)', fontSize: '12px', fontFamily: 'var(--font-sans), sans-serif', fontWeight: 400, lineHeight: '16px' }}>
                          IIT Jodhpur · 2024 – 2026
                        </span>
                      </div>
                    </div>

                    {/* MACE */}
                    <div
                      className="flex items-center"
                      style={{
                        padding: '11.63px',
                        borderRadius: '12px',
                        outline: '1px solid rgba(0, 0, 0, 0.25)',
                        outlineOffset: '-1px',
                        gap: '12px',
                      }}
                    >
                      <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0 bg-white p-1">
                        <Image src="/images/Logo_MACE.webp" alt="MACE logo" width={31} height={31} className="object-contain" />
                      </div>
                      <div className="flex flex-col" style={{ minWidth: '185.79px' }}>
                        <span style={{ color: 'var(--color-black-solid)', fontSize: '14px', fontFamily: 'var(--font-sans), sans-serif', fontWeight: 600, lineHeight: '17.5px' }}>
                          B.Tech., CSE
                        </span>
                        <span style={{ color: 'var(--color-black-solid)', fontSize: '12px', fontFamily: 'var(--font-sans), sans-serif', fontWeight: 400, lineHeight: '16px' }}>
                          Mar Athanasius College of<br />Engineering · 2017 – 2021
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ═══ Zone 2: Certifications (Left) | Skills (Right) ═══ */}
          <div className="w-full flex flex-col md:flex-row items-start gap-10 md:gap-[36px]">

            {/* Certifications & Badges — Left */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex-1 flex flex-col items-start gap-4 md:gap-[13.88px]"
            >
              <h3
                style={{
                  color: 'var(--color-black-solid)',
                  fontSize: '20px',
                  fontFamily: 'var(--font-sans), sans-serif',
                  fontWeight: 600,
                  lineHeight: '28px',
                }}
              >
                Certifications & Badges
              </h3>

              {/* Credly badges row */}
              <div className="flex flex-wrap items-center gap-[10px]">
                {CREDLY_BADGE_IDS.map((badgeId) => (
                  <div
                    key={badgeId}
                    className="flex flex-col items-center overflow-hidden"
                    style={{
                      borderRadius: '12px',
                      outline: '1px solid var(--color-black-solid)',
                      outlineOffset: '-1px',
                    }}
                  >
                    <div
                      className="p-1"
                      data-iframe-width="140"
                      data-iframe-height="270"
                      data-share-badge-id={badgeId}
                      data-share-badge-host="https://www.credly.com"
                    />
                  </div>
                ))}
              </div>

              {/* Other certs — expandable */}
              <div className="flex flex-wrap" style={{ gap: '4px' }}>
                {certifications
                  .filter((c) => DEFAULT_CERT_NAMES.has(c.name))
                  .slice(0, 3)
                  .map((cert) => (
                    <span key={cert.name} className="tag-pill" style={{ fontSize: '11px' }}>
                      {cert.name}
                    </span>
                  ))}
              </div>

              <button
                type="button"
                onClick={() => setShowAllCerts(!showAllCerts)}
                className="transition-colors"
                style={{
                  color: 'var(--color-black-solid)',
                  fontSize: '12px',
                  fontFamily: 'var(--font-sans), sans-serif',
                  fontWeight: 500,
                  lineHeight: '16px',
                  transitionDuration: 'var(--motion-fast)',
                }}
              >
                {showAllCerts ? 'Less Certificates' : 'Other Certificates'}
              </button>

              <AnimatePresence initial={false}>
                {showAllCerts && (
                  <motion.div
                    key="extra-certs"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-wrap" style={{ gap: '4px' }}>
                      {certifications
                        .filter((c) => !DEFAULT_CERT_NAMES.has(c.name))
                        .map((cert) => (
                          <span key={cert.name} className="tag-pill" style={{ fontSize: '11px' }}>
                            {cert.name}
                          </span>
                        ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Skills & Expertise — Right */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              viewport={{ once: true }}
              className="flex-1 flex flex-col items-start"
              style={{ gap: '16px' }}
            >
              <h3
                style={{
                  color: 'var(--color-black-solid)',
                  fontSize: '20px',
                  fontFamily: 'var(--font-sans), sans-serif',
                  fontWeight: 600,
                  lineHeight: '28px',
                }}
              >
                Skills & Expertise
              </h3>

              {/* Skills grid — 2 columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                {skills.map((group, i) => (
                  <div key={group.category}>
                    <div className="flex items-center" style={{ gap: '6px', marginBottom: '8px' }}>
                      <group.icon className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--color-text-secondary)' }} strokeWidth={1.5} />
                      <h4
                        style={{
                          color: 'var(--color-black-solid)',
                          fontSize: '13px',
                          fontFamily: 'var(--font-sans), sans-serif',
                          fontWeight: 600,
                        }}
                      >
                        {group.category}
                      </h4>
                    </div>
                    <div className="flex flex-wrap" style={{ gap: '4px' }}>
                      {group.items.map((skill) => (
                        <span
                          key={skill}
                          className="tag-pill"
                          style={{ fontSize: '11px' }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
