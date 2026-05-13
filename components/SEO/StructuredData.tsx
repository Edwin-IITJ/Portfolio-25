// components/SEO/StructuredData.tsx
import Head from 'next/head'

const StructuredData = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Edwin Meleth",
    "url": "https://edwinm.vercel.app",
    "image": "https://edwinm.vercel.app/profile-photo.jpg",
    "jobTitle": "Product Designer & Design Engineer",
    "description": "Product Designer and Design Engineer specializing in AI-powered products, adaptive interfaces, and UX research. M.Des candidate at IIT Jodhpur.",
    "email": "edwinmeleth@gmail.com",
    "sameAs": [
      "https://www.linkedin.com/in/edwinmeleth",
      "https://github.com/Edwin-IITJ",
      "https://behance.net/edwin_m"
      // Add your actual social media URLs
    ],
    "knowsAbout": [
      "AI Product Design",
      "Product Design",
      "Design Engineering",
      "UX Design",
      "UI Design",
      "Interaction Design",
      "Usability Engineering",
      "XR Design",
      "Prompt Engineering",
      "Generative UI",
      "Adaptive UI",
      "User Research",
      "Figma",
      "Next.js",
      "TypeScript",
      "Python",
      "JavaScript",
      "SQL",
      "Angular"
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
        "description": "Master of Design candidate, specializing in AI product design and adaptive interfaces"
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
        "description": "2.5 years experience in enterprise UX and full-stack development on pharma platforms"
      }
    ]
  }

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </Head>
  )
}

export default StructuredData
