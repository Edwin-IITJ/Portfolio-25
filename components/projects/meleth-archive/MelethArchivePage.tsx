import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Playfair_Display, EB_Garamond, IBM_Plex_Mono } from 'next/font/google';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../../sections/Navbar';
import Footer from '../../sections/Footer';
import RelatedProjects from '../RelatedProjects';
import HorizontalScrollStrip from '../../shared/HorizontalScrollStrip';
import { type Project } from '../../../data/projects';
import { cn } from '../../../lib/utils';

// Fonts
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
});

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-garamond',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-mono',
});

interface MelethArchivePageProps {
  project: Project;
  relatedProjects: Project[];
}

// -----------------------------------------------------------------------------
// Sub-components
// -----------------------------------------------------------------------------

/**
 * A specialized image component that shows a dark placeholder with a scanline
 * animation if the image is missing or fails to load.
 */
const ArchivalImage = ({
  src,
  alt,
  className,
  height,
  aspectRatio,
  objectPosition = 'center',
  imgClassName,
  label,
  natural = false,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  height?: string;
  aspectRatio?: string;
  objectPosition?: string;
  label?: string;
  natural?: boolean;
}) => {
  const [error, setError] = useState(false);

  return (
    <div
      className={cn("relative overflow-hidden bg-[#0b0906] group", className)}
      style={{
        height: natural ? 'auto' : (aspectRatio ? 'auto' : (height || '480px')),
        aspectRatio: natural ? 'auto' : aspectRatio
      }}
    >
      {!error && src && (
        <Image
          src={src}
          alt={alt}
          fill={!natural}
          width={natural ? 1200 : undefined}
          height={natural ? 800 : undefined}
          style={!natural ? { objectPosition } : { width: '100%', height: 'auto', objectPosition }}
          className={cn(
            "transition-opacity duration-700 opacity-0",
            !natural && (imgClassName || "object-cover"),
            natural && "block"
          )}
          onLoadingComplete={(img) => img.classList.remove('opacity-0')}
          onError={() => setError(true)}
        />
      )}

      {(error || !src) && (
        <div className={cn(
          "flex flex-col items-center justify-center border border-dashed border-[#b8976a]/20",
          natural ? "aspect-[4/3] w-full" : "absolute inset-0"
        )}>
          <div className="absolute top-0 left-0 w-full h-[1px] bg-[#b8976a]/40 animate-scanline" />
          {label && (
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#7a6045] mt-4">
              [ {label} ]
            </span>
          )}
        </div>
      )}
      {label && !error && src && (
        <div className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-widest text-[#d9d0c0] bg-black/40 backdrop-blur-sm px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {label}
        </div>
      )}
    </div>
  );
};

/**
 * Section Label component (e.g., 01 — Origin)
 */
const SectionLabel = ({ text }: { text: string }) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#b8976a] mb-12"
  >
    {text}
  </motion.div>
);

/**
 * Specialized "Lost Photo" component with diagonal hatching
 */
const LostPhotoZone = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="w-full h-[300px] border border-dashed border-[#4a4035] relative flex flex-col items-center justify-center my-16 bg-hatching"
  >
    <div className="font-mono text-[11px] text-[#4a4035] uppercase tracking-[0.15em] mb-4">
      [ Not recovered ]
    </div>
    <div className="font-playfair italic text-[1rem] text-[#b8976a]/20 mb-4 px-8 text-center">
      Photograph of Grandfather's mother & maternal grandparents
    </div>
    <div className="font-mono text-[11px] text-[#4a4035] uppercase tracking-[0.15em]">
      Confirmed absent. No surviving copies known
    </div>
  </motion.div>
);

/**
 * Limitation block for "Honest Assessment"
 */
const LimitationBlock = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="border-l-2 border-[#7a6045] pl-6 py-5 bg-[#b8976a]/[0.04] my-6"
  >
    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#b8976a] mb-3">
      {label}
    </div>
    <div className="font-garamond text-[0.95rem] text-[#d9d0c0] leading-relaxed">
      {children}
    </div>
  </motion.div>
);

