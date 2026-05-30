'use client';

import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft, ChevronDown, ChevronUp, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../../sections/Navbar';
import Footer from '../../sections/Footer';
import RelatedProjects from '../RelatedProjects';
import { type Project } from '../../../data/projects';
import { fadeInUp, fadeIn, staggerContainer } from '../../../lib/animations';

interface FairSplitPageProps {
  project: Project;
  relatedProjects: Project[];
  groupLabel?: string;
}

/* ─── SafeImage ─────────────────────────────────────────────────────────── */
const SafeImage = ({
  src, alt, fallback, className = '', style,
}: {
  src: string; alt: string; fallback: string;
  className?: string; style?: React.CSSProperties;
}) => {
  const [err, setErr] = useState(false);
  if (err) return (
    <div className={`fs-ph ${className}`} style={style}>
      <span className="fs-ph__inner">{fallback}</span>
    </div>
  );
  return (
    <img src={src} alt={alt} className={className}
      style={{ width: '100%', height: 'auto', display: 'block', ...style }}
      onError={() => setErr(true)} />
  );
};

/* ─── Collapsible ────────────────────────────────────────────────────────── */
const Collapsible = ({ isOpen, children }: { isOpen: boolean; children: React.ReactNode }) => (
  <AnimatePresence initial={false}>
    {isOpen && (
      <motion.div
        initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
        style={{ overflow: 'hidden' }}>
        {children}
      </motion.div>
    )}
  </AnimatePresence>
);

/* ─── Numbered badge ─────────────────────────────────────────────────────── */
const Badge = ({ n }: { n: string }) => <span className="fs-badge">{n}</span>;

/* ─── Section label ──────────────────────────────────────────────────────── */
const Lbl = ({ children }: { children: React.ReactNode }) => (
  <div className="fs-lbl">{children}</div>
);

/* ─── Inline AI tool note ────────────────────────────────────────────────── */
const AiNote = ({ tool }: { tool: string }) => (
  <span className="fs-ai-note">✦ {tool}</span>
);

/* ─── Data ───────────────────────────────────────────────────────────────── */
const gapMap = [
  { tool: 'Splitwise', receipt: false, ocr: false, tax: false, settle: true },
  { tool: 'Google Pay', receipt: false, ocr: false, tax: false, settle: true },
  { tool: 'Splid', receipt: false, ocr: false, tax: false, settle: true },
  { tool: 'Fair Split', receipt: true, ocr: true, tax: true, settle: true },
];
const gapCols = ['Receipt read', 'OCR confidence', 'Tax/SC math', 'Settlement'];

const constraints = [
  { id: 'C1', label: 'One payer only', detail: 'Named explicitly in the description. If unknown, a flag is raised.' },
  { id: 'C2', label: 'No auth or history', detail: 'One bill in, one split out. No accounts, no saved state.' },
  { id: 'C3', label: 'Strict JSON contract', detail: 'Reconciliation, assumptions, and flags are mandatory fields in the response.' },
  { id: 'C4', label: 'GST logic', detail: 'Tax = GST on (subtotal + service charge − discount). Not just the food total.' },
  { id: 'C5', label: 'Fairness rules', detail: 'Items to the person who ordered. Shared items split equally. Tax proportional to subtotal.' },
  { id: 'C6', label: 'Built in one day', detail: 'The assignment brief was the design brief. Scope was fixed.' },
];

const researchFindings = [
  {
    n: '52%',
    finding: '52% of diners think those who ordered more should pay more. Equal splitting feels unfair to most people.',
    source: 'Credit Karma',
  },
  {
    n: '47%',
    finding: '47% of millennials have paid the entire group bill themselves to avoid awkwardness. The payer is the most stressed person in the flow.',
    source: 'Credit Karma',
  },
  {
    n: '↕',
    finding: 'Indian restaurant bills use layered tax logic. GST applies to subtotal plus service charge, minus any discount — not just the food total. Most splitting tools ignore this.',
    source: 'EasySplits / BankBazaar',
  },
  {
    n: '≈',
    finding: 'OCR accuracy drops significantly on real-world receipts. Blurry photos, handwritten additions, and non-standard layouts cause silent extraction errors.',
    source: 'Klippa',
  },
  {
    n: '∅',
    finding: 'Existing tools like Splitwise, Splid, and Google Pay handle the total, not the full workflow. None of them handle receipt-to-settlement with tax attribution and edit control.',
    source: 'App store reviews',
  },
  {
    n: '↑',
    finding: 'Users who can see the reasoning behind a split trust it more. Showing assumptions and flags matters as much as getting the math right.',
    source: 'NNGroup',
  },
];

const decisionCards = [
  {
    num: '01',
    title: 'Fairness over equality',
    pain: 'Equal splits feel wrong when people ordered different things.',
    evidence: '52% of users say those who ordered more should pay more.',
    decision: 'Item-level and subset attribution. Not a per-head divider.',
  },
  {
    num: '02',
    title: 'Trust over guesswork',
    pain: 'A confident wrong number is worse than no number.',
    evidence: 'Assignment brief named hidden errors as the explicit failure mode.',
    decision: 'Every assumption surfaced. Every flag shown. Nothing silently guessed.',
  },
  {
    num: '03',
    title: 'Speed over process',
    pain: 'This is a short task. Extra screens kill it.',
    evidence: 'Inline editing is 42% faster than modal workflows (Google Material).',
    decision: 'One-page flow. Draft split is the review surface.',
  },
  {
    num: '04',
    title: 'Clear settlement over hidden math',
    pain: "People won't trust a number they can't verify.",
    evidence: 'Trust research: visible reasoning → higher acceptance.',
    decision: 'Reconciliation + copyable summary. Math is always checkable.',
  },
];

const evolutionSteps = [
  { step: '01', label: 'Google Stitch', caption: 'Initial wireframe exploration', src: '/assets/projects/fair-split/images/stitch-wireframe.webp' },
  { step: '02', label: 'Figma cleanup', caption: 'Corrections in Figma', src: '/assets/projects/fair-split/images/figma-screen.webp' },
  { step: '03', label: 'Light mode', caption: 'Final deployed product', src: '/assets/projects/fair-split/images/light-mode.webp' },
  { step: '04', label: 'Dark mode', caption: 'Dark variant', src: '/assets/projects/fair-split/images/dark-mode.webp' },
];

