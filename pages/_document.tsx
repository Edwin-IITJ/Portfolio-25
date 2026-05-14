// pages/_document.tsx
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    // lang="en" required for accessibility + crawlers
    <Html lang="en">
      <Head>
        {/* ── Favicons ─────────────────────────────────────────────────────────
            favicon.ico  — all browsers (15 KB, contains your profile photo at small sizes)
            apple-touch-icon.png — iOS home screen (180×180)
            android-chrome-* — Android / Chrome PWA (referenced in manifest)
        */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* ── Theme colour ─────────────────────────────────────────────────────
            Matches the brand indigo used in the blob background (#6366f1).
            Controls browser chrome colour on Android / PWA.
        */}
        <meta name="theme-color" content="#6366f1" />

        {/* ── Encoding / compat ────────────────────────────────────────────── */}
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        {/* ── Google Search Console verification ───────────────────────────── */}
        <meta
          name="google-site-verification"
          content="cLOLJFWh4q8ds2XP2dt-gBwKDEybnqdnYIGPPp01P1g"
        />

        {/* ── Font preconnect (used by project-specific pages) ─────────────── */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/*
          Note: page-level Head blocks (index.tsx, about.tsx, etc.) handle
          all title, description, canonical, og:*, twitter:* tags. They take
          priority over anything set here, so we keep this file minimal to
          avoid stale global meta conflicting with page-specific values.
        */}
      </Head>
      <body className="font-sans">
        <Main />
        <NextScript />
        <noscript>You need to enable JavaScript to run this app.</noscript>
      </body>
    </Html>
  );
}
