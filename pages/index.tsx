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
      <Head>
        <title>Edwin Meleth - UI/UX Designer & Creative Developer</title>
        <meta 
          name="description" 
          content="Portfolio of Edwin Meleth - UI/UX Designer and Creative Developer specializing in VR experiences, usability engineering, and innovative digital solutions." 
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="canonical" href="https://edwinmeleth.com" />
      </Head>
      
      <div className="relative min-h-screen bg-white overflow-x-hidden">
        {/* 3D Background Canvas */}
        <BackgroundCanvas />
        
        {/* Navigation */}
        <Navbar />
        
        {/* Main Content */}
        <main className="relative z-10">
          <Hero />
          <ProjectsGrid />
          <About />
          <Contact />
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </>
  )
}
