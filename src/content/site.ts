import { pages } from '../config/pages.ts'
import { approved, draft, missing } from './status.ts'

/*
 * All site copy and the content inventory in one place.
 *
 * Sources:
 *  - COVER: the published cover (public/book-image.png).
 *  - BRIEF: client instructions in the project brief.
 *  - MS: the supplied "Distilled.pdf", stored privately as
 *    private/manuscripts/Distilled-in-America_manuscript_working-draft.pdf (76 PDF pages,
 *    no printed page numbers; Word export dated 2026-07-13). Identity checked by contents on
 *    2026-11-17: its title page reads "Distilled In America, By Kristine Dexheimer (around 20,000
 *    words)" and the text calls itself Distilled throughout. Nothing in it identifies it as
 *    The Upside of Down. It is an EARLY DRAFT of Distilled, not the published text:
 *      - its Chapter 15 is "Who am I?" (PDF pp. 65-67). Kris has clarified (2026-11-17) that
 *        "Who am I?" is Chapter 15 of The Upside of Down;
 *      - in the published Distilled, Chapter 15 is unnumbered, titled "A Light in the Darkness",
 *        and begins on page 71, where "the two" and the 7.5% are explained. This file's PDF p. 71
 *        is the end of its Chapter 16 "Equity" and contains none of that.
 *    See private/manuscripts/MANUSCRIPT-IDENTIFICATION.md. The correct Distilled file is needed.
 *    Anything taken or written from this draft is a DRAFT until Kris approves it, and must be
 *    checked against the published edition.
 */

/** Supplied filename, recorded in every source note. */
const MS_FILE = 'Distilled.pdf (early draft of Distilled, not the published text)'
/** The draft has no printed page numbers. */
const NO_PRINTED = 'none (draft has no printed page numbers)'

export const book = {
  shortTitle: 'Distilled',
  fullTitle: 'Distilled in America',
  subtitle: 'An Allegory',
  author: 'Kris Dexheimer',
  /** Printed on the published cover. */
  tagline: 'A cautionary tale of compliance, control, and the cost of comfort.',
  cover: {
    src: '/images/distilled-in-america-cover-1200.jpg',
    srcSet: '/images/distilled-in-america-cover-720.jpg 720w, /images/distilled-in-america-cover-1200.jpg 1200w',
    width: 1838,
    height: 2775,
    alt: 'Cover of Distilled in America: An Allegory, by Kris Dexheimer. A wolf and a caged dog share one face beneath the title, above the line “A cautionary tale of compliance, control, and the cost of comfort.”',
  },
}

export type Retailer = { label: string; href: string }

/** Purchase destinations. Add only real, verified URLs. */
export const retailers = missing<Retailer[]>(
  'book.retailers',
  __REVIEW__ && 'Retailer URLs for Distilled (e.g. Amazon, Barnes & Noble, Bookshop). None supplied or verified. Until they exist, the hero “Buy the Book” button is hidden in the production build.',
)
export const goodreads = missing<string>('book.goodreads', __REVIEW__ && 'Goodreads listing URL for Distilled.', false)

export const hero = {
  kicker: `${book.subtitle} by ${book.author}`,
  heading: book.shortTitle,
  standUp: { figure: '7.5%', rest: 'stand up.' },
  supporting: book.tagline,
  cta: 'Buy the Book',
  barCaption: 'Are you part of the 7.5%?',
  /** Describes the bar as an illustration of the book's idea, never as data or progress. */
  barLabel: 'Illustration: a line with its first 7.5 percent marked in coral.',
}

