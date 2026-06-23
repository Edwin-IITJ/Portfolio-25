// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── Archival Warmth Design System ──────────────────────────
        bg:          '#0E0D0B',
        surface:     '#1A1815',
        'surface-2': '#252220',
        border:      '#2E2B28',

        'text-primary':   '#F4EFE6',
        'text-secondary': '#C0B5AB',
        'text-muted':     '#9E9388',

        accent:       '#C9A96E',
        'accent-soft': '#3D3020',

        data:         '#6E9EC9',
        success:      '#6E9E7A',
        destructive:  '#9E6E6E',

        // ── Legacy aliases (so existing Tailwind classes don't break during migration)
        primary: {
          50:  '#3D3020',
          100: '#3D3020',
          200: '#C9A96E',
          400: '#C9A96E',
          500: '#C9A96E',
          600: '#C9A96E',
          700: '#B8953D',
          800: '#3D3020',
          900: '#0E0D0B',
          950: '#0E0D0B',
        },
        accent_legacy: {
          500: '#C9A96E',
        },
      },
      fontFamily: {
        sans:    ['var(--font-sans)', 'sans-serif'],
        display: ['var(--font-display)', 'sans-serif'],
        mono:    ['var(--font-mono)', 'monospace'],
      },
      fontSize: {
        'display':   ['clamp(3.5rem, 8vw, 5rem)',   { lineHeight: '1.05', fontWeight: '300' }],
        'heading-1': ['2.25rem',  { lineHeight: '1.15', fontWeight: '500' }],
        'heading-2': ['1.5rem',   { lineHeight: '1.25', fontWeight: '500' }],
        'body-lg':   ['1.125rem', { lineHeight: '1.6',  fontWeight: '400' }],
        'body':      ['1rem',     { lineHeight: '1.6',  fontWeight: '400' }],
        'caption':   ['0.875rem', { lineHeight: '1.5',  fontWeight: '400' }],
      },
      spacing: {
        'ds-1': '4px',
        'ds-2': '8px',
        'ds-3': '16px',
        'ds-4': '24px',
        'ds-5': '32px',
        'ds-6': '48px',
        'ds-7': '64px',
        'ds-8': '96px',
      },
      maxWidth: {
        'content': '1120px',
        'prose':   '680px',
      },
      transitionDuration: {
        'instant':    '100ms',
        'fast':       '180ms',
        'default':    '280ms',
        'slow':       '450ms',
        'deliberate': '700ms',
      },
      transitionTimingFunction: {
        'design':     'cubic-bezier(.4,0,.2,1)',
        'deliberate': 'ease-in-out',
      },
      borderRadius: {
        'card': '12px',
      },
    },
  },
  plugins: [],
}
