/**
 * Compile-time flag defined in vite.config.ts: true for review builds, false for production.
 * Wrap draft values and internal notes as `__REVIEW__ && …` so production bundles drop them entirely.
 * The Node launch check sets it to true before importing content.
 */
declare const __REVIEW__: boolean
