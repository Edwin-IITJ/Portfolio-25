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

const resultsStrip = [
  {
    stat: '65%',
    label: 'correctly routed to a depth-matched card on first assignment',
  },
  {
    stat: '26',
    label: 'survey participants across disciplines',
  },
  {
    stat: '100%',
    label: 'of miscalibrated participants preferred the corrected card',
  },
  {
    stat: '9',
    label: 'think-aloud findings, all mapped to active design decisions',
  },
];

const auditRows = [
  {
    tool: 'Google Scholar',
    does: 'Identifies relevant articles through keyword recognition',
    gap: 'No depth adaptation. Same result for a first-year student and a domain expert.',
  },
  {
    tool: 'Semantic Scholar',
    does: 'Surfaces related papers and citation networks',
    gap: 'Adapts to topic, not to reader knowledge state.',
  },
  {
    tool: 'Feedly',
    does: 'Compiles articles into categories',
    gap: 'Categorisation is too coarse. Cannot distinguish interest within a category.',
  },
  {
    tool: 'Elicit',
    does: 'Extracts structured data from research papers',
    gap: 'Built for researchers who already know what they are looking for.',
  },
  {
    tool: 'Consensus',
    does: 'Synthesises claims across multiple papers',
    gap: 'Treats every reader as capable of evaluating synthesised academic claims.',
  },
  {
    tool: 'Explainpaper',
    does: 'Explains highlighted text on demand',
    gap: 'Reactive, not proactive. Requires the reader to know what they do not understand.',
  },
  {
    tool: 'ChatGPT',
    does: 'Summarises on request',
    gap: 'No persistent model of the reader. Every session starts from zero.',
  },
];

const participants = [
  {
    name: 'Adam',
    background: 'AI student',
    relationship: 'Daily reader, precision-driven, wants density',
  },
  {
    name: 'Maximus',
    background: 'Biotech scientist',
    relationship: 'Passionate self-learner, reads outside his field',
  },
  {
    name: 'Renoir',
    background: 'Design student',
    relationship: 'Avoids research, finds it inaccessible',
  },
  {
    name: 'Claire',
    background: 'Design student, Feedly power user',
    relationship: 'Reads regularly, frustrated by poor categorisation',
  },
  {
    name: 'Carlos',
    background: 'PhD student',
    relationship: 'Daily reader, needs fast triage of high volumes',
  },
];

const researchFindings = [
  {
    num: '01',
    heading: 'Depth mismatch is invisible to tools.',
    body: 'Participants described frustration with systems that could not distinguish between different levels of background knowledge or different tolerances for technical language.',
    produced:
      'The A/B/C card system. Not a toggle, not a preference setting. A generated reading experience at three distinct epistemic depths.',
  },
  {
    num: '02',
    heading: 'Visuals were the most consistently named missing element.',
    body: 'Raised unprompted by 4 of 5 participants. Not as decoration. As the primary vehicle for understanding statistical claims.',
    produced:
      'The 7-component visual vocabulary. StatCallout, ProportionStrip, DumbbellStrip, ComparisonTable, SlopeStrip, StepDiagram, RankStrip. Each matched to a specific data form. The AI selects which one based on what the data actually is.',
  },
  {
    num: '03',
    heading: 'Time is a real constraint, not just a preference.',
    quote:
      '"If I want to give priority I would give for the impact first... you can make two sections." \u2014 Carlos',
    body: '',
    produced:
      'The timeAvailable variable in the quiz. If you have 5 minutes or less, the expanded view caps at three sections regardless of card type.',
  },
  {
    num: '04',
    heading: 'Source matters for trust before depth matters for comprehension.',
    quote: '"Source matters in terms of news for me." \u2014 Claire',
    body: '',
    produced:
      'The trustAnchor variable. If your trust anchor is "where", the expanded view opens with journal attribution before the finding. If it is "data", the visual component is placed first.',
  },
  {
    num: '05',
    heading: 'Categorisation is too coarse to be useful.',
    quote:
      '"They don\'t understand what is design and what I am interested in terms of design." \u2014 Claire',
    body: 'The feedback mechanisms existing tools offer are binary and cannot distinguish between different reasons for disengaging.',
    produced:
      'The researchInterest free-text field as the primary OpenAlex search driver. Not a category dropdown. A subfield match via a secondary Gemini call.',
  },
];

const r2pRows = [
  {
    quote:
      '"Should present the knowledge which should match with the previous knowledge I already have"',
    from: 'Maximus',
    variable: 'normalisedScore',
    controls: 'Which card depth (A, B, or C) the reader receives',
  },
  {
    quote: '"If I want to give priority I would give for the impact first"',
    from: 'Carlos',
    variable: 'trustAnchor',
    controls: 'Section ordering in the expanded view',
  },
  {
    quote: '"I don\'t have too much time"',
    from: 'Carlos',
    variable: 'timeAvailable',
    controls: 'Layer count cap in the expanded view',
  },
  {
    quote: '"I want to understand what they did and how they did it"',
    from: 'Adam',
    variable: 'readingGoal',
    controls: 'Whether the methodology section leads or follows the finding',
  },
  {
    quote: '"If I don\'t understand something I want a simpler explanation"',
    from: 'Renoir',
    variable: 'confusionResponse',
    controls: 'Register and analogy density in Card A generation',
  },
  {
    quote: '"Source matters in terms of news for me"',
    from: 'Claire',
    variable: 'trustAnchor',
    controls: 'Whether journal and authors appear before the finding',
  },
  {
    quote:
      '"They don\'t understand what is design and what I am interested in terms of design"',
    from: 'Claire',
    variable: 'researchInterest',
    controls: 'The OpenAlex subfield ID used to fetch the paper',
  },
  {
    quote: 'Comfort with academic reading, self-rated',
    from: 'All',
    variable: 'readingComfort',
    controls: 'Contributes to normalisedScore weighting',
  },
  {
    quote: 'Field of work or study',
    from: 'All',
    variable: 'field',
    controls: 'OpenAlex field-level filter for paper retrieval',
  },
];

const visualComponents = [
  {
    name: 'StatCallout',
    description:
      'One number is the finding. Isolate it so it cannot be missed.',
  },
  {
    name: 'ProportionStrip',
    description: 'A percentage finding. Show proportion rather than state it.',
  },
  {
    name: 'DumbbellStrip',
    description:
      'Two groups or a before/after comparison. Show the gap visually.',
  },
  {
    name: 'ComparisonTable',
    description:
      'Two groups with multiple attributes. Give the comparison structure.',
  },
  {
    name: 'SlopeStrip',
    description:
      'Change over time with a clear direction. Emphasise direction and magnitude.',
  },
  {
    name: 'StepDiagram',
    description:
      'A process or mechanism. Show sequence for findings that are inherently ordered.',
  },
  {
    name: 'RankStrip',
    description:
      'A ranked list. Make the ordering the primary visual fact.',
  },
];

