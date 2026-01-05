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
  const [assetsLoaded, setAssetsLoaded] = useState(false)
  const [minTimeElapsed, setMinTimeElapsed] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Check if we've already loaded this session to skip animation
    const hasLoaded = sessionStorage.getItem('hasVisited')

    if (hasLoaded) {
      setLoading(false)
      // If already visited, we assume "assets loaded" state for logic consistency
      setAssetsLoaded(true)
      setMinTimeElapsed(true)
      return
    }

    // 1. Minimum branding time (2s)
    const minTimer = setTimeout(() => {
      setMinTimeElapsed(true)
    }, 2000)

    // 2. Maximum safety timeout (5s) - prevents infinite loading if WebGL fails
    const maxTimer = setTimeout(() => {
      setAssetsLoaded(true)
    }, 5000)

    return () => {
      clearTimeout(minTimer)
      clearTimeout(maxTimer)
    }
  }, [])

  // Combine conditions to finish loading
  useEffect(() => {
    if (minTimeElapsed && assetsLoaded && loading) {
      setLoading(false)
      sessionStorage.setItem('hasVisited', 'true')
    }
  }, [minTimeElapsed, assetsLoaded, loading])

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
        {/* Remove viewport - Next.js handles this automatically */}
      </Head>

      {/* Structured Data for Google */}
      <StructuredData />

      {/* Background Canvas */}
      <BackgroundCanvas onLoaded={() => setAssetsLoaded(true)} />

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
