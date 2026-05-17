'use client';

import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../../sections/Navbar';
import Footer from '../../sections/Footer';
import RelatedProjects from '../RelatedProjects';
import { type Project } from '../../../data/projects';
import { fadeInUp, fadeIn, staggerContainer } from '../../../lib/animations';

interface LiquidReadPageProps {
  project: Project;
  relatedProjects: Project[];
  groupLabel?: string;
}

const SafeImage = ({
  src,
  alt,
  className = '',
  width = 800,
  height = 500,
  style,
}: {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}) => {
  const [err, setErr] = useState(false);
  if (err)
    return (
      <div
        className={`bg-gray-100 flex items-center justify-center rounded-xl ${className}`}
        style={{ minHeight: 160 }}
      >
        <span className="text-gray-400 text-sm">{alt}</span>
      </div>
    );
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={style}
      onError={() => setErr(true)}
    />
  );
};

export default function LiquidReadPage({
  project,
  relatedProjects,
  groupLabel,
}: LiquidReadPageProps) {
  const [problemOpen, setProblemOpen] = useState(false);
  const [interviewOpen, setInterviewOpen] = useState(false);
  const [researchOpen, setResearchOpen] = useState(false);
  const [reframeOpen, setReframeOpen] = useState(false);
  const [builtOpen, setBuiltOpen] = useState(false);
  const [adaptiveOpen, setAdaptiveOpen] = useState(false);
  const [surveyDesignOpen, setSurveyDesignOpen] = useState(false);
  const [surveyResultOpen, setSurveyResultOpen] = useState(false);
  const [thinkAloudOpen, setThinkAloudOpen] = useState(false);
  const [learnedOpen, setLearnedOpen] = useState(false);
  const [nextStepsOpen, setNextStepsOpen] = useState(false);

  return (
    <>
      <Head>
        <title>{project.title} - Edwin Meleth</title>
        <meta name="description" content={project.description} />
        <link rel="canonical" href={`https://edwinm.vercel.app/projects/${project.id}`} />

        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://edwinm.vercel.app/projects/${project.id}`} />
        <meta property="og:title" content={`${project.title} - Edwin Meleth`} />
        <meta property="og:description" content={project.description} />
        <meta property="og:image" content={`https://edwinm.vercel.app${project.coverImage}`} />
        <meta property="og:site_name" content="Edwin Meleth Portfolio" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${project.title} - Edwin Meleth`} />
        <meta name="twitter:description" content={project.description} />
        <meta name="twitter:image" content={`https://edwinm.vercel.app${project.coverImage}`} />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet" />
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700&display=swap" rel="stylesheet" />
      </Head>

      <style dangerouslySetInnerHTML={{
        __html: `
          .lr-page {
            --color-bg:               #F4F0E8;
            --color-surface:          #F8F5EE;
            --color-surface-2:        #FDFAF5;
            --color-surface-offset:   #EAE5DA;
            --color-surface-dynamic:  #DED8CB;
            --color-divider:          #D0C9BA;
            --color-border:           #C4BCAA;
            --color-text:             #1C1A16;
            --color-text-muted:       #6A6258;
            --color-text-faint:       #ADA69A;
            --color-text-inverse:     #F4F0E8;
            --color-primary:          #9E5E1E;
            --color-primary-highlight:#F2E4D0;
            --color-teal:             #1A7880;
            --color-teal-faint:       #D0EBED;

            --font-display: 'Instrument Serif', Georgia, serif;
            --font-body:    'Satoshi', 'Inter', sans-serif;
            --font-mono:    'IBM Plex Mono', 'Courier New', monospace;
          }
          .lr-page {
            font-family: var(--font-body);
            background-color: var(--color-bg);
            color: var(--color-text);
          }
        `
      }} />

      <Navbar />

      <div className="lr-page">

        {/* ── SECTION 1: HERO ─────────────────────────────────────────────────── */}
        <section className="bg-[var(--color-bg)] pt-32 pb-24 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 70%, oklch(from var(--color-primary) l c h / 0.10) 0%, transparent 65%), radial-gradient(ellipse 40% 30% at 50% 20%, oklch(from #1A7880 l c h / 0.07) 0%, transparent 55%)' }} />
          <div className="container-custom relative z-10">
            <motion.div variants={fadeIn} initial="hidden" animate="visible">
              <Link href="/projects" className="inline-flex items-center text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors mb-10 group">
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 group-hover:text-[var(--color-primary)] transition-transform" />
                Back to Projects
              </Link>
            </motion.div>
            <motion.h1 variants={fadeInUp} initial="hidden" animate="visible" className="font-[var(--font-display)] text-5xl md:text-7xl font-normal text-[var(--color-text)] leading-[1.05] tracking-tight mb-4">
              LiquidRead
            </motion.h1>
            <motion.p variants={fadeInUp} initial="hidden" animate="visible" transition={{ delay: 0.1 }} className="font-[var(--font-body)] text-xl md:text-2xl text-[var(--color-text-muted)] mb-8">
              Adaptive generative reading for academic research.
            </motion.p>
            <motion.p variants={fadeInUp} initial="hidden" animate="visible" transition={{ delay: 0.15 }} className="font-[var(--font-body)] text-lg text-[var(--color-text)] max-w-2xl mb-4 leading-relaxed font-medium">
              I wanted a way to keep up with fast-moving research without having to decode full papers every time.
            </motion.p>
            <motion.p variants={fadeInUp} initial="hidden" animate="visible" transition={{ delay: 0.2 }} className="font-[var(--font-body)] text-lg text-[var(--color-text-muted)] max-w-2xl mb-16 leading-relaxed">
              LiquidRead explores whether the same paper can be presented differently depending on who is reading it.
            </motion.p>
            
            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-[var(--color-divider)] mb-16">
              {[
                { stat: '5', label: 'exploratory interviews' },
                { stat: '26', label: 'survey participants' },
                { stat: '65%', label: 'correctly matched on first routing' },
                { stat: '3', label: 'think-aloud sessions' },
              ].map(({ stat, label }) => (
                <motion.div key={label} variants={fadeInUp}>
                  <p className="font-[var(--font-display)] text-4xl text-[var(--color-primary)] mb-2">{stat}</p>
                  <p className="font-[var(--font-body)] text-sm text-[var(--color-text-muted)] leading-snug">{label}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="rounded-2xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)] flex justify-center max-w-4xl mx-auto">
              <SafeImage
                src="/assets/projects/liquid-read/docs/desktop-card.webp"
                alt="LiquidRead desktop card view"
                width={800}
                height={600}
                className="object-contain w-full"
                style={{ maxHeight: '600px' }}
              />
            </motion.div>
          </div>
        </section>

        {/* ── SECTION 2: THE PROBLEM ──────────────────────────────────────────── */}
        <section className="py-24 border-t border-[var(--color-divider)]">
          <div className="container-custom">
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="mb-8">
              <span className="font-[var(--font-mono)] text-xs font-semibold text-[var(--color-primary)] uppercase tracking-widest">
                01 / The problem
              </span>
            </motion.div>
            <motion.p variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="text-[var(--color-text)] text-xl max-w-3xl mb-4 leading-relaxed font-medium">
              Academic papers are written for specialists, but most tools still assume every reader needs the same kind of explanation.
            </motion.p>
            <motion.p variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="text-[var(--color-text-muted)] text-lg max-w-3xl mb-4 leading-relaxed">
              Existing tools help people search, summarize, or categorize research, but they do not adapt the reading experience to the reader's knowledge state.
            </motion.p>
            <motion.p variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="text-[var(--color-text-muted)] text-lg max-w-3xl mb-12 leading-relaxed">
              That leaves beginners excluded and advanced readers underserved.
            </motion.p>

            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl overflow-hidden">
              <button className="w-full text-left px-8 py-5 flex items-center justify-between group" onClick={() => setProblemOpen(!problemOpen)}>
                <p className="text-sm font-semibold text-[var(--color-text)]">Evidence from current tools</p>
                <span className="text-[var(--color-text-faint)] shrink-0 ml-6">
                  {problemOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </span>
              </button>
              <AnimatePresence>
                {problemOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                    <div className="px-8 pb-8 space-y-6 text-[var(--color-text-muted)]">
                      <div>
                        <p className="font-semibold text-[var(--color-text)] mb-1">Claire's example (Design student)</p>
                        <p className="text-sm">Categorization is too broad. She receives irrelevant articles under general labels, and the binary feedback mechanisms cannot distinguish between different reasons for disengaging.</p>
                      </div>
                      <div>
                        <p className="font-semibold text-[var(--color-text)] mb-1">Carlos's example (PhD student)</p>
                        <p className="text-sm">Tools do not adapt as expertise grows. After three years of reading daily, he still receives the same entry-level summaries as year one.</p>
                      </div>
                      <div>
                        <p className="font-semibold text-[var(--color-text)] mb-2 mt-4">Competitor Gap Analysis</p>
                        <ul className="space-y-3 list-disc list-inside text-sm">
                          <li><strong>Google Scholar:</strong> No depth adaptation. Same result for a first-year student and a domain expert.</li>
                          <li><strong>Feedly:</strong> Categorization is too coarse to distinguish specific interests.</li>
                          <li><strong>Explainpaper:</strong> Reactive, not proactive. Requires the reader to know what they do not understand.</li>
                          <li><strong>ChatGPT:</strong> No persistent model of the reader. Every session starts from zero.</li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* ── SECTION 3: WHY INTERVIEWS FIRST ─────────────────────────────────── */}
        <section className="py-24 border-t border-[var(--color-divider)]">
          <div className="container-custom">
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="mb-8">
              <span className="font-[var(--font-mono)] text-xs font-semibold text-[var(--color-primary)] uppercase tracking-widest">
                02 / Why interviews first
              </span>
            </motion.div>
            <motion.p variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="text-[var(--color-text)] text-xl max-w-3xl mb-4 leading-relaxed font-medium">
              I began with exploratory interviews to check whether this was a real user problem and not just a personal frustration.
            </motion.p>
            <motion.p variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="text-[var(--color-text-muted)] text-lg max-w-3xl mb-4 leading-relaxed">
              At this stage, the goal was not to test an interface, but to understand how people currently discover, read, and judge research.
            </motion.p>
            <motion.p variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="text-[var(--color-text-muted)] text-lg max-w-3xl mb-12 leading-relaxed">
              This helped establish where the real gap was before committing to a solution direction.
            </motion.p>

            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl overflow-hidden">
              <button className="w-full text-left px-8 py-5 flex items-center justify-between group" onClick={() => setInterviewOpen(!interviewOpen)}>
                <p className="text-sm font-semibold text-[var(--color-text)]">Interview setup</p>
                <span className="text-[var(--color-text-faint)] shrink-0 ml-6">
                  {interviewOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </span>
              </button>
              <AnimatePresence>
                {interviewOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                    <div className="px-8 pb-8 text-[var(--color-text-muted)] text-sm">
                      <ul className="space-y-3 list-disc list-inside">
                        <li>5 semi-structured interviews.</li>
                        <li>45 to 60 minutes each.</li>
                        <li>Themes: current habits, frustrations, ideal experience.</li>
                        <li>One non-target user included deliberately.</li>
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* ── SECTION 4: WHAT RESEARCH CHANGED ────────────────────────────────── */}
        <section className="py-24 border-t border-[var(--color-divider)]">
          <div className="container-custom">
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="mb-8">
              <span className="font-[var(--font-mono)] text-xs font-semibold text-[var(--color-primary)] uppercase tracking-widest">
                03 / What research changed
              </span>
            </motion.div>
            <motion.p variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="text-[var(--color-text)] text-xl max-w-3xl mb-4 leading-relaxed font-medium">
              The interviews showed that the biggest gap was not access to research, but lack of personalisation in how it was presented.
            </motion.p>
            <motion.p variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="text-[var(--color-text-muted)] text-lg max-w-3xl mb-4 leading-relaxed">
              Visual explanation also came up repeatedly, with participants asking for diagrams and visual aids as part of the reading experience.
            </motion.p>
            <motion.p variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="text-[var(--color-text-muted)] text-lg max-w-3xl mb-12 leading-relaxed">
              This shifted the concept from a better summary feed to a system that adapts depth, framing, and format to the reader.
            </motion.p>

            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <motion.div variants={fadeInUp} className="bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-2xl p-6 text-center">
                <p className="text-[var(--color-text)] font-semibold text-sm uppercase tracking-wider">Personalisation was too shallow</p>
              </motion.div>
              <motion.div variants={fadeInUp} className="bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-2xl p-6 text-center">
                <p className="text-[var(--color-text)] font-semibold text-sm uppercase tracking-wider">Visual explanation was missing</p>
              </motion.div>
              <motion.div variants={fadeInUp} className="bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-2xl p-6 text-center">
                <p className="text-[var(--color-text)] font-semibold text-sm uppercase tracking-wider">Different users needed different depths</p>
              </motion.div>
            </motion.div>

            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl overflow-hidden">
              <button className="w-full text-left px-8 py-5 flex items-center justify-between group" onClick={() => setResearchOpen(!researchOpen)}>
                <p className="text-sm font-semibold text-[var(--color-text)]">Supporting interview findings</p>
                <span className="text-[var(--color-text-faint)] shrink-0 ml-6">
                  {researchOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </span>
              </button>
              <AnimatePresence>
                {researchOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                    <div className="px-8 pb-8 text-[var(--color-text-muted)] text-sm">
                      <ul className="space-y-3 list-disc list-inside">
                        <li>Visuals were raised unprompted by 4 of 5 participants.</li>
                        <li>Three user patterns emerged: regular readers, triage readers, and people who avoid research because it feels inaccessible.</li>
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* ── SECTION 5: THE REFRAME ──────────────────────────────────────────── */}
        <section className="py-24 border-t border-[var(--color-divider)]">
          <div className="container-custom">
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="mb-8">
              <span className="font-[var(--font-mono)] text-xs font-semibold text-[var(--color-primary)] uppercase tracking-widest">
                04 / The reframe
              </span>
            </motion.div>
            <motion.p variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="text-[var(--color-text)] text-xl max-w-3xl mb-4 leading-relaxed font-medium">
              The initial idea was a personalised research feed with summarisation, but that direction was too easy to commoditise.
            </motion.p>
            <motion.p variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="text-[var(--color-text-muted)] text-lg max-w-3xl mb-4 leading-relaxed">
              The stronger opportunity was not personalising what people see, but personalising how the same paper is shown to them.
            </motion.p>
            <motion.p variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="text-[var(--color-text-muted)] text-lg max-w-3xl mb-12 leading-relaxed">
              That became the core thesis behind LiquidRead.
            </motion.p>

            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl overflow-hidden">
              <button className="w-full text-left px-8 py-5 flex items-center justify-between group" onClick={() => setReframeOpen(!reframeOpen)}>
                <p className="text-sm font-semibold text-[var(--color-text)]">Why summarisation was not enough</p>
                <span className="text-[var(--color-text-faint)] shrink-0 ml-6">
                  {reframeOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </span>
              </button>
              <AnimatePresence>
                {reframeOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                    <div className="px-8 pb-8 text-[var(--color-text-muted)] text-sm">
                      <ul className="space-y-3 list-disc list-inside">
                        <li>Summarisation alone was becoming a default feature across tools.</li>
                        <li>None of the reviewed tools generated differently for different readers.</li>
                        <li>The project shifted from curation-layer personalisation to presentation-layer personalisation.</li>
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* ── SECTION 6: WHAT I BUILT ─────────────────────────────────────────── */}
        <section className="py-24 border-t border-[var(--color-divider)]">
          <div className="container-custom">
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="mb-8">
              <span className="font-[var(--font-mono)] text-xs font-semibold text-[var(--color-primary)] uppercase tracking-widest">
                05 / What I built
              </span>
            </motion.div>
            <motion.p variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="text-[var(--color-text)] text-xl max-w-3xl mb-4 leading-relaxed font-medium">
              LiquidRead is a web app that fetches real open-access papers and generates a reading experience based on a short calibration quiz.
            </motion.p>
            <motion.p variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="text-[var(--color-text-muted)] text-lg max-w-3xl mb-4 leading-relaxed">
              The same paper can be presented at different depths, with different framing and visual support, depending on the reader.
            </motion.p>
            <motion.p variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="text-[var(--color-text-muted)] text-lg max-w-3xl mb-12 leading-relaxed">
              The prototype combined paper retrieval, generative content, adaptive visual structure, and feedback capture in one flow.
            </motion.p>

            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="flex flex-col md:flex-row items-center gap-4 mb-12">
              <motion.div variants={fadeInUp} className="bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-2xl p-6 w-full text-center text-sm font-semibold text-[var(--color-text)] tracking-wide">
                Quiz and profile
              </motion.div>
              <motion.div variants={fadeInUp} className="text-[var(--color-border)] rotate-90 md:rotate-0">
                →
              </motion.div>
              <motion.div variants={fadeInUp} className="bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-2xl p-6 w-full text-center text-sm font-semibold text-[var(--color-text)] tracking-wide">
                Generate card and expanded view
              </motion.div>
              <motion.div variants={fadeInUp} className="text-[var(--color-border)] rotate-90 md:rotate-0">
                →
              </motion.div>
              <motion.div variants={fadeInUp} className="bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-2xl p-6 w-full text-center text-sm font-semibold text-[var(--color-text)] tracking-wide">
                Capture feedback and behaviour
              </motion.div>
            </motion.div>

            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="mb-12 flex flex-col md:flex-row gap-6 items-start max-w-6xl mx-auto">
              <div className="flex-grow rounded-2xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)] flex justify-center w-full md:w-3/4">
                <SafeImage
                  src="/assets/projects/liquid-read/docs/expanded-view-desktop.webp"
                  alt="LiquidRead expanded reading view"
                  width={1000}
                  height={700}
                  className="object-contain w-full"
                  style={{ maxHeight: '700px' }}
                />
              </div>
              <div className="shrink-0 rounded-2xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)] flex justify-center mx-auto w-[280px]">
                <SafeImage
                  src="/assets/projects/liquid-read/docs/mobile-card.webp"
                  alt="LiquidRead mobile responsive view"
                  width={280}
                  height={550}
                  className="object-contain w-full"
                  style={{ maxHeight: '600px' }}
                />
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl overflow-hidden">
              <button className="w-full text-left px-8 py-5 flex items-center justify-between group" onClick={() => setBuiltOpen(!builtOpen)}>
                <p className="text-sm font-semibold text-[var(--color-text)]">System details</p>
                <span className="text-[var(--color-text-faint)] shrink-0 ml-6">
                  {builtOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </span>
              </button>
              <AnimatePresence>
                {builtOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                    <div className="px-8 pb-8 text-[var(--color-text-muted)] text-sm">
                      <ul className="space-y-3 list-disc list-inside">
                        <li>OpenAlex for paper retrieval.</li>
                        <li>Gemini for card generation and expanded view generation.</li>
                        <li>Supabase for event logging.</li>
                        <li>Progressive disclosure and generated visual components in expanded view.</li>
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* ── SECTION 7: HOW THE ADAPTIVE SYSTEM WORKED ───────────────────────── */}
        <section className="py-24 border-t border-[var(--color-divider)]">
          <div className="container-custom">
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="mb-8">
              <span className="font-[var(--font-mono)] text-xs font-semibold text-[var(--color-primary)] uppercase tracking-widest">
                06 / How the adaptive system worked
              </span>
            </motion.div>
            <motion.p variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="text-[var(--color-text)] text-xl max-w-3xl mb-4 leading-relaxed font-medium">
              A short calibration quiz estimated the reader's knowledge state and routed them to one of three reading depths.
            </motion.p>
            <motion.p variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="text-[var(--color-text-muted)] text-lg max-w-3xl mb-4 leading-relaxed">
              The generated output changed not just in difficulty, but also in framing, section order, and visual emphasis.
            </motion.p>
            <motion.p variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="text-[var(--color-text-muted)] text-lg max-w-3xl mb-12 leading-relaxed">
              The system recommended a depth rather than enforcing it, so users could still override the result.
            </motion.p>

            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="mb-12 rounded-2xl overflow-hidden border border-[var(--color-border)]">
              <SafeImage
                src="/assets/projects/liquid-read/docs/Levels_Of_Personalisation.webp"
                alt="Three levels of personalisation diagram"
                width={1200}
                height={500}
                className="w-full object-contain"
              />
            </motion.div>

            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl overflow-hidden">
              <button className="w-full text-left px-8 py-5 flex items-center justify-between group" onClick={() => setAdaptiveOpen(!adaptiveOpen)}>
                <p className="text-sm font-semibold text-[var(--color-text)]">Adaptive logic</p>
                <span className="text-[var(--color-text-faint)] shrink-0 ml-6">
                  {adaptiveOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </span>
              </button>
              <AnimatePresence>
                {adaptiveOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                    <div className="px-8 pb-8 text-[var(--color-text-muted)] text-sm">
                      <ul className="space-y-3 list-disc list-inside">
                        <li>Three reading depths: Card A, Card B, Card C.</li>
                        <li>Nine-question quiz and normalized score.</li>
                        <li>Seven visual component types.</li>
                        <li>Expanded view order could change based on variables like trust anchor, time available, and score.</li>
                        <li>Research-to-Prompt translated user research into prompt behaviour.</li>
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* ── SECTION 8: WHY SURVEY NEXT ──────────────────────────────────────── */}
        <section className="py-24 border-t border-[var(--color-divider)]">
          <div className="container-custom">
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="mb-8">
              <span className="font-[var(--font-mono)] text-xs font-semibold text-[var(--color-primary)] uppercase tracking-widest">
                07 / Why survey next
              </span>
            </motion.div>
            <motion.p variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="text-[var(--color-text)] text-xl max-w-3xl mb-4 leading-relaxed font-medium">
              Before building the full live system, I used a survey to test whether the routing idea worked at all.
            </motion.p>
            <motion.p variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="text-[var(--color-text-muted)] text-lg max-w-3xl mb-4 leading-relaxed">
              This was the fastest way to validate whether people preferred a depth-matched explanation before investing in a fully dynamic prototype.
            </motion.p>
            <motion.p variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="text-[var(--color-text-muted)] text-lg max-w-3xl mb-12 leading-relaxed">
              26 participants completed the survey.
            </motion.p>

            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <motion.div variants={fadeInUp} className="bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-2xl p-6 text-center">
                <p className="font-[var(--font-display)] text-5xl text-[var(--color-primary)] mb-3">65%</p>
                <p className="text-[var(--color-text-muted)] font-medium text-sm">correctly routed on first assignment.</p>
              </motion.div>
              <motion.div variants={fadeInUp} className="bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-2xl p-6 text-center">
                <p className="font-[var(--font-display)] text-5xl text-[var(--color-primary)] mb-3">100%</p>
                <p className="text-[var(--color-text-muted)] font-medium text-sm">preferred the corrected alternate when misrouted.</p>
              </motion.div>
              <motion.div variants={fadeInUp} className="bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-2xl p-6 flex items-center justify-center text-center">
                <p className="text-[var(--color-text-muted)] font-medium text-sm">Too-basic was worse than too-advanced.</p>
              </motion.div>
            </motion.div>

            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl overflow-hidden">
              <button className="w-full text-left px-8 py-5 flex items-center justify-between group" onClick={() => setSurveyDesignOpen(!surveyDesignOpen)}>
                <p className="text-sm font-semibold text-[var(--color-text)]">Survey design and limitations</p>
                <span className="text-[var(--color-text-faint)] shrink-0 ml-6">
                  {surveyDesignOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </span>
              </button>
              <AnimatePresence>
                {surveyDesignOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                    <div className="px-8 pb-8 text-[var(--color-text-muted)] text-sm">
                      <ul className="space-y-3 list-disc list-inside mb-6">
                        <li>Field-relevant papers were manually assigned.</li>
                        <li>Card A/B/C versions were manually prepared for the survey.</li>
                        <li>Card C was not reached because the scoring formula incorrectly used 18 instead of 16 as the max raw score.</li>
                        <li>The deployed system later recalibrated the Card C threshold to 6.5.</li>
                      </ul>
                      <div className="rounded-xl overflow-hidden border border-[var(--color-border)] bg-white max-w-2xl">
                        <SafeImage
                          src="/assets/projects/liquid-read/docs/Survey_userflow_logic.webp"
                          alt="Survey logic flowchart"
                          width={800}
                          height={400}
                          className="w-full object-contain"
                          style={{ maxHeight: '400px' }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* ── SECTION 9: WHAT THE SURVEY SHOWED ───────────────────────────────── */}
        <section className="py-24 border-t border-[var(--color-divider)]">
          <div className="container-custom">
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="mb-8">
              <span className="font-[var(--font-mono)] text-xs font-semibold text-[var(--color-primary)] uppercase tracking-widest">
                08 / What the survey showed
              </span>
            </motion.div>
            <motion.p variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="text-[var(--color-text)] text-xl max-w-3xl mb-4 leading-relaxed font-medium">
              The survey gave directional evidence that readers preferred explanations closer to their actual level.
            </motion.p>
            <motion.p variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="text-[var(--color-text-muted)] text-lg max-w-3xl mb-4 leading-relaxed">
              It also revealed an important asymmetry: showing something too basic created a worse experience than showing something slightly too advanced.
            </motion.p>
            <motion.p variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="text-[var(--color-text-muted)] text-lg max-w-3xl mb-12 leading-relaxed">
              That suggested the system should bias upward when calibration is uncertain.
            </motion.p>

            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl overflow-hidden">
              <button className="w-full text-left px-8 py-5 flex items-center justify-between group" onClick={() => setSurveyResultOpen(!surveyResultOpen)}>
                <p className="text-sm font-semibold text-[var(--color-text)]">Why too-basic was worse</p>
                <span className="text-[var(--color-text-faint)] shrink-0 ml-6">
                  {surveyResultOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </span>
              </button>
              <AnimatePresence>
                {surveyResultOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                    <div className="px-8 pb-8 text-[var(--color-text-muted)] text-sm">
                      <ul className="space-y-3 list-disc list-inside">
                        <li>Too-basic cards produced lower suitability ratings than too-advanced ones.</li>
                        <li>Too-advanced still leaves partial value to extract; too-basic makes the system feel fundamentally wrong.</li>
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* ── SECTION 10: WHAT BROKE IN TESTING ───────────────────────────────── */}
        <section className="py-24 border-t border-[var(--color-divider)]">
          <div className="container-custom">
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="mb-8">
              <span className="font-[var(--font-mono)] text-xs font-semibold text-[var(--color-primary)] uppercase tracking-widest">
                09 / What broke in testing
              </span>
            </motion.div>
            <motion.p variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="text-[var(--color-text)] text-xl max-w-3xl mb-4 leading-relaxed font-medium">
              Think-aloud testing with three participants showed that paper relevance had to work before depth personalisation could be judged properly.
            </motion.p>
            <motion.p variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="text-[var(--color-text-muted)] text-lg max-w-3xl mb-4 leading-relaxed">
              In practice, the system was sometimes personalising the wrong paper well, which made user feedback hard to interpret.
            </motion.p>
            <motion.p variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="text-[var(--color-text-muted)] text-lg max-w-3xl mb-12 leading-relaxed">
              This changed the next design priority from better calibration to better relevance matching.
            </motion.p>

            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <motion.div variants={fadeInUp} className="bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-2xl p-6 text-center">
                <p className="text-[var(--color-text-muted)] font-semibold text-sm">Paper matching was broken.</p>
              </motion.div>
              <motion.div variants={fadeInUp} className="bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-2xl p-6 text-center">
                <p className="text-[var(--color-text-muted)] font-semibold text-sm">The quiz felt like a form, not a product.</p>
              </motion.div>
              <motion.div variants={fadeInUp} className="bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-2xl p-6 text-center">
                <p className="text-[var(--color-text-muted)] font-semibold text-sm">Source and authors were not visible enough to build trust.</p>
              </motion.div>
            </motion.div>

            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl overflow-hidden">
              <button className="w-full text-left px-8 py-5 flex items-center justify-between group" onClick={() => setThinkAloudOpen(!thinkAloudOpen)}>
                <p className="text-sm font-semibold text-[var(--color-text)]">Full think-aloud findings</p>
                <span className="text-[var(--color-text-faint)] shrink-0 ml-6">
                  {thinkAloudOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </span>
              </button>
              <AnimatePresence>
                {thinkAloudOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                    <div className="px-8 pb-8 text-[var(--color-text-muted)] text-sm">
                      <ul className="space-y-3 list-disc list-inside">
                        <li>Missing significance explanation</li>
                        <li>Typeface skim issue</li>
                        <li>Persona panel confusion</li>
                        <li>Recalibration signal ambiguity</li>
                        <li>Comprehension quiz lacked visible purpose</li>
                        <li>Transparency about generated text was weak</li>
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* ── SECTION 11: WHAT I LEARNED ──────────────────────────────────────── */}
        <section className="py-24 border-t border-[var(--color-divider)]">
          <div className="container-custom">
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="mb-8">
              <span className="font-[var(--font-mono)] text-xs font-semibold text-[var(--color-primary)] uppercase tracking-widest">
                10 / What I learned
              </span>
            </motion.div>
            <motion.p variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="text-[var(--color-text)] text-xl max-w-3xl mb-4 leading-relaxed font-medium">
              The main lesson was that generative personalisation is not just a model problem, but a design problem about signals, trust, and feedback.
            </motion.p>
            <motion.p variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="text-[var(--color-text-muted)] text-lg max-w-3xl mb-4 leading-relaxed">
              A system cannot adapt well if it does not first understand what the user cares about and what kind of explanation they actually need.
            </motion.p>
            <motion.p variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="text-[var(--color-text-muted)] text-lg max-w-3xl mb-12 leading-relaxed">
              The most transferable part of the project was translating research findings into prompt behaviour in a structured way.
            </motion.p>

            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl overflow-hidden">
              <button className="w-full text-left px-8 py-5 flex items-center justify-between group" onClick={() => setLearnedOpen(!learnedOpen)}>
                <p className="text-sm font-semibold text-[var(--color-text)]">Transferable method</p>
                <span className="text-[var(--color-text-faint)] shrink-0 ml-6">
                  {learnedOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </span>
              </button>
              <AnimatePresence>
                {learnedOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                    <div className="px-8 pb-8 text-[var(--color-text-muted)] text-sm">
                      <ul className="space-y-3 list-disc list-inside">
                        <li>Research-to-Prompt maps interview findings to prompt variables and output rules.</li>
                        <li>The prompt is treated as a design artifact, not just a technical instruction.</li>
                        <li>This approach can extend beyond reading products to other adaptive AI systems.</li>
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* ── SECTION 12: NEXT STEPS ──────────────────────────────────────────── */}
        <section className="py-24 border-t border-[var(--color-divider)]">
          <div className="container-custom">
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="mb-8">
              <span className="font-[var(--font-mono)] text-xs font-semibold text-[var(--color-primary)] uppercase tracking-widest">
                11 / Next steps
              </span>
            </motion.div>
            <motion.p variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="text-[var(--color-text)] text-xl max-w-3xl mb-4 leading-relaxed font-medium">
              The next version should add a relevance gate before depth routing so the system first checks whether the paper is actually worth showing.
            </motion.p>
            <motion.p variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="text-[var(--color-text-muted)] text-lg max-w-3xl mb-4 leading-relaxed">
              It should also separate topic mismatch from depth mismatch in the feedback loop, so recalibration becomes meaningful.
            </motion.p>
            <motion.p variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="text-[var(--color-text-muted)] text-lg max-w-3xl mb-12 leading-relaxed">
              Over time, behavioural signals could support better session-to-session adaptation instead of relying only on the initial quiz.
            </motion.p>

            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl overflow-hidden mb-12">
              <button className="w-full text-left px-8 py-5 flex items-center justify-between group" onClick={() => setNextStepsOpen(!nextStepsOpen)}>
                <p className="text-sm font-semibold text-[var(--color-text)]">Longer-term roadmap</p>
                <span className="text-[var(--color-text-faint)] shrink-0 ml-6">
                  {nextStepsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </span>
              </button>
              <AnimatePresence>
                {nextStepsOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                    <div className="px-8 pb-8 text-[var(--color-text-muted)] text-sm">
                      <ul className="space-y-3 list-disc list-inside">
                        <li>Improve relevance matching using research interest as a primary retrieval driver.</li>
                        <li>Refine calibration using interaction signals over multiple sessions.</li>
                        <li>Explore broader adaptive systems beyond a single reading session.</li>
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

      </div>

      <RelatedProjects
        projects={relatedProjects}
        groupLabel={groupLabel || "More Projects"}
      />
      <Footer />
    </>
  );
}
