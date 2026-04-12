'use client';

import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Clock,
  Circle,
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
}: {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
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
      onError={() => setErr(true)}
    />
  );
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const participants = [
  {
    id: 'P1',
    name: 'Renoir',
    background: 'Design student',
    relationship: 'Avoids research entirely',
    segment: 'Avoider',
    segmentColor: 'bg-[var(--color-surface-offset)] text-[var(--color-text-muted)]',
  },
  {
    id: 'P2',
    name: 'Maximus',
    background: 'Biotech scientist',
    relationship: 'Wants to stay current, constantly frustrated',
    segment: 'Professional Curator',
    segmentColor: 'bg-[var(--color-primary-highlight)] text-[var(--color-primary)]',
  },
  {
    id: 'P3',
    name: 'Adam',
    background: 'AI student',
    relationship: 'Reads daily, 90% relevance threshold',
    segment: 'Professional Curator',
    segmentColor: 'bg-[var(--color-primary-highlight)] text-[var(--color-primary)]',
  },
  {
    id: 'P4',
    name: 'Claire',
    background: 'Design student',
    relationship: "Active Feedly user, knows it's broken",
    segment: 'Professional Curator',
    segmentColor: 'bg-[var(--color-primary-highlight)] text-[var(--color-primary)]',
  },
  {
    id: 'P5',
    name: 'Carlos',
    background: 'PhD student',
    relationship: 'Daily reader, 3 newsletters, verifies with ChatGPT',
    segment: 'Professional Curator',
    segmentColor: 'bg-[var(--color-primary-highlight)] text-[var(--color-primary)]',
  },
];

const findings = [
  {
    num: '01',
    heading: "Feedly's problem is deeper than anyone talks about",
    body: 'Claire follows "Design" but gets policy and art advocacy not product design. Category-level filtering is broken. What\'s needed is content-level understanding of what a topic means to a specific person.',
    quote: '"Very black and white in terms of I like this, I don\'t like this."',
    participant: 'P4',
  },
  {
    num: '02',
    heading: 'Trust is more fragile than expected',
    body: 'Three of five users verify AI summaries against the original paper. Claire described manually searching PDFs to confirm quotes ChatGPT gave her. If users sense something is off, they stop trusting everything.',
    quote: '"I always go back and verify before I share anything from an AI summary."',
    participant: 'P5',
  },
  {
    num: '03',
    heading: 'Visuals were the one thing nobody asked about but everyone mentioned',
    body: 'Not a single interview question led here. Every participant independently brought up infographics, diagrams, and visual presentation as the thing that makes or breaks whether they actually read something.',
    quote: '"The way they present it, not with visual, words doesn\'t excite people."',
    participant: 'P2',
  },
  {
    num: '04',
    heading: 'Research and news have completely different mental models',
    body: 'Mixing them in the same feed is the wrong call. They require different sessions, different amounts of time, different frames of mind. Users who tried doing both in one tool ended up doing neither well.',
    quote: '"I use two completely separate apps. I never mix the two."',
    participant: 'P3',
  },
];

const algoLayers = [
  {
    num: '01',
    title: 'Paper Preprocessing',
    short: 'Extract once, serve all users.',
    detail:
      'Core claim, methodology, results, and domain tags are extracted from the paper one time. Every user gets a different experience from the same extraction. This is what makes the system scalable.',
    highlight: false,
  },
  {
    num: '02',
    title: 'User Model Construction',
    short: 'Behavioral quiz + implicit signals. Domain-specific.',
    detail:
      'A 9-question behavioral quiz (not "how expert are you". Dunning-Kruger research shows self-assessment is unreliable) combined with implicit signals: time on sections, which jargon terms are expanded, whether the original paper is opened. The model is domain-specific, expertise in HCI and beginner status in neuroscience are tracked independently.',
    highlight: false,
  },
  {
    num: '03',
    title: 'Relevance Matching',
    short: 'Semantic search + serendipity factor.',
    detail:
      "Semantic matching rather than keyword matching. A small serendipity factor surfaces content slightly outside the user's known interest graph, fixing the filter bubble problem Claire described, where Feedly only reinforces what you already follow.",
    highlight: false,
  },
  {
    num: '04',
    title: 'Card Generation',
    short: 'The core design contribution. Every prompt variable traces to user research.',
    detail:
      'This is where the Research-to-Prompt methodology lives. Every variable in the system prompt is directly traceable to a specific user interview finding or psychological theory. This is not prompt engineering but a systematic translation of qualitative research into generative instructions.',
    highlight: true,
  },
  {
    num: '05',
    title: 'UI Rendering',
    short: 'Stable structure. Variable content.',
    detail:
      "What changes per user: headline language, information density, number of progressive disclosure layers, presence of method diagrams. What stays consistent: card shape, navigation, interaction patterns. Consistency is a trust feature. Users shouldn't notice the system adapting.",
    highlight: false,
  },
  {
    num: '06',
    title: 'Feedback Collection',
    short: 'Session-end updates, not real-time morphing.',
    detail:
      "Explicit calibration questions after reading and implicit behavioral signals logged silently. Cards update at session end. Nobody should open the app and feel like it looks different from yesterday. That kind of instability destroys trust faster than a wrong calibration.",
    highlight: false,
  },
  {
    num: '07',
    title: 'Model Update',
    short: 'Transparency panel. Users can edit what the system thinks it knows.',
    detail:
      'Session-end reconciliation with a visible transparency panel: "Based on your reading, you seem intermediate in HCI and early in neuroscience." Users can see and correct the reasoning layer. Not a black box.',
    highlight: false,
  },
];

