#!/usr/bin/env node
/**
 * scripts/hash-password.mjs
 *
 * One-time utility: generates a SHA-256 hash of your chosen presentation password.
 * Copy the output into CASE_STUDY_PASSWORD_HASH in .env.local (and Vercel dashboard).
 *
 * Usage:
 *   node scripts/hash-password.mjs "your-presentation-password"
 */

import { createHash } from 'crypto';

const password = process.argv[2];

if (!password) {
  console.error('\nUsage: node scripts/hash-password.mjs "your-password"\n');
  process.exit(1);
}

const hash = createHash('sha256').update(password, 'utf8').digest('hex');

console.log('\n  Password hash generated successfully!');
console.log('\n  ─────────────────────────────────────────────────────────────');
console.log(`  CASE_STUDY_PASSWORD_HASH=${hash}`);
console.log('  ─────────────────────────────────────────────────────────────');
console.log('\n  1. Copy the line above into .env.local');
console.log('  2. Add it to Vercel > Settings > Environment Variables');
console.log('  3. Do NOT commit .env.local to git\n');
