import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#2563eb" />
        <meta
          name="description"
          content="Edwin Meleth - UI/UX Designer & Creative Developer specializing in VR experiences, usability engineering, and innovative digital solutions. Portfolio showcasing design projects and interactive experiences."
        />
        <meta
          name="keywords"
          content="UI UX Designer, VR Developer, Product Designer, Creative Developer, Edwin Meleth, Portfolio, IIT Jodhpur, XR Design, Interaction Design, Usability Engineering"
        />
        <meta name="author" content="Edwin Meleth" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://edwinmeleth.com/" />
        <meta property="og:title" content="Edwin Meleth - Designer & Developer" />
        <meta
          property="og:description"
          content="Creative UI/UX Designer specializing in VR experiences and innovative digital solutions."
        />
        <meta property="og:image" content="/images/og-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://edwinmeleth.com/" />
        <meta property="twitter:title" content="Edwin Meleth - Designer & Developer" />
        <meta
          property="twitter:description"
          content="Creative UI/UX Designer specializing in VR experiences and innovative digital solutions."
        />
        <meta property="twitter:image" content="/images/og-image.jpg" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Fonts - Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />

        {/* Preload critical assets */}
        <link rel="preload" href="/images/hero-bg.jpg" as="image" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
