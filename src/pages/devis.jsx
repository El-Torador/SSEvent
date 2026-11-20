import { mount } from '../main.jsx';
import { Button, Footer, Header, NumberedGrid, QuoteForm, Section, SectionHeading } from '../components/index.js';
import { CONTACT, HOME, LOGO, LOGO_FOOTER, PITCH, footerColumns, navLinks } from '../data/site.js';

// Thème de la maquette pour la page devis.
const THEME = 'light';

const steps = [
  { title: 'Vous décrivez votre événement', text: 'Le formulaire prend quelques minutes.' },
  { title: 'Nous vous recontactons', text: 'Par téléphone ou WhatsApp, pour préciser vos besoins.' },
  { title: 'Vous recevez une proposition', text: 'Une prestation sur mesure, à votre image.' },
];

// TODO : brancher l'envoi (API, e-mail, formulaire hébergé…). Sans backend, rien n'est transmis.
async function sendQuote(data) {
  if (import.meta.env.DEV) console.info('[devis] demande prête à envoyer', data);
}

function Devis() {
  return (
    <div className="site">
      <Header logoSrc={LOGO} homeHref={HOME} links={navLinks('devis')} />

      <main>
        <Section tone="dark" label="Demande de devis">
          <div className="stack" style={{ gap: 20 }}>
            <Button variant="link" href={HOME}>← Retour à l’accueil</Button>
            <SectionHeading
              as="h1"
              eyebrow="Votre événement"
              title="Demander un devis"
              lead="Quelques informations suffisent : nous revenons vers vous pour préciser vos besoins et vous proposer une prestation sur mesure."
            />
          </div>
        </Section>

        <Section>
          <div className="split" style={{ alignItems: 'flex-start' }}>
            <div style={{ flex: '2 1 560px' }}>
              <QuoteForm homeHref={HOME} onSubmit={sendQuote} />
            </div>
            <aside className="quote-aside" style={{ flex: '1 1 300px' }}>
              <h2 className="title-3" style={{ margin: 0 }}>Comment ça se passe ?</h2>
              <NumberedGrid variant="compact" items={steps} />
              <div className="quote-aside__help">
                <h2 className="title-3" style={{ margin: 0 }}>Une question avant ?</h2>
                <p className="body muted">Écrivez-nous directement, nous vous répondons.</p>
                <Button variant="secondary" href={CONTACT.whatsapp}>Écrire sur WhatsApp</Button>
                <p className="body-sm muted">{CONTACT.phone} · {CONTACT.email}</p>
              </div>
              <p className="signature-sm" style={{ margin: 0, color: 'var(--gold-text)', textAlign: 'right' }}>
                La Perfection par Excellence
              </p>
            </aside>
          </div>
        </Section>
      </main>

      <Footer logoSrc={LOGO_FOOTER} pitch={PITCH} columns={footerColumns('devis')} />
    </div>
  );
}

mount(<Devis />, { theme: THEME });
