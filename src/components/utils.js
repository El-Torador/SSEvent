export function cx(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function pad(n) {
  return n < 10 ? `0${n}` : String(n);
}