export const lightInTheDarkness = {
  /** In the published Distilled this chapter is unnumbered (Kris, 2026-11-17), so no chapter number is shown. */
  eyebrow: 'From Distilled',
  heading: 'A Light in the Darkness',
  figure: '7.5%',
  /** The explanation itself, from the unnumbered chapter “A Light in the Darkness”. */
  explanation: missing<string[]>(
    'light.explanation',
    __REVIEW__ &&
      'Kris’s explanation of the 7.5% and “the two”, from the unnumbered chapter “A Light in the Darkness”, which Kris says begins on page 71 of the published Distilled. The only manuscript supplied (Distilled.pdf, an early ~20,000-word draft) does not contain this chapter: its PDF page 71 is the end of Chapter 16 “Equity”, and it has no printed page numbers. Needs the published Distilled text (or the final manuscript) to select the passage. The earlier Chapter 9 Milgram (92.5%) explanation has been withdrawn.',
  ),
  /** Kris's suggested engagement lines (BRIEF), arranged as a lead-in plus one primary line. */
  leadIn: approved('light.leadIn', ['Are you part of the 7.5%?', 'Do you want to be?'], 'BRIEF: client engagement lines'),
  primary: approved(
    'light.primary',
    'Do you have the courage to be one of the two that stands up for change?',
    'BRIEF: client engagement line',
  ),
}

export const aboutBook = {
  heading: 'About the Book',
  synopsis: draft<string[]>(
    'book.synopsis',
    __REVIEW__ && [
      'Distilled in America opens with a fable. A wolf, coaxed away from his pack with the promise of free food and shelter, slowly becomes a beagle in a laboratory cage.',
      'From there, Kris Dexheimer moves between allegory, personal story and Platonic dialogue to examine obedience, comfort and freedom in present-day America, and what we give up when we stop thinking for ourselves. Drawing on history and on studies of obedience such as Stanley Milgram’s experiments, the book invites readers to ask their own questions and to find their voice.',
    ],
    __REVIEW__ && 'Newly written by the team from an EARLY DRAFT of Distilled (the only manuscript supplied); it has no synopsis. Not drawn from the “Who am I?” chapter Kris places in The Upside of Down. It sets up the premise and approach only. Must be checked against the published Distilled before approval; Kris to approve or supply her own.',
    __REVIEW__ && [
      { file: MS_FILE, location: 'Introduction (premise)', pages: 'pp. 6–7', printedPages: NO_PRINTED, kind: 'newly written summary' },
      { file: MS_FILE, location: 'Housekeeping, “Platonic Dialogue and Inquiry”', pages: 'p. 9', printedPages: NO_PRINTED, kind: 'newly written summary' },
      { file: MS_FILE, location: 'Chapter 9, “Milgram Experiment”', pages: 'pp. 41–45', printedPages: NO_PRINTED, kind: 'newly written summary' },
      { file: MS_FILE, location: 'Afterword, “Triple Distilled” (“Find your voice”)', pages: 'p. 76', printedPages: NO_PRINTED, kind: 'newly written summary' },
    ],
  ),
  /** Supplied details only. Formats, page count and ISBN are tracked below and never shown as empty rows. */
  details: [
    { label: 'Title', value: book.fullTitle },
    { label: 'Subtitle', value: book.subtitle },
    { label: 'Author', value: book.author },
  ],
  missingDetails: [
    missing<string>('book.formats', __REVIEW__ && 'Available formats of Distilled.', false),
    missing<string>('book.pages', __REVIEW__ && 'Page count of the published edition.', false),
    missing<string>('book.isbn', __REVIEW__ && 'ISBN(s) of the published edition.', false),
  ],
  missingDetailsSummary: __REVIEW__ && 'Not yet supplied: formats, page count and ISBN. These rows appear once Kris provides them.',
  buyHeading: 'Buy the book',
  excerpt: {
    heading: 'Read an excerpt',
    from: 'From the Introduction',
    paragraphs: draft<string[]>(
      'book.excerpt',
      __REVIEW__ && [
        'Once upon a time, long long ago, a man coaxed a wolf away from his pack with the promise of free food and shelter. At first the wolf approached the man cautiously, but the man gave the wolf a treat. This went on for weeks. Then one day the man coaxed the wolf back to his laboratory. Although the wolf could not smell the natural air or feel the wind, it was warm and dry in the lab. The wolf became accustomed to life in the lab.',
        'Although he often felt lonely, his basic needs were being met. And, over time, the wolf learned not to rely on his fellow wolves for comfort and support. He instead relied upon the man. Seeing their friend and brother get something for nothing, more wolves approached the man for free food and free shelter. The pack was disbanded.',
        'As the wolf lived in captivity, he changed. He became domesticated. At first, the now domesticated dog looked somewhat like a German Shepherd — still fierce but loyal and obedient to the man. He felt strong and proud of his loyalty and willingness to protect the man. He also liked the comfort of the laboratory where he received food and shelter without effort. He didn’t mind the occasional jab. He didn’t mind the lack of freedom. He was safe and secure. He was important to the man. The man, at first, rewarded the dog for his loyalty with bones and strokes.',
      ],
      __REVIEW__ && 'Three consecutive paragraphs of the opening fable from an EARLY DRAFT of Distilled, word for word. Only typography changed (“--” set as a dash, straight quotes as curly). Shortened from six paragraphs; it stops before the laboratory shocks. Not from the “Who am I?” chapter. The wording may differ in the published edition: check against it before approval.',
      __REVIEW__ && [{ file: MS_FILE, location: 'Introduction (opening fable)', pages: 'pp. 6–7', printedPages: NO_PRINTED, kind: 'exact excerpt' }],
    ),
    previewCount: 2,
  },
}

