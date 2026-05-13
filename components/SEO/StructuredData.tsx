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
      "about": { "@id": `${BASE}/#person` },
      "description": "Edwin Meleth is a Product Designer and Design Engineer specialising in AI-powered products, adaptive interfaces, and XR interaction design. M.Des candidate at IIT Jodhpur.",
      "inLanguage": "en",
      "dateModified": "2025-05-01"
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
        "name": "Jodhpur, Rajasthan, India",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Jodhpur",
          "addressRegion": "Rajasthan",
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
        "@type": "EducationalOrganization",
        "name": "IIT Jodhpur",
        "department": "School of Design",
        "sameAs": [
          "https://www.iitj.ac.in/school-of-design/",
          "https://in.linkedin.com/company/school-of-design-iit-jodhpur"
        ]
      },

      "hasOccupation": [
        {
          "@type": "Occupation",
          "name": "Product Designer & Design Engineer",
          "occupationLocation": {
            "@type": "Place",
            "name": "IIT Jodhpur"
          },
          "description": "Master of Design candidate, specialising in AI product design and adaptive interfaces"
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
          "description": "2.5 years experience in enterprise UX and full-stack development on clinical trial and pharma data platforms"
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
          "@type": "CreativeWork",
          "@id": `${BASE}/projects/liquidread`,
          "name": "LiquidRead",
          "url": `${BASE}/projects/liquidread`,
          "description": "AI-powered reading companion using Google Gemini API. Generates personalised article summaries calibrated to the user's reading level, domain expertise, and session context. Multi-axis calibration system scores article complexity and adapts output format accordingly.",
          "keywords": "AI product design, Gemini API, adaptive reading, personalised summaries, Next.js, TypeScript",
          "author": { "@id": `${BASE}/#person` }
        },
        {
          "@type": "CreativeWork",
          "@id": `${BASE}/projects/lucidpast`,
          "name": "LucidPast",
          "url": `${BASE}/projects/lucidpast`,
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
