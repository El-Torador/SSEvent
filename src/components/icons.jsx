const stroke = { fill: 'none', stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round' };

export function Arrow() {
  return (
    <svg className="ss-icon" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" {...stroke} strokeWidth="1.75" />
    </svg>
  );
}

export function Chevron({ left = false }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
      <path d={left ? 'M12.5 4l-6 6 6 6' : 'M7.5 4l6 6-6 6'} {...stroke} strokeWidth="1.75" />
    </svg>
  );
}

export function Close() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M5 5l10 10M15 5L5 15" {...stroke} strokeWidth="1.75" />
    </svg>
  );
}

export function Burger() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M3 6h14M3 10h14M3 14h14" {...stroke} strokeWidth="1.75" />
    </svg>
  );
}

export function Check() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M5 10.5l3.2 3.2L15 7" {...stroke} strokeWidth="2" />
    </svg>
  );
}

export function SmallCheck() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <path d="M3 7.4l2.6 2.6L11 4.6" {...stroke} strokeWidth="2" />
    </svg>
  );
}

export function AlertIcon() {
  return (
    <svg className="ss-icon" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="8" r="6.6" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 4.6v4.2M8 11.2v.2" {...stroke} strokeWidth="1.8" />
    </svg>
  );
}
