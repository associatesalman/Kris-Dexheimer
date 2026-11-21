import { Paragraphs } from '../components/ContentBlock'
import { FieldError, ManagedForm } from '../components/Forms'
import { EMAIL_PATTERN, errorProps } from '../components/useFormSubmit'
import { contactFormEnabled, integrations } from '../config/site'
import { contact as content } from '../content/site'

function validate(form: HTMLFormElement): Record<string, string> {
  const get = (n: string) => (form.elements.namedItem(n) as HTMLInputElement).value.trim()
  const errors: Record<string, string> = {}
  if (!get('name')) errors.name = 'Please enter your name.'
  const email = get('email')
  if (!email) errors.email = 'Please enter your email address.'
  else if (!EMAIL_PATTERN.test(email)) errors.email = 'Please enter a valid email address, like name@example.com.'
  if (!get('message')) errors.message = 'Please enter a message.'
  return errors
}

/** Kris's confirmed email address as a mailto link. Shown while no contact form service is connected. */
function EmailContact() {
  const email = content.email.value
  if (!email) return null
  return (
    <div className="contact__email">
      <p className="label">{content.emailLabel}</p>
      <a className="contact__link" href={`mailto:${email}`}>
        {email}
      </a>
    </div>
  )
}

/** Kept for later: displayed only once integrations.contactEndpoint is a real, connected service. */
function ContactForm() {
  return (
    <ManagedForm
      className="contact-form"
      endpoint={integrations.contactEndpoint}
      unconfiguredNote={__REVIEW__ && 'No contact form service or destination inbox has been supplied, so this form is not connected.'}
      validate={validate}
      messages={{
        success: 'Thank you. Your message has been sent.',
        error: 'Sorry, your message could not be sent. Please try again in a moment.',
      }}
    >
      {(errors, clear) => (
        <>
          <div className="field">
            <label htmlFor="contact-name" className="field-label">
              Name
            </label>
            <input id="contact-name" name="name" type="text" autoComplete="name" required onInput={() => clear('name')} {...errorProps(errors, 'contact-name', 'name')} />
            <FieldError id="contact-name" message={errors.name} />
          </div>
          <div className="field">
            <label htmlFor="contact-email" className="field-label">
              Email address
            </label>
            <input id="contact-email" name="email" type="email" autoComplete="email" required onInput={() => clear('email')} {...errorProps(errors, 'contact-email', 'email')} />
            <FieldError id="contact-email" message={errors.email} />
          </div>
          <div className="field">
            <label htmlFor="contact-message" className="field-label">
              Message
            </label>
            <textarea id="contact-message" name="message" rows={6} required onInput={() => clear('message')} {...errorProps(errors, 'contact-message', 'message')} />
            <FieldError id="contact-message" message={errors.message} />
          </div>
          <div>
            <button type="submit" className="btn btn--primary">
              {content.submitLabel}
            </button>
          </div>
        </>
      )}
    </ManagedForm>
  )
}

export function Contact() {
  return (
    <section id="contact" className="section contact" aria-labelledby="contact-heading">
      <div className="wrap contact__grid">
        <div>
          <h2 id="contact-heading" className="section-title">
            {content.heading}
          </h2>
          <Paragraphs entry={content.intro} />
        </div>

        {contactFormEnabled ? <ContactForm /> : <EmailContact />}
      </div>
    </section>
  )
}
