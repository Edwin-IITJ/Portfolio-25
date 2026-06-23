'use client'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Code, Hammer, Sparkles, Users, ChevronDown } from 'lucide-react'
import Button from '../ui/Button'
import { useEffect, useState } from 'react'

// ─── Credly embed script injection ───────────────────────────────────────────
// No fetch / state needed — Credly's own script renders the badge iframes.

// ─── Data ────────────────────────────────────────────────────────────────────
const CREDLY_BADGE_IDS = [
  '1a8da742-f117-4916-b3aa-91b364253d1e',
  '04088ee7-746b-4fab-aff0-5b5b3f8cc20b',
  '2fb56bdd-9593-4ba6-a6a8-721ef0bb3071',
]

const certifications = [
  { name: 'Introduction to Prompt Engineering for Generative AI', issuer: 'LinkedIn', year: '2023', group: 'ai' },
  { name: 'What Is Generative AI?', issuer: 'LinkedIn', year: '2023', group: 'ai' },
  { name: 'Introduction to Artificial Intelligence', issuer: 'LinkedIn', year: '2023', group: 'ai' },
  { name: 'Building ChatGPT Plugins', issuer: 'LinkedIn', year: '2023', group: 'ai' },
  { name: 'UX Foundations: Interaction Design', issuer: 'LinkedIn', year: '2024', group: 'design' },
  { name: 'Figma Essential Training: The Basics', issuer: 'LinkedIn', year: '2023', group: 'design' },
  // --- Programming & Tech ---
  { name: 'PCEP – Certified Entry-Level Python Programmer', issuer: 'OpenEDG Python Institute', year: '2023', group: 'tech' },
  { name: 'Microsoft Certified: Azure Fundamentals', issuer: 'Microsoft', year: '2022', group: 'tech' },
  { name: 'MTA: Database Fundamentals', issuer: 'Microsoft', year: '2021', group: 'tech' },
  { name: 'Programming for Everybody (Getting Started with Python)', issuer: 'University of Michigan', year: '2020', group: 'tech' },
  { name: 'Python Data Structures', issuer: 'University of Michigan', year: '2020', group: 'tech' },
  { name: 'Learning Angular', issuer: 'LinkedIn', year: '2021', group: 'tech' },
  { name: 'Learning C#', issuer: 'LinkedIn', year: '2021', group: 'tech' },
  { name: 'SharePoint Advanced: Enhancing Functionality with JavaScript', issuer: 'LinkedIn', year: '2021', group: 'tech' },
  // --- Creative & Other ---
  { name: 'Character Design for Video Games', issuer: 'California Institute of the Arts', year: '2020', group: 'creative' },
  { name: 'Story and Narrative Development for Video Games', issuer: 'California Institute of the Arts', year: '2020', group: 'creative' },
  { name: 'Introduction to Game Design', issuer: 'California Institute of the Arts', year: '2020', group: 'creative' },
  { name: 'Creative Writing: The Craft of Plot', issuer: 'Wesleyan University', year: '2020', group: 'creative' },
  { name: 'Modern Art & Ideas', issuer: 'The Museum of Modern Art', year: '2023', group: 'creative' },
]

