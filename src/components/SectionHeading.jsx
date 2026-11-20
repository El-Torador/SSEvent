import { cx } from './utils.js';

export default function SectionHeading({ as = 'h2', eyebrow, title, lead, align, className, children }) {
  const Tag = ['h1', 'h2', 'h3'].includes(as) ? as : 'h2';
  return (
    <div className={cx('ss-heading', align === 'center' && 'ss-heading--center', className)}>
      {eyebrow ? <p className="eyebrow ss-heading__eyebrow">{eyebrow}</p> : null}
      <Tag className="title-1 ss-heading__title">{title}</Tag>
      {lead ? <p className="lead ss-heading__lead">{lead}</p> : null}
      {children}
    </div>
  );
}
