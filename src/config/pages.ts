/**
 * Publication switches for secondary pages. Read by vite.config.ts (build inputs),
 * the footer (links) and the launch check. Keep this file free of imports.
 */
export const pages = {
  /** Flip to true only once the page content is approved. Until then the page is built only in review mode. */
  upsideOfDown: { published: false, path: '/upside-of-down/' },
}
