import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { cx } from './utils.js';
import { Chevron, Close } from './icons.jsx';

const LABELS = {
  fr: { dialog: 'Galerie photo', close: 'Fermer', prev: 'Photo précédente', next: 'Photo suivante', open: 'Agrandir la photo', more: (n) => `${n} photos de plus` },
  en: { dialog: 'Photo gallery', close: 'Close', prev: 'Previous photo', next: 'Next photo', open: 'Enlarge photo', more: (n) => `${n} more photos` },
};

function Lightbox({ items, index, onIndex, onClose, L }) {
  const n = items.length;
  const it = items[index];
  const rootRef = useRef(null);
  const closeRef = useRef(null);
  const touch = useRef(null);
  const go = (d) => onIndex((index + d + n) % n);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => { document.body.style.overflow = prev; };
  }, []);

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); }
      else if (e.key === 'ArrowRight' && n > 1) { e.preventDefault(); go(1); }
      else if (e.key === 'ArrowLeft' && n > 1) { e.preventDefault(); go(-1); }
      else if (e.key === 'Tab' && rootRef.current) {
        // Piège à focus : on reste dans la boîte de dialogue.
        const f = rootRef.current.querySelectorAll('button');
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  });

  return (
    <div
      className="ss-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={L.dialog}
      ref={rootRef}
      onClick={(e) => {
        if (e.target === e.currentTarget || e.target.classList.contains('ss-lightbox__figure')) onClose();
      }}
      onTouchStart={(e) => { touch.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touch.current === null || n < 2) return;
        const dx = e.changedTouches[0].clientX - touch.current;
        touch.current = null;
        if (Math.abs(dx) > 48) go(dx < 0 ? 1 : -1);
      }}
    >
      <div className="ss-lightbox__top">
        <p className="body-sm ss-lightbox__count" aria-live="polite">{index + 1} / {n}</p>
        <button type="button" ref={closeRef} className="ss-lightbox__btn" onClick={onClose} aria-label={L.close}>
          <Close />
        </button>
      </div>
      <figure className="ss-lightbox__figure">
        <img key={it.src} src={it.src} srcSet={it.srcSet} sizes={it.srcSet ? '100vw' : undefined} alt={it.alt || ''} />
        {it.caption ? <figcaption className="body-sm ss-lightbox__caption">{it.caption}</figcaption> : null}
      </figure>
      {n > 1 ? (
        <>
          <button type="button" className="ss-lightbox__btn ss-lightbox__prev" onClick={() => go(-1)} aria-label={L.prev}><Chevron left /></button>
          <button type="button" className="ss-lightbox__btn ss-lightbox__next" onClick={() => go(1)} aria-label={L.next}><Chevron /></button>
        </>
      ) : null}
    </div>
  );
}

/** layout: mosaic (5 tuiles max, la dernière annonce le reste) | masonry (toutes les photos). */
export default function Gallery({ items = [], layout = 'mosaic', visible, lang = 'fr', className }) {
  const L = LABELS[lang === 'en' ? 'en' : 'fr'];
  const masonry = layout === 'masonry';
  const count = masonry ? Math.max(1, visible || items.length) : Math.max(1, Math.min(visible || 5, 5));
  const [open, setOpen] = useState(-1);
  const trigger = useRef(null);

  if (!items.length) return null;
  const shown = items.slice(0, count);
  const rest = items.length - shown.length;

  function close() {
    setOpen(-1);
    const t = trigger.current;
    if (t) setTimeout(() => t.focus(), 0);
  }

  return (
    <div className={cx('ss-gallery', masonry ? 'ss-gallery--masonry' : `ss-gallery--n${shown.length}`, className)}>
      <ul className="ss-gallery__grid">
        {shown.map((it, i) => {
          const more = i === shown.length - 1 && rest > 0;
          let sizes;
          if (it.srcSet) sizes = masonry ? '33vw' : i === 0 ? '50vw' : '25vw';
          return (
            <li key={it.src} className={cx('ss-gallery__item', !masonry && i === 0 && 'is-featured')}>
              <button
                type="button"
                className="ss-gallery__tile"
                onClick={(e) => { trigger.current = e.currentTarget; setOpen(i); }}
                aria-label={(it.alt ? `${it.alt} — ` : '') + (more ? L.more(rest) : L.open)}
              >
                <img
                  src={it.src}
                  srcSet={it.srcSet}
                  sizes={sizes}
                  width={masonry ? it.width : undefined}
                  height={masonry ? it.height : undefined}
                  alt=""
                  loading={i === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  style={!masonry && it.focus ? { objectPosition: it.focus } : undefined}
                />
                {more ? <span className="ss-gallery__more" aria-hidden="true">+{rest}</span> : null}
              </button>
            </li>
          );
        })}
      </ul>
      {open >= 0 ? createPortal(<Lightbox items={items} index={open} onIndex={setOpen} onClose={close} L={L} />, document.body) : null}
    </div>
  );
}
