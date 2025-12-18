// pages/_document.tsx
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  const siteUrl = "https://edwinm.vercel.app"; // keep in sync with deployment
  const title = "Edwin Meleth - Designer | UI/UX/XR";
  const description = "Edwin Meleth is a UI/UX/XR Designer and Creative Developer specializing in immersive experiences, interaction design, and usable interfaces.";
  const ogImage = `${siteUrl}/og-image.png`; // Ensure this 1200x630px image exists in /public

  return (
    <Html lang="en"> {/* Added for accessibility and SEO best practices */}
      <Head>
        {/* Favicons - Ensure all files exist in /public */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon?color=2563eb" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Preconnect for Google Fonts performance (matches your _app.tsx setup) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" as="style" /> {/* Optional: Preload your fonts */}

        {/* Required Meta */}
        <meta charSet="utf-8" />
        {/* Remove viewport - Next.js handles this automatically */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="theme-color" content="#2563eb" /> {/* Your primary blue from tailwind.config */}
        <meta name="google-site-verification" content="cLOLJFWh4q8ds2XP2dt-gBwKDEybnqdnYIGPPp01P1g" />

        {/* Primary SEO Meta Tags */}
        {/* Remove title - set in individual pages instead */}
        <meta name="description" content={description} />
        <meta name="keywords" content="Edwin Meleth, UX Designer, UI Designer, VR Developer, Portfolio, Interaction Design, Game Design, Unreal Engine, Unity, Figma, User Experience, Virtual Reality" />
        <meta name="author" content="Edwin Meleth" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={siteUrl} /> {/* Absolute URL for better SEO */}

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Edwin Meleth" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={siteUrl} />
      </Head>
      <body className="font-sans"> {/* Applies your base font from globals.css/_app.tsx */}
        <Main />
        <NextScript />
        <noscript>You need to enable JavaScript to run this app.</noscript>
      </body>
    </Html>
  );
}
