// components/SEO/StructuredData.tsx
import Head from 'next/head'

const StructuredData = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Edwin Meleth",
    "url": "https://edwinm.vercel.app",
    "image": "https://edwinm.vercel.app/profile-photo.jpg",
    "jobTitle": "Designer | UX/UI/XR",
    "description": "UX/UI Designe specializing in immersive experiences and user-centered design",
    "email": "m24ldx008@ad.iitj.ac.in",
    "sameAs": [
      "https://www.linkedin.com/in/edwinmeleth",
      "https://github.com/Edwin-IITJ",
      "https://behance.net/edwin_m"
      // Add your actual social media URLs
    ],
    "knowsAbout": [
      "UX Design",
      "UI Design",
      "XR Design",
      "Game Design",
      "Interaction Design",
      "Unreal Engine",
      "Unity",
      "Figma",
      "Full Stack Development",
      "Web Development",
      "JavaScript",
      "TypeScript",
      "Python",
      "HTML",
      "CSS",
      "SQL",
      "Angular",
      "C#"
    ],
    "alumniOf": [
      {
        "@type": "EducationalOrganization",
        "name": "Indian Institute of Technology Jodhpur",
        "alternateName": "IIT Jodhpur"
      },
      {
        "@type": "EducationalOrganization",
        "name": "Mar Athanasius College of Engineering",
        "alternateName": "MACE"
      }
    ],
    "worksFor": {
      "@type": "EducationalOrganization",
      "name": "IIT Jodhpur",
      "department": "School of Design"
    },
    "hasOccupation": [
      {
        "@type": "Occupation",
        "name": "XR Design Student",
        "occupationLocation": {
          "@type": "Place",
          "name": "IIT Jodhpur"
        },
        "description": "Master of Design in XR (Extended Reality) Design"
      },
      {
        "@type": "Occupation",
        "name": "Full-Stack Developer",
        "occupationLocation": {
          "@type": "Organization",
          "name": "IQVIA"
        },
        "description": "2+ years experience in full-stack development"
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
