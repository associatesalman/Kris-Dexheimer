/**
 * Review mode shows drafts and missing-content notes for internal and client review.
 * Start it with `npm run dev:review` or build it with `npm run build:review` (output: dist-review/).
 * The normal `npm run build` is the production build: approved content only, no annotations.
 *
 * `__REVIEW__` is a compile-time constant (vite.config.ts), so review-only code is removed from production bundles.
 */
export const isReview: boolean = __REVIEW__
