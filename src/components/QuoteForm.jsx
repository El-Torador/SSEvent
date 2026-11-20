import { Fragment, useEffect, useRef, useState } from 'react';
import { cx } from './utils.js';
import Button from './Button.jsx';
import { AlertIcon, Check } from './icons.jsx';
import { Checkbox, ChoiceGroup, SelectField, TextField } from './fields.jsx';

export const QUOTE_DEFAULTS = {
  audiences: ['Particulier', 'Entreprise', 'Institution'],
  eventTypes: [
    'Accueil en entreprise',
    'Séminaire ou conférence',
    'Salon ou lancement de produit',
    'Gala ou soirée',
    'Cérémonie privée (mariage, anniversaire…)',
    'Autre',
  ],
  services: [
    'Hôtes et hôtesses d’accueil',
    'Interprétariat',
    'Service 360° (organisation, photo, vidéo)',
    'Location d’uniformes',
  ],
};

export function validateQuote(f) {
  const e = {};
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (!f.audience) e.audience = 'Indiquez si vous êtes un particulier, une entreprise ou une institution.';
  if (!f.name.trim()) e.name = 'Indiquez votre nom.';
  if (!f.email.trim()) e.email = 'Indiquez votre e-mail.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = 'Cet e-mail ne semble pas valide (exemple : nom@domaine.cm).';
  const digits = f.phone.replace(/\D/g, '');
  if (!f.phone.trim()) e.phone = 'Indiquez un numéro de téléphone.';
  else if (digits.length < 8) e.phone = 'Ce numéro semble incomplet.';
  if (!f.eventType) e.eventType = 'Choisissez un type d’événement.';
  if (!f.date) e.date = 'Indiquez la date de l’événement.';
  else if (new Date(`${f.date}T00:00:00`) < today) e.date = 'Cette date est déjà passée.';
  if (!f.city.trim()) e.city = 'Indiquez la ville.';
  if (!f.services.length) e.services = 'Choisissez au moins une prestation.';
  if (!f.consent) e.consent = 'Votre accord est nécessaire pour que nous puissions vous recontacter.';
  return e;
}

function readForm(form) {
  const fd = new FormData(form);
  const get = (k) => fd.get(k) || '';
  return {
    audience: get('audience'), name: get('name'), company: get('company'), email: get('email'),
    phone: get('phone'), eventType: get('eventType'), date: get('date'), city: get('city'),
    guests: get('guests'), hosts: get('hosts'), services: fd.getAll('services'), message: get('message'),
    consent: !!fd.get('consent'),
  };
}