/* Archetype findings — full narrative per archetype */
const archetypeFindings = [
  {
    icon: '💳',
    label: 'The Payer',
    finding: 'The core task worked. Upload, describe, split — the flow completed without errors. The main breakdown was feedback during the 45-second wait. By the time results appeared below the fold, the user had no idea processing was done. The settle-up used "Self" instead of the payer\'s name, which confused recipients when the summary was shared.',
    status: 'partial' as const,
  },
  {
    icon: '🥗',
    label: 'Ordered Less',
    finding: 'The user could find their total, but could not resolve a fairness concern. A dish was auto-assigned to them, flagged in the assumptions section, but there was no direct action to fix it from the flag. They had to scroll to a separate step, find the row, and change a dropdown manually. The connection between the flag and the correction was broken.',
    status: 'partial' as const,
  },
  {
    icon: '🍕',
    label: 'Shared Items',
    finding: 'This was the most satisfied archetype. The split logic worked well, the breakdown was understandable, and the reconciliation confirmed the math. The only friction was a non-actionable "OK" button on flag cards, and unrounded decimal amounts that would be impractical to pay.',
    status: 'good' as const,
  },
  {
    icon: '⚡',
    label: 'Settle Quickly',
    finding: 'The user found their amount fast. The settle-up section was the right destination. The critical failure was "Self" — the payer\'s anonymised label — which appeared in the settle-up summary. The user could not tell who to pay.',
    status: 'partial' as const,
  },
];

