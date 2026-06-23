// components/projects/RelatedProjects.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { Project } from '@/data/projects'

interface RelatedProjectsProps {
    projects: Project[]
    groupLabel: string // e.g. "Major Projects" | "Other Works" | "Lab"
}

const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' },
    }),
}

export default function RelatedProjects({ projects, groupLabel }: RelatedProjectsProps) {
    if (!projects || projects.length === 0) return null

    return (
        <section
            className="w-full border-t mt-12 pt-16 pb-24 px-4 sm:px-6 lg:px-8 max-w-content mx-auto"
            style={{ borderColor: 'var(--color-border)' }}
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-10">
                <div>
                    <p
                        className="text-sm font-medium uppercase tracking-widest mb-1 font-mono"
                        style={{ color: 'var(--color-accent)' }}
                    >
                        More from
                    </p>
                    <h2
                        className="text-2xl md:text-3xl font-display font-light"
                        style={{ color: 'var(--color-text-primary)' }}
                    >
                        {groupLabel}
                    </h2>
                </div>

                {/* Back to all projects link */}
                <Link
                    href="/#projects"
                    className="hidden sm:inline-flex items-center gap-1.5 text-sm transition-colors group"
                    style={{ color: 'var(--color-text-secondary)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-accent)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-secondary)' }}
                >
                    View all
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
                </Link>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((p, i) => (
                    <motion.div
                        key={p.id}
                        custom={i}
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <Link href={`/projects/${p.id}`} className="group block">
                            {/* Cover image */}
                            <div
                                className="relative w-full aspect-[4/3] rounded-card overflow-hidden mb-4 img-grain border"
                                style={{
                                    backgroundColor: 'var(--color-surface-2)',
                                    borderColor: 'var(--color-border)',
                                }}
                            >
                                <Image
                                    src={p.coverImage}
                                    alt={p.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />
                                {/* Overlay */}
                                <div
                                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4"
                                    style={{ transitionDuration: 'var(--motion-default)' }}
                                >
                                    <span className="text-sm font-medium flex items-center gap-1.5" style={{ color: 'var(--color-text-primary)' }}>
                                        View Project
                                        <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                                    </span>
                                </div>
                            </div>

                            {/* Meta */}
                            <div className="px-1">
                                {p.category && (
                                    <p
                                        className="text-xs font-medium uppercase tracking-wide mb-1 font-mono"
                                        style={{ color: 'var(--color-accent)' }}
                                    >
                                        {p.category}
                                    </p>
                                )}
                                <h3
                                    className="text-base font-semibold transition-colors leading-snug font-display"
                                    style={{
                                        color: 'var(--color-text-primary)',
                                        transitionDuration: 'var(--motion-fast)',
                                    }}
                                >
                                    {p.title}
                                </h3>
                                {p.description && (
                                    <p className="text-sm mt-1 line-clamp-2" style={{ color: 'var(--color-text-secondary)' }}>
                                        {p.description}
                                    </p>
                                )}
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>

            {/* Mobile "View all" */}
            <div className="mt-10 sm:hidden text-center">
                <Link
                    href="/#projects"
                    className="inline-flex items-center gap-1.5 text-sm transition-colors group"
                    style={{ color: 'var(--color-text-secondary)' }}
                >
                    View all projects
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
                </Link>
            </div>
        </section>
    )
}
