// pages/_app.tsx

import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import Router from 'next/router'
import NProgress from 'nprogress'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'
import { DM_Sans, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

// ─── Fonts ───────────────────────────────────────────────────────────────────
const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-mono',
  display: 'swap',
})

// ─── GSAP ────────────────────────────────────────────────────────────────────
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
}

// ─── NProgress configuration ─────────────────────────────────────────────────
NProgress.configure({
  minimum: 0.15,       // start visible immediately
  speed: 300,          // ms per step
  trickleSpeed: 120,   // ms between trickle increments
  showSpinner: false,  // spinner adds noise — bar is enough
})

// Wire to Next.js router events (module-level, runs once)
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    gsap.config({ nullTargetWarn: false })
    ScrollTrigger.config({ limitCallbacks: true })

    // Page arrival fade-in
    gsap.fromTo(
      'body',
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: 'power2.out' }
    )

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <div className={`${dmSans.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans`}>
      <Component {...pageProps} />
      <Analytics />
      <SpeedInsights />
    </div>
  )
}
