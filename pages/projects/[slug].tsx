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
import { projectsData } from '../../data/projects';
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

export const getStaticProps: GetStaticProps<{
  project: (typeof projectsData.majorProjects)[number];
}> = async (ctx) => {
  const slug = ctx.params?.slug as string;
  const all = [
    ...projectsData.majorProjects,
    ...projectsData.otherWorks,
    ...projectsData.labWorks,
  ];
  const project = all.find((p) => p.id === slug);
  if (!project) return { notFound: true };

  return { props: { project: removeUndefinedDeep(project) } };
};

export default function ProjectPage({
  project,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      {/* Sticky global navbar */}
      <Navbar />

      <Head>
        <title>{project.title} – Edwin Meleth</title>
        <meta name="description" content={project.description} />
      </Head>

      {/* Header section (without cover image) */}
      <motion.header
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 pb-8"
      >
        {/* Back to Projects */}
        <div className="max-w-7xl mx-auto py-8">
          <Link href="/projects">
            <motion.div
              className="inline-flex items-center text-gray-600 hover:text-primary-600 transition-colors cursor-pointer"
              whileHover={{ x: -5 }}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Projects
            </motion.div>
          </Link>
        </div>

        {/* Title */}
        <motion.h1
          variants={fadeInUp}
          className={cn('text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6')}
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
        <motion.p variants={fadeIn} className="text-xl text-gray-600 mb-8 max-w-4xl">
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
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
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
                className="inline-flex items-center gap-2 px-4 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            )}
          </motion.div>
        )}
      </motion.header>

      {/* Cover Image Showcase - Old Style (Dramatic, Cinematic) */}
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

      {/* Detailed meta grid (wide container) */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-8 grid gap-6 sm:grid-cols-3"
        >
          <motion.div variants={fadeInUp}>
            <h3 className="text-lg font-semibold mb-4">Category</h3>
            <p className="text-gray-600">{project.category}</p>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <h3 className="text-lg font-semibold mb-4">Timeline</h3>
            <p className="text-gray-600">{project.year}</p>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <h3 className="text-lg font-semibold mb-4">Technologies</h3>
            <ul className="mt-1 flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <li key={t} className="rounded-md bg-neutral-100 px-3 py-1 text-sm">
                  {t}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Overview section - narrow content width */}
        {project.fullDescription && (
          <section className="mx-auto w-full max-w-3xl py-16">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <h2 className="text-3xl font-display font-bold mb-6">Overview</h2>
              <p className="text-gray-600 leading-relaxed">
                {project.fullDescription}
              </p>
            </motion.div>
          </section>
        )}

        {/* Documentation media (Behance-style panels) */}
        {project.contentMedia?.length ? (
          <section className="pb-20">
            <MediaRenderer items={project.contentMedia} />
          </section>
        ) : null}
      </section>

      {/* Global footer */}
      <Footer />
    </>
  );
}
