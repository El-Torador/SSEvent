import { cx } from './utils.js';

const TONES = ['default', 'raised', 'tint', 'dark'];

/** tone: default | raised | tint | dark */
export default function Section({ id, label, tone, className, children }) {
  const t = TONES.includes(tone) ? tone : 'default';
  return (
    <section id={id} aria-label={label} className={cx('ss-section', `ss-section--${t}`, t === 'dark' && 'ss-on-dark', className)}>
      <div className="ss-section__inner">{children}</div>
    </section>
  );
}