/* ═══════════════════════════════════════════════════════════════════════════ */
export default function FairSplitPage({ project, relatedProjects, groupLabel }: FairSplitPageProps) {
  const [openDecision, setOpenDecision] = useState<number | null>(null);
  const toggle = (i: number) => setOpenDecision(openDecision === i ? null : i);

  return (
    <>
      <Head>
        <title>{project.title} – Edwin Meleth</title>
        <meta name="description" content={project.description} />
        <link rel="canonical" href={`https://edwinm.vercel.app/projects/${project.id}`} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://edwinm.vercel.app/projects/${project.id}`} />
        <meta property="og:title" content={`${project.title} – Edwin Meleth`} />
        <meta property="og:description" content={project.description} />
        <meta property="og:image" content={`https://edwinm.vercel.app${project.coverImage}`} />
        <meta property="og:site_name" content="Edwin Meleth Portfolio" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${project.title} – Edwin Meleth`} />
        <meta name="twitter:description" content={project.description} />
        <meta name="twitter:image" content={`https://edwinm.vercel.app${project.coverImage}`} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;1,400&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />

        <style dangerouslySetInnerHTML={{
          __html: `
/* ─── Light-mode tokens (always-on; dark is opt-in via .fs-dark) ────────── */
.fs {
  --paper:    #FAF8F4;
  --ink:      #1C1A16;
  --ink2:     #3C3A34;
  --ink3:     #6C6A62;
  --ink4:     #9C9A90;
  --amber:    #C8883A;
  --amberlt:  #F5E8D5;
  --rule:     #DDD9CF;
  --ruled:    #C4BFB2;
  --surf:     #F2EEE6;
  --surf2:    #E8E3D8;
  --mono:     'IBM Plex Mono', 'Courier New', monospace;
  --sans:     'IBM Plex Sans', system-ui, sans-serif;
  --mw:       860px;
  --gap:      72px;
}
/* ─── Base ──────────────────────────────────────────────────────────────── */
.fs *, .fs *::before, .fs *::after { box-sizing: border-box; margin: 0; padding: 0; }
.fs {
  font-family: var(--sans); background: var(--paper); color: var(--ink);
  line-height: 1.7; -webkit-font-smoothing: antialiased;
}
.fs a { color: inherit; text-decoration: none; }

/* ─── Layout ────────────────────────────────────────────────────────────── */
.fs-w   { max-width: var(--mw); margin: 0 auto; padding: 0 28px; }
.fs-sec { padding: var(--gap) 0; border-top: 1px solid var(--rule); }

/* ─── Rules ─────────────────────────────────────────────────────────────── */
.fs-dash { border: none; border-top: 1px dashed var(--ruled); margin: 28px 0; }
.fs-rule { border: none; border-top: 2px solid var(--ink);   margin: 36px 0; }

/* ─── Section label ──────────────────────────────────────────────────────── */
.fs-lbl {
  font-family: var(--mono); font-size: 9px; font-weight: 500;
  letter-spacing: .22em; text-transform: uppercase; color: var(--amber);
  display: flex; align-items: center; gap: 10px; margin-bottom: 20px;
}
.fs-lbl::after { content: ''; flex: 1; height: 1px; background: var(--rule); }

/* ─── Numbered badge ─────────────────────────────────────────────────────── */
.fs-badge {
  display: inline-flex; align-items: center; justify-content: center;
  width: 22px; height: 22px; border-radius: 50%;
  border: 1px solid var(--ruled); font-family: var(--mono);
  font-size: 9px; font-weight: 600; color: var(--amber); flex-shrink: 0;
}

/* ─── Inline AI note ─────────────────────────────────────────────────────── */
.fs-ai-note {
  display: inline-flex; align-items: center; gap: 4px;
  font-family: var(--mono); font-size: 9px; letter-spacing: .12em;
  text-transform: uppercase; color: var(--ink4);
  background: var(--surf); border: 1px solid var(--ruled);
  padding: 3px 8px; vertical-align: middle; margin-left: 8px;
}

/* ─── Typography ─────────────────────────────────────────────────────────── */
.fs h1 {
  font-family: var(--mono); font-size: clamp(64px, 11vw, 108px);
  font-weight: 600; letter-spacing: -.03em; line-height: .9; color: #fff;
}
.fs h2 {
  font-family: var(--sans); font-weight: 600;
  font-size: clamp(20px, 3.2vw, 28px); color: var(--ink);
  line-height: 1.2; letter-spacing: -.01em; margin-bottom: 14px;
}
.fs h3 {
  font-family: var(--sans); font-weight: 600; font-size: 15px;
  color: var(--ink); line-height: 1.35; margin-bottom: 6px;
}
.fs p  {
  font-size: 15px; color: var(--ink2); line-height: 1.8; margin-bottom: 14px;
}
.fs p:last-child { margin-bottom: 0; }
.fs ul { padding-left: 18px; }
.fs li { font-size: 14px; color: var(--ink2); line-height: 1.7; margin-bottom: 4px; }

/* ═══════════════════════════════════════════════════════════════════════════
   HERO — image behind, text overlay
═══════════════════════════════════════════════════════════════════════════ */
.fs-hero {
  position: relative; min-height: 92vh;
  display: flex; flex-direction: column; justify-content: flex-end;
  overflow: hidden; border-bottom: 2px solid var(--ink);
}
/* Background image layer */
.fs-hero__bg {
  position: absolute; inset: 0;
  background-color: var(--ink);
}
.fs-hero__bg img {
  width: 100%; height: 100%; object-fit: cover; object-position: top;
  display: block; opacity: .72;
}
/* Gradient overlay so text reads on any image */
.fs-hero__gradient {
  position: absolute; inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(28, 26, 22, 0.25) 0%,
    rgba(28, 26, 22, 0.55) 50%,
    rgba(28, 26, 22, 0.90) 100%
  );
}
/* Header tape */
.fs-hero__tape {
  position: absolute; top: 0; left: 0; right: 0; z-index: 2;
  display: flex; justify-content: space-between; align-items: center;
  padding: 20px 28px;
  font-family: var(--mono); font-size: 9px; letter-spacing: .2em;
  text-transform: uppercase; color: rgba(255,255,255,.5);
  border-bottom: 1px dashed rgba(255,255,255,.15);
}
/* Corner watermark */
.fs-hero__corner {
  position: absolute; top: 72px; right: 28px; z-index: 2;
  font-family: var(--mono); font-size: 9px; letter-spacing: .12em;
  text-transform: uppercase; color: rgba(255,255,255,.28);
  line-height: 2; text-align: right;
}
/* Text body sits at the bottom of the hero */
.fs-hero__body {
  position: relative; z-index: 2;
  padding: 120px 28px 56px;
}
.fs-hero__title { margin-bottom: 20px; }
.fs-hero__sub {
  font-family: var(--sans); font-size: clamp(15px, 2vw, 18px);
  color: rgba(255,255,255,.8); max-width: 520px;
  line-height: 1.65; margin-bottom: 32px;
}

/* ─── Meta strip (inside hero — light on dark) ───────────────────────────── */
.fs-metastrip {
  display: grid; grid-template-columns: repeat(3, auto);
  width: fit-content; border: 1px solid rgba(255,255,255,.2);
  margin-bottom: 36px; overflow: hidden;
}
.fs-mi { padding: 12px 18px; border-right: 1px solid rgba(255,255,255,.2); }
.fs-mi:last-child { border-right: none; }
.fs-mk {
  font-family: var(--mono); font-size: 8px; letter-spacing: .2em;
  text-transform: uppercase; color: rgba(255,255,255,.45);
  display: block; margin-bottom: 3px;
}
.fs-mv {
  font-family: var(--sans); font-size: 12px; font-weight: 500;
  color: rgba(255,255,255,.8); line-height: 1.4;
}

/* ─── Stat cluster (inside hero) ────────────────────────────────────────── */
.fs-stats {
  display: grid; grid-template-columns: repeat(4, 1fr);
  border-top: 1px dashed rgba(255,255,255,.2);
  border-bottom: 1px dashed rgba(255,255,255,.2);
}
.fs-stat { padding: 18px 14px; border-right: 1px dashed rgba(255,255,255,.12); }
.fs-stat:last-child { border-right: none; }
.fs-stat__n {
  font-family: var(--mono); font-size: 26px; font-weight: 600;
  color: var(--amber); line-height: 1; margin-bottom: 5px;
  font-variant-numeric: tabular-nums;
}
.fs-stat__l {
  font-family: var(--mono); font-size: 9px; letter-spacing: .08em;
  color: rgba(255,255,255,.5); line-height: 1.4;
}

/* ═══════════════════════════════════════════════════════════════════════════
   ASSIGNMENT CONSTRAINTS BLOCK
═══════════════════════════════════════════════════════════════════════════ */
.fs-given {
  background: var(--surf); border-bottom: 2px solid var(--ink);
}
.fs-given__inner {
  max-width: var(--mw); margin: 0 auto; padding: 32px 28px;
  display: grid; grid-template-columns: 200px 1fr; gap: 32px; align-items: start;
}
.fs-given__left {
  padding-right: 28px; border-right: 1px dashed var(--ruled);
}
.fs-given__tag {
  font-family: var(--mono); font-size: 8px; letter-spacing: .22em;
  text-transform: uppercase; color: var(--amber); display: block; margin-bottom: 8px;
}
.fs-given__heading {
  font-family: var(--sans); font-size: 14px; font-weight: 600;
  color: var(--ink); line-height: 1.3; margin-bottom: 6px;
}
.fs-given__sub {
  font-family: var(--mono); font-size: 10px; color: var(--ink4); line-height: 1.6;
}
.fs-given__grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 0;
}
.fs-given-row {
  display: grid; grid-template-columns: 80px 1fr; gap: 0;
  padding: 10px 0; border-bottom: 1px dashed var(--rule); align-items: baseline;
}
.fs-given-row:nth-child(odd)  { padding-right: 20px; }
.fs-given-row:nth-child(even) { padding-left: 20px; border-left: 1px dashed var(--rule); }
.fs-given-row:nth-last-child(-n+2) { border-bottom: none; }
.fs-given__id {
  font-family: var(--mono); font-size: 9px; font-weight: 600;
  color: var(--amber);
}
.fs-given__label { font-family: var(--sans); font-size: 12px; font-weight: 600; color: var(--ink); margin-bottom: 2px; }
.fs-given__detail { font-size: 11.5px; color: var(--ink3); line-height: 1.5; }

/* ─── JTBD ──────────────────────────────────────────────────────────────── */
.fs-pullquote {
  font-family: var(--sans); font-size: clamp(16px, 2.2vw, 19px);
  font-style: italic; color: var(--ink); line-height: 1.55;
  border-left: 3px solid var(--amber); padding: 18px 24px;
  background: var(--amberlt); margin: 24px 0;
}
.fs-user-block { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 24px; }
.fs-user-card  { border: 1px solid var(--ruled); padding: 16px 18px; display: flex; gap: 12px; align-items: flex-start; }
.fs-user-icon  { font-size: 20px; flex-shrink: 0; line-height: 1; margin-top: 2px; }
.fs-user-card h3 { font-size: 13px; font-weight: 600; margin-bottom: 3px; }
.fs-user-card p  { font-size: 12.5px; color: var(--ink3); margin: 0; line-height: 1.55; }

/* ─── RESEARCH ──────────────────────────────────────────────────────────── */
.fs-findings-list { margin-top: 24px; }
.fs-finding-card {
  display: grid; grid-template-columns: 64px 1fr;
  border: 1px solid var(--ruled); margin-bottom: -1px; /* collapse borders */
  overflow: hidden;
}
.fs-finding-card__num {
  background: var(--surf); border-right: 1px solid var(--ruled);
  display: flex; align-items: center; justify-content: center;
  font-family: var(--mono); font-size: 22px; font-weight: 600;
  color: var(--amber); font-variant-numeric: tabular-nums;
  padding: 18px 8px; line-height: 1;
}
.fs-finding-card__body { padding: 14px 16px; }
.fs-finding-card__text {
  font-size: 13.5px; color: var(--ink2); line-height: 1.7; margin-bottom: 6px;
}
.fs-finding-card__source {
  font-family: var(--mono); font-size: 9px; letter-spacing: .12em;
  text-transform: uppercase; color: var(--ink4);
}

/* gap map */
.fs-gapmap { width: 100%; border-collapse: collapse; margin-top: 24px; font-family: var(--sans); }
.fs-gapmap th {
  font-family: var(--mono); font-size: 8px; letter-spacing: .2em;
  text-transform: uppercase; color: var(--ink4); text-align: left;
  padding: 9px 14px; border-bottom: 2px solid var(--ink); background: var(--surf);
}
.fs-gapmap td {
  padding: 12px 14px; font-size: 13px; color: var(--ink2);
  border-bottom: 1px dashed var(--rule); vertical-align: middle;
}
.fs-gapmap tbody tr:nth-child(even) td { background: var(--surf); }
.fs-gapmap tr:last-child td { border-bottom: none; font-weight: 600; color: var(--amber); }
.fs-gapmap tr:last-child td:first-child { color: var(--ink); }
.fs-dot--y {
  display: inline-flex; align-items: center; justify-content: center;
  width: 20px; height: 20px; border-radius: 50%;
  background: var(--amber); color: #fff; font-size: 10px;
}
.fs-dot--n {
  display: inline-flex; align-items: center; justify-content: center;
  width: 20px; height: 20px; border-radius: 50%;
  background: var(--surf2); color: var(--ink4); font-size: 10px;
}

/* ─── DECISIONS ─────────────────────────────────────────────────────────── */
.fs-dec { border: 1px solid var(--ruled); margin-bottom: 8px; overflow: hidden; }
.fs-dec__head {
  display: flex; align-items: center; gap: 14px; padding: 14px 18px;
  cursor: pointer; background: var(--paper); transition: background .18s;
}
.fs-dec__head:hover { background: var(--surf); }
.fs-dec__head.open  { border-bottom: 1px dashed var(--rule); }
.fs-dec__title { font-family: var(--sans); font-size: 14px; font-weight: 600; color: var(--ink); flex: 1; line-height: 1.3; }
.fs-dec__icon  { color: var(--ink4); flex-shrink: 0; }
.fs-dec__body  {
  padding: 18px; background: var(--surf);
  display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px;
}
.fs-dec__row-lbl {
  font-family: var(--mono); font-size: 8px; letter-spacing: .2em;
  text-transform: uppercase; color: var(--amber); display: block; margin-bottom: 4px;
}
.fs-dec__row-txt { font-size: 13px; color: var(--ink2); line-height: 1.6; }

/* ─── EVOLUTION ─────────────────────────────────────────────────────────── */
.fs-evo { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 24px; }
.fs-evo-card { border: 1px solid var(--ruled); overflow: hidden; }
.fs-evo-card__head {
  display: flex; align-items: center; gap: 10px;
  padding: 10px 14px; border-bottom: 1px dashed var(--rule); background: var(--surf);
}
.fs-evo-card__step  { font-family: var(--mono); font-size: 9px; font-weight: 600; color: var(--amber); }
.fs-evo-card__label { font-family: var(--mono); font-size: 10px; letter-spacing: .12em; text-transform: uppercase; color: var(--ink3); }
/* Portrait image guard: contain so tall images never break layout */
.fs-evo-card__img-wrap {
  overflow: hidden; max-height: 280px;
  display: flex; align-items: flex-start; background: var(--surf2);
}
.fs-evo-card__img-wrap img {
  width: 100%; height: 280px;
  object-fit: contain; object-position: top;
  display: block;
}
.fs-evo-card__img-wrap .fs-ph { min-height: 280px; width: 100%; }
.fs-evo-card__caption { padding: 10px 14px; font-size: 11.5px; color: var(--ink4); font-family: var(--sans); line-height: 1.5; }

/* ─── VALIDATION ─────────────────────────────────────────────────────────── */
.fs-method {
  display: flex; border: 1px solid var(--ruled); margin-bottom: 24px; overflow: hidden;
}
.fs-method__left {
  padding: 20px; background: var(--ink); color: var(--paper);
  min-width: 140px; display: flex; flex-direction: column; gap: 8px;
}
.fs-method__tag   { font-family: var(--mono); font-size: 8px; letter-spacing: .2em; text-transform: uppercase; color: var(--amber); }
.fs-method__title { font-family: var(--sans); font-weight: 600; font-size: 15px; color: #fff; line-height: 1.3; }
.fs-method__right { padding: 20px; flex: 1; }
.fs-method__right p { font-size: 13.5px; color: var(--ink2); margin-bottom: 8px; line-height: 1.7; }

/* Archetype story cards */
.fs-arch-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 20px; }
.fs-arch-card  {
  border: 1px solid var(--ruled); overflow: hidden;
  display: flex; flex-direction: column;
}
.fs-arch-card__head {
  display: flex; align-items: center; gap: 10px;
  padding: 12px 16px; background: var(--surf); border-bottom: 1px solid var(--ruled);
}
.fs-arch-card__icon  { font-size: 18px; }
.fs-arch-card__label { font-family: var(--sans); font-size: 13px; font-weight: 600; color: var(--ink); }
.fs-arch-card__status--good    { margin-left: auto; font-family: var(--mono); font-size: 8px; letter-spacing: .15em; text-transform: uppercase; color: var(--amber); }
.fs-arch-card__status--partial { margin-left: auto; font-family: var(--mono); font-size: 8px; letter-spacing: .15em; text-transform: uppercase; color: var(--ink4); }
.fs-arch-card__body { padding: 14px 16px; flex: 1; }
.fs-arch-card__body p { font-size: 13px; color: var(--ink2); line-height: 1.7; margin: 0; }

/* Where the project ended */
.fs-testing-close {
  border: 1px solid var(--ruled); padding: 16px 20px; margin-top: 20px;
  background: var(--surf); display: flex; gap: 16px; align-items: flex-start;
}
.fs-testing-close__label {
  font-family: var(--mono); font-size: 8px; letter-spacing: .2em;
  text-transform: uppercase; color: var(--ink4); white-space: nowrap; flex-shrink: 0;
  margin-top: 2px;
}
.fs-testing-close__text { font-size: 13px; color: var(--ink2); line-height: 1.7; }

/* ─── BUILD ─────────────────────────────────────────────────────────────── */
.fs-build { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 24px; }
.fs-build-col { border: 1px solid var(--ruled); overflow: hidden; }
.fs-build-col__head {
  font-family: var(--mono); font-size: 9px; letter-spacing: .2em;
  text-transform: uppercase; color: var(--amber); padding: 11px 16px;
  border-bottom: 1px solid var(--ruled); background: var(--surf);
}
.fs-build-col__body { padding: 0; }
.fs-build-row {
  display: flex; align-items: flex-start; gap: 12px;
  padding: 11px 16px; border-bottom: 1px dashed var(--rule);
  font-size: 13.5px; color: var(--ink2); line-height: 1.55;
}
.fs-build-row:last-child { border-bottom: none; }
.fs-build-row::before { content: '›'; color: var(--amber); font-family: var(--mono); flex-shrink: 0; font-size: 14px; }
.fs-tech {
  font-family: var(--mono); font-size: 10px; letter-spacing: .12em;
  text-transform: uppercase; color: var(--ink4);
  border-top: 1px dashed var(--ruled); border-bottom: 1px dashed var(--ruled);
  padding: 14px 0; margin-top: 24px;
}

/* ─── RESULTS ───────────────────────────────────────────────────────────── */
.fs-result-grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 0;
  border: 1px solid var(--ruled); margin-top: 28px; overflow: hidden;
}
.fs-result-card { padding: 20px 16px; border-right: 1px dashed var(--rule); }
.fs-result-card:last-child { border-right: none; }
.fs-result-card__icon  { font-size: 20px; margin-bottom: 8px; display: block; }
.fs-result-card__title { font-family: var(--mono); font-size: 11px; font-weight: 600; color: var(--amber); margin-bottom: 4px; }
.fs-result-card__body  { font-size: 12px; color: var(--ink3); line-height: 1.55; }

/* ─── BULLETS ───────────────────────────────────────────────────────────── */
.fs-bullets { list-style: none; padding: 0; margin-top: 18px; }
.fs-bullets li {
  display: flex; gap: 12px; align-items: flex-start;
  font-size: 14px; color: var(--ink2); padding: 10px 0;
  border-bottom: 1px dashed var(--rule); line-height: 1.65;
}
.fs-bullets li:last-child { border-bottom: none; }
.fs-bullets li::before { content: '—'; color: var(--amber); font-family: var(--mono); flex-shrink: 0; }

/* ─── CONSTRAINT ────────────────────────────────────────────────────────── */
.fs-constraint {
  border: 1px solid var(--ruled); padding: 22px 24px;
  display: grid; grid-template-columns: auto 1fr; gap: 20px; align-items: start;
}
.fs-constraint__num  { font-family: var(--mono); font-size: 36px; font-weight: 600; color: var(--amber); line-height: 1; opacity: .4; }
.fs-constraint__text { font-family: var(--sans); font-size: 15px; color: var(--ink2); line-height: 1.75; }

/* ─── Placeholder ───────────────────────────────────────────────────────── */
.fs-ph {
  background: var(--surf); border: 1px dashed var(--ruled);
  display: flex; align-items: center; justify-content: center;
  padding: 40px 24px; min-height: 200px; position: relative;
}
.fs-ph::before { content: ''; position: absolute; top: 8px; left: 8px; width: 10px; height: 10px; border-top: 1px solid var(--ruled); border-left: 1px solid var(--ruled); }
.fs-ph::after  { content: ''; position: absolute; bottom: 8px; right: 8px; width: 10px; height: 10px; border-bottom: 1px solid var(--ruled); border-right: 1px solid var(--ruled); }
.fs-ph__inner  { font-family: var(--mono); font-size: 11px; letter-spacing: .1em; color: var(--ink4); text-align: center; }
.fs-ph__inner::before { content: '[ img ]'; display: block; font-size: 18px; opacity: .3; margin-bottom: 8px; letter-spacing: 0; }

/* ─── Responsive ────────────────────────────────────────────────────────── */
@media (max-width: 680px) {
  .fs-w { padding: 0 18px; }
  .fs-hero__body { padding: 80px 18px 40px; }
  .fs h1 { font-size: 56px; }
  .fs-stats { grid-template-columns: repeat(2, 1fr); }
  .fs-stat { border-bottom: 1px dashed rgba(255,255,255,.12); }
  .fs-metastrip { grid-template-columns: 1fr; width: 100%; }
  .fs-mi { border-right: none; border-bottom: 1px solid rgba(255,255,255,.15); }
  .fs-mi:last-child { border-bottom: none; }
  .fs-given__inner { grid-template-columns: 1fr; gap: 20px; }
  .fs-given__left { border-right: none; border-bottom: 1px dashed var(--ruled); padding-right: 0; padding-bottom: 20px; }
  .fs-given__grid { grid-template-columns: 1fr; }
  .fs-given-row:nth-child(even) { padding-left: 0; border-left: none; }
  .fs-given-row:nth-last-child(-n+2) { border-bottom: 1px dashed var(--rule); }
  .fs-given-row:last-child { border-bottom: none; }
  .fs-user-block { grid-template-columns: 1fr; }
  .fs-finding-card { grid-template-columns: 52px 1fr; }
  .fs-evo { grid-template-columns: 1fr; }
  .fs-arch-cards { grid-template-columns: 1fr; }
  .fs-build { grid-template-columns: 1fr; }
  .fs-result-grid { grid-template-columns: 1fr 1fr; }
  .fs-dec__body { grid-template-columns: 1fr; }
  .fs-gapmap { display: block; overflow-x: auto; }
  .fs-method { flex-direction: column; }
  .fs-method__left { min-width: 0; }
}
          `
        }} />
      </Head>

      <Navbar />

      {/* Back button */}
      <div className="fixed top-20 left-4 md:left-8 z-[100]">
        <Link href="/projects">
          <span className="inline-flex items-center gap-2 text-xs px-3 py-1.5 border border-[var(--ruled)] bg-[var(--paper)] text-[var(--ink4)] font-mono tracking-widest uppercase hover:bg-[var(--surf)] transition-colors">
            <ArrowLeft className="w-3 h-3" /> Back
          </span>
        </Link>
      </div>

      <div className="fs">

        {/* ════════════════════════════════════════════════════════════════════
            01 · HERO — image + text unified
        ════════════════════════════════════════════════════════════════════ */}
        <section className="fs-hero">
          {/* Background image */}
          <div className="fs-hero__bg">
            <SafeImage
              src="/assets/projects/fair-split/images/dark-light.webp"
              alt="Fair Split live product"
              fallback=""
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
            />
          </div>
          {/* Gradient */}
          <div className="fs-hero__gradient" />

          {/* Tape */}
          <div className="fs-hero__tape">
            <span>CASE STUDY · FAIR SPLIT</span>
            <span>PRODUCT DESIGN + ENGINEERING · 2025</span>
          </div>
          {/* Corner watermark */}
          <div className="fs-hero__corner">
            RECEIPT<br />FORMALISM<br />───<br />2025
          </div>

          {/* Body — overlaid on image */}
          <div className="fs-hero__body">
            <motion.div className="fs-hero__title" variants={fadeInUp} initial="hidden" animate="visible">
              <h1>Fair<br />Split</h1>
            </motion.div>

            <motion.p className="fs-hero__sub" variants={fadeInUp} initial="hidden" animate="visible" transition={{ delay: .08 }}>
              A restaurant bill splitting tool that turns a receipt photo and a plain-English description into a fair, fully reconciled per-person split.
            </motion.p>

            <motion.div className="fs-metastrip" variants={fadeInUp} initial="hidden" animate="visible" transition={{ delay: .13 }}>
              <div className="fs-mi"><span className="fs-mk">Role</span><span className="fs-mv">Product design + design engineering</span></div>
              <div className="fs-mi"><span className="fs-mk">Scope</span><span className="fs-mv">Single bill · no auth · no persistence</span></div>
              <div className="fs-mi"><span className="fs-mk">Built in</span><span className="fs-mv">One day</span></div>
            </motion.div>

            <motion.div className="fs-stats" variants={staggerContainer} initial="hidden" animate="visible">
              {[
                ['1 day', 'Build sprint'],
                ['1 screen', 'No confirmation flow'],
                ['100%', 'Deterministic arithmetic'],
                ['0', 'Silent guesses'],
              ].map(([n, l]) => (
                <motion.div key={l} className="fs-stat" variants={fadeInUp}>
                  <div className="fs-stat__n">{n}</div>
                  <div className="fs-stat__l">{l}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            ASSIGNMENT CONSTRAINTS — shown right after hero
        ════════════════════════════════════════════════════════════════════ */}
        <motion.div className="fs-given" variants={fadeInUp} initial="hidden" animate="visible" transition={{ delay: .18 }}>
          <div className="fs-given__inner">
            <div className="fs-given__left">
              <span className="fs-given__tag">Given constraints</span>
              <div className="fs-given__heading">The assignment brief</div>
              <p className="fs-given__sub">
                These were not design choices — they were the rules of the challenge. The brief defined the problem. Design defined the solution.
              </p>
            </div>
            <div className="fs-given__grid">
              {constraints.map(c => (
                <div key={c.id} className="fs-given-row">
                  <span className="fs-given__id">{c.id}</span>
                  <div>
                    <div className="fs-given__label">{c.label}</div>
                    <div className="fs-given__detail">{c.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ════════════════════════════════════════════════════════════════════
            02 · JTBD / TARGET USER
        ════════════════════════════════════════════════════════════════════ */}
        <section className="fs-sec">
          <div className="fs-w">
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
              <Lbl>Job to be done</Lbl>

              <blockquote className="fs-pullquote">
                "When I'm splitting a restaurant bill with a group, I want to quickly and fairly calculate who owes what so I can settle without arguments, manual math, or chasing people later."
              </blockquote>

              <p>The job is bigger than dividing a total. It includes reading the receipt, parsing who had what, handling shared items, allocating tax correctly, and producing a result the group will trust.</p>

              <hr className="fs-dash" />

              <div style={{ marginBottom: 12 }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--amber)' }}>Target users</span>
              </div>
              <div className="fs-user-block">
                <div className="fs-user-card">
                  <span className="fs-user-icon">💳</span>
                  <div>
                    <h3>Primary — the payer</h3>
                    <p>Holds the bill. Carries the friction. Needs a result fast and a proof they can share.</p>
                  </div>
                </div>
                <div className="fs-user-card">
                  <span className="fs-user-icon">🧾</span>
                  <div>
                    <h3>Secondary — the group</h3>
                    <p>People who ordered less, shared dishes, or just want a number they can verify and pay.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            03 · RESEARCH
        ════════════════════════════════════════════════════════════════════ */}
        <section className="fs-sec">
          <div className="fs-w">
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
              <Lbl>
                Research
                <AiNote tool="Perplexity / Claude" />
              </Lbl>
              <h2>Six findings. One clear gap.</h2>
            </motion.div>

            <motion.div className="fs-findings-list" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
              {researchFindings.map(r => (
                <motion.div key={r.n} className="fs-finding-card" variants={fadeInUp}>
                  <div className="fs-finding-card__num">{r.n}</div>
                  <div className="fs-finding-card__body">
                    <p className="fs-finding-card__text">{r.finding}</p>
                    <span className="fs-finding-card__source">[{r.source}]</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
              <div style={{ marginTop: 36, marginBottom: 14 }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--amber)' }}>Tool gap map</span>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table className="fs-gapmap">
                  <thead>
                    <tr>
                      <th>Tool</th>
                      {gapCols.map(c => <th key={c}>{c}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {gapMap.map(row => (
                      <tr key={row.tool}>
                        <td style={{ fontWeight: row.tool === 'Fair Split' ? 600 : 400 }}>{row.tool}</td>
                        {[row.receipt, row.ocr, row.tax, row.settle].map((v, i) => (
                          <td key={i}>
                            {v
                              ? <span className="fs-dot--y"><Check size={11} /></span>
                              : <span className="fs-dot--n"><X size={11} /></span>
                            }
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            04 · DESIGN DECISIONS
        ════════════════════════════════════════════════════════════════════ */}
        <section className="fs-sec">
          <div className="fs-w">
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
              <Lbl>Design decisions</Lbl>
              <h2>Four principles. Each backed by evidence.</h2>
            </motion.div>

            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
              {decisionCards.map((d, i) => (
                <motion.div key={i} className="fs-dec" variants={fadeInUp}>
                  <div
                    className={`fs-dec__head ${openDecision === i ? 'open' : ''}`}
                    onClick={() => toggle(i)}
                    role="button"
                    aria-expanded={openDecision === i}
                    id={`fs-dec-${i}`}
                  >
                    <Badge n={d.num} />
                    <span className="fs-dec__title">{d.title}</span>
                    <span className="fs-dec__icon">
                      {openDecision === i ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </div>
                  <Collapsible isOpen={openDecision === i}>
                    <div className="fs-dec__body">
                      <div>
                        <span className="fs-dec__row-lbl">Pain</span>
                        <p className="fs-dec__row-txt">{d.pain}</p>
                      </div>
                      <div>
                        <span className="fs-dec__row-lbl">Evidence</span>
                        <p className="fs-dec__row-txt">{d.evidence}</p>
                      </div>
                      <div>
                        <span className="fs-dec__row-lbl">Decision</span>
                        <p className="fs-dec__row-txt">{d.decision}</p>
                      </div>
                    </div>
                  </Collapsible>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            05 · DESIGN EVOLUTION
        ════════════════════════════════════════════════════════════════════ */}
        <section className="fs-sec">
          <div className="fs-w">
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
              <Lbl>
                Design evolution
                <AiNote tool="Google Stitch" />
              </Lbl>
              <h2>Started in Stitch. Cleaned up in Figma. Collapsed into one screen.</h2>
            </motion.div>
          </div>

          <motion.div
            className="fs-evo"
            style={{ maxWidth: 'var(--mw)', margin: '24px auto 0', padding: '0 28px' }}
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
          >
            {evolutionSteps.map(ev => (
              <motion.div key={ev.step} className="fs-evo-card" variants={fadeInUp}>
                <div className="fs-evo-card__head">
                  <span className="fs-evo-card__step">{ev.step}</span>
                  <span style={{ color: 'var(--ruled)', fontSize: 10 }}>·</span>
                  <span className="fs-evo-card__label">{ev.label}</span>
                </div>
                {/* Portrait-safe image wrapper */}
                <div className="fs-evo-card__img-wrap">
                  <SafeImage
                    src={ev.src}
                    alt={ev.label}
                    fallback={ev.label}
                  />
                </div>
                <div className="fs-evo-card__caption">{ev.caption}</div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            06 · VALIDATION
        ════════════════════════════════════════════════════════════════════ */}
        <section className="fs-sec">
          <div className="fs-w">
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
              <Lbl>
                Validation
                <AiNote tool="Claude via Comet browser" />
              </Lbl>
              <h2>AI-assisted simulated usability review. Done after deployment.</h2>

              <div className="fs-method">
                <div className="fs-method__left">
                  <span className="fs-method__tag">Method</span>
                  <span className="fs-method__title">Heuristic eval + AI simulated testing</span>
                </div>
                <div className="fs-method__right">
                  <p>This was not a live user study. I ran a heuristic evaluation and used Claude via Comet to simulate usability testing across four archetypes — after the product was deployed on the same day.</p>
                  <p>The goal was to find what broke, what was unclear, and what to fix next. Not to produce publishable data.</p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
              <div style={{ marginBottom: 14 }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--amber)' }}>What each archetype found</span>
              </div>
              <div className="fs-arch-cards">
                {archetypeFindings.map(a => (
                  <motion.div key={a.label} className="fs-arch-card" variants={fadeInUp}>
                    <div className="fs-arch-card__head">
                      <span className="fs-arch-card__icon">{a.icon}</span>
                      <span className="fs-arch-card__label">{a.label}</span>
                      <span className={a.status === 'good' ? 'fs-arch-card__status--good' : 'fs-arch-card__status--partial'}>
                        {a.status === 'good' ? '✓ Worked well' : '~ Partial'}
                      </span>
                    </div>
                    <div className="fs-arch-card__body">
                      <p>{a.finding}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
              <div className="fs-testing-close">
                <span className="fs-testing-close__label">Where the project ended</span>
                <p className="fs-testing-close__text">
                  No iteration was done after testing. The project was deployed and tested on the same day. These findings close this version and directly inform the next steps below.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            07 · BUILD
        ════════════════════════════════════════════════════════════════════ */}
        <section className="fs-sec">
          <div className="fs-w">
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
              <Lbl>
                Build
                <AiNote tool="Google Antigravity" />
              </Lbl>
              <h2>The model extracts structure. The code handles the math.</h2>
            </motion.div>

            <motion.div className="fs-build" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
              <motion.div className="fs-build-col" variants={fadeInUp}>
                <div className="fs-build-col__head">Frontend</div>
                <div className="fs-build-col__body">
                  {['Receipt upload', 'Description input', 'Inline item editing', 'Live client-side recomputation', 'Final settle-up view'].map(r => (
                    <div key={r} className="fs-build-row">{r}</div>
                  ))}
                </div>
              </motion.div>
              <motion.div className="fs-build-col" variants={fadeInUp}>
                <div className="fs-build-col__head">Backend</div>
                <div className="fs-build-col__body">
                  {['Receipt extraction via Gemini 2.5 Flash', 'Natural-language description parsing', 'Deterministic arithmetic engine', 'Per-person totals, tax share, service share', 'Reconciliation · assumptions · flags · settle-up'].map(r => (
                    <div key={r} className="fs-build-row">{r}</div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            <motion.div className="fs-tech" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
              Python 3 · FastAPI · Uvicorn · Pydantic · Gemini 2.5 Flash · Vanilla JS · Docker · Render · Railway
            </motion.div>

            {/* Deployment strip + live link */}
            <motion.div
              className="fs-deploy"
              variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            >
              <div className="fs-deploy__slots">
                <div className="fs-deploy__slot">
                  <span className="fs-deploy__k">Frontend</span>
                  <span className="fs-deploy__v">Vercel</span>
                </div>
                <div className="fs-deploy__divider" />
                <div className="fs-deploy__slot">
                  <span className="fs-deploy__k">API</span>
                  <span className="fs-deploy__v">Render</span>
                </div>
              </div>
              <a
                href="https://fair-split-kappa.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="fs-deploy__link"
              >
                <span>fair-split-kappa.vercel.app</span>
                <span className="fs-deploy__arrow">↗</span>
              </a>
            </motion.div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            08 · RESULTS
        ════════════════════════════════════════════════════════════════════ */}
        <section className="fs-sec">
          <div className="fs-w">
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
              <Lbl>Result</Lbl>
              <h2>A messy receipt becomes a structured split.</h2>
              <p>The output shows what each person ordered, how shared items were divided, how tax was allocated, whether totals reconcile, and who owes whom. Designed to be checked and forwarded in under a minute.</p>
            </motion.div>

            <motion.div className="fs-result-grid" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
              {[
                { icon: '⚖️', title: 'Fair split', body: 'Item-level + subset attribution' },
                { icon: '✓', title: 'Reconciled', body: 'Sum checked against original bill' },
                { icon: '👁', title: 'Auditable', body: 'Every assumption surfaced' },
                { icon: '📤', title: 'Shareable', body: 'One-tap copy, no login required' },
              ].map(({ icon, title, body }) => (
                <motion.div key={title} className="fs-result-card" variants={fadeInUp}>
                  <span className="fs-result-card__icon">{icon}</span>
                  <div className="fs-result-card__title">{title}</div>
                  <p className="fs-result-card__body">{body}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} style={{ marginTop: 32 }}>
              <SafeImage
                src="/assets/projects/fair-split/images/all-sections.webp"
                alt="Screenshots of all sections"
                fallback="Live product · all sections"
                style={{ border: '1px solid var(--ruled)', minHeight: 240 }}
              />
            </motion.div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            09 · NEXT STEPS
        ════════════════════════════════════════════════════════════════════ */}
        <section className="fs-sec">
          <div className="fs-w">
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
              <Lbl>What's next</Lbl>
              <h2>Two table-side inputs. Both matter.</h2>
              <p>The biggest friction points are both at the table. Typing a description and finding the right photo both take too long in a social setting.</p>

              <hr className="fs-dash" />

              <div style={{ marginBottom: 8 }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--amber)' }}>Primary improvements</span>
              </div>
              <ul className="fs-bullets">
                <li>Voice-to-text for the description — speak who had what instead of typing it</li>
                <li>Direct camera capture as an alternative to file upload — less friction at the table</li>
              </ul>

              <hr className="fs-dash" />

              <div style={{ marginBottom: 8 }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--amber)' }}>Secondary improvements</span>
              </div>
              <ul className="fs-bullets">
                <li>Stronger OCR confidence handling</li>
                <li>Better inline correction controls</li>
                <li>Rounding that's easier to pay</li>
                <li>Flags with direct actions, not just text</li>
                <li>Replace "Self" in settle-up with the payer's actual name</li>
              </ul>
            </motion.div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            10 · CONSTRAINT
        ════════════════════════════════════════════════════════════════════ */}
        <section className="fs-sec">
          <div className="fs-w">
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
              <Lbl>
                Case study writing
              </Lbl>
              <div className="fs-constraint">
                <span className="fs-constraint__num">1</span>
                <p className="fs-constraint__text">
                  This started as a one-day assignment with a strict input/output contract, which kept the scope narrow and the focus on what mattered most: speed, trust, and clear settlement.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            11 · RELATED PROJECTS
        ════════════════════════════════════════════════════════════════════ */}
        <RelatedProjects projects={relatedProjects} groupLabel={groupLabel ?? ''} />

        <Footer />
      </div>
    </>
  );
}