const r2pRows = [
  {
    quote: '"I want Nothing Phone news about software UX, not technical specs"',
    participant: 'P4',
    variable: 'content_angle',
    effect:
      'Card generated from specific angle within a topic, not just topic-level matching.',
  },
  {
    quote: '"Impact first, then recency"',
    participant: 'P5',
    variable: 'feed_priority',
    effect: 'Section ordering within the generated card follows stated reading priority.',
  },
  {
    quote: '"90% accuracy threshold or I won\'t use it"',
    participant: 'P3',
    variable: 'serendipity_factor',
    effect: 'Set low for high-precision users. Fewer suggestions, higher relevance.',
  },
  {
    quote: '"I always verify AI summaries against the original"',
    participant: 'P4 + P5',
    variable: 'trust_anchor',
    effect:
      'Q9 answer determines which information leads the card: credibility, implications, method, or findings.',
  },
];

const cardTypes = [
  {
    name: 'NarrativeCard',
    use: 'Behavioral, social science, qualitative papers',
    description: 'Leads with the human story. Method is secondary.',
  },
  {
    name: 'StatsCard',
    use: 'Quantitative-heavy papers',
    description: 'The number is the finding. Everything frames it.',
  },
  {
    name: 'ComparisonCard',
    use: 'A vs. B study designs',
    description: 'Structured contrast. Side-by-side when it matters.',
  },
];

const techStack = [
  'Next.js 14',
  'TypeScript',
  'Tailwind CSS',
  'Gemini 2.5 Flash',
  'Supabase',
  'OpenAlex API',
  'Vercel',
  'React',
];

