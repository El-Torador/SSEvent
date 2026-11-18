import { cx } from './utils.js';
import { Arrow } from './icons.jsx';

export default function ServiceCard({ href, image, imageAlt, number, eyebrow, title, description, ctaLabel, className }) {
  const Tag = href ? 'a' : 'article';
  let media = null;
  if (image) {
    media = <div className="ss-card__media"><img src={image} alt={imageAlt || ''} /></div>;
  } else if (number) {
    media = <div className="ss-card__number" aria-hidden="true">{number}</div>;
  }
  return (
    <Tag className={cx('ss-card', href && 'ss-card--link', className)} href={href}>
      {media}
      <div className="ss-card__body">
        {eyebrow ? <p className="eyebrow ss-card__eyebrow">{eyebrow}</p> : null}
        <h3 className="title-2 ss-card__title">{title}</h3>
        {description ? <p className="body ss-card__text">{description}</p> : null}
        {ctaLabel ? <span className="button ss-card__cta">{ctaLabel}<Arrow /></span> : null}
      </div>
    </Tag>
  );
}
