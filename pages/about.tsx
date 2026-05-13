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
          content="Edwin Meleth is a Product Designer and Design Engineer specializing in AI-powered products, UX research, and XR interaction design. M.Des candidate at IIT Jodhpur."
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

      <div className="relative min-h-screen bg-white">
        <Navbar />

        <main className="pt-20">
          {/* Page Header */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="py-20 bg-gradient-to-br from-primary-50 to-white"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
                About Me
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Product Designer & Design Engineer · I design and build AI-powered products, conduct UX research, and create XR interaction experiences.
              </p>
            </div>
          </motion.section>

          <About />

          {/* Additional Sections can go here */}
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                  Let's Work Together
                </h2>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                  I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                </p>
                <a
                  href="/#contact"
                  className="inline-block bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
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
