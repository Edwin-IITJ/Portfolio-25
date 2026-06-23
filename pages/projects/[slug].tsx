// pages/projects/[slug].tsx
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Tag, Calendar, ExternalLink, Github } from 'lucide-react';
import { motion } from 'framer-motion';

import Navbar from '../../components/sections/Navbar';
import Footer from '../../components/sections/Footer';
import MediaRenderer from '../../components/projects/MediaRenderer';
import RelatedProjects from '../../components/projects/RelatedProjects';
import { projectsData, type Project } from '../../data/projects';
import LucidPastPage from '../../components/projects/lucidpast/LucidPastPage';
import AamPage from '../../components/projects/aam/AamPage';
import MelethArchivePage from '../../components/projects/meleth-archive/MelethArchivePage';
import LiquidReadPage from '../../components/projects/liquidread/LiquidReadPage';
import FairSplitPage from '../../components/projects/fairsplit/FairSplitPage';
import { cn } from '../../lib/utils';
import { fadeInUp, fadeIn, staggerContainer } from '../../lib/animations';

// JSON-safe helper
function removeUndefinedDeep<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj)) as T;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const all = [
    ...projectsData.majorProjects,
    ...projectsData.otherWorks,
    ...projectsData.labWorks,
  ];
  return {
    paths: all.map((p) => ({ params: { slug: p.id } })),
    fallback: false,
  };
};

type GroupKey = 'majorProjects' | 'otherWorks' | 'labWorks';
const GROUP_LABELS: Record<GroupKey, string> = {
  majorProjects: 'Major Projects',
  otherWorks: 'Other Works',
  labWorks: 'Lab',
};

export const getStaticProps: GetStaticProps<{
  project: Project;
  relatedProjects: Project[];
  groupLabel: string;
}> = async (ctx) => {
  const slug = ctx.params?.slug as string;

  // Determine which group this project belongs to
  let group: GroupKey = 'majorProjects';
  let project: Project | undefined;

  for (const key of Object.keys(GROUP_LABELS) as GroupKey[]) {
    const found = projectsData[key].find((p) => p.id === slug);
    if (found) { project = found; group = key; break; }
  }

  if (!project) return { notFound: true };

  // Pick up to 3 sibling projects (excluding current), shuffled
  const siblings = projectsData[group].filter((p) => p.id !== slug);
  const shuffled = [...siblings].sort(() => Math.random() - 0.5);
  const relatedProjects = shuffled.slice(0, 3);

  return {
    props: {
      project: removeUndefinedDeep(project),
      relatedProjects: removeUndefinedDeep(relatedProjects),
      groupLabel: GROUP_LABELS[group],
    },
  };
};

