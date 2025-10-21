# Edwin Meleth - Portfolio Website

A modern, production-ready portfolio website built with Next.js 14, TypeScript, Tailwind CSS, Framer Motion, and GSAP.

## ✨ Features

- 🎨 **Modern Design**: Clean, professional UI inspired by top portfolio sites
- ⚡ **Performance Optimized**: Fast loading with Next.js 14 and image optimization
- 🎭 **Smooth Animations**: GSAP and Framer Motion powered interactions
- 🌐 **Responsive**: Fully responsive design for all devices
- 🎯 **SEO Ready**: Proper meta tags and structured data
- 🎪 **3D Elements**: Three.js integration for immersive experiences
- 📱 **Mobile First**: Optimized mobile experience
- ♿ **Accessible**: WCAG 2.1 compliant

## 🛠 Tech Stack

- **Framework**: Next.js 14 (React 18)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: League Spartan + Space Grotesk (Google Fonts)
- **Animations**: Framer Motion + GSAP
- **3D Graphics**: Three.js / React Three Fiber
- **Icons**: Lucide React
- **Forms**: React Hook Form
- **Deployment**: Vercel

## 📦 Installation

1. **Clone the repository**
git clone https://github.com/Edwin-IITJ/portfolio.git
cd edwin-portfolio

2. **Install dependencies**
npm install

3. **Run development server**
npm run dev

4. **Open** [http://localhost:3000](http://localhost:3000) in your browser

## 🚀 Build & Deploy

### Local Build
npm run build
npm start

### Deploy to Vercel
Install Vercel CLI
npm i -g vercel

Deploy
vercel --prod

Or use the [Vercel GitHub integration](https://vercel.com/docs/git) for automatic deployments.

## 📁 Project Structure

edwin-portfolio/
├── components/ # React components
│ ├── ui/ # Reusable UI components
│ ├── sections/ # Page sections
│ ├── projects/ # Project-specific components
│ └── 3d/ # Three.js components
├── pages/ # Next.js pages
│ ├── _app.tsx # App wrapper with font config
│ ├── _document.tsx # HTML document with SEO
│ ├── index.tsx # Homepage
│ ├── about.tsx # About page
│ ├── api/ # API routes
│ │ └── contact.ts # Contact form endpoint
│ └── projects/ # Project pages
│ ├── index.tsx # Projects list
│ └── [slug].tsx # Individual project detail
├── styles/ # Global styles
│ └── globals.css # Tailwind + custom CSS
├── lib/ # Utility functions
│ ├── utils.ts # Helper functions
│ └── animations.ts # GSAP animations
├── data/ # Project data
│ ├── projects.json # Project metadata
│ └── projects.ts # TypeScript types
├── public/ # Static assets
│ ├── images/ # Images
│ ├── assets/ # Project assets
│ └── resume.pdf # Resume file
└── ...config files

## 🎨 Customization

### Update Projects
Edit `data/projects.json` with your Behance projects:
{
"majorProjects": [...],
"otherWorks": [...]
}

### Replace Images
- Add your profile photo to `public/images/profile.jpg`
- Add project images to `public/assets/projects/{project-id}/`
- Update image paths in `projects.json`

### Modify Theme
Edit colors and fonts in `tailwind.config.js`:
theme: {
extend: {
colors: {
primary: { ... },
accent: { ... }
},
fontFamily: {
sans: ['var(--font-sans)', 'sans-serif'], // League Spartan
display: ['var(--font-display)', 'serif'] // Space Grotesk
}
}
}

### Update Fonts
Fonts are configured in `pages/_app.tsx`:
import { League_Spartan, Space_Grotesk } from 'next/font/google'

const spartan = League_Spartan({
subsets: ['latin'],
variable: '--font-sans',
display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
subsets: ['latin'],
variable: '--font-display',
display: 'swap',
})

### Update Content
- **Hero Section**: `components/sections/Hero.tsx`
- **About Section**: `components/sections/About.tsx`
- **Contact Section**: `components/sections/Contact.tsx`
- **Footer**: `components/sections/Footer.tsx`

## 📝 Environment Variables

Create a `.env.local` file (see `.env.example`):
NEXT_PUBLIC_CONTACT_EMAIL=your-email@example.com

## 🐛 Troubleshooting

### Images not loading
- Ensure images exist in the `public/` folder
- Check image paths in `projects.json`
- Verify Next.js image domains in `next.config.js`

### Build errors
Clear cache and rebuild
rm -rf .next
npm run build

### Fonts not displaying
Restart dev server
npm run dev

Hard refresh browser
Windows/Linux: Ctrl + Shift + R
Mac: Cmd + Shift + R

### Type errors
Run type check
npm run type-check

## 📄 Scripts

npm run dev # Start development server
npm run build # Build for production
npm start # Start production server
npm run lint # Run ESLint
npm run type-check # Check TypeScript types

## 👨‍💻 Author

**Edwin Meleth**
- Portfolio: [https://edwinm.vercel.app/](https://edwinm.vercel.app/)
- Behance: [@edwin_m](https://www.behance.net/edwin_m)
- GitHub: [@Edwin-IITJ](https://github.com/Edwin-IITJ)
- LinkedIn: [Edwin Meleth](https://www.linkedin.com/in/edwin-meleth/)