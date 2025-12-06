import { useState, useEffect } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import Navbar from '@/components/sections/Navbar'
import Hero from '@/components/sections/Hero'
import ProjectsGrid from '@/components/sections/ProjectsGrid'
import About from '@/components/sections/About'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'
import LoadingScreen from '@/components/ui/LoadingScreen'
import StructuredData from '@/components/SEO/StructuredData'

// Dynamically import 3D components to avoid SSR issues
const BackgroundCanvas = dynamic(
  () => import('@/components/3d/BackgroundCanvas'),
  {
    ssr: false,
    loading: () => null
  }
)

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Simulate loading time for assets
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  // Prevent flash of content during SSR
  if (!mounted) {
    return null
  }

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <>
      {/* SEO Meta Tags */}
      <Head>
        <title>Edwin Meleth | Designer | UI/UX/XR</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Structured Data for Google */}
      <StructuredData />

      {/* Background Canvas */}
      <BackgroundCanvas />

      {/* Main Content */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <ProjectsGrid />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}
