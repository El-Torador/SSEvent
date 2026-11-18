import { cx } from './utils.js';

export default function Footer({ logoSrc, pitch, columns = [], legal, className }) {
  return (
    <footer className={cx('ss-footer', className)}>
      <div className="ss-footer__inner">
        <div className="ss-footer__brand">
          <span className="ss-plate ss-plate--lg"><img src={logoSrc} alt="SSEvent" /></span>
          {pitch ? <p className="body-sm ss-footer__pitch">{pitch}</p> : null}
        </div>
        {columns.map((c) => (
          <div className="ss-footer__col" key={c.title}>
            <p className="eyebrow ss-footer__title">{c.title}</p>
            <ul>
              {(c.links || []).map((l) => (
                <li key={l.label}>
                  {l.href ? <a href={l.href} className="body-sm">{l.label}</a> : <span className="body-sm">{l.label}</span>}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="ss-footer__legal body-sm">{legal || `© ${new Date().getFullYear()} SSEvent`}</div>
    </footer>
  );
}
