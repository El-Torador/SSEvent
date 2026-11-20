# SSEvent

Site vitrine de l’agence événementielle SSEvent (Cameroun) : page d’accueil et page de demande de devis.

React 18 + Vite, site multi-pages (`index.html`, `devis.html`).

```bash
npm install
npm run dev      # développement
npm run build    # build de production dans dist/
```

## Organisation

- `src/components/` — composants du design system SSEvent (Header, Hero, Section, Gallery, QuoteForm…).
- `src/styles/tokens.css` — couleurs, typographie, espacements (thèmes `light` / `dark`).
- `src/styles/components.css` — styles des composants ; `site.css` — mise en page des pages.
- `src/data/` — contenus éditables (textes, liens, photos).
- `src/pages/` — une entrée par page.
- `public/images/` — logos et visuels. **Les photos sont des emplacements « à fournir ».**

## Avant la mise en ligne

- Remplacer tous les textes entre `[crochets]` (`src/data/`, `src/pages/`).
- Remplacer les photos de `public/images/` par les vraies.
- Renseigner le lien WhatsApp (`CONTACT.whatsapp` dans `src/data/site.js`).
- Brancher l’envoi du formulaire de devis (`sendQuote` dans `src/pages/devis.jsx`) : aujourd’hui rien n’est transmis.