export const aboutKris = {
  heading: 'About Kris',
  portrait: {
    // Selected from the five supplied photographs: natural light, direct gaze, true to life.
    src: '/Kristine Author Pic (1).jpg',
    width: 968,
    height: 1783,
    alt: 'Kris Dexheimer outdoors in soft evening light, smiling gently, with long curly silver-blond hair and sunglasses resting on her head.',
  },
  bio: draft<string[]>(
    'kris.bio',
    __REVIEW__ && [
      'Kris Dexheimer lives in a small village in the heartland of America. She grew up on a farm, earned a BA in International Relations from the University of Wisconsin–Milwaukee, later returned to school for a Master of Arts, and works as a librarian, where she hosts a book club.',
      'She is a mother and a wife. Distilled in America is the book she wrote when, in her words, she was “no longer quiet.”',
    ],
    __REVIEW__ && 'Newly written from Kris’s first-person statements in an EARLY DRAFT of Distilled; no biography was supplied. Corrected 2026-11-17: facts taken only from the “Who am I?” chapter (which Kris places in The Upside of Down), such as “musician”, were removed and are held on the Upside of Down page. Health details are left out. NONE of these facts is verified as current: the draft is several years old. Kris to confirm each one (village, farm upbringing, BA UW–Milwaukee, Master of Arts, still a librarian, still hosts the book club, mother, wife) and approve or replace the text.',
    __REVIEW__ && [
      { file: MS_FILE, location: 'Foreword: village, mom, librarian, wife, “no longer quiet”', pages: 'p. 4', printedPages: NO_PRINTED, kind: 'newly written summary' },
      { file: MS_FILE, location: 'Chapter 2: returned to school for a Master of Arts', pages: 'p. 13', printedPages: NO_PRINTED, kind: 'newly written summary' },
      { file: MS_FILE, location: 'Chapter 3: BA in International Relations, UW–Milwaukee (1992)', pages: 'p. 17', printedPages: NO_PRINTED, kind: 'newly written summary' },
      { file: MS_FILE, location: 'Chapter 4: hosts a book club at the library', pages: 'p. 21', printedPages: NO_PRINTED, kind: 'newly written summary' },
      { file: MS_FILE, location: 'Chapter 16 “Equity”: “I grew up on a farm”', pages: 'p. 68', printedPages: NO_PRINTED, kind: 'newly written summary' },
    ],
  ),
  note: {
    label: 'A Note from Kris About Distilled',
    /** Supplied by Kris on 2026-11-20. Replaces the earlier selection from the early-draft Foreword. */
    text: approved<string[]>(
      'kris.note',
      [
        'Quite a few people have said, “Distilled left me wanting more. It’s too short.” That was by design. I chose the title because Distilled is much like a shot of hard liquor. It is potent, maybe even a bit harsh. It was not written to fill up or satisfy the reader with my thoughts. Instead, my goal from the start was to encourage the reader to build a cocktail around and including the spirit presented.',
      ],
      'CLIENT 2026-11-20: personal note supplied by Kris (typographic quotes only)',
    ),
  },
  thoughts: {
    label: 'Thoughts',
    items: missing<string[]>('kris.thoughts', __REVIEW__ && 'A few short author thoughts from Kris.', false),
  },
}

