// next-sitemap.config.js

/** @type {import('next-sitemap').IConfig} */
const fs = require('fs');
const path = require('path');

// Since this is a plain JS file running in Node, we cannot directly import the TypeScript data file.
// Instead, we parse the TS file content to find NDA protected projects.
const projectsContent = fs.readFileSync(path.join(__dirname, 'data/projects.ts'), 'utf-8');
const ndaSlugs = [];

const blocks = projectsContent.split('id:');
for (let i = 1; i < blocks.length; i++) {
  if (blocks[i].includes('isNdaProtected: true')) {
    const match = blocks[i].match(/^\s*['"]?([^'",\s]+)['"]?/);
    if (match) {
      ndaSlugs.push(`/projects/${match[1]}`);
    }
  }
}

module.exports = {
  siteUrl: 'https://edwinm.vercel.app',
  generateRobotsTxt: false, // We created manual robots.txt
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/api/*'],
  
  // Transform function to add metadata
  transform: async (config, path) => {
    // Homepage gets highest priority
    if (path === '/') {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 1.0,
        lastmod: new Date().toISOString(),
      }
    }

    // Project pages get high priority
    if (path.startsWith('/projects/')) {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      }
    }

    // Default priority for other pages
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    }
  },
}
