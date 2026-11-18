import { cx, pad } from './utils.js';
import { Check } from './icons.jsx';

/** variant: large | compact */
export function NumberedGrid({ variant = 'large', items = [], start = 1, headingLevel = 3, className }) {
  const v = variant === 'compact' ? 'compact' : 'large';
  const TitleTag = headingLevel === 4 ? 'h4' : 'h3';
  return (
    <ol className={cx('ss-numgrid', `ss-numgrid--${v}`, className)}>
      {items.map((it, i) => (
        <li key={it.title} className="ss-numgrid__item">
          <span className="ss-numgrid__num" aria-hidden="true">{pad(start + i)}</span>
          <TitleTag className="title-2 ss-numgrid__title">{it.title}</TitleTag>
          {it.text ? <p className="body ss-numgrid__text">{it.text}</p> : null}
        </li>
      ))}
    </ol>
  );
}

export function CheckList({ items = [], className }) {
  return (
    <ul className={cx('ss-checklist', className)}>
      {items.map((it) => (
        <li key={it.title} className="ss-checklist__item">
          <span className="ss-checklist__mark"><Check /></span>
          <div className="ss-checklist__body">
            <h3 className="title-3 ss-checklist__title">{it.title}</h3>
            {it.text ? <p className="body-sm ss-checklist__text">{it.text}</p> : null}
          </div>
        </li>
      ))}
    </ul>
  );
}

export function InfoCard({ title, text, headingLevel = 3, className, children }) {
  const TitleTag = headingLevel === 4 ? 'h4' : 'h3';
  return (
    <div className={cx('ss-info', className)}>
      <TitleTag className="title-3 ss-info__title">{title}</TitleTag>
      {text ? <p className="body ss-info__text">{text}</p> : null}
      {children}
    </div>
  );
}

export function TeamCard({ photo, photoAlt, photoFocus, name, role, className }) {
  return (
    <figure className={cx('ss-team', className)}>
      <div className="ss-team__photo">
        {photo ? (
          <img src={photo} alt={photoAlt || `Portrait de ${name}`} loading="lazy" style={photoFocus ? { objectPosition: photoFocus } : undefined} />
        ) : null}
      </div>
      <figcaption className="ss-team__caption">
        <span className="title-3 ss-team__name">{name}</span>
        {role ? <span className="body-sm ss-team__role">{role}</span> : null}
      </figcaption>
    </figure>
  );
}

export function Testimonial({ quote, name, context, className }) {
  return (
    <figure className={cx('ss-quote', className)}>
      <span className="ss-quote__mark" aria-hidden="true">“</span>
      <blockquote className="ss-quote__text">{quote}</blockquote>
      <figcaption className="ss-quote__caption">
        <span className="title-3 ss-quote__name">{name}</span>
        {context ? <span className="body-sm ss-quote__context">{context}</span> : null}
      </figcaption>
    </figure>
  );
}
