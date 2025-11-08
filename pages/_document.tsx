// pages/_document.tsx
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  const siteUrl = "https://edwinm.vercel.app"; // keep in sync with deployment
  const title = "Edwin Meleth - Designer | UX/UI/XR";
  const description =
    "Edwin Meleth is a UI/UX/Product Designer and Creative Developer specializing in immersive experiences, interaction design, and usable interfaces.";
  const ogImage = `${siteUrl}/og-image.png`;

  return (
    <Html lang="en">
      <Head>
        {/* Favicons */}
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Required Meta */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="color-scheme" content="light" />

        {/* Primary SEO Meta Tags */}
        <title>{title}</title>
        <meta name="title" content={title} />

        <meta name="description" content={description} />


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
        <meta property="og:url" content={siteUrl} />
        <meta property="og:site_name" content="Edwin Meleth Portfolio" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Edwin Meleth - Designer | UX/UI/XR" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://edwinm.vercel.app/" />

        {/* Google Fonts (if you're using any) */}
        {/* Canonical */}
        <link rel="canonical" href={siteUrl} />

        {/* Fonts: preconnect and load with swap to avoid FOIT */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />

        {/* Apple / PWA */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="msapplication-TileColor" content="#3b82f6" />

        <meta name="google-site-verification" content="cLOLJFWh4q8ds2XP2dt-gBwKDEybnqdnYIGPPp01P1g" />
        {/* Minimal JSON-LD structured data for Person (optional but useful) */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Edwin Meleth",
              url: siteUrl,
              sameAs: [
                "https://www.linkedin.com/in/edwinmeleth/",
                "https://www.behance.net/edwin_m",
              ],
              jobTitle: "UI/UX Designer & Creative Developer",
            }),
          }}
        />
      </Head>
      <body>
        <Main />
        {/* consider adding a minimal noscript fallback for critical content */}
        <noscript>
          <div style={{ padding: 20, textAlign: "center" }}>
            This site works best with JavaScript enabled.
          </div>
        </noscript>
        <NextScript />
      </body>
    </Html>
  );
}
