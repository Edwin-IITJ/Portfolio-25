import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

        {/* Primary SEO Meta Tags */}
        <meta name="title" content="Edwin Meleth - Designer | UX/UI/XR" />
        <meta
          name="description"
          content="Edwin Meleth is a UX/UI Designer and Creative Developer specializing in immersive experiences, game design, and user-centered interaction design. View portfolio and projects."
        />
        <meta
          name="keywords"
          content="Edwin Meleth, UX Designer, UI Designer, VR Developer, Portfolio, Interaction Design, Game Design, Unreal Engine, Unity, Figma, User Experience, Virtual Reality"
        />
        <meta name="author" content="Edwin Meleth" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />

        {/* Open Graph / Facebook Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://edwinm.vercel.app/" />
        <meta property="og:site_name" content="Edwin Meleth Portfolio" />
        <meta property="og:title" content="Edwin Meleth - Designer | UX/UI/XR" />
        <meta
          property="og:description"
          content="Portfolio showcasing UX/UI design and VR development projects by Edwin Meleth. Explore immersive experiences and user-centered designs."
        />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Edwin Meleth - Designer | UX/UI/XR" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://edwinm.vercel.app/" />

        {/* Google Fonts (if you're using any) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Additional Meta Tags */}
        <meta name="theme-color" content="#3b82f6" />
        <meta name="color-scheme" content="light" />

        <meta name="google-site-verification" content="cLOLJFWh4q8ds2XP2dt-gBwKDEybnqdnYIGPPp01P1g" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