const nextItems = [
  {
    status: 'done',
    label: 'Depth-matched routing validated',
    detail:
      '26-response survey. 100% of miscalibrated users preferred the recalibrated card.',
  },
  {
    status: 'done',
    label: 'Live generative pipeline',
    detail:
      'Real papers from OpenAlex, generated live by Gemini 2.5 Flash, validated before serving.',
  },
  {
    status: 'in-progress',
    label: 'Topic-level relevance matching',
    detail:
      'Semantic matching between user profile and paper corpus. Architecture already supports it.',
  },
  {
    status: 'planned',
    label: 'Second study: comprehension vs. suitability',
    detail:
      "Measuring whether LiquidRead's output produces better comprehension than a generic AI summary. The difference between 'this feels right' and 'this works.'",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function LiquidReadPage({
  project,
  relatedProjects,
  groupLabel,
}: LiquidReadPageProps) {
  const [expandedLayer, setExpandedLayer] = useState<string | null>(null);
  const [expandedFinding, setExpandedFinding] = useState<string | null>(null);

  return (
    <>
      <Head>
        <title>{project.title} – Edwin Meleth</title>
        <meta name="description" content={project.description} />
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
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="bg-[var(--color-bg)] pt-32 pb-24 relative overflow-hidden">
        {/* Subtle editorial glow: Amber emphasis + Teal hint */}
        <div 
          className="absolute inset-0 pointer-events-none" 
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 70%, oklch(from var(--color-primary) l c h / 0.10) 0%, transparent 65%), radial-gradient(ellipse 40% 30% at 50% 20%, oklch(from #1A7880 l c h / 0.07) 0%, transparent 55%)' }} 
        />

        <div className="container-custom relative z-10">
          {/* Back link */}
          <motion.div variants={fadeIn} initial="hidden" animate="visible">
            <Link
              href="/projects"
              className="inline-flex items-center text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors mb-10 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 group-hover:text-[var(--color-primary)] transition-transform" />
              Back to Projects
            </Link>
          </motion.div>

          {/* Badges */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-2 mb-8"
          >
            {['AI Product Design', "Master's Thesis", '2026'].map((badge) => (
              <motion.span
                key={badge}
                variants={fadeInUp}
                className="font-[var(--font-mono)] text-xs font-medium uppercase tracking-widest px-3 py-1 bg-[var(--color-primary-highlight)] text-[var(--color-primary)] rounded-full"
              >
                {badge}
              </motion.span>
            ))}
            <motion.span
              variants={fadeInUp}
              className="font-[var(--font-mono)] text-xs font-medium uppercase tracking-widest px-3 py-1 bg-[var(--color-teal-faint)] text-[var(--color-teal)] border border-[var(--color-teal)]/30 rounded-full"
            >
              In Progress
            </motion.span>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="font-[var(--font-display)] text-5xl md:text-7xl font-normal text-[var(--color-text)] leading-[1.05] tracking-tight mb-6"
          >
            Same paper.<br />
            <em className="text-[var(--color-primary)] italic">Different article.</em>
          </motion.h1>

          {/* Sub */}
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.15 }}
            className="font-[var(--font-body)] text-lg text-[var(--color-text-muted)] max-w-2xl mb-14 leading-relaxed"
          >
            An AI reader that generates a completely different interface for the
            same research paper based on who is reading it; depth, language,
            section order, and visual components all adapt to the reader's
            knowledge state.
          </motion.p>

          {/* Meta strip */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-[var(--color-divider)]"
          >
            {[
              { label: 'Role', value: 'AI Product Designer' },
              { label: 'Duration', value: 'Jan – Apr 2026' },
              { label: 'Methods', value: 'User Research, Survey, GenUI' },
              { label: 'Status', value: 'Thesis – Apr 2026' },
            ].map(({ label, value }) => (
              <motion.div key={label} variants={fadeInUp}>
                <p className="font-[var(--font-mono)] text-xs text-[var(--color-text-faint)] uppercase tracking-widest mb-1">
                  {label}
                </p>
                <p className="font-[var(--font-body)] text-sm text-[var(--color-text)] font-medium">{value}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

{/* ── THE PROBLEM ───────────────────────────────────────────────────── */}
      <section className="py-24 border-t border-[var(--color-divider)]">
        <div className="container-custom">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="mb-4"
          >
            <span className="font-[var(--font-mono)] text-xs font-semibold text-[var(--color-primary)] uppercase tracking-widest">
              01 / The Problem
            </span>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="font-[var(--font-display)] italic font-normal text-3xl md:text-4xl text-[var(--color-text)] mb-6 leading-tight"
          >
            The gap nobody is solving
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="text-[var(--color-text-muted)] max-w-2xl mb-16 leading-relaxed text-lg"
          >
            A PhD researcher and a first-year student can open the same paper
            right now. They'll see the exact same abstract. The exact same
            formatting. The exact same wall of methodology. No tool on the
            market changes this.
          </motion.p>

          {/* Two-reader comparison */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid md:grid-cols-2 gap-6 mb-16"
          >
            {[
              {
                reader: 'PhD Researcher',
                wants: 'Methodology, confidence intervals, limitations',
                gets: 'The same standard abstract as everyone else',
                bg: 'bg-[var(--color-surface-2)]',
                border: 'border-[var(--color-border)]',
              },
              {
                reader: 'First-year Student',
                wants: 'Plain language, context, why this matters',
                gets: 'The same standard abstract as everyone else',
                bg: 'bg-[var(--color-surface-2)]',
                border: 'border-[var(--color-border)]',
              },
            ].map(({ reader, wants, gets, bg, border }) => (
              <motion.div
                key={reader}
                variants={fadeInUp}
                className={`${bg} border ${border} rounded-2xl p-8`}
              >
                <p className="font-[var(--font-mono)] text-xs font-semibold text-[var(--color-text-faint)] uppercase tracking-widest mb-4">
                  {reader}
                </p>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-[var(--color-text-faint)] mb-1">Needs</p>
                    <p className="text-[var(--color-text-muted)] font-medium">{wants}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[var(--color-text-faint)] mb-1">Gets</p>
                    <p className="text-[var(--color-text-muted)]">{gets}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* What exists */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-2xl p-8 md:p-10"
          >
            <p className="font-[var(--font-mono)] text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-widest mb-6">
              What already exists
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  tool: 'Feedly',
                  does: 'Curates what you see',
                  gap: "Doesn't change how it's shown",
                },
                {
                  tool: 'ChatGPT',
                  does: 'Summarizes what you found',
                  gap: "Doesn't know who is asking",
                },
                {
                  tool: "Google's PAGEN",
                  does: 'Generates UI for the query',
                  gap: 'Nobody generates UI for the person',
                },
              ].map(({ tool, does, gap }) => (
                <div key={tool} className="space-y-2">
                  <p className="font-semibold text-[var(--color-text)]">{tool}</p>
                  <p className="text-sm text-[var(--color-text-muted)]">{does}</p>
                  <p className="text-sm text-[var(--color-primary)] font-medium">{gap}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── USER RESEARCH ─────────────────────────────────────────────────── */}
      <section className="py-24 border-t border-[var(--color-divider)]">
        <div className="container-custom">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="mb-4"
          >
            <span className="font-[var(--font-mono)] text-xs font-semibold text-[var(--color-primary)] uppercase tracking-widest">
              02 / User Research
            </span>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="font-[var(--font-display)] italic font-normal text-3xl md:text-4xl text-[var(--color-text)] mb-4 leading-tight"
          >
            5 interviews. Real readers.
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="text-[var(--color-text-muted)] max-w-xl mb-12 leading-relaxed"
          >
            Jan – Feb 2026. 30 to 45 minutes each. The goal was not to validate
            ideas, it was to find out what was actually broken.
          </motion.p>

          {/* Participant table */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid md:grid-cols-5 gap-4 mb-16"
          >
            {participants.map((p) => (
              <motion.div
                key={p.id}
                variants={fadeInUp}
                className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-5 flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-[var(--font-mono)] text-xs font-bold text-[var(--color-text-muted)] tracking-widest">
                    {p.id}
                  </span>
                  <span
                    className={`font-[var(--font-mono)] text-xs px-2 py-0.5 rounded-full border border-[var(--color-primary)]/20 font-medium bg-[var(--color-primary-highlight)] text-[var(--color-primary)]`}
                  >
                    {p.segment}
                  </span>
                </div>
                <p className="font-semibold text-[var(--color-text)]">{p.name}</p>
                <p className="text-xs text-[var(--color-text-muted)]">{p.background}</p>
                <p className="text-xs text-[var(--color-text-faint)] leading-relaxed">
                  {p.relationship}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Target segment callout */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="bg-[var(--color-primary)] text-[var(--color-text-inverse)] rounded-2xl p-8 md:p-10 mb-16"
          >
            <p className="font-[var(--font-mono)] text-xs font-semibold uppercase tracking-widest text-[var(--color-text-inverse)] mb-3">
              Target Segment
            </p>
            <h3 className="font-[var(--font-display)] italic font-normal text-2xl text-[var(--color-text-inverse)] mb-3">Professional Curators</h3>
            <p className="text-[var(--color-text-inverse)] max-w-2xl leading-relaxed">
              Already have a reading system. Already frustrated by its limits.
              High enough domain knowledge to recognize when something is wrong.
              High enough motivation to switch if something better exists. P2
              through P5 all fit here. P1 was ruled out, they won't use any
              tool until the experience is radically different.
            </p>
          </motion.div>

          {/* Findings */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="mb-4"
          >
            <p className="font-[var(--font-mono)] text-sm font-semibold text-[var(--color-text-faint)] uppercase tracking-widest">
              Key findings
            </p>
          </motion.div>

          <div className="space-y-4">
            {findings.map((f) => {
              const isOpen = expandedFinding === f.num;
              return (
                <motion.div
                  key={f.num}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl overflow-hidden"
                >
                  <button
                    className="w-full text-left px-8 py-6 flex items-start gap-6 group"
                    onClick={() =>
                      setExpandedFinding(isOpen ? null : f.num)
                    }
                  >
                    <span className="font-[var(--font-mono)] text-2xl font-bold text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors shrink-0 mt-0.5">
                      {f.num}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[var(--color-text)] group-hover:text-primary-700 transition-colors">
                        {f.heading}
                      </p>
                      {!isOpen && (
                        <p className="text-sm text-[var(--color-text-faint)] mt-1 truncate">
                          {f.participant} — {f.quote.slice(1, 60)}...
                        </p>
                      )}
                    </div>
                    <span className="text-[var(--color-text-faint)] shrink-0 mt-0.5">
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-8 pb-8 pl-20 space-y-4">
                          <p className="text-[var(--color-text-muted)] leading-relaxed">{f.body}</p>
                          <blockquote className="border-l-2 border-[var(--color-primary)] pl-4">
                            <p className="text-[var(--color-text-muted)] italic text-sm">{f.quote}</p>
                            <p className="text-xs text-[var(--color-text-faint)] mt-1">{f.participant}</p>
                          </blockquote>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── THE PIVOT ─────────────────────────────────────────────────────── */}
      <section className="py-24 border-t border-[var(--color-divider)]">
        <div className="container-custom">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="mb-4"
          >
            <span className="font-[var(--font-mono)] text-xs font-semibold text-[var(--color-primary)] uppercase tracking-widest">
              03 / The Pivot
            </span>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="font-[var(--font-display)] italic font-normal text-3xl md:text-4xl text-[var(--color-text)] mb-16 leading-tight"
          >
            "This is a normal app. What's the design innovation?"
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="space-y-6"
            >
              <div className="bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-2xl p-8">
                <p className="font-[var(--font-mono)] text-xs font-semibold text-[var(--color-text-faint)] uppercase tracking-widest mb-4">
                  The guide's challenge
                </p>
                <p className="text-[var(--color-text-muted)] leading-relaxed mb-4">
                  When I brought my research to my thesis guide, he was direct.
                  What I had was a better Feedly, a normal app with AI
                  summarization as the USP. Not a contribution to design
                  knowledge.
                </p>
                <p className="text-[var(--color-text-muted)] italic border-l-2 border-[var(--color-border)] pl-4">
                  "Think like a startup. What keeps this relevant in 5 to 10
                  years?"
                </p>
              </div>

              <div className="bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-2xl p-8">
                <p className="font-[var(--font-mono)] text-xs font-semibold text-[var(--color-text-faint)] uppercase tracking-widest mb-4">
                  The insight
                </p>
                <p className="text-[var(--color-text-muted)] leading-relaxed">
                  Every existing tool personalizes{' '}
                  <span className="font-semibold text-[var(--color-text)]">what</span> you
                  see. AI summarization will be commoditized, everyone will have
                  it. But personalizing{' '}
                  <span className="font-semibold text-[var(--color-text)]">how</span> it's
                  shown to you based on your actual knowledge state is a much
                  harder, much less explored problem. That's defensible long term.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="space-y-6"
            >
              {/* Before / After reframe */}
              <div>
                <p className="font-[var(--font-mono)] text-xs font-semibold text-[var(--color-text-faint)] uppercase tracking-widest mb-4">
                  The reframe
                </p>
                <div className="space-y-3">
                  {[
                    {
                      label: 'Before',
                      text: 'A research feed that surfaces what matters in your field',
                      muted: true,
                    },
                    {
                      label: 'After',
                      text: 'Epistemic Personalization Through Adaptive Generative UI',
                      muted: false,
                    },
                  ].map(({ label, text, muted }) => (
                    <div
                      key={label}
                      className={`flex gap-4 p-5 rounded-xl border ${muted
                        ? 'bg-[var(--color-surface-2)] border-[var(--color-border)] opacity-60'
                        : 'bg-[var(--color-primary)] border-[var(--color-primary)]'
                        }`}
                    >
                      <span
                        className={`text-xs font-bold uppercase tracking-widest shrink-0 mt-0.5 ${muted ? 'text-[var(--color-text-faint)]' : 'text-[var(--color-text-inverse)]'
                          }`}
                      >
                        {label}
                      </span>
                      <p
                        className={`font-medium leading-snug ${muted ? 'text-[var(--color-text-muted)]' : 'text-[var(--color-text-inverse)]'
                          }`}
                      >
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[var(--color-surface-offset)] border border-[var(--color-border)] rounded-2xl p-8 text-[var(--color-text)]">
                <p className="font-[var(--font-mono)] text-xs font-semibold text-[var(--color-text)] uppercase tracking-widest mb-3">
                  The core thesis
                </p>
                <p className="text-lg font-semibold leading-snug text-[var(--color-text)]">
                  Same paper. Different reading experience. Generated by AI based
                  on who's reading, not hardcoded.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── THE FRAMEWORK ─────────────────────────────────────────────────── */}
      <section className="py-24 border-t border-[var(--color-divider)]">
        <div className="container-custom">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="mb-4"
          >
            <span className="font-[var(--font-mono)] text-xs font-semibold text-[var(--color-primary)] uppercase tracking-widest">
              04 / The Framework
            </span>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="font-[var(--font-display)] italic font-normal text-3xl md:text-4xl text-[var(--color-text)] mb-4 leading-tight"
          >
            A 7-layer algorithm
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="text-[var(--color-text-faint)] max-w-xl mb-12 leading-relaxed"
          >
            Every layer connects back to something a user told me. None of this
            was designed in a vacuum.
          </motion.p>

          {/* Levels of personalisation image */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="mb-12 rounded-2xl overflow-hidden"
          >
            <SafeImage
              src="/assets/projects/liquid-read/docs/Levels_Of_Personalisation.webp"
              alt="Levels of Personalisation framework"
              width={1200}
              height={600}
              className="w-full object-contain rounded-2xl"
            />
          </motion.div>

          <div className="space-y-3">
            {algoLayers.map((layer) => {
              const isOpen = expandedLayer === layer.num;
              return (
                <motion.div
                  key={layer.num}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  className={`rounded-2xl border overflow-hidden transition-colors ${layer.highlight
                    ? 'border-[var(--color-primary)]/30 bg-[var(--color-primary-highlight)]'
                    : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-2)]'
                    }`}
                >
                  <button
                    className="w-full text-left px-8 py-6 flex items-start gap-6 group"
                    onClick={() =>
                      setExpandedLayer(isOpen ? null : layer.num)
                    }
                  >
                    <span
                      className={`text-2xl font-bold shrink-0 mt-0.5 ${layer.highlight ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-faint)]'
                        }`}
                    >
                      {layer.num}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <p
                          className={`font-semibold ${layer.highlight ? 'text-[var(--color-primary)]' : 'text-[var(--color-text)]'
                            }`}
                        >
                          {layer.title}
                        </p>
                        {layer.highlight && (
                          <span className="text-xs px-2 py-0.5 bg-[var(--color-primary)]/30 border border-[var(--color-primary)] rounded-full text-[var(--color-primary)] font-medium">
                            Core contribution
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-[var(--color-text-faint)]">{layer.short}</p>
                    </div>
                    <span className="text-[var(--color-text-muted)] shrink-0 mt-0.5">
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-8 pb-8 pl-20">
                          <p className="text-[var(--color-text)] leading-relaxed">
                            {layer.detail}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── RESEARCH TO PROMPT ───────────────────────────────────────────── */}
      <section className="py-24 border-t border-[var(--color-divider)]">
        <div className="container-custom">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="mb-4"
          >
            <span className="font-[var(--font-mono)] text-xs font-semibold text-[var(--color-primary)] uppercase tracking-widest">
              05 / Research to Prompt
            </span>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="font-[var(--font-display)] italic font-normal text-3xl md:text-4xl text-[var(--color-text)] mb-4 leading-tight"
          >
            Every variable traces to a user.
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="text-[var(--color-text-muted)] max-w-2xl mb-12 leading-relaxed"
          >
            This is not prompt engineering. It is a systematic methodology for
            translating qualitative user research into generative AI instructions.
            Any designer building an AI product could use it.
          </motion.p>

          {/* Information personalisation image */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="mb-12 rounded-2xl overflow-hidden border border-[var(--color-border)]"
          >
            <SafeImage
              src="/assets/projects/liquid-read/docs/Information_Personalisation.webp"
              alt="Information personalisation framework diagram"
              width={1200}
              height={600}
              className="w-full object-contain"
            />
          </motion.div>

          {/* R2P Table */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="overflow-x-auto"
          >
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--color-border)]">
                  <th className="font-[var(--font-mono)] text-left pb-4 pr-6 text-xs font-semibold text-[var(--color-text-faint)] uppercase tracking-widest w-2/5">
                    User quote
                  </th>
                  <th className="font-[var(--font-mono)] text-left pb-4 pr-6 text-xs font-semibold text-[var(--color-text-faint)] uppercase tracking-widest w-1/12">
                    From
                  </th>
                  <th className="font-[var(--font-mono)] text-left pb-4 pr-6 text-xs font-semibold text-[var(--color-text-faint)] uppercase tracking-widest w-1/6">
                    Prompt variable
                  </th>
                  <th className="font-[var(--font-mono)] text-left pb-4 text-xs font-semibold text-[var(--color-text-faint)] uppercase tracking-widest">
                    What it controls
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {r2pRows.map((row, i) => (
                  <motion.tr
                    key={i}
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-40px' }}
                    className="group hover:bg-[var(--color-surface-2)] transition-colors"
                  >
                    <td className="py-5 pr-6">
                      <p className="text-[var(--color-text-muted)] italic leading-relaxed">
                        {row.quote}
                      </p>
                    </td>
                    <td className="py-5 pr-6">
                      <span className="text-xs font-semibold text-[var(--color-primary)] bg-[var(--color-primary-highlight)] px-2 py-1 rounded-full">
                        {row.participant}
                      </span>
                    </td>
                    <td className="py-5 pr-6">
                      <code className="text-xs bg-[var(--color-surface-offset)] text-[var(--color-text-muted)] px-2 py-1 rounded font-[var(--font-mono)]">
                        {row.variable}
                      </code>
                    </td>
                    <td className="py-5 text-[var(--color-text-muted)] leading-relaxed">
                      {row.effect}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* ── VALIDATION ────────────────────────────────────────────────────── */}
      <section className="py-24 border-t border-[var(--color-divider)]">
        <div className="container-custom">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="mb-4"
          >
            <span className="font-[var(--font-mono)] text-xs font-semibold text-[var(--color-primary)] uppercase tracking-widest">
              06 / Validation
            </span>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="font-[var(--font-display)] italic font-normal text-3xl md:text-4xl text-[var(--color-text)] mb-4 leading-tight"
          >
            26 responses. One clear finding.
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="text-[var(--color-text-muted)] max-w-xl mb-14 leading-relaxed"
          >
            Before building the full generative pipeline, I validated the core
            mechanism: does routing users to depth-matched content actually
            improve perceived suitability?
          </motion.p>

          {/* Stats row */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          >
            {[
              { stat: '26', label: 'Survey responses', sub: 'Mar 13 – 21, 2026' },
              { stat: '3', label: 'Card depth levels', sub: 'A = accessible, B = intermediate, C = technical' },
              { stat: '100%', label: 'Preferred recalibrated card', sub: 'When routing was wrong, all users chose the corrected version' },
              { stat: '9', label: 'Behavioral quiz questions', sub: 'Not "how expert are you", what you actually do' },
            ].map(({ stat, label, sub }) => (
              <motion.div
                key={label}
                variants={fadeInUp}
                className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6"
              >
                <p className="font-[var(--font-display)] italic font-normal text-3xl md:text-4xl text-[var(--color-text)] mb-1">
                  {stat}
                </p>
                <p className="text-sm font-semibold text-[var(--color-text-muted)] mb-1">{label}</p>
                <p className="text-xs text-[var(--color-text-faint)] leading-relaxed">{sub}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Key finding: too basic vs too advanced */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-8 md:p-10 mb-8"
          >
            <p className="font-[var(--font-mono)] text-xs font-semibold text-[var(--color-text-faint)] uppercase tracking-widest mb-6">
              The finding that changed the recalibration prompt
            </p>
            <h3 className="font-[var(--font-display)] italic font-normal text-xl text-[var(--color-text)] mb-2">
              "Too basic" is a worse experience than "Too advanced."
            </h3>
            <p className="text-[var(--color-text-muted)] mb-10 max-w-lg">
              People would rather be slightly challenged than slightly talked
              down to. This shifted how the Gemini recalibration instruction was
              written.
            </p>

            <div className="space-y-6">
              {[
                {
                  label: 'Calibrated as "Too basic"',
                  score: 2.5,
                  max: 5,
                  color: 'bg-[var(--color-surface-dynamic)]',
                  textColor: 'text-[var(--color-text-muted)]',
                },
                {
                  label: 'Calibrated as "Too advanced"',
                  score: 3.71,
                  max: 5,
                  color: 'bg-[var(--color-primary)]',
                  textColor: 'text-[var(--color-primary)]',
                },
              ].map(({ label, score, max, color, textColor }) => (
                <div key={label}>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm text-[var(--color-text-muted)]">{label}</p>
                    <p className={`text-sm font-bold ${textColor}`}>
                      {score} / {max}
                    </p>
                  </div>
                  <div className="h-3 bg-[var(--color-surface-offset)] rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${color} rounded-full`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(score / max) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-[var(--color-text-faint)] mt-6">
              Average perceived suitability rating (1–5) when users were
              miscalibrated in each direction.
            </p>
          </motion.div>

          {/* Outlier: P3 */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-8"
          >
            <p className="font-[var(--font-mono)] text-xs font-semibold text-[var(--color-text-faint)] uppercase tracking-widest mb-4">
              The outlier that fixed the trust layer
            </p>
            <p className="text-[var(--color-text-muted)] leading-relaxed mb-4">
              P3 (Adam) rated "About right" on calibration but gave the card
              2/5 overall. The follow-up conversation revealed the issue wasn't
              depth, the statistics looked suspicious because there was no
              source attribution. He was right.
            </p>
            <p className="text-[var(--color-text-muted)] leading-relaxed border-l-2 border-[var(--color-primary)] pl-4 italic">
              "How do I know these numbers are from the actual paper and not
              hallucinated?"
            </p>
            <p className="text-sm text-[var(--color-text-faint)] mt-4">
              Fixed by adding a credibility note to every statistics block in
              the generated card.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── THE BUILD ─────────────────────────────────────────────────────── */}
      <section className="py-24 border-t border-[var(--color-divider)]">
        <div className="container-custom">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="mb-4"
          >
            <span className="font-[var(--font-mono)] text-xs font-semibold text-[var(--color-primary)] uppercase tracking-widest">
              07 / The Build
            </span>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="font-[var(--font-display)] italic font-normal text-3xl md:text-4xl text-[var(--color-text)] mb-4 leading-tight"
          >
            The live generative pipeline
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="text-[var(--color-text-muted)] max-w-xl mb-12 leading-relaxed"
          >
            Phase 2 moved from a pre-written quiz to a fully live generative
            system. Real papers. Real users. Real-time generation.
          </motion.p>

          {/* Tech stack */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="flex flex-wrap gap-2 mb-14"
          >
            {techStack.map((t) => (
              <motion.span
                key={t}
                variants={fadeInUp}
                className="px-4 py-2 bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-full text-sm font-medium text-[var(--color-text-muted)]"
              >
                {t}
              </motion.span>
            ))}
          </motion.div>

          {/* OpenAlex flow image */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="mb-14 rounded-2xl overflow-hidden border border-[var(--color-border)]"
          >
            <SafeImage
              src="/assets/projects/liquid-read/docs/OpenAlex_paper_fetch_logic.webp"
              alt="OpenAlex paper fetch logic flow"
              width={1200}
              height={600}
              className="w-full object-contain"
            />
          </motion.div>

          {/* Card types */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid md:grid-cols-3 gap-6 mb-14"
          >
            {cardTypes.map((c) => (
              <motion.div
                key={c.name}
                variants={fadeInUp}
                className="border border-[var(--color-border)] rounded-2xl p-6 hover:border-[var(--color-primary)] hover:shadow-md transition-all duration-300"
              >
                <code className="text-xs bg-[var(--color-primary-highlight)] text-[var(--color-primary)] px-2 py-1 rounded font-[var(--font-mono)] mb-4 inline-block">
                  {c.name}
                </code>
                <p className="text-xs text-[var(--color-text-faint)] mb-2">{c.use}</p>
                <p className="font-semibold text-[var(--color-text)]">{c.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* ExpandedView + logging */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid md:grid-cols-2 gap-6"
          >
            <motion.div
              variants={fadeInUp}
              className="bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-2xl p-8"
            >
              <p className="font-[var(--font-mono)] text-xs font-semibold text-[var(--color-text-faint)] uppercase tracking-widest mb-4">
                ExpandedView
              </p>
              <p className="text-[var(--color-text-muted)] leading-relaxed mb-4">
                Tapping a card opens a full reading experience (Google News
                pattern, slides up from below). A second Gemini call generates
                section ordering based on the user's trust anchor, time
                available, confusion response, and expertise level.
              </p>
              <p className="text-sm text-[var(--color-text-muted)]">
                7 custom visual components: StatCallout, ProportionStrip,
                DumbbellStrip, ComparisonTable, SlopeStrip, StepDiagram,
                RankStrip. Gemini specifies which to use via JSON. React renders
                it.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-2xl p-8"
            >
              <p className="font-[var(--font-mono)] text-xs font-semibold text-[var(--color-text-faint)] uppercase tracking-widest mb-4">
                Event logging
              </p>
              <p className="text-[var(--color-text-muted)] leading-relaxed mb-4">
                Every interaction logs to Supabase: which layers were read, time
                spent, whether the expanded view was opened, comprehension quiz
                scores.
              </p>
              <p className="text-sm text-[var(--color-text-muted)]">
                Three identity modes built in: anonymous UUID (current testing),
                session code (controlled study), real accounts (future product).
                Zero infrastructure changes needed to move between them.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── WHAT'S NEXT ───────────────────────────────────────────────────── */}
      <section className="py-24 border-t border-[var(--color-divider)]">
        <div className="container-custom">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="mb-4"
          >
            <span className="font-[var(--font-mono)] text-xs font-semibold text-[var(--color-primary)] uppercase tracking-widest">
              08 / What's Next
            </span>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="font-[var(--font-display)] italic font-normal text-3xl md:text-4xl text-[var(--color-text)] mb-12 leading-tight"
          >
            The project is still running.
          </motion.h2>

          <div className="space-y-4 mb-16">
            {nextItems.map((item) => (
              <motion.div
                key={item.label}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                className={`flex gap-5 p-6 rounded-2xl border ${item.status === 'done'
                  ? 'border-[var(--color-border)] bg-[var(--color-surface)]'
                  : item.status === 'in-progress'
                    ? 'border-[var(--color-primary)]/30 bg-[var(--color-primary-highlight)]'
                    : 'border-[var(--color-border)] bg-[var(--color-surface)]'
                  }`}
              >
                <div className="shrink-0 mt-0.5">
                  {item.status === 'done' && (
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                  )}
                  {item.status === 'in-progress' && (
                    <Clock className="w-5 h-5 text-[var(--color-primary)]" />
                  )}
                  {item.status === 'planned' && (
                    <Circle className="w-5 h-5 text-[var(--color-text-muted)]" />
                  )}
                </div>
                <div>
                  <p
                    className={`font-semibold mb-1 ${item.status === 'done'
                      ? 'text-[var(--color-text)]'
                      : item.status === 'in-progress'
                        ? 'text-[var(--color-primary)]'
                        : 'text-[var(--color-text-muted)]'
                      }`}
                  >
                    {item.label}
                  </p>
                  <p
                    className={`text-sm leading-relaxed ${item.status === 'done'
                      ? 'text-[var(--color-text-faint)]'
                      : item.status === 'in-progress'
                        ? 'text-[var(--color-text-faint)]'
                        : 'text-[var(--color-text-muted)]'
                      }`}
                  >
                    {item.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* The bigger claim */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="border border-[var(--color-primary)] bg-[var(--color-primary-highlight)] rounded-2xl p-10"
          >
            <p className="font-[var(--font-mono)] text-xs font-semibold text-[var(--color-primary)] uppercase tracking-widest mb-4">
              The contribution that outlasts the product
            </p>
            <p className="text-xl font-semibold text-[var(--color-text)] leading-relaxed max-w-3xl">
              The Research-to-Prompt methodology is documented and reproducible.
              Any designer building an AI product can use it to translate their
              user research into prompt variables systematically, not just for
              LiquidRead.
            </p>
          </motion.div>
        </div>
      </section>

      </div>

      {/* ── RELATED ───────────────────────────────────────────────────────── */}
      {relatedProjects.length > 0 && (
        <RelatedProjects
          projects={relatedProjects}
          groupLabel={groupLabel || 'Major Projects'}
        />
      )}

      <Footer />
    </>
  );
}
