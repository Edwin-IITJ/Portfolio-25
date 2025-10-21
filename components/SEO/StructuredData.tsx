// components/SEO/StructuredData.tsx
import Head from 'next/head'

const StructuredData = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Edwin Meleth",
    "url": "https://edwinm.vercel.app",
    "image": "https://edwinm.vercel.app/profile-photo.jpg",
    "jobTitle": "UX/UI Designer & VR Developer",
    "description": "UX/UI Designer and VR Developer specializing in immersive experiences and user-centered design",
    "email": "your.email@gmail.com",
    "sameAs": [
      "https://www.linkedin.com/in/edwinmeleth",
      "https://github.com/Edwin-IITJ",
      "https://behance.net/edwin_m"
      // Add your actual social media URLs
    ],
    "knowsAbout": [
      "UX Design",
      "UI Design",
      "VR Development",
      "Game Design",
      "Interaction Design",
      "Unreal Engine",
      "Unity",
      "Figma"
    ],
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "IIT Jodhpur"
    }
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
