// Pre-launch check, run with `npm run check:launch` (Node 24 runs TypeScript directly).
// Prints the content inventory and fails while required content, approvals or integrations are missing.
import { existsSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { pages } from '../src/config/pages.ts'
import { isDeferred, sections } from '../src/config/sections.ts'
import { contactFormEnabled, integrations } from '../src/config/site.ts'

// Content modules read the compile-time flag; enable review data before loading them.
;(globalThis as { __REVIEW__?: boolean }).__REVIEW__ = true
await import('../src/content/site.ts')
const { inventory } = await import('../src/content/status.ts')

// Entries of deferred sections (src/config/sections.ts) are reported separately and never block launch.
const all = inventory()
const deferredItems = all.filter((e) => isDeferred(e.id))
const items = all.filter((e) => !isDeferred(e.id))
const drafts = items.filter((e) => e.status === 'draft')
const missingItems = items.filter((e) => e.status === 'missing')
const blocking: string[] = []

console.log('\nCONTENT INVENTORY')
console.log(`  approved: ${items.length - drafts.length - missingItems.length}   draft: ${drafts.length}   missing: ${missingItems.length}   deferred: ${deferredItems.length}\n`)

if (drafts.length) {
  console.log('Drafts awaiting Kris’s approval:')
  for (const d of drafts) {
    console.log(`  - [${d.required ? 'required' : 'optional'}] ${d.id}: ${d.note}`)
    for (const src of d.provenance ?? []) console.log(`      source: ${src.file} | ${src.location} | PDF ${src.pages} | printed ${src.printedPages} | ${src.kind}`)
    if (d.required) blocking.push(d.id)
  }
  console.log('')
}

const pageOnly = (id: string) => id.startsWith('upside.') && !pages.upsideOfDown.published
if (missingItems.length) {
  console.log('Still to be supplied:')
  for (const m of missingItems) {
    const tag = pageOnly(m.id) ? 'page unpublished' : m.required ? 'required' : 'optional'
    console.log(`  - [${tag}] ${m.id}: ${m.note}`)
    if (m.required && !pageOnly(m.id)) blocking.push(m.id)
  }
  console.log('')
}

const deferredSections = Object.entries(sections).filter(([, s]) => !s.active)
if (deferredSections.length) {
  console.log('Deferred or hidden for this iteration (hidden in all builds, not launch requirements):')
  for (const [name, s] of deferredSections) {
    console.log(`  - ${name}: ${s.reason}`)
    for (const d of deferredItems.filter((e) => e.id.startsWith(s.contentPrefix))) console.log(`      ${d.id} (${d.status})`)
  }
  console.log('')
}

console.log('Integrations:')
for (const [key, value] of Object.entries(integrations)) {
  // The contact form is displayed only once its endpoint exists. Until then the Contact section
  // offers the confirmed email as a mailto link, so the endpoint is not a launch requirement.
  if (key === 'contactEndpoint' && !contactFormEnabled) {
    console.log(`  - ${key}: not configured (form hidden; email contact shown instead; not required)`)
    continue
  }
  // The newsletter section is hidden (src/config/sections.ts) until an account exists, so nothing on
  // the site depends on the endpoint yet. It stays listed as pending, and blocks again on reactivation.
  if (key === 'newsletterEndpoint' && !value && !sections.newsletter.active) {
    console.log(`  - ${key}: PENDING, Kris has no newsletter account yet (section hidden; not a blocker while hidden)`)
    continue
  }
  console.log(`  - ${key}: ${value ?? 'NOT CONFIGURED'}`)
  if (!value) blocking.push(key)
}

// Private material must never sit in public/ or reach the production output.
for (const folder of ['public', 'dist']) {
const dist = new URL(`../${folder}`, import.meta.url)
if (existsSync(dist)) {
  const bad: string[] = []
  const walk = (dir: string) => {
    for (const name of readdirSync(dir)) {
      const full = join(dir, name)
      if (statSync(full).isDirectory()) walk(full)
      else if (/\.(pdf|docx?|eml|msg)$/i.test(name) || /private|manuscript/i.test(full)) bad.push(full)
    }
  }
  walk(fileURLToPath(dist))
  console.log(`\n${folder}/: ${bad.length ? 'PRIVATE FILES FOUND' : 'no private documents'}`)
  for (const b of bad) {
    console.log(`  - ${b}`)
    blocking.push(b)
  }
}
}

if (blocking.length) {
  console.error(`\nNOT READY FOR LAUNCH: ${blocking.length} blocking item(s).`)
  process.exit(1)
}
console.log('\nLaunch check passed.')
