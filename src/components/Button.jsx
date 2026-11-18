import { cx } from './utils.js';
import { Arrow } from './icons.jsx';

/** variant: primary | secondary | link — size: md | lg */
export default function Button({ variant = 'primary', size = 'md', arrow, onDark, className, children, href, ...rest }) {
  const classes = cx(
    'ss-btn',
    `ss-btn--${variant}`,
    `ss-btn--${size}`,
    onDark && variant === 'link' && 'ss-btn--on-dark',
    className,
  );
  const content = (
    <>
      <span>{children}</span>
      {arrow ? <Arrow /> : null}
    </>
  );
  if (href) {
    return <a href={href} className={classes} {...rest}>{content}</a>;
  }
  return <button type="button" className={classes} {...rest}>{content}</button>;
}
