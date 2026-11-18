import { useState } from 'react';
import { cx } from './utils.js';
import Button from './Button.jsx';
import { Burger, Close } from './icons.jsx';

export default function Header({ logoSrc, homeHref = './', links = [], cta, className }) {
  const [open, setOpen] = useState(false);
  return (
    <header className={cx('ss-header', open && 'is-open', className)}>
      <div className="ss-header__bar">
        <a className="ss-header__brand" href={homeHref} aria-label="SSEvent — accueil">
          <span className="ss-plate"><img src={logoSrc} alt="" /></span>
        </a>
        <nav className="ss-header__nav" aria-label="Navigation principale">
          <ul>
            {links.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="ss-header__link" aria-current={l.current ? 'page' : undefined}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        {cta ? <Button className="ss-header__cta" href={cta.href} size="md">{cta.label}</Button> : null}
        <button type="button" className="ss-header__toggle" aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <Close /> : <Burger />}
          <span>{open ? 'Fermer' : 'Menu'}</span>
        </button>
      </div>
      <div className="ss-header__panel" hidden={!open}>
        <ul>
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="title-3 ss-header__link"
                aria-current={l.current ? 'page' : undefined}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        {cta ? <Button href={cta.href} size="lg">{cta.label}</Button> : null}
      </div>
    </header>
  );
}
