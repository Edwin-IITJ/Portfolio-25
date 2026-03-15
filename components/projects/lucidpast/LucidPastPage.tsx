import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Navbar from '../../sections/Navbar';
import Footer from '../../sections/Footer';
import FilmGrain from './FilmGrain';
import FadeUp from './FadeUp';
import SectionLabel from './SectionLabel';
import NarrativeSequence from './NarrativeSequence';
import ImageCompare from './ImageCompare';
import PipelineComparison from './PipelineComparison';
import Lightbox from './Lightbox';
import type { Project } from '../../../data/projects';

interface LucidPastPageProps {
  project: Project;
  relatedProjects: Project[]; // intentionally unused internally as per instructions
}

// ----------------------
// Reusable Image Slot
// ----------------------
function ImageSlot({ src, alt, className = "", imgClassName = "object-cover" }: { src: string, alt: string, className?: string, imgClassName?: string }) {
  const [error, setError] = useState(false);
  return (
    <div className={`relative bg-[#D4C4A8] overflow-hidden ${className}`}>
      {/* IMAGE: ${src} */}
      {!error && (
        <Image
          src={src}
          alt={alt}
          fill
          className={imgClassName}
          onError={() => setError(true)}
        />
      )}
    </div>
  );
}

// ----------------------
// Main Page Component
// ----------------------
export default function LucidPastPage({ project }: LucidPastPageProps) {
  const [heroBgError, setHeroBgError] = useState(false);
  const [expandedDecision, setExpandedDecision] = useState<number | null>(null);
  const [expandedSharp, setExpandedSharp] = useState<number | null>(null);
  const [expandedLearning, setExpandedLearning] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const heroVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] } }
  };
  const heroStagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } }
  };

  return (
    <div className="bg-[#F5F0E8] text-[#1A1410] font-display font-light selection:bg-[#8B6F47] selection:text-[#F5F0E8] relative">
      <Head>
        <title>{project.title}  -  Edwin Meleth</title>
        <meta name="description" content={project.description} />
      </Head>

      <FilmGrain />

      {/* Global Navbar */}
      <div className="absolute top-0 w-full z-50 mix-blend-difference">
        <Navbar />
      </div>

      <main>
        {/* 1. HERO */}
        <section className="relative w-full min-h-screen bg-[#0F0B07] flex flex-col justify-end overflow-hidden pb-16 md:pb-24 pt-32 z-10">
          <div className="absolute inset-0 z-0">
            {!heroBgError ? (
              /* IMAGE: /assets/projects/lucid-past/hero/hero.webp */
              <Image
                src="/assets/projects/lucid-past/hero/hero.webp"
                alt="LucidPast Hero"
                fill
                className="object-cover"
                style={{ filter: "sepia(50%) brightness(0.35)" }}
                priority
                onError={() => setHeroBgError(true)}
              />
            ) : (
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1A1410] to-[#0F0B07]" />
            )}
            {/* Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0F0B07_100%)] opacity-80" />
          </div>

          <motion.div
            className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-start"
            variants={heroStagger}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={heroVariants} className="mb-4 md:mb-8 font-sans font-black text-[10px] tracking-[0.3em] uppercase text-[#8B6F47]">
              XR Design / Interaction Research / 2025
            </motion.div>

            <motion.h1 variants={heroVariants} className="font-sans font-black uppercase text-[#F5F0E8] tracking-tight leading-[0.88] mb-6" style={{ fontSize: 'clamp(3.5rem, 11vw, 9rem)' }}>
              LUCID<br />PAST
            </motion.h1>

            <motion.p variants={heroVariants} className="text-[#F5F0E8] text-lg md:text-xl max-w-md mb-12 opacity-90">
              Creating Virtual Dreams from Historical Memory
            </motion.p>

            <motion.div variants={heroVariants} className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-4xl border-t border-[#8B6F47]/30 pt-8">
              <div>
                <div className="font-sans font-black text-[9px] tracking-[0.3em] uppercase text-[#8B6F47] mb-2">Role</div>
                <div className="text-[#F5F0E8] text-sm">Solo XR Designer & Developer</div>
              </div>
              <div>
                <div className="font-sans font-black text-[9px] tracking-[0.3em] uppercase text-[#8B6F47] mb-2">Duration</div>
                <div className="text-[#F5F0E8] text-sm">2-week design sprint</div>
              </div>
              <div>
                <div className="font-sans font-black text-[9px] tracking-[0.3em] uppercase text-[#8B6F47] mb-2">Scope</div>
                <div className="text-[#F5F0E8] text-sm">Proof-of-concept exploration</div>
              </div>
              <div>
                <div className="font-sans font-black text-[9px] tracking-[0.3em] uppercase text-[#8B6F47] mb-2">Output</div>
                <div className="text-[#F5F0E8] text-sm leading-tight">Interaction framework, volumetric pipeline, validation prototype</div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-8 right-8 flex flex-col items-center gap-2 z-10"
          >
            <div className="w-[1px] h-12 bg-gradient-to-b from-[#8B6F47] to-transparent bg-[length:100%_200%] animate-[bg-pan-down_2s_infinite_linear]" />
            <span className="font-sans font-black text-[9px] tracking-[0.3em] uppercase text-[#8B6F47] rotate-90 origin-left translate-x-[4px]">Scroll</span>
          </motion.div>
        </section>

        {/* 2. CONTEXT STRIP */}
        <section className="w-full bg-[#EDE8DC] border-y border-[#D4C4A8] py-8 md:py-12 z-10 relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-lg md:text-2xl opacity-65 leading-relaxed">
            What if exploring history felt like dreaming? Where your curiosity guides the journey, themes emerge organically, and the same starting point leads different people to completely different insights.
          </div>
        </section>

        {/* 3. SECTION 01  -  THE PROBLEM SPACE */}
        <section className="w-full py-24 md:py-32 relative z-10 bg-[#F5F0E8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionLabel number="01" title="The Problem Space" />

            <div className="grid md:grid-cols-5 gap-12 md:gap-24">
              <FadeUp className="md:col-span-2">
                <h3 className="text-3xl font-bold font-sans text-[#1A1410] mb-6">Archives as Unexplored Territory</h3>
                <p className="mb-6 leading-relaxed">
                  The Library of Congress has 12 million digitized photographs spanning 1850-2000. Museums worldwide have similar collections. Yet most remain locked behind keyword search and chronological browsing - interactions designed for librarians, not storytellers.
                </p>
                <blockquote className="font-display italic text-2xl text-[#8B6F47] border-l-2 border-[#8B6F47] pl-6 my-10 leading-snug">
                  XR enables natural, curiosity-driven exploration. But existing museum VR experiences are linear guided tours - just digital versions of audio guides.
                </blockquote>
                <p className="leading-relaxed">
                  The opportunity: This project explores one possible direction - using archival photographs as test domain for attention-driven narrative systems.
                </p>
              </FadeUp>

              <FadeUp className="md:col-span-3" delay={0.2}>
                <div className="border border-[#D4C4A8] p-8 md:p-12 relative bg-[#F5F0E8]">
                  <h4 className="font-sans font-black text-[10px] tracking-[0.3em] uppercase text-[#8B6F47] mb-12">Three core issues I identified</h4>

                  <div className="space-y-12">
                    <div className="relative pl-12 md:pl-16">
                      <span className="absolute left-0 top-[-8px] text-5xl md:text-6xl font-black text-[#D4C4A8] opacity-50 select-none">01</span>
                      <h5 className="font-bold text-lg mb-2">Discovery is broken.</h5>
                      <p className="opacity-80">Users must know what they're looking for before they find it.</p>
                    </div>

                    <div className="relative pl-12 md:pl-16">
                      <span className="absolute left-0 top-[-8px] text-5xl md:text-6xl font-black text-[#D4C4A8] opacity-50 select-none">02</span>
                      <h5 className="font-bold text-lg mb-2">Context is rigid.</h5>
                      <p className="opacity-80">Institutional labels provide single interpretations, missing the richness of diverse perspectives.</p>
                    </div>

                    <div className="relative pl-12 md:pl-16">
                      <span className="absolute left-0 top-[-8px] text-5xl md:text-6xl font-black text-[#D4C4A8] opacity-50 select-none">03</span>
                      <h5 className="font-bold text-lg mb-2">Engagement is shallow.</h5>
                      <p className="opacity-80">People skim thumbnails, not experience photographs as portals into lived history.</p>
                    </div>
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* INTERSTITIAL SECTION - THE INSIGHT */}
        <section className="w-full bg-[#1A1410] text-[#F5F0E8] py-24 md:py-32 relative z-10 selection:bg-[#8B6F47] selection:text-[#1A1410]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
            <SectionLabel title="The Insight" isDark={true} />
            
            <FadeUp>
              <h3 className="font-display italic text-3xl md:text-5xl text-[#F5F0E8] mb-8 leading-snug">
                The brain holds personal memory.<br />
                Archives hold collective memory.
              </h3>
            </FadeUp>
            
            <FadeUp delay={0.2}>
              <h4 className="font-sans font-black text-sm md:text-base tracking-[0.2em] md:tracking-[0.3em] uppercase text-[#8B6F47] mb-12">
                Dreams are how we explore one.<br />
                LucidPast is how we explore the other.
              </h4>
            </FadeUp>
            
            <FadeUp delay={0.3}>
              <p className="text-lg md:text-xl opacity-80 leading-relaxed mb-6 max-w-2xl mx-auto">
                When you dream, your brain does not present memories in chronological order. It follows associations - a face leads to a place leads to a feeling. The result is not chaos. It is meaning, arrived at sideways.
              </p>
            </FadeUp>

            <FadeUp delay={0.4}>
              <p className="text-lg md:text-xl opacity-80 leading-relaxed max-w-2xl mx-auto">
                Archives work the same way. The Library of Congress does not know which photograph will matter to you, or why. Keyword search forces you to already know the answer before you begin. LucidPast replaces the search bar with the dream - letting association, attention, and curiosity do what they have always done best.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* 4. SECTION 02  -  CORE INNOVATION */}
        <section className="w-full bg-[#1A1410] text-[#F5F0E8] py-24 md:py-32 relative z-10 selection:bg-[#8B6F47] selection:text-[#1A1410]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionLabel number="02" title="Core Innovation" isDark={true} />

            <div className="grid md:grid-cols-2 gap-12 md:gap-24 mb-16">
              <FadeUp>
                <h3 className="text-3xl font-bold font-sans text-[#F5F0E8] mb-6">How Dreams Actually Work</h3>
                <p className="mb-6 opacity-80 leading-relaxed">
                  Dreams flow through association - a dog becomes your childhood friend becomes your old house - yet retrospectively reveal coherent patterns. You feel loss, or nostalgia, or anxiety threading through seemingly random shifts.
                </p>
                <p className="text-[#8B6F47] font-bold italic text-xl mb-6">
                  I asked: Can we recreate this algorithmically?
                </p>
              </FadeUp>

              <FadeUp delay={0.2}>
                <h4 className="font-sans font-black text-[10px] tracking-[0.3em] uppercase text-[#8B6F47] mb-8">The system I designed:</h4>
                <ul className="space-y-6 opacity-90">
                  <li className="flex gap-4">
                    <span className="text-[#8B6F47] font-bold">→</span>
                    <p>Your <strong>gaze</strong> reveals unconscious attention (where you look = what interests you)</p>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-[#8B6F47] font-bold">→</span>
                    <p>Each gaze triggers transitions to <strong>semantically related</strong> photographs</p>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-[#8B6F47] font-bold">→</span>
                    <p>A hidden <strong>3-act algorithm</strong> progressively narrows possibilities toward coherent themes</p>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-[#8B6F47] font-bold">→</span>
                    <p>You experience spontaneity; the system ensures meaning</p>
                  </li>
                </ul>
              </FadeUp>
            </div>

            <FadeUp delay={0.3}>
              <ImageSlot
                src="/assets/projects/lucid-past/docs/LucidPast init.webp"
                alt="Black Mirror  -  The Entire History of You reference; Archives as Collective Memory"
                className="w-full aspect-video"
                imgClassName="object-cover"
              />
            </FadeUp>
          </div>
        </section>

        {/* 5. SECTION 03  -  DESIGN ARCHITECTURE */}
        <section className="w-full py-24 md:py-32 relative z-10 bg-[#F5F0E8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionLabel number="03" title="Design System Architecture" />

            <FadeUp>
              <p className="max-w-3xl mb-12 text-lg">
                I broke the experience into three interconnected subsystems. Each solves a specific design challenge.
              </p>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="grid md:grid-cols-3 border-y border-[#D4C4A8] divide-y md:divide-y-0 md:divide-x divide-[#D4C4A8]">
                {/* 3.1 */}
                <div className="p-8">
                  <div className="font-sans font-black text-2xl text-[#8B6F47] mb-4">3.1</div>
                  <h4 className="font-bold text-[#1A1410] mb-5">Persistent Object Transition</h4>
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <span className="font-sans font-black text-[9px] tracking-[0.25em] uppercase text-[#D4C4A8] mt-[3px] shrink-0 w-20">Challenge</span>
                      <p className="text-sm leading-relaxed opacity-80">Environmental changes in VR cause disorientation. How do you morph between completely different scenes without losing the user?</p>
                    </div>
                    <div className="flex gap-3 pt-3 border-t border-[#D4C4A8]">
                      <span className="font-sans font-black text-[9px] tracking-[0.25em] uppercase text-[#8B6F47] mt-[3px] shrink-0 w-20">Solution</span>
                      <p className="text-sm leading-relaxed">The object you gaze at becomes a spatial anchor. Context morphs around it over 6-8 seconds while the anchor remains stable. Research shows maintaining one stable reference point reduces disorientation seamlessly.</p>
                    </div>
                  </div>
                </div>
                {/* 3.2 */}
                <div className="p-8">
                  <div className="font-sans font-black text-2xl text-[#8B6F47] mb-4">3.2</div>
                  <h4 className="font-bold text-[#1A1410] mb-5">Three-Act Progressive Narrowing</h4>
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <span className="font-sans font-black text-[9px] tracking-[0.25em] uppercase text-[#D4C4A8] mt-[3px] shrink-0 w-20">Challenge</span>
                      <p className="text-sm leading-relaxed opacity-80">Pure random exploration becomes meaningless. Pure curation removes agency. How do you balance both?</p>
                    </div>
                    <div className="flex gap-3 pt-3 border-t border-[#D4C4A8]">
                      <span className="font-sans font-black text-[9px] tracking-[0.25em] uppercase text-[#8B6F47] mt-[3px] shrink-0 w-20">Solution</span>
                      <p className="text-sm leading-relaxed">I borrowed three-act structure from screenwriting and applied it algorithmically. The possibility space narrows over 20 minutes from completely open to thematically focused, creating an inevitable yet organic conclusion.</p>
                    </div>
                  </div>
                </div>
                {/* 3.3 */}
                <div className="p-8">
                  <div className="font-sans font-black text-2xl text-[#8B6F47] mb-4">3.3</div>
                  <h4 className="font-bold text-[#1A1410] mb-5">Pathway-Dependent Interpretation</h4>
                  <div className="space-y-3 mb-6">
                    <div className="flex gap-3">
                      <span className="font-sans font-black text-[9px] tracking-[0.25em] uppercase text-[#D4C4A8] mt-[3px] shrink-0 w-20">Challenge</span>
                      <p className="text-sm leading-relaxed opacity-80">The same photograph can reveal labor history, tech innovation, or cultural change. Institutions usually pick one.</p>
                    </div>
                    <div className="flex gap-3 pt-3 border-t border-[#D4C4A8]">
                      <span className="font-sans font-black text-[9px] tracking-[0.25em] uppercase text-[#8B6F47] mt-[3px] shrink-0 w-20">Solution</span>
                      <p className="text-sm leading-relaxed">Applied the Kuleshov Effect. Users approaching the same photograph through different pathways bring different mental frameworks. The system doesn't choose - pathway priming activates different semantic networks unconsciously.</p>
                    </div>
                  </div>
                  <div className="w-full border border-[#D4C4A8] bg-[#EAE3D5] p-2">
                    <img
                      src="/assets/projects/lucid-past/docs/Contextual_Priming.webp"
                      alt="Contextual Priming Diagram"
                      className="w-full h-auto object-contain mix-blend-multiply opacity-90"
                    />
                  </div>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="mt-16 mb-4 text-center max-w-2xl mx-auto">
                <p className="text-sm italic text-[#8B6F47]">
                  Interaction storyboard - 36 panels mapping the full experience flow before implementation.
                </p>
              </div>
              <Lightbox src="/assets/projects/lucid-past/docs/LucidPast_Storyboards.webp" alt="LucidPast Narrative Storyboard">
                <div className="w-full border border-[#D4C4A8] bg-[#F5F0E8] p-2 hover:border-[#8B6F47] transition-colors relative group cursor-zoom-in">
                  <img
                    src="/assets/projects/lucid-past/docs/LucidPast_Storyboards.webp"
                    alt="LucidPast Narrative Storyboard"
                    className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute top-4 right-4 bg-[#8B6F47] text-[#F5F0E8] px-2 py-1 text-[9px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to Enlarge
                  </div>
                </div>
              </Lightbox>
            </FadeUp>

            <FadeUp delay={0.3} className="mt-16 w-full max-w-4xl mx-auto border border-[#D4C4A8]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#D4C4A8] bg-[#EDE8DC] text-[10px] tracking-widest font-sans uppercase text-[#8B6F47]">
                    <th className="p-4 py-3 font-normal">Phase</th>
                    <th className="p-4 py-3 font-normal">Duration</th>
                    <th className="p-4 py-3 font-normal">System Behavior</th>
                    <th className="p-4 py-3 font-normal">User Experience</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-[#D4C4A8]">
                    <td className="p-4 px-4 font-bold">Act 1</td>
                    <td className="p-4 px-4 opacity-70">0-7 min</td>
                    <td className="p-4 px-4 opacity-90">Observes gaze patterns, 100% open</td>
                    <td className="p-4 px-4 italic">"I can go anywhere"</td>
                  </tr>
                  <tr className="border-b border-[#D4C4A8] bg-[#FAF8F5]">
                    <td className="p-4 px-4 font-bold">Act 2</td>
                    <td className="p-4 px-4 opacity-70">7-13 min</td>
                    <td className="p-4 px-4 opacity-90">Narrows to 40% of options matching detected themes</td>
                    <td className="p-4 px-4 italic">"This is getting interesting"</td>
                  </tr>
                  <tr>
                    <td className="p-4 px-4 font-bold">Act 3</td>
                    <td className="p-4 px-4 opacity-70">13-20 min</td>
                    <td className="p-4 px-4 opacity-90">Focuses to 30% of options, clear thematic thread</td>
                    <td className="p-4 px-4 italic">"Oh, this is about..."</td>
                  </tr>
                </tbody>
              </table>
            </FadeUp>
          </div>
        </section>

        {/* 6. SECTION 04  -  INTERACTION DESIGN */}
        <section className="w-full py-24 md:py-32 relative z-10 bg-[#EDE8DC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionLabel number="04" title="Interaction Design" />

            <div className="grid md:grid-cols-2 gap-12 md:gap-24 mb-16">
              <FadeUp>
                <div className="font-sans font-black text-xl text-[#8B6F47] mb-4">4.1</div>
                <h3 className="text-2xl font-bold font-sans text-[#1A1410] mb-6">Gaze as Primary Input</h3>
                <p className="mb-6 leading-relaxed">Why gaze? I evaluated five alternatives:</p>

                <div className="border border-[#D4C4A8] bg-[#F5F0E8] overflow-hidden mb-8">
                  <div className="border-b border-[#D4C4A8] flex p-3"><span className="w-8"></span><span className="opacity-80">Hand controllers → learning curve, breaks immersion</span></div>
                  <div className="border-b border-[#D4C4A8] flex p-3 bg-[#EDE8DC]/50"><span className="w-8"></span><span className="opacity-80">Voice commands → interrupts flow, socially awkward in museums</span></div>
                  <div className="border-b border-[#D4C4A8] flex p-3"><span className="w-8"></span><span className="opacity-80">Hand gestures → requires conscious activation</span></div>
                  <div className="border-b border-[#D4C4A8] flex p-3 bg-[#EDE8DC]/50"><span className="w-8"></span><span className="opacity-80">Head pointing → neck fatigue</span></div>
                  <div className="flex p-3 font-bold bg-[#8B6F47]/10"><span className="w-8"></span><span className="text-[#8B6F47]">Eye tracking → already happening, zero learning curve, reveals unconscious attention</span></div>
                </div>

                <blockquote className="font-display italic text-xl text-[#8B6F47] border-l-2 border-[#8B6F47] pl-4">
                  Dwell time calibration validation: Research shows 300-400ms causes accidental activation ("Midas Touch problem"). Apple Vision Pro standard is 1000ms. I validated this matches user expectations.
                </blockquote>
              </FadeUp>

              <FadeUp delay={0.2}>
                <div className="font-sans font-black text-xl text-[#8B6F47] mb-4">4.2</div>
                <h3 className="text-2xl font-bold font-sans text-[#1A1410] mb-6">Two Interaction Modes</h3>
                <p className="mb-6 leading-relaxed opacity-80">
                  Early concepting revealed a problem: "What if I'm looking at a rendering artifact or examining something out of confusion, not interest?" Solution: Users choose at entry, switch anytime.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="border border-[#D4C4A8] bg-[#F5F0E8] p-5">
                    <h5 className="font-bold text-sm mb-3">Flow Mode</h5>
                    <ul className="text-xs opacity-80 space-y-2 mb-4 list-disc pl-4">
                      <li>For maximum immersion</li>
                      <li>Pure 1-second gaze → automatic transition</li>
                      <li>Minimizes cognitive load</li>
                    </ul>
                    <div className="bg-[#EDE8DC] border border-[#D4C4A8] text-[10px] uppercase tracking-widest text-[#8B6F47] p-2 text-center font-bold">
                      12% false pos. rate
                    </div>
                  </div>

                  <div className="border-2 border-[#8B6F47] bg-[#F5F0E8] p-5 relative">
                    <div className="absolute top-0 right-0 bg-[#8B6F47] text-[#F5F0E8] text-[9px] uppercase tracking-widest px-2 py-1">Default (85%)</div>
                    <h5 className="font-bold text-sm mb-3 mt-1">Intentional Mode</h5>
                    <ul className="text-xs opacity-80 space-y-2 mb-4 list-disc pl-4">
                      <li>1-second gaze + pinch gesture confirmation</li>
                      <li>Explicit gestures don't break flow state</li>
                    </ul>
                    <div className="bg-[#8B6F47]/10 border border-[#8B6F47] text-[10px] uppercase tracking-widest text-[#8B6F47] p-2 text-center font-bold">
                      2% false pos. rate
                    </div>
                  </div>
                </div>
              </FadeUp>
            </div>

            <FadeUp delay={0.3}>
              <Lightbox src="/assets/projects/lucid-past/docs/LucidPast_UserFlow.webp" alt="User Interaction Flow Diagram">
                <div className="w-full bg-[#F5F0E8] border border-[#D4C4A8] p-4 flex justify-center hover:bg-[#EAE3D5] transition-colors">
                  <img
                    src="/assets/projects/lucid-past/docs/LucidPast_UserFlow.webp"
                    alt="User Interaction Flow Diagram"
                    className="w-full h-auto object-contain max-h-[900px]"
                  />
                  <div className="absolute top-4 right-4 bg-[#8B6F47] text-[#F5F0E8] px-2 py-1 text-[9px] font-bold uppercase tracking-widest hidden md:block">
                    Click to Enlarge
                  </div>
                </div>
              </Lightbox>
            </FadeUp>
          </div>
        </section>

        {/* 7. SECTION 05  -  TECHNICAL IMPLEMENTATION */}
        <section className="w-full py-24 md:py-32 relative z-10 bg-[#F5F0E8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionLabel number="05" title="Technical Implementation" />

            <FadeUp>
              <h3 className="text-3xl font-bold font-sans text-[#1A1410] mb-6">Volumetric Reconstruction: Two Approaches Validated</h3>
              <p className="max-w-3xl mb-12 leading-relaxed opacity-90">
                Challenge: Creating explorable 3D environments from single flat photographs without fabricating content beyond what's visible. I validated two fundamentally different pipelines on the same test dataset of 10 diverse archival photographs:
              </p>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="mb-12">
                <h4 className="font-sans font-black text-[10px] tracking-[0.3em] uppercase text-[#8B6F47] mb-6">Model Selection  -  Iterative Validation</h4>
                <div className="flex flex-col md:flex-row items-stretch gap-0 border border-[#D4C4A8] overflow-hidden">
                  <div className="flex-1 p-6 bg-[#EDE8DC] border-b md:border-b-0 md:border-r border-[#D4C4A8] flex flex-col justify-between">
                    <div>
                      <div className="font-sans font-black text-xs text-[#D4C4A8] uppercase tracking-widest mb-2">Round 1  -  Nov 2025</div>
                      <div className="font-bold text-sm text-[#1A1410] mb-2">Depth Anything V2</div>
                      <div className="text-xs opacity-70 leading-relaxed mb-6">Good generalisation across scene types. Soft edges on portraits  -  foreground subjects lacked sharp boundaries. Processing: ~1-2s per image.</div>
                    </div>
                    <div>
                      <div className="relative w-full aspect-[4/3] bg-[#D4C4A8] border border-[#D4C4A8] mb-3">
                        <Image src="/assets/projects/lucid-past/docs/depthanything.webp" alt="Depth Anything V2 Model Output" fill className="object-cover" />
                        <div className="absolute bottom-2 left-2 bg-[#1A1410]/80 text-[#F5F0E8] px-2 py-0.5 text-[9px] uppercase tracking-widest font-bold">Output Map</div>
                      </div>
                      <div className="inline-block bg-[#D4C4A8]/20 border border-[#D4C4A8] text-[9px] uppercase tracking-widest px-2 py-1 font-sans font-black text-[#8B6F47]">Eliminated  -  portrait fidelity insufficient</div>
                    </div>
                  </div>
                  <div className="flex-1 p-6 bg-[#F5F0E8] border-b md:border-b-0 md:border-r border-[#D4C4A8] flex flex-col justify-between">
                    <div>
                      <div className="font-sans font-black text-xs text-[#8B6F47] uppercase tracking-widest mb-2">Round 1 Winner  -  Nov 2025</div>
                      <div className="font-bold text-sm text-[#1A1410] mb-2">Apple Depth Pro</div>
                      <div className="text-xs opacity-70 leading-relaxed mb-6">Metric depth accuracy. Sharp facial boundaries  -  eyes, hair, mouth edges resolved cleanly. Critical for archival portrait content. Processing: ~5-10s per image.</div>
                    </div>
                    <div>
                      <div className="relative w-full aspect-[4/3] bg-[#D4C4A8] border border-[#8B6F47]/30 mb-3">
                        <Image src="/assets/projects/lucid-past/docs/depthpro.webp" alt="Apple Depth Pro Model Output" fill className="object-cover" />
                        <div className="absolute bottom-2 left-2 bg-[#1A1410]/80 text-[#F5F0E8] px-2 py-0.5 text-[9px] uppercase tracking-widest font-bold">Output Map</div>
                      </div>
                      <div className="inline-block bg-[#8B6F47]/10 border border-[#8B6F47]/40 text-[9px] uppercase tracking-widest px-2 py-1 font-sans font-black text-[#8B6F47]">Selected over Depth Anything V2</div>
                    </div>
                  </div>
                  <div className="flex-1 p-6 bg-[#1A1410]">
                    <div className="font-sans font-black text-xs text-[#8B6F47] uppercase tracking-widest mb-2">Round 2  -  Dec 2025</div>
                    <div className="font-bold text-sm text-[#F5F0E8] mb-2">SHARP (Gaussian Splats)</div>
                    <div className="text-xs text-[#F5F0E8]/80 leading-relaxed">Released Dec 2025. Tested on same dataset. Photorealistic splats in under 1 second. Texture fidelity  -  film grain, tonal gradation  -  surpassed Depth Pro mesh output. Ethical constraint enforced architecturally.</div>
                    <div className="mt-3 inline-block bg-[#8B6F47] text-[#F5F0E8] text-[9px] uppercase tracking-widest px-2 py-1 font-sans font-black">Final selection</div>
                  </div>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <PipelineComparison />
            </FadeUp>

            <FadeUp delay={0.2} className="my-16">
              <h4 className="font-sans font-bold text-xl mb-4">Why SHARP produces better results for LucidPast:</h4>
              <div className="space-y-2">
                {([
                  { id: 1, label: '01 / Visual fidelity', body: 'Gaussian Splats preserve fine photographic texture - film grain, tonal gradation, edge softness - that polygon meshes lose during reconstruction. Archival photographs carry their age as meaning. That texture matters.' },
                  { id: 2, label: '02 / XR rendering performance', body: 'Splats render at >100fps on standard GPU vs. mesh-based scenes requiring LOD management. Critical for sustained gaze interaction without frame drops.' },
                  { id: 3, label: '03 / Enforced ethical constraint', body: "SHARP's limited parallax range naturally prevents fabricating viewpoints the original camera never captured - the same constraint I designed into Pipeline A, here enforced architecturally rather than by convention." },
                  { id: 4, label: '04 / Pipeline simplicity', body: 'One step vs. four eliminates three potential failure points and reduces per-image processing from ~20 minutes to under 1 second.' },
                ] as { id: number; label: string; body: string }[]).map((item) => (
                  <div key={item.id} className="border border-[#D4C4A8] bg-[#FAF8F5] transition-all duration-300 hover:border-[#8B6F47]/50">
                    <button
                      className="w-full text-left px-5 py-4 flex justify-between items-center font-sans font-black text-sm text-[#8B6F47] outline-none"
                      onClick={() => setExpandedSharp(expandedSharp === item.id ? null : item.id)}
                    >
                      <span>{item.label}</span>
                      <span className="text-[#8B6F47] text-lg ml-4 font-light shrink-0">
                        {expandedSharp === item.id ? '−' : '+'}
                      </span>
                    </button>
                    <AnimatePresence>
                      {expandedSharp === item.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="px-5 pb-5 text-sm opacity-80 leading-relaxed border-t border-[#D4C4A8] pt-4">{item.body}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={0.3}>
              <div className="max-w-2xl mx-auto">
                <ImageCompare
                  beforeImage="/assets/projects/lucid-past/compare/depthpro.webp"
                  afterImage="/assets/projects/lucid-past/compare/sharp.webp"
                  beforeLabel="Depth Pro Mesh"
                  afterLabel="SHARP Gaussian Splat"
                />
              </div>
            </FadeUp>

            <FadeUp delay={0.4} className="mt-16 p-8 bg-[#EDE8DC] border border-[#D4C4A8]">
              <h5 className="font-bold mb-4">Test dataset validated across extreme conditions:</h5>
              <div className="flex flex-wrap gap-2 text-sm">
                <span className="px-3 py-1 bg-[#F5F0E8] border border-[#D4C4A8]">Close portraits (Migrant Mother, Helen Keller)</span>
                <span className="px-3 py-1 bg-[#F5F0E8] border border-[#D4C4A8]">Crowd scenes (MLK gathering)</span>
                <span className="px-3 py-1 bg-[#F5F0E8] border border-[#D4C4A8]">Unusual lighting (Tesla double exposure)</span>
                <span className="px-3 py-1 bg-[#F5F0E8] border border-[#D4C4A8]">Extreme environments (Aldrin on moon)</span>
                <span className="px-3 py-1 bg-[#F5F0E8] border border-[#D4C4A8]">Interior architecture (1940s diner, radio studio)</span>
              </div>
              <p className="mt-6 text-sm opacity-80 italic">Both pipelines generated convincing 3D across all conditions. SHARP showed measurably superior texture preservation in portrait-heavy content - the dominant image type in institutional archives.</p>
            </FadeUp>

            <FadeUp delay={0.5}>
              <div className="mt-8 p-8 bg-[#1A1410] border border-[#8B6F47]/30">
                <div className="font-sans font-black text-[10px] tracking-[0.3em] uppercase text-[#8B6F47] mb-4">Competitive Validation  -  Why Fabrication Fails</div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h5 className="font-bold text-[#F5F0E8] text-sm mb-3">WorldLabs (marble.worldlabs.ai)  -  Tested</h5>
                    <p className="text-xs text-[#F5F0E8]/70 leading-relaxed mb-4">Single-photo to 360-environment conversion. Tested with Migrant Mother  -  the consistent benchmark image across all pipeline validation. WorldLabs uses AI image generation to approximate and fill invisible areas beyond the camera frame.</p>
                    <p className="text-xs text-[#F5F0E8]/70 leading-relaxed">Result: Migrant Mother's face was completely altered and unrecognisable. The child was removed entirely. The background was fabricated as open ground with multiple trees  -  approximated from the partial background visible in the original.</p>
                  </div>
                  <div>
                    <h5 className="font-bold text-[#8B6F47] text-sm mb-3">The confirmed constraint</h5>
                    <p className="text-xs text-[#F5F0E8]/70 leading-relaxed mb-4">The moment a system generates content beyond the photograph, it loses the historical subject. This is not a technical failure  -  it is a category error. You are no longer showing the archive. You are showing an AI's interpretation of the archive.</p>
                    <div className="border-l-2 border-[#8B6F47] pl-4 mt-4">
                      <p className="text-xs text-[#8B6F47] italic font-display">LucidPast limits parallax to visible content only. What the photographer did not capture, the system does not invent.</p>
                    </div>
                    {/* TODO: Replace this block with side-by-side screenshots once WorldLabs images are available */}
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* 8. SECTION 06  -  THE NARRATIVE SEQUENCE */}
        <section className="w-full py-24 md:py-32 relative z-10 bg-[#1A1410] text-[#F5F0E8] selection:bg-[#8B6F47] selection:text-[#1A1410]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionLabel number="06" title="The Narrative Sequence" isDark={true} />

            <FadeUp>
              <h3 className="text-3xl font-bold font-sans text-[#F5F0E8] mb-6">2D Slideshow Validation</h3>
              <p className="max-w-3xl leading-relaxed opacity-80 mb-12">
                I built a functional slideshow with simulated gaze tracking to validate narrative mechanics before investing in XR implementation. Internal testing showed theme emerged clearly by image 7-8 despite no explicit narration.
              </p>
            </FadeUp>
          </div>

          <FadeUp delay={0.1}>
            <NarrativeSequence />
          </FadeUp>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
            <FadeUp delay={0.3}>
              <p className="font-display italic text-[#8B6F47] text-lg text-center max-w-2xl mx-auto">
                Emergent theme confirmed by image 7-8 without explicit narration. Pivot point felt surprising yet inevitable - the "dream logic" quality I was targeting.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* 9. SECTION 07  -  KEY DESIGN DECISIONS */}
        <section className="w-full py-24 md:py-32 relative z-10 bg-[#F5F0E8]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionLabel number="07" title="Key Design Decisions" />

            <div className="space-y-4">
              {[
                {
                  id: 1,
                  title: 'Decision 1: No Explicit Algorithmic Transparency',
                  body: 'Users never see "similarity scores" or "theme clustering" UI. The algorithm operates invisibly.',
                  rationale: 'Dreams don\'t show you decision trees. Exposing mechanics would shift users from "experiencing" to "gaming the system." Trust in emergence requires opacity.',
                  tradeoff: 'Some users may feel manipulated. Post-experience reflection space reveals their pathway, making the invisible visible retrospectively.'
                },
                {
                  id: 2,
                  title: 'Decision 2: Archival Photos as Content',
                  body: 'Why not 360° videos, volumetric capture, or photogrammetry?',
                  rationale: '1. Authenticity: Institutional archives contain millions of flat photographs, not 360° content. 2. Ubiquity: Solution scales to any museum\'s existing collection. 3. Metaphor: Photographs as "collective memory" parallels dreams drawing from "personal memory".',
                  tradeoff: 'Requires specialized single-image reconstruction pipelines rather than native 3D assets.'
                },
                {
                  id: 3,
                  title: 'Decision 3: 15-20 Minute Sessions',
                  body: 'Why not open-ended exploration?',
                  rationale: 'Peak-end rule (psychology) shows experiences are remembered by peak moments and endings. Constraining duration lets the algorithm guarantee meaningful conclusions. Users can start new sessions with different pathways.',
                  tradeoff: 'Requires stopping a user when they might want to continue, but ensures the narrative loop completes powerfully.'
                }
              ].map((decision, index) => (
                <FadeUp key={decision.id} delay={index * 0.1}>
                  <div className="border border-[#D4C4A8] bg-white transition-all duration-300 hover:border-[#8B6F47]/50">
                    <button
                      className="w-full text-left px-6 py-5 flex justify-between items-center bg-[#EDE8DC] font-bold outline-none"
                      onClick={() => setExpandedDecision(expandedDecision === decision.id ? null : decision.id)}
                    >
                      <span>{decision.title}</span>
                      <span className="text-[#8B6F47] text-xl ml-4 font-light">
                        {expandedDecision === decision.id ? '−' : '+'}
                      </span>
                    </button>
                    <AnimatePresence>
                      {expandedDecision === decision.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="p-6 pt-4 border-t border-[#D4C4A8]">
                            <p className="font-bold mb-3 text-sm opacity-80">{decision.body}</p>
                            <p className="mb-4 text-sm leading-relaxed"><span className="font-bold text-[#8B6F47]">Rationale:</span> {decision.rationale}</p>
                            <p className="text-sm italic opacity-70"><span className="font-semibold not-italic text-[#1A1410]">Trade-off:</span> {decision.tradeoff}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* 10. SECTION 08  -  USER VALIDATION PLACEHOLDER */}
        <section className="w-full py-16 relative z-10 bg-[#EDE8DC]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeUp>
              <div className="border-2 border-dashed border-[#8B6F47]/40 bg-[#F5F0E8]/50 p-12 text-center rounded flex flex-col items-center justify-center min-h-[300px]">
                <div className="inline-block bg-[#8B6F47] text-[#F5F0E8] font-sans font-black tracking-widest text-[9px] uppercase px-3 py-1 mb-6">
                  In Progress
                </div>
                <h3 className="text-2xl font-sans font-bold text-[#1A1410]/50 mb-4">User Validation & Testing</h3>
                <p className="max-w-xl text-center text-sm opacity-60 leading-relaxed italic">
                  This section will be completed after conducting user testing with 3-5 participants following Nielsen Norman Group's qualitative testing guidelines. Content will include testing methodology, key findings on thematic emergence rates, narrative coherence ratings, and representative participant quotes.
                </p>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* 11. SECTION 09  -  OUTCOMES */}
        <section className="w-full py-24 md:py-32 relative z-10 bg-[#F5F0E8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionLabel number="09" title="Outcomes & Reflection" />

            <div className="grid md:grid-cols-2 gap-16 md:gap-24">
              <div className="space-y-16">
                <FadeUp>
                  <h3 className="text-2xl font-bold font-sans text-[#1A1410] mb-8">What This Project Validated</h3>
                  <div className="space-y-4">
                    <div className="border border-[#D4C4A8] bg-white p-6 flex gap-4">
                      <div className="bg-[#8B6F47] rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5"><span className="text-[#F5F0E8] text-xs font-bold"></span></div>
                      <div>
                        <h4 className="font-bold text-sm mb-1 uppercase tracking-wider text-[#8B6F47]">Design Hypothesis</h4>
                        <p className="text-sm opacity-80">Attention-driven sequencing generates emergent themes. Progressive narrowing balances spontaneity with coherence.</p>
                      </div>
                    </div>
                    <div className="border border-[#D4C4A8] bg-white p-6 flex gap-4">
                      <div className="bg-[#8B6F47] rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5"><span className="text-[#F5F0E8] text-xs font-bold"></span></div>
                      <div>
                        <h4 className="font-bold text-sm mb-1 uppercase tracking-wider text-[#8B6F47]">Technical Feasibility</h4>
                        <p className="text-sm opacity-80">Two volumetric pipelines validated. SHARP produces photorealistic splats in &lt;1s, enforcing ethical constraints architecturally.</p>
                      </div>
                    </div>
                    <div className="border border-[#D4C4A8] bg-white p-6 flex gap-4">
                      <div className="bg-[#8B6F47] rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5"><span className="text-[#F5F0E8] text-xs font-bold"></span></div>
                      <div>
                        <h4 className="font-bold text-sm mb-1 uppercase tracking-wider text-[#8B6F47]">Interaction Pattern</h4>
                        <p className="text-sm opacity-80">Persistent object transitions reduce disorientation. Two-mode gaze+gesture system addresses false-positives without breaking flow.</p>
                      </div>
                    </div>
                  </div>
                </FadeUp>

                <FadeUp delay={0.1}>
                  <h3 className="text-2xl font-bold font-sans text-[#1A1410] mb-8">Skills Demonstrated</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-bold text-sm mb-3">Interaction Design</h4>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1.5 bg-[#EDE8DC] text-[11px] font-sans tracking-widest uppercase border border-[#D4C4A8]">Spatial UX</span>
                        <span className="px-3 py-1.5 bg-[#EDE8DC] text-[11px] font-sans tracking-widest uppercase border border-[#D4C4A8]">Multi-modal Input</span>
                        <span className="px-3 py-1.5 bg-[#EDE8DC] text-[11px] font-sans tracking-widest uppercase border border-[#D4C4A8]">Zero-UI Paradigm</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm mb-3">Systems Thinking</h4>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1.5 bg-[#EDE8DC] text-[11px] font-sans tracking-widest uppercase border border-[#D4C4A8]">Algorithm Design</span>
                        <span className="px-3 py-1.5 bg-[#EDE8DC] text-[11px] font-sans tracking-widest uppercase border border-[#D4C4A8]">Semantic Networks</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm mb-3">Technical & Research</h4>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1.5 bg-[#EDE8DC] text-[11px] font-sans tracking-widest uppercase border border-[#D4C4A8]">XR Prototyping</span>
                        <span className="px-3 py-1.5 bg-[#EDE8DC] text-[11px] font-sans tracking-widest uppercase border border-[#D4C4A8]">ML Pipelines</span>
                        <span className="px-3 py-1.5 bg-[#EDE8DC] text-[11px] font-sans tracking-widest uppercase border border-[#D4C4A8]">User Research Validation</span>
                      </div>
                    </div>
                  </div>
                </FadeUp>
              </div>

              <div className="space-y-12">
                <FadeUp delay={0.2}>
                  <h3 className="text-2xl font-bold font-sans text-[#1A1410] mb-6">What I Learned</h3>
                  <div className="space-y-2">
                    {([
                      { id: 1, label: 'About narrative design', body: "The tension between agency and meaning is fundamental to interactive storytelling. This project proves you can let users feel they're authoring their journey while algorithmic structure ensures coherence - applicable to any content discovery system." },
                      { id: 2, label: 'About spatial computing', body: 'Zero-friction inputs (gaze, dwell time) will define next-generation interfaces as controllers disappear. Designing for implicit interaction requires rethinking feedback, confirmation, and error prevention patterns.' },
                      { id: 3, label: 'About technical feasibility', body: "Iterating across two reconstruction pipelines revealed that the right technical choice isn't always the first working one. Pipeline A proved the concept; Pipeline B proved it could be production-viable. Both validations were necessary." },
                    ] as { id: number; label: string; body: string }[]).map((item) => (
                      <div key={item.id} className="border border-[#D4C4A8] bg-white transition-all duration-300 hover:border-[#8B6F47]/50">
                        <button
                          className="w-full text-left px-5 py-4 flex justify-between items-center font-bold text-sm text-[#1A1410] outline-none"
                          onClick={() => setExpandedLearning(expandedLearning === item.id ? null : item.id)}
                        >
                          <span className="text-[#8B6F47]">{item.label}</span>
                          <span className="text-[#8B6F47] text-lg ml-4 font-light shrink-0">
                            {expandedLearning === item.id ? '−' : '+'}
                          </span>
                        </button>
                        <AnimatePresence>
                          {expandedLearning === item.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <p className="px-5 pb-5 text-sm opacity-80 leading-relaxed border-t border-[#D4C4A8] pt-4">{item.body}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </FadeUp>

                <FadeUp delay={0.3}>
                  <div className="p-8 border-l-4 border-[#8B6F47] bg-[#EDE8DC]">
                    <h3 className="text-lg font-bold font-sans text-[#1A1410] mb-4">Future Work</h3>
                    <ol className="list-decimal pl-4 space-y-4 text-sm opacity-90 marker:text-[#8B6F47] marker:font-bold">
                      <li className="pl-2"><strong>Multi-user divergence study:</strong> Test 3 users starting at the same photograph. Do their pathways actually diverge? How different are their emergent themes?</li>
                      <li className="pl-2"><strong>Long-term engagement patterns:</strong> Does discovery vs. exhaustion of novelty hold up over multiple return sessions?</li>
                      <li className="pl-2"><strong>Institutional partnership:</strong> Scale to 500+ photographs with automated semantic tagging via vision-language models and deploy as museum installation.</li>
                    </ol>
                  </div>
                </FadeUp>
              </div>
            </div>
          </div>
        </section>

        {/* 12. FOOTER TRANSITION */}
        <section className="w-full bg-[#0F0B07] py-24 md:py-32 text-center border-t border-[#8B6F47]/20 relative z-20">
          <FadeUp>
            <p className="font-display italic text-3xl md:text-5xl text-[#F5F0E8] max-w-4xl mx-auto px-4 tracking-wide opacity-90 hover:opacity-100 transition-opacity">
              Making history feel like memory
            </p>
          </FadeUp>
        </section>
      </main>

      <div className="relative z-20 bg-white">
        <Footer />
      </div>
    </div>
  );
}
