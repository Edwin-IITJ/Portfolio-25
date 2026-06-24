import Head from 'next/head'
import Navbar from '@/components/sections/Navbar'
import About from '@/components/sections/About'
import Footer from '@/components/sections/Footer'
import { motion } from 'framer-motion'

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About - Edwin Meleth</title>
        <meta
          name="description"
          content="Edwin Meleth is a Product Designer and Design Engineer specializing in AI-powered products, UX research, and XR interaction design. Creator of LiquidRead, a pioneering generative UI case study. M.Des from IIT Jodhpur. Currently at Swiggy Instamart. Available for hire as a design builder."
        />
        <link rel="canonical" href="https://edwinm.vercel.app/about" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://edwinm.vercel.app/about" />
        <meta property="og:title" content="About Edwin Meleth | Product Designer & Design Engineer" />
        <meta property="og:description" content="Product Designer and Design Engineer specialising in AI-powered products, XR interaction design, and UX research. M.Des at IIT Jodhpur, formerly at IQVIA." />
        <meta property="og:image" content="https://edwinm.vercel.app/og-image.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Edwin Meleth | Product Designer & Design Engineer" />
        <meta name="twitter:description" content="Product Designer and Design Engineer specialising in AI-powered products, XR interaction design, and UX research." />
        <meta name="twitter:image" content="https://edwinm.vercel.app/og-image.png" />
      </Head>

      <div className="relative min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
        <Navbar />

        <main className="pt-20">
          {/* Page Header */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="py-10 border-b"
            style={{
              backgroundColor: 'var(--color-bg)',
              borderColor: 'var(--color-border)',
            }}
          >
            <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
              <h1
                className="text-5xl md:text-6xl font-display font-light mb-6"
                style={{ color: 'var(--color-text-primary)' }}
              >
                About
              </h1>
              <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
                Product Designer & Design Engineer · I design and build AI-powered products, conduct UX research, and create XR interaction experiences.
              </p>
            </div>
          </motion.section>

          <About />

          {/* Additional Sections can go here */}
          <section className="py-20" style={{ backgroundColor: 'var(--color-surface)' }}>
            <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <h2
                  className="text-3xl md:text-4xl font-display font-light mb-6"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  Let's Work Together
                </h2>
                <p className="text-xl mb-8 max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
                  I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                </p>
                <a
                  href="/#contact"
                  className="inline-block px-8 py-4 rounded-lg font-medium transition-all"
                  style={{
                    backgroundColor: 'var(--color-accent)',
                    color: 'var(--color-bg)',
                    transitionDuration: 'var(--motion-fast)',
                  }}
                >
                  Get In Touch
                </a>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  )
}
