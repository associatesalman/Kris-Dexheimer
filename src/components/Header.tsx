import { useEffect, useRef, useState } from 'react'
import { navigation } from '../config/site'

/** `base` is '' on the homepage and '/' on secondary pages, so section links return to the homepage. */
export function Header({ base = '' }: { base?: string }) {
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="site-header">
      <div className="wrap site-header__inner">
        <a className="brand" href={base ? '/' : '#top'}>
          Kris Dexheimer
        </a>
        <button
          ref={toggleRef}
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
        <nav id="site-nav" className={open ? 'site-nav is-open' : 'site-nav'} aria-label="Main">
          <ul>
            {navigation.map((item) => (
              <li key={item.href}>
                <a href={base + item.href} onClick={() => setOpen(false)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
