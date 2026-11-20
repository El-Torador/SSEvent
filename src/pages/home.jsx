import { mount } from '../main.jsx';
import {
  Button, CheckList, Footer, Gallery, Header, Hero, InfoCard, NumberedGrid,
  Section, SectionHeading, ServiceCard, TeamCard, Testimonial,
} from '../components/index.js';
import { CONTACT, DEVIS, LOGO, LOGO_FOOTER, PITCH, footerColumns, navLinks } from '../data/site.js';
import {
  addedValue, approach, commitments, heroImages, marquee, photos, services, team, testimonials, values,
} from '../data/home.js';

// Thème de la maquette pour l'accueil : « dark » (ou « light »).
const THEME = 'dark';
// Galerie : « mosaic » (5 tuiles, la dernière ouvre le reste) ou « masonry » (toutes les photos).
const GALLERY_LAYOUT = 'mosaic';

function Home() {
  return (
    <div className="site">
      <Header logoSrc={LOGO} links={navLinks('home')} cta={{ label: 'Demander un devis', href: DEVIS }} />

      <main>
        <Hero
          eyebrow="Agence événementielle · Cameroun"
          title="Chaque détail compte."
          highlight="détail"
          lead="Nous créons des expériences uniques grâce à une gamme complète de services d’accueil et d’événementiel, conçus pour sublimer chacun de vos moments."
          images={heroImages}
          marquee={marquee}
          signature="La Perfection par Excellence"
        >
          <Button variant="primary" size="lg" arrow href={DEVIS}>Demander un devis</Button>
          <Button variant="link" arrow href="#realisations">Voir nos réalisations</Button>
        </Hero>

        <Section id="a-propos" tone="raised">
          <div className="split">
            <div style={{ flex: '1 1 380px' }}>
              <img className="about-photo" src="images/about.svg" alt="[Photo de l’équipe ou de l’agence au travail]" />
            </div>
            <div className="stack" style={{ flex: '1 1 440px' }}>
              <SectionHeading
                eyebrow="Qui sommes-nous"
                title="À propos de nous"
                lead="Depuis 2021, nous offrons un accueil haut de gamme en entreprise et lors d’événements partout au Cameroun."
              />
              <p className="body muted">
                Nos hôtes et hôtesses, élégants et expérimentés, reflètent votre image et garantissent une première impression inoubliable.
              </p>
              <Button variant="link" arrow href="#equipe">Rencontrer l’équipe</Button>
            </div>
          </div>
        </Section>

        <Section id="services">
          <SectionHeading
            eyebrow="Nos services"
            title="Accueil et événementiel, de la préparation au dernier invité"
            lead="[Une phrase sur votre façon de travailler : à qui vous vous adressez et ce qui vous distingue.]"
          />
          <div className="cards-3">
            {services.map((s) => <ServiceCard key={s.number} {...s} ctaLabel="En savoir plus" href="#contact" />)}
          </div>
        </Section>

        <Section id="realisations" tone="raised">
          <SectionHeading
            eyebrow="Réalisations"
            title="Nos derniers événements"
            lead="Cliquez sur une photo pour l’agrandir et parcourir la galerie."
          />
          <Gallery items={photos} layout={GALLERY_LAYOUT} />
        </Section>

        <Section id="approche" tone="dark">
          <SectionHeading
            eyebrow="Vision · Mission · Évaluation"
            title="Notre approche"
            lead="Chez SSEvent, notre méthode repose sur la rigueur, l’écoute et l’adaptabilité pour garantir une prestation sur mesure."
          />
          <NumberedGrid variant="large" items={approach} />
        </Section>

        <Section id="confiance">
          <div className="split" style={{ alignItems: 'flex-start', gap: '48px 72px' }}>
            <div style={{ flex: '1 1 320px' }}>
              <SectionHeading eyebrow="Nos engagements pour vous" title="Pourquoi nous faire confiance ?" />
            </div>
            <div style={{ flex: '2 1 520px' }}>
              <CheckList items={commitments} />
            </div>
          </div>
        </Section>

        <Section id="valeurs" tone="tint">
          <SectionHeading
            eyebrow="Ce qui nous guide"
            title="Nos valeurs"
            lead="Chaque mission est portée par nos valeurs fondamentales, qui font la force de notre équipe et de nos prestations."
          />
          <NumberedGrid variant="compact" items={values} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <h3 className="title-2" style={{ margin: 0 }}>Notre valeur ajoutée</h3>
            <div className="cards-info">
              {addedValue.map((v) => <InfoCard key={v.title} headingLevel={4} {...v} />)}
            </div>
          </div>
        </Section>

        <Section id="equipe">
          <SectionHeading
            eyebrow="Les visages de l’agence"
            title="L’équipe SSEvent"
            lead="[Une phrase propre à l’équipe : sa taille, ses profils, son réseau d’intervenants.]"
          />
          <div className="cards-team">
            {team.map(({ id, ...m }) => <TeamCard key={id} {...m} />)}
          </div>
        </Section>

        <Section id="avis" tone="raised">
          <SectionHeading
            eyebrow="Ils nous font confiance"
            title="Ce qu’ils pensent de nous"
            lead="Entreprises, institutions et particuliers nous choisissent pour notre élégance, notre professionnalisme et notre flexibilité."
          />
          <div className="cards-3">
            {testimonials.map(({ id, ...t }) => <Testimonial key={id} {...t} />)}
          </div>
        </Section>

        <Section id="contact" tone="dark">
          <div className="split" style={{ alignItems: 'flex-end', justifyContent: 'space-between', gap: '32px 64px' }}>
            <div style={{ flex: '1 1 480px' }}>
              <SectionHeading
                eyebrow="Contact"
                title="Parlons de votre prochain événement."
                lead="Dites-nous la date, le lieu et le nombre d’invités : nous revenons vers vous avec une proposition sur mesure."
              />
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
              <Button variant="primary" size="lg" arrow href={DEVIS}>Demander un devis</Button>
              <Button variant="secondary" size="lg" href={CONTACT.whatsapp}>Écrire sur WhatsApp</Button>
            </div>
          </div>
        </Section>
      </main>

      <Footer logoSrc={LOGO_FOOTER} pitch={PITCH} columns={footerColumns('home')} />
    </div>
  );
}

mount(<Home />, { theme: THEME });