function localToday() {
  const d = new Date();
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

function Group({ n, title, children }) {
  return (
    <fieldset className="ss-form__group">
      <legend className="ss-form__legend">
        <span className="ss-form__num" aria-hidden="true">{n}</span>
        <span className="title-2">{title}</span>
      </legend>
      <div className="ss-form__grid">{children}</div>
    </fieldset>
  );
}

function Done({ sent, homeHref, onReset, className }) {
  const ref = useRef(null);
  useEffect(() => { ref.current?.focus(); }, []);
  const first = sent.name.trim().split(/\s+/)[0];
  const dateLabel = sent.date
    ? new Date(`${sent.date}T00:00:00`).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
    : '';
  const recap = [['Événement', sent.eventType], ['Date', dateLabel], ['Ville', sent.city], ['Prestations', sent.services.join(', ')]];
  return (
    <div className={cx('ss-form-done', className)} tabIndex={-1} ref={ref} role="status">
      <span className="ss-form-done__mark"><Check /></span>
      <h2 className="title-1 ss-form-done__title">Merci {first}, votre demande est envoyée.</h2>
      <p className="lead ss-form-done__text">
        Nous revenons vers vous rapidement au {sent.phone} ou par e-mail pour préciser vos besoins.
      </p>
      <dl className="ss-form-done__recap">
        {recap.map(([k, v]) => (
          <Fragment key={k}>
            <dt className="eyebrow">{k}</dt>
            <dd className="body">{v}</dd>
          </Fragment>
        ))}
      </dl>
      <div className="ss-form-done__actions">
        <Button variant="secondary" onClick={onReset}>Faire une autre demande</Button>
        {homeHref ? <Button variant="link" arrow href={homeHref}>Retour à l’accueil</Button> : null}
      </div>
    </div>
  );
}

/**
 * Formulaire de demande de devis.
 * `onSubmit(data)` reçoit les valeurs validées ; il peut renvoyer une promesse
 * (envoi vers une API) — l'écran de confirmation s'affiche quand elle se résout.
 */
export default function QuoteForm({ audiences, eventTypes, services, homeHref, onSubmit, className }) {
  const o = {
    audiences: audiences || QUOTE_DEFAULTS.audiences,
    eventTypes: eventTypes || QUOTE_DEFAULTS.eventTypes,
    services: services || QUOTE_DEFAULTS.services,
  };
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(null);
  const [tries, setTries] = useState(0);
  const [formKey, setFormKey] = useState(0);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(null);
  const formRef = useRef(null);

  useEffect(() => {
    if (!tries || !formRef.current) return;
    formRef.current.querySelector('[aria-invalid="true"]')?.focus();
  }, [tries]);

  async function handleSubmit(e) {
    e.preventDefault();
    const f = readForm(e.currentTarget);
    const errs = validateQuote(f);
    setErrors(errs);
    setSendError(null);
    if (Object.keys(errs).length) { setTries((t) => t + 1); return; }
    try {
      setSending(true);
      if (onSubmit) await onSubmit(f);
      setSent(f);
    } catch {
      setSendError('L’envoi a échoué. Vérifiez votre connexion et réessayez, ou écrivez-nous sur WhatsApp.');
    } finally {
      setSending(false);
    }
  }

  function handleChange(e) {
    const n = e.target?.name;
    if (n && errors[n]) {
      const next = { ...errors };
      delete next[n];
      setErrors(next);
    }
  }

  if (sent) {
    return (
      <Done
        sent={sent}
        homeHref={homeHref}
        className={className}
        onReset={() => { setSent(null); setErrors({}); setFormKey((k) => k + 1); }}
      />
    );
  }

  const count = Object.keys(errors).length;
  return (
    <form
      key={formKey}
      ref={formRef}
      className={cx('ss-form', className)}
      noValidate
      onSubmit={handleSubmit}
      onChange={handleChange}
      aria-label="Demande de devis"
    >
      <Group n="01" title="Vous">
        <ChoiceGroup className="ss-form__full" name="audience" label="Vous êtes" required options={o.audiences} error={errors.audience} />
        <TextField name="name" label="Nom et prénom" required autoComplete="name" error={errors.name} />
        <TextField name="company" label="Entreprise ou institution" autoComplete="organization" />
        <TextField name="email" type="email" label="E-mail" required autoComplete="email" inputMode="email" error={errors.email} />
        <TextField
          name="phone" type="tel" label="Téléphone" required autoComplete="tel" inputMode="tel"
          hint="WhatsApp de préférence, avec l’indicatif : +237…" error={errors.phone}
        />
      </Group>
      <Group n="02" title="Votre événement">
        <SelectField className="ss-form__full" name="eventType" label="Type d’événement" required options={o.eventTypes} error={errors.eventType} />
        <TextField name="date" type="date" label="Date" required min={localToday()} error={errors.date} />
        <TextField name="city" label="Ville" required autoComplete="address-level2" hint="Partout au Cameroun." error={errors.city} />
        <TextField name="guests" type="number" min={1} inputMode="numeric" label="Nombre d’invités (estimation)" />
      </Group>
      <Group n="03" title="Vos besoins">
        <ChoiceGroup
          className="ss-form__full" name="services" multiple label="Prestations souhaitées"
          hint="Plusieurs choix possibles." required options={o.services} error={errors.services}
        />
        <TextField name="hosts" type="number" min={1} inputMode="numeric" label="Nombre d’hôtes ou d’hôtesses" />
        <TextField
          className="ss-form__full" name="message" multiline label="Votre message"
          hint="Horaires, tenue souhaitée, langues, contraintes du lieu…"
        />
        <Checkbox
          className="ss-form__full" name="consent" required error={errors.consent}
          label="J’accepte que SSEvent utilise ces informations pour me recontacter au sujet de ma demande."
        />
      </Group>
      {count ? (
        <p className="ss-form__alert" role="alert">
          <AlertIcon />
          <span>{count === 1 ? 'Un champ est à corriger avant l’envoi.' : `${count} champs sont à corriger avant l’envoi.`}</span>
        </p>
      ) : null}
      {sendError ? <p className="ss-form__alert" role="alert"><AlertIcon /><span>{sendError}</span></p> : null}
      <div className="ss-form__submit">
        <Button type="submit" variant="primary" size="lg" arrow disabled={sending}>
          {sending ? 'Envoi en cours…' : 'Envoyer ma demande'}
        </Button>
        <p className="body-sm ss-form__note">* Champ obligatoire</p>
      </div>
    </form>
  );
}
