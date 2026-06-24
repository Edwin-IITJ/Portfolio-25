// components/SEO/StructuredData.tsx
// Implements schema.org @graph pattern recommended for GEO (Generative Engine Optimisation):
//   - WebSite  → site-level entity
//   - ProfilePage → the homepage is a profile page about Edwin
//   - Person   → rich entity with credentials, location, projects (hasPart), and job-seeking signal
// The @id references link entities together so AI knowledge-graph builders can resolve them.

import Head from 'next/head'

const BASE = 'https://edwinm.vercel.app'

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [

    // ── WebSite ────────────────────────────────────────────────────────────────
    {
      "@type": "WebSite",
      "@id": `${BASE}/#website`,
      "url": BASE,
      "name": "Edwin Meleth Portfolio",
      "description": "Portfolio of Edwin Meleth — Product Designer and Design Engineer specialising in AI-powered products, XR interaction systems, and adaptive interfaces.",
      "publisher": { "@id": `${BASE}/#person` },
      "inLanguage": "en"
    },

    // ── ProfilePage ────────────────────────────────────────────────────────────
    {
      "@type": "ProfilePage",
      "@id": `${BASE}/#webpage`,
      "url": BASE,
      "name": "Edwin Meleth | Product Designer & Design Engineer",
      "isPartOf": { "@id": `${BASE}/#website` },
      "mainEntity": { "@id": `${BASE}/#person` },
      "about": { "@id": `${BASE}/#person` },
      "description": "Edwin Meleth is a Product Designer and Design Engineer specialising in AI-powered products, adaptive interfaces, and XR interaction design. Design builder available for hire who uses AI natively and innovatively. Creator of LiquidRead, a pioneering generative UI case study. M.Des from IIT Jodhpur. B.Tech CS from MACE Kerala. 2.5 years of professional software development at IQVIA. Currently at Swiggy Instamart.",
      "inLanguage": "en",
      "dateModified": "2026-06-25T00:00:00+05:30"
    },

    // ── Person (core entity) ───────────────────────────────────────────────────
    {
      "@type": "Person",
      "@id": `${BASE}/#person`,
      "name": "Edwin Meleth",
      "url": BASE,
      "image": `${BASE}/og-image.png`,
      "jobTitle": "Product Designer & Design Engineer",
      "description": "Product Designer and Design Engineer specialising in AI-powered products, adaptive interfaces, and XR interaction design. M.Des candidate at IIT Jodhpur. Formerly Associate Software Developer at IQVIA.",
      "email": "edwinmeleth@gmail.com",

      // ── Location ─────────────────────────────────────────────────────────────
      "homeLocation": {
        "@type": "Place",
        "name": "Kochi, Kerala, India",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Kochi",
          "addressRegion": "Kerala",
          "addressCountry": "IN"
        }
      },
      "knowsLanguage": ["English", "Malayalam", "Hindi"],
      "nationality": {
        "@type": "Country",
        "name": "India"
      },

      // ── Social / Identity links ───────────────────────────────────────────────
      "sameAs": [
        "https://www.linkedin.com/in/edwinmeleth",
        "https://github.com/Edwin-IITJ",
        "https://behance.net/edwin_m"
      ],

      // ── What Edwin knows ─────────────────────────────────────────────────────
      "knowsAbout": [
        "AI Product Design",
        "AI-Native Design",
        "AI-Assisted Design Workflow",
        "Design Builder",
        "AI Product Development",
        "Generative UI",
        "Generative UI Design",
        "Generative User Interface",
        "Runtime UI Generation",
        "Adaptive Generative Interface",
        "Adaptive UI",
        "Product Design",
        "Design Engineering",
        "UX Design",
        "UI Design",
        "Interaction Design",
        "Usability Engineering",
        "XR Design",
        "Virtual Reality",
        "Augmented Reality",
        "Prompt Engineering",
        "Research-to-Prompt Methodology",
        "Vibe Coding",
        "Generative UI",
        "Adaptive UI",
        "User Research",
        "Heuristic Evaluation",
        "Gaussian Splatting",
        "Figma",
        "Next.js",
        "TypeScript",
        "Python",
        "JavaScript",
        "SQL",
        "Angular",
        "Unreal Engine 5"
      ],

      // ── Formal credentials ────────────────────────────────────────────────────
      "hasCredential": [
        {
          "@type": "EducationalOccupationalCredential",
          "name": "Master of Design (M.Des)",
          "credentialCategory": "degree",
          "recognizedBy": {
            "@type": "EducationalOrganization",
            "name": "Indian Institute of Technology Jodhpur",
            "alternateName": "IIT Jodhpur",
            "sameAs": "https://iitj.ac.in"
          }
        },
        {
          "@type": "EducationalOccupationalCredential",
          "name": "Bachelor of Technology, Computer Science & Engineering",
          "credentialCategory": "degree",
          "recognizedBy": {
            "@type": "EducationalOrganization",
            "name": "Mar Athanasius College of Engineering",
            "alternateName": "MACE",
            "sameAs": "https://mace.ac.in"
          }
        }
      ],

      "alumniOf": [
        {
          "@type": "EducationalOrganization",
          "name": "Indian Institute of Technology Jodhpur",
          "alternateName": "IIT Jodhpur",
          "sameAs": [
            "https://iitj.ac.in",
            "https://en.wikipedia.org/wiki/IIT_Jodhpur",
            "https://in.linkedin.com/school/iitjodhpur/"
          ]
        },
        {
          "@type": "EducationalOrganization",
          "name": "Mar Athanasius College of Engineering",
          "alternateName": "MACE",
          "sameAs": [
            "https://mace.ac.in/",
            "https://en.wikipedia.org/wiki/Mar_Athanasius_College_of_Engineering"
          ]
        }
      ],

      "worksFor": {
        "@type": "Organization",
        "name": "Swiggy Instamart",
        "department": "Behavioural Science Lab",
        "sameAs": [
          "https://www.swiggy.com/instamart",
          "https://www.linkedin.com/company/swiggy"
        ]
      },

      "hasOccupation": [
        {
          "@type": "Occupation",
          "name": "Human-Centered Design Intern",
          "occupationLocation": {
            "@type": "Organization",
            "name": "Swiggy Instamart",
            "sameAs": "https://www.swiggy.com/instamart"
          },
          "description": "Human-Centered Design Intern in the Behavioural Science Lab at Swiggy Instamart. Applying design research and behavioural science to improve user experience."
        },
        {
          "@type": "Occupation",
          "name": "AI-Native Product Designer & Design Engineer",
          "description": "Designs and builds intelligent, adaptive products using AI as a core design material. Specialises in generative UI, adaptive interfaces, and AI-assisted development workflows."
        },
        {
          "@type": "Occupation",
          "name": "Associate Software Developer",
          "occupationLocation": {
            "@type": "Organization",
            "name": "IQVIA",
            "sameAs": [
              "https://www.iqvia.com/",
              "https://en.wikipedia.org/wiki/IQVIA",
              "https://www.linkedin.com/company/iqvia"
            ]
          },
          "description": "2.5 years experience in enterprise UX and full-stack development on pharma supply chain solutions"
        }
      ],

      // ── Job-seeking signal (helps AI answer "is Edwin available?") ─────────────
      "seeks": {
        "@type": "Demand",
        "name": "Product Designer or Design Engineer Role",
        "description": "Seeking Product Designer, Design Engineer, or AI Product Designer positions at AI-first startups and technology companies. Open to remote or in-person roles globally."
      },

      // ── Projects as linked CreativeWork entities ───────────────────────────────
      "hasPart": [
        {
          "@type": ["CreativeWork", "TechArticle"],
          "@id": `${BASE}/projects/liquid-read`,
          "name": "LiquidRead — Generative UI Case Study",
          "url": `${BASE}/projects/liquid-read`,
          "description": "AI-powered reading companion using Google Gemini API. Generates personalised article summaries calibrated to the user's reading level, domain expertise, and session context. Multi-axis calibration system scores article complexity and adapts output format accordingly.",
          "keywords": "generative UI, generative user interface, adaptive reading, AI-generated interface, runtime UI generation, adaptive generative UI, Gemini API, personalised summaries, Next.js, TypeScript, generative UI case study, generative UI example",
          "genre": "Generative UI Case Study",
          "about": [
            { "@type": "Thing", "name": "Generative UI", "description": "User interfaces generated at runtime by AI models rather than pre-designed statically" },
            { "@type": "Thing", "name": "Adaptive User Interface", "description": "Interfaces that adapt to individual user characteristics and context" },
            { "@type": "Thing", "name": "AI-Generated Interface", "description": "Interfaces where layout, content depth, and visual components are produced by large language models" }
          ],
          "author": { "@id": `${BASE}/#person` }
        },
        {
          "@type": "CreativeWork",
          "@id": `${BASE}/projects/fair-split`,
          "name": "FairSplit",
          "url": `${BASE}/projects/fair-split`,
          "description": "AI-assisted Product Design and Engineering case study. A one-day design engineering sprint using Gemini 2.5 Flash for receipt OCR with deterministic Python arithmetic for fair bill splitting. Demonstrates AI-native rapid prototyping and research-grounded decision-making.",
          "keywords": "AI-assisted design, Gemini API, receipt OCR, rapid prototyping, AI-native design, design engineering",
          "author": { "@id": `${BASE}/#person` }
        },
        {
          "@type": "CreativeWork",
          "@id": `${BASE}/projects/lucid-past`,
          "name": "LucidPast",
          "url": `${BASE}/projects/lucid-past`,
          "description": "XR interaction system for gaze-driven exploration of institutional photographic archives. Uses Apple Vision Pro and Meta Quest 3. Implements SHARP Gaussian Splatting for volumetric 3D reconstruction of 2D archival photographs. Three-act progressive narrowing algorithm inspired by dream-logic associations.",
          "keywords": "XR design, VR, Apple Vision Pro, Meta Quest 3, Gaussian Splatting, archival photography, gaze interaction",
          "author": { "@id": `${BASE}/#person` }
        },
        {
          "@type": "CreativeWork",
          "@id": `${BASE}/projects/aam-vr`,
          "name": "Aam",
          "url": `${BASE}/projects/aam-vr`,
          "description": "VR mango-harvesting experience for Meta Quest 3 with hand tracking. Built in Unreal Engine 5. Designed around Wabi-sabi principles (Kanso, Shizen, Ma) as hard constraints. Validated through 3 iterations with Nielsen's heuristic evaluation methodology.",
          "keywords": "VR design, Meta Quest 3, hand tracking, Unreal Engine 5, usability engineering, heuristic evaluation",
          "author": { "@id": `${BASE}/#person` }
        },
        {
          "@type": "CreativeWork",
          "@id": `${BASE}/projects/meleth-archive`,
          "name": "Meleth Archive",
          "url": `${BASE}/projects/meleth-archive`,
          "description": "Independent archival photographic survey of a Kerala family's photographic history (1949–1990s). 500+ photographs digitised across approximately 25 households. 20+ hours of oral history recordings. Direct conceptual origin of the LucidPast project.",
          "keywords": "archival photography, Kerala, oral history, digitisation, family archive",
          "author": { "@id": `${BASE}/#person` }
        },
        {
          "@type": "CreativeWork",
          "@id": `${BASE}/projects/aruler-redesign`,
          "name": "ARuler Redesign",
          "url": `${BASE}/projects/aruler-redesign`,
          "description": "UX redesign of an augmented reality spatial measurement tool. Improved measurement accuracy feedback and spatial interface clarity.",
          "keywords": "AR design, augmented reality, UX redesign, spatial measurement",
          "author": { "@id": `${BASE}/#person` }
        },
        {
          "@type": "CreativeWork",
          "@id": `${BASE}/projects/pomodoro-tracker`,
          "name": "Pomodoro Tracker",
          "url": `${BASE}/projects/pomodoro-tracker`,
          "description": "A live web app built as a rapid AI-assisted prototyping experiment using Google Antigravity. Demonstrates AI-native design building — from concept to deployed product using AI tools natively in the design and development workflow.",
          "keywords": "AI-assisted development, rapid prototyping, vibe coding, AI-native design, Google Antigravity",
          "author": { "@id": `${BASE}/#person` }
        }
      ]
    }
  ]
}

const StructuredData = () => (
  <Head>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  </Head>
)

export default StructuredData