const thinkAloudFindings = [
  {
    num: 1,
    finding: 'Paper matching was broken for all three participants',
    implication:
      'researchInterest is now the primary OpenAlex search driver, not a downstream annotation. Architecture reworked post-testing.',
  },
  {
    num: 2,
    finding: 'The quiz felt like a form, not an app',
    implication:
      'Open with a default feed. Make the quiz an opt-in personalisation moment, not a mandatory gate. The current flow is an entry tax.',
  },
  {
    num: 3,
    finding:
      'Source, authors, and journal were not visible in the FeedCard',
    implication:
      'All three named attribution as the primary trust signal for whether they would open the expanded view. Without it, the card reads as AI-generated content, not a window into real research.',
  },
  {
    num: 4,
    finding:
      'The generated text described findings without explaining their significance',
    implication:
      '"The breakdown is nice. Basic is okay. But the core is missing." Descriptive accuracy is not the same as pragmatic usefulness.',
  },
  {
    num: 5,
    finding:
      'Playfair Display typeface was difficult to skim on a digital screen',
    implication:
      'High-contrast print serif increases extraneous cognitive load at body text sizes on screen. Replace with a humanist sans-serif.',
  },
  {
    num: 6,
    finding:
      'The persona panel was confusing in its collapsed default state, but meaningful when opened',
    implication:
      'The panel should signal that it is holding and using the reader\'s answers. People fill long questionnaires willingly when the output tells them something about themselves.',
  },
  {
    num: 7,
    finding:
      'The recalibration flow could not separate "wrong depth" from "wrong paper"',
    implication:
      'Renoir selected "too basic" because the paper was irrelevant, not because the depth was wrong. The system served Card C for the same uninteresting paper. This is the most structurally important finding. It is a data quality problem for any future adaptive logic, not just a UX issue.',
  },
  {
    num: 8,
    finding: 'The comprehension quiz lacked visible purpose',
    implication:
      'Claire did not know if it was testing her, updating her profile, or improving the system. Without framing, honest engagement degrades.',
  },
  {
    num: 9,
    finding:
      'Transparency about the nature of the generated text was absent',
    implication:
      'Claire asked directly whether she was reading a summary, lifted sentences, or something else. A single attribution line closes this.',
  },
];

const iterationDone = [
  'researchInterest is now the primary OpenAlex search driver. The paper-matching architecture has been rearchitected. This was the most critical fix. Without relevant papers, depth calibration is unevaluable.',
];

const iterationInProgress = [
  'Source, authors, and journal attribution in the FeedCard.',
  'Typeface replacement, Playfair Display out and a screen-optimised humanist sans-serif in.',
  'Generated text attribution line on every card.',
  'Comprehension quiz framing copy that tells the reader why it exists.',
];

const iterationNext = [
  'Separating depth feedback from paper feedback in the recalibration flow. The current single-signal mechanism conflates two genuinely different problems: wrong depth and wrong paper. Solving this is a prerequisite for building any future adaptive logic reliably. Without clean signal separation, the system will adapt on corrupted data.',
  'Persona panel redesign: from a debug-style collapsed panel to a reader identity surface that shows the reader what the system believes about them and why.',
];