// ─── Component ────────────────────────────────────────────────────────────────
// Priority chips shown by default (indices 0–7 match the certifications array order)
const DEFAULT_CERT_NAMES = new Set([
  'UX Foundations: Interaction Design',
  'Figma Essential Training: The Basics',
  'Introduction to Game Design',
  'Story and Narrative Development for Video Games',
  'Introduction to Prompt Engineering for Generative AI',
])

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

  // ── Skills data (unchanged) ───────────────────────────────────────────────
  const skills = [
    {
      category: 'UX Skills',
      icon: Users,
      items: ['User Research', 'Usability Testing', 'Heuristic Evaluation', 'Interaction Design', 'Wireframing', 'User Flows', 'Prototyping', 'Design Systems', 'Personas', 'Accessibility'],
    },
    {
      category: 'Design & Prototyping',
      icon: Hammer,
      items: ['Figma', 'Adobe Photoshop', 'Vibe Coding', 'Procreate', 'DaVinci Resolve', 'Unreal Engine 5', 'Unity', 'Blender'],
    },
    {
      category: 'AI-Assisted Design',
      icon: Sparkles,
      items: ['Figma Make', 'Cursor', 'Claude', 'ChatGPT', 'Perplexity', 'Google Antigravity', 'AI Image Generation', 'Prompt Engineering'],
    },
    {
      category: 'Development & Tools',
      icon: Code,
      items: ['JavaScript', 'TypeScript', 'HTML/CSS', 'Bootstrap', 'Angular', 'ASP.NET (C#)', 'SQL', 'Python', 'Supabase', 'GitHub'],
    },
  ]

  // ── Stats (unchanged — commented entries preserved) ───────────────────────
  const stats = [
    { number: '2.5+', label: 'Years Experience' },
    // { number: '20+', label: 'Projects Completed' },
    { number: '15+', label: 'Licenses & Certifications' },
    // { number: '5+',  label: 'Awards Won' },
  ]

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <section id="about" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">

        {/* ══════════════════════════════════════════════════════════════════
            ZONE 1 — Hero row (~50vh on desktop)
            Left 40%: photo + stats  |  Right 60%: bio + worked + education
        ══════════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-10 lg:gap-16 py-16 lg:py-20 lg:min-h-[55vh] items-start">

          {/* Left — Photo + Stats */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col lg:sticky lg:top-24"
          >
            {/* Profile photo — no blur orbs */}
            <div className="relative aspect-square rounded-card overflow-hidden border" style={{ borderColor: 'var(--color-border)' }}>
              <Image
                src="/images/profile.webp"
                alt="Edwin Meleth"
                fill
                className="object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = 'https://via.placeholder.com/600x600/1A1815/C9A96E?text=EM'
                }}
              />
            </div>

            {/* Photo credit */}
            <p className="mt-2 text-xs italic text-center tracking-wide" style={{ color: 'var(--color-text-muted)' }}>
              Photo by{' '}
              <a
                href="https://anshulsdoc.framer.website/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 transition-colors"
                style={{ color: 'var(--color-text-muted)', transitionDuration: 'var(--motion-fast)' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-accent)' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-muted)' }}
              >
                Anshul Sharma
              </a>
            </p>

            {/* Stats cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-3 mt-6"
            >
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="border p-5 rounded-card text-center"
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    borderColor: 'var(--color-border)',
                  }}
                >
                  <div className="text-3xl font-bold mb-0.5" style={{ color: 'var(--color-accent)' }}>{stat.number}</div>
                  <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Bio / Worked / Education (priority order: 1→2→3) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center gap-8"
          >
            {/* 1 — Bio */}
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-light mb-6" style={{ color: 'var(--color-text-primary)' }}>
                About Me
              </h2>
              <div className="space-y-4 text-base leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                <p>
                  I'm a <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>Product Designer</span> and{' '}
                  <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>Design Engineer</span> with a Master's in Design
                  from <span className="font-semibold" style={{ color: 'var(--color-accent)' }}>IIT Jodhpur</span>. I design intelligent interfaces and build them, moving fluidly between user research, prototyping, and production-ready front-end code.
                </p>
                <p>
                  Before design, I worked as a <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>Full-Stack Developer at IQVIA</span> for 2.5 years, building
                  the Supply Integrity Management System using Angular, ASP.NET, and SQL. That experience grounds my design decisions in system constraints, data behaviour, and deployment realities.
                </p>
                <p>
                  Before design, I worked as a <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>Full-Stack Developer at IQVIA</span>, building
                  the Supply Integrity Management System using Angular, ASP.NET, and SQL. Thus I understand how design decisions translate into system constraints, data behavior, and deployment realities.&nbsp; My work spans AI product design (LiquidRead), enterprise UX
                  (<span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>Immersive.IO</span> and{' '}
                  <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>IQVIA</span>, pharma-scale platforms), and XR interaction design
                  (Aam, Digimal, ARuler).
                </p>
                <p>Beyond design, I'm fascinated by narrative structure and the power of storytelling.</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>Where I've Worked</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                {/* Swiggy Instamart */}
                <a
                  href="https://www.swiggy.com/instamart"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 border rounded-card transition-all group"
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    borderColor: 'var(--color-border)',
                    transitionDuration: 'var(--motion-fast)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-accent)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)' }}
                >
                  <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0 bg-white p-1">
                    <Image src="/images/Logo_Instamart.webp" alt="Instamart logo" width={28} height={28} className="object-contain" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm leading-tight" style={{ color: 'var(--color-text-primary)' }}>Human-Centered Design Intern</p>
                    <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>Jun 2026 – Present</p>
                    <p className="text-xs truncate" style={{ color: 'var(--color-text-muted)' }}>Behavioural Science Lab · Instamart</p>
                  </div>
                </a>

                {/* Imersive.IO */}
                <a
                  href="https://imersive.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 border rounded-card transition-all group"
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    borderColor: 'var(--color-border)',
                    transitionDuration: 'var(--motion-fast)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-accent)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)' }}
                >
                  <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0 bg-white p-1">
                    <Image src="/images/Logo_Imersive1.webp" alt="Imersive.IO logo" width={28} height={28} className="object-contain" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm leading-tight" style={{ color: 'var(--color-text-primary)' }}>Product Development Intern</p>
                    <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>Jun 2025 – Aug 2025</p>
                    <p className="text-xs truncate" style={{ color: 'var(--color-text-muted)' }}>AI sizing tool</p>
                  </div>
                </a>

                {/* IQVIA */}
                <a
                  href="https://www.iqvia.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 border rounded-card transition-all group"
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    borderColor: 'var(--color-border)',
                    transitionDuration: 'var(--motion-fast)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-accent)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)' }}
                >
                  <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0 border bg-white p-1" style={{ borderColor: 'var(--color-border)' }}>
                    <Image src="/images/Logo_IQVIA.webp" alt="IQVIA logo" width={32} height={32} className="object-contain" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm leading-tight" style={{ color: 'var(--color-text-primary)' }}>Associate Software Developer</p>
                    <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>Oct 2021 – Jan 2024</p>
                    <p className="text-xs truncate" style={{ color: 'var(--color-text-muted)' }}>SiMS · Amgen, Takeda, BI, Sandoz</p>
                  </div>
                </a>

              </div>
            </div>

            {/* 3 — Education */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>Education</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                {/* IIT Jodhpur */}
                <a
                  href="https://iitj.ac.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 border rounded-card transition-all"
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    borderColor: 'var(--color-border)',
                    transitionDuration: 'var(--motion-fast)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-accent)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)' }}
                >
                  <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0 border bg-white p-1" style={{ borderColor: 'var(--color-border)' }}>
                    <Image src="/images/Logo_IITJ.webp" alt="IIT Jodhpur logo" width={32} height={32} className="object-contain" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm leading-tight" style={{ color: 'var(--color-text-primary)' }}>Master of Design (M.Des.)</p>
                    <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>IIT Jodhpur · 2024 – 2026</p>
                    {/* <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>CGPA: 8.02</p> */}
                  </div>
                </a>

                {/* MACE */}
                <a
                  href="https://mace.ac.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 border rounded-card transition-all"
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    borderColor: 'var(--color-border)',
                    transitionDuration: 'var(--motion-fast)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-accent)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)' }}
                >
                  <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0 border bg-white p-1" style={{ borderColor: 'var(--color-border)' }}>
                    <Image src="/images/Logo_MACE.webp" alt="Mar Athanasius College of Engineering logo" width={32} height={32} className="object-contain" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm leading-tight" style={{ color: 'var(--color-text-primary)' }}>B.Tech, CSE</p>
                    <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>Mar Athanasius College of Engineering · 2017 – 2021</p>
                    {/* <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>CGPA: 8.14</p> */}
                  </div>
                </a>

              </div>
            </motion.div>

          </motion.div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            ZONES 2+3 — Skills (left) + Certifications (right), 2-col desktop
        ══════════════════════════════════════════════════════════════════ */}
        <div className="border-t py-10 lg:py-12 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8" style={{ borderColor: 'var(--color-border)' }}>

          {/* ── Left — Skills & Expertise ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>Skills & Expertise</h3>
            <div className="grid grid-cols-2 gap-5">
              {skills.map((group, i) => (
                <motion.div
                  key={group.category}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-1.5 mb-2">
                    <group.icon className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--color-text-muted)' }} strokeWidth={1.5} />
                    <h4 className="font-semibold text-sm" style={{ color: 'var(--color-text-primary)' }}>{group.category}</h4>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs px-2.5 py-1 rounded-full"
                        style={{
                          backgroundColor: 'var(--color-surface-2)',
                          color: 'var(--color-text-secondary)',
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Right — Certifications & Badges ───────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>Certifications & Badges</h3>

            {/* Credly badges — always visible */}
            <div className="grid grid-cols-3 gap-3">
              {CREDLY_BADGE_IDS.map((badgeId) => (
                <div
                  key={badgeId}
                  className="flex flex-col items-center p-2 border rounded-card"
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    borderColor: 'var(--color-border)',
                  }}
                >
                  <div
                    data-iframe-width="150"
                    data-iframe-height="270"
                    data-share-badge-id={badgeId}
                    data-share-badge-host="https://www.credly.com"
                  />
                </div>
              ))}
            </div>

            {/* Default visible cert chips */}
            <div className="flex flex-wrap gap-1.5 mt-4">
              {certifications
                .filter((c) => DEFAULT_CERT_NAMES.has(c.name))
                .map((cert) => (
                  <span
                    key={cert.name}
                    className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border"
                    style={{
                      backgroundColor: 'var(--color-surface)',
                      borderColor: 'var(--color-border)',
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    <span className="font-medium" style={{ color: 'var(--color-text-primary)' }}>{cert.name}</span>
                    <span style={{ color: 'var(--color-text-muted)' }}>·</span>
                    <span style={{ color: 'var(--color-text-secondary)' }}>{cert.issuer}</span>
                  </span>
                ))}
            </div>

            {/* Progressive disclosure toggle */}
            <button
              type="button"
              onClick={() => setShowAllCerts(!showAllCerts)}
              className="inline-flex items-center gap-1.5 text-xs font-medium transition-colors mt-2"
              style={{ color: 'var(--color-accent)', transitionDuration: 'var(--motion-fast)' }}
            >
              {showAllCerts ? 'Less certifications' : 'More certifications'}
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform ${showAllCerts ? 'rotate-180' : ''}`}
                style={{ transitionDuration: 'var(--motion-fast)' }}
                strokeWidth={1.5}
              />
            </button>

            {/* Hidden cert chips revealed on expand */}
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
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {certifications
                      .filter((c) => !DEFAULT_CERT_NAMES.has(c.name))
                      .map((cert) => (
                        <span
                          key={cert.name}
                          className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border"
                          style={{
                            backgroundColor: 'var(--color-surface)',
                            borderColor: 'var(--color-border)',
                            color: 'var(--color-text-secondary)',
                          }}
                        >
                          <span className="font-medium" style={{ color: 'var(--color-text-primary)' }}>{cert.name}</span>
                          <span style={{ color: 'var(--color-text-muted)' }}>·</span>
                          <span style={{ color: 'var(--color-text-secondary)' }}>{cert.issuer}</span>
                        </span>
                      ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* CTA Buttons — right-aligned */}
            {/* <div className="flex justify-end gap-4 mt-6">
              <Button href="/Resume_EdwinMeleth.pdf" target="_blank" size="lg">
                Download Resume
              </Button>
              <Button variant="outline" size="lg" href="#contact">
                Let's Connect
              </Button>
            </div> */}
          </motion.div>

        </div>

      </div>
    </section>
  )
}

export default About