// -----------------------------------------------------------------------------
// Main Component
// -----------------------------------------------------------------------------

export default function MelethArchivePage({ project, relatedProjects }: MelethArchivePageProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className={cn(
      "meleth-archive-scope selection:bg-[#b8976a] selection:text-[#0b0906]",
      playfair.variable,
      ebGaramond.variable,
      ibmPlexMono.variable
    )}>
      <Head>
        <title>{project.title} — Edwin Meleth</title>
        <meta name="description" content="An independent photographic archive and field survey preserving vernacular family photography and mid-century social history in Kerala, India (1949-1990s)." />
        <link rel="canonical" href={`https://edwinm.vercel.app/projects/${project.id}`} />

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://edwinm.vercel.app/projects/${project.id}`} />
        <meta property="og:title" content={`${project.title} — Edwin Meleth`} />
        <meta property="og:description" content="An independent photographic archive and field survey preserving vernacular family photography and mid-century social history in Kerala, India (1949-1990s)." />
        <meta property="og:image" content={`https://edwinm.vercel.app${project.coverImage}`} />
        <meta property="og:site_name" content="Edwin Meleth Portfolio" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${project.title} — Edwin Meleth`} />
        <meta name="twitter:description" content="An independent photographic archive and field survey preserving vernacular family photography and mid-century social history in Kerala, India (1949-1990s)." />
        <meta name="twitter:image" content={`https://edwinm.vercel.app${project.coverImage}`} />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "name": project.title,
              "description": "An independent photographic archive and field survey preserving vernacular family photography and mid-century social history in Kerala, India (1949-1990s).",
              "url": `https://edwinm.vercel.app/projects/${project.id}`,
              "about": {
                "@type": "Thing",
                "name": "Vernacular Photography and Mid-century Social History of Kerala, India"
              },
              "creator": {
                "@type": "Person",
                "name": "Edwin Meleth"
              }
            })
          }}
        />
      </Head>

      {/* Fonts & Global Scoped Styles */}
      <style jsx global>{`
        .meleth-archive-scope {
          background-color: #0b0906;
          color: #d9d0c0;
          font-family: var(--font-garamond), serif;
          font-size: 19px;
          line-height: 1.75;
          outline: none;
        }

        .meleth-archive-scope .font-playfair { font-family: var(--font-playfair), serif; }
        .meleth-archive-scope .font-garamond { font-family: var(--font-garamond), serif; }
        .meleth-archive-scope .font-mono { font-family: var(--font-mono), monospace; }

        /* Grain Overlay */
        .meleth-archive-scope::after {
          content: "";
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 9999;
          opacity: 0.045;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }

        @keyframes scanline {
          0% { top: 0; opacity: 0; }
          5% { opacity: 1; }
          95% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scanline {
          animation: scanline 6s linear infinite;
        }

        .bg-hatching {
          background-image: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 8px,
            rgba(74, 64, 53, 0.15) 8px,
            rgba(74, 64, 53, 0.15) 16px
          );
        }

        /* Reading Progress Bar */
        .progress-bar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: #b8976a;
          transform-origin: 0%;
          z-index: 10000;
        }

        /* CSS Counter for Section 8 */
        .retro-list {
          counter-reset: retro-counter;
          list-style: none;
          padding: 0;
        }
        .retro-item {
          counter-increment: retro-counter;
          display: flex;
          align-items: center;
          padding: 1.5rem 0;
          border-bottom: 1px solid rgba(184, 151, 106, 0.15);
        }
        .retro-item::before {
          content: counter(retro-counter, decimal-leading-zero);
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          color: #7a6045;
          margin-right: 2rem;
          width: 2rem;
        }

        /* Layout constraints */
        .content-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .masonry-item {
          break-inside: avoid;
          margin-bottom: 1rem;
        }

        .meleth-archive-scope .hero-text {
          text-shadow: 
            0 0 40px rgba(11,9,6,0.95),
            0 0 80px rgba(11,9,6,0.8),
            0 2px 6px rgba(11,9,6,1);
        }
      `}</style>

      <motion.div className="progress-bar" style={{ scaleX }} />

      <Navbar />

      <div className="fixed top-20 left-4 md:left-8 z-[100] pointer-events-auto">
        <Link href="/projects">
          <motion.div
            className="inline-flex items-center gap-2 text-[#F5F0E8]/70 hover:text-[#F5F0E8] transition-colors cursor-pointer font-sans text-sm"
            whileHover={{ x: -5 }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Projects</span>
          </motion.div>
        </Link>
      </div>

      <main className="pt-20">
        {/* SECTION 0 — Hero */}
        <section className="min-h-screen flex flex-col justify-end pb-24 relative overflow-hidden">
          <div className="absolute inset-0">
            <ArchivalImage
              src="/assets/projects/meleth-archive/docs/DinnerAtTopStation_hero.webp"
              alt="Dinner at Top Station, Munnar, 1955"
              label="Dinner at Top Station, Munnar, 1955"
              imgClassName="object-cover object-top"
              className="w-full h-full"
            />
            {/* Gradient Overlay for Readability */}
            <div
              className="absolute inset-0 pointer-events-none z-[1]"
              style={{
                background: 'linear-gradient(to top, rgba(11,9,6,0.92) 0%, rgba(11,9,6,0.5) 50%, rgba(11,9,6,0.2) 100%)'
              }}
            />
          </div>

          <div className="content-container relative z-10 pt-[55vh]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#b8976a] mb-6 hero-text"
            >
              Independent Archival Survey • Kerala, India
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-playfair font-normal leading-[1.08] mb-8 hero-text"
              style={{ fontSize: 'clamp(2.8rem, 8vw, 5rem)' }}
            >
              Recovering the<br />
              <span className="italic text-[#b8976a]">Meleth Archive</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-garamond italic text-[1.1rem] text-[#7a7060] mb-12 hero-text"
            >
              An independent family photographic survey
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap gap-x-12 gap-y-6 hero-text"
            >
              {[
                { val: "500+", label: "Photographs digitized" },
                { val: "~25", label: "Households visited" },
                { val: "1949", label: "Oldest photograph" },
                { val: "Ongoing", label: "Project status" },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="font-playfair text-[#d9d0c0] text-2xl">{stat.val}</div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-[#7a7060] mt-1">/ {stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* SECTION 1 — Origin */}
        <section className="py-16 md:py-10">
          <div className="content-container">
            <SectionLabel text="01. Origin" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <p>Photographs from the mid-20th century survive not because someone preserved them. They survive because no one threw them away yet.</p>
              <p>In most old Kerala family homes, photos sit in deteriorating albums in cupboards. Termites get to them. Houses get vacated. People move on. By the time anyone thinks to look, they are already gone.</p>
              <p>My grandfather's generation was aging. The houses where these photos lived were being emptied one by one. I was, as far as I could tell, the only person in my family who understood what was about to disappear and felt any urgency about it. So I went looking.</p>
            </motion.div>
          </div>
        </section>

        {/* SECTION 2 — Scope */}
        <section className="py-16 md:py-10 bg-[#111009]/30">
          <div className="content-container">
            <SectionLabel text="02. Scope" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 inline-flex items-center gap-3 px-4 py-1.5 border border-[#b8976a]/35 rounded-full"
            >
              <div className="w-2 h-2 rounded-full bg-[#b8976a] animate-pulse-slow" />
              <span className="font-mono text-[10px] text-[#b8976a] uppercase tracking-widest">Project ongoing since 2023</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8 mb-16"
            >
              <p>Weekends only, around a full-time job, I visited approximately 25 households across multiple branches of my extended family in Kerala. Many of these relatives I had never properly met. Some I had not spoken to in years. I called strangers whose numbers I got through chains of other relatives.</p>
              <p>The project is technically still ongoing. One last album, from an elderly couple living alone whose children all live far away, has not yet been retrieved despite multiple visits over the past 1.5 years.</p>
            </motion.div>

            <div className="columns-2 gap-3 mb-4 space-y-3">
              <div className="masonry-item">
                <ArchivalImage
                  src="/assets/projects/meleth-archive/docs/AmbassadorCrash.webp"
                  alt="Car Accident"
                  label="Car Accident"
                  natural={true}
                  objectPosition="top"
                />
              </div>
              <div className="masonry-item">
                <ArchivalImage
                  src="/assets/projects/meleth-archive/docs/MattupettyDam.webp"
                  alt="Matupetty Dam"
                  label="Matupetty Dam, 1970s"
                  natural={true}
                  objectPosition="top"
                />
              </div>
              <div className="masonry-item">
                <ArchivalImage
                  src="/assets/projects/meleth-archive/docs/TrivandrumZoo.webp"
                  alt="Trivandrum Zoo"
                  label="Trivandrum Zoo, 1970s"
                  natural={true}
                  objectPosition="top"
                />
              </div>
              <div className="masonry-item">
                <ArchivalImage
                  src="/assets/projects/meleth-archive/docs/CapeComorin.webp"
                  alt="Cape Comorin"
                  label="Cape Comori, 1970s"
                  natural={true}
                  objectPosition="top"
                />
              </div>
            </div>
            <div className="font-mono text-[11px] text-[#7a7060] italic mt-4">
              Photographs from the personal collection, 1970s. Locations identifiable, subjects not always so
            </div>
          </div>
        </section>

        {/* ELEPHANT STRIP */}
        <div className="pb-12 content-container">
          <HorizontalScrollStrip
            theme="dark"
            imageWidth={320}
            imageHeight={240}
            caption="My grandfather owned elephants. Fourteen photographs of them survive in the collection — among the most consistently documented subjects across the archive."
            images={[
              { src: "/assets/projects/meleth-archive/docs/Rangan.webp", alt: "Elephant Rangan with mahout Ayyappan", label: "Elephant Rangan" },
              { src: "/assets/projects/meleth-archive/docs/Arjunan.webp", alt: "Elephant Arjunan", label: "Elephant Arjunan" },
              { src: "/assets/projects/meleth-archive/docs/Elephants.webp", alt: "Elephants", label: "Elephants" },
              { src: "/assets/projects/meleth-archive/docs/elephant1.webp", alt: "Elephant", label: "Elephant" },
              { src: "/assets/projects/meleth-archive/docs/Suma1.webp", alt: "Elephant Suma with mahout Janardanan Nair", label: "Elephant Suma with mahout Janardanan Nair" },
              { src: "/assets/projects/meleth-archive/docs/Suma2.webp", alt: "Elephant", label: "" },
              { src: "/assets/projects/meleth-archive/docs/Suma3.webp", alt: "Elephant Suma with mahout Janardanan Nair", label: "Elephant Suma with mahout Janardanan Nair" },
              { src: "/assets/projects/meleth-archive/docs/Suma4.webp", alt: "Elephant Suma with mahout Janardanan Nair", label: "Elephant Suma with mahout Janardanan Nair" },
              { src: "/assets/projects/meleth-archive/docs/Suma5.webp", alt: "Elephant Suma", label: "" },
              { src: "/assets/projects/meleth-archive/docs/Suma6.webp", alt: "Elephant Suma", label: "" }
            ]}
          />
        </div>

        {/* SECTION 3 — Field Methodology */}
        <section className="py-16 md:py-10">
          <div className="content-container">
            <SectionLabel text="03. Field Methodology" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <p>Before each visit I mapped likely survival probability. I tracked which ancestors had owned cameras: one great-uncle had a Rolleiflex; another had access to a photography studio. I prioritised houses where the oldest members still lived, and flagged recently vacated houses as highest risk.</p>

              <div className="py-12 my-12 border-l-2 border-[#b8976a] pl-8">
                <div className="font-playfair italic text-[1.35rem] leading-snug">
                  "Old houses left unoccupied are where photographs go to die."
                </div>
              </div>

              <div className="columns-2 gap-3 mb-4 space-y-3">
                <div className="masonry-item">
                  <ArchivalImage
                    src="/assets/projects/meleth-archive/docs/IndoSwissNursery.webp"
                    alt="Indo-Swiss Nursery"
                    label="Indo-Swiss Nursery"
                    natural={true}
                    objectPosition="top"
                  />
                </div>
                <div className="masonry-item">
                  <ArchivalImage
                    src="/assets/projects/meleth-archive/docs/PeechiGarden.webp"
                    alt="Peechi Garden"
                    label="Peechi Garden"
                    natural={true}
                    objectPosition="top"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 4 — Oral History */}
        <section className="py-16 md:py-10 bg-[#111009]/30">
          <div className="content-container">
            <SectionLabel text="04. Oral History" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <p>At each visit I recorded conversations. The immediate purpose was identification: getting names into file names so that fifty years from now, someone looking at these photos would know who they were looking at. But the recordings became something more.</p>
              <p>These were elderly people, some of whom had never been asked to talk about their own past at any length. The conversations went long. What came out were oral accounts of people and events that exist nowhere else: how people lived, where they went, what a photograph occasion meant to a family in rural Kerala in the 1950s.</p>
              <p>There are 20+ recordings ranging from seconds to hours. The content is mostly family history, but it is the kind of ground-level social history that institutional archives almost never hold.</p>
            </motion.div>
          </div>
        </section>

        {/* SECTION 5 — Digitization Process */}
        <section className="py-16 md:py-10">
          <div className="content-container">
            <SectionLabel text="05. Digitization Process" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="border border-[#b8976a]/35 rounded-sm overflow-hidden mb-12"
            >
              {[
                "HP flatbed scanner, A4 bed, 1200 DPI primary method. A single A4 photograph at this resolution took close to ten minutes per scan.",
                "Outsourced scanning at 600 DPI for materials larger than A4.",
                "Smartphone photography for large framed photographs hung on walls.",
                "Files organised by family branch and generation; identified individuals named in file names.",
                "Backup: local HDD and Dropbox cloud storage.",
                "Key photographs additionally printed and mounted in a new physical album with handwritten labels.",
              ].map((item, i, arr) => (
                <div
                  key={i}
                  className={cn(
                    "flex gap-4 p-[14px_20px] transition-colors hover:bg-[#b8976a]/[0.02]",
                    i !== arr.length - 1 && "border-bottom border-[#b8976a]/15"
                  )}
                  style={{ borderBottom: i !== arr.length - 1 ? '1px solid rgba(184, 151, 106, 0.15)' : 'none' }}
                >
                  <span className="text-[#b8976a] font-mono shrink-0">•</span>
                  <p className="font-mono text-[0.85rem] m-0 text-[#d9d0c0] leading-relaxed">{item}</p>
                </div>
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              The dual-format decision came from a question I kept returning to: what actually survives longer, a digital file or a physical print? There is no clean answer. Both carry different failure modes. So I kept both.
            </motion.p>
          </div>
        </section>

        {/* SECTION 6 — Provenance */}
        <section className="py-16 md:py-10">
          <div className="content-container">
            <SectionLabel text="06. Provenance" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8 mb-16"
            >
              <p>Photographers were identified from album owners recalling who had taken the photos. Studio names were read off stamps and annotations on the reverse of the prints. Not all photographs have known photographers or studios.</p>
            </motion.div>

            {/* Known Photographers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#7a6045] mb-6 flex items-center gap-4">
                <span>Known Photographers</span>
                <span className="flex-1 h-[1px] bg-[#b8976a]/15" />
              </div>
              <ul className="space-y-0">
                {[
                  "K. C. George",
                  "M. J. Babu",
                  "M. P. John",
                  "M. O. Ithappiry",
                  "M. V. Abraham",
                ].map((name, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-baseline gap-4 py-4 border-b border-[#b8976a]/10 group"
                  >
                    <span className="font-mono text-[10px] text-[#4a4035] w-5 shrink-0 group-hover:text-[#7a6045] transition-colors">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-garamond text-[1.05rem] text-[#d9d0c0] tracking-wide">{name}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Studios Register */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#7a6045] mb-6 flex items-center gap-4">
                <span>Studios — from scanned photographs</span>
                <span className="flex-1 h-[1px] bg-[#b8976a]/15" />
              </div>
              <div className="border border-[#b8976a]/20 rounded-sm overflow-hidden">
                {[
                  { name: "Bombay Studio", location: "Muvattupuzha" },
                  { name: "Baboos Studio", location: "Alwaye (Aluva)" },
                  { name: "Ponniah Photo Studio", location: null },
                  { name: "The Little Flower Studio", location: "Kothamangalam" },
                  { name: "Prakash Studio", location: "Perumbavoor" },
                  { name: "Krishnan Nair And Bros", location: "Trichur (Thrissur)" },
                  { name: "Paul Arts Studio", location: "Perumbavoor" },
                  { name: "India Photo House", location: "Trichur (Thrissur)" },
                  { name: "Bombay Studio", location: "Perumbavoor" },
                ].map((studio, i, arr) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className="flex items-center justify-between px-5 py-4 hover:bg-[#b8976a]/[0.03] transition-colors"
                    style={{ borderBottom: i !== arr.length - 1 ? '1px solid rgba(184, 151, 106, 0.10)' : 'none' }}
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-[10px] text-[#4a4035] w-5 shrink-0">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="font-garamond text-[1rem] text-[#d9d0c0]">{studio.name}</span>
                    </div>
                    {studio.location && (
                      <span className="font-mono text-[10px] text-[#7a6045] uppercase tracking-widest">
                        {studio.location}
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 7 — Results */}
        <section className="py-16 md:py-10 bg-[#111009]/30">
          <div className="content-container">
            <SectionLabel text="07. Results" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <p>In most houses the photos were already gone. Termites when old houses were left empty. Discarded during moves. One whole album confirmed and many hanged photos lost, including what may have been the only photograph of my great grandmother, and a photo of a great-uncle taken in Munnar that no one will ever see now.</p>

              <LostPhotoZone />

              <p>The primary goal of this project, recovering photographs of my grandfather's mother and her parents, was not achieved. No such photographs appear to have survived. The survey confirmed their absence rather than their existence.</p>
              <p>What was recovered: the best quality version found of a studio photograph of my great-great-grandparents, previously only known from faded copies; previously unseen photographs of several ancestors; wedding albums across two generations; framed portraits documented across more than a dozen households; and a 1955 photograph from a dinner at Top Station, Munnar, which sits at the edge between family document and historical record.</p>

              {/* <ArchivalImage
                src="/assets/projects/meleth-archive/studio-photo-great-great-grandparents.jpg"
                alt="Studio photo of great-great-grandparents"
                label="Best quality version recovered of studio photograph (previously only known from faded copies)"
                height="320px"
              /> */}

              <div className="py-12 my-12 border-l-2 border-[#b8976a] pl-8">
                <div className="font-playfair italic text-[1.35rem] leading-snug">
                  "The further I went into this, the more I understood I was not racing to collect photos. I was racing against time. And time was winning most of the houses I visited."
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 8 — Honest Assessment */}
        <section className="py-16 md:py-10">
          <div className="content-container">
            <SectionLabel text="08. Honest Assessment" />
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-playfair text-3xl font-normal mb-12"
            >
              What I got wrong
            </motion.h2>

            <LimitationBlock label="Format">
              I saved everything as JPEG. The correct archival format is TIFF, which is lossless, unlike JPEG which compresses and that compression cannot be undone. I did not know this when I started. The files exist and can be converted forward, but the quality ceiling is now fixed by the original JPEG scan. This was a mistake.
            </LimitationBlock>

            <LimitationBlock label="Metadata">
              Identifying information was put in file names rather than embedded as IPTC metadata inside the file. File names can be changed or lost. Embedded metadata travels with the file permanently. This needs to be corrected.
            </LimitationBlock>

            <LimitationBlock label="Physical handling">
              One album was larger than the scanner bed. I cut the photographs out of the album pages, scanned them individually, and pasted them back into a new album preserving the original order. The images were captured and the sequence was preserved. But the original album as a physical object no longer exists, and the physical album itself was archival evidence. That is a loss I cannot undo, even if the photographic content survived.
            </LimitationBlock>
          </div>
        </section>

        {/* SECTION 9 — Retrospective */}
        <section className="py-24 md:py-32 bg-[#111009]/30">
          <div className="content-container">
            <SectionLabel text="09. Retrospective" />
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-playfair text-3xl font-normal mb-12"
            >
              What I would do differently
            </motion.h2>

            <ul className="retro-list">
              {[
                "TIFF from the start, no exceptions",
                "IPTC metadata embedded in the file, not just the file name",
                "Photograph album pages as a unit before ever removing anything",
                "3-2-1 backup: three copies, two different media types, one stored offsite",
                "A proper shared access system for family from the beginning, not ad hoc links",
              ].map((text, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="retro-item font-garamond"
                >
                  {text}
                </motion.li>
              ))}
            </ul>
          </div>
        </section>

        {/* SECTION 10 — Status */}
        <section className="py-24 md:py-32">
          <div className="content-container">
            <SectionLabel text="10. Status" />
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-playfair text-3xl font-normal mb-8"
            >
              Where it stands
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p>The project is technically still ongoing. One last album, from an elderly couple living alone, has not been retrieved despite multiple visits over the past 1.5 years. Until that changes, the survey remains incomplete.</p>
            </motion.div>
          </div>
        </section>

        {/* FOOTER META */}
        <section className="py-16 bg-[#111009]/60 border-t border-[#b8976a]/15">
          <div className="content-container">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 mb-16">
              {[
                { k: "Status", v: "Ongoing since 2023" },
                { k: "Households", v: "~25 visited" },
                { k: "Photographs", v: "500+ digitized" },
                { k: "Period covered", v: "1949 to 1990s" },
                { k: "Location", v: "Kerala, India" },
                { k: "Role", v: "Solo - field work, digitization, oral history" },
              ].map((item, i) => (
                <div key={i}>
                  <div className="font-mono text-[9px] uppercase tracking-widest text-[#7a6045] mb-2">{item.k}</div>
                  <div className="font-garamond text-[0.95rem] text-[#7a7060] leading-tight">{item.v}</div>
                </div>
              ))}
            </div>

            <div className="pt-8 border-t border-[#b8976a]/15">
              <p className="font-garamond italic text-[#7a7060] text-[0.95rem] leading-relaxed">
                This project was the direct origin of <Link href="/projects/lucidpast"><span className="text-[#b8976a] underline underline-offset-4 decoration-[#7a6045] hover:text-[#d9d0c0] cursor-pointer transition-colors">LucidPast</span></Link> , an XR system for navigating institutional photographic archives. The family survey was where I first understood what it means for a photograph to be truly inaccessible. That problem, felt very personally, became the design problem I tried to solve.
              </p>
            </div>
          </div>
        </section>

        {/* Related Projects & Footer */}
        <div className="bg-[#0b0906]">
          <RelatedProjects projects={relatedProjects} groupLabel="Lab Works" />
          <Footer />
        </div>
      </main>
    </div>
  );
}
