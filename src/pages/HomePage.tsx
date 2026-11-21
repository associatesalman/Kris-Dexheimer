import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { ReviewBanner } from '../components/ReviewBanner'
import { AboutBook } from '../sections/AboutBook'
import { AboutKris } from '../sections/AboutKris'
import { BookClubSpirited } from '../sections/BookClubSpirited'
import { Contact } from '../sections/Contact'
import { Faq } from '../sections/Faq'
import { Hero } from '../sections/Hero'
import { LightInTheDarkness } from '../sections/LightInTheDarkness'
import { Newsletter } from '../sections/Newsletter'

export function HomePage() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <ReviewBanner />
      <Header />
      <main id="main" tabIndex={-1}>
        <div id="top" />
        <Hero />
        <LightInTheDarkness />
        <AboutBook />
        <AboutKris />
        <Faq />
        {/* Deferred in all builds for now; see src/config/sections.ts. */}
        <BookClubSpirited />
        <Newsletter />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
