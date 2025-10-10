import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
}

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Initialize GSAP
    gsap.config({
      nullTargetWarn: false,
    })

    // Smooth scroll behavior
    ScrollTrigger.config({
      limitCallbacks: true,
    })

    // Page load animation
    gsap.fromTo(
      'body',
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: 'power2.out' }
    )

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return <Component {...pageProps} />
}
