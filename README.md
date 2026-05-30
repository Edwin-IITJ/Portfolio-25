# Edwin Meleth Portfolio

A production-ready portfolio built with Next.js 14, TypeScript, and Tailwind CSS. The architecture focuses on performance, modular design systems, and advanced SEO optimization for both traditional crawlers and generative AI knowledge graphs.

## Core Features

*   **Generative AI SEO Architecture**: Implements a comprehensive schema.org nested graph (WebSite, ProfilePage, Person, CreativeWork) specifically structured for Generative Engine Optimisation (GEO). Provides clear entity relationships, credentials, and job-seeking signals for AI agents.
*   **Editorial UI Layouts**: Features a desktop-first, three-zone modular layout for content parsing, utilizing progressive disclosure for dense information like certifications and credentials.
*   **Design System Application**: Enforces strict design tokens across components. Includes specific theming implementations like the warm parchment aesthetic applied to the LiquidRead case study.
*   **Performance Optimization**: Utilizes Next.js image optimization, dynamic imports for WebGL and 3D components, and efficient routing.
*   **Interactive Components**: Implements Framer Motion and GSAP for micro-animations, scroll-triggered reveals, and fluid page transitions.

## Tech Stack

*   **Framework**: Next.js 14 (React 18)
*   **Language**: TypeScript
*   **Styling**: Tailwind CSS
*   **Typography**: DM Sans and Space Grotesk via next/font
*   **Animations**: Framer Motion, GSAP
*   **Data Validation**: React Hook Form
*   **Deployment**: Vercel

## Local Development

1.  Clone the repository:
    ```bash
    git clone https://github.com/Edwin-IITJ/Portfolio-25.git
    cd edwin-portfolio
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

4.  Navigate to `http://localhost:3000` in your browser.

## Project Structure

*   `components/`: React functional components.
    *   `sections/`: Major page sections (Hero, About, Contact).
    *   `ui/`: Reusable, atomic design elements (Buttons, Inputs).
    *   `SEO/`: Contains the StructuredData component for schema graphs.
*   `pages/`: Next.js file-based routing.
    *   `projects/[slug].tsx`: Dynamic routing for project case studies.
*   `styles/`: Global stylesheets and Tailwind directives.
*   `data/`: JSON data stores for project metadata.
*   `public/`: Static assets, images, robots.txt, and XML sitemaps.

## Customization

### Update Projects
Edit `data/projects.json` with your project metadata:
```json
{
  "majorProjects": [...],
  "otherWorks": [...]
}
```

### Replace Images
*   Add your profile photo to `public/images/profile.webp`
*   Add project images to `public/assets/projects/{project-id}/`
*   Update image paths in `projects.json`

### Modify Theme
Edit colors and fonts in `tailwind.config.ts` (or `tailwind.config.js`):
```javascript
theme: {
  extend: {
    colors: {
      primary: { ... },
      accent: { ... }
    }
  }
}
```

## Environment Variables

Create a `.env.local` file in the root directory (refer to `.env.example` if available):
```env
NEXT_PUBLIC_CONTACT_EMAIL=your-email@example.com
```

## Available Scripts

*   `npm run dev`: Starts the development server.
*   `npm run build`: Builds the application for production.
*   `npm start`: Starts the production server.
*   `npm run lint`: Runs ESLint to check for code quality issues.
*   `npm run type-check`: Validates TypeScript typings across the project.

## Troubleshooting

*   **Images not loading**: Verify the images exist in the `public/` directory and check the exact file paths in `projects.json`. Verify Next.js image domains in `next.config.js`.
*   **Build errors**: Clear the Next.js cache and rebuild using `rm -rf .next && npm run build`.
*   **Fonts not displaying**: Restart the development server and hard refresh your browser (Ctrl + Shift + R or Cmd + Shift + R).
*   **Type errors**: Run `npm run type-check` to identify TypeScript issues.

## Recent Architectural Updates

*   Restructured the LiquidRead case study to prioritize core UI screenshots and isolate technical diagrams within accordions for improved scannability.
*   Modernized the About section with a three-zone editorial layout and integrated live Credly verification badges.
*   Resolved Search Console structured data warnings by enforcing mainEntity fields and ISO 8601 timestamps.
*   Refactored the LiquidRead onboarding flow into a sequenced state machine.

## Deployment

This project is configured for deployment on Vercel. 

```bash
npm i -g vercel
vercel --prod
```

## Author

**Edwin Meleth**
Product Designer and Design Engineer
*   Portfolio: https://edwinm.vercel.app/
*   GitHub: https://github.com/Edwin-IITJ
*   LinkedIn: https://www.linkedin.com/in/edwin-meleth/