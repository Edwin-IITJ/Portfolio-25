import { useState, useEffect } from 'react'
import Head from 'next/head'
import Navbar from '@/components/sections/Navbar'
import Hero from '@/components/sections/Hero'
import ProjectsGrid from '@/components/sections/ProjectsGrid'
import About from '@/components/sections/About'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'
import LoadingScreen from '@/components/ui/LoadingScreen'
import StructuredData from '@/components/SEO/StructuredData'

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

    // 2. Maximum safety timeout (3s)
    const maxTimer = setTimeout(() => {
      setAssetsLoaded(true)
    }, 3000)

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
        <title>Edwin Meleth | Product Designer & Design Engineer</title>
        <meta name="description" content="Edwin Meleth is a Product Designer and Design Engineer specialising in AI-powered products, adaptive interfaces, and XR interaction design. M.Des from IIT Jodhpur. Currently at Swiggy Instamart. Creator of LiquidRead and FairSplit. Formerly at IQVIA." />
        <meta name="keywords" content="Product Designer, Design Engineer, AI Product Design, UX Designer, XR Design, Edwin Meleth, IIT Jodhpur, LiquidRead, FairSplit, AI-powered products, adaptive UI, Swiggy" />
        <meta name="author" content="Edwin Meleth" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://edwinm.vercel.app/" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://edwinm.vercel.app/" />
        <meta property="og:title" content="Edwin Meleth | Product Designer & Design Engineer" />
        <meta property="og:description" content="Product Designer and Design Engineer specialising in AI-powered products, adaptive interfaces, and XR interaction design. M.Des from IIT Jodhpur. Currently at Swiggy Instamart." />
        <meta property="og:image" content="https://edwinm.vercel.app/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Edwin Meleth Portfolio" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Edwin Meleth | Product Designer & Design Engineer" />
        <meta name="twitter:description" content="Product Designer and Design Engineer specialising in AI-powered products, adaptive interfaces, and XR interaction design. M.Des from IIT Jodhpur." />
        <meta name="twitter:image" content="https://edwinm.vercel.app/og-image.png" />
      </Head>

      {/* Structured Data for Google */}
      <StructuredData />

      {/* Main Content */}
      <div className="relative z-10">
        <Navbar />
        <main className="overflow-x-hidden w-full">
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
