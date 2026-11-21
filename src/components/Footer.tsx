import { isReview } from '../config/mode'
import { book, footer, upsideOfDown } from '../content/site'

const year = new Date().getFullYear()

/** The Upside of Down page is linked only once it is published, or in review mode. */
const linkUpside = upsideOfDown.published || isReview

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap site-footer__inner">
        <p>
          © {year} {book.author}
        </p>
        <p className="site-footer__publisher">
          <span>published by</span>
          <img
            className="site-footer__logo"
            src={footer.publisherLogo.src}
            srcSet={footer.publisherLogo.srcSet}
            sizes="(max-width: 760px) 72px, 80px"
            width={footer.publisherLogo.width}
            height={footer.publisherLogo.height}
            alt={footer.publisherLogo.alt}
            loading="lazy"
            decoding="async"
          />
        </p>
        <p className="site-footer__also">
          {footer.alsoBy}:{' '}
          {linkUpside ? (
            <a href={upsideOfDown.path}>
              <cite>{upsideOfDown.title}</cite>
            </a>
          ) : (
            <cite>{upsideOfDown.title}</cite>
          )}
        </p>
      </div>
    </footer>
  )
}
