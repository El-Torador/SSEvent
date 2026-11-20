const photo = (n, width, height) => ({
  src: `images/photos/event-${n}.svg`,
  width,
  height,
  alt: `[Décrivez la photo ${n} : la scène, les invités, le lieu]`,
  caption: '[Type d’événement, lieu]',
});

export const heroImages = [
  { src: 'images/hero-1.svg', alt: '[Photo phare d’un événement SSEvent]' },
  { src: 'images/hero-2.svg', alt: '[Gros plan : un détail d’accueil ou de décoration]' },
  { src: 'images/hero-3.svg', alt: '[Ambiance : hôtesses et invités]' },
];

export const marquee = ['Accueil haut de gamme', 'Hôtes et hôtesses', 'Interprétariat premium', 'Service 360°', 'Uniformes élégants'];

export const photos = [
  photo(1, 1600, 1067),
  photo(2, 1200, 1600),
  photo(3, 1600, 1600),
  photo(4, 1600, 1200),
  photo(5, 1200, 1600),
  photo(6, 1600, 1067),
  photo(7, 1600, 900),
  photo(8, 1200, 1500),
];

export const services = [
  { number: '01', eyebrow: 'Accueil', title: 'Services d’accueil', description: '[Hôtesses, réception, protocole… décrivez ce que vous proposez en deux phrases.]' },
  { number: '02', eyebrow: 'Événementiel', title: 'Organisation d’événements', description: '[Mariages, galas, séminaires… décrivez votre offre en deux phrases.]' },
  { number: '03', eyebrow: '[Catégorie]', title: '[Troisième service]', description: '[Description du service en deux phrases.]' },
];

export const approach = [
  { title: 'Vision', text: 'Devenir une référence dans le secteur de l’accueil événementiel.' },
  { title: 'Mission', text: 'Offrir à chaque client une expérience d’accueil exceptionnelle qui marque les esprits et reste gravée.' },
  { title: 'Évaluation', text: 'Évaluer l’impact pour les clients.' },
];

export const commitments = [
  { title: 'Une collaboration fluide', text: 'Avant, pendant et après chaque mission.' },
  { title: 'Une communication transparente', text: 'Avec des process clairs et une vraie rigueur professionnelle.' },
  { title: 'Une équipe jeune, formée et engagée', text: 'Prête à sublimer chaque interaction.' },
  { title: 'Une qualité de service constante', text: 'Qui valorise votre image à chaque événement.' },
  { title: 'Une écoute active', text: 'Avec une approche humaine, flexible et orientée solution.' },
  { title: 'Un accueil irréprochable', text: 'Chaleureux et à votre image, pour que cette empreinte devienne unique et remarquable.' },
];

export const values = [
  { title: 'Courtoisie' },
  { title: 'Proactivité et réactivité' },
  { title: 'Analyse des questions' },
  { title: 'Confiance' },
  { title: 'Engagement' },
];

export const addedValue = [
  { title: 'Interprétariat premium', text: 'Multilingue et communication professionnelle.' },
  { title: 'Service 360°', text: 'Organisation complète, avec photos et vidéos professionnelles.' },
  { title: 'Uniformes élégants', text: 'Adaptés à votre marque, disponibles à la location.' },
];

// À remplacer par les vrais membres de l'équipe.
export const team = Array.from({ length: 4 }, (_, i) => ({
  id: i,
  photo: 'images/portrait.svg',
  photoAlt: '[Portrait de Prénom Nom]',
  name: '[Prénom Nom]',
  role: '[Fonction]',
}));

// À remplacer par de vraies citations, reproduites avec l'accord des clients.
export const testimonials = Array.from({ length: 3 }, (_, i) => ({
  id: i,
  quote: '[Citation exacte d’un client, reproduite avec son accord.]',
  name: '[Nom du client]',
  context: '[Type d’événement, année]',
}));
