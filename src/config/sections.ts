/**
 * Homepage section switches. Read by the homepage, the navigation, the review banner and the
 * launch check. Keep this file free of imports so the Node launch check can load it.
 *
 * A deferred section is hidden in BOTH production and review builds. Its component and its
 * content entries (src/content/site.ts) are kept intact; the launch check lists those entries as
 * "deferred" and does not count them as launch blockers. To reactivate a section, set
 * `active: true` (its nav link, if any, returns automatically).
 */
export const sections = {
  /**
   * Deferred 2026-11-20. Kris has not supplied the kit and suggested adding its button later.
   */
  bookClub: {
    active: false,
    contentPrefix: 'bookClub.',
    reason: 'Deferred for this iteration: Kris has not supplied the kit and will add its button later.',
  },
  /**
   * Deferred 2026-11-20. Kris: “Let’s leave Spirited on the shelf until we get through the stuff
   * we are working on right now. We can add the button as I get closer.”
   */
  spirited: {
    active: false,
    contentPrefix: 'spirited.',
    reason: 'Deferred for this iteration at Kris’s request (“leave Spirited on the shelf”); add it back as the release gets closer.',
  },
  /**
   * Hidden 2026-11-20 because no newsletter account exists yet (Kris confirmed she has none).
   * Reactivate once a real provider is connected and integrations.newsletterEndpoint is set.
   */
  newsletter: {
    active: false,
    contentPrefix: 'newsletter.',
    reason: 'Hidden until a newsletter account is connected: Kris has no newsletter account yet (2026-11-20).',
  },
}

/** Content ids that belong to a deferred section. */
export function isDeferred(id: string): boolean {
  return Object.values(sections).some((s) => !s.active && id.startsWith(s.contentPrefix))
}