const contributions = [
  {
    num: '1',
    title: 'Research-to-Prompt',
    body: 'A replicable process for translating UX research into prompt architecture, with a full audit trail from participant quote to system behaviour. Documented and transferable to any AI product design context.',
  },
  {
    num: '2',
    title: 'Epistemic Personalisation Framework',
    body: 'A framework for adapting not just what a user sees but how deeply and in what framing, based on inferred knowledge state. Includes the quiz-based routing mechanism, two prompt architecture structures (card generation and expanded view generation), and a proposed roadmap for longitudinal adaptation.',
  },
  {
    num: '3',
    title: 'Adaptive Generative UI',
    body: 'A deployed system that generates both content depth and interface structure at runtime based on who is reading. The same paper, an entirely different experience, no templates.',
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function LiquidReadPage({
  project,
  relatedProjects,
  groupLabel,
}: LiquidReadPageProps) {
  const [expandedFinding, setExpandedFinding] = useState<string | null>(null);

  return (
    <>
      <Head>
        <title>{project.title} - Edwin Meleth</title>
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
          .lr-r2p-table th,
          .lr-r2p-table td {
            vertical-align: top;
          }
        `
      }} />

      <Navbar />

      <div className="lr-page">

        {/* ── SECTION 1: HERO ─────────────────────────────────────────────────── */}
        <section className="bg-[var(--color-bg)] pt-32 pb-24 relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 70%, oklch(from var(--color-primary) l c h / 0.10) 0%, transparent 65%), radial-gradient(ellipse 40% 30% at 50% 20%, oklch(from #1A7880 l c h / 0.07) 0%, transparent 55%)' }}
          />

          <div className="container-custom relative z-10">
            <motion.div variants={fadeIn} initial="hidden" animate="visible">
              <Link
                href="/projects"
                className="inline-flex items-center text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors mb-10 group"
              >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 group-hover:text-[var(--color-primary)] transition-transform" />
                Back to Projects
              </Link>
            </motion.div>

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

            <motion.h1
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="font-[var(--font-display)] text-5xl md:text-7xl font-normal text-[var(--color-text)] leading-[1.05] tracking-tight mb-6"
            >
              Same paper.<br />
              <em className="text-[var(--color-primary)] italic">Different reading experience.</em><br />
              <span className="text-4xl md:text-5xl text-[var(--color-text-muted)]">Generated by AI based on who&apos;s reading.</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.15 }}
              className="font-[var(--font-body)] text-lg text-[var(--color-text-muted)] max-w-2xl mb-10 leading-relaxed"
            >
              LiquidRead fetches real open-access academic papers and generates a completely
              different reading experience for each reader, matched to their knowledge level,
              reading goals, and time available. Not selected from a template. Generated from
              scratch, at runtime, by AI.
            </motion.p>

            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              className="font-[var(--font-mono)] text-sm text-[var(--color-text-faint)] mb-14"
            >
              Live demo available. Request access.
            </motion.p>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-[var(--color-divider)] mb-16"
            >
              {[
                { label: 'Role', value: 'AI Product Designer, Researcher, Developer' },
                { label: 'Timeline', value: 'January to April 2026' },
                { label: 'Stack', value: 'Next.js, Gemini 2.5 Flash, OpenAlex API, Supabase, Vercel' },
                { label: 'Context', value: 'Master of Design thesis, IIT Jodhpur' },
              ].map(({ label, value }) => (
                <motion.div key={label} variants={fadeInUp}>
                  <p className="font-[var(--font-mono)] text-xs text-[var(--color-text-faint)] uppercase tracking-widest mb-1">
                    {label}
                  </p>
                  <p className="font-[var(--font-body)] text-sm text-[var(--color-text)] font-medium">{value}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid md:grid-cols-2 gap-6"
            >
              <motion.div variants={fadeInUp} className="rounded-2xl overflow-hidden border border-[var(--color-border)]">
                <SafeImage
                  src="/public/images/liquid-read/desktop-card.webp"
                  alt="LiquidRead desktop card view"
                  width={960}
                  height={600}
                  className="w-full object-cover"
                />
              </motion.div>
              <motion.div variants={fadeInUp} className="rounded-2xl overflow-hidden border border-[var(--color-border)]">
                <SafeImage
                  src="/public/images/liquid-read/mobile-card.webp"
                  alt="LiquidRead mobile card view"
                  width={480}
                  height={600}
                  className="w-full object-cover"
                />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── SECTION 2: RESULTS STRIP ────────────────────────────────────────── */}
        <section className="border-t border-[var(--color-divider)] bg-[var(--color-surface)]">
          <div className="container-custom py-14">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-[var(--color-divider)]"
            >
              {resultsStrip.map(({ stat, label }) => (
                <motion.div key={stat} variants={fadeInUp} className="px-8 py-4 first:pl-0 last:pr-0">
                  <p className="font-[var(--font-display)] text-4xl md:text-5xl font-normal text-[var(--color-primary)] mb-2">
                    {stat}
                  </p>
                  <p className="text-sm text-[var(--color-text-muted)] leading-snug max-w-[160px]">{label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── SECTION 3: THE PROBLEM ──────────────────────────────────────────── */}
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
              className="font-[var(--font-display)] italic font-normal text-3xl md:text-4xl text-[var(--color-text)] mb-8 leading-tight"
            >
              Every reader gets the same paper
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="font-[var(--font-display)] italic text-2xl md:text-3xl text-[var(--color-text)] max-w-3xl mb-8 leading-snug"
            >
              There are over 100 million academic papers on the internet.
              Three million more are published every year.
            </motion.p>

            <motion.p
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="text-[var(--color-text-muted)] max-w-2xl mb-8 leading-relaxed text-lg"
            >
              None of them are written for anyone outside the field they belong to.
            </motion.p>

            <motion.p
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="text-[var(--color-text-muted)] max-w-2xl mb-8 leading-relaxed"
            >
              The tools built to fix this — Google Scholar, Feedly, Explainpaper, ChatGPT —
              all make the same assumption: every reader is the same reader. They filter what
              you see. None of them change how content is presented based on who is reading it.
            </motion.p>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="grid md:grid-cols-2 gap-6 mb-12"
            >
              <motion.div
                variants={fadeInUp}
                className="bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-2xl p-8"
              >
                <p className="font-[var(--font-mono)] text-xs font-semibold text-[var(--color-text-faint)] uppercase tracking-widest mb-4">Carlos</p>
                <p className="text-[var(--color-text-muted)] leading-relaxed">
                  Carlos, a PhD student interviewed during this research, had been reading papers
                  daily for three years. Early in his PhD they felt dense and overwhelming. Three
                  years later, the same papers felt routine. No tool he used had noticed this. He
                  was still getting the same entry-level summaries from year one. The system had
                  no memory of the fact that he had grown.
                </p>
              </motion.div>
              <motion.div
                variants={fadeInUp}
                className="bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-2xl p-8"
              >
                <p className="font-[var(--font-mono)] text-xs font-semibold text-[var(--color-text-faint)] uppercase tracking-widest mb-4">Claire</p>
                <p className="text-[var(--color-text-muted)] leading-relaxed">
                  Claire, a design student and Feedly power user, followed a "Design" category and
                  received art advocacy, policy news, and product launches all under the same label.
                  When she disliked something, the feedback was binary. The system could not tell
                  whether she disliked the Nothing phone, that specific website, or the language
                  the article was written in.
                </p>
              </motion.div>
            </motion.div>

            <motion.blockquote
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="border-l-4 border-[var(--color-primary)] pl-8 py-2 mb-12"
            >
              <p className="font-[var(--font-display)] italic text-xl md:text-2xl text-[var(--color-text)] mb-3 leading-snug">
                &ldquo;If I say I don&apos;t want to read this, what is it doing? Is it understanding I
                don&apos;t like the Nothing phone, or I don&apos;t like this website, or I don&apos;t like
                the language?&rdquo;
              </p>
              <p className="font-[var(--font-mono)] text-sm text-[var(--color-primary)] uppercase tracking-widest">Claire</p>
            </motion.blockquote>

            <motion.p
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="text-[var(--color-text-muted)] max-w-2xl leading-relaxed font-medium"
            >
              Two different problems. Same root cause. The systems have no model of who is asking.
            </motion.p>
          </div>
        </section>

        {/* ── SECTION 4: COMPETITIVE AUDIT ────────────────────────────────────── */}
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
                02 / Competitive Audit
              </span>
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="font-[var(--font-display)] italic font-normal text-3xl md:text-4xl text-[var(--color-text)] mb-4 leading-tight"
            >
              Seven tools. The same gap in all seven.
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="text-[var(--color-text-muted)] max-w-2xl mb-10 leading-relaxed"
            >
              One question tested against each: does this tool adapt the depth or framing of
              its content based on who is reading? None of them do.
            </motion.p>

            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="overflow-x-auto mb-8"
            >
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--color-border)]">
                    <th className="font-[var(--font-mono)] text-left pb-4 pr-6 text-xs font-semibold text-[var(--color-text-faint)] uppercase tracking-widest w-1/6">
                      Tool
                    </th>
                    <th className="font-[var(--font-mono)] text-left pb-4 pr-6 text-xs font-semibold text-[var(--color-text-faint)] uppercase tracking-widest w-2/5">
                      What it does
                    </th>
                    <th className="font-[var(--font-mono)] text-left pb-4 text-xs font-semibold text-[var(--color-text-faint)] uppercase tracking-widest">
                      The gap
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-divider)]">
                  {auditRows.map((row) => (
                    <motion.tr
                      key={row.tool}
                      variants={fadeInUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: '-40px' }}
                      className="group hover:bg-[var(--color-surface-2)] transition-colors"
                    >
                      <td className="py-5 pr-6">
                        <p className="font-semibold text-[var(--color-text)]">{row.tool}</p>
                      </td>
                      <td className="py-5 pr-6">
                        <p className="text-[var(--color-text-muted)] leading-relaxed">{row.does}</p>
                      </td>
                      <td className="py-5">
                        <p className="text-[var(--color-primary)] font-medium leading-relaxed">{row.gap}</p>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>

            <motion.p
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="text-[var(--color-text-muted)] max-w-2xl leading-relaxed"
            >
              Some filter by topic. Some summarise on request. None generate differently
              for different readers.
            </motion.p>
          </div>
        </section>

        {/* ── SECTION 5: USER RESEARCH ────────────────────────────────────────── */}
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
                03 / User Research
              </span>
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="font-[var(--font-display)] italic font-normal text-3xl md:text-4xl text-[var(--color-text)] mb-4 leading-tight"
            >
              Five interviews, one direction
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="text-[var(--color-text-muted)] max-w-2xl mb-12 leading-relaxed"
            >
              Five semi-structured interviews, 45 to 60 minutes each. Participants were not
              shown any prototype or concept. The goal was to understand how people currently
              consume research, where existing tools fail them, and what they actually want,
              not to validate an idea that already existed.
            </motion.p>

            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="overflow-x-auto mb-12"
            >
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--color-border)]">
                    <th className="font-[var(--font-mono)] text-left pb-4 pr-6 text-xs font-semibold text-[var(--color-text-faint)] uppercase tracking-widest">Pseudonym</th>
                    <th className="font-[var(--font-mono)] text-left pb-4 pr-6 text-xs font-semibold text-[var(--color-text-faint)] uppercase tracking-widest">Background</th>
                    <th className="font-[var(--font-mono)] text-left pb-4 text-xs font-semibold text-[var(--color-text-faint)] uppercase tracking-widest">Relationship with research</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-divider)]">
                  {participants.map((p) => (
                    <tr key={p.name} className="hover:bg-[var(--color-surface-2)] transition-colors">
                      <td className="py-4 pr-6 font-semibold text-[var(--color-text)]">{p.name}</td>
                      <td className="py-4 pr-6 text-[var(--color-text-muted)]">{p.background}</td>
                      <td className="py-4 text-[var(--color-text-muted)]">{p.relationship}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="bg-[var(--color-surface-offset)] border border-[var(--color-border)] rounded-2xl p-8 mb-16"
            >
              <p className="font-[var(--font-mono)] text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-widest mb-3">Note on Renoir</p>
              <p className="text-[var(--color-text-muted)] leading-relaxed">
                Renoir was included deliberately as a non-target user. Understanding why someone
                actively avoids research content is as informative as understanding what regular
                readers want.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="mb-8"
            >
              <p className="font-[var(--font-mono)] text-xs font-semibold text-[var(--color-text-faint)] uppercase tracking-widest">
                Findings
              </p>
            </motion.div>

            <div className="space-y-4 mb-16">
              {researchFindings.map((f) => {
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
                      onClick={() => setExpandedFinding(isOpen ? null : f.num)}
                    >
                      <span className="font-[var(--font-mono)] text-2xl font-bold text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors shrink-0 mt-0.5">
                        {f.num}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors">
                          {f.heading}
                        </p>
                        {!isOpen && f.body && (
                          <p className="text-sm text-[var(--color-text-faint)] mt-1 line-clamp-1">
                            {f.body}
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
                            {f.body && (
                              <p className="text-[var(--color-text-muted)] leading-relaxed">{f.body}</p>
                            )}
                            {f.quote && (
                              <blockquote className="border-l-2 border-[var(--color-primary)] pl-4">
                                <p className="text-[var(--color-text-muted)] italic text-sm">{f.quote}</p>
                              </blockquote>
                            )}
                            <div className="bg-[var(--color-primary-highlight)] border border-[var(--color-primary)]/20 rounded-xl p-5">
                              <p className="font-[var(--font-mono)] text-xs font-semibold text-[var(--color-primary)] uppercase tracking-widest mb-2">What it produced</p>
                              <p className="text-[var(--color-text)] text-sm leading-relaxed">{f.produced}</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="bg-[var(--color-primary)] text-[var(--color-text-inverse)] rounded-2xl p-8 md:p-10"
            >
              <p className="font-[var(--font-mono)] text-xs font-semibold uppercase tracking-widest text-[var(--color-text-inverse)] opacity-70 mb-4">
                Target Segment
              </p>
              <p className="text-[var(--color-text-inverse)] max-w-2xl leading-relaxed text-lg">
                Already have a reading system. Already frustrated by its limits. High enough
                domain knowledge to recognise when something is wrong. High enough motivation
                to switch if something better exists. Participants 2 through 5 all fit here.
                Participant 1 was ruled out. They will not use any tool until the experience
                is radically different.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── SECTION 6: THE PIVOT ────────────────────────────────────────────── */}
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
                04 / The Pivot
              </span>
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="font-[var(--font-display)] italic font-normal text-3xl md:text-4xl text-[var(--color-text)] mb-8 leading-tight"
            >
              The obvious direction was wrong
            </motion.h2>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="grid md:grid-cols-2 gap-12 items-start mb-12"
            >
              <motion.div variants={fadeInUp} className="space-y-6">
                <p className="text-[var(--color-text-muted)] leading-relaxed">
                  The first version of this concept was a better Feedly. A personalised research
                  feed with AI summarisation as the core feature. It was a reasonable idea. It was
                  also going to be commoditised before it shipped. AI summarisation is going to be
                  in every tool within two years. That is not a defensible product direction.
                </p>
                <p className="text-[var(--color-text-muted)] leading-relaxed">
                  The question that changed the direction: what part of this problem actually
                  requires personalisation at the presentation layer, not just the curation layer?
                </p>
                <p className="text-[var(--color-text-muted)] leading-relaxed">
                  Every existing tool personalises what you see. Nobody personalises how it is
                  shown to you based on your actual knowledge state. That is the problem that does
                  not get solved by a better algorithm. It requires a different architecture entirely.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="space-y-6">
                <div className="bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-2xl p-8">
                  <p className="font-[var(--font-display)] italic text-xl md:text-2xl text-[var(--color-text)] leading-snug mb-3">
                    Every existing tool personalises what you see.
                  </p>
                  <p className="font-[var(--font-display)] italic text-xl md:text-2xl text-[var(--color-primary)] leading-snug">
                    Nobody personalises how it is shown to you.
                  </p>
                </div>

                <div className="bg-[var(--color-surface-offset)] border border-[var(--color-border)] rounded-xl p-6">
                  <p className="font-[var(--font-mono)] text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-widest mb-3">The reframe</p>
                  <p className="text-[var(--color-text-muted)] leading-relaxed">
                    The reading experience itself, the depth, the framing, the language, the visual
                    format, should be generated at runtime based on who is reading. Not selected
                    from a template. Generated.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="bg-[var(--color-surface-offset)] border border-[var(--color-border)] rounded-2xl p-10"
            >
              <p className="font-[var(--font-mono)] text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-widest mb-4">Core thesis</p>
              <p className="text-xl md:text-2xl font-semibold text-[var(--color-text)] leading-snug max-w-3xl">
                Same paper. Different reading experience. Generated by AI based on who is reading,
                not hardcoded.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── SECTION 7: RESEARCH-TO-PROMPT ───────────────────────────────────── */}
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
                05 / Research-to-Prompt
              </span>
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="font-[var(--font-display)] italic font-normal text-3xl md:text-4xl text-[var(--color-text)] mb-4 leading-tight"
            >
              From interview quote to prompt variable
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="text-[var(--color-text-muted)] max-w-2xl mb-6 leading-relaxed"
            >
              Most AI products are built with prompts written by engineers who were not in the
              research sessions. This table is the paper trail that closes that gap. Every
              variable in LiquidRead&apos;s prompt traces back to something a real user said.
            </motion.p>

            <motion.p
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="text-[var(--color-text-muted)] max-w-2xl mb-12 leading-relaxed"
            >
              Research-to-Prompt works in four steps: identify the behavioural gap in what
              existing tools fail to do, name the variable that is missing, define how that
              variable changes the AI output, then encode it in the correct block of the prompt.
              Not vaguely. Precisely. A specific quote maps to a specific variable, which
              produces a measurably different generated output.
            </motion.p>

            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="overflow-x-auto mb-14"
            >
              <table className="w-full text-sm lr-r2p-table">
                <thead>
                  <tr className="border-b-2 border-[var(--color-border)]">
                    <th className="font-[var(--font-mono)] text-left pb-4 pr-6 text-xs font-semibold text-[var(--color-text-faint)] uppercase tracking-widest w-2/5">
                      User quote
                    </th>
                    <th className="font-[var(--font-mono)] text-left pb-4 pr-6 text-xs font-semibold text-[var(--color-text-faint)] uppercase tracking-widest w-[10%]">
                      From
                    </th>
                    <th className="font-[var(--font-mono)] text-left pb-4 pr-6 text-xs font-semibold text-[var(--color-text-faint)] uppercase tracking-widest w-[18%]">
                      Prompt variable
                    </th>
                    <th className="font-[var(--font-mono)] text-left pb-4 text-xs font-semibold text-[var(--color-text-faint)] uppercase tracking-widest">
                      What it controls
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-divider)]">
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
                        <span className="text-xs font-semibold text-[var(--color-primary)] bg-[var(--color-primary-highlight)] px-2 py-1 rounded-full whitespace-nowrap">
                          {row.from}
                        </span>
                      </td>
                      <td className="py-5 pr-6">
                        <code className="text-xs bg-[var(--color-surface-offset)] text-[var(--color-text-muted)] px-2 py-1 rounded font-[var(--font-mono)]">
                          {row.variable}
                        </code>
                      </td>
                      <td className="py-5 text-[var(--color-text-muted)] leading-relaxed">
                        {row.controls}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="grid md:grid-cols-2 gap-6"
            >
              <motion.div
                variants={fadeInUp}
                className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-8"
              >
                <p className="font-[var(--font-mono)] text-xs font-semibold text-[var(--color-text-faint)] uppercase tracking-widest mb-4">Prompt architecture</p>
                <p className="text-[var(--color-text-muted)] leading-relaxed mb-4">
                  The prompt has five blocks. PHILOSOPHY and RULES are stable across every call.
                  USER PROFILE, PERSONALISATION INSTRUCTIONS, PAPER, and TASK AND SCHEMA change
                  with every user.
                </p>
                <p className="text-[var(--color-text-muted)] leading-relaxed mb-4">
                  The PHILOSOPHY block is not a technical instruction. It is a statement of values
                  the model is asked to hold during generation. One line from it:
                </p>
                <blockquote className="border-l-2 border-[var(--color-primary)] pl-4 mb-4">
                  <p className="text-[var(--color-text)] italic font-medium">
                    &ldquo;Card A readers are not less intelligent. They are differently equipped.&rdquo;
                  </p>
                </blockquote>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                  That is Schema Theory encoded as a prompt instruction. Accessible writing and
                  patronising writing are not the same thing. The difference is in how the author
                  frames the reader. The prompt has to know the difference.
                </p>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-8"
              >
                <p className="font-[var(--font-mono)] text-xs font-semibold text-[var(--color-text-faint)] uppercase tracking-widest mb-4">The RULES block</p>
                <p className="text-[var(--color-text-muted)] leading-relaxed">
                  The RULES block encodes writing constraints that apply regardless of card type.
                  This includes a prohibition on em dashes, a requirement that every statistic be
                  followed immediately by a plain-English explanation of what it means in real life,
                  and an instruction to write like a sharp science journalist rather than an AI
                  assistant. The primary failure mode of generative writing is not inaccuracy.
                  It is a recognisable AI register: hedged, padded, tonally flat. The RULES block
                  is the primary design defence against that.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── SECTION 8: HOW IT WORKS ─────────────────────────────────────────── */}
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
                06 / How It Works
              </span>
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="font-[var(--font-display)] italic font-normal text-3xl md:text-4xl text-[var(--color-text)] mb-16 leading-tight"
            >
              Three levels of personalisation
            </motion.h2>

            {/* Level 1: Text depth */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="mb-16"
            >
              <p className="font-[var(--font-mono)] text-xs font-semibold text-[var(--color-text-faint)] uppercase tracking-widest mb-3">
                Level 1: Text depth
              </p>
              <h3 className="font-[var(--font-display)] italic font-normal text-2xl text-[var(--color-text)] mb-6 leading-tight">
                The quiz routes you to one of three reading depths
              </h3>
              <p className="text-[var(--color-text-muted)] max-w-2xl leading-relaxed mb-6">
                Nine quiz questions generate a normalisedScore between 0 and 10.
                The formula: (rawScore / 16) x 10. Three bands, deliberately unequal widths:
              </p>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {[
                  {
                    card: 'Card A',
                    range: '0 to 3.75',
                    description: 'Analogy-first, jargon-free, schema-bridging.',
                    color: 'border-[var(--color-teal)] bg-[var(--color-teal-faint)]',
                    label: 'text-[var(--color-teal)]',
                  },
                  {
                    card: 'Card B',
                    range: '3.75 to 6.5',
                    description: 'Field terminology with scaffolding, implications explained.',
                    color: 'border-[var(--color-primary)]/40 bg-[var(--color-primary-highlight)]',
                    label: 'text-[var(--color-primary)]',
                  },
                  {
                    card: 'Card C',
                    range: '6.5 to 10',
                    description: 'Methodology-forward, statistics-dense, limitations stated.',
                    color: 'border-[var(--color-border)] bg-[var(--color-surface-2)]',
                    label: 'text-[var(--color-text-muted)]',
                  },
                ].map(({ card, range, description, color, label }) => (
                  <div key={card} className={`rounded-2xl border p-6 ${color}`}>
                    <p className={`font-[var(--font-mono)] text-xs font-bold uppercase tracking-widest mb-1 ${label}`}>{card}</p>
                    <p className="font-semibold text-[var(--color-text)] mb-2">{range}</p>
                    <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{description}</p>
                  </div>
                ))}
              </div>

              <p className="text-[var(--color-text-muted)] max-w-2xl leading-relaxed mb-4">
                Card B is the narrowest band by design. Mid-level readers are the most variable.
                A score of 4.0 and a score of 6.0 may have meaningfully different needs depending
                on the specific paper. The recalibration mechanism exists for exactly this group.
              </p>
              <p className="text-[var(--color-text-muted)] max-w-2xl leading-relaxed mb-4">
                Why three cards and not two or five? Two creates too large a gap between accessible
                and technical. Five requires calibration precision a short quiz cannot deliver.
                Three maps to three genuinely distinct reading states.
              </p>
              <p className="text-[var(--color-text-muted)] max-w-2xl leading-relaxed">
                The system routes you to a card based on your score. But you can override it.
                The profile is visible and editable. The system is making a recommendation,
                not imposing one.
              </p>
            </motion.div>

            {/* Level 2: Visual structure */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="mb-16"
            >
              <p className="font-[var(--font-mono)] text-xs font-semibold text-[var(--color-text-faint)] uppercase tracking-widest mb-3">
                Level 2: Visual structure
              </p>
              <h3 className="font-[var(--font-display)] italic font-normal text-2xl text-[var(--color-text)] mb-6 leading-tight">
                The type of visual adapts to the paper&apos;s data structure
              </h3>
              <p className="text-[var(--color-text-muted)] max-w-2xl leading-relaxed mb-8">
                Seven components, each matched to a specific type of statistical claim. The AI
                selects which one based on what the data actually is. Not decoration. Structure.
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {visualComponents.map((v) => (
                  <motion.div
                    key={v.name}
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-40px' }}
                    className="flex gap-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-5 hover:border-[var(--color-primary)] transition-colors"
                  >
                    <code className="text-xs bg-[var(--color-primary-highlight)] text-[var(--color-primary)] px-2 py-1 rounded font-[var(--font-mono)] shrink-0 self-start">
                      {v.name}
                    </code>
                    <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{v.description}</p>
                  </motion.div>
                ))}
              </div>

              <p className="text-[var(--color-text-muted)] max-w-2xl leading-relaxed">
                One visual per expanded view. One visual anchors the reading experience.
                Two compete with each other and dilute both.
              </p>
            </motion.div>

            {/* Level 3: Section order */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="mb-16"
            >
              <p className="font-[var(--font-mono)] text-xs font-semibold text-[var(--color-text-faint)] uppercase tracking-widest mb-3">
                Level 3: Section order
              </p>
              <h3 className="font-[var(--font-display)] italic font-normal text-2xl text-[var(--color-text)] mb-6 leading-tight">
                The order of sections adapts to your profile too
              </h3>
              <p className="text-[var(--color-text-muted)] max-w-2xl leading-relaxed mb-6">
                Once you open a card, the section order is not preset. It is determined at
                generation time by your profile variables.
              </p>

              <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-8 mb-6">
                <div className="space-y-4">
                  {[
                    { cond: 'trustAnchor is "data"', result: 'The visual component appears first.' },
                    { cond: 'normalisedScore is at or above 7', result: 'The methodology section comes before the finding. Expert readers want to evaluate the method before accepting the result.' },
                    { cond: 'timeAvailable is 5 minutes or less', result: 'The card caps at three sections regardless of card type.' },
                    { cond: 'trustAnchor is "where"', result: 'Card B and Card C open with the journal and authors rather than the finding.' },
                  ].map(({ cond, result }) => (
                    <div key={cond} className="flex gap-4 items-start">
                      <div className="shrink-0 mt-1 w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] mt-2" />
                      <p className="text-[var(--color-text-muted)] leading-relaxed">
                        <span className="font-medium text-[var(--color-text)]">If your {cond}:&nbsp;</span>
                        {result}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-[var(--color-text-muted)] max-w-2xl leading-relaxed font-medium">
                Depth and order both adapt. That is two layers of personalisation per card,
                generated in a single API call.
              </p>
            </motion.div>

            {/* Paper retrieval */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <p className="font-[var(--font-mono)] text-xs font-semibold text-[var(--color-text-faint)] uppercase tracking-widest mb-3">
                Paper retrieval
              </p>
              <h3 className="font-[var(--font-display)] italic font-normal text-2xl text-[var(--color-text)] mb-6 leading-tight">
                Constrained serendipity, not curated safety
              </h3>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <p className="text-[var(--color-text-muted)] leading-relaxed">
                  Papers come from the OpenAlex API. Real open-access research, post-2021, with
                  an abstract, a DOI, and no conference proceedings in the title. Your
                  researchInterest answer drives a secondary Gemini 2.5 Flash-lite call that
                  returns a single OpenAlex subfield ID. One paper is then selected at random
                  within that filtered pool. No weighting by citation count. The serendipity is
                  a direct consequence of the random draw inside a quality floor.
                </p>
                <p className="text-[var(--color-text-muted)] leading-relaxed">
                  If PubMed Central or Europe PMC can return full-text sections, they are retrieved
                  before generation. If neither source returns usable content, the generation
                  proceeds on the abstract alone. If retrieval fails entirely, a fallback paper
                  runs: Shen et al., &ldquo;Nonlinear dynamics of multi-omics profiles during human
                  aging&rdquo;, Nature Aging, 2024. Every session produces a generated card, not an
                  error screen.
                </p>
              </div>

              <motion.div
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                className="grid md:grid-cols-2 gap-6"
              >
                <div className="rounded-2xl overflow-hidden border border-[var(--color-border)]">
                  <SafeImage
                    src="/public/images/liquid-read/OpenAlex_paper_fetch_logic.webp"
                    alt="OpenAlex paper fetch logic diagram"
                    width={960}
                    height={600}
                    className="w-full object-contain"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden border border-[var(--color-border)]">
                  <SafeImage
                    src="/public/images/liquid-read/expanded-view-desktop.webp"
                    alt="LiquidRead expanded view on desktop"
                    width={960}
                    height={600}
                    className="w-full object-cover"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── SECTION 9: WHAT TESTING FOUND ───────────────────────────────────── */}
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
                07 / Testing
              </span>
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="font-[var(--font-display)] italic font-normal text-3xl md:text-4xl text-[var(--color-text)] mb-16 leading-tight"
            >
              What testing actually found
            </motion.h2>

            {/* Part 1: Survey */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="mb-4"
            >
              <p className="font-[var(--font-mono)] text-xs font-semibold text-[var(--color-text-faint)] uppercase tracking-widest">Part 1: Survey</p>
            </motion.div>

            <motion.p
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="text-[var(--color-text-muted)] max-w-2xl mb-10 leading-relaxed"
            >
              Before building the live system, a survey validated the core premise. 26
              participants were routed to manually-created A/B/C cards for field-relevant
              papers. Card type was determined by quiz score. The survey ran in March 2026.
            </motion.p>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="grid md:grid-cols-2 gap-6 mb-12"
            >
              <motion.div
                variants={fadeInUp}
                className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-8"
              >
                <p className="font-[var(--font-display)] italic text-3xl md:text-4xl text-[var(--color-text)] mb-2">17 of 26</p>
                <p className="text-[var(--color-text-muted)] leading-relaxed">
                  participants (65%) were correctly routed to a depth-matched card on first
                  assignment.
                </p>
              </motion.div>
              <motion.div
                variants={fadeInUp}
                className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-8"
              >
                <p className="font-[var(--font-display)] italic text-3xl md:text-4xl text-[var(--color-primary)] mb-2">100%</p>
                <p className="text-[var(--color-text-muted)] leading-relaxed">
                  All participants who received a miscalibrated card preferred the depth-corrected
                  alternate.
                </p>
              </motion.div>
            </motion.div>

            {/* Too-basic asymmetry */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-8 md:p-10 mb-8"
            >
              <p className="font-[var(--font-mono)] text-xs font-semibold text-[var(--color-text-faint)] uppercase tracking-widest mb-6">
                The too-basic asymmetry
              </p>
              <p className="text-[var(--color-text-muted)] mb-8 leading-relaxed">
                Miscalibrated participants rated suitability on a 1 to 5 scale after seeing
                both their assigned card and the alternate.
              </p>

              <div className="space-y-6 mb-8">
                {[
                  { label: 'Too basic', score: 2.5, max: 5, color: 'bg-[var(--color-surface-dynamic)]', textColor: 'text-[var(--color-text-muted)]' },
                  { label: 'Too advanced', score: 3.71, max: 5, color: 'bg-[var(--color-primary)]', textColor: 'text-[var(--color-primary)]' },
                ].map(({ label, score, max, color, textColor }) => (
                  <div key={label}>
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm text-[var(--color-text-muted)]">Mean suitability: {label}</p>
                      <p className={`text-sm font-bold ${textColor}`}>{score} / {max}</p>
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

              <p className="text-[var(--color-text-muted)] leading-relaxed mb-4">
                The gap is 1.21 points. On a 5-point scale, that is design-meaningful.
              </p>
              <p className="text-[var(--color-text-muted)] leading-relaxed mb-4">
                A reader whose card is above their level can still extract something. The hook,
                the key finding, even if the methodology defeats them. A reader whose card is
                below their level finds nothing new in any layer. The too-advanced failure is
                experienced as a ceiling. The too-basic failure is experienced as an insult.
                It signals to the reader that the system fundamentally misread them.
              </p>
              <p className="font-medium text-[var(--color-text)] leading-relaxed">
                Design implication: when the quiz score is ambiguous, route up, not down.
              </p>
            </motion.div>

            {/* Card C story */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="bg-[var(--color-surface-offset)] border border-[var(--color-border)] rounded-2xl p-8 md:p-10 mb-16"
            >
              <p className="font-[var(--font-mono)] text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-widest mb-4">
                The Card C story
              </p>
              <p className="font-[var(--font-display)] italic text-2xl text-[var(--color-text)] mb-4">Zero participants reached Card C.</p>
              <p className="text-[var(--color-text-muted)] leading-relaxed mb-4">
                Not because no one qualified. The routing formula had a bug. The normalisedScore
                calculation used MAX_RAW_SCORE of 18 instead of the correct value of 16. This
                compressed every score downward. Participants who should have cleared the Card C
                threshold did not. The error was caught post-survey when the distribution looked
                wrong. Zero percent in Card C was not a plausible outcome given the sample.
              </p>
              <p className="text-[var(--color-text-muted)] leading-relaxed">
                The threshold was recalibrated from 7.5 to 6.5 in the live system. Card C is
                built and deployed. Its real-world suitability for expert readers is an open
                empirical question.
              </p>
            </motion.div>

            {/* Part 2: Think-Aloud */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="mb-4"
            >
              <p className="font-[var(--font-mono)] text-xs font-semibold text-[var(--color-text-faint)] uppercase tracking-widest">Part 2: Think-Aloud Testing</p>
            </motion.div>

            <motion.p
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="text-[var(--color-text-muted)] max-w-2xl mb-6 leading-relaxed"
            >
              Three participants from the original interview cohort, Maximus, Renoir, and
              Claire, used the live system for 30 to 50 minutes each on April 5 and 6, 2026.
              Tasks were minimal: complete the quiz, read a paper, give calibration feedback,
              try the expanded view. Sessions were recorded with consent.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="bg-[var(--color-primary-highlight)] border border-[var(--color-primary)]/30 rounded-2xl p-8 mb-12"
            >
              <p className="text-[var(--color-text)] leading-relaxed">
                One critical precondition the design had assumed but never tested: that the paper
                would actually match what the reader cared about. It did not. Paper matching was
                broken for all three participants. researchInterest was being used downstream as
                an annotation, not as the primary search driver. This affected every other finding.
                Several of the nine findings below describe the system-as-designed. Some describe
                the system-under-wrong-conditions. The distinction matters for what gets fixed first.
              </p>
            </motion.div>

            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="overflow-x-auto mb-16"
            >
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--color-border)]">
                    <th className="font-[var(--font-mono)] text-left pb-4 pr-4 text-xs font-semibold text-[var(--color-text-faint)] uppercase tracking-widest w-8">#</th>
                    <th className="font-[var(--font-mono)] text-left pb-4 pr-6 text-xs font-semibold text-[var(--color-text-faint)] uppercase tracking-widest w-2/5">Finding</th>
                    <th className="font-[var(--font-mono)] text-left pb-4 text-xs font-semibold text-[var(--color-text-faint)] uppercase tracking-widest">Design implication</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-divider)]">
                  {thinkAloudFindings.map((row) => (
                    <motion.tr
                      key={row.num}
                      variants={fadeInUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: '-40px' }}
                      className="hover:bg-[var(--color-surface-2)] transition-colors"
                    >
                      <td className="py-5 pr-4">
                        <span className="font-[var(--font-mono)] text-xs font-bold text-[var(--color-text-faint)]">{row.num}</span>
                      </td>
                      <td className="py-5 pr-6">
                        <p className="text-[var(--color-text)] font-medium leading-relaxed">{row.finding}</p>
                      </td>
                      <td className="py-5">
                        <p className="text-[var(--color-text-muted)] leading-relaxed">{row.implication}</p>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>

            {/* Supabase logs */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="mb-6"
            >
              <p className="font-[var(--font-mono)] text-xs font-semibold text-[var(--color-text-faint)] uppercase tracking-widest mb-4">
                What the logs saw that the sessions did not
              </p>
              <p className="text-[var(--color-text-muted)] max-w-2xl leading-relaxed mb-8">
                The event logs added a layer under the verbal observations. Three moments stood out.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="space-y-4 mb-12"
            >
              {[
                {
                  name: 'Maximus',
                  score: '3.75',
                  card: 'Card A',
                  body: 'Comprehension quiz: 2 out of 2. Suitability rating: 4 out of 5, marked "just right". His written feedback: "Lacking visual. Central idea is not presented. Language could be better. Need hook or curiosity." A 4 out of 5 with correct calibration. The depth worked. The content quality did not. Two different problems.',
                },
                {
                  name: 'Renoir',
                  score: '6.25',
                  card: 'Card B',
                  body: 'Opened the expanded view within 10 seconds of card generation without reading the FeedCard at all. No card rating submitted. His "too basic" selection in the recalibration flow was a paper relevance complaint expressed through the only available signal channel.',
                },
                {
                  name: 'Claire',
                  score: '6.88',
                  card: 'Card C',
                  body: 'Opened the expanded view, took the comprehension quiz, scored 0 out of 2. Reopened the expanded view. Took the quiz again. Scored 0 out of 2 again. Submitted "too advanced" with a suitability rating of 1 out of 5. The double-open, double-fail sequence is behaviourally distinctive. She tried to understand the paper twice before giving up. Her paper was AI-adjacent (LLMs in clinical medicine) but domain-wrong for her specific interest in AI evaluation methods.',
                },
              ].map(({ name, score, card, body }) => (
                <motion.div
                  key={name}
                  variants={fadeInUp}
                  className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-8"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <p className="font-semibold text-[var(--color-text)]">{name}</p>
                    <span className="font-[var(--font-mono)] text-xs text-[var(--color-text-faint)]">normalisedScore {score}</span>
                    <span className="font-[var(--font-mono)] text-xs px-2 py-0.5 bg-[var(--color-primary-highlight)] text-[var(--color-primary)] rounded-full">{card}</span>
                  </div>
                  <p className="text-[var(--color-text-muted)] leading-relaxed">{body}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="rounded-2xl overflow-hidden border border-[var(--color-border)]"
            >
              <SafeImage
                src="/public/images/liquid-read/Survey_userflow_logic.webp"
                alt="Survey user flow diagram"
                width={1200}
                height={600}
                className="w-full object-contain"
              />
            </motion.div>
          </div>
        </section>

        {/* ── SECTION 10: THE CURRENT ITERATION ──────────────────────────────── */}
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
                08 / Current Iteration
              </span>
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="font-[var(--font-display)] italic font-normal text-3xl md:text-4xl text-[var(--color-text)] mb-4 leading-tight"
            >
              The current iteration
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="text-[var(--color-text-muted)] max-w-2xl mb-12 leading-relaxed"
            >
              The nine think-aloud findings map directly to nine open design problems.
              This is the current work.
            </motion.p>

            <div className="space-y-4">
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                  <p className="font-[var(--font-mono)] text-xs font-semibold text-[var(--color-text-faint)] uppercase tracking-widest">Done</p>
                </div>
                {iterationDone.map((item) => (
                  <p key={item} className="text-[var(--color-text-muted)] leading-relaxed">{item}</p>
                ))}
              </motion.div>

              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                className="bg-[var(--color-primary-highlight)] border border-[var(--color-primary)]/30 rounded-2xl p-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-5 h-5 text-[var(--color-primary)] shrink-0" />
                  <p className="font-[var(--font-mono)] text-xs font-semibold text-[var(--color-primary)] uppercase tracking-widest">In progress</p>
                </div>
                <ul className="space-y-2">
                  {iterationInProgress.map((item) => (
                    <li key={item} className="flex gap-3 text-[var(--color-text-muted)] leading-relaxed">
                      <span className="shrink-0 text-[var(--color-primary)] mt-0.5">+</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Circle className="w-5 h-5 text-[var(--color-text-muted)] shrink-0" />
                  <p className="font-[var(--font-mono)] text-xs font-semibold text-[var(--color-text-faint)] uppercase tracking-widest">Structural next</p>
                </div>
                <ul className="space-y-4">
                  {iterationNext.map((item) => (
                    <li key={item} className="text-[var(--color-text-muted)] leading-relaxed">{item}</li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── SECTION 11: THE CONTRIBUTION ────────────────────────────────────── */}
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
                09 / Contribution
              </span>
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="font-[var(--font-display)] italic font-normal text-3xl md:text-4xl text-[var(--color-text)] mb-6 leading-tight"
            >
              The contribution that outlasts the product
            </motion.h2>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="grid md:grid-cols-2 gap-8 mb-12"
            >
              <motion.div variants={fadeInUp}>
                <p className="text-[var(--color-text-muted)] leading-relaxed mb-4">
                  LiquidRead is one instance of a broader problem. Any AI product that adapts to
                  users eventually needs a model of who the user is, not just what they asked.
                  Building that model well, maintaining it honestly, and making it visible to the
                  user are design problems, not engineering problems.
                </p>
                <p className="text-[var(--color-text-muted)] leading-relaxed">
                  The Research-to-Prompt methodology is the transferable piece. The process, from
                  interview quote to behavioural gap to named variable to prompt instruction, can
                  be applied to any generative system. The prompt is the design artifact. It
                  deserves the same rigour as any other layer of the interface.
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="grid md:grid-cols-3 gap-6 mb-16"
            >
              {contributions.map((c) => (
                <motion.div
                  key={c.num}
                  variants={fadeInUp}
                  className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-8"
                >
                  <p className="font-[var(--font-mono)] text-3xl font-bold text-[var(--color-text-faint)] mb-4">{c.num}</p>
                  <p className="font-semibold text-[var(--color-text)] mb-3">{c.title}</p>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{c.body}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="bg-[var(--color-surface-offset)] border border-[var(--color-border)] rounded-2xl p-10"
            >
              <p className="text-lg text-[var(--color-text)] leading-relaxed max-w-3xl">
                Paper retrieval and depth calibration were designed as two independent systems.
                They are not. A paper the reader does not care about makes depth calibration
                unevaluable, which is exactly what the think-aloud sessions proved. The
                architecture should have had a relevance gate before depth routing, not parallel
                to it. That is the next structural redesign.
              </p>
            </motion.div>
          </div>
        </section>

      </div>

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
