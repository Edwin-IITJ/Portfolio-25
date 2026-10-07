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

### Content & Layout Management (projects.json)
The site's project content and homepage layout are fully data-driven via `data/projects.json`. 
- **Categories:** Projects are divided into arrays: `majorProjects`, `otherWorks`, `labWorks`, and `ndaWorks`.
- **Homepage Engine:** The `ProjectsGrid` component dynamically scans the selected tab for projects marked with `"featured": true`. It automatically promotes the project marked `"isNew": true` to the Hero slot, and fills the remaining slots with the other featured projects.
- **Update flow:** A content manager simply flips boolean flags in `projects.json` to alter the homepage structure without touching React components.

```json
{
  "majorProjects": [
    {
      "id": "project-slug",
      "featured": true,
      "isNew": true,
      ...
    }
  ]
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

## AI Developer Notes & Coding Principles (For Future LLMs)

If you are an AI assistant picking up this project, adhere to these principles established during the recent codebase audit:

1. **DRY & Single Source of Truth:** Reuse existing components instead of duplicating logic. (e.g., `components/ui/SafeImage.tsx` handles both Next.js and native image fallbacks).
2. **"Behind the Scenes" Refactoring:** When cleaning up code, *do not alter the UX or visual aesthetic* unless explicitly instructed. Replace inline `style={{...}}` with Tailwind or `globals.css` utility classes (like `.btn-outline-pill`, `.link-hover-accent`) only if it achieves the exact same visual output (including hover states).
3. **Responsive Constraints:** The site uses a full-bleed `<section w-full>` architecture with inner wrappers (`max-w-[1024px] mx-auto`) to constrain content. *Do not apply max-width to the outer section element*, as backgrounds must bleed to the edges on ultrawide monitors.
4. **Data-Driven UI:** Push static content to data structures (`data/projects.ts` or future `data/about.ts`) rather than hardcoding large text blocks inside `.tsx` components.
5. **Accessibility (a11y):** Ensure interactive elements are keyboard accessible (use `:focus-visible` in CSS classes instead of inline JS `onMouseEnter`). Maintain ARIA roles for custom widgets like tab lists.

## Recent Code Quality Audit & Updates (Team Handoff)

We recently performed a comprehensive codebase audit to improve maintainability and performance.

### Completed:
*   **Unified SafeImage:** Extracted the duplicated `SafeImage` component across custom project pages into a unified `components/ui/SafeImage.tsx` handling both `next/image` and native `<img>` modes.
*   **Hover Interaction Standardization:** Removed brittle inline React mouse event handlers (`onMouseEnter`) in favor of centralized CSS utility classes (`.btn-outline-pill`, `.link-hover-accent`) for buttons and links, ensuring keyboard accessibility and cleaner code.
*   **Scalable Routing:** Replaced a long `if` statement chain in `pages/projects/[slug].tsx` with a constant time lookup map (`CUSTOM_LAYOUTS`) for custom project layouts.
*   **Accessibility & Hygiene:** Added ARIA roles to the projects tab navigation, migrated inline NProgress styles to `globals.css`, and removed unused variable declarations.
*   **Dynamic Layout Engine:** Refactored `ProjectsGrid` to build layouts dynamically based on `featured` and `isNew` boolean tags in `projects.json`.
*   **Centralized Project Hub:** Built `pages/projects/index.tsx` featuring tabbed navigation (`?tab=major`), acting as the core directory for all project types.
*   **Ultrawide Fluidity (1440p+):** Overhauled container max-widths and flexbox behaviors to scale gracefully to 1440px and 1920px displays without losing the handcrafted aesthetic, replacing rigid 1024px constraints.
*   **DRY Component Systems:** Standardized disparate UI elements (e.g. the glassmorphic `<BackButton />`) into `components/ui/` to ensure visual uniformity across custom layout engines.

### Left To Do (Future Tasks):
*   **Decompose `About.tsx` (Medium Effort):** The file is over 500 lines long. It should be broken down into smaller, focused sub-components (`ExperienceCard.tsx`, `SkillsGrid.tsx`, etc.).
*   **Extract Data from `About.tsx` (Medium Effort):** The work experience, education, and bio paragraphs are hardcoded inside the JSX. Extracting these to a `data/about.ts` file will make content updates easier.
*   **Minor Accessibility Tweaks (Small Effort):**
    *   Add `<AnimatePresence>` to the mobile menu in `Navbar.tsx` so it animates out cleanly.
    *   Add a "Skip to main content" link for keyboard navigation.
    *   Fix HTML semantics in `About.tsx` where an `<h3>` is styled awkwardly using conflicting text size classes.
    *   Add `loading="lazy"` to the static footer illustrations.

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