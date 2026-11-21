import { Content, Paragraphs } from '../components/ContentBlock'
import { FieldError, ManagedForm } from '../components/Forms'
import { EMAIL_PATTERN, errorProps } from '../components/useFormSubmit'
import { sections } from '../config/sections'
import { integrations } from '../config/site'
import { newsletter as content } from '../content/site'

function validate(form: HTMLFormElement): Record<string, string> {
  const value = (form.elements.namedItem('email') as HTMLInputElement).value.trim()
  if (!value) return { email: 'Please enter your email address.' }
  if (!EMAIL_PATTERN.test(value)) return { email: 'Please enter a valid email address, like name@example.com.' }
  return {}
}

/** Hidden in every build while sections.newsletter.active is false; code kept for reactivation. */
export function Newsletter() {
  if (!sections.newsletter.active) return null
  return (
    <section id="newsletter" className="section section--cream newsletter" aria-labelledby="newsletter-heading">
      <div className="wrap newsletter__inner">
        <h2 id="newsletter-heading" className="section-title">
          {content.heading}
        </h2>
        <Paragraphs entry={content.intro} />

        <ManagedForm
          className="signup"
          endpoint={integrations.newsletterEndpoint}
          unconfiguredNote={__REVIEW__ && 'Pending: Kris confirmed (2026-11-20) she does not have a newsletter account yet, so no provider is set up and this form is not connected.'}
          validate={validate}
          messages={{
            success: 'Thank you for signing up.',
            error: 'Sorry, something went wrong. Please try again in a moment.',
          }}
        >
          {(errors, clear) => (
            <>
              <label htmlFor="newsletter-email" className="field-label">
                {content.emailLabel}
              </label>
              <div className="signup__row">
                <input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  onInput={() => clear('email')}
                  {...errorProps(errors, 'newsletter-email', 'email')}
                />
                <button type="submit" className="btn btn--primary">
                  {content.submitLabel}
                </button>
              </div>
              <FieldError id="newsletter-email" message={errors.email} />
              <Content entry={content.consent}>{(text) => <p className="signup__consent">{text}</p>}</Content>
            </>
          )}
        </ManagedForm>
      </div>
    </section>
  )
}