export default function ProjectPage({
  project,
  relatedProjects,
  groupLabel,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (project.layout === 'lucidpast') {
    return <LucidPastPage project={project} relatedProjects={relatedProjects} />;
  }

  if (project.layout === 'aam') {
    return (
      <AamPage 
        project={project} 
        relatedProjects={relatedProjects} 
        groupLabel={groupLabel} 
      />
    );
  }

  if (project.layout === 'meleth-archive') {
    return <MelethArchivePage project={project} relatedProjects={relatedProjects} />;
  }

  if (project.layout === 'liquidread') {
    return (
      <LiquidReadPage
        project={project}
        relatedProjects={relatedProjects}
        groupLabel={groupLabel}
      />
    );
  }

  if (project.layout === 'fairsplit') {
    return (
      <FairSplitPage
        project={project}
        relatedProjects={relatedProjects}
        groupLabel={groupLabel}
      />
    );
  }

  return (
    <>
      {/* Sticky global navbar */}
      <Navbar />

      <Head>
        <title>{project.title} – Edwin Meleth</title>
        <meta name="description" content={project.description} />
        <link rel="canonical" href={`https://edwinm.vercel.app/projects/${project.id}`} />

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://edwinm.vercel.app/projects/${project.id}`} />
        <meta property="og:title" content={`${project.title} – Edwin Meleth`} />
        <meta property="og:description" content={project.description} />
        <meta property="og:image" content={`https://edwinm.vercel.app${project.coverImage}`} />
        <meta property="og:site_name" content="Edwin Meleth Portfolio" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${project.title} – Edwin Meleth`} />
        <meta name="twitter:description" content={project.description} />
        <meta name="twitter:image" content={`https://edwinm.vercel.app${project.coverImage}`} />
      </Head>

      {/* Header section */}
      <motion.header
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="mx-auto w-full max-w-content px-4 sm:px-6 lg:px-8 pt-10 pb-8"
        style={{ backgroundColor: 'var(--color-bg)' }}
      >
        {/* Back to Projects */}
        <div className="max-w-content mx-auto py-8">
          <Link href="/projects">
            <motion.div
              className="inline-flex items-center transition-colors cursor-pointer"
              style={{ color: 'var(--color-text-secondary)' }}
              whileHover={{ x: -5 }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--color-accent)' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--color-text-secondary)' }}
            >
              <ArrowLeft className="w-5 h-5 mr-2" strokeWidth={1.5} />
              Back to Projects
            </motion.div>
          </Link>
        </div>

        {/* Title */}
        <motion.h1
          variants={fadeInUp}
          className={cn('text-4xl md:text-5xl lg:text-6xl font-display font-light mb-6')}
          style={{ color: 'var(--color-text-primary)' }}
        >
          {project.title}
        </motion.h1>

        {/* Icon meta row */}
        {/* <motion.div 
          variants={fadeIn} 
          className="mt-3 flex flex-wrap items-center gap-6 text-sm text-neutral-600"
        >
          <span className="inline-flex items-center">
            <Tag className="w-4 h-4 mr-2" />
            {project.category}
          </span>
          <span className="inline-flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            {project.year}
          </span>
        </motion.div> */}

        {/* Description */}
        <motion.p variants={fadeIn} className="text-xl mb-8 max-w-content" style={{ color: 'var(--color-text-secondary)' }}>
          {project.description}
        </motion.p>

        {/* Action Buttons */}
        {(project.projectUrl || project.behanceUrl || project.githubUrl) && (
          <motion.div variants={fadeIn} className="mt-6 flex flex-wrap gap-3">
            {project.projectUrl && project.projectUrl !== '#' && (
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium"
                style={{
                  backgroundColor: 'var(--color-accent)',
                  color: 'var(--color-bg)',
                  transitionDuration: 'var(--motion-fast)',
                }}
              >
                <ExternalLink className="w-4 h-4" strokeWidth={1.5} />
                Live Project
              </a>
            )}
            {/* {project.behanceUrl && (
              <a
                href={project.behanceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
              >
                View on Behance
              </a>
            )} */}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors font-medium"
                style={{
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-text-secondary)',
                  transitionDuration: 'var(--motion-fast)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-accent)'
                  e.currentTarget.style.color = 'var(--color-accent)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-border)'
                  e.currentTarget.style.color = 'var(--color-text-secondary)'
                }}
              >
                <Github className="w-4 h-4" strokeWidth={1.5} />
                GitHub
              </a>
            )}
          </motion.div>
        )}
      </motion.header>

      {/* Cover Image Showcase */}
      {project.layout !== 'minimal' && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 mb-16"
        >
          <div className="relative aspect-video rounded-card overflow-hidden border img-grain" style={{ borderColor: 'var(--color-border)' }}>
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.section>
      )}

      {/* Detailed meta grid */}
      <section className="mx-auto w-full max-w-content px-4 sm:px-6 lg:px-8">
        {project.layout !== 'minimal' && (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-8 grid gap-6 sm:grid-cols-3 max-w-4xl mx-auto mb-6"
          >
            <motion.div variants={fadeInUp}>
              <h3 className="text-lg font-semibold mb-4 font-mono text-sm tracking-wide uppercase" style={{ color: 'var(--color-text-muted)' }}>Category</h3>
              <p style={{ color: 'var(--color-text-secondary)' }}>{project.category}</p>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <h3 className="text-lg font-semibold mb-4 font-mono text-sm tracking-wide uppercase" style={{ color: 'var(--color-text-muted)' }}>Timeline</h3>
              <p style={{ color: 'var(--color-text-secondary)' }}>{project.year}</p>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <h3 className="text-lg font-semibold mb-4 font-mono text-sm tracking-wide uppercase" style={{ color: 'var(--color-text-muted)' }}>Technologies & Skills</h3>
              <ul className="mt-1 flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <li
                    key={t}
                    className="rounded-md px-3 py-1 text-sm font-mono"
                    style={{
                      backgroundColor: 'var(--color-surface-2)',
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}

        {/* Overview section - narrow content width */}
        {project.fullDescription && (
          <section className="mx-auto w-full max-w-prose py-16">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <h2 className="text-3xl font-display font-light mb-6" style={{ color: 'var(--color-text-primary)' }}>Overview</h2>
              <p className="leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                {project.fullDescription}
              </p>
            </motion.div>
          </section>
        )}

      </section>

      {/* Documentation media (Behance-style panels) */}
      {project.contentMedia?.length ? (
        <section className="mx-auto w-full max-w-content px-4 sm:px-6 lg:px-8 pb-20">
          <MediaRenderer items={project.contentMedia} />
        </section>
      ) : null}

      {/* Related projects strip */}
      <RelatedProjects projects={relatedProjects} groupLabel={groupLabel} />

      {/* Global footer */}
      <Footer />
    </>
  );
}
