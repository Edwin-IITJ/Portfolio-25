'use client';
import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../../sections/Navbar';
import Footer from '../../sections/Footer';
import RelatedProjects from '../RelatedProjects';
import { type Project } from '../../../data/projects';
import MediaRenderer from '../MediaRenderer';
import Lightbox from '../lucidpast/Lightbox';
import ImageCompare from '../lucidpast/ImageCompare';

interface AamPageProps {
  project: Project;
  relatedProjects: Project[];
  groupLabel?: string;
}




const SafeImage = ({ src, alt, fallback, className = "", aspect = "auto" }: { src: string, alt: string, fallback: string, className?: string, aspect?: string }) => {
  const [error, setError] = useState(false);
  const aspectClass = aspect === "16/9" ? "aspect-16-9" : aspect === "4/3" ? "aspect-4-3" : "";

  if (error) return (
    <div className={`ph ${className} ${aspectClass}`} style={{ height: aspect !== 'auto' ? '100%' : undefined }}>
      {fallback}
    </div>
  );

  return (
    <div className={aspectClass} style={{ overflow: 'hidden', borderRadius: 'var(--rm)' }}>
      <img
        src={src}
        alt={alt}
        className={className}
        style={{ width: '100%', height: 'auto', display: 'block' }}
        onError={() => setError(true)}
      />
    </div>
  );
};

