import { Fragment } from 'react';
import { cx } from './utils.js';

const delay = (s) => ({ '--d': `${s}s` });

/** Titre animé mot à mot, `highlight` souligne un mot, jusqu'à 3 photos en arc, bandeau défilant. */
export default function Hero({ eyebrow, title = '', highlight, lead, images = [], marquee = [], signature, label, className, children }) {
  const photos = images.slice(0, 3);
  const words = String(title).split(/\s+/).filter(Boolean);
  const hl = highlight ? String(highlight).toLowerCase() : null;
  const tWords = 0.2 + words.length * 0.12;

  return (
    <section className={cx('ss-hero', 'ss-on-dark', className)} aria-label={label}>
      <div className="ss-hero__inner">
        <div className="ss-hero__text">
          {eyebrow ? <p className="eyebrow ss-hero__eyebrow ss-fade" style={delay(0.05)}>{eyebrow}</p> : null}
          <h1 className="ss-hero__title">
            {words.map((w, i) => {
              const isHl = hl && w.toLowerCase().replace(/[.,!?;:…]+$/, '') === hl;
              return (
                <Fragment key={i}>
                  <span className={cx('ss-hero__word', isHl && 'is-highlight')}>
                    <span className="ss-hero__mask">
                      <span className="ss-hero__word-in" style={delay(0.2 + i * 0.12)}>{w}</span>
                    </span>
                    {isHl ? (
                      <svg className="ss-hero__underline" viewBox="0 0 200 16" preserveAspectRatio="none" aria-hidden="true" style={delay(tWords + 0.15)}>
                        <path d="M3 11 C 50 2, 140 2, 197 9" pathLength="100" />
                      </svg>
                    ) : null}
                  </span>
                  {i < words.length - 1 ? ' ' : null}
                </Fragment>
              );
            })}
          </h1>
          {lead ? <p className="lead ss-hero__lead ss-fade" style={delay(tWords + 0.05)}>{lead}</p> : null}
          {children ? <div className="ss-hero__actions ss-fade" style={delay(tWords + 0.2)}>{children}</div> : null}
        </div>
        {photos.length ? (
          <div className={cx('ss-hero__stage', `ss-hero__stage--n${photos.length}`)}>
            <svg className="ss-hero__arc" viewBox="0 0 100 100" aria-hidden="true">
              <circle cx="50" cy="50" r="47" pathLength="100" />
            </svg>
            {photos.map((im, i) => (
              <figure key={im.src} className={`ss-hero__photo ss-hero__photo--${i}`}>
                <img
                  src={im.src}
                  alt={im.alt || ''}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  style={im.focus ? { objectPosition: im.focus } : undefined}
                />
              </figure>
            ))}
            {signature ? <p className="signature ss-hero__signature ss-fade" style={delay(1.3)}>{signature}</p> : null}
          </div>
        ) : null}
      </div>
      {marquee.length ? (
        <div className="ss-hero__marquee" aria-hidden="true">
          <div className="ss-hero__track">
            {[0, 1].flatMap((k) => marquee.map((m, j) => <span key={`${k}-${j}`} className="ss-hero__tag">{m}</span>))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
