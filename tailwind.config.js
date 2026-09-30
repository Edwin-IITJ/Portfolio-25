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
        // ── Handcrafted Light Design System ─────────────────────────────
        bg:          '#FFFFFF',
        surface:     '#FFFFFF',
        'surface-2': '#F5F5F5',
        border:      '#2E2B28',

        'text-primary':   '#000000',
        'text-secondary': '#7B7B7B',
        'text-muted':     '#7B7B7B',

        accent:       '#C9A96E',
        'accent-soft': 'rgba(201, 169, 110, 0.1)',

        'black-solid': '#000000',

        data:         '#6E9EC9',
        success:      '#6E9E7A',
        destructive:  '#9E6E6E',

        // ── Legacy aliases (preserve for any existing references) ──────
        primary: {
          50:  'rgba(201, 169, 110, 0.1)',
          100: 'rgba(201, 169, 110, 0.1)',
          200: '#C9A96E',
          400: '#C9A96E',
          500: '#C9A96E',
          600: '#C9A96E',
          700: '#B8953D',
          800: 'rgba(201, 169, 110, 0.1)',
          900: '#FFFFFF',
          950: '#FFFFFF',
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
        'content': '1024px',
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
