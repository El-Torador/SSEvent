// Contenus partagés entre les pages. Les textes entre [crochets] sont à remplacer
// par les vraies informations de l'agence avant la mise en ligne.

export const HOME = '/';
export const DEVIS = '/devis.html';

export const LOGO = '/images/logo.svg';
export const LOGO_FOOTER = '/images/logo-footer.svg';

export const PITCH = 'Chaque détail compte. Nous créons des expériences uniques, conçues pour sublimer chacun de vos moments.';

export const CONTACT = {
  phone: '[Téléphone]',
  email: '[E-mail]',
  city: '[Ville], Cameroun',
  // Lien wa.me à compléter avec le numéro au format international, sans « + » ni espaces.
  whatsapp: '#contact',
};

/** Liens de navigation : ancres locales sur l'accueil, liens vers l'accueil depuis les autres pages. */
export function navLinks(current) {
  const base = current === 'home' ? '' : HOME;
  const links = [
    { label: 'Accueil', href: current === 'home' ? '#' : HOME, current: current === 'home' },
    { label: 'À propos', href: `${base}#a-propos` },
    { label: 'Services', href: `${base}#services` },
    { label: 'Réalisations', href: `${base}#realisations` },
  ];
  links.push(current === 'devis'
    ? { label: 'Devis', href: DEVIS, current: true }
    : { label: 'Équipe', href: '#equipe' });
  return links;
}

export function footerColumns(current) {
  const base = current === 'home' ? '' : HOME;
  return [
    {
      title: 'Agence',
      links: [
        { label: 'À propos', href: `${base}#a-propos` },
        { label: 'Notre approche', href: `${base}#approche` },
        { label: 'Nos valeurs', href: `${base}#valeurs` },
        { label: 'L’équipe', href: `${base}#equipe` },
      ],
    },
    {
      title: 'Prestations',
      links: [
        { label: 'Services', href: `${base}#services` },
        { label: 'Réalisations', href: `${base}#realisations` },
        { label: 'Témoignages', href: `${base}#avis` },
        { label: 'Demander un devis', href: DEVIS },
      ],
    },
    {
      title: 'Contact',
      links: [
        { label: '[Téléphone / WhatsApp]' },
        { label: CONTACT.email },
        { label: CONTACT.city },
        { label: 'ssevent.cm', href: 'https://ssevent.cm/' },
      ],
    },
  ];
}