const Collapsible = ({ isOpen, children, className = "" }: { isOpen: boolean, children: React.ReactNode, className?: string }) => (
  <AnimatePresence initial={false}>
    {isOpen && (
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
        style={{ overflow: 'hidden' }}
        className={className}
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
);

const AamPage: React.FC<AamPageProps> = ({ project, relatedProjects, groupLabel }) => {
  const [expandedHeuristic, setExpandedHeuristic] = useState<number | null>(null);
  const [expandedRedesign, setExpandedRedesign] = useState<Set<number>>(new Set<number>());
  const [expandedPhilosophy, setExpandedPhilosophy] = useState(false);
  const [expandedReflection, setExpandedReflection] = useState(false);

  const toggleRedesign = (id: number) => {
    const next = new Set(expandedRedesign);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setExpandedRedesign(next);
  };
  return (
    <>
      <Head>
        <title>Aam Case Study</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{
          __html: `
	   
          .aam-scope {
            --y:#F5C400;--yd:#C9A000;--yl:#FFF3B0;
            --gd:#1A2E1A;--gm:#2D5016;--gl:#4A7C2F;--gp:#EAF2E3;
            --or:#FF6B2B;
            --cr:#F2EDE3;--cm:#EDECE0;
            --wh:#FFFFFF;
            --ink:#1A2E1A;--inks:#3D503D;--inkm:#7A8C7A;
            --fh:'Syne',sans-serif;
            --fb:'DM Sans',sans-serif;
            --r:8px;--rm:16px;--rl:24px;
            --mw:900px;--gap:72px;
            
            font-family: var(--fb);
            background: var(--cr);
            color: var(--ink);
            line-height: 1.7;
            -webkit-font-smoothing: antialiased;
          }
          .aam-scope *, .aam-scope *::before, .aam-scope *::after { box-sizing: border-box; margin: 0; padding: 0; }
														  
		   
          .aam-scope img { display: block; width: 100%; height: auto; border-radius: var(--rm); object-fit: contain; }
          .aam-scope .aspect-16-9 { aspect-ratio: 16 / 9; }
          .aam-scope .aspect-4-3 { aspect-ratio: 4 / 3; }
          .aam-scope a { color: inherit; text-decoration: none; }
          .aam-scope .w { max-width: var(--mw); margin: 0 auto; padding: 0 32px; }
          .aam-scope .sec { padding: var(--gap) 0; }
          .aam-scope .lbl { font-family: var(--fh); font-weight: 700; font-size: 10px; letter-spacing: .16em; text-transform: uppercase; color: var(--gl); display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
																	  
																			   
																			   
		   
								   
																	
		   
          .aam-scope .lbl--lt { color: var(--y); }
          .aam-scope h1.hero__title { font-family: var(--fh); font-weight: 900; font-size: clamp(80px, 13vw, 132px); color: var(--wh); line-height: .88; letter-spacing: -.03em; margin-bottom: 28px; text-shadow: 0 8px 48px rgba(26,46,26,.3); }
									 
													 
												
																	   
																		   
		   
						 
													 
											  
          .aam-scope h2 { font-family: var(--fh); font-weight: 700; font-size: clamp(26px, 4vw, 38px); color: var(--ink); line-height: 1.15; letter-spacing: 0.01em; margin-bottom: 20px; }
		   
						 
																	  
          .aam-scope h3 { font-family: var(--fh); font-weight: 700; font-size: 18px; color: var(--ink); line-height: 1.3; margin-bottom: 10px; }
		   
						 
          .aam-scope h4 { font-family: var(--fh); font-weight: 700; font-size: 14px; color: var(--ink); margin-bottom: 6px; }
												  
		   
          .aam-scope p { font-size: 15.5px; color: var(--inks); line-height: 1.8; margin-bottom: 16px; }
          .aam-scope p:last-child { margin-bottom: 0; }
          .aam-scope ul { padding-left: 20px; margin-bottom: 16px; }
          .aam-scope li { font-size: 15px; color: var(--inks); line-height: 1.75; margin-bottom: 6px; }
							
																	   
          .aam-scope .hero { position: relative; background: var(--y); min-height: 94vh; display: flex; flex-direction: column; justify-content: flex-end; overflow: hidden; }
		   
          .aam-scope .hero__bg { position: absolute; inset: 0; z-index: 0; }
          .aam-scope .hero__bg img { width: 100%; height: 100%; object-fit: cover; border-radius: 0; }
								  
													 
          .aam-scope .hero__grad { position: absolute; inset: 0; z-index: 1; background: linear-gradient(160deg, rgba(245,196,0,.06) 0%, rgba(245,196,0,0) 35%, rgba(26,46,26,.74) 100%); }
		   
          .aam-scope .hero__body { position: relative; z-index: 2; padding: 0 56px 56px; max-width: 780px; }
          .aam-scope .hero__tag { display: inline-flex; align-items: center; background: var(--y); color: var(--gd); font-family: var(--fh); font-weight: 700; font-size: 10px; letter-spacing: .14em; text-transform: uppercase; padding: 6px 16px; border-radius: 999px; margin-bottom: 20px; }
																							  
																							 
																									
		   
          .aam-scope .hero__sub { font-size: 17px; color: rgba(255,255,255,.88); max-width: 460px; line-height: 1.65; }
								  
																  
          .aam-scope .hero__meta { position: relative; z-index: 2; background: var(--gd); padding: 22px 56px; display: flex; gap: 0; flex-wrap: wrap; }
          .aam-scope .hmi { display: flex; flex-direction: column; gap: 3px; padding-right: 40px; margin-right: 40px; border-right: 1px solid rgba(255,255,255,.1); }
						   
															
													
														 
		   
          .aam-scope .hmi:last-child { border-right: none; margin-right: 0; padding-right: 0; }
						   
																	 
          .aam-scope .hmk { font-family: var(--fh); font-weight: 800; font-size: 9px; letter-spacing: .14em; text-transform: uppercase; color: var(--y); }
		   
          .aam-scope .hmv { font-size: 13px; color: rgba(255,255,255,.8); }
          .aam-scope .problem { background: var(--gd); padding: var(--gap) 0; }
          .aam-scope .problem h2 { color: var(--wh); }
          .aam-scope .problem p { color: rgba(255,255,255,.72); }
								 
														  
          .aam-scope .prob-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; margin-top: 40px; align-items: start; }
		   
								 
																	  
          .aam-scope .prob-stmt { font-family: var(--fh); font-weight: 700; font-size: 20px; color: var(--y); line-height: 1.55; border-left: 3px solid var(--y); padding-left: 22px; }
		   
								 
																			   
          .aam-scope .name-card { background: var(--y); border-radius: var(--rl); padding: 44px 48px; display: grid; grid-template-columns: auto 1fr; gap: 48px; align-items: center; margin-top: 60px; }
		   
						   
													 
												
          .aam-scope .ncw { font-family: var(--fh); font-weight: 900; font-size: clamp(72px, 10vw, 104px); color: var(--gd); line-height: 1; letter-spacing: -.04em; }
		   
          .aam-scope .ncdefs { display: flex; flex-direction: column; gap: 20px; }
          .aam-scope .ncdef { border-left: 3px solid var(--gd); padding-left: 18px; }
							
																	  
          .aam-scope .ncdl { font-family: var(--fh); font-weight: 700; font-size: 10px; text-transform: uppercase; letter-spacing: .1em; color: var(--gm); margin-bottom: 4px; }
		   
          .aam-scope .ncdt { font-size: 15px; color: var(--gd); line-height: 1.55; margin: 0; font-weight: 600; }
          .aam-scope .pcards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 36px; }
						  
          .aam-scope .pc { background: var(--wh); border: 1.5px solid var(--cm); border-radius: var(--rm); padding: 26px 20px; position: relative; overflow: hidden; }
																	 
		   
								 
          .aam-scope .pc::after { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px; background: var(--y); }
		   
          .aam-scope .pc__jp { font-family: var(--fh); font-weight: 900; font-size: 34px; color: var(--y); line-height: 1; margin-bottom: 8px; }
          .aam-scope .pc__nm { font-family: var(--fh); font-weight: 700; font-size: 15px; color: var(--ink); margin-bottom: 2px; }
          .aam-scope .pc__en { font-size: 11px; font-weight: 700; color: var(--inkm); text-transform: uppercase; letter-spacing: .1em; margin-bottom: 12px; }
          .aam-scope .pc p { font-size: 13.5px; color: var(--inks); line-height: 1.65; margin-bottom: 12px; }
								
																			  
          .aam-scope .pc__rule { background: var(--cr); border-radius: var(--r); padding: 9px 13px; font-size: 12.5px; font-weight: 700; color: var(--gm); font-family: var(--fh); }
		   
						  
															
          .aam-scope .rc { background: var(--gp); border-radius: var(--rm); border-left: 4px solid var(--gl); padding: 18px 22px; margin-top: 20px; }
		   
          .aam-scope .rc p { font-size: 13.5px; color: var(--gm); margin: 0; line-height: 1.65; }
          .aam-scope .rc strong { font-weight: 700; color: var(--gd); }
          .aam-scope .ph { background: var(--cm); border-radius: var(--rm); border: 2px dashed #ccc9b4; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; color: var(--inkm); font-family: var(--fh); font-weight: 700; font-size: 12px; text-align: center; padding: 24px; }
																						
																								
																				   
															   
		   
          .aam-scope .ph::before { content: '[ img ]'; font-size: 18px; opacity: .4; }
          .aam-scope .ph.ph--tall { min-height: 440px; }
          .aam-scope .ph.ph--med { min-height: 300px; }
          .aam-scope .ph.ph--sh { min-height: 200px; }
          .aam-scope [class*="aspect-"] { min-height: 0 !important; }
          .aam-scope .env-g { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 24px; }
          .aam-scope .env-g--stack { display: flex; flex-direction: column; gap: 32px; margin-top: 24px; }
							 
																   
          .aam-scope .env-n { background: var(--cm); border-left: 4px solid var(--y); border-radius: 0 var(--r) var(--r) 0; padding: 16px 20px; margin-top: 20px; }
		   
          .aam-scope .env-n p { font-size: 13.5px; color: var(--inks); margin: 0; font-style: italic; }
							  
          .aam-scope .gcards { display: grid; grid-template-columns: repeat(auto-fill, minmax(155px, 1fr)); gap: 14px; margin-top: 28px; }
										
		   
						  
          .aam-scope .gc { background: var(--wh); border: 1.5px solid var(--cm); border-radius: var(--rm); padding: 22px 18px; display: flex; flex-direction: column; gap: 10px; }
																				 
		   
								
																				
          .aam-scope .gc__icon { width: 44px; height: 44px; background: var(--y); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; }
		   
          .aam-scope .gc__action { font-family: var(--fh); font-weight: 700; font-size: 13px; color: var(--ink); line-height: 1.3; }
          .aam-scope .gc__desc { font-size: 12.5px; color: var(--inkm); line-height: 1.55; margin: 0; }
          .aam-scope .gc--hl { border-color: var(--or); background: rgba(255, 107, 43, .04); }
          .aam-scope .gc--hl .gc__icon { background: var(--or); }
          .aam-scope .ibadge { display: inline-flex; align-items: center; gap: 8px; background: var(--gd); color: var(--y); font-family: var(--fh); font-weight: 700; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; padding: 8px 18px; border-radius: 999px; margin-bottom: 24px; }
																										
																							
																									
		   
							
									 
          .aam-scope .idiv { width: 100%; height: 2px; background: linear-gradient(90deg, var(--y), transparent); margin: var(--gap) 0 0; border: none; }
												 
		   
          .aam-scope .pilot-list { display: flex; flex-direction: column; gap: 12px; margin-top: 24px; }
						  
																					 
          .aam-scope .pi { display: flex; gap: 16px; align-items: flex-start; background: var(--wh); border: 1.5px solid var(--cm); border-radius: var(--rm); padding: 18px 20px; }
		   
							  
															 
          .aam-scope .pi-dot { width: 10px; height: 10px; background: var(--or); border-radius: 50%; flex-shrink: 0; margin-top: 7px; }
		   
          .aam-scope .pi p { font-size: 14px; color: var(--inks); margin: 0; line-height: 1.65; }
							 
          .aam-scope .strip { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px; margin-top: 24px; }
          .aam-scope .strip figure { margin: 0; display: flex; flex-direction: column; }
          .aam-scope .strip figcaption { font-family: var(--fh); font-weight: 700; font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--inkm); text-align: center; margin-top: 6px; }
          .aam-scope .strip img, .aam-scope .strip .ph { border-radius: var(--r); }
          .aam-scope .ba-wrap { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 20px; background: var(--cr); border: 1.5px solid var(--cm); border-radius: var(--rm); padding: 20px; }
          .aam-scope .ba-item { position: relative; }
          .aam-scope .ba-label, .aam-scope .ic-label { position: absolute; top: 16px; left: 16px; background: var(--gd); color: var(--y); padding: 8px 18px; border-radius: 999px; font-family: var(--fh); font-weight: 700; font-size: 10px; letter-spacing: .12em; text-transform: uppercase; z-index: 2; line-height: 1; }
          .aam-scope .ba-label--after, .aam-scope .ic-label--after { left: auto; right: 16px; color: var(--gd); background: var(--y); }
          .aam-scope .flow-wrap { background: var(--gd); border-radius: var(--rl); overflow: hidden; margin-top: 24px; }
          .aam-scope .flow-wrap img { border-radius: 0; }
          .aam-scope .hgrid { display: flex; flex-direction: column; gap: 16px; margin-top: 28px; }
						  
          .aam-scope .hi { background: var(--wh); border-radius: var(--rm); border: 1.5px solid var(--cm); overflow: hidden; }
															
		   
						  
														  
          .aam-scope .hh { display: flex; align-items: center; gap: 14px; padding: 16px 20px; border-bottom: 1.5px solid var(--cm); }
		   
						   
																			   
														  
          .aam-scope .sev { display: inline-flex; align-items: center; justify-content: center; width: 26px; height: 26px; border-radius: 50%; font-family: var(--fh); font-weight: 700; font-size: 11px; flex-shrink: 0; }
		   
          .aam-scope .sev3 { background: #E53333; color: #fff; }
          .aam-scope .sev2 { background: var(--or); color: #fff; }
          .aam-scope .sev1 { background: var(--gl); color: #fff; }
          .aam-scope .htitle { font-family: var(--fh); font-weight: 700; font-size: 14px; color: var(--ink); }
          .aam-scope .hbody { padding: 16px 20px; }
          .aam-scope .hbody p { font-size: 13.5px; color: var(--inks); margin-bottom: 10px; line-height: 1.65; }
							 
																			   
          .aam-scope .hfind { background: var(--gp); border-radius: var(--r); padding: 10px 14px; font-size: 13px; font-weight: 600; color: var(--gm); font-family: var(--fh); margin-top: 10px; }
		   
          .aam-scope .qtable { width: 100%; border-collapse: collapse; margin-top: 28px;background: #fff; border: 1.5px solid var(--cm); border-radius: var(--r); overflow: hidden; }
          .aam-scope .qtable th { font-family: var(--fh); font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: .1em; color: var(--inkm); padding: 10px 16px; text-align: left; border-bottom: 2px solid var(--cm); }
																	  
																				
																					 
		   
								 
																	
          .aam-scope .qtable td { padding: 18px 16px; font-size: 14px; color: var(--inks); border-bottom: 1px solid var(--cm); vertical-align: middle; }
          .aam-scope .qtable tbody tr:nth-child(even) {
            background: var(--cr);
          }
		   
          .aam-scope .qtable tr:last-child td { border-bottom: none; }
          .aam-scope .qsig { display: inline-flex; align-items: center; gap: 6px; font-family: var(--fh); font-weight: 700; font-size: 13px; }
          .aam-scope .qsig--pos { color: var(--gl); }
          .aam-scope .qsig--str { color: var(--gm); }
          .aam-scope .qsig--neu { color: var(--inkm); }
          .aam-scope .qdot { width: 13px; height: 13px; border-radius: 50%; }
          .aam-scope .qdot--pos { background: var(--gl); }
          .aam-scope .qdot--str { background: var(--y); }
          .aam-scope .qdot--neu { background: var(--cm); }
          .aam-scope .future-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-top: 32px; }
          .aam-scope .fcard { background: var(--wh); border: 1.5px solid var(--cm); border-radius: var(--rm); padding: 24px 20px; }
          .aam-scope .fcard__num { font-family: var(--fh); font-weight: 700; font-size: 32px; color: var(--y); line-height: 1; margin-bottom: 10px; }
		   
          .aam-scope .fcard h4 { font-size: 15px; margin-bottom: 6px; }
          .aam-scope .fcard p { font-size: 13.5px; color: var(--inks); line-height: 1.6; margin: 0; }
          .aam-scope .refl { background: var(--gd); border-radius: var(--rl); padding: 48px; margin-top: 0; }
          .aam-scope .refl p { color: rgba(255, 255, 255, .75); font-size: 15.5px; }
          .aam-scope .refl h3 { color: var(--y); margin-bottom: 16px; }
          @media(max-width:700px){
            .aam-scope .hero__body{padding:0 24px 40px}
            .aam-scope .hero__meta{padding:18px 24px}
            .aam-scope .w{padding:0 20px}
																		 
            .aam-scope .prob-grid,.aam-scope .pcards,.aam-scope .env-g,.aam-scope .ba-wrap,.aam-scope .future-grid,.aam-scope .name-card{grid-template-columns:1fr}
										 
			 
            .aam-scope .gcards{grid-template-columns:repeat(2,1fr)}
            .aam-scope .hero__title{font-size:72px}
          }
        `}} />
      </Head>

      <Navbar />

      <div className="fixed top-20 left-4 md:left-8 z-[100] pointer-events-auto">
        <Link href="/projects">
          <span className="inline-flex items-center gap-2 bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-all cursor-pointer font-sans text-sm px-3 py-1.5 rounded-full">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Projects</span>
          </span>
        </Link>
      </div>

      <div className="aam-scope">

        {/* HERO */}
        <section className="hero">
          <div className="hero__bg">
            <img src="/assets/projects/aam-vr/docs/aam_hero.webp" alt="Mango tree in VR environment" />
          </div>
          <div className="hero__grad"></div>
          <div className="hero__body">
            <div className="hero__tag">XR Design • Usability Engineering</div>
            <h1 className="hero__title">aam</h1>
            <p className="hero__sub">A VR experience that puts the harvest back in your hands. Designed for the city person with no tree.</p>
          </div>
          <div className="hero__meta">
            <div className="hmi"><span className="hmk">Role</span><span className="hmv">Solo Designer</span></div>
            <div className="hmi"><span className="hmk">Course</span><span className="hmv">Usability Engineering, IIT Jodhpur</span></div>
            <div className="hmi"><span className="hmk">Duration</span><span className="hmv">3 Weeks • 2025</span></div>
            <div className="hmi"><span className="hmk">Platform</span><span className="hmv">Meta Quest 3 (hand tracking)</span></div>
            <div className="hmi"><span className="hmk">Tools</span><span className="hmv">Unreal Engine 5 • Figma</span></div>
          </div>
        </section>

        {/* PROBLEM */}
        <section className="problem">
          <div className="w">
            <div className="lbl lbl--lt">The Problem</div>
            <h2>Not about the fruit. About the feeling of waiting for it.</h2>
            <div className="prob-grid">
              <p className="prob-stmt">For many who grew up near a fruit tree, mango season was a daily routine: check the tree, note the colour, decide it needs one more day. Anticipation building slowly until plucking felt earned. For most urban Indians, that relationship is gone. The mango arrives pre-sorted in a supermarket net bag. The ritual is not part of the transaction.</p>
              <div>
                <p>Aam asks whether VR can reconstruct the feeling of tending toward a tree, not just the visual presence of one. The goal is not to simulate eating a mango. It is to simulate having a tree to return to.</p>
              </div>
            </div>
            <div className="name-card">
              <div className="ncw">aam</div>
              <div className="ncdefs">
                <div className="ncdef">
                  <div className="ncdl">Hindi: noun</div>
                  <p className="ncdt">Mango. The most culturally embedded fruit in the Indian subcontinent, referenced in the Vedas and in Mughal court poetry alike.</p>
                </div>
                <div className="ncdef">
                  <div className="ncdl">Hindi: adjective</div>
                  <p className="ncdt">Ordinary. Common. As in <em>aam aadmi</em>, the common person. This experience is built for the city person with no garden.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DESIGN PHILOSOPHY */}
        <section className="sec">
          <div className="w">
            <div className="lbl">Design Philosophy</div>
            <h2>Three principles. Used as constraints, not decoration.</h2>
            <p>These three principles from Japanese aesthetics were applied as hard constraints on every environment and interaction decision. The logic is the same as Zen gardens and bonsai: the act of tending is the practice, not a means to an end.</p>
            <div className="pcards">
              <div className="pc">
                <div className="pc__jp">簡素</div>
                <div className="pc__nm">Kanso</div>
                <div className="pc__en">Simplicity</div>
                <p>Every element earns its presence. If it does not serve the user's task, it does not exist in the scene.</p>
                <div className="pc__rule">One tree. One island. No score overlay on the world.</div>
              </div>
              <div className="pc">
                <div className="pc__jp">自然</div>
                <div className="pc__nm">Shizen</div>
                <div className="pc__en">Naturalness</div>
                <p>The environment should feel unhurried and organically placed. No game-UI chrome bleeding into the world.</p>
                <div className="pc__rule">Teleportation over free movement. No menu overlays mid-scene.</div>
              </div>
              <div className="pc">
                <div className="pc__jp">余白</div>
                <div className="pc__nm">Ma / Yohaku</div>
                <div className="pc__en">Intentional empty space</div>
                <p>Empty space is not a failure to fill. It is the reason the tree reads as the focal point.</p>
                <div className="pc__rule">Sparse scene. Wide dome. Silence as a design choice.</div>
              </div>
             <div className="rc" style={{ marginTop: 20, cursor: 'pointer' }} onClick={() => setExpandedPhilosophy(!expandedPhilosophy)}>
              <p><strong>Research backing {expandedPhilosophy ? '↑' : '↓'}</strong></p>
            </div>
            <Collapsible isOpen={expandedPhilosophy}>
              <div className="rc" style={{ marginTop: 8 }}>
                <p>Minimalist layouts grounded in Kanso reduce self-reported stress by 22–35% and improve cognitive focus through reduced visual distraction, directly aligned with Aam's goal of a calm, unhurried experience. (Transcultural Zen Design Frameworks, 2025)</p>
              </div>
              <div className="rc" style={{ marginTop: 12 }}>
                <p>The Home Room follows the same logic. It is a threshold, not a lobby. Borrowing from liminal design theory, which treats transitional spaces as sites of emotional priming, it was designed so that arriving at the tree feels like a small event rather than a direct load. Attention Restoration Theory (Kaplan and Kaplan) identifies soft fascination, effortless bottom-up attention, as the mechanism by which natural environments reduce mental fatigue. VR nature research has confirmed this transfers: digital forest-bathing studies have found stress and fatigue reductions comparable to real forest exposure.</p>
              </div>
            </Collapsible>

            </div>
          </div>
        </section>

        {/* ENVIRONMENT */}
        <section className="sec" style={{ paddingTop: 0 }}>
          <div className="w">
            <div className="lbl">Building the World</div>
            <h2>Environment design in Unreal Engine 5</h2>
                        <div className="env-g--stack">
              <SafeImage src="/assets/projects/aam-vr/docs/Iteration1/it1_env1.webp" alt="Environment model plan" fallback="Environment model & plan" />
              <SafeImage src="/assets/projects/aam-vr/docs/Iteration1/it1_env2.webp" alt="UE5 environment screenshots" fallback="UE5 environment screenshots" aspect="16/9" />
            </div>
          </div>
        </section>

        {/* IDEATION */}
        <section className="sec" style={{ paddingTop: 0 }}>
          <div className="w">
            <div className="lbl">Ideation</div>
            <h2>Sketches & early concepts</h2>
            <div className="env-g">
              <SafeImage src="/assets/projects/aam-vr/docs/ideation.webp" alt="Initial ideation sketches" fallback="Ideation sketches, world concepts" className="ph--med" />
              <SafeImage src="/assets/projects/aam-vr/docs/interactions.webp" alt="Interaction ideation sketches" fallback="Interaction and gesture sketches" className="ph--med" />
            </div>
          </div>
        </section>

        {/* INTERACTIONS */}
        <section className="sec" style={{ paddingTop: 0 }}>
          <div className="w">
            <div className="lbl">Interaction Design</div>
            <h2>No controllers. Gestures that feel like memory.</h2>
            <p>Hand tracking on Meta Quest 3. All gestures within a natural arm arc, no raised arms, no overhead reach.</p>
            <div className="gcards">
              <div className="gc">
                <div className="gc__icon">▶</div>
                <div className="gc__action">Forefinger tap</div>
                <p className="gc__desc">Select. Mirrors the physical click, the most universal learned action</p>
              </div>
              <div className="gc">
                <div className="gc__icon">●</div>
                <div className="gc__action">Forefinger hold</div>
                <p className="gc__desc">Pluck / harvest. Sustained grip signals sustained intention, prevents accidental harvest</p>
              </div>
              <div className="gc">
                <div className="gc__icon">◀</div>
                <div className="gc__action">Middle finger tap</div>
                <p className="gc__desc">Cancel / deselect. Fast one-handed escape without navigating a menu</p>
              </div>
              <div className="gc gc--hl">
                <div className="gc__icon">↻</div>
                <div className="gc__action">Wrist rotation</div>
                <p className="gc__desc">Reverse time / undo. Mime winding a watch dial and the world rewinds. Mangoes return to branches.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ITERATION 1 */}
        <hr className="idiv" />
        <section className="sec">
          <div className="w">
            <div className="ibadge">Iteration 1</div>
            <div className="lbl">First Build</div>
            <h2>The pole mechanic, and why it failed.</h2>
            <p>The first iteration established the dome, island, and tree. The harvest mechanic used a physical pole, accurate to how mangoes are harvested in India (a long bamboo pole with a cloth bag at the end). Authentic on paper.</p>
            <div className="env-g--stack">
              <Lightbox src="/assets/projects/aam-vr/docs/Iteration1/it1_userflow.webp" alt="Iteration 1 user flow">
                <SafeImage src="/assets/projects/aam-vr/docs/Iteration1/it1_userflow.webp" alt="Iteration 1 user flow" fallback="Iter 1 user flow" />
              </Lightbox>
            </div>
            <div className="strip">
              <figure>
                <SafeImage src="/assets/projects/aam-vr/docs/Iteration1/it1_ss1.webp" alt="Initial Entry Door" fallback="Screenshot" className="ph--sh" aspect="16/9" />
                <figcaption>Initial Entry Door</figcaption>
              </figure>
              <figure>
                <SafeImage src="/assets/projects/aam-vr/docs/Iteration1/it1_ss2.webp" alt="Indoor Orientation" fallback="Screenshot" className="ph--sh" aspect="16/9" />
                <figcaption>Indoor Orientation</figcaption>
              </figure>
              <figure>
                <SafeImage src="/assets/projects/aam-vr/docs/Iteration1/it1_ss3.webp" alt="Mango Tree View" fallback="Screenshot" className="ph--sh" aspect="16/9" />
                <figcaption>Mango Tree View</figcaption>
              </figure>
              <figure>
                <SafeImage src="/assets/projects/aam-vr/docs/Iteration1/it1_ss4.webp" alt="Pole Harvesting Mechanic" fallback="Screenshot" className="ph--sh" aspect="16/9" />
                <figcaption>Pole Harvesting Mechanic</figcaption>
              </figure>
              <figure>
                <SafeImage src="/assets/projects/aam-vr/docs/Iteration1/it1_ss5.webp" alt="Raycast Selection" fallback="Screenshot" className="ph--sh" aspect="16/9" />
                <figcaption>Raycast Selection</figcaption>
              </figure>
              <figure>
                <SafeImage src="/assets/projects/aam-vr/docs/Iteration1/it1_ss6.webp" alt="Interaction Instructions" fallback="Screenshot" className="ph--sh" aspect="16/9" />
                <figcaption>Interaction Instructions</figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* PILOT STUDY */}
        <section className="sec" style={{ paddingTop: 0 }}>
          <div className="w">
            <div className="lbl">Pilot Study</div>
            <p>Screen-based Figma prototype using UE5 captures, a recognised method for surfacing spatial usability issues without a native VR build. Participants were given context and tasked with plucking a mango and returning to the Home Room. Real-world interactions do not transfer 1:1 to VR: the pole's weight, haptics, and spatial anchoring that make it intuitive in reality are absent in virtual space.</p>
            <div className="pilot-list">
              <div className="pi"><div className="pi-dot"></div><p>Pole mechanic was immediately confusing, did not behave as expected from the gesture or visual feedback.</p></div>
              <div className="pi"><div className="pi-dot"></div><p>No exit, undo, or home option anywhere. Users felt locked in.</p></div>
              <div className="pi"><div className="pi-dot"></div><p>Selection → zoom → cancel flow was broken and unrecoverable without assistance.</p></div>
              <div className="pi"><div className="pi-dot"></div><p>Several interactions were never discovered, completely invisible to a first-time user.</p></div>
              <div className="pi"><div className="pi-dot"></div><p>Spatial path from entry to tree added confusion rather than orientation.</p></div>
            </div>
          </div>
        </section>

        {/* ITERATION 2 */}
        <hr className="idiv" />
        <section className="sec">
          <div className="w">
            <div className="ibadge">Iteration 2</div>
            <div className="lbl">The Rebuild</div>
            <h2>Rebuilt from the pilot findings up.</h2>
            <p>Pole mechanic removed. Interaction model rebuilt around direct forefinger hold.A Home Room added as a threshold space before the tree dome, designed to prime anticipation before the experience begins. Teleportation anchors path-ordered. Selection and cancel flow rebuilt with explicit visual state cues.</p>
            <div className="env-g--stack">
              <SafeImage src="/assets/projects/aam-vr/docs/Iteration2/it2_env.webp" alt="Iteration 2 environment model" fallback="Iter 2 environment model & plan" aspect="16/9" />
              <Lightbox src="/assets/projects/aam-vr/docs/Iteration2/it2_userflow.webp" alt="Iteration 2 user flow">
                <SafeImage src="/assets/projects/aam-vr/docs/Iteration2/it2_userflow.webp" alt="Iteration 2 user flow" fallback="Iter 2 user flow" />
              </Lightbox>
            </div>
            <p style={{ marginTop: 24 }}>Figma prototype screens (23 screens), built from UE5 environment captures to simulate the spatial layout for usability testing:</p>
            <div className="strip" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))' }}>
              <figure>
                <Lightbox src="/assets/projects/aam-vr/docs/Iteration2/it2_ss3.webp" alt="Home Room">
                  <SafeImage src="/assets/projects/aam-vr/docs/Iteration2/it2_ss3.webp" alt="Home Room" fallback="Home Room" className="ph--sh" />
                </Lightbox>
                <figcaption>Home Room</figcaption>
              </figure>
              <figure>
                <Lightbox src="/assets/projects/aam-vr/docs/Iteration2/it2_ss7.webp" alt="Diagetic Instructions">
                  <SafeImage src="/assets/projects/aam-vr/docs/Iteration2/it2_ss7.webp" alt="Diagetic Instructions" fallback="Diagetic Instructions" className="ph--sh" />
                </Lightbox>
                <figcaption>Diagetic Instructions</figcaption>
              </figure>
              <figure>
                <Lightbox src="/assets/projects/aam-vr/docs/Iteration2/it2_ss7.webp" alt="Ray towards door">
                  <SafeImage src="/assets/projects/aam-vr/docs/Iteration2/it2_ss7.webp" alt="Ray towards door" fallback="Ray towards door" className="ph--sh" />
                </Lightbox>
                <figcaption>Ray towards door</figcaption>
              </figure>
              <figure>
                <Lightbox src="/assets/projects/aam-vr/docs/Iteration2/it2_ss8.webp" alt="Opening door">
                  <SafeImage src="/assets/projects/aam-vr/docs/Iteration2/it2_ss8.webp" alt="Opening door" fallback="Opening door" className="ph--sh" />
                </Lightbox>
                <figcaption>Opening door</figcaption>
              </figure>
              <figure>
                <Lightbox src="/assets/projects/aam-vr/docs/Iteration2/it2_ss9.webp" alt="Teleportation anchors">
                  <SafeImage src="/assets/projects/aam-vr/docs/Iteration2/it2_ss9.webp" alt="Teleportation anchors" fallback="Teleportation anchors" className="ph--sh" />
                </Lightbox>
                <figcaption>Teleportation anchors</figcaption>
              </figure>
              <figure>
                <Lightbox src="/assets/projects/aam-vr/docs/Iteration2/it2_ss13.webp" alt="Snapping ray casts">
                  <SafeImage src="/assets/projects/aam-vr/docs/Iteration2/it2_ss13.webp" alt="Snapping ray casts" fallback="Snapping ray casts" className="ph--sh" />
                </Lightbox>
                <figcaption>Snapping ray casts</figcaption>
              </figure>
              <figure>
                <Lightbox src="/assets/projects/aam-vr/docs/Iteration2/it2_ss15.webp" alt="Examining ripeness">
                  <SafeImage src="/assets/projects/aam-vr/docs/Iteration2/it2_ss15.webp" alt="Examining ripeness" fallback="Examining ripeness" className="ph--sh" />
                </Lightbox>
                <figcaption>Examining ripeness</figcaption>
              </figure>
              <figure>
                <Lightbox src="/assets/projects/aam-vr/docs/Iteration2/it2_ss16.webp" alt="Plucking mango">
                  <SafeImage src="/assets/projects/aam-vr/docs/Iteration2/it2_ss16.webp" alt="Plucking mango" fallback="Plucking mango" className="ph--sh" />
                </Lightbox>
                <figcaption>Plucking mango</figcaption>
              </figure>
              <figure>
                <Lightbox src="/assets/projects/aam-vr/docs/Iteration2/it2_ss19.webp" alt="Mango falling into basket">
                  <SafeImage src="/assets/projects/aam-vr/docs/Iteration2/it2_ss19.webp" alt="Mango falling into basket" fallback="Mango falling into basket" className="ph--sh" />
                </Lightbox>
                <figcaption>Mango falling into basket</figcaption>
              </figure>
              <figure>
                <Lightbox src="/assets/projects/aam-vr/docs/Iteration2/it2_ss21.webp" alt="Undo time reverse">
                  <SafeImage src="/assets/projects/aam-vr/docs/Iteration2/it2_ss21.webp" alt="Undo time reverse" fallback="Undo / time reverse" className="ph--sh" />
                </Lightbox>
                <figcaption>Undo time reverse</figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* HEURISTIC EVALUATION */}
        <section className="sec" style={{ paddingTop: 0 }}>
          <div className="w">
            <div className="lbl">Heuristic Evaluation</div>
            <h2>Three evaluators. Six heuristics with findings.</h2>
            <p>Three evaluators tested the Iteration 2 prototype independently against Nielsen's 10 Usability Heuristics.</p>
            <div className="hgrid">
              <div className="hi">
                <div className="hh" style={{ cursor: 'pointer' }} onClick={() => setExpandedHeuristic(expandedHeuristic === 0 ? null : 0)}>
                  <span className="sev sev2">2</span>
                  <span className="htitle">1. Visibility of System Status</span>
                  <span style={{ marginLeft: 'auto', fontSize: '11px', fontWeight: 700, opacity: 0.6, textTransform: 'uppercase' }}>{expandedHeuristic === 0 ? 'Hide' : 'Details'}</span>
                </div>
                <div className="hbody">
                  <Collapsible isOpen={expandedHeuristic === 0}>
                    <p>Streak counter only visible in Home Room, not during the experience. Dialogue boxes not clear enough. A progress indicator would help orientate users.</p>
                  </Collapsible>
                  <div className="hfind">Heuristic 1 Summary: Persistent indicators needed throughout.</div>
                </div>
              </div>
              <div className="hi">
                <div className="hh" style={{ cursor: 'pointer' }} onClick={() => setExpandedHeuristic(expandedHeuristic === 1 ? null : 1)}>
                  <span className="sev sev2">2</span>
                  <span className="htitle">2. Match Between System and Real World</span>
                  <span style={{ marginLeft: 'auto', fontSize: '11px', fontWeight: 700, opacity: 0.6, textTransform: 'uppercase' }}>{expandedHeuristic === 1 ? 'Hide' : 'Details'}</span>
                </div>
                <div className="hbody">
                  <Collapsible isOpen={expandedHeuristic === 1}>
                    <p>Terminology familiar but basket should be interactable. Text too small and low contrast to read comfortably in prototype.</p>
                  </Collapsible>
                  <div className="hfind">Heuristic 2 Summary: Interaction metaphors need strengthening.</div>
                </div>
              </div>
              <div className="hi">
                <div className="hh" style={{ cursor: 'pointer' }} onClick={() => setExpandedHeuristic(expandedHeuristic === 2 ? null : 2)}>
                  <span className="sev sev3">3</span>
                  <span className="htitle">3. User Control and Freedom (Critical)</span>
                  <span style={{ marginLeft: 'auto', fontSize: '11px', fontWeight: 700, opacity: 0.6, textTransform: 'uppercase' }}>{expandedHeuristic === 2 ? 'Hide' : 'Details'}</span>
                </div>
                <div className="hbody">
                  <Collapsible isOpen={expandedHeuristic === 2}>
                    <p>No exit, home, or undo option anywhere in the experience. All three evaluators flagged this at Severity 3. The most consistent finding across all evaluators.</p>
                  </Collapsible>
                  <div className="hfind">Heuristic 3 Summary: Major gap. No escape from unwanted states.</div>
                </div>
              </div>
              <div className="hi">
                <div className="hh" style={{ cursor: 'pointer' }} onClick={() => setExpandedHeuristic(expandedHeuristic === 3 ? null : 3)}>
                  <span className="sev sev1">1</span>
                  <span className="htitle">4. Consistency and Standards</span>
                  <span style={{ marginLeft: 'auto', fontSize: '11px', fontWeight: 700, opacity: 0.6, textTransform: 'uppercase' }}>{expandedHeuristic === 3 ? 'Hide' : 'Details'}</span>
                </div>
                <div className="hbody">
                  <Collapsible isOpen={expandedHeuristic === 3}>
                    <p>Diegetic in-world instruction signs at the start are inconsistent with the non-diegetic instruction style used elsewhere in the system.</p>
                  </Collapsible>
                  <div className="hfind">Heuristic 4 Summary: One inconsistency, isolated to onboarding.</div>
                </div>
              </div>
              <div className="hi">
                <div className="hh" style={{ cursor: 'pointer' }} onClick={() => setExpandedHeuristic(expandedHeuristic === 4 ? null : 4)}>
                  <span className="sev sev1">1</span>
                  <span className="htitle">5. Recognition Rather Than Recall</span>
                  <span style={{ marginLeft: 'auto', fontSize: '11px', fontWeight: 700, opacity: 0.6, textTransform: 'uppercase' }}>{expandedHeuristic === 4 ? 'Hide' : 'Details'}</span>
                </div>
                <div className="hbody">
                  <Collapsible isOpen={expandedHeuristic === 4}>
                    <p>Onboarding screen present but incomplete. Plucking gesture not included. Deselect gesture not re-surfaced after onboarding.</p>
                  </Collapsible>
                  <div className="hfind">Heuristic 5 Summary: Needs the plucking flow added.</div>
                </div>
              </div>
              <div className="hi">
                <div className="hh" style={{ cursor: 'pointer' }} onClick={() => setExpandedHeuristic(expandedHeuristic === 5 ? null : 5)}>
                  <span className="sev sev1">1</span>
                  <span className="htitle">6. Aesthetic and Minimalist Design</span>
                  <span style={{ marginLeft: 'auto', fontSize: '11px', fontWeight: 700, opacity: 0.6, textTransform: 'uppercase' }}>{expandedHeuristic === 5 ? 'Hide' : 'Details'}</span>
                </div>
                <div className="hbody">
                  <Collapsible isOpen={expandedHeuristic === 5}>
                    <p>Minimalism mostly praised. One evaluator flagged information screens as slightly wordy, suggested hierarchy and fewer words.</p>
                  </Collapsible>
                  <div className="hfind">Heuristic 6 Summary: Core minimalism holds.</div>
                </div>
              </div>
              <div className="hi">
                <div className="hh" style={{ cursor: 'pointer' }} onClick={() => setExpandedHeuristic(expandedHeuristic === 6 ? null : 6)}>
                  <span className="sev sev2">2</span>
                  <span className="htitle">7. Error Prevention and Recovery</span>
                  <span style={{ marginLeft: 'auto', fontSize: '11px', fontWeight: 700, opacity: 0.6, textTransform: 'uppercase' }}>{expandedHeuristic === 6 ? 'Hide' : 'Details'}</span>
                </div>
                <div className="hbody">
                  <Collapsible isOpen={expandedHeuristic === 6}>
                    <p>No constraint preventing a mango from rolling into the water. No corrective guidance if user plucks the wrong mango. Error messages present but inconsistent.</p>
                  </Collapsible>
                  <div className="hfind">Heuristic 7 Summary: Errors need clearer prevention and recovery paths.</div>
                </div>
              </div>
              <div className="hi">
                <div className="hh" style={{ cursor: 'pointer' }} onClick={() => setExpandedHeuristic(expandedHeuristic === 7 ? null : 7)}>
                  <span className="sev sev1">1</span>
                  <span className="htitle">8. Help and Documentation</span>
                  <span style={{ marginLeft: 'auto', fontSize: '11px', fontWeight: 700, opacity: 0.6, textTransform: 'uppercase' }}>{expandedHeuristic === 7 ? 'Hide' : 'Details'}</span>
                </div>
                <div className="hbody">
                  <Collapsible isOpen={expandedHeuristic === 7}>
                    <p>Onboarding screen helpful. Visual documentation and confirmation boxes could strengthen the experience further.</p>
                  </Collapsible>
                  <div className="hfind">Heuristic 8 Summary: Acceptable baseline.</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ITERATION 3 REDESIGNS */}
        <hr className="idiv" />
        <section className="sec">
          <div className="w">
            <div className="ibadge">Iteration 3</div>
            <div className="lbl">Redesign</div>
            <h2>Every critical finding addressed.</h2>
            <p>Each Severity 3 and Severity 2 finding from the heuristic evaluation was directly resolved.</p>

            <div style={{ marginTop: 40, padding: '28px', border: '1.5px solid var(--cm)', borderRadius: 'var(--rm)', background: 'rgba(255, 255, 255, 0.4)' }}>
              <div className="lbl" style={{ color: 'var(--ink)', marginBottom: 12 }}>An unresolved tension</div>
              <p style={{ margin: 0, fontStyle: 'italic', color: 'var(--inkm)', lineHeight: 1.6 }}>The streak counter was added to drive return engagement. The problem: it uses extrinsic motivation mechanics inside an experience designed for intrinsic calm. Self-Determination Theory identifies this as a structural conflict. Extrinsic rewards, particularly loss-aversion mechanics like streak counters, are known to undermine intrinsic motivation over time. In real life you return to a tree because the mango is ripening and you will eventually eat it. In VR the fruit cannot be eaten. Whether the process alone is enough to sustain return engagement, and what a non-gamified retention mechanic might look like, remains an open problem.</p>
            </div>

            <div style={{ marginTop: 48 }}>
              <h3 style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }} onClick={() => toggleRedesign(0)}>
                1. Visibility of System Status: Persistent HUD streak counter
                {expandedRedesign.has(0) ? <ChevronUp className="w-4 h-4 opacity-40" /> : <ChevronDown className="w-4 h-4 opacity-40" />}
              </h3>
              <Collapsible isOpen={expandedRedesign.has(0)}>
                <p>Streak counter was only visible in the Home Room. Added a persistent HUD element visible throughout the experience.</p>
              </Collapsible>
              <ImageCompare
                beforeImage="/assets/projects/aam-vr/docs/Redesign/vss1.webp"
                afterImage="/assets/projects/aam-vr/docs/Redesign/vss2.webp"
                beforeLabel="Iteration 2"
                afterLabel="Iteration 3"
                aspect="aspect-video"
              />
            </div>

            <div style={{ marginTop: 48 }}>
              <h3 style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }} onClick={() => toggleRedesign(1)}>
                2. Match Between System and Real World: Glide-to-basket animation
                {expandedRedesign.has(1) ? <ChevronUp className="w-4 h-4 opacity-40" /> : <ChevronDown className="w-4 h-4 opacity-40" />}
              </h3>
              <Collapsible isOpen={expandedRedesign.has(1)}>
                <p>Gap between plucking action and result was unclear. Added animation showing mango visibly travelling to the basket after pluck. A moveable basket will be added in a future version.</p>
              </Collapsible>
              <div className="mt-8">
                <SafeImage src="/assets/projects/aam-vr/docs/Redesign/msr.gif" alt="Glide to basket animation" fallback="After (glide-to-basket animation)" className="ph--med" aspect="16/9" />
              </div>
            </div>

            <div style={{ marginTop: 48 }}>
              <h3 style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }} onClick={() => toggleRedesign(2)}>
                3. User Control and Freedom: Persistent home button
                {expandedRedesign.has(2) ? <ChevronUp className="w-4 h-4 opacity-40" /> : <ChevronDown className="w-4 h-4 opacity-40" />}
              </h3>
              <Collapsible isOpen={expandedRedesign.has(2)}>
                <p>No exit option anywhere was the most critical finding. Added a persistent home button accessible at all times.</p>
              </Collapsible>
              <ImageCompare
                beforeImage="/assets/projects/aam-vr/docs/Redesign/ucf1.webp"
                afterImage="/assets/projects/aam-vr/docs/Redesign/ucf2.webp"
                beforeLabel="Iteration 2"
                afterLabel="Iteration 3"
                aspect="aspect-video"
              />
            </div>

            <div style={{ marginTop: 48 }}>
              <h3 style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }} onClick={() => toggleRedesign(3)}>
                4. Consistency and Standards: Non-diegetic instructions throughout
                {expandedRedesign.has(3) ? <ChevronUp className="w-4 h-4 opacity-40" /> : <ChevronDown className="w-4 h-4 opacity-40" />}
              </h3>
              <Collapsible isOpen={expandedRedesign.has(3)}>
                <p>In-world diegetic signs at the start were inconsistent with instruction cards used elsewhere. Replaced with non-diegetic cards consistent with the rest of the system.</p>
              </Collapsible>
              <ImageCompare
                beforeImage="/assets/projects/aam-vr/docs/Redesign/cs1.webp"
                afterImage="/assets/projects/aam-vr/docs/Redesign/cs2.webp"
                beforeLabel="Iteration 2"
                afterLabel="Iteration 3"
                aspect="aspect-video"
              />
            </div>

            <div style={{ marginTop: 48 }}>
              <h3 style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }} onClick={() => toggleRedesign(4)}>
                5. Recognition Rather Than Recall: Plucking added to onboarding + contextual hints
                {expandedRedesign.has(4) ? <ChevronUp className="w-4 h-4 opacity-40" /> : <ChevronDown className="w-4 h-4 opacity-40" />}
              </h3>
              <Collapsible isOpen={expandedRedesign.has(4)}>
                <p>Plucking gesture was missing from onboarding, causing confusion mid-experience. Added to the onboarding flow with contextual hints for available actions.</p>
              </Collapsible>
              <div className="ba-wrap">
                <div className="ba-item">
                  <div className="ba-label ba-label--after">ITERATION 3: ONBOARDING CARD</div>
                  <SafeImage src="/assets/projects/aam-vr/docs/Redesign/rrr1.webp" alt="Iteration 3 - Onboarding Card" fallback="Iteration 3 - Onboarding Card" aspect="16/9" />
                </div>
                <div className="ba-item">
                  <div className="ba-label ba-label--after">ITERATION 3: CONTEXTUAL HINTS</div>
                  <SafeImage src="/assets/projects/aam-vr/docs/Redesign/rrr2.webp" alt="Iteration 3 - Contextual Hints" fallback="Iteration 3 - Contextual Hints" aspect="16/9" />
                </div>
              </div>
            </div>

            <div style={{ marginTop: 48 }}>
              <h3 style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }} onClick={() => toggleRedesign(5)}>
                6. Error Prevention: Ripeness indicator
                {expandedRedesign.has(5) ? <ChevronUp className="w-4 h-4 opacity-40" /> : <ChevronDown className="w-4 h-4 opacity-40" />}
              </h3>
              <Collapsible isOpen={expandedRedesign.has(5)}>
                <p>Added a ripeness indicator label to colour to make it accessible to colour-blind users.</p>
              </Collapsible>
              <ImageCompare
                beforeImage="/assets/projects/aam-vr/docs/Redesign/ep1.webp"
                afterImage="/assets/projects/aam-vr/docs/Redesign/ep2.webp"
                beforeLabel="Iteration 2"
                afterLabel="Iteration 3"
                aspect="aspect-video"
              />
            </div>
          </div>
        </section>

        <hr className="idiv" />
        <section className="sec">
          <div className="w">
            <div className="lbl">Prototype Walkthrough</div>
            <h2>The final prototype, in motion.</h2>
            <p>Full walkthrough of the Iteration 3 prototype: Home Room entry through mango selection, harvest, and wrist-rotation undo. This is the version participants used in the usability questionnaire.</p>
            <MediaRenderer items={[{
              type: 'video',
              src: '/assets/projects/aam-vr/video/aam_Final.mp4',
              poster: '/assets/projects/aam-vr/cover/cover.png',
              controls: true
            }]} />
          </div>
        </section>

        {/* QUESTIONNAIRE */}
        <section className="sec" style={{ paddingTop: 0 }}>
          <div className="w">
            <div className="lbl">Usability Questionnaire</div>
            <h2>Directional signal. N=3.</h2>
            <p>5-statement Likert scale administered after the final prototype. N=3, academic sprint context. Treat as directional signal, not statistical validation.</p>
            <table className="qtable">
              <thead>
                <tr>
                  <th>Statement</th>
                  <th>Signal</th>
                  <th>What it means</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>I found this app calming and relaxing</td>
                  <td><span className="qsig qsig--pos"><span className="qdot qdot--pos"></span>Positive</span></td>
                  <td style={{ fontSize: '13px' }}>2 Agree, 1 Neutral. Core intent landed</td>
                </tr>
                <tr>
                  <td>I was able to understand and use features easily</td>
                  <td><span className="qsig qsig--neu"><span className="qdot qdot--neu"></span>Neutral</span></td>
                  <td style={{ fontSize: '13px' }}>3 Neutral. Aligns with heuristic finding on discoverability</td>
                </tr>
                <tr>
                  <td>The interface felt simple and uncluttered</td>
                  <td><span className="qsig qsig--neu"><span className="qdot qdot--neu"></span>Neutral</span></td>
                  <td style={{ fontSize: '13px' }}>3 Neutral. Onboarding clarity affecting perceived simplicity</td>
                </tr>
                <tr>
                  <td>Minimal design helped me stay focused</td>
                  <td><span className="qsig qsig--str"><span className="qdot qdot--str"></span>Strong</span></td>
                  <td style={{ fontSize: '13px' }}>1 Strongly Agree, 1 Agree, 1 Neutral. Kanso principle validated</td>
                </tr>
                <tr>
                  <td>Interactions felt easy to learn and intuitive</td>
                  <td><span className="qsig qsig--str"><span className="qdot qdot--str"></span>Strong</span></td>
                  <td style={{ fontSize: '13px' }}>1 Strongly Agree, 1 Agree, 1 Neutral. Gesture model working</td>
                </tr>
              </tbody>
            </table>
            <div className="rc" style={{ marginTop: 24 }}>
              <p>Neutral ratings on ease-of-use and simplicity align directly with the heuristic findings. Discoverability and onboarding completeness are the gap, not the core interaction model.</p>
            </div>
          </div>
        </section>

        {/* FUTURE SCOPE */}
        <section className="sec" style={{ paddingTop: 0 }}>
          <div className="w">
            <div className="lbl">Future Scope</div>
            <h2>Where this goes next.</h2>
            <p>Aam points toward a future where technology reconnects urban people to seasonal, embodied experiences they have lost access to.</p>
            <div className="future-grid">
              <div className="fcard">
                <div className="fcard__num">01</div>
                <h4>Seasonal cycles</h4>
                <p>Trees that fruit and thin with the real-world calendar. Miss the season and you wait. Soft-decay streak tied to absence.</p>
              </div>
              <div className="fcard">
                <div className="fcard__num">02</div>
                <h4>Audio & haptics pass</h4>
                <p>Leaf rustle, the specific sound of a stem snap, wrist buzz on successful pluck. A dedicated soundscape usability study for calmness without distraction.</p>
              </div>
              <div className="fcard">
                <div className="fcard__num">03</div>
                <h4>Moveable basket</h4>
                <p>Users reposition the basket before plucking, restoring the real-world skill and intention of placement, the part the pole mechanic was trying to capture.</p>
              </div>
              <div className="fcard">
                <div className="fcard__num">04</div>
                <h4>Tree care mechanics</h4>
                <p>Watering, monitoring, waiting. Expanding the emotional investment loop beyond a single harvesting session into something you return to.</p>
              </div>
            </div>
          </div>
        </section>

        {/* REFLECTION */}
        <section className="sec" style={{ paddingTop: 0 }}>
          <div className="w">
            <div className="refl">
              <h3>Reflection</h3>
              <p>The course framing (Usability Engineering) pulled this project toward interaction mechanics and evaluation rigour. That was the right constraint. The gesture model tested well. The iterative redesign addressed every critical finding. As a usability study, it worked.</p>
              <p>What it could not test was the thing it was actually trying to do: whether the ritual itself translates. The daily return, the slow accumulation of anticipation, the feeling of a harvest that was waited for. Those qualities require time and repetition that a three-week sprint with three participants cannot measure.</p>
              <div style={{ marginTop: 24, cursor: 'pointer' }} onClick={() => setExpandedReflection(!expandedReflection)}>
                <p><strong style={{ color: 'var(--y)' }}>The deeper question {expandedReflection ? '↑' : '↓'}</strong></p>
              </div>
              <Collapsible isOpen={expandedReflection}>
                <div style={{ marginTop: 12 }}>
                  <p>There is also a harder question the project did not resolve. VR can deliver the environment and the process. It can produce soft fascination, the effortless, low-demand attention that natural environments provide. What it cannot deliver is the terminal reward. The fruit cannot be tasted. Studies on multisensory VR food environments confirm this: even with olfactory cues added, physiological responses to food remain weaker than in real-life conditions. Aam offers the journey but not the arrival.</p>
                  <p>A Zen garden does not produce flowers. Bonsai cannot be eaten. The value is in the tending, the waiting, the daily return. Whether VR is a sufficient medium for that kind of experience, and whether the absence of the real fruit diminishes or simply transforms what the experience can offer, is the most interesting question this project leaves open.</p>
                </div>
              </Collapsible>
            </div>
          </div>
        </section>

        {/* FOOTER SPACER */}
        <div style={{ height: 80 }}></div>

      </div>

      <RelatedProjects projects={relatedProjects} groupLabel={groupLabel ?? 'Major Projects'} />
      <Footer />
    </>
  );
};

export default AamPage;