/**
 * Answers supplied by Kris on 2026-11-20, in her words. Only minimal punctuation applied.
 * The other suggested questions from the brief (“Do you know where Distilled was headed before you
 * embarked?”, “What do you enjoy reading in your free time?”) have no answers and are no longer listed.
 */
const SUPPLIED_FAQ = 'CLIENT 2026-11-20: question and answer supplied by Kris'

export const faq = {
  heading: 'Questions readers ask',
  items: [
    {
      q: 'How many revisions do you do?',
      a: approved<string[]>(
        'faq.revisions',
        [
          'The scariest part of writing is allowing thoughts and words to be typeset forever in one form and time. Because I consider myself more of a rewriter than a writer, I revise until the manuscript is clawed from my grasp for print.',
        ],
        SUPPLIED_FAQ,
      ),
    },
    {
      q: 'Are you working on another book?',
      a: approved<string[]>('faq.anotherBook', ['Yes, stay tuned for updates.'], SUPPLIED_FAQ),
    },
    {
      q: 'Where do you come up with this stuff?',
      a: approved<string[]>(
        'faq.ideas',
        [
          'That question comes up so often. I used to think everyone had similar concepts and ideas swirling through their minds. This stuff comes from silence and space.',
        ],
        SUPPLIED_FAQ,
      ),
    },
    {
      q: 'Do you believe books can change society?',
      a: approved<string[]>(
        'faq.society',
        [
          'Books educate, inform, take the reader on an adventure or a journey, show horrors and delights from time gone by and time yet to come, and the reader is changed. Society is composed of those individuals. Therefore, yes, books can change society.',
        ],
        SUPPLIED_FAQ,
      ),
    },
  ],
}

/** DEFERRED (src/config/sections.ts): hidden in all builds; kept for later reactivation. */
export const bookClub = {
  heading: 'Book Club Kit',
  intro: missing<string[]>('bookClub.intro', __REVIEW__ && 'Short introduction to the Book Club Kit.'),
  resources: missing<string[]>('bookClub.resources', __REVIEW__ && 'Discussion questions or a description of the kit’s resources.'),
  download: missing<{ label: string; href: string }>(
    'bookClub.download',
    __REVIEW__ && 'Approved Book Club Kit file for public/downloads/. None exists yet.',
    false,
  ),
}

/** DEFERRED (src/config/sections.ts): hidden in all builds; kept for later reactivation. */
export const spirited = {
  eyebrow: 'The sequel to Distilled',
  heading: 'Spirited',
  description: missing<string[]>('spirited.description', __REVIEW__ && 'Approved short introduction to Spirited.'),
  /** “Early 2028” is tentative and not approved for publication. */
  timing: missing<string>('spirited.timing', __REVIEW__ && 'Publication timing. “Early 2028” was suggested but is tentative.', false),
  updatesLink: { label: 'Get updates in the newsletter', href: '#newsletter' },
}

export const newsletter = {
  heading: 'Stay in the Loop',
  /** PENDING: Kris confirmed on 2026-11-20 that she has no newsletter account yet (see integrations.newsletterEndpoint). */
  intro: missing<string[]>('newsletter.intro', __REVIEW__ && 'One line on what subscribers will receive.', false),
  emailLabel: 'Email address',
  submitLabel: 'Sign up',
  consent: missing<string>(
    'newsletter.consent',
    __REVIEW__ && 'Consent wording and a privacy notice link. Suggested draft: “Occasional emails from Kris. Unsubscribe anytime.”',
  ),
}

