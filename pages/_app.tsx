// pages/_app.tsx

import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import Router from 'next/router'
import NProgress from 'nprogress'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'
import { DM_Sans, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'

// ─── Fonts ───────────────────────────────────────────────────────────────────
const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
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
    <div className={`${dmSans.variable} ${spaceGrotesk.variable} font-sans`}>
      {/*
        NProgress bar styles — scoped here so globals.css stays clean.
        Colour matches primary-600 (#2563eb) from the design system.
      */}
      <style>{`
        #nprogress { pointer-events: none; }
        #nprogress .bar {
          background: #2563eb;
          position: fixed;
          z-index: 9999;
          top: 0; left: 0;
          width: 100%; height: 2px;
        }
        #nprogress .peg {
          display: block;
          position: absolute;
          right: 0; top: 0;
          width: 100px; height: 100%;
          box-shadow: 0 0 10px #2563eb, 0 0 5px #2563eb;
          opacity: 1;
          transform: rotate(3deg) translate(0px, -4px);
        }
      `}</style>

      <Component {...pageProps} />
      <Analytics />
    </div>
  )
}
