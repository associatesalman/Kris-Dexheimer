/**
 * Site-wide settings: navigation and integrations.
 *
 * Integration endpoints stay `null` until a real service is chosen and connected.
 * While they are null, the forms validate input but never claim that anything was sent or saved.
 */
import { sections } from './sections.ts'

const allNavigation = [
  { label: 'Book', href: '#book' },
  { label: 'About', href: '#about' },
  { label: 'FAQ', href: '#faq' },
  /** Points at the Book Club Kit section; shown only while that section is active. */
  { label: 'Book Club', href: '#book-club', when: sections.bookClub.active },
  /** Shown only while the newsletter section is active. */
  { label: 'Newsletter', href: '#newsletter', when: sections.newsletter.active },
  { label: 'Contact', href: '#contact' },
]

/** Active navigation. Links to deferred sections are left out so no anchor points at hidden content. */
export const navigation = allNavigation.filter((item) => item.when !== false)

export const integrations: {
  /**
   * POST endpoint of the chosen newsletter provider. PENDING: Kris confirmed (2026-11-20) she
   * does not have a newsletter account yet. Do not fill this in until a real account exists.
   */
  newsletterEndpoint: string | null
  /**
   * POST endpoint of a contact form service. Not selected. While it is null the contact form is
   * not displayed (in any mode) and the Contact section shows the email link instead, so this
   * endpoint is not a launch requirement. The form code is kept in src/sections/Contact.tsx.
   */
  contactEndpoint: string | null
} = {
  newsletterEndpoint: null,
  contactEndpoint: null,
}

/** The contact form is displayed only once a real endpoint is connected. */
export const contactFormEnabled = integrations.contactEndpoint !== null

export const siteDomain = 'krisdexheimer.com'