export const contact = {
  heading: 'Contact',
  intro: missing<string[]>('contact.intro', __REVIEW__ && 'Short contact invitation.', false),
  emailLabel: 'Email',
  /** Confirmed by Kris on 2026-11-20. Shown as a mailto link while no contact form service is connected. */
  email: approved<string>('contact.email', 'dexheimer.kris@gmail.com', 'CLIENT 2026-11-20: contact email confirmed by Kris'),
  /** Used by the contact form, which is hidden until integrations.contactEndpoint is set. */
  submitLabel: 'Send message',
}

export const upsideOfDown = {
  title: 'The Upside of Down',
  author: 'Kris Dexheimer',
  path: pages.upsideOfDown.path,
  /** Set in src/config/pages.ts. Until true, the page is excluded from production builds and not linked. */
  published: pages.upsideOfDown.published,
  cover: missing<{ src: string; width: number; height: number; alt: string }>(
    'upside.cover',
    __REVIEW__ && 'Cover image for The Upside of Down.',
  ),
  description: missing<string[]>(
    'upside.description',
    __REVIEW__ && 'Short description of The Upside of Down. The client files “Newly Revised Upside of Down.docx” and “The Upside of Down non fiction pdf.pdf” were not found in the project.',
  ),
  details: missing<{ label: string; value: string }[]>(
    'upside.details',
    __REVIEW__ && 'Details of the edition to describe (format, year, ISBN). Kris to confirm which edition, since a revision is mentioned.',
    false,
  ),
  retailers: missing<Retailer[]>('upside.retailers', __REVIEW__ && 'Purchase links for The Upside of Down, if Kris wants any.', false),
  /**
   * Source material held for possible use on this page. Removed from the Distilled biography on
   * 2026-11-17 after Kris clarified that “Who am I?” is Chapter 15 of The Upside of Down.
   * Review-only reference, not proposed page copy.
   */
  heldMaterialLabel: __REVIEW__ && 'Held for this page: “Who am I?”',
  heldMaterial: draft<string[]>(
    'upside.heldMaterial',
    __REVIEW__ && [
      '“My closet on the second floor of our century old farmhouse extended back and to the left of the door perhaps six feet.”',
      '“Most call the water Librarian. Some call her Musician and Author; others name her neighbor and friend. My parents call the water daughter. To Gary she is Wife. To Ethan she is Mother. To me I am.”',
    ],
    __REVIEW__ &&
      'Exact quotations from the “Who am I?” chapter as it appears (numbered Chapter 15) inside Distilled.pdf, an early Distilled draft. Kris says this chapter is Chapter 15 of The Upside of Down; it has NOT been checked against an Upside of Down manuscript (none supplied), and the wording there may differ. Previously used for the Distilled biography (farmhouse, “Musician and Author”, “Mother”); removed from it. The chapter’s health details are deliberately not carried over. Reference only, not page copy.',
    __REVIEW__ && [
      { file: MS_FILE, location: 'Chapter 15, “Who am I?” (Upside of Down Ch. 15 per Kris)', pages: 'p. 66', printedPages: NO_PRINTED, kind: 'exact excerpt' },
      { file: MS_FILE, location: 'Chapter 15, “Who am I?” (Upside of Down Ch. 15 per Kris)', pages: 'pp. 66–67', printedPages: NO_PRINTED, kind: 'exact excerpt' },
    ],
    false,
  ),
}

export const footer = {
  publisher: 'kaha publishing',
  /**
   * Supplied transparent logo: public/Kaha_Publishing_Logo png transparent.png (2508×2508 RGBA,
   * untouched master; alpha verified 0 everywhere outside the circular badge, the badge itself,
   * including its inner cream band, fully opaque). The footer uses proportional, alpha-preserving
   * resized copies only. The logo reads “kaha”, so its alt text carries the full name.
   */
  publisherLogo: {
    src: '/images/kaha-logo-160.png',
    srcSet: '/images/kaha-logo-160.png 160w, /images/kaha-logo-240.png 240w',
    width: 2508,
    height: 2508,
    alt: 'kaha publishing',
  },
  alsoBy: 'Also by Kris',
}
